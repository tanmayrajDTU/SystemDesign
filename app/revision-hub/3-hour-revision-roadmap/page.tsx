"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { MarkRevisedButton } from "@/components/revision/mark-revised-button";
import { ProgressSummary } from "@/components/revision/progress-summary";
import { getRevisionSection } from "@/data/revision-hub";
import { ALL_CONCEPTS } from "@/lib/revision-hub/concepts";

const section = getRevisionSection("3-hour-revision-roadmap")!;

// A single fixed, ordered path — not a browsable/filterable set, by design
// (see data/revision-hub.ts: supportsDifficultyFilter/supportsTopicFilter
// are both false for this section). Each step just links to where that
// step actually lives, so there's exactly one place the content is
// authored (the concept sheets, or a hub page) even though this page
// sequences it.
const roadmapSteps = [
  { id: "roadmap-intro", label: "Skim the 30-second answers for every concept below", minutes: 15, href: "/revision-hub/topic-wise-revision-sheets" },
  ...ALL_CONCEPTS.map((c) => ({
    id: `roadmap-${c.slug}`,
    label: `Revise: ${c.title}`,
    minutes: c.estimatedMinutes,
    href: `/revision-hub/topic-wise-revision-sheets/${c.slug}`,
  })),
  { id: "roadmap-flashcards", label: "One pass through all flashcards", minutes: 20, href: "/revision-hub/flashcards" },
  { id: "roadmap-mistakes", label: "Read through common mistakes & interview traps", minutes: 15, href: "/revision-hub/common-interview-mistakes" },
  { id: "roadmap-speed", label: "Final skim: interview speed notes", minutes: 15, href: "/revision-hub/interview-speed-notes" },
];

export default function Page() {
  const allIds = roadmapSteps.map((s) => s.id);

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
          {section.title}
        </h1>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <div className="flex items-center gap-3">
          <EstimatedTimeBadge minutes={section.estimatedMinutes} />
          <ProgressSummary allIds={allIds} />
        </div>
      </div>

      <ol className="flex flex-col gap-2">
        {roadmapSteps.map((step, i) => (
          <li
            key={step.id}
            className="flex items-center gap-3 rounded-xl border border-border dark:border-border-dark p-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-raised dark:bg-surface-raised-dark text-xs font-medium text-ink-muted dark:text-ink-muted-dark">
              {i + 1}
            </span>
            <Link
              href={step.href}
              className="flex-1 text-sm font-medium text-ink dark:text-ink-dark hover:text-signal-600 dark:hover:text-signal-400"
            >
              {step.label}
            </Link>
            <span className="text-xs text-ink-muted dark:text-ink-muted-dark">{step.minutes} min</span>
            <MarkRevisedButton id={step.id} />
            <Link href={step.href} className="no-print text-ink-muted dark:text-ink-muted-dark">
              <ArrowRight size={14} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
