"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function XLink({ handle, href }: { handle: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-aurora-border bg-aurora-panel px-4 py-2.5 text-sm font-medium text-aurora-fg transition-all hover:border-aurora-border-strong hover:bg-aurora-bg-raised"
    >
      <XIcon className="h-4 w-4 text-aurora-fg-muted" />
      <span>{handle}</span>
      <ExternalIcon className="ml-1 h-3.5 w-3.5 text-aurora-fg-muted" />
    </a>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const isFlowPage =
    pathname === "/estimate" ||
    pathname === "/checkout" ||
    pathname.startsWith("/certificate");

  if (isFlowPage) {
    return (
      <footer className="w-full px-3 pb-2 pt-0 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-[1500px] text-center font-mono text-[10px] text-aurora-fg-muted">
          <a href="https://www.protocolcamp.com" target="_blank" rel="noopener noreferrer" className="hover:text-aurora-carbon">
            Protocol Camp
          </a>
          {" · "}
          <a href="https://www.team1.network" target="_blank" rel="noopener noreferrer" className="hover:text-aurora-carbon">
            Avalanche Team1 (Thailand)
          </a>
        </p>
      </footer>
    );
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full px-3 pb-3 pt-0 sm:px-6 sm:pb-4 lg:px-8"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl glass-panel p-4 sm:flex-row sm:items-center sm:px-5 sm:py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <BrandMark className="h-10 w-10 shrink-0" />
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-display text-lg font-semibold tracking-tight text-aurora-fg">
                rwa-carbon-offset
              </span>
              <span className="text-sm text-aurora-fg-muted">Verified AI-emissions retirement on Avalanche</span>
            </div>
          </Link>
          <div className="flex flex-wrap gap-3">
            <XLink handle="@ktsukixb" href="https://x.com/ktsukixb" />
            <XLink handle="@101beere" href="https://x.com/101beere" />
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center justify-between gap-2 px-4 text-xs text-aurora-fg-muted sm:flex-row sm:px-5">
          <p className="font-mono">
            <a href="https://www.team1.network" target="_blank" rel="noopener noreferrer" className="text-aurora-fg transition-colors hover:text-aurora-carbon">
              Avalanche Team1 (Thailand)
            </a>
          </p>
          <a
            href="https://www.protocolcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-aurora-border bg-aurora-panel px-3 py-1 transition-colors hover:border-aurora-border-strong"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-aurora-carbon" />
            Built for Protocol Camp
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
