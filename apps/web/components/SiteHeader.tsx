"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", exact: true },
  { href: "/estimate", label: "Estimate" },
  { href: "/checkout", label: "Checkout" },
  { href: "/certificate/demo", label: "Certificate" },
  { href: "/methodology", label: "Methodology" },
];

function NavLink({ href, label, exact, compact }: { href: string; label: string; exact?: boolean; compact?: boolean }) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        compact ? "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors" : "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? compact
            ? "border border-aurora-border-strong bg-aurora-panel text-aurora-fg"
            : "border border-aurora-border-strong bg-aurora-panel text-aurora-fg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
          : compact
            ? "border border-transparent text-aurora-fg-muted hover:text-aurora-fg"
            : "text-aurora-fg-muted hover:text-aurora-fg",
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8"
    >
      <div className="mx-auto max-w-[1500px] rounded-2xl glass-panel px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <BrandMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-display text-base font-semibold tracking-tight text-aurora-fg sm:text-lg">
                rwa-carbon-offset
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-aurora-fg-muted sm:inline">
                Carbon Retirement
              </span>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-aurora-border bg-aurora-bg-raised/60 p-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-aurora-border bg-aurora-panel px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-carbon opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-carbon" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-aurora-fg-muted">
              Fuji <span className="hidden sm:inline">· Live</span>
            </span>
          </div>
        </div>

        <nav
          aria-label="Primary mobile"
          className="-mx-1 mt-2.5 flex items-center gap-1 overflow-x-auto pb-0.5 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} compact />
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
