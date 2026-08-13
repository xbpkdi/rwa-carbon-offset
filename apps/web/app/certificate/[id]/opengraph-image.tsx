import { ImageResponse } from "next/og";
import { getCertificate } from "@/lib/certificates";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = getCertificate(id);
  const tonnes = cert?.tonnes ?? 0.001;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#050807",
          color: "#f2f6f4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ height: 8, background: "#4ef08f" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72 }}>
          <div style={{ fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4ef08f", fontWeight: 700 }}>
            Retirement certificate
          </div>
          <div>
            <div style={{ fontSize: 28, marginBottom: 16, color: "rgba(226,232,229,0.66)" }}>rwa-carbon-offset</div>
            <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>{tonnes.toFixed(3)} tCO₂e retired</div>
            <div style={{ fontSize: 24, marginTop: 24, color: "rgba(226,232,229,0.66)" }}>Carbonmark · Avalanche Fuji C-Chain</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
