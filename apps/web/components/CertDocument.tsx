"use client";

import type { Certificate } from "@/lib/certificates";
import { motion } from "framer-motion";
import { ProofPipeline } from "./ProofPipeline";
import { ProofLinkCard } from "./ProofLinkCard";
import { ShareActions } from "./ShareActions";
import { Globe } from "./Globe";
import { cn } from "@/lib/utils";

interface CertDocumentProps {
  certificate: Certificate;
  shareUrl?: string;
  className?: string;
}

export function CertDocument({ certificate, shareUrl: shareUrlProp, className }: CertDocumentProps) {
  const shareUrl = shareUrlProp ?? `/certificate/${certificate.id}`;
  const shareTitle = `${certificate.tonnes.toFixed(3)} tCO₂e retired · rwa-carbon-offset`;
  const beneficiary = certificate.beneficiary ?? "RWA Carbon Offset";

  const stages = [
    { label: "Estimate", status: "complete" as const },
    {
      label: "Carbonmark",
      status: certificate.carbonmarkUrl ? ("complete" as const) : ("pending" as const),
    },
    {
      label: "Fuji receipt",
      status: certificate.snowtraceUrl ? ("complete" as const) : ("pending" as const),
    },
    { label: "Certificate", status: "complete" as const },
  ];

  return (
    <div className={cn("relative", className)}>
      <Globe
        className="absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-20"
        tint="carbon"
      />
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-aurora-border bg-aurora-bg-raised"
      >
        <div className="h-1 w-full bg-aurora-carbon" />

        <div className="p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aurora-carbon">
                Retirement certificate
              </p>
              <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-aurora-fg sm:text-6xl">
                {certificate.tonnes.toFixed(3)}
                <span className="ml-2 text-2xl font-medium text-aurora-fg-muted sm:text-3xl">
                  tCO₂e
                </span>
              </h1>
              <p className="mt-1 text-lg font-medium text-aurora-fg">retired</p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-aurora-fg-muted">
                <span className="font-medium text-aurora-fg">{beneficiary}</span>
                <span aria-hidden="true">·</span>
                <span>Issued {new Date(certificate.createdAt).toUTCString()}</span>
              </div>
              <p className="mt-1 text-sm text-aurora-fg-muted">
                Mid estimate {(certificate.mgCO2e / 1000).toFixed(2)} gCO₂e (
                {certificate.mgCO2e.toLocaleString()} mg)
              </p>
            </div>

            <ShareActions url={shareUrl} title={shareTitle} />
          </div>

          <div className="mt-5">
            <ProofPipeline stages={stages} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {certificate.carbonmarkUrl ? (
              <ProofLinkCard
                title="Carbonmark registry"
                description="Public retirement certificate"
                href={certificate.carbonmarkUrl}
                className="!p-4"
              />
            ) : (
              <div className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-4 text-sm text-aurora-fg-muted">
                Carbonmark certificate pending
              </div>
            )}
            {certificate.snowtraceUrl ? (
              <ProofLinkCard
                title="Fuji C-Chain"
                description="CertificateReceipt on Snowtrace"
                href={certificate.snowtraceUrl}
                className="!p-4"
              />
            ) : (
              <div className="rounded-xl border border-aurora-border bg-aurora-bg-raised p-4 text-sm text-aurora-fg-muted">
                Fuji receipt pending — certificate remains valid via Carbonmark
              </div>
            )}
          </div>

          <details className="mt-5 rounded-2xl border border-aurora-border bg-aurora-bg-raised/50">
            <summary className="cursor-pointer p-3 text-sm font-semibold text-aurora-fg hover:text-aurora-carbon">
              Certificate details
            </summary>
            <div className="space-y-2 border-t border-aurora-border p-3 font-mono text-xs text-aurora-fg-muted">
              <div className="flex justify-between gap-4">
                <span>Source transaction</span>
                <span className="truncate text-aurora-fg">{certificate.sourceTx ?? "Pending"}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Receipt ID</span>
                <span className="text-aurora-fg">{certificate.receiptId ?? "Pending"}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Certificate ID</span>
                <span className="text-aurora-fg">{certificate.id}</span>
              </div>
            </div>
          </details>
        </div>
      </motion.article>
    </div>
  );
}
