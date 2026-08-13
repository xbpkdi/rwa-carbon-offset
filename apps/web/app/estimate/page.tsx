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
    <FlowShell step={1}>
      <div className="grid gap-3 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-4 lg:col-span-7"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-carbon">Step 1 of 3</p>
          <h1 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-aurora-fg sm:text-2xl">Estimate your usage</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-aurora-fg-muted">
            Enter the model and request volume. We compute a low/mid/high range using published per-token factors.
          </p>

          <form
            className="mt-4 space-y-3"
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
            <div className="grid gap-3 sm:grid-cols-2">
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
              <p className="rounded-xl border border-aurora-border bg-aurora-panel p-3 text-sm text-aurora-fg-muted">
                Switching to Gemini Flash would cut ~{result.reductionPctIfFlash}%. Reduce before offset.
              </p>
            )}

            <div className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="w-full sm:w-auto">
                <Btn variant="secondary" type="button" className="w-full sm:w-auto">
                  Back
                </Btn>
              </Link>
              <Btn type="submit" className="w-full sm:w-auto">
                Continue to retirement
              </Btn>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.05, ease: "easeOut" }}
          className="space-y-3 lg:col-span-5"
        >
          <StatCard
            label="Mid estimate"
            value={<AnimatedNumber value={gramsFromMg(result.midMg)} />}
            unit="gCO₂e"
            note="Best-guess footprint used for retirement sizing"
            accent
            className="!p-4 [&_.font-display]:text-2xl [&_.font-display]:sm:text-3xl [&_.text-lg]:text-base [&_p.text-sm]:mt-1.5 [&_p.text-sm]:text-xs"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              label="Low estimate"
              value={<AnimatedNumber value={gramsFromMg(result.lowMg)} />}
              unit="gCO₂e"
              note="Optimistic factor scenario"
              className="!p-4 [&_.font-display]:text-2xl [&_.font-display]:sm:text-3xl [&_.text-lg]:text-base [&_p.text-sm]:mt-1.5 [&_p.text-sm]:text-xs"
            />
            <StatCard
              label="High estimate"
              value={<AnimatedNumber value={gramsFromMg(result.highMg)} />}
              unit="gCO₂e"
              note="Conservative factor scenario"
              className="!p-4 [&_.font-display]:text-2xl [&_.font-display]:sm:text-3xl [&_.text-lg]:text-base [&_p.text-sm]:mt-1.5 [&_p.text-sm]:text-xs"
            />
          </div>
          <div className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aurora-fg-muted">Retirement batch</p>
            <p className="mt-1.5 font-display text-2xl font-semibold text-aurora-fg">
              <AnimatedNumber value={result.retireTonnes.toFixed(3)} />
              <span className="ml-1 text-base font-medium text-aurora-fg-muted">tCO₂e</span>
            </p>
            <p className="mt-1 text-sm text-aurora-fg-muted">Rounded up to next 0.001 t minimum</p>
            <p className="mt-2 font-mono text-xs text-aurora-fg-muted">factor set {result.factorSetVersion}</p>
          </div>
        </motion.div>
      </div>
    </FlowShell>
  );
}
