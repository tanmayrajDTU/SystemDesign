"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { FilterBar } from "@/components/revision/filter-bar";
import { ProgressSummary } from "@/components/revision/progress-summary";
import { getRevisionSection } from "@/data/revision-hub";
import { ALL_CONCEPTS, allTopics } from "@/lib/revision-hub/concepts";
import type { Difficulty } from "@/lib/revision-hub/types";

const section = getRevisionSection("topic-wise-revision-sheets")!;

export default function Page() {
  const [topicFilter, setTopicFilter] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty[]>([]);

  const topics = useMemo(() => allTopics(), []);
  const allConceptIds = useMemo(() => ALL_CONCEPTS.map((c) => `concept:${c.slug}`), []);

  const visible = ALL_CONCEPTS.filter((c) => {
    if (topicFilter.length > 0 && !topicFilter.includes(c.topic)) return false;
    if (difficultyFilter.length > 0 && !difficultyFilter.includes(c.difficulty)) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
          {section.title}
        </h1>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <ProgressSummary allIds={allConceptIds} />
      </div>

      <FilterBar
        difficulties={["Beginner", "Intermediate", "Advanced"]}
        selectedDifficulties={difficultyFilter}
        onDifficultyChange={setDifficultyFilter}
        topics={topics}
        selectedTopics={topicFilter}
        onTopicChange={setTopicFilter}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((concept) => (
          <Link
            key={concept.slug}
            href={`/revision-hub/topic-wise-revision-sheets/${concept.slug}`}
            className="group flex flex-col gap-2 rounded-xl border border-border dark:border-border-dark p-4 hover:border-signal-500/50"
          >
            <h3 className="font-display text-sm font-semibold text-ink dark:text-ink-dark">
              {concept.title}
            </h3>
            <p className="text-xs leading-relaxed text-ink-muted dark:text-ink-muted-dark">
              {concept.thirtySecondAnswer.slice(0, 110)}...
            </p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <div className="flex gap-1.5">
                <Badge>{concept.difficulty}</Badge>
                <EstimatedTimeBadge minutes={concept.estimatedMinutes} />
              </div>
              <ArrowRight
                size={14}
                className="text-signal-600 dark:text-signal-400 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
          </Link>
        ))}
        {visible.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-ink-muted dark:text-ink-muted-dark">
            No concepts match these filters yet.
          </p>
        )}
      </div>
    </div>
  );
}
