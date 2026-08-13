import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16A34A",
          borderRadius: 36,
        }}
      >
        <svg viewBox="0 0 40 40" width="120" height="120" fill="none">
          <circle cx="20" cy="20" r="12" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path
            d="M14.5 20.5l4 4 8-9"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
