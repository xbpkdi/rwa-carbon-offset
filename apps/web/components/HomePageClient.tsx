"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Btn } from "@/components/ui/Btn";
import { Orb } from "@/components/Orb";
import { cn } from "@/lib/utils";
import type { HomeStats } from "@/lib/stats";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={item}
      className={cn(
        "group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-aurora-border bg-aurora-bg-raised p-4 transition-colors duration-200 hover:border-aurora-border-strong",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

const steps = [
  { n: "01", label: "Estimate", hint: "Model + usage → gCO₂e range" },
  { n: "02", label: "Retire", hint: "Carbonmark verified credits" },
  { n: "03", label: "Certificate", hint: "Fuji C-Chain receipt" },
];

const activity = [
  { label: "GPT-4o class", value: "4.2 gCO₂e", pct: 55, tone: "bg-aurora-carbon" },
  { label: "Claude class", value: "2.1 gCO₂e", pct: 25, tone: "bg-aurora-carbon" },
  { label: "Llama 70B", value: "1.3 gCO₂e", pct: 12, tone: "bg-aurora-carbon-dim" },
  { label: "Small models", value: "0.4 gCO₂e", pct: 8, tone: "bg-aurora-border-strong" },
];

type Props = {
  stats: HomeStats;
  formatted: {
    totalMgCO2e: string;
    totalTonnesRetired: string;
    certificateCount: string;
    uniqueBeneficiaries: string;
    monthlyMgCO2e: string;
    yearlyMgCO2e: string;
  };
};

export function HomePageClient({ stats, formatted }: Props) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid w-full max-w-[1500px] gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:h-full lg:min-h-[40rem] lg:flex-1 lg:grid-cols-12 lg:grid-rows-6 lg:gap-4 lg:px-8"
    >
      <Card className="lg:col-span-3 lg:row-span-3 lg:justify-between">
        <div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-aurora-border bg-aurora-panel px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-aurora-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-aurora-carbon" />
            Protocol Camp · Fuji
          </span>
          <h1 className="mt-3 font-display text-xl font-semibold leading-[1.14] tracking-tight text-aurora-fg sm:text-2xl xl:text-[1.75rem]">
            Measure your AI footprint. Retire real carbon.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-aurora-fg-muted">
            Honest range estimates, batched retirement of verified Carbonmark credits, and an Avalanche receipt you can share.
          </p>
        </div>
        <div className="flex items-stretch gap-2 pt-4">
          <Link href="/estimate" className="min-w-0 flex-1">
            <Btn className="w-full justify-center px-3">Start estimate</Btn>
          </Link>
          <Link href="/methodology" className="min-w-0 flex-1">
            <Btn variant="secondary" className="w-full justify-center px-3">
              Methodology
            </Btn>
          </Link>
        </div>
      </Card>

      <Card className="relative items-center justify-center overflow-hidden p-0 lg:col-span-6 lg:row-span-6 lg:min-h-0">
        <Orb className="absolute left-1/2 top-1/2 hidden h-[min(80%,29rem)] w-[min(80%,29rem)] -translate-x-1/2 -translate-y-[54%] lg:block" />
        <div className="relative z-10 flex h-full w-full flex-col gap-3 p-4 lg:justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-fg-muted">
                Global retirement ledger
                {stats.illustrative ? (
                  <span className="ml-2 normal-case tracking-normal text-aurora-fg-muted/80">· illustrative</span>
                ) : null}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-aurora-fg sm:text-3xl xl:text-4xl">
                {formatted.totalMgCO2e}
              </p>
              <p className="text-xs text-aurora-fg-muted">gCO₂e measured to date</p>
            </div>
            <div className="rounded-lg border border-aurora-border bg-aurora-panel px-3 py-2 text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-aurora-fg-muted">Retired</p>
              <p className="font-display text-xl font-semibold text-aurora-carbon">{formatted.totalTonnesRetired}</p>
            </div>
          </div>
          <div className="flex justify-center lg:hidden">
            <Orb className="h-40 w-40 sm:h-52 sm:w-52" />
          </div>
          <div className="mt-auto space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              {steps.map((s, i) => (
                <div key={s.n} className="flex min-w-0 flex-1 items-center gap-2">
                  <div className="min-w-0 flex-1 rounded-lg border border-aurora-border bg-aurora-panel px-3 py-2">
                    <p className="font-mono text-[10px] text-aurora-carbon">{s.n}</p>
                    <p className="font-display text-sm font-semibold text-aurora-fg">{s.label}</p>
                    <p className="truncate text-[11px] text-aurora-fg-muted">{s.hint}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="hidden shrink-0 text-aurora-fg-muted sm:block">›</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-fg-muted">
              {["Verified", "Avalanche Fuji", "Team1 Thailand", "Protocol Camp", "On-chain proof"].map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-aurora-carbon/70" />}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="lg:col-span-3 lg:row-span-3 lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-fg-muted">Live network</p>
          <div className="mt-2.5 grid gap-2">
            {[
              { k: "Certificates issued", v: formatted.certificateCount },
              { k: "Unique retirers", v: formatted.uniqueBeneficiaries },
            ].map((s) => (
              <div key={s.k} className="flex items-center justify-between rounded-lg border border-aurora-border bg-aurora-panel px-3 py-2">
                <span className="text-xs text-aurora-fg-muted">{s.k}</span>
                <span className="font-display text-lg font-semibold text-aurora-fg">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 lg:mt-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-fg-muted">Forecast</p>
          <div className="mt-2.5 space-y-2.5">
            {[
              { k: "Monthly", v: formatted.monthlyMgCO2e },
              { k: "Yearly", v: formatted.yearlyMgCO2e },
            ].map((f) => (
              <div key={f.k}>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-aurora-fg-muted">{f.k}</span>
                </div>
                <p className="font-display text-lg font-semibold text-aurora-fg">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="lg:col-span-3 lg:col-start-1 lg:row-span-2 lg:row-start-4 lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-fg-muted">
            Emissions by model class
            <span className="ml-2 normal-case tracking-normal text-aurora-fg-muted/80">· illustrative</span>
          </p>
          <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full">
            {activity.map((a) => (
              <span key={a.label} className={cn(a.tone)} style={{ width: `${a.pct}%` }} />
            ))}
          </div>
        </div>
        <ul className="space-y-2 text-xs">
          {activity.map((a) => (
            <li key={a.label} className="flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2 text-aurora-fg-muted">
                <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", a.tone)} />
                <span className="truncate">{a.label}</span>
              </span>
              <span className="shrink-0 font-mono text-aurora-fg">{a.value}</span>
              <span className="w-8 shrink-0 text-right font-mono text-aurora-fg-muted">{a.pct}%</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="justify-center py-3 lg:col-span-3 lg:col-start-1 lg:row-span-1 lg:row-start-6">
        <a href="https://www.team1.network" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-aurora-border bg-aurora-panel text-aurora-carbon">✓</span>
            <span className="min-w-0">
              <span className="block text-xs font-medium text-aurora-fg">Avalanche Team1 (Thailand)</span>
              <span className="block truncate text-[11px] text-aurora-fg-muted">team1.network</span>
            </span>
          </span>
          <span className="shrink-0 font-mono text-[11px] text-aurora-carbon">Visit →</span>
        </a>
      </Card>

      <Card className="lg:col-span-3 lg:col-start-10 lg:row-span-3 lg:row-start-4 lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-fg-muted">Proof of retirement</p>
          <p className="mt-2.5 text-xs leading-relaxed text-aurora-fg-muted">
            One AI query is ~0.03–3 gCO₂e. On-chain minimum is 1 kg, so usage is batched into 0.001 t lots.
          </p>
          <ul className="mt-3 space-y-2 text-xs">
            {[
              { k: "Registry", v: "Carbonmark" },
              { k: "Settlement", v: "Avalanche Fuji" },
              { k: "Receipt", v: "CertificateReceipt" },
            ].map((r) => (
              <li key={r.k} className="flex items-center justify-between gap-3 border-b border-aurora-border/70 pb-2.5 last:border-0">
                <span className="text-aurora-fg-muted">{r.k}</span>
                <span className="truncate font-mono text-[11px] text-aurora-fg">{r.v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 lg:mt-0">
          {[
            { v: "0.03–3", l: "gCO₂e / query" },
            { v: "0.001", l: "t min batch" },
            { v: "Fuji", l: "C-Chain" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg border border-aurora-border bg-aurora-panel p-2.5 text-center">
              <p className="font-display text-base font-semibold text-aurora-fg">{s.v}</p>
              <p className="mt-1 text-[10px] text-aurora-fg-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.section>
  );
}
