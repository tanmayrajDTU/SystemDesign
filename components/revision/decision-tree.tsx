"use client";

import { useState } from "react";
import { RotateCcw, ChevronRight } from "lucide-react";
import type { DecisionNode } from "@/lib/revision-hub/types";

// Click-through decision tree: each click walks one level deeper and is
// recorded in a breadcrumb trail so the user can see (and retrace) the
// path they took to reach a recommendation.
export function DecisionTree({ root }: { root: DecisionNode }) {
  const [path, setPath] = useState<{ label: string; node: DecisionNode }[]>([
    { label: "Start", node: root },
  ]);

  const current = path[path.length - 1].node;

  function choose(label: string, next: DecisionNode) {
    setPath((p) => [...p, { label, node: next }]);
  }

  function reset() {
    setPath([{ label: "Start", node: root }]);
  }

  function jumpTo(index: number) {
    setPath((p) => p.slice(0, index + 1));
  }

  return (
    <div className="rounded-xl border border-border dark:border-border-dark p-5">
      <div className="no-print mb-4 flex flex-wrap items-center gap-1 text-xs text-ink-muted dark:text-ink-muted-dark">
        {path.map((step, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={12} />}
            <button
              onClick={() => jumpTo(i)}
              disabled={i === path.length - 1}
              className={
                i === path.length - 1
                  ? "font-medium text-ink dark:text-ink-dark"
                  : "hover:text-signal-500 hover:underline"
              }
            >
              {step.label}
            </button>
          </span>
        ))}
        {path.length > 1 && (
          <button
            onClick={reset}
            className="ml-auto flex items-center gap-1 rounded-md border border-border dark:border-border-dark px-2 py-1 hover:border-signal-500/50"
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      {current.kind === "question" ? (
        <div>
          <p className="mb-4 font-display text-base font-semibold text-ink dark:text-ink-dark">
            {current.question}
          </p>
          <div className="flex flex-col gap-2">
            {current.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => choose(opt.label, opt.next)}
                className="flex items-center justify-between rounded-lg border border-border dark:border-border-dark px-4 py-3 text-left text-sm font-medium text-ink dark:text-ink-dark hover:border-signal-500/50 hover:bg-surface-raised dark:hover:bg-surface-raised-dark"
              >
                {opt.label}
                <ChevronRight size={16} className="text-ink-muted dark:text-ink-muted-dark" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-success-500/30 bg-success-500/5 p-4">
          <p className="font-display text-base font-semibold text-success-700 dark:text-success-400">
            {current.result}
          </p>
          {current.rationale && (
            <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-ink-muted-dark">
              {current.rationale}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
