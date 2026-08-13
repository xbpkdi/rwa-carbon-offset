import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, label, hint, options, id, ...props }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label htmlFor={selectId} className="text-sm font-medium text-aurora-fg">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className="w-full appearance-none rounded-lg border border-aurora-border bg-aurora-bg-raised px-4 py-2.5 pr-10 text-sm text-aurora-fg focus:border-aurora-signal focus:outline-none focus:ring-2 focus:ring-aurora-signal/20"
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-aurora-fg-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {hint && <p className="text-xs text-aurora-fg-muted">{hint}</p>}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
