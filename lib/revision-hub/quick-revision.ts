import { ALL_CONCEPTS, allQuestions } from "./concepts";
import type { Difficulty } from "./types";

export type QuickRevisionKind = "concept" | "question";

export type QuickRevisionItem = {
  /** Reuses the same id the item has on its "home" page (Top 100 Concepts
   * for concepts, Top Interview Questions for questions) — bookmarking or
   * marking something revised here also reflects there, and vice versa. */
  id: string;
  kind: QuickRevisionKind;
  prompt: string;
  answer: string;
  topic: string;
  difficulty?: Difficulty;
  conceptTitle: string;
  conceptSlug: string;
};

// "What is X" cards from every concept's 30-second answer — same id as
// Top 100 Concepts (`${slug}-oneliner`) so progress is shared.
function conceptItems(): QuickRevisionItem[] {
  return ALL_CONCEPTS.map((c) => ({
    id: `${c.slug}-oneliner`,
    kind: "concept",
    prompt: c.title,
    answer: c.thirtySecondAnswer,
    topic: c.topic,
    difficulty: c.difficulty,
    conceptTitle: c.title,
    conceptSlug: c.slug,
  }));
}

// Every interview question across every concept — same id as Top
// Interview Questions (q.id) so progress is shared.
function questionItems(): QuickRevisionItem[] {
  return allQuestions().map((q) => ({
    id: q.id,
    kind: "question",
    prompt: q.question,
    answer: q.answer,
    topic: q.topic ?? "General",
    difficulty: q.difficulty,
    conceptTitle: q.conceptTitle,
    conceptSlug: q.concept,
  }));
}

/** The full, unfiltered Quick Revision deck: every concept one-liner plus
 * every interview question, in one flat, mixed list. Callers filter/shuffle
 * this down to an actual session (see app/revision-hub/quick-revision). */
export function buildQuickRevisionDeck(): QuickRevisionItem[] {
  return [...conceptItems(), ...questionItems()];
}

/** Fisher-Yates shuffle. Pure — returns a new array, never mutates `items`. */
export function shuffleItems<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
