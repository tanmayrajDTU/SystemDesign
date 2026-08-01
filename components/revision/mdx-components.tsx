import { Callout } from "@/components/mdx/callout";
import { Mermaid } from "@/components/mdx/mermaid-diagram";
import { PreBlock } from "@/components/mdx/pre-block";
import { SummaryCard } from "./summary-card";
import { ComparisonTable } from "./comparison-table";
import { CheatSheet } from "./cheat-sheet";
import { FlashcardDeck } from "./flashcard-deck";
import { DecisionTree } from "./decision-tree";
import { InterviewQuestion } from "./interview-question";
import { QAAccordion, QAItem } from "./qa-accordion";

// Not wired into any route yet — no Revision Hub page currently loads MDX,
// since there's no content to author against. This exists so that the
// moment someone drops a content/revision-hub/<slug>.mdx file, a page can
// compileMDX it with this exact components map (same pattern as
// components/mdx/mdx-components.tsx for the main docs) and every reusable
// component built for the hub is already available inside that MDX body.
export const revisionMdxComponents: Record<string, any> = {
  pre: PreBlock,
  Mermaid,
  Callout,
  SummaryCard,
  ComparisonTable,
  CheatSheet,
  FlashcardDeck,
  DecisionTree,
  InterviewQuestion,
  QAAccordion,
  QAItem,
};
