"use client";

import { ComparisonTable } from "@/components/revision/comparison-table";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { getRevisionSection } from "@/data/revision-hub";
import { allComparisonTables } from "@/lib/revision-hub/concepts";

const section = getRevisionSection("comparison-tables")!;

export default function Page() {
  const tables = allComparisonTables();

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
          {section.title}
        </h1>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <EstimatedTimeBadge minutes={section.estimatedMinutes} />
      </div>

      <div className="flex flex-col gap-6">
        {tables.map((t) => (
          <ComparisonTable key={t.concept} title={t.title} columns={t.columns} rows={t.rows} />
        ))}
        {tables.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-muted dark:text-ink-muted-dark">
            No comparison tables yet.
          </p>
        )}
      </div>
    </div>
  );
}
