// Estimated revision time, kept deliberately simple and dependency-free so
// it works identically for prose (cheat sheets, nuggets) and structured
// content (N flashcards, N questions) without needing full MDX bodies yet.

// Revision reading tends to be slower/denser than casual reading time
// (lib/content.ts uses the `reading-time` package's ~200wpm default for
// docs) — 130wpm reflects that this is focused review, not first-read.
const WORDS_PER_MINUTE = 130;

export function estimateMinutesFromWordCount(wordCount: number): number {
  if (wordCount <= 0) return 0;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function estimateMinutesFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return estimateMinutesFromWordCount(words);
}

// For item-based content (flashcards, Q&A) where there's no prose body yet,
// use a flat per-item estimate instead — tunable per content type.
export function estimateMinutesFromItemCount(itemCount: number, minutesPerItem = 0.75): number {
  if (itemCount <= 0) return 0;
  return Math.max(1, Math.ceil(itemCount * minutesPerItem));
}

export function formatMinutes(minutes: number): string {
  if (minutes <= 0) return "—";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}
