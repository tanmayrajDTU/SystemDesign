import type { ConceptRevisionContent } from "./types";

export const cacheAsidePattern: ConceptRevisionContent = {
  slug: "cache-aside-pattern",
  title: "Cache-Aside Pattern",
  topic: "Caching",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Caching Strategies", href: "/docs/caching/caching-strategies" },
    { label: "Cache Invalidation", href: "/docs/caching/cache-invalidation" },
    { label: "TTL", href: "/docs/caching/ttl" },
  ],

  summary: [
    "Cache-aside (lazy loading) is a strategy where the application, not the cache, owns the read/write logic.",
    "On a read: check the cache first; on a hit, return it; on a miss, query the database, return the result, and populate the cache.",
    "On a write: update the database, then delete (not overwrite) the cache key, forcing the next read to repopulate it from the source of truth.",
    "It's the default, simplest caching strategy — the cache only ever holds data that's actually been requested.",
    "The main cost is a cache-miss penalty on the first request for any key, and a window of possible staleness until TTL expiry or invalidation.",
    "It's resilient to cache failure: if the cache is down, the app can always fall back to the database directly.",
    "Deleting on write (rather than updating the cache directly) avoids a race where a slow write could overwrite a newer concurrent value.",
  ],

  whyAsked: [
    "It's the caching strategy used in the overwhelming majority of real systems, so interviewers expect fluency here specifically.",
    "Tests whether you know why deleting the cache key on write is safer than overwriting it — a subtle but common correctness bug.",
    "A good lens for probing failure-mode thinking: what happens on a cache miss, on a cache-cluster restart, or a cache stampede.",
    "Sets up comparison questions against write-through/write-back — interviewers want to see you reason about the trade-off, not just recite the mechanics.",
  ],

  thirtySecondAnswer:
    "Cache-aside, also called lazy loading, is the caching strategy where the application itself owns the logic instead of a transparent cache layer. On a read, the app checks the cache first; on a hit it returns immediately, and on a miss it queries the database, returns the result to the caller, and populates the cache with a TTL for next time. On a write, the app updates the database and then deletes the corresponding cache key — rather than overwriting it — so the next read is forced to repopulate the cache from the current source of truth, avoiding a race where a slow write could clobber a newer value written by a concurrent request. It's the default choice for most read-heavy workloads because it's simple to reason about, the cache only ever holds data that's actually been requested, and it degrades gracefully — if the cache is unavailable, the app can always fall back to the database directly. The trade-offs are a cache-miss penalty on the first request for any key, and a window of potential staleness between a write and the next read.",

  detailedAnswer: [
    "Read path: check cache → hit returns immediately; miss queries the DB, returns the value, then sets it in the cache with a TTL.",
    "Write path: update the DB, then delete the cache key (not overwrite it) so the next read repopulates from the current source of truth.",
    "Deleting rather than overwriting avoids a race condition where a slower write could overwrite a newer value from a concurrent request.",
    "Resilient to cache failure — since the app always has a DB fallback path, a dead cache means degraded latency, not a broken app.",
    "Costs: a cache-miss penalty on first access to any key, and a staleness window between a write and the next TTL-bound refresh.",
    "Watch for cache stampede — many requests missing a hot key simultaneously (e.g. right after eviction) all hitting the DB at once.",
  ],

  questions: [
    { id: "ca-q1", question: "What is the cache-aside pattern, in one sentence?", answer: "A caching strategy where the application checks the cache first on reads, falling back to the database on a miss and populating the cache itself; on writes it updates the database then deletes the cache key.", topic: "Caching", difficulty: "Beginner" },
    { id: "ca-q2", question: "What happens on a cache-aside read that hits the cache?", answer: "The cached value is returned immediately, typically in under a millisecond, with no database involvement.", topic: "Caching", difficulty: "Beginner" },
    { id: "ca-q3", question: "What happens on a cache-aside read that misses the cache?", answer: "The application queries the database, returns the value to the caller, and sets it in the cache (usually with a TTL) so subsequent reads hit the cache.", topic: "Caching", difficulty: "Beginner" },
    { id: "ca-q4", question: "What does the application do on a write in cache-aside?", answer: "It updates the database, then deletes the corresponding cache key, forcing the next read to repopulate the cache from the current source of truth.", topic: "Caching", difficulty: "Beginner" },
    { id: "ca-q5", question: "Why is deleting the cache key on write generally safer than overwriting it directly?", answer: "Overwriting risks a race where a slower write overwrites a newer value already placed by a concurrent request; deleting forces the next read to fetch the current, correct value from the database.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-q6", question: "Why is cache-aside considered the default choice for most read-heavy workloads?", answer: "It's the simplest strategy to reason about and debug, the cache only ever holds data that's actually been requested (memory-efficient), and it's resilient — the app can always fall back to the DB if the cache is down.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-q7", question: "What's the main latency cost of cache-aside?", answer: "The first request for any given key always pays the full cache-miss penalty of a database query, since nothing is pre-populated.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-q8", question: "What is a cache stampede, and how does it relate to cache-aside?", answer: "Many requests missing a hot key simultaneously (e.g. right after it expires or is evicted) and all hitting the database at once — a real risk in cache-aside without mitigation like request coalescing or short-lived locking placeholders.", topic: "Caching", difficulty: "Advanced" },
    { id: "ca-q9", question: "What happens to a cache-aside cache if the cache cluster restarts?", answer: "It starts cold, causing a temporary spike in database load as reads miss and repopulate it — but there's no data loss, since the database was always the source of truth.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-q10", question: "How does cache-aside differ from write-through?", answer: "In cache-aside, the application owns the logic and only writes to the cache on a read-miss or explicit invalidation; in write-through, every write goes through the cache, which synchronously updates the database before acknowledging.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-q11", question: "How does cache-aside differ from read-through?", answer: "In cache-aside, the application explicitly checks the cache and falls back to the DB itself on a miss; in read-through, the cache layer itself is responsible for fetching from the DB transparently, so the app only ever talks to the cache.", topic: "Caching", difficulty: "Advanced" },
    { id: "ca-q12", question: "Why might you set a TTL even with correct cache-aside invalidation on writes?", answer: "As a safety net — if an invalidation is missed due to a bug or an out-of-band write, TTL guarantees the stale entry eventually expires instead of living forever.", topic: "Caching", difficulty: "Advanced" },
    { id: "ca-q13", question: "What's a real production example of the cache-aside pattern at scale?", answer: "Facebook's Memcache paper describes cache-aside operating at massive scale — thousands of memcached servers in front of MySQL, with explicit invalidation on writes (using 'leases' to also prevent stampedes) because their workload is overwhelmingly read-heavy.", topic: "Caching", difficulty: "Advanced" },
    { id: "ca-q14", question: "Why is cache-aside considered memory-efficient compared to some other strategies?", answer: "It only ever caches data that's actually been requested, unlike write-through, which populates the cache with every write regardless of whether it will ever be read again.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-q15", question: "What's a common mistake in a cache-aside implementation?", answer: "Forgetting to set a TTL at all, letting stale data live forever until an explicit invalidation that some code path might not trigger.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-q16", question: "How would you prevent a cache stampede on a very popular product page under cache-aside?", answer: "Use request coalescing (only one request actually queries the DB while others wait) or a short-lived locking placeholder in the cache during repopulation.", topic: "Caching", difficulty: "Advanced" },
    { id: "ca-q17", question: "Is cache-aside a good fit for a 'like counter' that's updated extremely frequently?", answer: "Not ideally — the constant invalidation/repopulation cycle adds overhead; write-back is often a better fit for very write-heavy counters where some data-loss risk on cache failure is acceptable.", topic: "Caching", difficulty: "Advanced" },
    { id: "ca-q18", question: "What's the real-world analogy for cache-aside?", answer: "A line cook checking the prep station first, and if it's empty, walking to the pantry themselves to get the ingredient and refilling the station for next time.", topic: "Caching", difficulty: "Beginner" },
    { id: "ca-q19", question: "Why does cache-aside degrade gracefully under cache failure, unlike some other strategies?", answer: "Because the application always has a direct database fallback path built into its read logic — a dead cache means slower reads, not broken reads.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-q20", question: "Summarize the cache-aside pattern in one sentence.", answer: "The application checks the cache first on reads (falling back to and repopulating from the database on a miss), and on writes updates the database then deletes the cache key to force fresh repopulation.", topic: "Caching", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Walk me through exactly what happens on a cache miss.\"",
    "\"Why delete the key on write instead of just updating it?\"",
    "\"How would you prevent a stampede on a hot key?\"",
  ],

  commonMistakes: [
    "Overwriting the cache key on write instead of deleting it, opening a race condition with concurrent writes.",
    "Forgetting to set a TTL, so a missed invalidation leaves stale data cached indefinitely.",
    "Not planning for a cache stampede when a very hot key expires or is evicted.",
  ],

  interviewTraps: [
    "\"Why not just update the cache directly on write instead of deleting it?\" is testing whether you know about the concurrent-write race that deletion avoids.",
    "\"So the cache is the source of truth?\" is checking whether you'd correctly say no — the database always is, in cache-aside.",
  ],

  tradeoffs: [
    "Simple and memory-efficient (only caches requested data), at the cost of a cache-miss penalty on first access.",
    "Resilient to cache failure via DB fallback, at the cost of a staleness window between a write and the next read/TTL expiry.",
    "Explicit invalidation on write keeps data fresher than TTL alone, but adds a step that's easy to forget in some code paths.",
  ],

  comparisonTable: {
    title: "Cache-Aside vs Write-Through vs Write-Back",
    columns: ["Cache-Aside", "Write-Through", "Write-Back"],
    rows: [
      { label: "Who updates cache on write", values: ["App, via delete on write", "Cache layer, synchronously", "Cache immediately, DB async"] },
      { label: "Write latency", values: ["Fast (DB only)", "Slower (cache + DB)", "Fastest"] },
      { label: "Data-loss risk", values: ["None (DB is source of truth)", "None", "Real risk if cache fails before flush"] },
      { label: "First-read cost", values: ["Cache-miss penalty", "Low (pre-populated)", "Low"] },
      { label: "Best fit", values: ["Most read-heavy workloads (default)", "Financial/inventory data", "Very write-heavy counters/events"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "ca-root",
    question: "Is there a specific reason to move off the default (cache-aside) for this data?",
    options: [
      {
        label: "Staleness would cause real harm and you can tolerate slower writes",
        next: {
          kind: "result",
          id: "ca-wt",
          result: "Use write-through instead.",
          rationale: "Financial or inventory data benefits from the cache never diverging from the database, worth the extra write latency.",
        },
      },
      {
        label: "Extremely write-heavy, some data-loss risk on rare cache failure is acceptable",
        next: {
          kind: "result",
          id: "ca-wb",
          result: "Use write-back instead.",
          rationale: "Counters and analytics events benefit from very fast writes; occasional loss on cache crash is an acceptable trade there.",
        },
      },
      {
        label: "No specific reason — standard read-heavy workload",
        next: {
          kind: "result",
          id: "ca-default",
          result: "Stick with cache-aside.",
          rationale: "It's simple, resilient to cache failure, and memory-efficient — the right default absent a specific reason to deviate.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Check the station, refill the station.\" The cook checks the prep station first; on a miss, walks to the pantry, grabs it, and refills the station — then deletes (never overwrites) the station's stock on any pantry restock.",

  realWorldExamples: [
    "A typical Redis-in-front-of-Postgres setup: the app checks Redis, falls back to Postgres on a miss, and repopulates Redis — the most common caching setup in practice.",
    "Facebook's Memcache paper describes cache-aside at massive scale — thousands of memcached servers in front of MySQL with explicit write-time invalidation.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant App
    participant Cache
    participant DB
    App->>Cache: GET key
    alt cache hit
        Cache-->>App: value
    else cache miss
        Cache-->>App: miss
        App->>DB: SELECT ...
        DB-->>App: value
        App->>Cache: SET key, value, TTL
    end`,

  flashcards: [
    { id: "ca-fc1", front: "Cache-aside — one-line definition", back: "App checks cache first; on a miss, reads the DB and populates the cache itself.", topic: "Caching", difficulty: "Beginner" },
    { id: "ca-fc2", front: "Cache-aside write path", back: "Update the database, then delete the cache key (don't overwrite it).", topic: "Caching", difficulty: "Beginner" },
    { id: "ca-fc3", front: "Why delete instead of overwrite on write?", back: "Avoids a race where a slow write could overwrite a newer value from a concurrent request.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-fc4", front: "Cache-aside's main latency cost", back: "The first request for any key always pays a full cache-miss penalty (a DB query).", topic: "Caching", difficulty: "Intermediate" },
    { id: "ca-fc5", front: "What happens if the cache cluster restarts under cache-aside?", back: "Cold cache, temporary DB load spike as reads repopulate it — no data loss, since the DB was always the source of truth.", topic: "Caching", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Cache-Aside Pattern",
    sections: [
      { heading: "Read path", items: ["Check cache first", "Hit → return", "Miss → query DB, return, SET cache with TTL"] },
      { heading: "Write path", items: ["Update DB first", "DELETE cache key (not overwrite)", "Next read repopulates fresh"] },
      { heading: "Strengths", items: ["Simple, easy to reason about", "Memory-efficient (only requested data)", "Resilient — falls back to DB if cache is down"] },
      { heading: "Watch out for", items: ["Cache-miss penalty on first access", "Cache stampede on hot-key eviction", "Missing TTL as a safety net"] },
    ],
  },

  speedNotes: [
    "Read: check cache → miss → DB → SET cache.",
    "Write: update DB → DELETE cache key (never overwrite).",
    "Default, simplest strategy — resilient to cache failure.",
    "Costs: cache-miss penalty + staleness window.",
    "Mitigate stampedes with request coalescing / locking placeholder.",
  ],
};
