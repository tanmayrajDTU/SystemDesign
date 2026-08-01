import { RevisionHubCard } from "@/components/revision/revision-hub-card";
import { REVISION_HUB_SECTIONS } from "@/data/revision-hub";

export const metadata = {
  title: "Interview Revision Hub",
  description: "Fast, focused interview revision: questions, flashcards, cheat sheets, and comparison tables — separate from the detailed chapter notes.",
};

export default function RevisionHubPage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <div className="max-w-2xl">
        <span className="mb-4 inline-block rounded-full border border-signal-500/30 bg-signal-500/10 px-3 py-1 text-xs font-medium text-signal-600 dark:text-signal-400">
          Interview Revision Hub
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-ink-dark sm:text-4xl">
          Revise fast, not from scratch.
        </h1>
        <p className="mt-4 text-lg text-ink-muted dark:text-ink-muted-dark">
          Everything here is built for the day before an interview — bookmark what
          you keep forgetting, mark what you've re-confirmed, and pick up exactly
          where you left off.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REVISION_HUB_SECTIONS.map((section) => (
          <RevisionHubCard key={section.slug} section={section} />
        ))}
      </div>
    </div>
  );
}
