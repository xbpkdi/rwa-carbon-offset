export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="11" fill="#16A34A" />
      <circle cx="20" cy="20" r="12" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.9" fill="none" />
      <path
        d="M14.5 20.5l4 4 8-9"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shared mark for OG icon routes — keep in sync with BrandMark / public/favicon.svg */
export function brandMarkSvg(size: number) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      <rect width="40" height="40" rx="11" fill="#16A34A" />
      <circle cx="20" cy="20" r="12" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.9" fill="none" />
      <path
        d="M14.5 20.5l4 4 8-9"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
