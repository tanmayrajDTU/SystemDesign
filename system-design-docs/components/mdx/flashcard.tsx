"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

type Card = { front: string; back: string };

export function Flashcards({ cards }: { cards: Card[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  }

  return (
    <div className="not-prose my-10 flex flex-col items-center gap-4">
      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[140px] w-full max-w-md items-center justify-center rounded-xl border border-border
          dark:border-border-dark bg-surface-raised dark:bg-surface-raised-dark p-6 text-center text-sm
          leading-relaxed text-ink dark:text-ink-dark shadow-sm transition-transform hover:-translate-y-0.5"
      >
        {flipped ? card.back : card.front}
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
