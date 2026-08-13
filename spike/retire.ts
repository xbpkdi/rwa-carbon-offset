import { retireTonnes } from "../packages/retirement/src/carbonmark.ts";

async function main() {
  const tonnes = Number(process.env.QUANTITY_TONNES ?? "0.001");
  console.log(`Retiring ${tonnes} t via Carbonmark REST...`);
  const order = await retireTonnes(tonnes);
  console.log(JSON.stringify(order, null, 2));
  if (!order.view_retirement_url) {
    throw new Error("No view_retirement_url");
  }
  console.log("\nCERTIFICATE_URL=" + order.view_retirement_url);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
