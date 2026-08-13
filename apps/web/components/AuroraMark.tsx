export function AuroraMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="12" fill="#16A34A" />
      <path
        d="M20 8C13 8 8 14 8 21C8 28 13 32 20 32C27 32 32 28 32 21C32 14 27 8 20 8Z"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeOpacity="0.9"
        fill="none"
      />
      <path
        d="M20 12C15 12 12 17 12 21C12 26 15 28 20 28C25 28 28 26 28 21C28 17 25 12 20 12Z"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeOpacity="0.7"
        fill="none"
      />
      <path d="M20 16V26" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 20C22 19.5 24 18 25 16" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M20 23C18 22.5 16 21 15 19" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Shared mark for favicon routes — keep in sync with AuroraMark / public/favicon.svg */
export function auroraMarkSvg(size: number) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <rect width="40" height="40" rx="12" fill="#16A34A" />
      <path
        d="M20 8C13 8 8 14 8 21C8 28 13 32 20 32C27 32 32 28 32 21C32 14 27 8 20 8Z"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeOpacity="0.9"
        fill="none"
      />
      <path
        d="M20 12C15 12 12 17 12 21C12 26 15 28 20 28C25 28 28 26 28 21C28 17 25 12 20 12Z"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeOpacity="0.7"
        fill="none"
      />
      <path d="M20 16V26" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 20C22 19.5 24 18 25 16" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M20 23C18 22.5 16 21 15 19" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
