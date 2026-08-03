"use client";

import { useEffect, useMemo, useState } from "react";
import { Shuffle } from "lucide-react";
import { FilterBar } from "@/components/revision/filter-bar";
import { EstimatedTimeBadge } from "@/components/revision/estimated-time-badge";
import { ProgressSummary } from "@/components/revision/progress-summary";
import { QuickRevisionSession } from "@/components/revision/quick-revision-session";
import { getRevisionSection } from "@/data/revision-hub";
import { buildQuickRevisionDeck, shuffleItems, type QuickRevisionItem } from "@/lib/revision-hub/quick-revision";
import { allTopics } from "@/lib/revision-hub/concepts";
import { useRevised } from "@/lib/revision-hub/use-revised";
import type { Difficulty } from "@/lib/revision-hub/types";

const section = getRevisionSection("quick-revision")!;

export default function Page() {
  const [topicFilter, setTopicFilter] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty[]>([]);
  const [hideRevised, setHideRevised] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);

  // sessionItems is a *snapshot*: it only recomputes when a filter or the
  // shuffle button is explicitly changed, not on every mark-as-revised
  // click — otherwise "hide already revised" would yank the current card
  // out from under you mid-session.
  const [sessionItems, setSessionItems] = useState<QuickRevisionItem[]>([]);
  const [sessionKey, setSessionKey] = useState(0);

  const deck = useMemo(() => buildQuickRevisionDeck(), []);
  const topics = useMemo(() => allTopics(), []);
  const { isRevised, hydrated } = useRevised();

  function buildSession(reshuffle: boolean) {
    let list = deck.filter((item) => {
      if (topicFilter.length > 0 && !topicFilter.includes(item.topic)) return false;
      if (difficultyFilter.length > 0 && !difficultyFilter.includes(item.difficulty as Difficulty))
        return false;
      if (hideRevised && hydrated && isRevised(item.id)) return false;
      return true;
    });
    if (shuffleOn || reshuffle) list = shuffleItems(list);
    setSessionItems(list);
    setSessionKey((k) => k + 1);
  }

  // Rebuild whenever a filter changes or storage hydrates, so the very
  // first render (before localStorage is read) doesn't wrongly hide cards.
  useEffect(() => {
    buildSession(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicFilter, difficultyFilter, hideRevised, hydrated]);

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:px-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">
          {section.title}
        </h1>
        <p className="max-w-2xl text-ink-muted dark:text-ink-muted-dark">{section.description}</p>
        <div className="flex items-center gap-3">
          <EstimatedTimeBadge minutes={section.estimatedMinutes} />
          <ProgressSummary allIds={sessionItems.map((i) => i.id)} />
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

      <div className="no-print flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-1.5 text-xs font-medium text-ink-muted dark:text-ink-muted-dark">
          <input
            type="checkbox"
            checked={hideRevised}
            onChange={(e) => setHideRevised(e.target.checked)}
            className="accent-signal-500"
          />
          Hide already revised
        </label>

        <button
          type="button"
          onClick={() => {
            setShuffleOn(true);
            buildSession(true);
          }}
          className="flex items-center gap-1.5 rounded-full border border-border dark:border-border-dark px-3 py-1
            text-xs font-medium text-ink-muted dark:text-ink-muted-dark hover:border-signal-500/50 hover:text-ink dark:hover:text-ink-dark"
        >
          <Shuffle size={12} /> Shuffle
        </button>

        {shuffleOn && (
          <button
            type="button"
            onClick={() => {
              setShuffleOn(false);
              buildSession(false);
            }}
            className="text-xs text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark"
          >
            Reset order
          </button>
        )}
      </div>

      <p className="text-xs text-ink-muted dark:text-ink-muted-dark">
        {sessionItems.length} of {deck.length} items in this session
      </p>

      {sessionItems.length > 0 ? (
        <QuickRevisionSession key={sessionKey} items={sessionItems} />
      ) : (
        <p className="py-10 text-center text-sm text-ink-muted dark:text-ink-muted-dark">
          {hideRevised
            ? "Nothing left to revise here — nice, you've been through everything that matches these filters."
            : "No concepts or questions match these filters yet."}
        </p>
      )}
    </div>
  );
}
