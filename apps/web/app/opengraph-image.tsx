import { ImageResponse } from "next/og";

export const alt = "rwa-carbon-offset — Measure AI emissions, retire real carbon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(145deg, #050807 0%, #0a1510 55%, #071209 100%)",
          color: "#f2f6f4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ height: 10, background: "#4ef08f" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 22,
                background: "#16A34A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg viewBox="0 0 40 40" width="52" height="52" fill="none">
                <circle cx="20" cy="20" r="12" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
                <path
                  d="M14.5 20.5l4 4 8-9"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 22,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#4ef08f",
                  fontWeight: 700,
                }}
              >
                Carbon retirement
              </div>
              <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.05, marginTop: 8 }}>rwa-carbon-offset</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.2, maxWidth: 900 }}>
              Measure AI emissions. Retire real carbon.
            </div>
            <div style={{ fontSize: 24, marginTop: 20, color: "rgba(226,232,229,0.72)" }}>
              Carbonmark verified credits · Avalanche Fuji C-Chain receipt
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              {["Estimate", "Retire", "Certificate"].map((label) => (
                <div
                  key={label}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 999,
                    border: "1px solid rgba(78,240,143,0.35)",
                    background: "rgba(78,240,143,0.08)",
                    color: "#4ef08f",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
