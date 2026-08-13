"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  kicker?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionIntro({
  kicker,
  title,
  body,
  align = "left",
  className,
}: SectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {kicker && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-aurora-carbon">
          {kicker}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-aurora-fg sm:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-3 text-base leading-relaxed text-aurora-fg-muted">{body}</p>}
    </motion.div>
  );
}
