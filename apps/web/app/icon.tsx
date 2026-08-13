import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
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
    ),
    size,
  );
}
