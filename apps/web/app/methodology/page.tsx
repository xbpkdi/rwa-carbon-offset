"use client";

import { motion } from "framer-motion";
import { SectionIntro } from "@/components/ui/SectionIntro";

export default function MethodologyPage() {
  const sections = [
    {
      title: "Factor model",
      body: "Each model has separate input and output factors (mg CO₂e per 1,000 tokens). We add fixed overhead, convert to energy at 400 gCO₂e/kWh, apply a PUE of 1.1, and include a small embodied-emissions term per request.",
    },
    {
      title: "Range",
      body: "Low is 0.4× the mid estimate; high is 2.5× mid. We use the mid value to size each retirement batch.",
    },
    {
      title: "Retirement",
      body: "Carbonmark credits retire in 0.001 t batches. We round the mid estimate up to the next 0.001 t, never down, so each batch always covers the footprint.",
    },
    {
      title: "On-chain proof",
      body: "A CertificateReceipt contract on Avalanche Fuji C-Chain stores retirement metadata. The certificate page links to the public Carbonmark record and the Fuji transaction on Snowtrace.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1100px] px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
      <SectionIntro
        kicker="Methodology"
        title="How estimates work"
        body="Published per-request estimates can differ by 65× or more. We report a range instead of a single precise number."
      />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {sections.map((section, idx) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.22, delay: idx * 0.03, ease: "easeOut" }}
            className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-5"
          >
            <h2 className="font-display text-lg font-semibold text-aurora-fg">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-aurora-fg-muted">{section.body}</p>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
