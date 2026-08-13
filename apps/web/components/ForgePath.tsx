"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Step {
  number: string;
  label: string;
  hint?: string;
}

const steps: Step[] = [
  { number: "01", label: "Estimate", hint: "Model usage" },
  { number: "02", label: "Retire", hint: "Carbon credit" },
  { number: "03", label: "Certificate", hint: "Public proof" },
];

interface ForgePathProps {
  activeStep?: number;
  compact?: boolean;
  className?: string;
}

export function ForgePath({ activeStep = 0, compact = false, className }: ForgePathProps) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      <ol
        className={cn(
          "flex items-stretch justify-between gap-2",
          compact
            ? "rounded-xl border border-aurora-border bg-aurora-bg-raised/50 p-2"
            : "gap-4 md:gap-6",
        )}
      >
        {steps.map((step, idx) => {
          const isActive = activeStep === idx + 1;
          const isComplete = activeStep > idx + 1;
          const isPending = activeStep < idx + 1;

          return (
            <li key={step.number} className="relative flex-1">
              <div
                className={cn(
                  "flex h-full flex-col transition-all",
                  compact ? "rounded-lg px-3 py-2" : "rounded-xl border p-4 sm:p-5",
                  isActive && !compact && "border-aurora-carbon/40 bg-aurora-carbon-panel",
                  isComplete && !compact && "border-aurora-carbon/20 bg-aurora-bg-raised",
                  isPending && !compact && "border-aurora-border bg-aurora-bg-raised",
                  compact && isActive && "bg-aurora-carbon-panel",
                  compact && (isComplete || isPending) && "bg-transparent",
                )}
              >
                <span
                  className={cn(
                    "font-display text-xl font-semibold leading-none",
                    isActive && "text-aurora-carbon",
                    isComplete && "text-aurora-carbon",
                    isPending && "text-aurora-fg-muted/40",
                  )}
                >
                  {step.number}
                </span>
                <span
                  className={cn(
                    "mt-2 text-sm font-semibold",
                    isActive && "text-aurora-fg",
                    isComplete && "text-aurora-fg",
                    isPending && "text-aurora-fg-muted",
                  )}
                >
                  {step.label}
                </span>
                {!compact && step.hint && (
                  <span className="mt-1 text-xs text-aurora-fg-muted">{step.hint}</span>
                )}
              </div>
              {isActive && !compact && (
                <motion.div
                  layoutId="activeStepGlow"
                  className="absolute inset-0 -z-10 rounded-2xl bg-aurora-carbon/5 blur-xl"
                  transition={{ duration: 0.3 }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
