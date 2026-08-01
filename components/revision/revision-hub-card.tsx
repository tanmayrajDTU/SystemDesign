import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { formatMinutes } from "@/lib/revision-hub/estimate-time";
import type { RevisionSection } from "@/data/revision-hub";

export function RevisionHubCard({ section }: { section: RevisionSection }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[section.icon] ?? Icons.FileText;

  return (
    <Link
      href={`/revision-hub/${section.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border dark:border-border-dark p-5 transition-colors hover:border-signal-500/50"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-500/10 text-signal-600 dark:text-signal-400">
        <Icon size={18} />
      </span>
      <h3 className="font-display text-sm font-semibold text-ink dark:text-ink-dark">{section.title}</h3>
      <p className="text-xs leading-relaxed text-ink-muted dark:text-ink-muted-dark">
        {section.description}
      </p>
      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-ink-muted dark:text-ink-muted-dark">
        <span>{formatMinutes(section.estimatedMinutes)}</span>
        <span className="flex items-center gap-1 font-medium text-signal-600 dark:text-signal-400 opacity-0 transition-opacity group-hover:opacity-100">
          Open <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
