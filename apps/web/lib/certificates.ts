import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

export type Certificate = {
  id: string;
  tonnes: number;
  mgCO2e: number;
  carbonmarkUrl: string | null;
  sourceTx: string | null;
  snowtraceUrl: string | null;
  receiptId: string | null;
  createdAt: string;
  beneficiary?: string;
};

const file = resolve(process.cwd(), ".data/certificates.json");

export function listCertificates(): Certificate[] {
  if (!existsSync(file)) return [];
  return JSON.parse(readFileSync(file, "utf8")) as Certificate[];
}

export function getCertificate(id: string): Certificate | undefined {
  return listCertificates().find((row) => row.id === id);
}

export function addCertificate(cert: Certificate) {
  const rows = listCertificates();
  rows.push(cert);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(rows, null, 2));
}
