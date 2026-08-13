import type { Certificate } from "@/lib/certificates";

export const DEMO_CERTIFICATE: Certificate = {
  id: "demo",
  tonnes: 0.001,
  mgCO2e: 31_000,
  carbonmarkUrl: "https://www.carbonmark.com/",
  sourceTx: "0x6693fd3aa6610c4ce86ce3e8b1f245e4c0f0d91885e06aa18a43d00bbd92ae8b",
  snowtraceUrl: "https://testnet.snowtrace.io/",
  receiptId: "42",
  createdAt: new Date("2026-08-12T12:00:00.000Z").toISOString(),
  beneficiary: "RWA Carbon Offset",
};
