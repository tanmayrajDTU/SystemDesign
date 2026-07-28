"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

type Question = {
  q: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
};

export function Quiz({ questions }: { questions: Question[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});

  return (
    <div className="not-prose my-10 rounded-xl border border-border dark:border-border-dark p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink dark:text-ink-dark">
        <HelpCircle size={16} className="text-signal-500" />
        Check your understanding
      </div>
      <div className="space-y-6">
        {questions.map((question, qi) => {
          const chosen = picked[qi];
          const answered = chosen !== undefined;
          return (
            <div key={qi}>
              <p className="mb-2 text-sm font-medium text-ink dark:text-ink-dark">
                {qi + 1}. {question.q}
              </p>
              <div className="flex flex-col gap-2">
                {question.options.map((opt, oi) => {
                  const isCorrect = oi === question.answer;
                  const isChosen = chosen === oi;
                  return (
                    <button
                      key={oi}
                      disabled={answered}
                      onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors
                        ${
                          answered && isCorrect
                            ? "border-success/40 bg-success/10 text-emerald-700 dark:text-emerald-400"
                            : answered && isChosen && !isCorrect
                            ? "border-danger/40 bg-danger/10 text-red-700 dark:text-red-400"
                            : "border-border dark:border-border-dark hover:border-signal-500/50"
                        }
                        ${answered ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect && <CheckCircle2 size={16} />}
                      {answered && isChosen && !isCorrect && <XCircle size={16} />}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <p className="mt-2 rounded-lg bg-surface-raised dark:bg-surface-raised-dark p-3 text-xs leading-relaxed text-ink-muted dark:text-ink-muted-dark">
                  {question.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
