import { NAVIGATION } from "./navigation";

// Interview Revision Hub is deliberately a separate data source from
// NAVIGATION (the main curriculum) even though it lives in the same repo:
// these are fast-review interview pages, not the detailed chapter notes,
// and keeping them decoupled means neither one has to contort its shape
// to fit the other. See app/revision-hub/ for routing and
// components/revision/ for the components these pages are built from.

export type RevisionComponentHint =
  | "interview-questions"
  | "summary-cards"
  | "cheat-sheet"
  | "flashcards"
  | "comparison-tables"
  | "decision-tree"
  | "qa-accordion"
  | "notes";

export type RevisionSection = {
  slug: string; // path under /revision-hub/
  title: string;
  description: string;
  /** lucide-react icon name, resolved in revision-hub-card.tsx / sidebar */
  icon: string;
  /** Which reusable component this page is primarily built from — lets the
   * placeholder page pick sensible defaults (e.g. only flashcard pages get
   * the keyboard-shortcuts hint). */
  componentHint: RevisionComponentHint;
  supportsDifficultyFilter: boolean;
  supportsTopicFilter: boolean;
  supportsBookmarks: boolean;
  supportsMarkAsRevised: boolean;
  /** Flat placeholder estimate shown until real content exists — see
   * lib/revision-hub/estimate-time.ts for how this gets computed once a
   * page has actual items or prose to measure. */
  estimatedMinutes: number;
};

// Reuse the exact same topic taxonomy as the main curriculum (stripped of
// the "N. " numbering prefix) so a topic filter here means the same thing
// as a sidebar section over in /docs.
export const REVISION_TOPICS: string[] = NAVIGATION.map((section) =>
  section.title.replace(/^\d+\.\s*/, "")
);

export const REVISION_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

export const REVISION_HUB_SECTIONS: RevisionSection[] = [
  {
    slug: "quick-revision",
    title: "Quick Revision",
    description: "Rapid-fire through concepts and interview questions, one card at a time — filter by topic/difficulty, shuffle, and skip anything you've already nailed.",
    icon: "Rocket",
    componentHint: "flashcards",
    supportsDifficultyFilter: true,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: true,
    estimatedMinutes: 20,
  },
  {
    slug: "top-interview-questions",
    title: "Top Interview Questions",
    description: "The questions that come up again and again, with room to bookmark the ones you keep missing.",
    icon: "MessageCircleQuestion",
    componentHint: "interview-questions",
    supportsDifficultyFilter: true,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: true,
    estimatedMinutes: 45,
  },
  {
    slug: "topic-wise-revision-sheets",
    title: "Topic-wise Revision Sheets",
    description: "One dense sheet per topic — everything you'd want to re-read the night before, grouped the way you actually study.",
    icon: "NotebookText",
    componentHint: "summary-cards",
    supportsDifficultyFilter: true,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: true,
    estimatedMinutes: 90,
  },
  {
    slug: "cheat-sheets",
    title: "Cheat Sheets",
    description: "Compact, print-friendly reference sheets — formulas, defaults, and things you'd otherwise have to search for.",
    icon: "FileStack",
    componentHint: "cheat-sheet",
    supportsDifficultyFilter: false,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: false,
    estimatedMinutes: 15,
  },
  {
    slug: "flashcards",
    title: "Flashcards",
    description: "Flip through key terms and definitions. Fully keyboard-navigable for fast, heads-down drilling.",
    icon: "Layers",
    componentHint: "flashcards",
    supportsDifficultyFilter: true,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: true,
    estimatedMinutes: 20,
  },
  {
    slug: "comparison-tables",
    title: "Comparison Tables",
    description: "SQL vs NoSQL, REST vs gRPC, OT vs CRDT — the trade-off tables that answer 'when would you use X instead of Y'.",
    icon: "Table2",
    componentHint: "comparison-tables",
    supportsDifficultyFilter: false,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: false,
    estimatedMinutes: 25,
  },
  {
    slug: "decision-guides",
    title: "Decision Guides",
    description: "Click-through decision trees for the recurring 'which approach fits here' questions in a system design interview.",
    icon: "GitFork",
    componentHint: "decision-tree",
    supportsDifficultyFilter: false,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: false,
    estimatedMinutes: 20,
  },
  {
    slug: "common-interview-mistakes",
    title: "Common Interview Mistakes",
    description: "The specific ways candidates lose points on otherwise-good answers — and what to say instead.",
    icon: "OctagonAlert",
    componentHint: "qa-accordion",
    supportsDifficultyFilter: true,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: true,
    estimatedMinutes: 20,
  },
  {
    slug: "real-interview-nuggets",
    title: "Real Interview Nuggets",
    description: "Specific, concrete details worth having ready — the kind of remark that signals real depth in an interview.",
    icon: "Gem",
    componentHint: "summary-cards",
    supportsDifficultyFilter: true,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: true,
    estimatedMinutes: 20,
  },
  {
    slug: "3-hour-revision-roadmap",
    title: "3 Hour Revision Roadmap",
    description: "A single guided path through everything above, sized for the afternoon before an interview.",
    icon: "Route",
    componentHint: "notes",
    supportsDifficultyFilter: false,
    supportsTopicFilter: false,
    supportsBookmarks: false,
    supportsMarkAsRevised: true,
    estimatedMinutes: 180,
  },
  {
    slug: "top-100-concepts",
    title: "Top 100 Concepts",
    description: "The 100 terms most likely to come up, each with a one-line definition you can confirm at a glance.",
    icon: "ListChecks",
    componentHint: "summary-cards",
    supportsDifficultyFilter: true,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: true,
    estimatedMinutes: 60,
  },
  {
    slug: "interview-speed-notes",
    title: "Interview Speed Notes",
    description: "The absolute-minimum-words version of every topic — for a last skim right before you walk in.",
    icon: "Zap",
    componentHint: "cheat-sheet",
    supportsDifficultyFilter: false,
    supportsTopicFilter: true,
    supportsBookmarks: true,
    supportsMarkAsRevised: false,
    estimatedMinutes: 15,
  },
];

export function getRevisionSection(slug: string): RevisionSection | undefined {
  return REVISION_HUB_SECTIONS.find((s) => s.slug === slug);
}

export function getRevisionPrevNext(slug: string) {
  const idx = REVISION_HUB_SECTIONS.findIndex((s) => s.slug === slug);
  return {
    prev: idx > 0 ? REVISION_HUB_SECTIONS[idx - 1] : null,
    next: idx >= 0 && idx < REVISION_HUB_SECTIONS.length - 1 ? REVISION_HUB_SECTIONS[idx + 1] : null,
  };
}
