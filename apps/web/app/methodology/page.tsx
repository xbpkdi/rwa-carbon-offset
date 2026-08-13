"use client";

import { motion } from "framer-motion";
import { SectionIntro } from "@/components/ui/SectionIntro";

export default function MethodologyPage() {
  const sections = [
    {
      title: "Factor model",
      body: "Each model has an output factor and an input factor (mg CO₂e per 1,000 tokens). We add a fixed overhead, convert to energy using a grid intensity of 400 gCO₂e/kWh, apply a PUE of 1.1, and add a small embodied emissions term per request.",
    },
    {
      title: "Range",
      body: "Low = 0.4× mid. High = 2.5× mid. The mid estimate is what we use to size the retirement batch.",
    },
    {
      title: "Retirement",
      body: "Carbonmark credits are retired in 0.001 t batches. We round the mid estimate up to the next 0.001 t, never down, so the retirement always covers the footprint.",
    },
    {
      title: "On-chain proof",
      body: "A CertificateReceipt contract on Avalanche Fuji C-Chain stores the retirement metadata. The certificate page links to the public Carbonmark retirement certificate and the Fuji transaction on Snowtrace.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1100px] px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
      <SectionIntro
        kicker="Methodology"
        title="How estimates work"
        body="Published per-request emissions figures span 65× or more. We show a defensible range, not fake precision."
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
