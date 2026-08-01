"use client";

import { useEffect } from "react";

export type FlashcardShortcutHandlers = {
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  onBookmark?: () => void;
  onMarkRevised?: () => void;
  /** Disable while false — e.g. when the deck isn't the focused/active one. */
  enabled?: boolean;
};

// Keyboard map (documented here since it's the single source of truth):
//   Space / Enter  → flip the current card
//   →  / j         → next card
//   ←  / h         → previous card
//   b              → toggle bookmark
//   r              → toggle mark-as-revised
//
// Ignores keystrokes while the user is typing in an input/textarea/select
// or a contentEditable region, so shortcuts never hijack a search box.
export function useFlashcardShortcuts({
  onFlip,
  onNext,
  onPrev,
  onBookmark,
  onMarkRevised,
  enabled = true,
}: FlashcardShortcutHandlers) {
  useEffect(() => {
    if (!enabled) return;

    function isTypingTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
    }

    function onKeydown(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;

      switch (e.key) {
        case " ":
        case "Enter":
          e.preventDefault();
          onFlip();
          break;
        case "ArrowRight":
        case "j":
          onNext();
          break;
        case "ArrowLeft":
        case "h":
          onPrev();
          break;
        case "b":
        case "B":
          onBookmark?.();
          break;
        case "r":
        case "R":
          onMarkRevised?.();
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [enabled, onFlip, onNext, onPrev, onBookmark, onMarkRevised]);
}
