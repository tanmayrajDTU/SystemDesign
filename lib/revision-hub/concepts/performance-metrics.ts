import type { ConceptRevisionContent } from "./types";

export const performanceMetrics: ConceptRevisionContent = {
  slug: "performance-metrics",
  title: "Performance Metrics",
  topic: "Fundamentals",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Latency & Throughput", href: "/docs/fundamentals/latency-and-throughput" },
    { label: "Availability", href: "/docs/fundamentals/availability" },
  ],

  summary: [
    "Performance metrics are the quantified signals used to describe and monitor how well a system is actually performing — latency, throughput, error rate, and resource utilization are the core four.",
    "Latency and throughput measure speed and capacity (see their dedicated concepts); error rate and utilization round out the full picture of system health.",
    "Percentiles (p50/p95/p99), not averages, are the standard way to report latency-style metrics, since averages hide tail behavior that real users actually experience.",
    "The four \"golden signals\" (a widely used framework): latency, traffic (throughput), errors, and saturation — a compact checklist for what to monitor on any service.",
    "Metrics are only useful if tied to a threshold that means something (an SLO) — a dashboard full of numbers with no agreed target doesn't actually drive a decision.",
    "Resource utilization (CPU, memory, disk I/O, network) is a leading indicator — it often degrades before user-facing latency/error metrics do, making it useful for proactive rather than reactive response.",
  ],

  whyAsked: [
    "It checks whether a candidate knows which specific numbers actually matter for evaluating a system, beyond vague terms like \"fast\" or \"healthy.\"",
    "It's a natural way to test whether percentile reporting (not averages) is second nature.",
    "It sets up operational/observability discussions — what would actually page someone, and why.",
  ],

  thirtySecondAnswer:
    "Performance metrics are the quantified signals used to monitor how well a system is actually running. The core four are usually summarized as the 'golden signals': latency (how long requests take), traffic or throughput (how much load the system is handling), errors (the rate of failed requests), and saturation (how close a resource — CPU, memory, disk, network — is to its limit). Latency-style metrics should always be reported as percentiles, not averages, since an average can hide how bad the worst requests actually are. Metrics only become genuinely useful once they're tied to a meaningful threshold — an SLO — since a dashboard full of numbers with no agreed target doesn't actually drive any decision. Resource utilization in particular is often a leading indicator, degrading before user-facing latency or error rates do, which is what makes it useful for catching problems proactively rather than after users are already affected.",

  detailedAnswer: [
    "The four golden signals: latency (request duration), traffic/throughput (load volume), errors (failure rate), saturation (how full a resource is relative to its capacity).",
    "Latency should be reported via percentiles (p50, p95, p99) rather than an average, since the tail is what real users actually experience and averages hide it.",
    "Error rate is usually expressed as a percentage of failed requests over total requests, often broken down by error type/status code to distinguish client errors from server errors.",
    "Saturation (CPU, memory, disk I/O, network utilization) often degrades before user-facing metrics do, making it a useful leading indicator for proactive intervention.",
    "Metrics are only actionable when paired with a threshold that means something — connecting metrics to SLOs (and alerting on SLO/error-budget burn) is what turns raw numbers into an operational signal.",
  ],

  questions: [
    { id: "pm-q1", question: "What are the four golden signals?", answer: "Latency, traffic (throughput), errors, and saturation — a widely used framework for what to monitor on any service.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "pm-q2", question: "Why should latency be reported as percentiles rather than an average?", answer: "An average can look fine while hiding a genuinely bad experience for a meaningful fraction of users — percentiles (especially p99) reveal that tail behavior.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "pm-q3", question: "What is 'saturation' as a performance metric?", answer: "How close a resource (CPU, memory, disk I/O, network) is to its maximum capacity — a measure of how 'full' the system is.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pm-q4", question: "Why is saturation often considered a leading indicator?", answer: "Resource exhaustion typically starts degrading performance before it fully manifests as user-facing latency spikes or errors, making it useful for catching problems before users are affected.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q5", question: "How is error rate typically measured?", answer: "The percentage of failed requests out of total requests over a time window, often broken down by error type or status code.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "pm-q6", question: "Why do metrics need to be tied to a threshold (like an SLO) to be genuinely useful?", answer: "A raw number with no agreed target doesn't drive any decision — connecting a metric to an SLO gives it a meaning (\"is this okay or not\") that a bare dashboard number lacks.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pm-q7", question: "What's the difference between throughput and traffic as used in the golden signals framework?", answer: "They're essentially the same concept — the rate of requests/operations the system is handling — 'traffic' is just the term used in the golden signals naming.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "pm-q8", question: "Why might high CPU utilization alone not be a problem worth alerting on?", answer: "High utilization without a corresponding degradation in latency, errors, or throughput might just mean the system is efficiently using available capacity — saturation matters most in combination with actual user-facing impact.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q9", question: "How would you decide which percentile to alert on for latency?", answer: "It depends on what matters for the specific service — p99 is common for catching tail-latency problems, but a service with very strict per-request guarantees might even track p99.9.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q10", question: "Why is breaking down error rate by status code/type useful?", answer: "A spike in client errors (4xx) often indicates a client-side or API-contract issue, while a spike in server errors (5xx) points to an actual system problem — lumping them together obscures the real cause.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pm-q11", question: "What's the relationship between performance metrics and capacity planning?", answer: "Trends in throughput and saturation over time directly inform when additional capacity will be needed, turning monitoring data into a forward-looking planning input, not just a reactive alerting tool.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q12", question: "Why might a team track metrics per-endpoint rather than only system-wide?", answer: "A system-wide average can hide a severely degraded single endpoint if it's a small fraction of total traffic — per-endpoint breakdown catches localized problems a system-wide view would miss.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q13", question: "What's an example of a metric that's easy to measure but often misleading?", answer: "Average latency alone — it's simple to compute but hides tail behavior; percentile-based metrics are needed for an accurate picture.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pm-q14", question: "How does error-budget burn rate relate to performance metrics and alerting?", answer: "Rather than alerting on a raw metric crossing a fixed threshold, alerting on how fast the SLO's error budget is being consumed gives an urgency-aware signal — a slow, small burn is less urgent than a fast one heading toward exhaustion.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q15", question: "Why might latency metrics be measured at multiple points (client, load balancer, server)?", answer: "To isolate where time is actually being spent — a discrepancy between client-observed and server-observed latency points to network/transit time as the issue, rather than server-side processing.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q16", question: "What's a common mistake when setting up performance monitoring?", answer: "Tracking only average latency and overall request count, without percentiles, error breakdowns, or saturation — missing the fuller picture the golden signals framework is meant to capture.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pm-q17", question: "How do performance metrics inform whether a system needs to scale (see Scalability)?", answer: "Sustained high saturation or throughput approaching known capacity limits, especially combined with rising latency, is the concrete signal that a scaling bottleneck has actually arrived, rather than a hypothetical future concern.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pm-q18", question: "Why is it important to define performance metrics before an incident happens, not during one?", answer: "Deciding what 'normal' looks like and what threshold means 'something is wrong' during an active incident is far harder and slower than having pre-agreed baselines and alert thresholds ready in advance.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q19", question: "What's the risk of alerting on too many metrics/thresholds at once?", answer: "Alert fatigue — if too many low-signal alerts fire routinely, real, urgent problems get lost in the noise and are more likely to be missed or ignored.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pm-q20", question: "Summarize performance metrics in one sentence.", answer: "The quantified signals — commonly latency, traffic, errors, and saturation — used to monitor system health, most useful when reported as percentiles and tied to a meaningful threshold like an SLO.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What would actually page someone for this system, and at what threshold?\"",
    "\"Why p99 specifically, and not the average or p95?\"",
    "\"How would you break this metric down to find the actual root cause?\"",
  ],

  commonMistakes: [
    "Only tracking average latency instead of percentiles.",
    "Monitoring metrics with no threshold or SLO tied to them.",
    "Lumping all errors together instead of distinguishing client (4xx) from server (5xx) errors.",
    "Ignoring saturation/resource utilization as a leading indicator until it's already caused user-facing problems.",
  ],

  interviewTraps: [
    "\"What metric would you track for this system?\" with a one-word answer (\"latency\") is a trap for candidates who haven't internalized the fuller golden-signals picture (latency, traffic, errors, saturation).",
    "Being asked \"is 80% CPU utilization a problem\" is testing whether you connect saturation to actual user-facing impact rather than treating a raw utilization number as inherently good or bad.",
  ],

  tradeoffs: [
    "More granular metrics (per-endpoint, more percentiles) give better diagnostic power but increase monitoring/storage overhead.",
    "More aggressive alert thresholds catch problems earlier but risk alert fatigue if tuned too sensitively.",
  ],

  decisionGuide: undefined,

  memoryTrick:
    "\"LTES\" — Latency, Traffic, Errors, Saturation: the four golden signals. If you can name all four unprompted, you've covered the standard performance-monitoring checklist.",

  realWorldExamples: [
    "Google's Site Reliability Engineering practice popularized the four golden signals specifically as a minimal, memorable checklist for what any service should be monitoring, regardless of its specifics.",
    "Many real production incidents are first caught via a saturation metric (disk filling up, memory climbing) well before any user-facing latency or error-rate metric shows a problem — exactly the leading-indicator behavior that makes saturation worth tracking proactively.",
  ],

  mermaidDiagram: `flowchart TD
    Signals["Golden Signals"] --> L[Latency\np50/p95/p99]
    Signals --> T[Traffic\nrequests/sec]
    Signals --> E[Errors\n% failed requests]
    Signals --> S[Saturation\nCPU/memory/disk/network]
    S -.often a leading indicator.-> L`,

  flashcards: [
    { id: "pm-fc1", front: "Four golden signals", back: "Latency, Traffic (throughput), Errors, Saturation.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "pm-fc2", front: "Why percentiles over average for latency?", back: "Averages hide tail behavior — percentiles (p95/p99) reveal what the worst-off users actually experience.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "pm-fc3", front: "Saturation", back: "How close a resource (CPU, memory, disk, network) is to its capacity limit — often a leading indicator.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pm-fc4", front: "Why break error rate down by status code?", back: "Distinguishes client-side issues (4xx) from actual system problems (5xx) — lumping them together hides the real cause.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pm-fc5", front: "Why do metrics need a threshold (SLO) to be useful?", back: "A number with no agreed target doesn't drive a decision — tying it to an SLO gives it operational meaning.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Performance Metrics",
    sections: [
      { heading: "Golden signals", items: ["Latency (p50/p95/p99)", "Traffic / throughput", "Errors (% failed, by type)", "Saturation (resource utilization)"] },
      { heading: "Remember", items: ["Percentiles, not averages", "Tie metrics to an SLO/threshold", "Saturation = leading indicator", "Break down by endpoint/status code"] },
    ],
  },

  speedNotes: [
    "Golden signals: Latency, Traffic, Errors, Saturation.",
    "Always percentiles (p50/p95/p99) for latency, never just average.",
    "Saturation often degrades before latency/errors — leading indicator.",
    "Break error rate down by status code (4xx vs 5xx).",
    "Metrics need an SLO/threshold attached to actually be actionable.",
  ],
};
