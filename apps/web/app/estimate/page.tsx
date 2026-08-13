"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ModelId } from "@core/emissions";
import { Btn } from "@/components/ui/Btn";
import { TextField } from "@/components/ui/TextField";
import { SelectField } from "@/components/ui/SelectField";
import { StatCard } from "@/components/ui/StatCard";
import { ForgePath } from "@/components/ForgePath";
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
    <motion.span key={value} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
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
    <div className="mx-auto w-full max-w-[1500px] px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
      <ForgePath activeStep={1} className="mb-4" />

      <div className="grid gap-4 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-5 sm:p-6 lg:col-span-7"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-carbon">Step 1 of 3</p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-aurora-fg sm:text-3xl">Estimate your usage</h1>
          <p className="mt-2 text-sm leading-relaxed text-aurora-fg-muted">
            Enter the model and request volume. We compute a low/mid/high range using published per-token factors.
          </p>

          <form
            className="mt-6 space-y-4"
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
            <TextField
              label="Requests"
              type="number"
              min={1}
              value={requests}
              onChange={(e) => setRequests(e.target.value === "" ? "" : Number(e.target.value))}
              hint="Total number of inference calls"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Output tokens / request"
                type="number"
                min={0}
                value={outputTokens}
                onChange={(e) => setOutputTokens(e.target.value === "" ? "" : Number(e.target.value))}
                hint="Generated tokens"
              />
              <TextField
                label="Input tokens / request"
                type="number"
                min={0}
                value={inputTokens}
                onChange={(e) => setInputTokens(e.target.value === "" ? "" : Number(e.target.value))}
                hint="Prompt tokens"
              />
            </div>

            {result.reductionPctIfFlash > 0 && (
              <p className="rounded-xl border border-aurora-border bg-aurora-panel p-4 text-sm text-aurora-fg-muted">
                Switching to Gemini Flash would cut ~{result.reductionPctIfFlash}%. Reduce before offset.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Btn type="submit">Continue to retirement</Btn>
              <Link href="/">
                <Btn variant="secondary" type="button">Back</Btn>
              </Link>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.05, ease: "easeOut" }}
          className="space-y-4 lg:col-span-5"
        >
          <StatCard
            label="Mid estimate"
            value={<AnimatedNumber value={gramsFromMg(result.midMg)} />}
            unit="gCO₂e"
            note="Best-guess footprint used for retirement sizing"
            accent
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Low estimate" value={<AnimatedNumber value={gramsFromMg(result.lowMg)} />} unit="gCO₂e" note="Optimistic factor scenario" />
            <StatCard label="High estimate" value={<AnimatedNumber value={gramsFromMg(result.highMg)} />} unit="gCO₂e" note="Conservative factor scenario" />
          </div>
          <div className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aurora-fg-muted">Retirement batch</p>
            <p className="mt-2 font-display text-3xl font-semibold text-aurora-fg">
              <AnimatedNumber value={result.retireTonnes.toFixed(3)} />
              <span className="ml-1 text-lg font-medium text-aurora-fg-muted">tCO₂e</span>
            </p>
            <p className="mt-1 text-sm text-aurora-fg-muted">Rounded up to next 0.001 t minimum</p>
            <p className="mt-3 font-mono text-xs text-aurora-fg-muted">factor set {result.factorSetVersion}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
