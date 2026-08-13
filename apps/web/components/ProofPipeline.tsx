"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stage {
  label: string;
  status: "complete" | "pending";
}

interface ProofPipelineProps {
  stages: Stage[];
  className?: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}

export function ProofPipeline({ stages, className }: ProofPipelineProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Proof pipeline">
      {stages.map((stage, idx) => (
        <motion.div
          key={stage.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: idx * 0.08 }}
          className="flex items-center gap-2"
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium",
              stage.status === "complete"
                ? "border-aurora-carbon/20 bg-aurora-carbon-soft text-aurora-carbon"
                : "border-aurora-border bg-aurora-panel text-aurora-fg-muted",
            )}
          >
            {stage.status === "complete" ? (
              <CheckIcon className="h-3.5 w-3.5" />
            ) : (
              <DotIcon className="h-3.5 w-3.5" />
            )}
            {stage.label}
          </span>
          {idx < stages.length - 1 && (
            <span className="text-aurora-border" aria-hidden="true">
              |
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
