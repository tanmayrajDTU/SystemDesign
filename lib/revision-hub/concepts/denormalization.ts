import type { ConceptRevisionContent } from "./types";

export const denormalization: ConceptRevisionContent = {
  slug: "denormalization",
  title: "Denormalization",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Denormalization", href: "/docs/databases/denormalization" },
    { label: "Normalization", href: "/docs/databases/normalization" },
    { label: "CQRS", href: "/docs/messaging/cqrs" },
  ],

  summary: [
    "Denormalization is the deliberate practice of introducing redundant data — duplicating information across tables, or combining tables that would normally be separate — to make reads faster.",
    "It's the mirror image of normalization: it directly trades away some of normalization's write-safety and consistency guarantees for meaningfully faster, simpler reads.",
    "Worthwhile specifically when a system is heavily read-dominant and the redundant data's actual rate of change is manageable enough that keeping copies in sync isn't a constant burden.",
    "The central challenge is keeping duplicated data consistent whenever the source of truth changes — via synchronous application updates, database triggers, or asynchronous background jobs.",
    "It reintroduces the exact update-anomaly risk normalization was designed to prevent, so it should be scoped deliberately to specific, measured read bottlenecks rather than applied broadly.",
    "A common production pattern is CQRS: maintaining a normalized write model and one or more denormalized, read-optimized models kept up to date asynchronously from the same underlying events.",
  ],

  whyAsked: [
    "It tests whether you can reason about the normalization trade-off in both directions — recognizing when giving up write safety for read speed is actually the right call.",
    "\"How do you keep denormalized copies in sync?\" is a favorite follow-up, since it separates candidates who've only heard the term from those who understand the real operational cost.",
    "It connects naturally to caching and CQRS, testing whether you can place denormalization correctly among several related techniques for speeding up reads.",
  ],

  thirtySecondAnswer:
    "Denormalization is the deliberate practice of introducing redundant data — duplicating information across tables or combining what would normally be separate tables — specifically to make reads faster, directly trading away some of normalization's write-safety and integrity guarantees. It's worthwhile when a system is heavily read-dominant and the underlying data's actual rate of change is manageable enough that keeping duplicated copies in sync doesn't become a constant burden — for example, storing an author's name directly on every one of their posts so reading a post never needs a join, at the cost of needing to update every post row if that author's name changes. The central engineering challenge is keeping those duplicated copies consistent whenever the source of truth changes, typically handled through synchronous application-level updates, database triggers, or asynchronous background jobs depending on how strict the consistency requirement actually is. Because denormalization reintroduces the exact update-anomaly risk normalization was designed to eliminate, it should be scoped deliberately to specific, measured read bottlenecks — a common production pattern is CQRS, maintaining a normalized write model alongside one or more denormalized, read-optimized models kept up to date asynchronously from the same underlying events.",

  detailedAnswer: [
    "Core idea: deliberately duplicate data (or merge tables) so a common read becomes a single lookup instead of a multi-table join.",
    "Direct trade-off with normalization: gains read speed and simplicity, loses write safety — the same fact now lives in multiple places and must be kept in sync.",
    "Sync mechanisms: application-level updates (explicit, synchronous), database triggers (automatic, in-database), or async background jobs (eventual consistency, used when perfect real-time sync isn't required).",
    "Best scoped to specific, measured read paths — denormalizing a small number of well-understood hot queries (or one materialized view) is manageable; denormalizing broadly across an entire schema multiplies the surface area that must be kept in sync.",
    "Common production pattern: CQRS — a normalized write model plus one or more denormalized, read-optimized models updated asynchronously from the same underlying events.",
    "Caching is a related but distinct alternative: consider it when the goal is purely reducing repeated computation, versus denormalization's restructuring of the schema itself.",
  ],

  questions: [
    { id: "denorm-q1", question: "What is denormalization?", answer: "The deliberate practice of introducing redundant data — duplicating information or combining tables — to make reads faster, at the cost of normalization's write-safety benefits.", topic: "Databases", difficulty: "Beginner" },
    { id: "denorm-q2", question: "Why does denormalization exist as a deliberate technique?", answer: "A fully normalized schema can require many joins to reconstruct commonly needed views of data, and joins across large tables have a real performance cost — denormalization trades some write-safety for meaningfully faster, simpler reads.", topic: "Databases", difficulty: "Beginner" },
    { id: "denorm-q3", question: "Give a concrete example of denormalization.", answer: "Storing an author's name and follower count directly on every one of their post rows, so reading a post is a single-table lookup instead of a join against a separate authors table.", topic: "Databases", difficulty: "Beginner" },
    { id: "denorm-q4", question: "What's the cost of that example if the author's name changes?", answer: "Every post row containing that duplicated author name now needs to be updated to stay consistent — a cost that didn't exist in the normalized version.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-q5", question: "What are the three common ways to keep denormalized copies in sync with their source of truth?", answer: "Application-level updates (explicit, synchronous), database triggers (automatic, in-database), and asynchronous background jobs (eventual consistency).", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-q6", question: "What risk does denormalization reintroduce that normalization was designed to prevent?", answer: "Update anomalies — the same fact now exists in multiple places, and if not carefully kept in sync, the duplicated copies can silently drift and contradict each other.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-q7", question: "When is denormalization a clearly worthwhile trade?", answer: "For heavily read-dominant workloads where the same expensive join is executed extremely frequently, and the underlying data doesn't change often enough to make keeping copies in sync a significant burden.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-q8", question: "When is denormalization a poor trade?", answer: "For data that changes frequently, where keeping many denormalized copies in sync would itself become a significant, ongoing engineering and correctness burden.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-q9", question: "What's a common mistake teams make when denormalizing?", answer: "Denormalizing prematurely, before actually measuring that normalized joins are a real performance bottleneck — paying the sync-complexity cost without a proven need.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-q10", question: "What's the CQRS pattern, and how does it relate to denormalization?", answer: "CQRS separates a normalized write model from one or more denormalized, read-optimized models, updated asynchronously from the same underlying events — a common, structured way to apply denormalization at scale.", topic: "Databases", difficulty: "Advanced" },
    { id: "denorm-q11", question: "How would you decide between caching and denormalization to solve a slow read?", answer: "Caching reduces repeated computation/lookups without restructuring the schema, while denormalization actually changes the data model — caching is often a lighter-weight first step, with denormalization reserved for a structurally repeated join pattern.", topic: "Databases", difficulty: "Advanced" },
    { id: "denorm-q12", question: "Why is scoping denormalization to specific read paths safer than denormalizing an entire schema?", answer: "Broadly denormalizing significantly increases the surface area of 'things that must be kept in sync,' while scoping it to a small number of well-understood, measured hot paths keeps that sync burden manageable.", topic: "Databases", difficulty: "Advanced" },
    { id: "denorm-q13", question: "Give a real-world example where denormalization is commonly used.", answer: "A social media feed pre-computes and stores a denormalized 'feed item' containing post text, author name, and avatar URL together, rather than joining posts, authors, and profile-image tables on every feed render.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-q14", question: "What's a database trigger's role in keeping denormalized data in sync?", answer: "It automatically propagates a change to denormalized copies within the database itself whenever the source data changes, without requiring the application to remember to do it explicitly.", topic: "Databases", difficulty: "Advanced" },
    { id: "denorm-q15", question: "Why might an asynchronous background job be preferred over a synchronous update for keeping denormalized copies in sync?", answer: "When perfect real-time consistency across the copies isn't required, an async job can reconcile them without adding latency to the original write path, accepting a brief eventual-consistency window instead.", topic: "Databases", difficulty: "Advanced" },
    { id: "denorm-q16", question: "What's a materialized view, in the context of denormalization?", answer: "A precomputed, stored result of a query (often join-heavy) that's refreshed periodically or on change, giving fast reads of a denormalized view without the application managing the duplication logic itself.", topic: "Databases", difficulty: "Advanced" },
    { id: "denorm-q17", question: "Why do reporting/analytics systems often use denormalized (or star-schema) structures?", answer: "Their workload is read-dominant and often involves broad aggregation queries, where a flatter, denormalized structure avoids the join cost that a fully normalized transactional schema would impose on every report.", topic: "Databases", difficulty: "Advanced" },
    { id: "denorm-q18", question: "What's the storage cost of denormalization?", answer: "It increases storage usage, since the same data now exists redundantly in multiple places instead of being stored once.", topic: "Databases", difficulty: "Beginner" },
    { id: "denorm-q19", question: "How would you explain the relationship between normalization and denormalization to an interviewer?", answer: "They're mirror-image trade-offs on the same axis — normalization optimizes for write safety and integrity at some read cost, denormalization optimizes for read speed at some write-safety cost — real systems often use both, normalized as the source of truth and denormalized for specific read paths.", topic: "Databases", difficulty: "Advanced" },
    { id: "denorm-q20", question: "Summarize denormalization in one sentence.", answer: "The deliberate reintroduction of data redundancy to make specific, measured read paths faster, trading away some of normalization's write-safety and consistency guarantees in exchange.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"You have a normalized schema and a specific read query is too slow due to joins — how would you denormalize to address it, and what does that cost you?\"",
    "\"How would you keep a denormalized copy of data in sync with its source of truth?\"",
    "\"When would you choose caching instead of denormalization to solve a similar read-performance problem?\"",
  ],

  commonMistakes: [
    "Denormalizing prematurely, before actually measuring that normalized joins are a real performance bottleneck.",
    "Not building a reliable mechanism to keep denormalized copies in sync, leading to silently stale or contradictory data over time.",
    "Denormalizing broadly across an entire schema rather than scoping it to specific, measured read paths that actually benefit.",
    "Reaching for denormalization when caching alone would have solved the read-performance problem with less structural change.",
  ],

  interviewTraps: [
    "\"So denormalization is just bad database design?\" is testing whether you recognize it as a deliberate, legitimate trade-off for specific read-heavy needs, not a mistake.",
    "\"How do you keep two copies of the same data in sync?\" is testing whether you know concrete mechanisms (triggers, async jobs, application updates), not just that 'it needs to stay in sync.'",
  ],

  tradeoffs: [
    "Faster, simpler reads (often single-table lookups) vs. the ongoing burden of keeping duplicated data in sync with its source of truth.",
    "Worthwhile for read-dominant workloads with a manageable rate of change; a poor trade for write-heavy or frequently-changing data.",
    "Scoping to specific, measured hot paths keeps the sync burden manageable; broad denormalization multiplies the surface area that can drift.",
  ],

  comparisonTable: {
    title: "Denormalization vs Normalization",
    columns: ["Denormalization", "Normalization"],
    rows: [
      { label: "Goal", values: ["Speed up reads", "Eliminate redundancy, prevent anomalies"] },
      { label: "Data redundancy", values: ["Deliberately reintroduced", "Minimized"] },
      { label: "Read complexity", values: ["Fewer joins, often single-table", "More joins needed"] },
      { label: "Write complexity", values: ["Must sync all duplicated copies", "Simple — update one row"] },
      { label: "Best fit", values: ["Read-heavy workloads, analytics, reporting", "Transactional, write-heavy, correctness-critical data"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "denorm-root",
    question: "Is a specific, measured join-heavy query a real bottleneck, and does the underlying data change infrequently enough to keep copies in sync?",
    options: [
      {
        label: "Yes to both — measured bottleneck, manageable change rate",
        next: {
          kind: "result",
          id: "denorm-pick",
          result: "Denormalize that specific read path.",
          rationale: "The read-speed gain is worth the sync burden precisely because the change rate is low enough to keep duplicated copies consistent without much ongoing effort.",
        },
      },
      {
        label: "No — not yet measured, or the data changes frequently",
        next: {
          kind: "result",
          id: "denorm-normalized",
          result: "Keep the schema normalized; consider caching instead.",
          rationale: "Denormalizing without a measured bottleneck, or against fast-changing data, trades away write safety for a benefit that isn't proven or won't hold up under frequent updates.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Print the name on every page.\" Denormalization is choosing to repeat a fact everywhere it's needed so you never have to flip back to look it up — as long as that fact doesn't change too often.",

  realWorldExamples: [
    "A social media feed pre-computes a denormalized 'feed item' containing post text, author name, and avatar URL together, avoiding a join across posts, authors, and profile-image tables on every render.",
    "Many large-scale systems maintain deliberately denormalized read models via the CQRS pattern, separating a normalized write model from one or more read-optimized models updated asynchronously from the same events.",
  ],

  mermaidDiagram: `flowchart LR
    A["Author updates their name"] --> B{"How do denormalized copies get updated?"}
    B --> C["Synchronously in the same transaction"]
    B --> D["Async background job (eventual consistency)"]`,

  flashcards: [
    { id: "denorm-fc1", front: "Denormalization — one-line definition", back: "Deliberately introducing redundant data to make reads faster, trading away normalization's write-safety.", topic: "Databases", difficulty: "Beginner" },
    { id: "denorm-fc2", front: "Three ways to keep denormalized copies in sync", back: "Application-level updates, database triggers, asynchronous background jobs.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-fc3", front: "When is denormalization a good trade?", back: "Read-dominant workloads where the underlying data changes infrequently enough to keep copies in sync without much burden.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-fc4", front: "What risk does denormalization reintroduce?", back: "Update anomalies — duplicated copies can silently drift out of sync if not carefully maintained.", topic: "Databases", difficulty: "Intermediate" },
    { id: "denorm-fc5", front: "CQRS and denormalization", back: "CQRS pairs a normalized write model with one or more denormalized, read-optimized models updated asynchronously from the same events.", topic: "Databases", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Denormalization",
    sections: [
      { heading: "Core idea", items: ["Duplicate data / merge tables deliberately", "Goal: fewer joins, faster reads", "Mirror image of normalization"] },
      { heading: "Sync mechanisms", items: ["Application-level updates (sync)", "Database triggers (automatic)", "Async background jobs (eventual)"] },
      { heading: "When worth it", items: ["Read-dominant workload", "Measured, real join bottleneck", "Manageable rate of change"] },
      { heading: "Watch for", items: ["Premature denormalization (no measured need)", "Broad denormalization (large sync surface)", "Consider caching as a lighter alternative"] },
    ],
  },

  speedNotes: [
    "Denormalization = deliberate redundancy for faster reads.",
    "Mirror image of normalization — trades write safety for read speed.",
    "Sync via app updates, DB triggers, or async jobs.",
    "Scope to measured, specific read bottlenecks — not the whole schema.",
    "CQRS: normalized write model + denormalized read model(s).",
  ],
};
