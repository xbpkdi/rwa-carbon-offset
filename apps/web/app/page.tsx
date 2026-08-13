import { getHomeStats, formatMg, formatTonnes } from "@/lib/stats";
import { HomePageClient } from "@/components/HomePageClient";

export default function HomePage() {
  const stats = getHomeStats();
  return (
    <HomePageClient
      stats={stats}
      formatted={{
        totalMgCO2e: formatMg(stats.totalMgCO2e),
        totalTonnesRetired: formatTonnes(stats.totalTonnesRetired),
        certificateCount: stats.certificateCount.toLocaleString(),
        uniqueBeneficiaries: stats.uniqueBeneficiaries.toLocaleString(),
        monthlyMgCO2e: `${formatMg(stats.monthlyMgCO2e)} g`,
        yearlyMgCO2e: `${formatMg(stats.yearlyMgCO2e)} g`,
      }}
    />
  );
}
