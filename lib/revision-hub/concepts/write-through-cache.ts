import type { ConceptRevisionContent } from "./types";

export const writeThroughCache: ConceptRevisionContent = {
  slug: "write-through-cache",
  title: "Write-Through Cache",
  topic: "Caching",
  difficulty: "Intermediate",
  estimatedMinutes: 8,

  docLinks: [
    { label: "Caching Strategies", href: "/docs/caching/caching-strategies" },
    { label: "Cache Invalidation", href: "/docs/caching/cache-invalidation" },
  ],

  summary: [
    "In write-through caching, every write goes to the cache and the database simultaneously, in the same synchronous operation.",
    "The write is only acknowledged to the caller after both the cache and the database have successfully been updated.",
    "The primary benefit is strong read-after-write consistency: a read immediately following a write will always get the updated value from the cache.",
    "The downside is write latency — every write now includes the overhead of two storage operations instead of one.",
    "Write-through pairs naturally with read-through: reads from cache, writes to both, ensuring the cache is always a consistent view of the database.",
    "A subtle cost is write amplification for data that's written frequently but rarely read — you pay the double-write cost without ever getting a cache hit benefit.",
    "It also pre-warms the cache on write, solving the cold-start problem for written data.",
  ],

  whyAsked: [
    "Tests whether you know the trade-off between write latency (the cost) and read-after-write consistency (the benefit).",
    "Distinguishes from write-back (async, lower latency, durability risk) and write-around (bypasses cache).",
    "Checks if you can identify write amplification as a hidden cost for write-heavy, read-light workloads.",
    "Often asked as part of a broader 'which caching strategy would you use here?' system design question.",
  ],

  thirtySecondAnswer:
    "In write-through caching, every write operation updates both the cache and the database synchronously before the write is acknowledged to the caller. This guarantees read-after-write consistency — any read immediately after a write will get the correct value from the cache. The trade-off is increased write latency, since the write now must complete in two places instead of one. Write-through pairs naturally with read-through as a complete strategy: reads always come from the cache, writes always go to both cache and DB. The hidden cost is write amplification: for data that is written frequently but read rarely, you pay double-write overhead every time without ever getting a cache hit.",

  detailedAnswer: [
    "Every write synchronously updates cache and DB before acknowledging to the caller — no window where cache and DB diverge.",
    "Guarantees read-after-write consistency: immediate reads after a write always see the updated value.",
    "Write latency is higher than write-around or write-back since two storage operations must complete.",
    "Solves the cold-start problem for written data — newly written keys are immediately cached.",
    "Write amplification: data that's written often but rarely read pays the double-write cost without the cache hit benefit.",
    "Natural complement to read-through: together they form a fully managed, consistent read+write caching strategy.",
  ],

  questions: [
    { id: "wtc-q1", question: "What is write-through caching?", answer: "A strategy where every write updates both the cache and the database synchronously before acknowledging to the caller.", topic: "Caching", difficulty: "Beginner" },
    { id: "wtc-q2", question: "What consistency guarantee does write-through provide?", answer: "Read-after-write consistency — a read immediately following a write always gets the updated value from the cache.", topic: "Caching", difficulty: "Beginner" },
    { id: "wtc-q3", question: "What is the main cost of write-through compared to writing directly to the database?", answer: "Higher write latency, since the write must complete in two places (cache and DB) before it's acknowledged.", topic: "Caching", difficulty: "Beginner" },
    { id: "wtc-q4", question: "How does write-through solve the cold-start problem?", answer: "Newly written keys are immediately stored in the cache during the write operation, so reads for recently-written data always hit the cache.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q5", question: "What is write amplification in write-through caching?", answer: "For data that is written frequently but rarely read, you pay the double-write cost (cache + DB) on every write without ever benefiting from a cache hit.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q6", question: "How does write-through differ from write-back?", answer: "Write-through updates both cache and DB synchronously on every write. Write-back (write-behind) updates the cache immediately and writes to DB asynchronously later, reducing write latency but risking data loss.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q7", question: "How does write-through differ from write-around?", answer: "Write-through updates the cache on writes; write-around bypasses the cache entirely on writes and only writes to the DB, leaving the cache to be populated on subsequent reads.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q8", question: "What caching read strategy naturally complements write-through?", answer: "Read-through — together they ensure reads always come from the cache and writes always keep cache and DB in sync.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q9", question: "When is write-through a poor choice?", answer: "Write-heavy workloads where data is written far more often than it's read, because you incur the double-write cost on every write with few or no cache hit benefits.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q10", question: "What happens to cache consistency in write-through if the DB write fails after the cache was updated?", answer: "The cache and DB are inconsistent — the cache has new data but the DB has the old data. Proper write-through implementations should treat the write as failed and rollback or invalidate the cache entry.", topic: "Caching", difficulty: "Advanced" },
    { id: "wtc-q11", question: "What if the cache write fails in write-through but the DB write succeeds?", answer: "The cache has stale (old) data while the DB has the new data. The next read will serve the old cached value until the TTL expires or the key is invalidated.", topic: "Caching", difficulty: "Advanced" },
    { id: "wtc-q12", question: "Does write-through caching eliminate the need for cache invalidation?", answer: "Not entirely — it handles writes that go through the application, but external DB updates (batch jobs, migrations) still bypass the cache and can cause staleness.", topic: "Caching", difficulty: "Advanced" },
    { id: "wtc-q13", question: "Is write-through suitable for a social media feed where posts are written once and read many times?", answer: "Yes — the write amplification cost is low (one write per post) and the read benefit is high (many reads from cache per post).", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q14", question: "Is write-through suitable for a metrics ingestion system with millions of data points per second?", answer: "No — the write amplification cost would be enormous (every metric update double-written), and metrics may not even benefit much from read caching.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q15", question: "How does write-through affect P99 write latency?", answer: "Increases it — every write has a higher minimum latency floor (must complete two storage operations), which affects tail latencies especially under load.", topic: "Caching", difficulty: "Advanced" },
    { id: "wtc-q16", question: "Can write-through and write-back be combined?", answer: "Not directly for the same key — but a system could use write-through for critical/durable data and write-back for less critical or high-throughput data.", topic: "Caching", difficulty: "Advanced" },
    { id: "wtc-q17", question: "Does write-through cache pre-warm itself?", answer: "Yes — every write operation also populates the cache, so recently written data is always available in cache without a cold miss on the first read.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q18", question: "What does write-through have in common with write-back?", answer: "Both update the cache on every write, meaning subsequent reads for written data hit the cache. The difference is when the DB is updated — immediately (write-through) vs. asynchronously (write-back).", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q19", question: "What real-world service uses write-through caching?", answer: "AWS DAX (DynamoDB Accelerator) supports write-through mode — writes to DAX are synchronously propagated to DynamoDB before acknowledgment.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-q20", question: "In an interview, when would you recommend write-through over write-back?", answer: "When data durability and read-after-write consistency are the priority — you can't afford to lose writes that haven't made it to the DB yet, even at the cost of higher write latency.", topic: "Caching", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"What happens if the database is temporarily unavailable during a write-through write?\"",
    "\"How does write-through affect write throughput at scale?\"",
    "\"Would you use write-through or write-back for a banking ledger? Why?\"",
    "\"How does write-through interact with TTL and cache eviction?\"",
  ],

  commonMistakes: [
    "Recommending write-through for write-heavy, read-light workloads, ignoring write amplification.",
    "Assuming write-through eliminates all cache consistency issues — external DB updates still bypass the cache.",
    "Not considering the atomicity problem: what to do if the cache write succeeds but the DB write fails.",
  ],

  interviewTraps: [
    "\"Write-through means no staleness ever\" — Not true for writes that bypass the application (batch jobs, migrations, direct DB updates).",
    "\"Write-through is always safer than write-back\" — Safer for durability, but not always the right trade-off; depends on whether write latency matters more than consistency.",
  ],

  tradeoffs: [
    "Strong read-after-write consistency vs. higher write latency (two storage operations per write).",
    "Self-warming cache on writes vs. write amplification for write-heavy, read-light data.",
    "Simplicity of a consistent cache state vs. complexity of handling partial failure (cache update succeeds, DB update fails).",
  ],

  comparisonTable: {
    title: "Write-Through vs Write-Back vs Write-Around",
    columns: ["Aspect", "Write-Through", "Write-Back", "Write-Around"],
    rows: [
      { label: "When DB is updated", values: ["Immediately (sync)", "Asynchronously (later)", "Immediately (sync)"] },
      { label: "Cache updated on write?", values: ["Yes", "Yes", "No"] },
      { label: "Write latency", values: ["Higher", "Lower", "Same as direct DB"] },
      { label: "Data loss risk", values: ["None", "Yes (on cache crash)", "None"] },
      { label: "Read-after-write consistency", values: ["Strong", "Strong (from cache)", "No (must read from DB first)"] },
      { label: "Best for", values: ["Read-heavy, critical data", "Write-heavy, can tolerate loss", "Write-heavy, rarely re-read"] },
    ],
  },

  memoryTrick:
    "Write-Through = 'Write all the way Through' — the write goes through the cache AND through to the database in one shot, both updated together.",

  realWorldExamples: [
    "AWS DynamoDB Accelerator (DAX) in write-through mode: applications write to DAX, which synchronously updates DynamoDB before acknowledging — useful for user profile data that's written once and read many times.",
    "CPU L1/L2 cache in write-through mode (as opposed to write-back): every cache write immediately updates main memory, ensuring no data is lost if the CPU cache is invalidated.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant App
    participant Cache as Cache
    participant DB as Database

    App->>Cache: Write(key, value)
    Cache->>DB: Write(key, value)
    DB-->>Cache: Ack
    Cache-->>App: Ack (both written)

    App->>Cache: Read(key)
    Cache-->>App: Return value (cache hit — always fresh)`,

  flashcards: [
    { id: "wtc-fc1", front: "Write-Through Cache — one-line definition", back: "Every write updates both the cache and the database synchronously before being acknowledged — cache and DB are always in sync.", topic: "Caching", difficulty: "Beginner" },
    { id: "wtc-fc2", front: "What consistency does write-through guarantee?", back: "Read-after-write consistency — a read immediately after a write always sees the updated value.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-fc3", front: "What is write amplification in write-through?", back: "For data written often but read rarely, you pay the double-write cost every time with no cache hit benefit.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-fc4", front: "Write-Through vs Write-Back: key difference?", back: "Write-Through: DB updated synchronously. Write-Back: DB updated asynchronously. Write-back is faster but risks data loss.", topic: "Caching", difficulty: "Intermediate" },
    { id: "wtc-fc5", front: "When would you choose write-through over write-back?", back: "When data durability matters most — you can't afford to lose writes that haven't been persisted to the DB.", topic: "Caching", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Write-Through Cache",
    sections: [
      { heading: "How it works", items: ["Write goes to cache AND DB synchronously", "Both must succeed before ack", "Read always gets fresh value from cache"] },
      { heading: "Advantages", items: ["Read-after-write consistency", "Self-warming: written data cached immediately", "No durability risk vs write-back"] },
      { heading: "Disadvantages", items: ["Higher write latency (two writes per operation)", "Write amplification for write-heavy, read-light data", "Partial failure complexity (cache vs DB)"] },
      { heading: "Choose when", items: ["Data is read much more often than written", "Read-after-write consistency is required", "Durability matters (vs write-back)"] },
    ],
  },

  speedNotes: [
    "Every write: cache + DB updated synchronously, both acknowledged.",
    "Benefit: read-after-write always consistent.",
    "Cost: higher write latency (two storage ops).",
    "Watch: write amplification for write-heavy, rarely-read data.",
    "Natural pair: combine with read-through for full coverage.",
  ],
};
