"use client";

import { useMemo, useState } from "react";
import { SummaryCard } from "@/components/revision/summary-card";
import { FilterBar } from "@/components/revision/filter-bar";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { getRevisionSection } from "@/data/revision-hub";
import { allOneLineDefinitions, allTopics, ALL_CONCEPTS } from "@/lib/revision-hub/concepts";

const section = getRevisionSection("top-100-concepts")!;

export default function Page() {
  const [topicFilter, setTopicFilter] = useState<string[]>([]);
  const defs = useMemo(() => allOneLineDefinitions(), []);
  const topics = useMemo(() => allTopics(), []);

  const visible = defs.filter((d) => topicFilter.length === 0 || topicFilter.includes(d.topic));

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
          {section.title}
        </h1>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <p className="text-xs text-ink-muted dark:text-ink-muted-dark">
          {ALL_CONCEPTS.length} of 100 concepts populated so far.
        </p>
        <EstimatedTimeBadge minutes={section.estimatedMinutes} />
      </div>

      <FilterBar topics={topics} selectedTopics={topicFilter} onTopicChange={setTopicFilter} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((d) => (
          <SummaryCard key={d.id} {...d} />
        ))}
      </div>
    </div>
  );
}
