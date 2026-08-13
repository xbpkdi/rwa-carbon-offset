import type { Metadata } from "next";
import { Atmosphere } from "@/components/Atmosphere";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "rwa-carbon-offset — Measure AI emissions, retire real carbon",
  description:
    "Measure AI model CO₂ emissions, retire verified carbon credits via Carbonmark, and publish on-chain proof on Avalanche Fuji.",
  openGraph: {
    title: "rwa-carbon-offset — Measure AI emissions, retire real carbon",
    description:
      "Measure AI model CO₂ emissions, retire verified carbon credits via Carbonmark, and publish on-chain proof on Avalanche Fuji.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <div className="relative flex min-h-screen flex-col">
          <div className="aurora-field" aria-hidden="true" />
          <Atmosphere />
          <SiteHeader />
          <main className="relative flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
