import { cn } from "@/lib/utils";

export function Orb({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden="true">
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(78,240,143,0.16),transparent_68%)] blur-2xl" />
      <img
        src="/orb.webp"
        alt=""
        width={900}
        height={900}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="relative h-full w-full select-none object-contain"
      />
    </div>
  );
}
