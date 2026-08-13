import type { ReactNode } from "react";
import { ForgePath } from "@/components/ForgePath";

type FlowShellProps = {
  step: 1 | 2 | 3;
  children: ReactNode;
};

export function FlowShell({ step, children }: FlowShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-3 py-2 sm:px-6 lg:px-8">
      <ForgePath activeStep={step} compact className="mb-2 shrink-0" />
      {children}
    </div>
  );
}
