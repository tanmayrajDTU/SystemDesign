"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import { EstimatedTimeBadge } from "./estimated-time-badge";
import { FilterBar } from "./filter-bar";
import { PrintButton } from "./print-button";
import { ExportPdfButton } from "./export-pdf-button";
import { REVISION_TOPICS, REVISION_DIFFICULTIES, type RevisionSection } from "@/data/revision-hub";
import type { Difficulty } from "@/lib/revision-hub/types";

// Every one of the 11 /revision-hub/<slug> routes renders this shell right
// now. It wires up every piece of infrastructure the section's metadata
// says it should support (filters, print/export, estimated time) against
// an empty dataset, so:
//   1. the chrome/UX is exactly what it'll be once content ships, and
//   2. adding real content later is a matter of passing `children`
//      (or swapping in MDX) — nothing here needs to change.
export function PlaceholderPage({ section }: { section: RevisionSection }) {
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
            {section.title}
          </h1>
          <div className="no-print flex items-center gap-2">
            <PrintButton />
            <ExportPdfButton />
          </div>
        </div>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <EstimatedTimeBadge minutes={section.estimatedMinutes} />
      </div>

      {(section.supportsDifficultyFilter || section.supportsTopicFilter) && (
        <FilterBar
          difficulties={section.supportsDifficultyFilter ? REVISION_DIFFICULTIES : undefined}
          selectedDifficulties={selectedDifficulties}
          onDifficultyChange={section.supportsDifficultyFilter ? setSelectedDifficulties : undefined}
          topics={section.supportsTopicFilter ? REVISION_TOPICS : undefined}
          selectedTopics={selectedTopics}
          onTopicChange={section.supportsTopicFilter ? setSelectedTopics : undefined}
        />
      )}

      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border dark:border-border-dark py-16 text-center">
        <Inbox size={28} className="text-ink-muted dark:text-ink-muted-dark" />
        <p className="font-display text-sm font-semibold text-ink dark:text-ink-dark">
          Content coming soon
        </p>
        <p className="max-w-sm text-sm text-ink-muted dark:text-ink-muted-dark">
          This section is fully wired up — filters, search, bookmarks, and revision
          tracking all work the moment content is added here.
        </p>
      </div>
    </div>
  );
}
