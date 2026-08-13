import { NextResponse } from "next/server";
import { addCertificate, type Certificate } from "@/lib/certificates";
import { retireTonnes } from "@retirement/carbonmark";

export async function POST(req: Request) {
  const body = (await req.json()) as { tonnes?: number; mgCO2e?: number };
  const tonnes = body.tonnes ?? 0.001;
  const mgCO2e = body.mgCO2e ?? 1_000_000;

  if (!process.env.CARBONMARK_API_KEY) {
    return NextResponse.json({ error: "CARBONMARK_API_KEY missing in apps/web/.env.local" }, { status: 500 });
  }

  try {
    // Step 1: Retire credits on Carbonmark (sandbox)
    const order = await retireTonnes(tonnes);
    let snowtraceUrl: string | null = null;
    let receiptId: string | null = null;

    const fujiKey = process.env.FUJI_PRIVATE_KEY as `0x${string}` | undefined;
    const contract = process.env.CERTIFICATE_RECEIPT_ADDRESS as `0x${string}` | undefined;

    if (fujiKey && contract && order.view_retirement_url) {
      // Step 2: Mirror receipt on Fuji C-Chain (optional if env set)
      const { recordReceipt } = await import("../../../../../spike/deploy-receipt");
      const tx = order.transaction_hash;
      const sourceTx = (tx && tx.startsWith("0x") && tx.length === 66 ? tx : `0x${"00".repeat(32)}`) as `0x${string}`;
      const recorded = await recordReceipt({
        privateKey: fujiKey,
        contract,
        sourceTx,
        carbonmarkUrl: order.view_retirement_url,
        mgCO2e: BigInt(mgCO2e),
        beneficiary: (process.env.BENEFICIARY_ADDRESS as `0x${string}`) ?? "0x000000000000000000000000000000000000dEaD",
      });
      snowtraceUrl = recorded.explorer;
      receiptId = recorded.id;
    }

    const beneficiaryName = process.env.BENEFICIARY_NAME ?? "RWA Carbon Offset";

    const cert: Certificate = {
      id: crypto.randomUUID(),
      tonnes,
      mgCO2e,
      carbonmarkUrl: order.view_retirement_url,
      sourceTx: order.transaction_hash,
      snowtraceUrl,
      receiptId,
      createdAt: new Date().toISOString(),
      beneficiary: beneficiaryName,
    };

    // Step 3: Save certificate for /certificate/[id]
    addCertificate(cert);
    return NextResponse.json(cert);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Retirement failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
