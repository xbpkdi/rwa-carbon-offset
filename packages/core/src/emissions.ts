// v0 approximation for hackathon demo — not EcoLogits yet; replace with EcoLogits port later
export const V0_FACTORS = {
  version: "v0-2026-08-anchored",
  pue: 1.1,
  gridIntensityGPerKWh: 400,
  models: {
    "gemini-flash": { out: 1.5, in: 0.15 },
    "gpt-class-standard": { out: 3.0, in: 0.3 },
    "claude-sonnet": { out: 6.0, in: 0.6 },
    "claude-opus": { out: 12.0, in: 1.2 },
    "reasoning-heavy": { out: 50.0, in: 5.0 },
  },
  baseOverheadWh: 0.05,
  embodiedGPerRequest: 0.005,
} as const;

export type ModelId = keyof typeof V0_FACTORS.models;

export type EstimateInput = {
  model: ModelId;
  requests: number;
  inputTokensPerRequest: number;
  outputTokensPerRequest: number;
};

/** Store milligrams CO2e as integers. 1 t = 1_000_000_000 mg. */
export function estimateMgCO2e(input: EstimateInput) {
  const factors = V0_FACTORS.models[input.model];
  const energyWhPerRequest =
    V0_FACTORS.baseOverheadWh +
    (input.outputTokensPerRequest / 1000) * factors.out +
    (input.inputTokensPerRequest / 1000) * factors.in;

  const gPerRequest =
    (energyWhPerRequest / 1000) *
      V0_FACTORS.gridIntensityGPerKWh *
      V0_FACTORS.pue +
    V0_FACTORS.embodiedGPerRequest;

  const lowG = gPerRequest * 0.4 * input.requests;
  const midG = gPerRequest * input.requests;
  const highG = gPerRequest * 2.5 * input.requests;

  const midMg = Math.round(midG * 1000);
  const lowMg = Math.round(lowG * 1000);
  const highMg = Math.round(highG * 1000);

  const lighter = V0_FACTORS.models["gemini-flash"];
  const lighterWh =
    V0_FACTORS.baseOverheadWh +
    (input.outputTokensPerRequest / 1000) * lighter.out +
    (input.inputTokensPerRequest / 1000) * lighter.in;
  const lighterG =
    ((lighterWh / 1000) * V0_FACTORS.gridIntensityGPerKWh * V0_FACTORS.pue +
      V0_FACTORS.embodiedGPerRequest) *
    input.requests;
  const reductionPct =
    input.model === "gemini-flash"
      ? 0
      : Math.round((1 - lighterG / midG) * 100);

  return {
    factorSetVersion: V0_FACTORS.version,
    energyWh: energyWhPerRequest * input.requests,
    lowMg,
    midMg,
    highMg,
    reductionPctIfFlash: reductionPct,
    tonnesMid: midMg / 1_000_000_000,
    retireTonnes: Math.max(0.001, Math.ceil(midMg / 1_000_000) / 1000),
  };
}
