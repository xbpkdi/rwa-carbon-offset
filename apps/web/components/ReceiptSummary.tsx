"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReceiptSummaryProps {
  tonnes: number;
  grams: number;
  className?: string;
}

export function ReceiptSummary({ tonnes, grams, className }: ReceiptSummaryProps) {
  const rows = [
    { label: "Registry", value: "Carbonmark" },
    { label: "Chain receipt", value: "Fuji CertificateReceipt" },
    { label: "Batch minimum", value: "0.001 t" },
    { label: "Mid footprint", value: `${grams.toFixed(2)} gCO₂e` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("overflow-hidden rounded-xl border border-aurora-border bg-aurora-bg-raised", className)}
    >
      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-carbon">Retirement preview</p>
        <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-aurora-fg">
          {tonnes.toFixed(3)}
          <span className="ml-1 text-base font-medium text-aurora-fg-muted">tCO₂e</span>
        </p>

        <div className="mt-3 space-y-2 border-t border-aurora-border pt-3">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-3 text-xs">
              <span className="text-aurora-fg-muted">{row.label}</span>
              <span className="text-right font-medium text-aurora-fg">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
