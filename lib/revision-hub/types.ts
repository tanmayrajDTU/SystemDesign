// Shared type contracts for Interview Revision Hub content.
//
// This file defines the *shape* every reusable revision component expects.
// No actual interview content lives here yet — these types exist so that
// when real content is added later (flashcards, questions, cheat sheets...),
// it has a stable, already-agreed contract to conform to, and every
// component in components/revision/ already knows how to render it.

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

// Topics reuse the same taxonomy as the main curriculum (see data/navigation.ts)
// so a "Databases" flashcard and a "Databases" doc chapter mean the same thing.
export type Topic = string;

export type Bookmarkable = {
  /** Stable, globally-unique id — e.g. "flashcard:cap-theorem-1". Used as the
   * localStorage key for bookmarks / mark-as-revised, so it must not change
   * once content ships. */
  id: string;
};

export type FlashcardItem = Bookmarkable & {
  front: string;
  back: string;
  topic?: Topic;
  difficulty?: Difficulty;
};

export type InterviewQuestionItem = Bookmarkable & {
  question: string;
  answer: string;
  topic?: Topic;
  difficulty?: Difficulty;
  /** e.g. "Asked at Meta, 2024" — optional, free-form provenance note. */
  source?: string;
};

export type SummaryCardData = {
  title: string;
  points: string[];
  topic?: Topic;
  difficulty?: Difficulty;
};

export type ComparisonTableData = {
  title?: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
};

export type CheatSheetSection = {
  heading: string;
  items: string[];
};

export type CheatSheetData = {
  title: string;
  sections: CheatSheetSection[];
};

// A decision tree is a recursive structure: every node is either a question
// with branching options, or a terminal recommendation.
export type DecisionNode =
  | {
      kind: "question";
      id: string;
      question: string;
      options: { label: string; next: DecisionNode }[];
    }
  | {
      kind: "result";
      id: string;
      result: string;
      rationale?: string;
    };

export type QAItemData = Bookmarkable & {
  question: string;
  answer: string;
};
