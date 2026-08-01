import type { ConceptRevisionContent } from "./types";

export const cacheInvalidation: ConceptRevisionContent = {
  slug: "cache-invalidation",
  title: "Cache Invalidation",
  topic: "Caching",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Cache Invalidation Docs", href: "/docs/caching/cache-invalidation" },
    { label: "Caching Strategies", href: "/docs/caching/caching-strategies" },
  ],
  summary: [
    "Cache invalidation is the process of removing or updating cached data when the underlying source of truth changes.",
    "It is notoriously known as one of the hardest problems in computer science alongside naming things.",
    "Without proper invalidation, users might see stale, outdated, or incorrect data, leading to bad user experiences or corrupted logic.",
    "Common strategies include active invalidation (event-driven) and passive invalidation (TTL-based).",
    "Invalidation can be implemented at various layers: CDN edge, application server, or database layer."
  ],
  whyAsked: [
    "To test your understanding of data consistency in distributed systems.",
    "To evaluate how you handle the trade-off between performance (caching) and correctness (freshness).",
    "To see if you can identify race conditions and concurrency issues related to caching."
  ],
  thirtySecondAnswer: "Cache invalidation ensures that stale data is removed or refreshed when the primary data source is updated. It's critical for maintaining data consistency. You can invalidate actively by purging or updating the cache upon data writes, or passively using TTLs. Active strategies include Write-Through, Write-Around, and Write-Back. Failing to invalidate correctly leads to serving stale data, which can break application logic or confuse users.",
  detailedAnswer: [
    "Write-through cache: Data is written to the cache and the backing store simultaneously. Ensures consistency but increases write latency.",
    "Write-around cache: Data is written directly to the backing store, bypassing the cache. Cache is updated on a cache miss. Reduces cache pollution for write-once/read-never data.",
    "Write-back cache: Data is written only to the cache and asynchronously synced to the backing store. Low latency but high risk of data loss if cache crashes.",
    "Cache Purge: Explicitly deleting a key from the cache when the database is updated.",
    "Cache Refresh: Asynchronously fetching the latest data in the background before it expires to prevent cache stampedes."
  ],
  questions: [
    { id: "cinv-q1", question: "What is cache invalidation?", answer: "The process of declaring cached data as stale and removing or updating it.", topic: "Caching", difficulty: "Beginner" },
    { id: "cinv-q2", question: "Why is it considered a hard problem?", answer: "Because maintaining state across distributed components inherently introduces race conditions and consistency challenges.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-q3", question: "Explain the write-through strategy.", answer: "Writes go to both cache and database synchronously. High write latency, perfect read consistency.", topic: "Caching", difficulty: "Beginner" },
    { id: "cinv-q4", question: "Explain the write-back strategy.", answer: "Writes go to cache only and are flushed to DB later. Very fast writes, risk of data loss.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-q5", question: "Explain the write-around strategy.", answer: "Writes bypass the cache and go directly to DB. Cache is populated on subsequent reads.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-q6", question: "How does event-driven invalidation work?", answer: "The database emits an event (like via CDC) upon update, which a consumer uses to delete or update the cache.", topic: "Caching", difficulty: "Advanced" },
    { id: "cinv-q7", question: "What is a cache stampede?", answer: "When a highly concurrent key expires, causing massive simultaneous database hits.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-q8", question: "How do you prevent a cache stampede?", answer: "Using locking, probabilistic early expiration, or background refreshing.", topic: "Caching", difficulty: "Advanced" },
    { id: "cinv-q9", question: "What's the difference between purge and refresh?", answer: "Purge deletes the key; refresh fetches new data before deleting the old.", topic: "Caching", difficulty: "Beginner" },
    { id: "cinv-q10", question: "When would you prefer soft invalidation?", answer: "When showing slightly stale data is better than increasing latency by blocking on a DB read.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-q11", question: "What is versioning in caching?", answer: "Appending a version number to a key to safely invalidate groups of keys without complex scans.", topic: "Caching", difficulty: "Advanced" },
    { id: "cinv-q12", question: "How do CDN invalidations usually work?", answer: "Through API calls that propagate purges across all edge nodes, though it can be slow.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-q13", question: "What happens if an invalidation message is lost?", answer: "The cache retains stale data until a TTL expires or manual intervention occurs.", topic: "Caching", difficulty: "Advanced" },
    { id: "cinv-q14", question: "How do you handle consistency between cache and DB in a distributed transaction?", answer: "Using techniques like the outbox pattern or two-phase commit, though often eventual consistency is preferred.", topic: "Caching", difficulty: "Advanced" },
    { id: "cinv-q15", question: "Why not just use a 1-second TTL everywhere?", answer: "It still causes high DB load and doesn't provide strict consistency.", topic: "Caching", difficulty: "Beginner" },
    { id: "cinv-q16", question: "What is read-through caching?", answer: "The application asks the cache for data; if missed, the cache itself fetches from DB.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-q17", question: "How does optimistic concurrency control relate to caching?", answer: "It ensures updates only apply if the version matches, preventing overwrites of newer cache data by older, delayed updates.", topic: "Caching", difficulty: "Advanced" },
    { id: "cinv-q18", question: "What is cache poisoning?", answer: "An attack where malicious data is forced into the cache and served to other users.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-q19", question: "How to handle cache failures during writes?", answer: "Depending on the policy (e.g., in write-through, you might fail the DB write, or just continue and let TTL handle it).", topic: "Caching", difficulty: "Advanced" },
    { id: "cinv-q20", question: "What is Cache-Aside?", answer: "Application explicitly checks cache, on miss fetches from DB, then writes to cache.", topic: "Caching", difficulty: "Beginner" }
  ],
  commonFollowUps: [
    "How would you guarantee zero stale reads? (Strict consistency)",
    "What if the cache invalidation event fails to deliver?",
    "How do you invalidate a user's entire session across multiple microservices?"
  ],
  commonMistakes: [
    "Updating the cache before updating the database.",
    "Ignoring edge cases where race conditions cause stale data to overwrite fresh data.",
    "Relying solely on long TTLs for data that changes frequently and needs consistency."
  ],
  interviewTraps: [
    "Assuming write-through is always best (it can significantly slow down write-heavy workloads).",
    "Forgetting about cache stampedes when talking about mass invalidations."
  ],
  tradeoffs: [
    "Consistency vs. Latency: Stronger invalidation (write-through) means higher latency.",
    "Complexity vs. Freshness: Event-driven invalidation is complex but keeps data very fresh."
  ],
  memoryTrick: "Invalidate or Stagnate. (If you don't clear the old, the new can't shine.)",
  realWorldExamples: [
    "Twitter timeline caches being invalidated when a high-profile user deletes a tweet.",
    "E-commerce price changes needing immediate invalidation across all CDNs to avoid selling at the wrong price."
  ],
  mermaidDiagram: `flowchart TD
    A[Update Request] --> B[Write to Database]
    B --> C{Success?}
    C -->|Yes| D[Invalidate/Update Cache]
    C -->|No| E[Return Error]`,
  flashcards: [
    { id: "cinv-fc1", front: "Write-Through", back: "Write to cache & DB synchronously. Safe but slow.", topic: "Caching", difficulty: "Beginner" },
    { id: "cinv-fc2", front: "Write-Back", back: "Write to cache only, sync to DB later. Fast but risky.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-fc3", front: "Cache Stampede", back: "Massive simultaneous misses on a single expired key.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cinv-fc4", front: "Write-Around", back: "Bypass cache on write, update cache on read miss.", topic: "Caching", difficulty: "Beginner" },
    { id: "cinv-fc5", front: "Cache-Aside", back: "App manages cache; reads from cache, fetches from DB on miss.", topic: "Caching", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Cache Invalidation Quick Reference",
    sections: [
      { heading: "Strategies", items: ["Write-Through", "Write-Back", "Write-Around", "Cache-Aside"] },
      { heading: "Invalidation Triggers", items: ["TTL Expiry", "Event-Driven (CDC)", "Manual Purge"] },
      { heading: "Challenges", items: ["Race Conditions", "Cache Stampedes", "Network Partitions"] }
    ]
  },
  speedNotes: [
    "Hardest problem in CS.",
    "Prevents stale data delivery.",
    "Write-through is safe/slow.",
    "Write-back is fast/risky.",
    "Beware of cache stampedes."
  ]
};
