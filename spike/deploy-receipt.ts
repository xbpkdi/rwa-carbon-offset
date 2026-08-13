import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  encodeFunctionData,
  decodeEventLog,
  type Hex,
} from "viem";
import { avalancheFuji } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ABI = parseAbi([
  "constructor(address recorder_)",
  "function record(bytes32 sourceTx, string carbonmarkUrl, uint256 mgCO2e, address beneficiary) returns (uint256 id)",
  "function receipts(uint256 id) view returns (bytes32 sourceTx, string carbonmarkUrl, uint256 mgCO2e, address beneficiary, uint256 recordedAt)",
  "event Recorded(uint256 indexed id, bytes32 indexed sourceTx, address indexed beneficiary, string carbonmarkUrl, uint256 mgCO2e)",
]);

function bytecode(): Hex {
  const artifactPath = resolve(
    import.meta.dirname,
    "../packages/contracts/out/CertificateReceipt.sol/CertificateReceipt.json",
  );
  try {
    const json = JSON.parse(readFileSync(artifactPath, "utf8")) as { bytecode: { object: Hex } };
    return json.bytecode.object;
  } catch {
    return "0x";
  }
}

export async function deployReceipt(privateKey: Hex) {
  const account = privateKeyToAccount(privateKey);
  const wallet = createWalletClient({
    account,
    chain: avalancheFuji,
    transport: http(process.env.FUJI_RPC_URL),
  });
  const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http(process.env.FUJI_RPC_URL),
  });
  const hash = await wallet.deployContract({
    abi: ABI,
    bytecode: bytecode(),
    args: [account.address],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return { address: receipt.contractAddress!, txHash: hash, explorer: `https://testnet.snowtrace.io/tx/${hash}` };
}

export async function recordReceipt(args: {
  privateKey: Hex;
  contract: `0x${string}`;
  sourceTx: Hex;
  carbonmarkUrl: string;
  mgCO2e: bigint;
  beneficiary: `0x${string}`;
}) {
  const account = privateKeyToAccount(args.privateKey);
  const wallet = createWalletClient({
    account,
    chain: avalancheFuji,
    transport: http(process.env.FUJI_RPC_URL),
  });
  const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http(process.env.FUJI_RPC_URL),
  });
  const hash = await wallet.writeContract({
    address: args.contract,
    abi: ABI,
    functionName: "record",
    args: [args.sourceTx, args.carbonmarkUrl, args.mgCO2e, args.beneficiary],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  let id = BigInt(0);
  for (const log of receipt.logs) {
    try {
      const decoded = decodeEventLog({ abi: ABI, data: log.data, topics: log.topics });
      if (decoded.eventName === "Recorded") id = decoded.args.id as bigint;
    } catch {
      /* skip */
    }
  }
  return {
    id: id.toString(),
    txHash: hash,
    explorer: `https://testnet.snowtrace.io/tx/${hash}`,
  };
}

async function main() {
  const pk = process.env.FUJI_PRIVATE_KEY as Hex | undefined;
  if (!pk) {
    console.log("FUJI_PRIVATE_KEY missing. Contract source is in packages/contracts.");
    console.log("Set a Fuji-funded key, compile with forge (or solc), then re-run pnpm deploy:fuji");
    return;
  }
  const result = await deployReceipt(pk);
  console.log(JSON.stringify(result, null, 2));
  console.log("Set CERTIFICATE_RECEIPT_ADDRESS=" + result.address);
}

const isMain = process.argv[1]?.endsWith("deploy-receipt.ts");
if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

void encodeFunctionData;
