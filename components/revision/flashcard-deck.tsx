"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Keyboard } from "lucide-react";
import { Badge, difficultyTone } from "@/components/ui/badge";
import { BookmarkButton } from "./bookmark-button";
import { MarkRevisedButton } from "./mark-revised-button";
import { useFlashcardShortcuts } from "@/lib/revision-hub/use-flashcard-shortcuts";
import { useBookmarks } from "@/lib/revision-hub/use-bookmarks";
import { useRevised } from "@/lib/revision-hub/use-revised";
import type { FlashcardItem } from "@/lib/revision-hub/types";

// Distinct from components/mdx/flashcard.tsx (the simple inline flip-card
// used inside regular doc chapters): this deck is Revision Hub-specific —
// it wires up keyboard shortcuts, bookmarking, and mark-as-revised, none of
// which the docs version needs.
export function FlashcardDeck({ cards }: { cards: FlashcardItem[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { toggleBookmark } = useBookmarks();
  const { toggleRevised } = useRevised();

  const card = cards[index];

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  }

  useFlashcardShortcuts({
    enabled: cards.length > 0,
    onFlip: () => setFlipped((f) => !f),
    onNext: () => go(1),
    onPrev: () => go(-1),
    onBookmark: () => card && toggleBookmark(card.id),
    onMarkRevised: () => card && toggleRevised(card.id),
  });

  if (cards.length === 0 || !card) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="no-print flex w-full max-w-md items-center justify-between text-xs text-ink-muted dark:text-ink-muted-dark">
        <span className="flex items-center gap-1.5">
          <Keyboard size={12} />
          Space to flip · ← → to navigate · b bookmark · r revised
        </span>
        <div className="flex items-center gap-0.5">
          <BookmarkButton id={card.id} size={14} />
          <MarkRevisedButton id={card.id} size={14} />
        </div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        aria-label="Flip card"
        className="flex min-h-[160px] w-full max-w-md flex-col items-center justify-center gap-3 rounded-xl border border-border
          dark:border-border-dark bg-surface-raised dark:bg-surface-raised-dark p-6 text-center shadow-sm
          transition-transform hover:-translate-y-0.5"
      >
        {(card.topic || card.difficulty) && (
          <div className="flex gap-1.5">
            {card.topic && <Badge tone="info">{card.topic}</Badge>}
            {card.difficulty && (
              <Badge tone={difficultyTone(card.difficulty)}>{card.difficulty}</Badge>
            )}
          </div>
        )}
        <p className="text-sm leading-relaxed text-ink dark:text-ink-dark">
          {flipped ? card.back : card.front}
        </p>
      </button>

      <div className="flex items-center gap-4 text-ink-muted dark:text-ink-muted-dark">
        <button aria-label="Previous card" onClick={() => go(-1)} className="hover:text-signal-500">
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Flip card"
          onClick={() => setFlipped((f) => !f)}
          className="flex items-center gap-1 text-xs hover:text-signal-500"
        >
          <RotateCw size={14} /> flip
        </button>
        <span className="text-xs">
          {index + 1} / {cards.length}
        </span>
        <button aria-label="Next card" onClick={() => go(1)} className="hover:text-signal-500">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
