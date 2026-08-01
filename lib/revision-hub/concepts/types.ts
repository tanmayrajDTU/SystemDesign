import type {
  Difficulty,
  FlashcardItem,
  InterviewQuestionItem,
  ComparisonTableData,
  CheatSheetData,
  DecisionNode,
} from "@/lib/revision-hub/types";

// One of these = everything the task brief asked for, for a single
// concept: summary, questions, answers, traps, trade-offs, a diagram,
// flashcards, a cheat sheet, speed notes — all in one typed object, so
// every concept is guaranteed to have the same shape and nothing gets
// forgotten. ConceptRevisionSheet (components/revision/concept-revision-sheet.tsx)
// is the one component that knows how to lay all of this out; individual
// concept files (lib/revision-hub/concepts/*.ts) only ever provide data.
export type ConceptRevisionContent = {
  slug: string;
  title: string;
  topic: string;
  difficulty: Difficulty;
  estimatedMinutes: number;

  /** Cross-links to the full chapter(s) in the main docs — this is where
   * the actual long-form explanation lives; nothing here repeats it. */
  docLinks: { label: string; href: string }[];

  /** 5–10 lines. The whole concept, compressed. */
  summary: string[];

  /** Why an interviewer asks about this at all — the signal they're
   * actually listening for. */
  whyAsked: string[];

  /** What you'd say if someone asked you to explain it in 30 seconds. */
  thirtySecondAnswer: string;

  /** A step up from the 30-second answer — still concise bullets, not
   * the full chapter (that's what docLinks is for). */
  detailedAnswer: string[];

  /** 20–40 Q&A pairs. */
  questions: InterviewQuestionItem[];

  commonFollowUps: string[];
  commonMistakes: string[];
  interviewTraps: string[];

  /** Either a simple list of trade-off statements, or a structured
   * comparison table where the concept is naturally a head-to-head
   * (CAP vs PACELC, latency vs throughput, etc). */
  tradeoffs: string[];
  comparisonTable?: ComparisonTableData;

  /** Optional — only concepts with a genuine "which way do I go here"
   * branching decision get one (CAP, PACELC, HA, DR, scaling direction). */
  decisionGuide?: DecisionNode;

  memoryTrick: string;
  realWorldExamples: string[];

  /** Raw mermaid source, rendered via the same <Mermaid> component the
   * docs use. */
  mermaidDiagram: string;

  flashcards: FlashcardItem[];
  cheatSheet: CheatSheetData;

  /** Ultra-short, print-friendly bullets for a last-minute skim. */
  speedNotes: string[];
};
