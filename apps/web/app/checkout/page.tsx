"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Btn } from "@/components/ui/Btn";
import { ReceiptSummary } from "@/components/ReceiptSummary";
import { ForgePath } from "@/components/ForgePath";
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
    <div className="mx-auto w-full max-w-[1500px] px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
      <ForgePath activeStep={2} className="mb-4" />

      <div className="grid gap-4 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-5 sm:p-6 lg:col-span-7"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-carbon">Step 2 of 3</p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-aurora-fg sm:text-3xl">Confirm retirement</h1>
          <p className="mt-2 text-sm leading-relaxed text-aurora-fg-muted">
            {modelLabel(input.model)} · {input.requests.toLocaleString()} requests · {input.inputTokensPerRequest} in / {input.outputTokensPerRequest} out tokens.
          </p>

          <dl className="mt-6 space-y-3 rounded-xl border border-aurora-border bg-aurora-panel p-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-aurora-fg-muted">Mid estimate</dt>
              <dd className="font-medium text-aurora-fg">
                {gramsFromMg(result.midMg)} gCO₂e ({result.midMg.toLocaleString()} mg)
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-aurora-fg-muted">Retire quantity</dt>
              <dd className="font-medium text-aurora-fg">{result.retireTonnes.toFixed(3)} t</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-aurora-fg-muted">Factor set</dt>
              <dd className="font-mono text-xs text-aurora-fg">{result.factorSetVersion}</dd>
            </div>
          </dl>

          <p className="mt-3 text-sm text-aurora-fg-muted">
            Batch minimum is 0.001 t (1 kg) on chain — this is a batch, not a per-prompt retirement.
          </p>

          {error && (
            <p role="alert" className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-5">
            <Btn onClick={handleRetire} disabled={busy} isLoading={busy}>
              {busy ? "Retiring credit…" : "Retire and get certificate"}
            </Btn>
            <Btn variant="secondary" type="button" onClick={() => router.push("/estimate")}>
              Back to estimate
            </Btn>
          </div>
        </motion.div>

        <ReceiptSummary tonnes={result.retireTonnes} grams={result.midMg / 1000} className="lg:col-span-5" />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1500px] px-6 py-10 text-aurora-fg-muted">Loading…</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
