import type { CheatSheetData } from "@/lib/revision-hub/types";

export function CheatSheet({ title, sections }: CheatSheetData) {
  return (
    <div className="cheat-sheet rounded-xl border border-border dark:border-border-dark p-5">
      <h3 className="mb-4 font-display text-base font-semibold text-ink dark:text-ink-dark">{title}</h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.heading} className="break-inside-avoid">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-signal-600 dark:text-signal-400">
              {section.heading}
            </h4>
            <ul className="space-y-1 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
