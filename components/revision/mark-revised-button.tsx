"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRevised } from "@/lib/revision-hub/use-revised";

export function MarkRevisedButton({
  id,
  size = 16,
  showLabel = false,
  className,
}: {
  id: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}) {
  const { isRevised, toggleRevised } = useRevised();
  const active = isRevised(id);

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => toggleRevised(id)}
      title={active ? "Marked as revised" : "Mark as revised"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-medium transition-colors",
        active
          ? "text-success"
          : "text-ink-muted dark:text-ink-muted-dark hover:text-success",
        className
      )}
    >
      {active ? <CheckCircle2 size={size} /> : <Circle size={size} />}
      {showLabel && <span>{active ? "Revised" : "Mark as revised"}</span>}
    </button>
  );
}
