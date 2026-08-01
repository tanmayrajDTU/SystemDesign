"use client";

import { useRevisionProgress } from "@/lib/revision-hub/use-revised";

export function ProgressSummary({ allIds }: { allIds: string[] }) {
  const { revisedCount, total, hydrated } = useRevisionProgress(allIds);

  if (total === 0) return null;

  // Avoid flashing "0 of N" before localStorage has hydrated client-side.
  const pct = hydrated && total > 0 ? Math.round((revisedCount / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-raised dark:bg-surface-raised-dark">
        <div
          className="h-full rounded-full bg-success transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-ink-muted dark:text-ink-muted-dark">
        {hydrated ? `${revisedCount} of ${total} revised` : "—"}
      </span>
    </div>
  );
}
