import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(
  (
    { className, variant = "primary", size = "md", isLoading, children, disabled, ...props },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-aurora-carbon text-[#04100c] font-semibold border-transparent shadow-[0_8px_24px_-12px_rgba(78,240,143,0.8)] hover:bg-white hover:text-[#04100c] focus-visible:ring-aurora-carbon/40",
      secondary:
        "bg-aurora-panel text-aurora-fg border-aurora-border hover:bg-aurora-bg-raised hover:border-aurora-border-strong",
      ghost:
        "bg-transparent text-aurora-fg-muted border-transparent hover:bg-aurora-panel hover:text-aurora-fg",
      outline:
        "bg-transparent text-aurora-fg border-aurora-border hover:bg-aurora-panel hover:border-aurora-border-strong",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border font-medium transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-aurora-bg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          isLoading && variant === "primary" && "shimmer",
          className,
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Btn.displayName = "Btn";
