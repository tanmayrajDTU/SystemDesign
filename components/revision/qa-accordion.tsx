"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookmarkButton } from "./bookmark-button";
import { MarkRevisedButton } from "./mark-revised-button";
import type { QAItemData } from "@/lib/revision-hub/types";

// Single collapsible Q&A row. Exported on its own so it can also be used
// standalone (e.g. inside InterviewQuestion) without pulling in the whole
// accordion list wrapper.
export function QAItem({
  question,
  answer,
  id,
  defaultOpen = false,
  showActions = true,
}: QAItemData & { defaultOpen?: boolean; showActions?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = `qa-content-${id}`;

  return (
    <div className="rounded-xl border border-border dark:border-border-dark">
      <div className="flex items-center gap-1 pr-2">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-ink dark:text-ink-dark"
        >
          {question}
          <ChevronDown
            size={16}
            className={cn(
              "shrink-0 text-ink-muted dark:text-ink-muted-dark transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
        {showActions && (
          <div className="no-print flex shrink-0 items-center gap-0.5">
            <BookmarkButton id={id} />
            <MarkRevisedButton id={id} />
          </div>
        )}
      </div>
      {open && (
        <div
          id={contentId}
          className="border-t border-border dark:border-border-dark px-4 py-3 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export function QAAccordion({ items }: { items: QAItemData[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <QAItem key={item.id} {...item} />
      ))}
    </div>
  );
}
