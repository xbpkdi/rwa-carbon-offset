"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  tint?: "signal" | "carbon";
}

export function Globe({ className, tint = "signal" }: GlobeProps) {
  const color = tint === "carbon" ? "#16A34A" : "#16A34A";
  const gid = `iris-${tint}`;

  return (
    <div className={cn("pointer-events-none", className)}>
      <motion.svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="45%" stopColor="#4FB477" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="95"
          stroke={`url(#${gid})`}
          strokeOpacity="0.55"
          strokeWidth="0.8"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="95"
          ry="52"
          stroke={`url(#${gid})`}
          strokeOpacity="0.3"
          strokeWidth="0.7"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="58"
          ry="95"
          stroke={`url(#${gid})`}
          strokeOpacity="0.25"
          strokeWidth="0.7"
        />
        <circle cx="100" cy="100" r="95" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="70" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="45" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
        <ellipse
          cx="100"
          cy="100"
          rx="95"
          ry="35"
          stroke={color}
          strokeOpacity="0.14"
          strokeWidth="0.5"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="95"
          ry="70"
          stroke={color}
          strokeOpacity="0.12"
          strokeWidth="0.5"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="35"
          ry="95"
          stroke={color}
          strokeOpacity="0.14"
          strokeWidth="0.5"
        />
        <path
          d="M100 5C55 5 20 45 20 100C20 155 55 195 100 195C145 195 180 155 180 100C180 45 145 5 100 5Z"
          stroke={color}
          strokeOpacity="0.1"
          strokeWidth="0.5"
        />
        <path
          d="M5 100C5 55 45 20 100 20C155 20 195 55 195 100"
          stroke={color}
          strokeOpacity="0.08"
          strokeWidth="0.5"
        />
        <g stroke={color} strokeOpacity="0.06" strokeWidth="0.5">
          <line x1="100" y1="5" x2="100" y2="195" />
          <line x1="5" y1="100" x2="195" y2="100" />
        </g>
      </motion.svg>
    </div>
  );
}
