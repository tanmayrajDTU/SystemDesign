import type { ConceptRevisionContent } from "./types";

export const latency: ConceptRevisionContent = {
  slug: "latency",
  title: "Latency",
  topic: "Fundamentals",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Latency & Throughput", href: "/docs/fundamentals/latency-and-throughput" },
  ],

  summary: [
    "Latency is the time it takes to complete a single operation — from request sent to response received.",
    "It's usually reported as percentiles (p50, p95, p99), not a single average, because averages hide how bad the worst experiences actually are.",
    "p99 (\"tail latency\") often matters more for real user experience than the average — a great average with a bad p99 still means a meaningful share of real users have a slow experience.",
    "Latency has multiple contributing sources: network round-trips, serialization, queueing/waiting, and actual processing time — improving it means identifying which source dominates.",
    "Latency and throughput are related but distinct — see the dedicated Throughput concept and Little's Law for how they connect.",
    "Common latency-reduction techniques: caching, reducing network hops, CDNs, connection reuse, and parallelizing independent sub-operations.",
  ],

  whyAsked: [
    "It tests whether a candidate reports performance using percentiles rather than a misleading single average.",
    "It's the natural entry point into caching, CDN, and architecture discussions aimed at improving user-perceived speed.",
    "It reveals whether someone understands tail latency (p99) as the number that actually matters for user experience, not just the mean.",
  ],

  thirtySecondAnswer:
    "Latency is the time it takes to complete a single operation, from request to response. It's usually reported as percentiles rather than a plain average — p50 is the median, p95 and p99 capture the tail, and p99 in particular is often what actually determines user experience, since even a great average can hide a meaningful fraction of genuinely slow requests. Latency comes from several sources — network round-trips, serialization, queueing, and actual processing time — and reducing it means figuring out which of those dominates rather than guessing. Common fixes include caching, reducing network hops, using a CDN, reusing connections, and parallelizing independent parts of a request.",

  detailedAnswer: [
    "Latency = time from request sent to response received, for a single operation.",
    "Percentiles matter more than averages: p50 (median), p95, p99 — p99 is 'tail latency,' and a slow tail affects real users even when the average looks fine.",
    "Latency sources to distinguish: network transit time, serialization/deserialization, queueing/wait time, and actual compute/processing time — each needs a different fix.",
    "Standard latency-reduction techniques: caching (avoid recomputation), CDNs (reduce network distance), connection reuse (avoid repeated handshake overhead), and parallelizing independent sub-requests instead of doing them serially.",
    "Latency rises sharply as a system nears its throughput limit, due to queueing — this is why latency and throughput need to be discussed together, not independently.",
  ],

  questions: [
    { id: "lat-q1", question: "What is latency?", answer: "The time it takes to complete a single operation, from request sent to response received.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "lat-q2", question: "Why is latency usually reported as percentiles rather than an average?", answer: "An average can hide how bad the worst requests actually are — percentiles like p95/p99 reveal the tail experience that a meaningful fraction of real users actually have.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "lat-q3", question: "What does p99 latency mean?", answer: "99% of requests are faster than this value — only the slowest 1% take longer; it's often called 'tail latency.'", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "lat-q4", question: "Why does p99 latency often matter more than average latency for user experience?", answer: "Users experience their own individual request, not the average across all requests — a bad p99 means a real, meaningful share of users have a slow experience even if the average is excellent.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-q5", question: "What are the main contributing sources to latency?", answer: "Network round-trip time, serialization/deserialization, queueing/waiting for a resource, and actual processing/compute time — each has different fixes.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-q6", question: "How does caching reduce latency?", answer: "It avoids repeating expensive computation or a slow round-trip (e.g. to a database) by serving a previously computed result directly from a much faster layer.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "lat-q7", question: "How does a CDN reduce latency?", answer: "It serves content from a location physically closer to the user, reducing network round-trip time compared to reaching a single, possibly distant, origin server.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "lat-q8", question: "Why does queueing increase latency as a system approaches its throughput limit?", answer: "Requests spend more time waiting for a free resource as utilization rises, even though actual processing time per request hasn't changed — the wait time, not the work itself, dominates latency near saturation.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "lat-q9", question: "How can parallelizing sub-operations reduce latency?", answer: "If a request depends on several independent pieces of work (e.g. calling three unrelated services), doing them concurrently instead of serially means total latency is close to the slowest single piece, not the sum of all of them.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-q10", question: "Why does connection reuse reduce latency?", answer: "Establishing a new connection (TCP handshake, TLS negotiation) has fixed overhead on every request; reusing an existing connection skips that overhead for subsequent requests.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-q11", question: "What's the difference between p50 and p99 latency, concretely?", answer: "p50 is the median request's latency — a typical experience; p99 is the latency below which 99% of requests fall — it captures how bad the slowest 1% of requests actually are.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "lat-q12", question: "Why might optimizing only for average latency be misleading in an interview answer?", answer: "It ignores tail behavior — a design could have an excellent average while still delivering a genuinely bad experience to a meaningful fraction of users, which percentile reporting would reveal.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "lat-q13", question: "How would you diagnose which source of latency is dominant in a slow request?", answer: "Break down the request's timeline into network transit, serialization, queueing, and processing, and measure each separately — the fix depends entirely on which segment actually dominates.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "lat-q14", question: "What's an example of a latency optimization that could hurt throughput?", answer: "Processing each request individually rather than batching improves per-request latency but can reduce total throughput, since batching amortizes fixed overhead across many items.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "lat-q15", question: "Why is network round-trip time often the dominant latency source for geographically distributed users?", answer: "Physical distance imposes a hard speed-of-light floor on round-trip time that no amount of server-side optimization can remove — this is precisely why CDNs and regional deployment exist.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-q16", question: "How does database indexing relate to latency?", answer: "It reduces the processing-time component of latency by avoiding a full table scan for a query, directly speeding up that portion of the request.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-q17", question: "What's a common mistake when stating a latency requirement in an interview?", answer: "Stating a latency target as a vague average (\"should be fast\") instead of a specific percentile bound (\"p99 under 200ms\"), which isn't actually measurable or designable against.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-q18", question: "Why do some systems intentionally accept higher latency for better throughput?", answer: "For workloads where per-item speed doesn't matter much (batch analytics, background processing), trading latency for throughput via batching is the correct, deliberate choice, not an oversight.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "lat-q19", question: "How does synchronous vs. asynchronous processing affect perceived latency?", answer: "Synchronous processing makes the caller wait for the full operation, directly exposing its latency; asynchronous processing can return an immediate acknowledgment and let the actual work complete later, hiding that latency from the caller's perspective.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "lat-q20", question: "Summarize latency in one sentence.", answer: "Latency is the time a single operation takes from request to response, best understood through percentiles (especially the tail, p99) rather than a plain average.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What's the p99 latency target here, not just the average?\"",
    "\"Where specifically is the latency coming from in this request?\"",
    "\"What would you do to shave latency off this critical path?\"",
  ],

  commonMistakes: [
    "Reporting or reasoning about latency only via average, ignoring tail behavior.",
    "Stating a latency requirement as a vague adjective instead of a percentile-based number.",
    "Proposing a fix (like adding more servers) that helps throughput but doesn't address the actual latency bottleneck.",
    "Not distinguishing which latency source (network, queueing, processing) is actually dominant before proposing a fix.",
  ],

  interviewTraps: [
    "\"What's the latency of this system?\" with no percentile specified is a trap for candidates who answer with a single made-up average instead of asking or specifying which percentile matters.",
    "Being asked to reduce latency when the real problem is throughput-driven queueing is a trap — the honest first move is diagnosing the actual dominant source before proposing caching or CDNs reflexively.",
  ],

  tradeoffs: [
    "Batching for throughput increases individual latency.",
    "More aggressive caching reduces latency but introduces staleness/invalidation complexity.",
    "Parallelizing sub-operations reduces latency but increases complexity (error handling across concurrent calls) and resource usage.",
  ],

  decisionGuide: undefined,

  memoryTrick:
    "\"Average lies, p99 tells the truth.\" Never quote a single average for latency — always ask or state which percentile (p50/p95/p99) you mean, since the tail is usually what actually hurts users.",

  realWorldExamples: [
    "Search engines obsess over p99 latency specifically because a slow tail (even briefly) is disproportionately visible to users and directly measurable in engagement metrics.",
    "Financial trading systems treat latency in microseconds as a competitive advantage, to the point of choosing physical server location purely to shave network round-trip time.",
  ],

  mermaidDiagram: `flowchart LR
    Req[Request Sent] --> Net[Network Transit]
    Net --> Q[Queue / Wait]
    Q --> Proc[Processing]
    Proc --> Resp[Response Received]
    Resp -.total time.-> Latency[Latency = Req to Resp]`,

  flashcards: [
    { id: "lat-fc1", front: "Latency — one-line definition", back: "Time to complete a single operation, from request to response.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "lat-fc2", front: "p99 latency", back: "The value below which 99% of requests fall — the 'tail latency.'", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "lat-fc3", front: "Why report percentiles instead of average latency?", back: "Averages hide how bad the slowest requests actually are; percentiles reveal the tail experience.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-fc4", front: "Four main sources of latency", back: "Network transit, serialization, queueing/wait, processing time.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "lat-fc5", front: "Main latency-reduction techniques", back: "Caching, CDNs, connection reuse, parallelizing independent sub-operations.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Latency",
    sections: [
      { heading: "Definition", items: ["Time for one operation, request to response", "Report as percentiles, not average"] },
      { heading: "Percentiles", items: ["p50 = median", "p95 / p99 = tail latency", "p99 usually matters most for UX"] },
      { heading: "Reduce via", items: ["Caching", "CDN (reduce network distance)", "Connection reuse", "Parallelize independent sub-ops"] },
      { heading: "Sources", items: ["Network transit", "Serialization", "Queueing/wait", "Processing time"] },
    ],
  },

  speedNotes: [
    "Latency = time for one operation, request to response.",
    "Always percentiles: p50 (median), p95, p99 (tail) — never just average.",
    "p99 usually matters most for real user experience.",
    "Sources: network, serialization, queueing, processing — fix depends on which dominates.",
    "Reduce via caching, CDN, connection reuse, parallelizing sub-operations.",
  ],
};
