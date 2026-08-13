import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import solc from "solc";
import { readFileSync } from "node:fs";

const sourcePath = resolve("packages/contracts/src/CertificateReceipt.sol");
const source = readFileSync(sourcePath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "CertificateReceipt.sol": { content: source },
  },
  settings: {
    outputSelection: {
      "*": { "*": ["abi", "evm.bytecode"] },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))) as {
  errors?: Array<{ severity: string; formattedMessage: string }>;
  contracts: {
    "CertificateReceipt.sol": {
      CertificateReceipt: { abi: unknown; evm: { bytecode: { object: string } } };
    };
  };
};

if (output.errors?.some((e) => e.severity === "error")) {
  console.error(output.errors.map((e) => e.formattedMessage).join("\n"));
  process.exit(1);
}

const artifact = output.contracts["CertificateReceipt.sol"].CertificateReceipt;
const outDir = resolve("packages/contracts/out/CertificateReceipt.sol");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  resolve(outDir, "CertificateReceipt.json"),
  JSON.stringify(
    { abi: artifact.abi, bytecode: { object: "0x" + artifact.evm.bytecode.object } },
    null,
    2,
  ),
);
console.log("Wrote", resolve(outDir, "CertificateReceipt.json"));
