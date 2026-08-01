"use client";

import { useMemo, useState } from "react";
import { FlashcardDeck } from "@/components/revision/flashcard-deck";
import { FilterBar } from "@/components/revision/filter-bar";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { getRevisionSection } from "@/data/revision-hub";
import { allFlashcards, allTopics } from "@/lib/revision-hub/concepts";
import type { Difficulty } from "@/lib/revision-hub/types";

const section = getRevisionSection("flashcards")!;

export default function Page() {
  const [topicFilter, setTopicFilter] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty[]>([]);

  const cards = useMemo(() => allFlashcards(), []);
  const topics = useMemo(() => allTopics(), []);

  const visible = cards.filter((c) => {
    if (topicFilter.length > 0 && !topicFilter.includes(c.topic ?? "")) return false;
    if (difficultyFilter.length > 0 && !difficultyFilter.includes(c.difficulty as Difficulty)) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
          {section.title}
        </h1>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <EstimatedTimeBadge minutes={section.estimatedMinutes} />
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
        {visible.length} of {cards.length} cards
      </p>

      {visible.length > 0 ? (
        <FlashcardDeck cards={visible} />
      ) : (
        <p className="py-10 text-center text-sm text-ink-muted dark:text-ink-muted-dark">
          No flashcards match these filters yet.
        </p>
      )}
    </div>
  );
}
