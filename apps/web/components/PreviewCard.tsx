"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Globe } from "./Globe";

interface PreviewCardProps {
  className?: string;
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-aurora-carbon/20 bg-aurora-carbon-soft px-2.5 py-1 text-xs font-semibold text-aurora-carbon",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Verified
    </motion.div>
  );
}

export function PreviewCard({ className }: PreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-aurora-border bg-aurora-bg-raised",
        className,
      )}
    >
      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aurora-carbon">
              Retirement preview
            </p>
            <p className="mt-4 font-display text-5xl font-semibold tracking-tight text-aurora-fg sm:text-6xl">
              0.001
            </p>
            <p className="text-lg font-medium text-aurora-fg-muted">tCO₂e retired</p>
          </div>
          <VerifiedBadge />
        </div>

        <div className="mt-8 space-y-3 border-t border-aurora-border pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-aurora-fg-muted">Registry</span>
            <span className="font-medium text-aurora-fg">Carbonmark</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-aurora-fg-muted">Chain</span>
            <span className="font-medium text-aurora-fg">Avalanche Fuji</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-aurora-fg-muted">Beneficiary</span>
            <span className="font-medium text-aurora-fg">Your org</span>
          </div>
        </div>
      </div>

      <Globe
        className="absolute -bottom-8 -right-8 h-48 w-48 opacity-30 sm:h-56 sm:w-56"
        tint="carbon"
      />
    </motion.div>
  );
}
