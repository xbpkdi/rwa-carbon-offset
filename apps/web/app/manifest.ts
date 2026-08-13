import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "rwa-carbon-offset",
    short_name: "rwa-offset",
    description:
      "Measure AI model CO₂ emissions, retire verified Carbonmark credits, and publish on-chain proof on Avalanche Fuji.",
    start_url: "/",
    display: "standalone",
    background_color: "#050807",
    theme_color: "#16A34A",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
