import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label htmlFor={inputId} className="text-sm font-medium text-aurora-fg">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-lg border border-aurora-border bg-aurora-bg-raised px-4 py-2.5 text-sm text-aurora-fg placeholder:text-aurora-fg-muted/50 focus:border-aurora-signal focus:outline-none focus:ring-2 focus:ring-aurora-signal/20",
            props.type === "number" && "tabular-nums",
          )}
          {...props}
        />
        {hint && <p className="text-xs text-aurora-fg-muted">{hint}</p>}
      </div>
    );
  },
);

TextField.displayName = "TextField";
