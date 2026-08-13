"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: ReactNode;
  unit?: string;
  note?: string;
  accent?: boolean;
  className?: string;
}

export function StatCard({ label, value, unit, note, accent = false, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "rounded-xl border p-5 transition-colors",
        accent
          ? "border-aurora-carbon/35 bg-aurora-carbon-panel"
          : "border-aurora-border bg-aurora-bg-raised",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.12em]",
          accent ? "text-aurora-carbon" : "text-aurora-fg-muted",
        )}
      >
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-semibold tracking-tight text-aurora-fg sm:text-4xl">
          {value}
        </span>
        {unit && <span className="text-lg font-medium text-aurora-fg-muted">{unit}</span>}
      </div>
      {note && <p className="mt-2 text-sm text-aurora-fg-muted">{note}</p>}
    </motion.div>
  );
}
