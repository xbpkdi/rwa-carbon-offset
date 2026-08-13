"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResourceRowProps {
  title: string;
  description: string;
  href?: string;
  className?: string;
}

function ArrowIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

export function ResourceRow({ title, description, href, className }: ResourceRowProps) {
  const Wrapper = href ? motion.a : motion.div;
  return (
    <Wrapper
      href={href}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={href ? { x: 4 } : undefined}
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-aurora-border bg-aurora-bg-raised p-4 transition-all duration-150 hover:border-aurora-border-strong hover:bg-aurora-bg-raised sm:p-5",
        href && "cursor-pointer",
        className,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aurora-carbon-soft text-aurora-carbon">
        <ArrowIcon className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-0.5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-semibold text-aurora-fg">{title}</h3>
        <p className="mt-0.5 text-sm text-aurora-fg-muted">{description}</p>
      </div>
    </Wrapper>
  );
}
