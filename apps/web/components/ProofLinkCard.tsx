"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProofLinkCardProps {
  title: string;
  description: string;
  href?: string;
  pending?: boolean;
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
  className,
}: ProofLinkCardProps) {
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
