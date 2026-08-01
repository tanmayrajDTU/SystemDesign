"use client";

import { useMemo, useState } from "react";
import { CheatSheet } from "@/components/revision/cheat-sheet";
import { FilterBar } from "@/components/revision/filter-bar";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { PrintButton } from "@/components/revision/print-button";
import { ExportPdfButton } from "@/components/revision/export-pdf-button";
import { getRevisionSection } from "@/data/revision-hub";
import { ALL_CONCEPTS, allTopics } from "@/lib/revision-hub/concepts";

const section = getRevisionSection("cheat-sheets")!;

export default function Page() {
  const [topicFilter, setTopicFilter] = useState<string[]>([]);
  const topics = useMemo(() => allTopics(), []);

  const visible = ALL_CONCEPTS.filter((c) => topicFilter.length === 0 || topicFilter.includes(c.topic));

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
            {section.title}
          </h1>
          <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
          <EstimatedTimeBadge minutes={section.estimatedMinutes} />
        </div>
        <div className="no-print flex items-center gap-2">
          <PrintButton />
          <ExportPdfButton />
        </div>
      </div>

      <FilterBar topics={topics} selectedTopics={topicFilter} onTopicChange={setTopicFilter} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {visible.map((c) => (
          <CheatSheet key={c.slug} {...c.cheatSheet} />
        ))}
      </div>
    </div>
  );
}
