import { estimateMgCO2e, type EstimateInput, type ModelId } from "@core/emissions";

export type { EstimateInput, ModelId };

export const MODEL_OPTIONS: { id: ModelId; label: string }[] = [
  { id: "gemini-flash", label: "Gemini Flash (light)" },
  { id: "gpt-class-standard", label: "GPT-class standard" },
  { id: "claude-sonnet", label: "Claude Sonnet" },
  { id: "claude-opus", label: "Claude Opus" },
  { id: "reasoning-heavy", label: "Reasoning-heavy (o-series / R1)" },
];

export const DEFAULT_ESTIMATE_INPUT: EstimateInput = {
  model: "claude-sonnet",
  requests: 100,
  inputTokensPerRequest: 800,
  outputTokensPerRequest: 400,
};

const defaults = DEFAULT_ESTIMATE_INPUT;

export function modelLabel(id: string) {
  return MODEL_OPTIONS.find((m) => m.id === id)?.label ?? id;
}

export function gramsFromMg(mg: number) {
  return (mg / 1000).toFixed(2);
}

export function parseEstimateSearchParams(params: URLSearchParams): EstimateInput {
  const model = params.get("model");
  return {
    model: MODEL_OPTIONS.some((m) => m.id === model) ? (model as ModelId) : defaults.model,
    requests: Number(params.get("requests") ?? defaults.requests),
    inputTokensPerRequest: Number(params.get("in") ?? defaults.inputTokensPerRequest),
    outputTokensPerRequest: Number(params.get("out") ?? defaults.outputTokensPerRequest),
  };
}

export function checkoutQuery(input: EstimateInput) {
  return new URLSearchParams({
    model: input.model,
    requests: String(input.requests),
    in: String(input.inputTokensPerRequest),
    out: String(input.outputTokensPerRequest),
  });
}

export function runEstimate(input: EstimateInput) {
  return estimateMgCO2e(input);
}
