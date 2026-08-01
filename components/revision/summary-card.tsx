import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "./bookmark-button";
import { MarkRevisedButton } from "./mark-revised-button";
import type { SummaryCardData } from "@/lib/revision-hub/types";

export function SummaryCard({
  id,
  title,
  points,
  topic,
  difficulty,
}: SummaryCardData & { id: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border dark:border-border-dark p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-sm font-semibold text-ink dark:text-ink-dark">
          {title}
        </h3>
        <div className="no-print flex shrink-0 items-center gap-0.5">
          <BookmarkButton id={id} />
          <MarkRevisedButton id={id} />
        </div>
      </div>
      {(topic || difficulty) && (
        <div className="flex flex-wrap gap-1.5">
          {topic && <Badge>{topic}</Badge>}
          {difficulty && <Badge>{difficulty}</Badge>}
        </div>
      )}
      <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
