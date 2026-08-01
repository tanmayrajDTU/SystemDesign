"use client";

import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/revision-hub/types";

type FilterBarProps = {
  difficulties?: readonly Difficulty[];
  selectedDifficulties?: Difficulty[];
  onDifficultyChange?: (next: Difficulty[]) => void;
  topics?: string[];
  selectedTopics?: string[];
  onTopicChange?: (next: string[]) => void;
};

function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

// Renders one or both filter rows depending on which props are passed —
// a page that only supports topic filtering (e.g. Cheat Sheets) simply
// omits the difficulty props rather than needing a separate component.
export function FilterBar({
  difficulties,
  selectedDifficulties = [],
  onDifficultyChange,
  topics,
  selectedTopics = [],
  onTopicChange,
}: FilterBarProps) {
  if (!difficulties?.length && !topics?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      {difficulties && difficulties.length > 0 && onDifficultyChange && (
        <FilterRow
          label="Difficulty"
          options={difficulties as string[]}
          selected={selectedDifficulties}
          onToggle={(value) =>
            onDifficultyChange(toggleIn(selectedDifficulties, value as Difficulty))
          }
        />
      )}
      {topics && topics.length > 0 && onTopicChange && (
        <FilterRow
          label="Topic"
          options={topics}
          selected={selectedTopics}
          onToggle={(value) => onTopicChange(toggleIn(selectedTopics, value))}
          scrollable
        />
      )}
    </div>
  );
}

function FilterRow({
  label,
  options,
  selected,
  onToggle,
  scrollable,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  scrollable?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1.5 shrink-0 text-xs font-medium uppercase tracking-wide text-ink-muted dark:text-ink-muted-dark">
        {label}
      </span>
      <div
        className={cn(
          "flex flex-wrap gap-1.5",
          scrollable && "flex-nowrap overflow-x-auto scroll-thin pb-1"
        )}
      >
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                active
                  ? "border-signal-500 bg-signal-500/10 text-signal-600 dark:text-signal-400"
                  : "border-border dark:border-border-dark text-ink-muted dark:text-ink-muted-dark hover:border-signal-500/50 hover:text-ink dark:hover:text-ink-dark"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
