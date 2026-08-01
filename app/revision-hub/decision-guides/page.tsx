"use client";

import { useState } from "react";
import { DecisionTree } from "@/components/revision/decision-tree";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { getRevisionSection } from "@/data/revision-hub";
import { allDecisionGuides } from "@/lib/revision-hub/concepts";

const section = getRevisionSection("decision-guides")!;

export default function Page() {
  const guides = allDecisionGuides();
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
          {section.title}
        </h1>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <EstimatedTimeBadge minutes={section.estimatedMinutes} />
      </div>

      {guides.length > 0 ? (
        <>
          <div className="no-print flex flex-wrap gap-2">
            {guides.map((g, i) => (
              <button
                key={g.concept}
                onClick={() => setActive(i)}
                className={
                  i === active
                    ? "rounded-full border border-signal-500 bg-signal-500/10 px-3 py-1 text-xs font-medium text-signal-600 dark:text-signal-400"
                    : "rounded-full border border-border dark:border-border-dark px-3 py-1 text-xs font-medium text-ink-muted dark:text-ink-muted-dark hover:border-signal-500/50"
                }
              >
                {g.conceptTitle}
              </button>
            ))}
          </div>
          <DecisionTree root={guides[active].root} />
        </>
      ) : (
        <p className="py-10 text-center text-sm text-ink-muted dark:text-ink-muted-dark">
          No decision guides yet.
        </p>
      )}
    </div>
  );
}
