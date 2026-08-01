"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Lightbulb, AlertTriangle, Scale, Brain, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Mermaid } from "@/components/mdx/mermaid-diagram";
import { EstimatedTimeBadge } from "./estimated-time-badge";
import { PrintButton } from "./print-button";
import { ExportPdfButton } from "./export-pdf-button";
import { BookmarkButton } from "./bookmark-button";
import { ProgressSummary } from "./progress-summary";
import { FilterBar } from "./filter-bar";
import { InterviewQuestion } from "./interview-question";
import { QAItem } from "./qa-accordion";
import { FlashcardDeck } from "./flashcard-deck";
import { CheatSheet } from "./cheat-sheet";
import { ComparisonTable } from "./comparison-table";
import { DecisionTree } from "./decision-tree";
import type { ConceptRevisionContent } from "@/lib/revision-hub/concepts/types";
import type { Difficulty } from "@/lib/revision-hub/types";

// The one component every concept's revision sheet is built from — see
// lib/revision-hub/concepts/*.ts for the data, and
// app/revision-hub/topic-wise-revision-sheets/[slug]/page.tsx for the route.
// Every section below maps directly to one item in the original brief
// (summary, questions, 30s answer, why-asked, follow-ups, mistakes, traps,
// trade-offs, memory trick, examples, diagram, flashcards, cheat sheet,
// speed notes) so nothing silently gets dropped for a given concept.
export function ConceptRevisionSheet({ concept }: { concept: ConceptRevisionContent }) {
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty[]>([]);
  const questionIds = concept.questions.map((q) => q.id);

  const visibleQuestions =
    difficultyFilter.length === 0
      ? concept.questions
      : concept.questions.filter((q) => q.difficulty && difficultyFilter.includes(q.difficulty));

  return (
    <div className="concept-sheet flex flex-col gap-10 px-6 py-10 lg:px-10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
              {concept.title}
            </h1>
            <BookmarkButton id={`concept:${concept.slug}`} size={20} />
          </div>
          <div className="no-print flex items-center gap-2">
            <PrintButton />
            <ExportPdfButton />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{concept.topic}</Badge>
          <Badge>{concept.difficulty}</Badge>
          <EstimatedTimeBadge minutes={concept.estimatedMinutes} />
        </div>
        {concept.docLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 text-sm">
            {concept.docLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-signal-600 dark:text-signal-400 hover:underline"
              >
                Full chapter: {link.label} <ExternalLink size={12} />
              </Link>
            ))}
          </div>
        )}
        <ProgressSummary allIds={questionIds} />
      </div>

      {/* Summary */}
      <Section title="Summary">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
          {concept.summary.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </Section>

      {/* Why interviewers ask it */}
      <Section title="Why interviewers ask this" icon={<Lightbulb size={16} />}>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
          {concept.whyAsked.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </Section>

      {/* 30-second answer */}
      <Section title="30-second answer">
        <div className="rounded-xl border border-signal-500/30 bg-signal-500/5 p-4 text-sm leading-relaxed text-ink dark:text-ink-dark">
          {concept.thirtySecondAnswer}
        </div>
      </Section>

      {/* Detailed answer */}
      <Section title="Detailed answer">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
          {concept.detailedAnswer.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        {concept.docLinks.length > 0 && (
          <p className="mt-3 text-sm text-ink-muted dark:text-ink-muted-dark">
            For the full explanation, see{" "}
            {concept.docLinks.map((link, i) => (
              <span key={link.href}>
                <Link href={link.href} className="text-signal-600 dark:text-signal-400 hover:underline">
                  {link.label}
                </Link>
                {i < concept.docLinks.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        )}
      </Section>

      {/* Mermaid diagram */}
      <Section title="Diagram">
        <div className="scroll-thin overflow-x-auto rounded-xl border border-border dark:border-border-dark p-4">
          <Mermaid chart={concept.mermaidDiagram} />
        </div>
      </Section>

      {/* Interview questions */}
      <Section title={`Interview questions (${concept.questions.length})`}>
        <div className="no-print mb-4">
          <FilterBar
            difficulties={["Beginner", "Intermediate", "Advanced"]}
            selectedDifficulties={difficultyFilter}
            onDifficultyChange={setDifficultyFilter}
          />
        </div>
        <div className="flex flex-col gap-2">
          {visibleQuestions.map((q) => (
            <InterviewQuestion key={q.id} {...q} />
          ))}
        </div>
      </Section>

      {/* Common follow-ups */}
      <Section title="Common follow-up questions">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
          {concept.commonFollowUps.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </Section>

      {/* Mistakes & traps */}
      <Section title="Common mistakes & interview traps" icon={<AlertTriangle size={16} />}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark">
              Common mistakes
            </h4>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
              {concept.commonMistakes.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark">
              Interview traps
            </h4>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
              {concept.interviewTraps.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Trade-offs */}
      <Section title="Trade-offs" icon={<Scale size={16} />}>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
          {concept.tradeoffs.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        {concept.comparisonTable && (
          <div className="mt-4">
            <ComparisonTable {...concept.comparisonTable} />
          </div>
        )}
      </Section>

      {/* Decision guide (optional) */}
      {concept.decisionGuide && (
        <Section title="Decision guide" icon={<MapPin size={16} />}>
          <DecisionTree root={concept.decisionGuide} />
        </Section>
      )}

      {/* Memory trick */}
      <Section title="Memory trick" icon={<Brain size={16} />}>
        <div className="rounded-xl border border-border dark:border-border-dark bg-surface-raised dark:bg-surface-raised-dark p-4 text-sm leading-relaxed text-ink dark:text-ink-dark">
          {concept.memoryTrick}
        </div>
      </Section>

      {/* Real-world examples */}
      <Section title="Real-world examples">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
          {concept.realWorldExamples.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      </Section>

      {/* Flashcards */}
      <Section title="Flashcards">
        <FlashcardDeck cards={concept.flashcards} />
      </Section>

      {/* Cheat sheet */}
      <Section title="Cheat sheet">
        <CheatSheet {...concept.cheatSheet} />
      </Section>

      {/* Speed notes */}
      <Section title="Speed revision notes">
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
          {concept.speedNotes.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="break-inside-avoid">
      <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-ink dark:text-ink-dark">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}
