"use client";

import type { Certificate } from "@/lib/certificates";
import { motion } from "framer-motion";
import { ProofPipeline } from "./ProofPipeline";
import { ProofLinkCard } from "./ProofLinkCard";
import { ShareActions } from "./ShareActions";
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
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-aurora-border bg-aurora-bg-raised",
        className,
      )}
    >
      <div className="h-1 w-full bg-aurora-carbon" />

      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-aurora-carbon">
              Retirement certificate
            </p>
            <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-aurora-fg sm:text-5xl">
              {certificate.tonnes.toFixed(3)}
              <span className="ml-1.5 text-xl font-medium text-aurora-fg-muted sm:text-2xl">tCO₂e</span>
              <span className="ml-2 text-base font-medium text-aurora-fg sm:text-lg">retired</span>
            </h1>
            <p className="mt-1 truncate text-xs text-aurora-fg-muted">
              {beneficiary} · {(certificate.mgCO2e / 1000).toFixed(2)} gCO₂e ·{" "}
              {new Date(certificate.createdAt).toLocaleDateString()}
            </p>
          </div>
          <ShareActions url={shareUrl} title={shareTitle} className="shrink-0" />
        </div>

        <ProofPipeline stages={stages} className="mt-3" />

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {certificate.carbonmarkUrl ? (
            <ProofLinkCard
              compact
              title="Carbonmark registry"
              description="Public retirement certificate"
              href={certificate.carbonmarkUrl}
            />
          ) : (
            <div className="rounded-xl border border-aurora-border bg-aurora-bg-raised px-3 py-2.5 text-xs text-aurora-fg-muted">
              Carbonmark certificate pending
            </div>
          )}
          {certificate.snowtraceUrl ? (
            <ProofLinkCard
              compact
              title="Fuji C-Chain"
              description="CertificateReceipt on Snowtrace"
              href={certificate.snowtraceUrl}
            />
          ) : (
            <div className="rounded-xl border border-aurora-border bg-aurora-bg-raised px-3 py-2.5 text-xs text-aurora-fg-muted">
              Fuji receipt pending
            </div>
          )}
        </div>

        <details className="mt-3 rounded-xl border border-aurora-border bg-aurora-bg-raised/50">
          <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-aurora-fg hover:text-aurora-carbon">
            Certificate details
          </summary>
          <div className="space-y-1.5 border-t border-aurora-border px-3 py-2 font-mono text-[11px] text-aurora-fg-muted">
            <div className="flex justify-between gap-3">
              <span>Source tx</span>
              <span className="truncate text-aurora-fg">{certificate.sourceTx ?? "Pending"}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Receipt ID</span>
              <span className="text-aurora-fg">{certificate.receiptId ?? "Pending"}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Certificate ID</span>
              <span className="truncate text-aurora-fg">{certificate.id}</span>
            </div>
          </div>
        </details>
      </div>
    </motion.article>
  );
}
