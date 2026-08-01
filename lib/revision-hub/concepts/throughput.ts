import type { ConceptRevisionContent } from "./types";

export const throughput: ConceptRevisionContent = {
  slug: "throughput",
  title: "Throughput",
  topic: "Fundamentals",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Latency & Throughput", href: "/docs/fundamentals/latency-and-throughput" },
  ],

  summary: [
    "Throughput is the number of operations a system completes per unit of time — requests per second (RPS), queries per second (QPS), or transactions per second.",
    "It measures total system capacity, not the experience of any single request — that's latency's job.",
    "A system can have high throughput and high latency at the same time (efficient batch processing where each item waits a while), or low throughput with low latency (one very fast worker handling one thing at a time).",
    "Throughput is usually reported alongside the latency at which it's sustained — \"5,000 QPS at p99 < 200ms\" is a meaningful claim; \"5,000 QPS\" alone isn't.",
    "Improving throughput typically means parallelism — more workers, more machines, more concurrent connections — not making any single operation faster.",
    "Little's Law ties throughput, latency, and concurrency together: concurrency = throughput × latency, which is why increasing concurrent load without increasing capacity raises effective latency.",
  ],

  whyAsked: [
    "It checks whether a candidate can distinguish 'how fast is one request' from 'how much total traffic can this handle' — a common early confusion.",
    "Capacity estimation in system design interviews is fundamentally a throughput calculation (requests/sec, given users and usage patterns).",
    "It sets up deeper questions about scaling, load balancing, and queueing under load.",
  ],

  thirtySecondAnswer:
    "Throughput is the number of operations a system can complete per unit of time — usually requests or queries per second. It measures total capacity, not how fast any single request feels, which is latency's job — a system can have high throughput and still feel slow per-request if it's optimized for batching, or have low throughput despite each individual request being fast. Improving throughput is usually about parallelism: more workers, more machines, more concurrent connections, rather than making any one operation faster. Throughput and latency are connected by Little's Law — concurrency equals throughput times latency — which is why pushing more concurrent load through a system without adding capacity ends up increasing effective latency.",

  detailedAnswer: [
    "Throughput = operations completed / time, commonly expressed as RPS or QPS.",
    "It's a system-wide, aggregate measure — distinct from latency, which is about a single operation's duration.",
    "Increasing throughput is typically achieved through horizontal scaling (more workers/machines) or better parallelism, not by speeding up individual operations.",
    "Throughput claims are only meaningful paired with a latency bound — a system handling huge throughput with unacceptable per-request latency hasn't actually solved the underlying problem.",
    "Little's Law (L = λW, or concurrency = throughput × latency) formalizes the relationship: for fixed capacity, pushing more concurrent requests through the system increases the effective latency each one experiences.",
  ],

  questions: [
    { id: "th-q1", question: "What is throughput?", answer: "The number of operations a system can complete per unit of time — commonly measured as requests or queries per second.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "th-q2", question: "How is throughput different from latency?", answer: "Throughput measures total system capacity over time; latency measures how long a single operation takes — a system can score well on one and poorly on the other.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "th-q3", question: "Can a system have high throughput and high latency at the same time?", answer: "Yes — efficient batch processing is a classic example: it handles huge total volume (high throughput) but each individual item may sit in a batch queue for a while before being processed (high latency).", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q4", question: "What's the usual way to improve throughput?", answer: "Parallelism — adding more workers, machines, or concurrent connections — rather than making any single operation faster, which is a latency optimization.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q5", question: "Why is a throughput number meaningless without a latency bound attached?", answer: "A system could technically process huge throughput by letting latency balloon arbitrarily (e.g. massive queueing) — stating \"5,000 QPS at p99 < 200ms\" is the actually meaningful claim, not throughput alone.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q6", question: "What is Little's Law, and how does it relate throughput and latency?", answer: "Concurrency = throughput × latency (L = λW). For a fixed processing capacity, increasing concurrent requests increases effective latency, since more requests are competing for the same throughput.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "th-q7", question: "How would you estimate required throughput for a new system in an interview?", answer: "From stated or assumed scale (daily active users, requests per user per day), compute average requests/sec, then account for peak-to-average ratio to estimate peak throughput.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q8", question: "Why might adding more parallel workers not improve latency, even though it improves throughput?", answer: "Each individual request still takes the same time to process once it's picked up — more workers let more requests be processed concurrently (throughput), but don't make any single one faster (latency).", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q9", question: "What's an example of a throughput bottleneck?", answer: "A single-threaded database write path — no matter how many application servers exist upstream, all writes still funnel through one serialized point, capping total throughput.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q10", question: "How does queueing affect the relationship between throughput and latency?", answer: "As a system approaches its maximum throughput, queue lengths grow, and requests wait longer before being processed — latency rises sharply as utilization nears capacity, well before throughput actually saturates.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "th-q11", question: "What's the difference between average throughput and peak throughput, and why does it matter?", answer: "Average throughput is total volume over a long period; peak throughput is the maximum rate during busy periods — capacity must be provisioned for peak, not average, or the system fails exactly when it matters most.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q12", question: "How does batching improve throughput?", answer: "Processing many items together amortizes fixed per-operation overhead (connection setup, disk seeks) across the batch, letting the system complete more total work per unit time, at the cost of each item's individual latency.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "th-q13", question: "Why is throughput usually the metric behind capacity estimation math in interviews?", answer: "Capacity planning is fundamentally \"how many operations per second must this system sustain\" — which is a throughput question, driving how many servers/shards/replicas are needed.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q14", question: "What happens to throughput as a system approaches its saturation point?", answer: "Throughput plateaus (it can't exceed the system's maximum processing rate) while latency increases sharply due to queueing — pushing more load past this point doesn't raise throughput, it just makes everything slower.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "th-q15", question: "How does horizontal scaling affect throughput?", answer: "It directly increases throughput by adding more capacity to process requests in parallel — this is the primary lever for throughput improvement in most system designs.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "th-q16", question: "What's an example of a system correctly optimized for throughput over latency?", answer: "A log/analytics ingestion pipeline — it's fine for an individual event to take a few seconds to be processed, as long as the system can sustain very high total event volume.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-q17", question: "Why should throughput requirements be gathered as part of non-functional requirements?", answer: "Because they're a 'how well' concern (system capacity), not a 'what it does' concern — and they directly drive architecture and capacity planning decisions.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "th-q18", question: "What's a common mistake when discussing throughput in an interview?", answer: "Stating a throughput target with no latency bound attached, or without justifying it against actual estimated scale rather than a round, unexamined number.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "th-q19", question: "How does connection pooling relate to throughput?", answer: "It reduces the fixed overhead of establishing new connections per request, allowing more actual work to be done per unit time — a throughput optimization at the infrastructure level.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "th-q20", question: "Summarize throughput vs. latency in one sentence.", answer: "Throughput is how much total work a system completes per unit time; latency is how long any single unit of that work takes.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What throughput does this design need to sustain, and at what latency?\"",
    "\"What's the actual bottleneck limiting throughput here?\"",
    "\"How would you scale this to handle 10x the throughput?\"",
  ],

  commonMistakes: [
    "Using \"throughput\" and \"latency\" interchangeably.",
    "Stating a throughput number with no attached latency bound.",
    "Assuming more parallel workers automatically improves latency too.",
    "Sizing capacity for average throughput instead of peak throughput.",
  ],

  interviewTraps: [
    "\"How would you make this faster?\" is ambiguous on purpose — a strong answer clarifies whether \"faster\" means lower latency per request or higher overall throughput, since the fixes differ.",
    "Being asked to add more servers to \"speed things up\" when the real bottleneck is a single serialized resource (like one database) is a trap — that only helps throughput up to the point the serialized resource becomes the ceiling.",
  ],

  tradeoffs: [
    "Batching improves throughput but increases per-item latency.",
    "More parallelism improves throughput but can increase contention (and therefore latency) on shared resources.",
    "Optimizing purely for throughput can produce a system that technically handles huge volume but delivers a poor per-request experience.",
  ],

  comparisonTable: {
    title: "Throughput vs Latency",
    columns: ["Throughput", "Latency"],
    rows: [
      { label: "Measures", values: ["Total operations per unit time", "Time for one operation"] },
      { label: "Unit", values: ["Requests/sec (RPS), QPS", "Milliseconds"] },
      { label: "Improved by", values: ["Parallelism, more workers/machines", "Faster individual processing, caching, less hops"] },
      { label: "Analogy", values: ["Cars/minute through a toll plaza", "Time for one car through one booth"] },
      { label: "Typical report style", values: ["\"5,000 QPS\"", "\"p99 < 200ms\""] },
    ],
  },

  decisionGuide: undefined,

  memoryTrick:
    "\"Throughput = total, Latency = individual.\" Throughput is the toll plaza's cars-per-minute; latency is one car's time through one booth. Little's Law ties them: concurrency = throughput × latency.",

  realWorldExamples: [
    "A batch analytics pipeline is deliberately optimized for throughput (process billions of events/day) at the cost of per-event latency (an event might not be queryable for minutes) — the right trade-off for that use case.",
    "A real-time chat system is optimized the opposite way: latency (message delivery in milliseconds) matters far more than raw throughput, since message volume per user is comparatively low.",
  ],

  mermaidDiagram: `flowchart LR
    subgraph Throughput["Throughput: cars/minute"]
    C1[Car] --> B1[Booth 1]
    C2[Car] --> B2[Booth 2]
    C3[Car] --> B3[Booth 3]
    end
    B1 --> Out[Out]
    B2 --> Out
    B3 --> Out`,

  flashcards: [
    { id: "th-fc1", front: "Throughput — one-line definition", back: "The number of operations a system completes per unit of time (e.g. requests/sec).", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "th-fc2", front: "Throughput vs. latency, in one line", back: "Throughput = total work per unit time. Latency = time for one operation.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "th-fc3", front: "Main lever for improving throughput", back: "Parallelism — more workers, machines, or concurrent connections.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "th-fc4", front: "Little's Law", back: "Concurrency = throughput × latency (L = λW).", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "th-fc5", front: "Why is a throughput number alone insufficient?", back: "It needs a latency bound attached (e.g. \"5,000 QPS at p99 < 200ms\") to be meaningful.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Throughput",
    sections: [
      { heading: "Definition", items: ["Operations completed per unit time", "Measured in RPS / QPS"] },
      { heading: "Improve via", items: ["Horizontal scaling", "More parallelism/workers", "Batching (trades off latency)", "Connection pooling"] },
      { heading: "Remember", items: ["Always pair with a latency bound", "Size for peak, not average", "Little's Law: concurrency = throughput × latency"] },
    ],
  },

  speedNotes: [
    "Throughput = operations/time (RPS, QPS). Latency = time per operation.",
    "Improve throughput via parallelism, not faster individual ops.",
    "Throughput number is meaningless without a latency bound.",
    "Little's Law: concurrency = throughput × latency.",
    "Size capacity for peak throughput, not average.",
  ],
};
