"use client";

import { useState } from "react";
import { Btn } from "./ui/Btn";
import { cn } from "@/lib/utils";

interface ShareActionsProps {
  url: string;
  title: string;
  className?: string;
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function ShareActions({ url, title, className }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // ignore
      }
    } else {
      await handleCopy();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Btn variant="secondary" size="sm" onClick={handleCopy} className="gap-2">
        <CopyIcon className="h-4 w-4" />
        {copied ? "Copied" : "Copy link"}
      </Btn>
      <Btn variant="secondary" size="sm" onClick={handleShare} className="gap-2">
        <ShareIcon className="h-4 w-4" />
        Share
      </Btn>
    </div>
  );
}
