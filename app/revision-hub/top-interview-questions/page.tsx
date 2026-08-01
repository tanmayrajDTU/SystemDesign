"use client";

import { useMemo, useState } from "react";
import { InterviewQuestion } from "@/components/revision/interview-question";
import { FilterBar } from "@/components/revision/filter-bar";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { PrintButton } from "@/components/revision/print-button";
import { ExportPdfButton } from "@/components/revision/export-pdf-button";
import { ProgressSummary } from "@/components/revision/progress-summary";
import { getRevisionSection } from "@/data/revision-hub";
import { allQuestions, allTopics } from "@/lib/revision-hub/concepts";
import type { Difficulty } from "@/lib/revision-hub/types";

const section = getRevisionSection("top-interview-questions")!;

export default function Page() {
  const [topicFilter, setTopicFilter] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty[]>([]);

  const questions = useMemo(() => allQuestions(), []);
  const topics = useMemo(() => allTopics(), []);
  const allIds = useMemo(() => questions.map((q) => q.id), [questions]);

  const visible = questions.filter((q) => {
    if (topicFilter.length > 0 && !topicFilter.includes(q.topic ?? "")) return false;
    if (difficultyFilter.length > 0 && !difficultyFilter.includes(q.difficulty as Difficulty)) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        <div className="no-print flex items-center gap-2">
          <PrintButton />
          <ExportPdfButton />
        </div>
      </div>

      <FilterBar
        difficulties={["Beginner", "Intermediate", "Advanced"]}
        selectedDifficulties={difficultyFilter}
        onDifficultyChange={setDifficultyFilter}
        topics={topics}
        selectedTopics={topicFilter}
        onTopicChange={setTopicFilter}
      />

      <p className="text-xs text-ink-muted dark:text-ink-muted-dark">
        {visible.length} of {questions.length} questions
      </p>

      <div className="flex flex-col gap-2">
        {visible.map((q) => (
          <InterviewQuestion key={q.id} {...q} />
        ))}
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-muted dark:text-ink-muted-dark">
            No questions match these filters yet.
          </p>
        )}
      </div>
    </div>
  );
}
