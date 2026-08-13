/**
 * Klima x402 gasless relay on Base Sepolia (84532).
 * Needs KLIMA_PRIVATE_KEY with test USDC on Sepolia. HTTP calls are free; retirement spends USDC.
 */
const BASE_URL = (process.env.KLIMA_X402_BASE_URL ?? "https://v1.x402.klimalabs.com").replace(
  /\/+$/,
  "",
);
const CHAIN_ID = Number(process.env.KLIMA_CHAIN_ID ?? "84532");

type Json = Record<string, unknown>;

async function post(body: Json): Promise<Json> {
  const res = await fetch(`${BASE_URL}/api`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as Json;
  if (!res.ok && res.status !== 402) {
    throw new Error(`x402 ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}

async function main() {
  const pk = process.env.KLIMA_PRIVATE_KEY;
  if (!pk) {
    console.log("KLIMA_PRIVATE_KEY missing — running discover-only (no funds moved).");
    const discovered = await post({ action: "discover" });
    console.log(JSON.stringify(discovered, null, 2).slice(0, 4000));
    console.log(
      "\nTo complete a real Sepolia retirement: fund a wallet with Base Sepolia USDC, set KLIMA_PRIVATE_KEY, re-run.",
    );
    return;
  }

  const { privateKeyToAccount } = await import("viem/accounts");
  const account = privateKeyToAccount(pk as `0x${string}`);

  const discovered = (await post({ action: "discover", chainId: CHAIN_ID })) as {
    carbonClasses?: Array<{ id?: string; carbonClass?: string }>;
  };
  const carbonClass =
    discovered.carbonClasses?.[0]?.id ??
    discovered.carbonClasses?.[0]?.carbonClass ??
    (discovered as { classes?: Array<{ id: string }> }).classes?.[0]?.id;
  if (!carbonClass) {
    throw new Error("No carbon class from discover: " + JSON.stringify(discovered).slice(0, 1500));
  }

  const prep = await post({
    action: "prepare-auth",
    chainId: CHAIN_ID,
    from: account.address,
    amount: "0.001",
    carbonClass,
    inputToken: "usdc",
    beneficiaryIsPayer: true,
    details: {
      beneficiaryString: process.env.BENEFICIARY_NAME ?? "RWA Carbon Offset",
      retirementMessage: "klima x402 spike",
    },
  });

  const typedData = prep.typedData as {
    domain: Record<string, unknown>;
    types: Record<string, { name: string; type: string }[]>;
    primaryType: string;
    message: Record<string, unknown>;
  };
  const signature = await account.signTypedData({
    domain: typedData.domain as never,
    types: typedData.types as never,
    primaryType: typedData.primaryType,
    message: typedData.message as never,
  });

  const request = prep.actionsRetireRequest as Json;
  const authPayload = { ...(request.authPayload as Json), signature };
  const result = await post({ ...request, authPayload });
  console.log(JSON.stringify(result, null, 2));

  const txHash = result.transactionHash as string | undefined;
  if (txHash) {
    for (let i = 0; i < 10; i++) {
      const cert = await post({ action: "certificate", txHash });
      const url = (cert.retirements as Array<{ certificateUrl?: string }> | undefined)?.[0]
        ?.certificateUrl;
      if (url) {
        console.log("\nCERTIFICATE_URL=" + url);
        console.log("TX=" + txHash);
        return;
      }
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
