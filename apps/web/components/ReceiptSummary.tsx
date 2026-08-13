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
    { label: "Project", value: "Carbonmark sandbox lot" },
    { label: "Registry", value: "Carbonmark public certificate" },
    { label: "Chain receipt", value: "Avalanche Fuji CertificateReceipt" },
    { label: "Batch minimum", value: "0.001 t (not per prompt)" },
    { label: "Mid footprint", value: `${grams.toFixed(2)} gCO₂e` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "overflow-hidden rounded-xl border border-aurora-border bg-aurora-bg-raised",
        className,
      )}
    >
      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aurora-carbon">
          Retirement preview
        </p>
        <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-aurora-fg sm:text-4xl">
          {tonnes.toFixed(3)}
        </p>
        <p className="text-base font-medium text-aurora-fg-muted">tCO₂e</p>

        <div className="mt-4 space-y-2 border-t border-aurora-border pt-4">
          {rows.map((row, idx) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex justify-between gap-4 text-sm"
            >
              <span className="text-aurora-fg-muted">{row.label}</span>
              <span className="text-right font-medium text-aurora-fg">{row.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
