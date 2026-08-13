import { createPublicClient, http, type Hex } from "viem";
import { avalancheFuji } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { deployReceipt } from "./deploy-receipt.ts";

const POLL_MS = 5_000;
const MAX_WAIT_MS = 10 * 60_000;

function setEnvAddress(address: string) {
  for (const rel of [".env", "apps/web/.env.local"]) {
    const path = resolve(rel);
    try {
      let text = readFileSync(path, "utf8");
      if (/^CERTIFICATE_RECEIPT_ADDRESS=/m.test(text)) {
        text = text.replace(/^CERTIFICATE_RECEIPT_ADDRESS=.*/m, `CERTIFICATE_RECEIPT_ADDRESS=${address}`);
      } else {
        text = text.trimEnd() + `\nCERTIFICATE_RECEIPT_ADDRESS=${address}\n`;
      }
      writeFileSync(path, text);
      console.log(`Updated ${rel}`);
    } catch {
      console.warn(`Skip ${rel} (missing)`);
    }
  }
}

async function main() {
  const pk = process.env.FUJI_PRIVATE_KEY as Hex | undefined;
  if (!pk) {
    console.error("FUJI_PRIVATE_KEY missing");
    process.exit(1);
  }
  const account = privateKeyToAccount(pk);
  const client = createPublicClient({
    chain: avalancheFuji,
    transport: http(process.env.FUJI_RPC_URL),
  });

  console.log("Waiting for test AVAX on", account.address);
  console.log("Faucet: https://core.app/tools/testnet-faucet/?subnet=c&token=c&address=" + account.address);

  const started = Date.now();
  while (Date.now() - started < MAX_WAIT_MS) {
    const bal = await client.getBalance({ address: account.address });
    if (bal > 0n) {
      console.log("Funded:", Number(bal) / 1e18, "AVAX — deploying…");
      const result = await deployReceipt(pk);
      console.log(JSON.stringify(result, null, 2));
      setEnvAddress(result.address);
      console.log("Done. CERTIFICATE_RECEIPT_ADDRESS=" + result.address);
      return;
    }
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
  console.error("Timed out waiting for faucet funding");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
