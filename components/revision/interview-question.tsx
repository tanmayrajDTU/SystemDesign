"use client";

import { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, difficultyTone } from "@/components/ui/badge";
import { BookmarkButton } from "./bookmark-button";
import { MarkRevisedButton } from "./mark-revised-button";
import type { InterviewQuestionItem } from "@/lib/revision-hub/types";

export function InterviewQuestion({
  id,
  question,
  answer,
  topic,
  difficulty,
  source,
}: InterviewQuestionItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border dark:border-border-dark p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium leading-relaxed text-ink dark:text-ink-dark">{question}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {topic && <Badge tone="info">{topic}</Badge>}
            {difficulty && <Badge tone={difficultyTone(difficulty)}>{difficulty}</Badge>}
            {source && (
              <span className="flex items-center gap-1 text-xs text-ink-muted dark:text-ink-muted-dark">
                <Quote size={10} /> {source}
              </span>
            )}
          </div>
        </div>
        <div className="no-print flex shrink-0 items-center gap-0.5">
          <BookmarkButton id={id} />
          <MarkRevisedButton id={id} />
        </div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-signal-600 dark:text-signal-400"
      >
        {open ? "Hide answer" : "Show answer"}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <p className="mt-3 rounded-lg bg-surface-raised dark:bg-surface-raised-dark p-3 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
          {answer}
        </p>
      )}
    </div>
  );
}
