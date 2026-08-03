import { AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";

const STYLES = {
  note: {
    icon: Info,
    classes: "border-accent-500/30 bg-accent-500/5 text-accent-700 dark:text-accent-400",
  },
  tip: {
    icon: Lightbulb,
    classes: "border-success-500/30 bg-success-500/5 text-success-700 dark:text-success-400",
  },
  warning: {
    icon: AlertTriangle,
    classes: "border-amber-600/30 bg-amber-500/5 text-amber-700 dark:text-amber-400",
  },
  info: {
    icon: Info,
    classes: "border-info-500/30 bg-info-500/5 text-info-700 dark:text-info-400",
  },
  danger: {
    icon: ShieldAlert,
    classes: "border-danger-500/30 bg-danger-500/5 text-danger-700 dark:text-danger-400",
  },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: string;
  title?: string;
  children: ReactNode;
}) {
  const style = STYLES[type as keyof typeof STYLES] || STYLES.note;
  const { icon: Icon, classes } = style;
  return (
    <div className={`not-prose my-6 flex gap-3 rounded-xl border p-4 ${classes}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div className="text-sm leading-relaxed text-ink dark:text-ink-dark">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className="[&>p]:m-0 [&>p+p]:mt-2">{children}</div>
      </div>
    </div>
  );
}
