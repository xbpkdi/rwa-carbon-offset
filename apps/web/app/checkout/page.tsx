"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Btn } from "@/components/ui/Btn";
import { ReceiptSummary } from "@/components/ReceiptSummary";
import { FlowShell } from "@/components/FlowShell";
import { gramsFromMg, modelLabel, parseEstimateSearchParams, runEstimate } from "@/lib/estimate";

function CheckoutForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const input = parseEstimateSearchParams(params);
  const result = runEstimate(input);

  const handleRetire = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/offset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tonnes: result.retireTonnes, mgCO2e: result.midMg }),
      });
      const json = (await res.json()) as { id?: string; error?: string };
      if (!res.ok || !json.id) throw new Error(json.error ?? "Retirement failed");
      router.push(`/certificate/${json.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retirement failed");
      setBusy(false);
    }
  };

  return (
    <FlowShell step={2}>
      <div className="grid gap-3 lg:grid-cols-12 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-4 lg:col-span-7"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-carbon">Step 2 of 3</p>
          <h1 className="mt-1 font-display text-xl font-semibold tracking-tight text-aurora-fg sm:text-2xl">
            Confirm retirement
          </h1>
          <p className="mt-1 text-xs text-aurora-fg-muted">
            {modelLabel(input.model)} · {input.requests.toLocaleString()} req · {input.inputTokensPerRequest} in /{" "}
            {input.outputTokensPerRequest} out
          </p>

          <dl className="mt-3 space-y-2 rounded-xl border border-aurora-border bg-aurora-panel p-3 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-aurora-fg-muted">Mid estimate</dt>
              <dd className="font-medium text-aurora-fg">
                {gramsFromMg(result.midMg)} gCO₂e ({result.midMg.toLocaleString()} mg)
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-aurora-fg-muted">Retire quantity</dt>
              <dd className="font-medium text-aurora-fg">{result.retireTonnes.toFixed(3)} t</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-aurora-fg-muted">Factor set</dt>
              <dd className="font-mono text-[11px] text-aurora-fg">{result.factorSetVersion}</dd>
            </div>
          </dl>

          <p className="mt-2 text-[11px] text-aurora-fg-muted">
            Batch minimum 0.001 t on chain — not a per-prompt retirement.
          </p>

          {error && (
            <p role="alert" className="mt-2 rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-3">
            <Btn onClick={handleRetire} disabled={busy} isLoading={busy} size="sm">
              {busy ? "Retiring credit…" : "Retire and get certificate"}
            </Btn>
            <Btn variant="secondary" type="button" size="sm" onClick={() => router.push("/estimate")}>
              Back to estimate
            </Btn>
          </div>
        </motion.div>

        <ReceiptSummary tonnes={result.retireTonnes} grams={result.midMg / 1000} className="lg:col-span-5" />
      </div>
    </FlowShell>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1500px] px-6 py-6 text-sm text-aurora-fg-muted">Loading…</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
