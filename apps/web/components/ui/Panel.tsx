import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "accent";
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "glass-panel",
      elevated: "glass-panel transition-all duration-150 hover:glass-panel-hover",
      accent: "border border-aurora-carbon/20 bg-aurora-carbon-soft",
    };

    return (
      <div ref={ref} className={cn("rounded-xl p-5", variants[variant], className)} {...props}>
        {children}
      </div>
    );
  },
);

Panel.displayName = "Panel";
