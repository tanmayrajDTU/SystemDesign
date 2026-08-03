import { cn } from "@/lib/utils";

export type BadgeTone =
  | "neutral"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "info"
  | "accent"
  | "success"
  | "warning"
  | "danger";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral:
    "border-border dark:border-border-dark text-ink-muted dark:text-ink-muted-dark",
  beginner:
    "border-success-500/30 bg-success-500/10 text-success-700 dark:text-success-400",
  intermediate:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  advanced:
    "border-signal-500/30 bg-signal-500/10 text-signal-700 dark:text-signal-400",
  info: "border-info-500/30 bg-info-500/10 text-info-700 dark:text-info-400",
  accent:
    "border-accent-500/30 bg-accent-500/10 text-accent-700 dark:text-accent-400",
  success:
    "border-success-500/30 bg-success-500/10 text-success-700 dark:text-success-400",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  danger:
    "border-danger-500/30 bg-danger-500/10 text-danger-700 dark:text-danger-400",
};

/** Maps a difficulty label to a badge tone (green/amber/rose) so difficulty
 *  is recognizable at a glance instead of blending into every other tag. */
export function difficultyTone(difficulty?: string | null): BadgeTone {
  switch (difficulty) {
    case "Beginner":
      return "beginner";
    case "Intermediate":
      return "intermediate";
    case "Advanced":
      return "advanced";
    default:
      return "neutral";
  }
}

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
