import { estimateMgCO2e } from "../packages/core/src/emissions.ts";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3000";

const DEFAULT_INPUT = {
  model: "claude-sonnet" as const,
  requests: 100,
  inputTokensPerRequest: 800,
  outputTokensPerRequest: 400,
};

async function main() {
  console.log("E2E demo against", BASE);

  const result = estimateMgCO2e(DEFAULT_INPUT);
  console.log("Estimate midMg:", result.midMg, "retireTonnes:", result.retireTonnes);

  const res = await fetch(`${BASE}/api/offset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tonnes: result.retireTonnes, mgCO2e: result.midMg }),
  });
  const body = (await res.json()) as {
    id?: string;
    carbonmarkUrl?: string | null;
    snowtraceUrl?: string | null;
    receiptId?: string | null;
    error?: string;
  };

  if (!res.ok) {
    console.error("Offset failed:", body.error ?? body);
    process.exit(1);
  }

  console.log("Certificate id:", body.id);
  console.log("Carbonmark:", body.carbonmarkUrl);
  console.log("Snowtrace:", body.snowtraceUrl ?? "(pending — deploy Fuji contract)");
  console.log("Receipt id:", body.receiptId ?? "(pending)");

  const certRes = await fetch(`${BASE}/certificate/${body.id}`);
  if (!certRes.ok) {
    console.error("Certificate page failed:", certRes.status);
    process.exit(1);
  }
  const html = await certRes.text();
  if (!html.includes(body.carbonmarkUrl ?? "")) {
    console.error("Certificate page missing Carbonmark link");
    process.exit(1);
  }

  if (process.env.CERTIFICATE_RECEIPT_ADDRESS && !body.snowtraceUrl) {
    console.error("CERTIFICATE_RECEIPT_ADDRESS set but no snowtraceUrl — Fuji record failed");
    process.exit(1);
  }

  if (body.snowtraceUrl) {
    if (!html.includes("snowtrace") && !html.includes(body.snowtraceUrl)) {
      console.error("Certificate page missing Snowtrace link");
      process.exit(1);
    }
    console.log("E2E passed with Snowtrace proof");
  } else {
    console.log("E2E passed (Carbonmark only — fund Fuji wallet + deploy for Snowtrace)");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
