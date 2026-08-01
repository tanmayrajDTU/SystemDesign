"use client";

import { useMemo, useState } from "react";
import { SummaryCard } from "@/components/revision/summary-card";
import { FilterBar } from "@/components/revision/filter-bar";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { getRevisionSection } from "@/data/revision-hub";
import { allRealWorldNuggets, allTopics } from "@/lib/revision-hub/concepts";

const section = getRevisionSection("real-interview-nuggets")!;

export default function Page() {
  const [topicFilter, setTopicFilter] = useState<string[]>([]);
  const nuggets = useMemo(() => allRealWorldNuggets(), []);
  const topics = useMemo(() => allTopics(), []);

  const visible = nuggets.filter((n) => topicFilter.length === 0 || topicFilter.includes(n.topic));

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((n) => (
          <SummaryCard key={n.id} {...n} />
        ))}
      </div>
    </div>
  );
}
