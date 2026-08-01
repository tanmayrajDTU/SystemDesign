"use client";

import { FileDown } from "lucide-react";
import { triggerPrint } from "@/lib/revision-hub/print";

// "Export as PDF" and "Print" intentionally share one mechanism — see
// lib/revision-hub/print.ts for why. This button just sets user expectation
// via its label/icon and picks the PDF destination for people who open the
// system print dialog looking for it.
export function ExportPdfButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={triggerPrint}
      title="Opens your browser's print dialog — choose 'Save as PDF' as the destination"
      className={
        className ??
        "no-print flex items-center gap-1.5 rounded-lg border border-border dark:border-border-dark px-3 py-1.5 text-xs font-medium text-ink-muted dark:text-ink-muted-dark hover:border-signal-500/50 hover:text-ink dark:hover:text-ink-dark"
      }
    >
      <FileDown size={14} />
      Export PDF
    </button>
  );
}
