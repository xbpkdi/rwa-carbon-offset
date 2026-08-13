export type CarbonmarkOrder = {
  status: string;
  transaction_hash: string | null;
  polygonscan_url: string | null;
  view_retirement_url: string | null;
  quote?: { uuid: string; quantity_tonnes: number; cost_usdc: number };
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Copy .env.example to .env`);
  return value;
}

async function carbonmarkFetch(path: string, init?: RequestInit) {
  const base = (process.env.CARBONMARK_BASE_URL ?? "https://v19.api.carbonmark.com").replace(
    /\/+$/,
    "",
  );
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (init?.method && init.method !== "GET") {
    headers.Authorization = `Bearer ${requireEnv("CARBONMARK_API_KEY")}`;
    headers["Content-Type"] = "application/json";
  } else if (process.env.CARBONMARK_API_KEY) {
    headers.Authorization = `Bearer ${process.env.CARBONMARK_API_KEY}`;
  }
  const res = await fetch(`${base}${path}`, { ...init, headers });
  const text = await res.text();
  let json: unknown = text;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`Carbonmark ${res.status} ${path}: ${text.slice(0, 800)}`);
  }
  return json;
}

function asPriceList(json: unknown): Array<{
  sourceId: string;
  liquidSupply?: number;
  minFillAmount?: number;
  supply?: number;
}> {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object" && Array.isArray((json as { items: unknown[] }).items)) {
    return (json as { items: Array<{ sourceId: string; liquidSupply?: number; minFillAmount?: number; supply?: number }> }).items;
  }
  return [];
}

export async function retireTonnes(quantityTonnes = 0.001): Promise<CarbonmarkOrder> {
  const beneficiaryName = process.env.BENEFICIARY_NAME ?? "RWA Carbon Offset";
  const beneficiaryAddress = process.env.BENEFICIARY_ADDRESS;

  // Step 1: prices — klimaprotocol sources have liquid supply (marketplace listings often do not)
  const prices = asPriceList(await carbonmarkFetch("/prices?assetPriceType=klimaprotocol"));

  const listing = prices.find((p) => {
    const supply = p.liquidSupply ?? p.supply ?? 0;
    const min = p.minFillAmount ?? 0;
    return supply >= quantityTonnes && min <= quantityTonnes;
  });
  if (!listing) {
    throw new Error(
      `No liquid klimaprotocol source at ${quantityTonnes} t. count=${prices.length}`,
    );
  }

  // Step 2: quote for the chosen source
  const quote = (await carbonmarkFetch("/quotes", {
    method: "POST",
    body: JSON.stringify({
      asset_price_source_id: listing.sourceId,
      quantity_tonnes: quantityTonnes,
    }),
  })) as { uuid: string };

  // Step 3: place order with beneficiary
  await carbonmarkFetch("/orders", {
    method: "POST",
    body: JSON.stringify({
      quote_uuid: quote.uuid,
      beneficiary_name: beneficiaryName,
      ...(beneficiaryAddress ? { beneficiary_address: beneficiaryAddress } : {}),
      retirement_message: "rwa-carbon-offset spike / demo",
    }),
  });

  // Step 4: poll until COMPLETED
  for (let i = 0; i < 30; i++) {
    const raw = await carbonmarkFetch(
      `/orders?quote_uuid=${encodeURIComponent(quote.uuid)}`,
    );
    const order = (Array.isArray(raw) ? raw[0] : raw) as CarbonmarkOrder | undefined;
    if (!order) {
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }
    console.log("order status", order.status);
    if (order.status === "COMPLETED" && order.view_retirement_url) return order;
    if (order.status === "FAILED" || order.status === "CANCELLED") {
      throw new Error(`Order ${order.status}: ${JSON.stringify(order)}`);
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("Timed out waiting for Carbonmark COMPLETED");
}
