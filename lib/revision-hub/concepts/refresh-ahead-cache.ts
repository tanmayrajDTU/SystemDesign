import type { ConceptRevisionContent } from "./types";

export const refreshAheadCache: ConceptRevisionContent = {
  slug: "refresh-ahead-cache",
  title: "Refresh-Ahead Cache",
  topic: "Caching",
  difficulty: "Advanced",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Caching Strategies", href: "/docs/caching/caching-strategies" },
    { label: "TTL", href: "/docs/caching/ttl" },
    { label: "Cache Invalidation", href: "/docs/caching/cache-invalidation" },
  ],

  summary: [
    "Refresh-ahead caching proactively refreshes cache entries before they expire, so a caller never experiences the latency of a cold cache miss for popular data.",
    "The cache tracks how frequently each entry is accessed and, when an entry is approaching its TTL expiry, it pre-fetches the fresh value from the database in the background.",
    "The caller always reads a warm (pre-refreshed) value — the entry is renewed before anyone actually waits for it.",
    "The key trade-off is wasted refreshes: entries that are predicted to be re-requested but actually aren't will be re-fetched unnecessarily, consuming DB resources for nothing.",
    "Refresh-ahead is particularly effective for content that is accessed at a predictable, high rate — homepage content, top trending posts, product catalog data.",
    "It is harder to implement than TTL-based expiry and requires access-frequency tracking and background refresh scheduling.",
    "A subtle risk: if refresh predictions are wrong (item goes cold), refreshes continue until the next TTL cycle, wasting resources.",
  ],

  whyAsked: [
    "Tests whether you know that TTL-based expiry isn't the only way to manage cache freshness — proactive refresh is a valid advanced strategy.",
    "Checks understanding of the access pattern prediction requirement — refresh-ahead only works if you can predict which entries will be re-requested.",
    "Often asked in the context of 'how do you eliminate cache miss latency spikes?' which TTL-only caching cannot fully solve.",
    "Demonstrates depth of caching knowledge beyond the basics (read-through, write-through).",
  ],

  thirtySecondAnswer:
    "Refresh-ahead caching proactively refreshes cache entries before they expire, so callers never experience a cache miss due to TTL expiry on popular data. When an entry's TTL is approaching, the cache triggers a background refresh from the database, renewing the entry invisibly to callers. The cost is wasted refreshes for data that gets refreshed but never re-requested — so refresh-ahead works best when access patterns are predictable and consistent, like homepage data or trending content. For data with unpredictable access patterns, it adds DB load for no benefit.",

  detailedAnswer: [
    "Cache monitors access frequency per key and, as TTL expiry approaches, triggers an async background refresh from the source.",
    "Caller always reads the current (still-valid) cached value — there's no blocking wait for a re-fetch.",
    "Prevents 'TTL-expiry latency spikes': no user ever waits for a cold miss on a high-traffic key.",
    "Wasted refresh problem: if a key was popular when cached but access drops, refreshes continue unnecessarily.",
    "Requires access-frequency tracking and a background refresh scheduler — more complex than simple TTL expiry.",
    "Best fit: high-traffic, predictably popular, slowly-changing content (homepage, top-N lists, product catalog).",
  ],

  questions: [
    { id: "rac-q1", question: "What is refresh-ahead caching?", answer: "A strategy that proactively refreshes cache entries before they expire so callers never experience a cache miss due to TTL expiry on popular data.", topic: "Caching", difficulty: "Beginner" },
    { id: "rac-q2", question: "How does refresh-ahead differ from TTL-based lazy expiry?", answer: "With lazy TTL expiry, the first request after expiry experiences a cache miss and waits for the DB fetch. With refresh-ahead, the refresh happens proactively in the background before the entry expires.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-q3", question: "What problem does refresh-ahead primarily solve?", answer: "TTL-expiry latency spikes — the brief period of elevated latency experienced by the first request after a cached entry expires, when the cache must synchronously fetch from the DB.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-q4", question: "What is the key cost or downside of refresh-ahead?", answer: "Wasted refreshes — entries that are refreshed but never re-requested (access dropped after caching) result in unnecessary DB queries.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-q5", question: "What type of data is refresh-ahead most effective for?", answer: "High-traffic, predictably popular, slowly-changing data — homepage content, trending posts, product catalog, top-N leaderboards.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-q6", question: "What type of data is refresh-ahead poorly suited for?", answer: "Data with unpredictable or highly variable access patterns — if access drops, the cache continues refreshing entries that nobody reads, wasting DB resources.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-q7", question: "What mechanism does a refresh-ahead cache use to decide when to pre-fetch?", answer: "It tracks access frequency per key and triggers a background refresh when the remaining TTL falls below a threshold (e.g. when 80% of the TTL has elapsed).", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q8", question: "What is the 'refresh threshold' in refresh-ahead caching?", answer: "The point in a TTL cycle at which a background refresh is triggered — e.g. when 70-80% of the TTL has elapsed. A key read past this threshold triggers an async re-fetch.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q9", question: "How does refresh-ahead handle a sudden drop in traffic to a previously popular key?", answer: "Poorly by default — it will continue refreshing the key until the next TTL expires without a refresh trigger. This is the 'wasted refresh' problem.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q10", question: "Can refresh-ahead be combined with write-through?", answer: "Yes — write-through handles cache updates on writes, and refresh-ahead handles proactive re-fetching as entries approach TTL expiry. Together they keep the cache continuously fresh.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q11", question: "How does refresh-ahead interact with the thundering herd problem?", answer: "Refresh-ahead prevents the thundering herd at TTL expiry — since only one background refresh is triggered (not one per concurrent caller hitting a miss), there's no stampede.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q12", question: "What's the simplest way to implement a basic refresh-ahead mechanism?", answer: "On each cache read, check the remaining TTL. If it falls below the refresh threshold, asynchronously spawn a background task to re-fetch and update the cache, while returning the still-valid cached value to the caller.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q13", question: "Is refresh-ahead suitable for a system where data changes unpredictably?", answer: "No — if the source data changes at unpredictable times, refresh-ahead may serve stale data right up until the pre-scheduled refresh, with no mechanism to detect that the source changed early.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-q14", question: "What's the difference between refresh-ahead and cache warming?", answer: "Cache warming is a one-time operation at startup to pre-populate the cache with known hot keys. Refresh-ahead is an ongoing background process that continuously keeps hot entries fresh throughout the lifecycle.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-q15", question: "What is the relationship between refresh-ahead and stale-while-revalidate (SWR)?", answer: "They're conceptually similar — SWR serves stale content immediately and triggers an async re-fetch in the background. Refresh-ahead does the re-fetch slightly earlier (before expiry) to avoid ever serving expired content.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q16", question: "What infrastructure is required for refresh-ahead that simple TTL caching doesn't need?", answer: "A background task scheduler or worker process, per-key access frequency tracking, and a refresh threshold configuration — significantly more complex than TTL-only expiry.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q17", question: "How would you set the refresh threshold for a 1-minute TTL entry?", answer: "Trigger a background refresh when 70-80% of TTL has elapsed (42-48 seconds in), giving 12-18 seconds for the refresh to complete before the entry would expire.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q18", question: "What is the 'staleness window' in refresh-ahead caching?", answer: "The gap between when source data changes and when the refresh-ahead cycle updates the cache — during this window, the cache serves slightly stale data. This window equals the refresh interval.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q19", question: "How does Netflix use refresh-ahead-style caching?", answer: "Netflix pre-computes and pre-caches personalized recommendations for users before they open the app, ensuring recommendations are instantly available without a cold compute on first load.", topic: "Caching", difficulty: "Advanced" },
    { id: "rac-q20", question: "Why might refresh-ahead be considered an 'eager' caching strategy?", answer: "Because it eagerly re-fetches data before it's actually needed (before expiry), as opposed to lazy strategies that only fetch when data is explicitly requested (on a miss).", topic: "Caching", difficulty: "Intermediate" },
  ],

  commonFollowUps: [
    "\"How do you set the refresh threshold, and what happens if you set it too low or too high?\"",
    "\"How would you measure whether refresh-ahead is actually worth the added DB load?\"",
    "\"How does refresh-ahead prevent the thundering herd at TTL expiry?\"",
    "\"Is refresh-ahead the same as stale-while-revalidate (SWR)?\"",
  ],

  commonMistakes: [
    "Recommending refresh-ahead for data with unpredictable access patterns — it wastes DB resources on entries nobody will re-read.",
    "Forgetting that refresh-ahead doesn't help if source data changes unexpectedly mid-TTL — it only helps with TTL-expiry misses, not invalidation misses.",
    "Setting the refresh threshold too aggressively (too early), causing constant refreshes that effectively bypass TTL entirely.",
  ],

  interviewTraps: [
    "\"Refresh-ahead eliminates staleness\" — No. There's always a staleness window between when source data changes and when the next refresh cycle runs.",
    "\"Refresh-ahead solves all cache miss latency\" — Only TTL-expiry misses. Cache cold-starts and invalidation-triggered misses still cause latency.",
  ],

  tradeoffs: [
    "Eliminates TTL-expiry latency spikes vs. wasted DB refreshes for data that went cold.",
    "Lower user-facing latency vs. higher background DB load.",
    "More operational complexity (tracking, scheduling) vs. simpler TTL-only expiry.",
  ],

  memoryTrick:
    "Refresh-Ahead = 'Refresh before you need it' — like a chef refilling salt shakers during a lull rather than waiting until the shaker is empty in front of a customer.",

  realWorldExamples: [
    "A news site pre-refreshes its homepage headline cache 30 seconds before the TTL expires, so no user ever sees a slow homepage load due to an expired cache entry.",
    "Netflix pre-computes personalized recommendation rows before users open the app — a refresh-ahead approach ensuring instant page loads even though personalization is expensive to compute.",
  ],

  mermaidDiagram: `flowchart TD
    A[Request comes in] --> B{Cache entry exists?}
    B -- No --> C[Fetch from DB, cache & return]
    B -- Yes --> D{TTL past refresh threshold?}
    D -- No --> E[Return cached value]
    D -- Yes --> F[Return cached value immediately]
    F --> G[Trigger async background refresh]
    G --> H[Fetch fresh value from DB]
    H --> I[Update cache with fresh value + new TTL]`,

  flashcards: [
    { id: "rac-fc1", front: "Refresh-Ahead Cache — one-line definition", back: "Proactively refreshes cache entries in the background before they expire, so callers never experience TTL-expiry cache misses.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-fc2", front: "What problem does refresh-ahead solve?", back: "TTL-expiry latency spikes — the slow cache miss experienced by the first caller after a popular entry expires.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-fc3", front: "What is the key cost of refresh-ahead?", back: "Wasted refreshes — entries refreshed proactively but never re-requested waste DB queries.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-fc4", front: "When does refresh-ahead NOT work well?", back: "Unpredictable access patterns — if access drops, the cache keeps refreshing entries nobody reads.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rac-fc5", front: "How is refresh-ahead related to stale-while-revalidate (SWR)?", back: "Both serve the current (possibly slightly stale) value immediately and re-fetch in the background. Refresh-ahead does the re-fetch before expiry; SWR does it after expiry but before the next read.", topic: "Caching", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Refresh-Ahead Cache",
    sections: [
      { heading: "How it works", items: ["Track TTL remaining per key", "When TTL < threshold, trigger async background refresh", "Caller gets current valid value immediately", "Background refresh updates entry before expiry"] },
      { heading: "Advantages", items: ["No TTL-expiry latency spikes for popular keys", "Prevents thundering herd at expiry", "Caller latency always fast (no waiting for DB fetch)"] },
      { heading: "Disadvantages", items: ["Wasted refreshes for cold keys", "Higher background DB load", "Complex to implement (scheduler + frequency tracking)"] },
      { heading: "Best for", items: ["Predictably popular, slowly-changing data", "Homepage, trending content, top-N lists", "Not for unpredictable access patterns"] },
    ],
  },

  speedNotes: [
    "Pre-fetches fresh data before TTL expires — caller never waits.",
    "Problem: wasted refreshes for data that went cold.",
    "Best for predictably popular, slowly-changing content.",
    "Prevents thundering herd at TTL expiry boundary.",
    "More complex than TTL expiry: needs scheduler + frequency tracking.",
  ],
};
