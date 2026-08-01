import type { ConceptRevisionContent } from "./types";

export const cachingFundamentals: ConceptRevisionContent = {
  slug: "caching-fundamentals",
  title: "Caching Fundamentals",
  topic: "Caching",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Why Cache?", href: "/docs/caching/why-cache" },
    { label: "Caching Strategies", href: "/docs/caching/caching-strategies" },
    { label: "Eviction Policies", href: "/docs/caching/eviction-policies" },
    { label: "TTL", href: "/docs/caching/ttl" },
  ],

  summary: [
    "Caching stores a copy of data in a faster location (usually memory) so repeated requests skip the slower original work.",
    "It exploits a real, enormous speed gap: RAM access is ~100ns, an SSD read is tens of microseconds, a database query with disk I/O is 5-50ms.",
    "A cache hit can be 100-1000x faster than the equivalent database query — this order-of-magnitude gap is the entire reason caching exists.",
    "Value scales with reuse factor: data requested once gains nothing; data requested constantly by many users benefits enormously.",
    "The core idea is simple; the real complexity is in what to cache, for how long (TTL), how to evict when full, and how to invalidate correctly.",
    "Caching trades a small, managed risk of staleness for a large reduction in latency and backing-store load.",
    "It only helps read-heavy, infrequently-changing data — it's the wrong tool for data that changes on nearly every read.",
  ],

  whyAsked: [
    "It's the foundation every deeper caching question (strategies, invalidation, eviction) builds on — interviewers check this before going further.",
    "Tests whether you reach for real numbers (the latency gap) rather than a vague \"caching makes things faster\" hand-wave.",
    "Listens for whether you know caching isn't free — it introduces staleness risk and new infrastructure to manage.",
    "A quick way to see if you can identify when caching is the wrong tool (write-heavy or rarely-reused data).",
  ],

  thirtySecondAnswer:
    "Caching stores a copy of data in a faster-to-access location, typically memory, so future requests for that same data can be served without repeating the slower original work — a database query, an expensive computation, or a network call. It exists because of a huge, concrete speed gap: RAM access is on the order of 100 nanoseconds, while a database query involving disk I/O can take 5-50 milliseconds, so a cache hit can be 100-1000x faster. The value of caching scales directly with how often the same data is re-requested — data hit once and never again gains nothing, while a popular product page or trending post benefits enormously. The trade-off is that caching introduces the risk of serving stale data and adds a new piece of infrastructure to manage, so the real engineering challenge isn't the basic idea, it's managing what to cache, for how long, how to evict entries when the cache fills up, and how to invalidate correctly when the source changes.",

  detailedAnswer: [
    "Exploits the speed gap between memory and disk/network — RAM (~100ns) vs. a database query with disk I/O (5-50ms).",
    "Value is proportional to reuse factor: caching only helps data that's actually requested repeatedly by multiple callers.",
    "Reduces both latency for the caller and load on the backing database, which also protects it from traffic spikes.",
    "Introduces staleness risk — cached data can lag behind the source of truth until invalidated or expired.",
    "Real complexity lives in policy decisions: TTL (how long to keep an entry), eviction (what to remove when full), and invalidation (how to know data changed).",
    "Wrong tool for data that changes on nearly every read, or that's requested so rarely the cache almost never gets a hit.",
  ],

  questions: [
    { id: "cf-q1", question: "What is caching, in one sentence?", answer: "Storing a copy of data in a faster-to-access location (typically memory) so future requests can be served without repeating the slower original work.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-q2", question: "Why does caching provide such a large speedup?", answer: "It exploits the huge speed gap between memory and slower tiers — RAM access is ~100ns, while a database query with disk I/O can take 5-50ms, so a cache hit can be 100-1000x faster.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-q3", question: "What determines how much value caching provides for a given piece of data?", answer: "Its reuse factor — how often the same data is re-requested; data requested once and never again gains nothing from caching.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-q4", question: "What are the two problems caching solves for a system?", answer: "It reduces latency for requests hitting cached data, and it reduces load on the underlying database/service by absorbing repeated identical requests.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-q5", question: "What's the fundamental risk caching introduces?", answer: "Serving stale data — the cached copy can lag behind the source of truth until it's invalidated or expires.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-q6", question: "Why is caching considered a trade, not a free win?", answer: "It trades a small, deliberately managed risk of serving outdated data for a large reduction in latency and backing-store load — worthwhile for the right data, wasteful or risky for the wrong data.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-q7", question: "What kind of data gains little to nothing from caching?", answer: "Data with a very low reuse rate (rarely re-requested) or data that changes on nearly every read, since the cache would almost always be stale or immediately invalidated.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-q8", question: "Where does the real engineering complexity in caching live?", answer: "Not in the basic idea (store a copy, reuse it), but in deciding what to cache, for how long (TTL), how to evict entries when full, and how to invalidate correctly when the source changes.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-q9", question: "How would you decide what to cache under a limited cache memory budget?", answer: "Prioritize data with the highest reuse factor and expense-to-produce ratio — frequently read, infrequently changed, and costly to recompute or refetch.", topic: "Caching", difficulty: "Advanced" },
    { id: "cf-q10", question: "What's a good operational metric for judging whether caching is working well?", answer: "Cache hit rate — a low hit rate usually means the wrong data is being cached, not that the cache needs to be bigger.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-q11", question: "Why shouldn't caching be used to paper over a slow underlying query?", answer: "If the slowness is fixable directly (e.g. a missing database index), fixing it is more sustainable than masking it with a cache, which adds its own complexity and staleness risk.", topic: "Caching", difficulty: "Advanced" },
    { id: "cf-q12", question: "What three cache management concerns come up once you decide to cache something?", answer: "TTL (how long an entry lives), eviction policy (what gets removed when the cache is full), and invalidation (how the cache learns the source changed).", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-q13", question: "How does caching help absorb a sudden traffic spike on popular content?", answer: "Once the content is cached, the spike is served from the fast cache layer instead of hitting the backing database directly, which could otherwise be overwhelmed.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-q14", question: "Is caching only useful for database queries?", answer: "No — it applies to any expensive-to-produce, frequently-reused result: database queries, expensive computations, or network calls to external services.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-q15", question: "What should a well-designed cache-aside setup do if the cache itself becomes unavailable?", answer: "Degrade gracefully by falling back to the backing store directly, rather than failing the request entirely.", topic: "Caching", difficulty: "Advanced" },
    { id: "cf-q16", question: "Why is a cache hit from Redis so much faster than a database query, concretely?", answer: "Redis serves from memory (~100ns-scale access) while a typical database query with disk I/O takes 5-50ms — several orders of magnitude difference.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-q17", question: "Give a production example of caching being foundational to a system's scalability.", answer: "Facebook's Memcache paper describes caching as foundational to their infrastructure because their read-to-write ratio is so read-heavy that without caching absorbing most reads, their databases would need far more scale than necessary.", topic: "Caching", difficulty: "Advanced" },
    { id: "cf-q18", question: "What's the real-world analogy commonly used to explain caching?", answer: "A chef preparing a popular sauce once in a batch and keeping it warm and ready, instead of remaking it from scratch for every single identical order.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-q19", question: "How does caching interact with read-heavy vs. write-heavy workloads?", answer: "It provides large benefits for read-heavy workloads (many repeated reads of the same data) and little to no benefit — and added complexity — for write-heavy or constantly-changing data.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-q20", question: "Summarize caching in one sentence.", answer: "Exploiting the speed gap between memory and slower storage/computation by keeping a reusable copy of frequently-requested, infrequently-changed data close at hand.", topic: "Caching", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What would you actually cache here, and for how long?\"",
    "\"What happens if the cache goes down?\"",
    "\"How do you know your cache is actually helping?\"",
  ],

  commonMistakes: [
    "Caching data that's rarely re-requested, adding management overhead for negligible benefit.",
    "Treating caching as a substitute for fixing a genuinely slow underlying query, rather than a complementary optimization.",
    "Not planning for graceful degradation if the cache layer itself becomes unavailable.",
  ],

  interviewTraps: [
    "\"Why not just cache everything?\" is testing whether you understand reuse factor and staleness cost, not just \"caching is good.\"",
    "\"Isn't a bigger cache always the fix for a low hit rate?\" is checking whether you'd investigate what's being cached before assuming size is the problem.",
  ],

  tradeoffs: [
    "Caching trades a managed risk of stale data for a large reduction in latency and backing-store load.",
    "High reuse-factor data benefits enormously; low reuse-factor or constantly-changing data gains little and adds overhead.",
    "Adding a cache adds new infrastructure to run, monitor, and reason about — it's not a free layer.",
  ],

  memoryTrick:
    "\"Cache the sauce, not the special order.\" Batch and reuse what's asked for again and again; don't bother caching the one-off nobody will ask for twice.",

  realWorldExamples: [
    "A URL shortener caches redirects because the same short link is often clicked many times shortly after being shared, turning most clicks into fast in-memory lookups.",
    "Facebook's Memcache paper describes caching as foundational to their infrastructure given how heavily read-skewed their traffic is.",
  ],

  mermaidDiagram: `flowchart LR
    A["1,000 identical requests\\nfor the same product page"] --> B{"Cached?"}
    B -->|"No caching:\\n1,000 database queries"| C["High DB load,\\nhigher average latency"]
    B -->|"Cached:\\n1 DB query + 999 cache hits"| D["Minimal DB load,\\nvery low average latency"]`,

  flashcards: [
    { id: "cf-fc1", front: "Caching — one-line definition", back: "Storing a copy of data in a faster location (usually memory) to skip the slower original work on repeat requests.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-fc2", front: "Why is a cache hit so much faster than a DB query?", back: "RAM access (~100ns) vs. a database query with disk I/O (5-50ms) — a 100-1000x gap.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-fc3", front: "What determines caching's value for a given piece of data?", back: "Its reuse factor — how often the same data is re-requested.", topic: "Caching", difficulty: "Beginner" },
    { id: "cf-fc4", front: "What's the fundamental risk caching introduces?", back: "Serving stale data until it's invalidated or expires.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cf-fc5", front: "Where does caching's real complexity live?", back: "Not the basic idea — in TTL, eviction policy, and invalidation decisions.", topic: "Caching", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Caching Fundamentals",
    sections: [
      { heading: "Why it works", items: ["RAM ~100ns vs DB query 5-50ms", "Cache hit can be 100-1000x faster", "Value scales with reuse factor"] },
      { heading: "Benefits", items: ["Lower latency for cached data", "Reduced backing-store load", "Absorbs traffic spikes on hot content"] },
      { heading: "Costs", items: ["Staleness risk", "New infrastructure to run/monitor", "No benefit for low-reuse or write-heavy data"] },
      { heading: "Real complexity", items: ["What to cache", "TTL — how long", "Eviction — what to remove when full", "Invalidation — how to detect change"] },
    ],
  },

  speedNotes: [
    "Cache = copy of data in a faster location (memory).",
    "RAM ~100ns vs DB query 5-50ms — 100-1000x speedup on hit.",
    "Value scales with reuse factor — no benefit for one-off data.",
    "Real complexity: TTL, eviction, invalidation — not the basic idea.",
    "Wrong tool for write-heavy or constantly-changing data.",
  ],
};
