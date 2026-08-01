"use client";

import { useMemo, useState } from "react";
import { QAItem } from "@/components/revision/qa-accordion";
import { FilterBar } from "@/components/revision/filter-bar";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { getRevisionSection } from "@/data/revision-hub";
import { allMistakesAndTraps, allTopics } from "@/lib/revision-hub/concepts";

const section = getRevisionSection("common-interview-mistakes")!;

export default function Page() {
  const [topicFilter, setTopicFilter] = useState<string[]>([]);
  const items = useMemo(() => allMistakesAndTraps(), []);
  const topics = useMemo(() => allTopics(), []);

  const visible = items.filter((i) => topicFilter.length === 0 || topicFilter.includes(i.topic));

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
          {section.title}
        </h1>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <EstimatedTimeBadge minutes={section.estimatedMinutes} />
      </div>

      <FilterBar topics={topics} selectedTopics={topicFilter} onTopicChange={setTopicFilter} />

      <div className="flex flex-col gap-2">
        {visible.map((item) => (
          <QAItem key={item.id} id={item.id} question={`${item.conceptTitle}: ${item.question.split(" — ")[0]}`} answer={item.answer} />
        ))}
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-muted dark:text-ink-muted-dark">
            No entries match these filters yet.
          </p>
        )}
      </div>
    </div>
  );
}
