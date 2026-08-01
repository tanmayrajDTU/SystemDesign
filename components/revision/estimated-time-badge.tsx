import { Clock } from "lucide-react";
import { formatMinutes } from "@/lib/revision-hub/estimate-time";

export function EstimatedTimeBadge({ minutes }: { minutes: number }) {
  if (!minutes || minutes <= 0) return null;
  return (
    <span className="flex items-center gap-1 text-xs text-ink-muted dark:text-ink-muted-dark">
      <Clock size={12} />
      {formatMinutes(minutes)} revision
    </span>
  );
}
