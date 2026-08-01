import type { ConceptRevisionContent } from "./types";

export const writeBackCache: ConceptRevisionContent = {
  slug: "write-back-cache",
  title: "Write-Back Cache",
  topic: "Caching",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Caching Strategies", href: "/docs/caching/caching-strategies" },
    { label: "Cache Invalidation", href: "/docs/caching/cache-invalidation" },
  ],

  summary: [
    "Write-back (also called write-behind) caching updates the cache immediately on a write and acknowledges to the caller, then asynchronously persists the data to the database later.",
    "The caller gets very low write latency because the write only needs to complete in memory — no synchronous database round-trip.",
    "The database is updated in batches or after a configurable delay, which can also improve database write throughput through batching.",
    "The critical risk is data loss: if the cache node crashes before the pending writes are flushed to the database, those writes are permanently lost.",
    "This pattern is common in CPU caches (L1/L2 write-back mode), write-behind queues in ORMs, and messaging systems that buffer writes before persistence.",
    "Suitable for high-throughput write scenarios where some data loss is acceptable (e.g. analytics counters, activity logs) but dangerous for transactional data.",
    "Distinguishing write-back from write-through is a common interview question — the difference is purely about when the database gets updated.",
  ],

  whyAsked: [
    "Tests whether you understand the durability vs. write latency trade-off — the most important trade-off in storage system design.",
    "Checks if you can identify when data loss is acceptable vs. unacceptable in a given scenario.",
    "Leads directly to questions about crash recovery, WAL (write-ahead logging), and how to reduce the data loss window.",
    "Frequently used to distinguish candidates who understand production failure modes from those who only think about the happy path.",
  ],

  thirtySecondAnswer:
    "Write-back caching (also called write-behind) acknowledges a write to the caller immediately after updating the cache, then asynchronously flushes the data to the database later. This gives significantly lower write latency since no synchronous database round-trip is needed, and can improve database write throughput through batching. The critical trade-off is durability: if the cache crashes before the pending writes are flushed, those writes are permanently lost. Write-back is appropriate for high-throughput, write-heavy workloads where some data loss is acceptable — such as analytics counters or activity logs — but is dangerous for any transactional data where every write must be durable.",

  detailedAnswer: [
    "Write updates cache immediately, acknowledges to caller — no synchronous DB write, so write latency is very low.",
    "DB is updated asynchronously in batches or after a delay — multiple writes to the same key can be coalesced into a single DB write.",
    "Data loss risk: writes in the cache that haven't been flushed to DB are lost if the cache crashes.",
    "Mitigation: write-ahead log (WAL) or replication within the cache layer to reduce the loss window.",
    "Best fit: write-heavy workloads where some loss is acceptable (analytics, counters, logs) — wrong for transactional data.",
    "Write-behind queues in ORMs implement this pattern — writes are buffered and flushed periodically.",
  ],

  questions: [
    { id: "wbc-q1", question: "What is write-back (write-behind) caching?", answer: "A strategy that acknowledges a write immediately after updating the cache, then asynchronously flushes the data to the database later.", topic: "Caching", difficulty: "Beginner" },
    { id: "wbc-q2", question: "What is the main advantage of write-back over write-through?", answer: "Lower write latency — the write only needs to complete in fast memory (cache), with no synchronous database round-trip.", topic: "Caching", difficulty: "Beginner" },
    { id: "wbc-q3", question: "What is the critical risk of write-back caching?", answer: "Data loss — if the cache node crashes before pending writes are flushed to the database, those writes are permanently lost.", topic: "Caching", difficulty: "Beginner" },
    { id: "wbc-q4", question: "How does write-back improve database write throughput?", answer: "Multiple writes to the same key can be coalesced into a single DB write, and writes are batched, reducing the total number of database round-trips.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-q5", question: "What types of workloads are appropriate for write-back caching?", answer: "High-throughput, write-heavy workloads where some data loss is acceptable — analytics counters, activity logs, real-time metrics, or non-critical user preferences.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-q6", question: "What types of workloads are NOT appropriate for write-back caching?", answer: "Any transactional data where every write must be durable — financial transactions, inventory updates, or user account changes.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-q7", question: "How can you reduce the data loss window in write-back caching?", answer: "Use a write-ahead log (WAL) on the cache layer, replicate the cache across multiple nodes, or reduce the flush interval to minimize the amount of unwritten data at risk.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q8", question: "How does write-back differ from write-through?", answer: "Write-through updates both cache and DB synchronously — no data loss risk, higher write latency. Write-back updates only the cache synchronously, DB asynchronously — low write latency, but data loss risk.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-q9", question: "Is write-back consistent with the CAP theorem's 'C' (consistency)?", answer: "Not immediately — there's a window where the cache has the latest value but the DB has a stale value, violating strong consistency. It's an eventually consistent pattern.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q10", question: "What happens to write-back writes if the cache is full and needs to evict a dirty entry?", answer: "A dirty entry (written to cache but not yet to DB) must be flushed to the DB before it can be evicted — otherwise, the data is lost.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q11", question: "In a CPU context, what is write-back mode?", answer: "The CPU writes to cache only; the main memory is updated only when the cache line is evicted ('dirty eviction'). Faster than write-through but requires cache coherence protocols in multi-core systems.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-q12", question: "What is 'write coalescing' and how does it benefit write-back?", answer: "Multiple writes to the same key within the flush window are merged into a single DB write — if a value is written 100 times between flushes, only 1 DB write is needed, drastically reducing DB load.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q13", question: "What is the difference between 'dirty' and 'clean' entries in a write-back cache?", answer: "A dirty entry has been updated in cache but not yet flushed to the DB. A clean entry is in sync with the DB. Only dirty entries pose a data loss risk.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-q14", question: "How do write-back and write-ahead logging (WAL) relate?", answer: "WAL can be added to a write-back cache to log writes durably before applying them, reducing data loss risk — if the cache crashes, the WAL can be replayed to recover unwritten data.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q15", question: "What database feature is conceptually similar to write-back caching?", answer: "Buffer pool in databases like MySQL/PostgreSQL — writes are made to in-memory buffer pages (dirty pages) and flushed to disk asynchronously by the background writer process.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q16", question: "Can write-back be combined with read-through?", answer: "Yes — reads come from the cache (read-through on miss), writes update the cache immediately (write-back), and the DB is updated asynchronously. Gives the lowest overall latency but highest data loss risk.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q17", question: "What's a real-world example of write-back caching being catastrophic?", answer: "A payment system using write-back: a payment is processed (cache updated, acknowledged to user), but the cache crashes before flushing to DB — the payment is lost but the user was told it succeeded.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-q18", question: "How does Redis implement write-back-style persistence?", answer: "Redis uses AOF (Append-Only File) with configurable fsync intervals — 'every second' mode is write-back-like, acknowledging writes immediately and flushing to disk once per second, risking at most 1 second of writes on crash.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q19", question: "What metric determines how much data you risk losing in write-back?", answer: "The flush interval (or 'dirty write window') — data written to cache but not yet to DB within that window is at risk. Shorter intervals reduce risk but increase DB write load.", topic: "Caching", difficulty: "Advanced" },
    { id: "wbc-q20", question: "Why might write-back be chosen over write-through for an e-commerce recommendation counter?", answer: "Recommendations are written very frequently (every page view) and losing a few counts is acceptable — write-back's lower write latency and batching benefit far outweigh the risk of losing a small count on a crash.", topic: "Caching", difficulty: "Intermediate" },
  ],

  commonFollowUps: [
    "\"How would you reduce the data loss window in a write-back system?\"",
    "\"How does Redis AOF fsync configuration relate to write-back trade-offs?\"",
    "\"What's the maximum acceptable data loss for this system?\" (drives the flush interval decision)",
    "\"How would you handle dirty evictions in a write-back cache under memory pressure?\"",
  ],

  commonMistakes: [
    "Recommending write-back for transactional data (payments, inventory) where data loss is unacceptable.",
    "Not mentioning the dirty entry eviction problem — what happens when a dirty entry must be evicted before it's flushed.",
    "Treating write-back and write-through as equivalent just because both update the cache on write.",
  ],

  interviewTraps: [
    "\"Write-back is just like write-through but faster\" — The durability difference is fundamental, not a minor detail. Write-back trades durability for speed, which is a major design decision.",
    "\"Write-back is always better for performance\" — Only for write-heavy workloads; for read-heavy workloads the performance difference is negligible and you're adding data loss risk for nothing.",
    "\"You can make write-back safe with replication\" — Replication of the cache reduces the window but doesn't eliminate it — a simultaneous multi-node failure can still lose data.",
  ],

  tradeoffs: [
    "Low write latency vs. data loss risk — the more time between flushes, the faster the writes but the more data at risk.",
    "Write coalescing (DB efficiency) vs. consistency — coalesced writes mean the DB may be significantly behind the cache.",
    "High throughput vs. complexity — dirty entry tracking, WAL, eviction of dirty entries all add operational complexity.",
  ],

  memoryTrick:
    "Write-Back = 'Write now, Back-fill the DB later' — fast acknowledgment to the caller, asynchronous persistence to storage.",

  realWorldExamples: [
    "Redis AOF with 'everysec' fsync: Redis acknowledges writes immediately and flushes to the append-only log every second — a write-back trade-off that risks at most 1 second of writes on a crash.",
    "CPU L1/L2 cache write-back mode: the CPU core writes to cache only; main memory is updated when the cache line is evicted, enabling fast CPU execution at the cost of needing coherence protocols in multi-core systems.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant App
    participant Cache as Write-Back Cache
    participant DB as Database

    App->>Cache: Write(key, value)
    Cache->>Cache: Mark entry as "dirty"
    Cache-->>App: Ack immediately ✓

    Note over Cache,DB: ...async flush (after interval or eviction)...

    Cache->>DB: Flush dirty entries to DB
    DB-->>Cache: Ack
    Cache->>Cache: Mark entries as "clean"`,

  flashcards: [
    { id: "wbc-fc1", front: "Write-Back Cache — one-line definition", back: "Writes update the cache immediately and acknowledge to the caller; the database is updated asynchronously later.", topic: "Caching", difficulty: "Beginner" },
    { id: "wbc-fc2", front: "What is the critical risk of write-back?", back: "Data loss — writes in cache not yet flushed to DB are lost if the cache crashes.", topic: "Caching", difficulty: "Beginner" },
    { id: "wbc-fc3", front: "Write-Back vs Write-Through: key difference?", back: "Write-through: DB updated synchronously (no data loss). Write-back: DB updated asynchronously (data loss risk, lower latency).", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-fc4", front: "What is write coalescing?", back: "Multiple writes to the same key within the flush window merged into one DB write — reduces DB write load dramatically.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wbc-fc5", front: "When is write-back appropriate?", back: "High-throughput write workloads where some data loss is acceptable — analytics counters, activity logs, non-critical metrics.", topic: "Caching", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Write-Back Cache",
    sections: [
      { heading: "How it works", items: ["Write → cache immediately, DB later (async)", "Entry marked 'dirty' until flushed", "Flush triggered by interval or eviction"] },
      { heading: "Advantages", items: ["Very low write latency", "Write coalescing reduces DB load", "High write throughput"] },
      { heading: "Disadvantages", items: ["Data loss on cache crash (dirty entries lost)", "Consistency gap between cache and DB", "Complex dirty eviction handling"] },
      { heading: "Choose when", items: ["Write-heavy, latency-sensitive workloads", "Some data loss acceptable (counters, logs)", "NOT for financial/transactional data"] },
    ],
  },

  speedNotes: [
    "Write: cache immediately, DB asynchronously → lowest latency.",
    "Risk: dirty entries lost if cache crashes before flush.",
    "Benefit: write coalescing — many writes, fewer DB round-trips.",
    "Mitigation: shorter flush interval, WAL, multi-node replication.",
    "Never for transactional/financial data where loss is unacceptable.",
  ],
};
