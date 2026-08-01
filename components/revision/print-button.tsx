"use client";

import { Printer } from "lucide-react";
import { triggerPrint } from "@/lib/revision-hub/print";

export function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={triggerPrint}
      className={
        className ??
        "no-print flex items-center gap-1.5 rounded-lg border border-border dark:border-border-dark px-3 py-1.5 text-xs font-medium text-ink-muted dark:text-ink-muted-dark hover:border-signal-500/50 hover:text-ink dark:hover:text-ink-dark"
      }
    >
      <Printer size={14} />
      Print
    </button>
  );
}
