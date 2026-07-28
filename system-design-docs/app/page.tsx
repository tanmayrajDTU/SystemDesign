import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NAVIGATION, isReady } from "@/data/navigation";

const HERO_PATH =
  "M 10 60 C 120 60, 120 20, 230 20 S 340 100, 450 100 S 560 20, 670 20";

const NODES = [
  { label: "Client", x: 10, y: 60 },
  { label: "Load Balancer", x: 230, y: 20 },
  { label: "API", x: 450, y: 100 },
  { label: "Cache / DB", x: 670, y: 20 },
];

export default function HomePage() {
  const readyCount = NAVIGATION.flatMap((s) => s.items).filter((i) => isReady(i.slug)).length;
  const totalCount = NAVIGATION.flatMap((s) => s.items).length;

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-16 lg:px-10 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block rounded-full border border-signal-500/30 bg-signal-500/10 px-3 py-1 text-xs font-medium text-signal-600 dark:text-signal-400">
              {readyCount} of {totalCount} chapters live — growing every week
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink dark:text-ink-dark sm:text-5xl">
              Learn how large systems
              <br />
              actually get built.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-muted dark:text-ink-muted-dark">
              A free, documentation-grade guide to system design — from CAP theorem
              to how Netflix streams video to 300 million people. Deep explanations,
              real diagrams, interview-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/fundamentals/what-is-system-design"
                className="flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-signal-600"
              >
                Start with the fundamentals <ArrowRight size={16} />
              </Link>
              <Link
                href="/docs/case-studies/url-shortener"
                className="flex items-center gap-2 rounded-lg border border-border dark:border-border-dark px-5 py-2.5 text-sm font-medium text-ink dark:text-ink-dark hover:border-signal-500/50"
              >
                Jump to a case study
              </Link>
            </div>
          </div>

          {/* Signature element: animated request flowing through a system */}
          <div className="relative mx-auto h-64 w-full max-w-xl">
            <svg viewBox="0 0 700 130" className="h-full w-full overflow-visible">
              <path
                d={HERO_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-border dark:text-border-dark"
              />
              {NODES.map((n) => (
                <g key={n.label}>
                  <circle cx={n.x} cy={n.y} r={5} className="fill-signal-500" />
                  <text
                    x={n.x}
                    y={n.y - 14}
                    textAnchor="middle"
                    className="fill-ink-muted dark:fill-ink-muted-dark font-mono"
                    fontSize="10"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
            {/* Packets traveling along the same path, offset in time */}
            {[0, 1.1, 2.2].map((delay, i) => (
              <span
                key={i}
                className="absolute left-0 top-0 h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_2px_rgba(242,183,5,0.6)] animate-packet-travel"
                style={{
                  offsetPath: `path('${HERO_PATH}')`,
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum overview */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-10">
        <h2 className="mb-8 font-display text-xl font-semibold text-ink dark:text-ink-dark">
          Full curriculum
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAVIGATION.map((section) => {
            const ready = section.items.filter((i) => isReady(i.slug));
            const firstReady = ready[0];
            return (
              <div
                key={section.slug}
                className="rounded-xl border border-border dark:border-border-dark p-5"
              >
                <h3 className="font-display text-sm font-semibold text-ink dark:text-ink-dark">
                  {section.title}
                </h3>
                <p className="mt-1 text-xs text-ink-muted dark:text-ink-muted-dark">
                  {section.items.length} topics · {ready.length} live
                </p>
                {firstReady ? (
                  <Link
                    href={`/docs/${firstReady.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-signal-600 dark:text-signal-400 hover:underline"
                  >
                    Read now <ArrowRight size={14} />
                  </Link>
                ) : (
                  <span className="mt-4 inline-block text-sm text-ink-muted dark:text-ink-muted-dark">
                    Coming soon
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
