"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ModelId } from "@core/emissions";
import { Btn } from "@/components/ui/Btn";
import { TextField } from "@/components/ui/TextField";
import { SelectField } from "@/components/ui/SelectField";
import { FlowShell } from "@/components/FlowShell";
import {
  DEFAULT_ESTIMATE_INPUT,
  MODEL_OPTIONS,
  checkoutQuery,
  gramsFromMg,
  runEstimate,
  type EstimateInput,
} from "@/lib/estimate";

function AnimatedNumber({ value }: { value: string }) {
  return (
    <motion.span key={value} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      {value}
    </motion.span>
  );
}

export default function EstimatePage() {
  const router = useRouter();
  const [model, setModel] = useState<ModelId>(DEFAULT_ESTIMATE_INPUT.model);
  const [requests, setRequests] = useState<number | "">(DEFAULT_ESTIMATE_INPUT.requests);
  const [outputTokens, setOutputTokens] = useState<number | "">(DEFAULT_ESTIMATE_INPUT.outputTokensPerRequest);
  const [inputTokens, setInputTokens] = useState<number | "">(DEFAULT_ESTIMATE_INPUT.inputTokensPerRequest);

  const input: EstimateInput = {
    model,
    requests: Math.max(1, Number(requests || 0)),
    outputTokensPerRequest: Math.max(0, Number(outputTokens || 0)),
    inputTokensPerRequest: Math.max(0, Number(inputTokens || 0)),
  };
  const result = runEstimate(input);

  return (
    <FlowShell step={1}>
      <div className="grid gap-3 lg:grid-cols-12 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-4 lg:col-span-7"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-carbon">Step 1 of 3</p>
          <h1 className="mt-1 font-display text-xl font-semibold tracking-tight text-aurora-fg sm:text-2xl">
            Estimate your usage
          </h1>

          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/checkout?${checkoutQuery(input)}`);
            }}
          >
            <SelectField
              label="Model"
              value={model}
              onChange={(e) => setModel(e.target.value as ModelId)}
              options={MODEL_OPTIONS.map((m) => ({ value: m.id, label: m.label }))}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Requests"
                type="number"
                min={1}
                value={requests}
                onChange={(e) => setRequests(e.target.value === "" ? "" : Number(e.target.value))}
              />
              <TextField
                label="Output tokens / req"
                type="number"
                min={0}
                value={outputTokens}
                onChange={(e) => setOutputTokens(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
            <TextField
              label="Input tokens / request"
              type="number"
              min={0}
              value={inputTokens}
              onChange={(e) => setInputTokens(e.target.value === "" ? "" : Number(e.target.value))}
            />

            {result.reductionPctIfFlash > 0 && (
              <p className="text-xs text-aurora-fg-muted">
                Gemini Flash would cut ~{result.reductionPctIfFlash}% vs this model.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Btn type="submit" size="sm">
                Continue to retirement
              </Btn>
              <Link href="/">
                <Btn variant="secondary" type="button" size="sm">
                  Back
                </Btn>
              </Link>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.04 }}
          className="rounded-xl border border-aurora-carbon/35 bg-aurora-carbon-panel p-4 lg:col-span-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-aurora-carbon">Estimate range</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { label: "Low", mg: result.lowMg },
              { label: "Mid", mg: result.midMg },
              { label: "High", mg: result.highMg },
            ].map((row) => (
              <div key={row.label} className="rounded-lg border border-aurora-border/60 bg-aurora-bg-raised/40 px-2 py-2 text-center">
                <p className="text-[10px] uppercase tracking-wide text-aurora-fg-muted">{row.label}</p>
                <p className="mt-0.5 font-display text-lg font-semibold text-aurora-fg">
                  <AnimatedNumber value={gramsFromMg(row.mg)} />
                </p>
                <p className="text-[10px] text-aurora-fg-muted">gCO₂e</p>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-aurora-border/60 pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-aurora-fg-muted">Retirement batch</p>
            <p className="mt-1 font-display text-2xl font-semibold text-aurora-fg">
              <AnimatedNumber value={result.retireTonnes.toFixed(3)} />
              <span className="ml-1 text-sm font-medium text-aurora-fg-muted">tCO₂e</span>
            </p>
            <p className="mt-1 text-[11px] text-aurora-fg-muted">Min 0.001 t · {result.factorSetVersion}</p>
          </div>
        </motion.div>
      </div>
    </FlowShell>
  );
}
