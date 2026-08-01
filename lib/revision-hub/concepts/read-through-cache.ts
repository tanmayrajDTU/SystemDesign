import type { ConceptRevisionContent } from "./types";

export const readThroughCache: ConceptRevisionContent = {
  slug: "read-through-cache",
  title: "Read-Through Cache",
  topic: "Caching",
  difficulty: "Intermediate",
  estimatedMinutes: 8,

  docLinks: [
    { label: "Caching Strategies", href: "/docs/caching/caching-strategies" },
    { label: "Why Cache?", href: "/docs/caching/why-cache" },
  ],

  summary: [
    "In a read-through cache, the cache sits directly in front of the database and is the only entity the application ever talks to for reads.",
    "On a cache miss, the cache layer itself is responsible for fetching the missing data from the database, populating itself, and returning the result to the caller.",
    "The application never knows whether a hit or miss occurred — it always calls the cache and gets the data back.",
    "This contrasts with cache-aside, where the application manually checks the cache, fetches from the database on a miss, and writes the result back to the cache itself.",
    "Read-through caches are most natural with managed caching libraries or middleware (e.g. AWS ElastiCache with DAX for DynamoDB), which handle the miss-and-populate logic transparently.",
    "Cold-start is a notable downside: on first run (or after eviction), every key misses and the database takes the full read load until the cache warms up.",
    "Lazy population is an advantage for memory efficiency — only actually-requested data ever gets loaded into the cache.",
  ],

  whyAsked: [
    "Interviewers want to see that you can distinguish between caching patterns by who is responsible for populating the cache on a miss.",
    "Tests whether you understand the cold-start / cache-warm problem and how to mitigate it.",
    "Checks your ability to reason about read paths: simpler application code vs. less control over what gets cached.",
    "Often leads into questions about write strategies (write-through, write-back) and how they complement read-through.",
  ],

  thirtySecondAnswer:
    "In a read-through cache, the cache sits between the application and the database and is the only thing the application reads from. On a cache miss, the cache itself fetches the data from the database, stores it, and returns it to the caller — the application code never directly touches the database for reads. This simplifies application code compared to cache-aside, where the app manages the miss-and-populate loop manually. The main downside is cold start: on initial deployment or after eviction, every key is a miss and the database must service every read until the cache warms up. Read-through is most common in managed systems like AWS DAX for DynamoDB.",

  detailedAnswer: [
    "Application reads always go to the cache; on a miss, the cache fetches from DB, stores the result, and returns it — the app never touches the DB directly for reads.",
    "Simplifies application code significantly compared to cache-aside (no manual miss-and-populate logic in app code).",
    "Cold-start problem: first time a key is requested (or after eviction) is always a cache miss, so the DB takes the full load until the cache warms up.",
    "Mitigation for cold start: cache warming — pre-populate the cache at deployment time with anticipated hot keys.",
    "Memory efficient: only data actually requested gets loaded — no risk of pre-loading rarely-used data.",
    "Most naturally implemented in managed caching layers or caching libraries that sit transparently between app and DB.",
  ],

  questions: [
    { id: "rtc-q1", question: "What is a read-through cache?", answer: "A caching pattern where the cache sits between the application and the database, and on a cache miss, the cache itself fetches from the database, stores the result, and returns it to the caller — the application only ever reads from the cache.", topic: "Caching", difficulty: "Beginner" },
    { id: "rtc-q2", question: "Who is responsible for populating the cache on a miss in read-through?", answer: "The cache layer itself, not the application. The application just calls the cache and gets data back regardless of whether it was a hit or miss.", topic: "Caching", difficulty: "Beginner" },
    { id: "rtc-q3", question: "How does read-through differ from cache-aside?", answer: "In cache-aside, the application checks the cache, fetches from DB on a miss, and writes the result to the cache itself. In read-through, the cache handles all of this transparently — the application only ever talks to the cache.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q4", question: "What is the cold-start problem in read-through caching?", answer: "On initial deployment or after cache eviction, every key is a miss, so the database must service every read directly until the cache populates with frequently-requested data.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q5", question: "How do you mitigate the cold-start problem for a read-through cache?", answer: "Cache warming — pre-populate the cache at startup with anticipated hot keys before the cache goes live, so the first wave of real traffic doesn't all hit the database.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q6", question: "What is a key advantage of read-through over cache-aside in terms of application code?", answer: "Simpler application code — the app never needs to implement the check-miss-fetch-store loop; it always just reads from the cache, whether or not the data was already cached.", topic: "Caching", difficulty: "Beginner" },
    { id: "rtc-q7", question: "Why is read-through considered 'lazy population'?", answer: "Because data is only loaded into the cache when it is actually requested — there's no upfront loading of all data, only what callers ask for.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q8", question: "What kind of infrastructure naturally implements read-through caching?", answer: "Managed caching layers or middleware that sit transparently between application and database, such as AWS DAX for DynamoDB, or caching libraries with transparent miss-handling.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q9", question: "If two concurrent requests miss the same key in a read-through cache, what can happen?", answer: "A 'thundering herd' or 'cache stampede' — both requests simultaneously hit the database for the same key, defeating the purpose of caching. Proper implementations use locking or request coalescing to let only one fetch occur.", topic: "Caching", difficulty: "Advanced" },
    { id: "rtc-q10", question: "How does read-through handle data that's never been requested before?", answer: "It's a cold miss — the cache fetches it from the database on first request, stores it, and subsequent requests get a hit. There's no pre-loading of unrequested data.", topic: "Caching", difficulty: "Beginner" },
    { id: "rtc-q11", question: "What write strategy naturally pairs with read-through caching?", answer: "Write-through, which keeps the cache and database in sync on writes, preventing stale reads after a write. Write-back can also be used but introduces the risk of data loss.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q12", question: "What happens to a read-through cache when the backing database goes down?", answer: "Cached data continues to be served for cache hits, but cache misses cannot be populated and will fail — the system degrades gracefully for hot data but fails for cold keys.", topic: "Caching", difficulty: "Advanced" },
    { id: "rtc-q13", question: "Is a read-through cache suitable for write-heavy workloads?", answer: "No — read-through only addresses the read path. For write-heavy workloads you need to think carefully about what write strategy to use alongside it.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q14", question: "What is the staleness risk in read-through caching?", answer: "If the database is updated by a process that doesn't also update the cache, the cache will serve stale data until the TTL expires or the key is explicitly invalidated.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q15", question: "How does memory usage differ between read-through and pre-loaded (eager) caching?", answer: "Read-through is more memory efficient — only actually-requested data is loaded. Eager pre-loading may load large amounts of data that is never actually requested.", topic: "Caching", difficulty: "Advanced" },
    { id: "rtc-q16", question: "How does read-through simplify multi-tenant or multi-service architectures?", answer: "Since all services read from the same cache interface, the miss-and-populate logic is centralized — each service doesn't need to independently implement the DB fallback.", topic: "Caching", difficulty: "Advanced" },
    { id: "rtc-q17", question: "What's a real-world service that uses read-through caching?", answer: "Amazon DynamoDB Accelerator (DAX) is a fully managed read-through/write-through cache for DynamoDB — applications call DAX, and DAX handles misses by fetching from DynamoDB.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q18", question: "Can read-through and cache-aside be used together?", answer: "Yes — some systems use read-through as the primary strategy for most reads, while cache-aside is used for specific read paths that need more control over what gets cached.", topic: "Caching", difficulty: "Advanced" },
    { id: "rtc-q19", question: "What happens to data in a read-through cache over time without eviction or TTL?", answer: "The cache grows unbounded and may eventually fill its memory budget, triggering evictions. Without TTL, stale data also persists indefinitely after the database is updated.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-q20", question: "Why is read-through considered simpler from an application developer's perspective but potentially harder from an infrastructure perspective?", answer: "Application code is simpler because miss-handling is abstracted away, but the caching infrastructure must be more sophisticated — it needs to implement DB connection, retry logic, and cache population internally.", topic: "Caching", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"How would you warm a cold read-through cache before a major traffic event?\"",
    "\"What write strategy would you use alongside read-through and why?\"",
    "\"How do you handle a cache stampede in a read-through system?\"",
    "\"What's the difference between read-through and look-aside (cache-aside)?\"",
  ],

  commonMistakes: [
    "Confusing read-through with cache-aside — in read-through the cache handles the miss, in cache-aside the application does.",
    "Not planning for the cold-start problem, leading to a database overload spike immediately after deployment.",
    "Using read-through without pairing it with a write strategy that keeps cache and DB in sync.",
  ],

  interviewTraps: [
    "\"Isn't read-through just cache-aside?\" — No. The critical difference is who handles the miss: the cache itself (read-through) vs. the application (cache-aside).",
    "\"Read-through means you never hit the database\" — Wrong. You hit the database on every cache miss; read-through just hides that from the application code.",
  ],

  tradeoffs: [
    "Simpler application code vs. more complex caching infrastructure.",
    "Memory efficient (lazy load) vs. cold-start problem when nothing is cached yet.",
    "Centralized miss-handling vs. less application control over what gets cached and when.",
  ],

  comparisonTable: {
    title: "Read-Through vs Cache-Aside",
    columns: ["Aspect", "Read-Through", "Cache-Aside"],
    rows: [
      { label: "Who fetches on miss?", values: ["Cache layer itself", "Application code"] },
      { label: "App code complexity", values: ["Simpler (no miss logic)", "More complex (manual miss/fetch/store)"] },
      { label: "Cold-start behavior", values: ["All misses hit DB", "All misses hit DB"] },
      { label: "Control over what's cached", values: ["Less — cache decides", "More — app decides"] },
      { label: "Common implementation", values: ["Managed caches (DAX, NCache)", "Redis/Memcached + app code"] },
      { label: "Stale data risk", values: ["Same — depends on TTL/invalidation", "Same — depends on TTL/invalidation"] },
    ],
  },

  memoryTrick:
    "RTC = 'Reads Through the Cache' — the cache is the single gateway; you never bypass it, and it handles refilling itself.",

  realWorldExamples: [
    "AWS DynamoDB Accelerator (DAX) is a fully managed read-through cache — applications point at DAX instead of DynamoDB, and DAX handles all cache misses by querying DynamoDB transparently.",
    "Content delivery systems often implement read-through at the edge: the CDN node serves from its own cache, and on a miss, pulls from the origin server, caches the response, and returns it to the user.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant App
    participant Cache as Read-Through Cache
    participant DB as Database

    App->>Cache: Read(key)
    alt Cache Hit
        Cache-->>App: Return cached value
    else Cache Miss
        Cache->>DB: Fetch(key)
        DB-->>Cache: Return data
        Cache->>Cache: Store(key, data, TTL)
        Cache-->>App: Return data
    end`,

  flashcards: [
    { id: "rtc-fc1", front: "Read-Through Cache — one-line definition", back: "The cache sits between app and DB; on a miss, the cache itself fetches from DB, stores the result, and returns it — the app only ever talks to the cache.", topic: "Caching", difficulty: "Beginner" },
    { id: "rtc-fc2", front: "Read-Through vs Cache-Aside: who fetches on a miss?", back: "Read-through: the cache. Cache-aside: the application.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-fc3", front: "What is the cold-start problem in read-through?", back: "On first run (or after eviction), every key is a cache miss and the full load falls to the database until the cache warms up.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-fc4", front: "How do you mitigate cold-start in read-through?", back: "Cache warming — pre-populate hot keys before going live.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rtc-fc5", front: "What write strategy pairs naturally with read-through?", back: "Write-through — writes go to both cache and DB simultaneously, preventing stale reads after a write.", topic: "Caching", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Read-Through Cache",
    sections: [
      { heading: "How it works", items: ["App reads only from cache", "On miss: cache fetches from DB, stores, returns", "App never directly calls DB for reads"] },
      { heading: "Advantages", items: ["Simpler app code (no miss logic)", "Lazy population — only load what's requested", "Centralizes miss-handling"] },
      { heading: "Disadvantages", items: ["Cold-start: all-miss on first run", "Less app control over what gets cached", "More complex caching infrastructure needed"] },
      { heading: "Key decisions", items: ["Pair with write-through or write-back for consistency", "Use cache warming to mitigate cold-start", "Set TTL to prevent unbounded staleness"] },
    ],
  },

  speedNotes: [
    "Cache is sole read gateway — app never touches DB directly.",
    "Miss: cache fetches from DB, stores it, returns — transparent to app.",
    "Cold-start = all misses until cache warms up.",
    "Fix cold-start: pre-warm with hot keys before launch.",
    "Natural pair: write-through for read-after-write consistency.",
  ],
};
