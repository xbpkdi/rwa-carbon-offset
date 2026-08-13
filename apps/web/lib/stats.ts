import { listCertificates } from "@/lib/certificates";

export type LandingStats = {
  totalMgCO2e: number;
  totalTonnesRetired: number;
  certificateCount: number;
  uniqueBeneficiaries: number;
  monthlyMgCO2e: number;
  yearlyMgCO2e: number;
  hasData: boolean;
};

export function aggregateLandingStats(): LandingStats {
  const certs = listCertificates();
  const totalMgCO2e = certs.reduce((sum, c) => sum + c.mgCO2e, 0);
  const totalTonnesRetired = certs.reduce((sum, c) => sum + c.tonnes, 0);
  const beneficiaries = new Set(certs.map((c) => c.beneficiary ?? "unknown"));

  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const yearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));

  const monthlyMgCO2e = certs
    .filter((c) => new Date(c.createdAt) >= monthStart)
    .reduce((sum, c) => sum + c.mgCO2e, 0);

  const yearlyMgCO2e = certs
    .filter((c) => new Date(c.createdAt) >= yearStart)
    .reduce((sum, c) => sum + c.mgCO2e, 0);

  return {
    totalMgCO2e,
    totalTonnesRetired,
    certificateCount: certs.length,
    uniqueBeneficiaries: beneficiaries.size,
    monthlyMgCO2e,
    yearlyMgCO2e,
    hasData: certs.length > 0,
  };
}

export function formatMg(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function formatTonnes(value: number) {
  if (value >= 1) return `${value.toFixed(3)} t`;
  if (value >= 0.001) return `${(value * 1000).toFixed(1)} kg`;
  return `${(value * 1_000_000).toFixed(0)} g`;
}

/** Illustrative baseline when no retirements yet — keeps dashboard readable in demos. */
export const BASELINE_STATS: LandingStats = {
  totalMgCO2e: 7_541_390,
  totalTonnesRetired: 1.204,
  certificateCount: 2340,
  uniqueBeneficiaries: 1203,
  monthlyMgCO2e: 32_540,
  yearlyMgCO2e: 1_387_075,
  hasData: false,
};

export type HomeStats = LandingStats & { illustrative: boolean };

export function getHomeStats(): HomeStats {
  const stats = aggregateLandingStats();
  if (stats.hasData) return { ...stats, illustrative: false };
  return { ...BASELINE_STATS, illustrative: true };
}
