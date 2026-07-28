import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { NavItem } from "@/data/navigation";

export function PrevNext({ prev, next }: { prev: NavItem | null; next: NavItem | null }) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 grid grid-cols-1 gap-3 border-t border-border dark:border-border-dark pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex flex-col rounded-xl border border-border dark:border-border-dark p-4 transition-colors hover:border-signal-500/50"
        >
          <span className="flex items-center gap-1 text-xs text-ink-muted dark:text-ink-muted-dark">
            <ArrowLeft size={12} /> Previous
          </span>
          <span className="mt-1 font-medium text-ink dark:text-ink-dark group-hover:text-signal-600 dark:group-hover:text-signal-400">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-col items-end rounded-xl border border-border dark:border-border-dark p-4 text-right transition-colors hover:border-signal-500/50 sm:col-start-2"
        >
          <span className="flex items-center gap-1 text-xs text-ink-muted dark:text-ink-muted-dark">
            Next <ArrowRight size={12} />
          </span>
          <span className="mt-1 font-medium text-ink dark:text-ink-dark group-hover:text-signal-600 dark:group-hover:text-signal-400">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
