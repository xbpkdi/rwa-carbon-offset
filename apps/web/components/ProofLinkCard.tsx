"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProofLinkCardProps {
  title: string;
  description: string;
  href?: string;
  pending?: boolean;
  compact?: boolean;
  className?: string;
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function ProofLinkCard({
  title,
  description,
  href,
  pending = false,
  compact = false,
  className,
}: ProofLinkCardProps) {
  if (compact) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={pending}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "group flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-150",
          pending
            ? "cursor-not-allowed border-aurora-border bg-aurora-bg-raised opacity-70"
            : "border-aurora-border bg-aurora-bg-raised hover:border-aurora-border-strong",
          className,
        )}
      >
        <span className="min-w-0">
          <span className="block text-xs font-medium text-aurora-fg">{title}</span>
          <span className="block truncate text-[11px] text-aurora-fg-muted">{description}</span>
        </span>
        {pending ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] text-aurora-fg-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aurora-warn" />
            Pending
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-aurora-carbon">
            View proof
            <ExternalIcon className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </motion.a>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={pending}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={pending ? undefined : { y: -2 }}
      className={cn(
        "group flex flex-col justify-between rounded-2xl border p-5 transition-all duration-150",
        pending
          ? "cursor-not-allowed border-aurora-border bg-aurora-bg-raised opacity-70"
          : "border-aurora-border bg-aurora-bg-raised hover:border-aurora-border-strong",
        className,
      )}
    >
      <div>
        <h3 className="font-display text-base font-semibold text-aurora-fg">{title}</h3>
        <p className="mt-1 text-sm text-aurora-fg-muted">{description}</p>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-aurora-carbon">
        {pending ? (
          <>
            <span className="h-2 w-2 animate-pulse rounded-full bg-aurora-warn" />
            Pending
          </>
        ) : (
          <>
            View proof
            <ExternalIcon className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </div>
    </motion.a>
  );
}
