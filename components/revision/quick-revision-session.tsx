"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Keyboard,
  ExternalLink,
} from "lucide-react";
import { Badge, difficultyTone } from "@/components/ui/badge";
import { BookmarkButton } from "./bookmark-button";
import { MarkRevisedButton } from "./mark-revised-button";
import { useFlashcardShortcuts } from "@/lib/revision-hub/use-flashcard-shortcuts";
import { useBookmarks } from "@/lib/revision-hub/use-bookmarks";
import { useRevised } from "@/lib/revision-hub/use-revised";
import type { QuickRevisionItem } from "@/lib/revision-hub/quick-revision";

// Deliberately its own component rather than reusing FlashcardDeck: a quick
// revision session mixes two different item shapes (concept one-liners and
// interview questions), needs a "Got it, next" action that marks-revised
// *and* advances in one step, and links back to the source concept page —
// none of which the plain flashcard deck needs.
export function QuickRevisionSession({ items }: { items: QuickRevisionItem[] }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { toggleBookmark } = useBookmarks();
  const { toggleRevised, markRevised } = useRevised();

  const item = items[index];

  function go(delta: number) {
    setRevealed(false);
    setIndex((i) => {
      const next = i + delta;
      if (next < 0) return items.length - 1;
      if (next >= items.length) return 0;
      return next;
    });
  }

  function gotIt() {
    if (item) markRevised(item.id);
    go(1);
  }

  useFlashcardShortcuts({
    enabled: items.length > 0,
    onFlip: () => setRevealed((r) => !r),
    onNext: () => go(1),
    onPrev: () => go(-1),
    onBookmark: () => item && toggleBookmark(item.id),
    onMarkRevised: () => item && toggleRevised(item.id),
  });

  if (!item) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="no-print flex w-full max-w-xl items-center justify-between text-xs text-ink-muted dark:text-ink-muted-dark">
        <span className="flex items-center gap-1.5">
          <Keyboard size={12} />
          Space to reveal · ← → to navigate · b bookmark · r revised
        </span>
        <div className="flex items-center gap-0.5">
          <BookmarkButton id={item.id} size={14} />
          <MarkRevisedButton id={item.id} size={14} />
        </div>
      </div>

      <button
        onClick={() => setRevealed((r) => !r)}
        aria-label={revealed ? "Hide answer" : "Reveal answer"}
        className="flex min-h-[240px] w-full max-w-xl flex-col items-center justify-center gap-4 rounded-xl border border-border
          dark:border-border-dark bg-surface-raised dark:bg-surface-raised-dark p-6 text-center shadow-sm
          transition-transform hover:-translate-y-0.5"
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Badge tone={item.kind === "question" ? "accent" : "neutral"}>
            {item.kind === "question" ? "Question" : "Concept"}
          </Badge>
          <Badge tone="info">{item.topic}</Badge>
          {item.difficulty && (
            <Badge tone={difficultyTone(item.difficulty)}>{item.difficulty}</Badge>
          )}
        </div>

        <p className="font-display text-lg font-semibold leading-snug text-ink dark:text-ink-dark">
          {item.prompt}
        </p>

        {revealed ? (
          <p className="text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
            {item.answer}
          </p>
        ) : (
          <p className="text-xs uppercase tracking-wide text-ink-muted/70 dark:text-ink-muted-dark/70">
            Tap or press space to reveal
          </p>
        )}
      </button>

      {revealed && (
        <Link
          href={`/revision-hub/topic-wise-revision-sheets/${item.conceptSlug}`}
          className="flex items-center gap-1 text-xs text-signal-600 dark:text-signal-400 hover:underline"
        >
          Full concept: {item.conceptTitle} <ExternalLink size={12} />
        </Link>
      )}

      <div className="flex items-center gap-4">
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="text-ink-muted dark:text-ink-muted-dark hover:text-signal-500"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={gotIt}
          className="flex items-center gap-1.5 rounded-full border border-success-500/30 bg-success-500/10 px-4 py-1.5
            text-xs font-medium text-success-700 dark:text-success-400 hover:bg-success-500/20"
        >
          <CheckCircle2 size={14} /> Got it — next
        </button>

        <span className="text-xs text-ink-muted dark:text-ink-muted-dark">
          {index + 1} / {items.length}
        </span>

        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="text-ink-muted dark:text-ink-muted-dark hover:text-signal-500"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
