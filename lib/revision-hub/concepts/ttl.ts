import type { ConceptRevisionContent } from "./types";

export const ttl: ConceptRevisionContent = {
  slug: "ttl",
  title: "TTL (Time To Live)",
  topic: "Caching",
  difficulty: "Beginner",
  estimatedMinutes: 10,
  docLinks: [
    { label: "TTL Documentation", href: "/docs/caching/ttl" },
    { label: "Cache Invalidation", href: "/docs/caching/cache-invalidation" },
  ],
  summary: [
    "Time To Live (TTL) is a mechanism that limits the lifespan of data in a cache or network packet.",
    "In caching, TTL dictates how long an item remains valid before it is automatically deleted or marked stale.",
    "It acts as a passive form of cache invalidation.",
    "Setting the right TTL requires balancing data freshness against backend load.",
    "A very short TTL increases database hits, while a very long TTL risks serving outdated information."
  ],
  whyAsked: [
    "To see if you understand basic caching mechanisms and their limitations.",
    "To evaluate how you handle eventual consistency in a system design.",
    "To check if you can appropriately configure expiration times based on data characteristics."
  ],
  thirtySecondAnswer: "TTL (Time To Live) is the duration for which a cached record remains valid. Once the TTL expires, the data is evicted or ignored, and the next read will result in a cache miss, forcing a fetch from the primary database. It's the simplest way to prevent data from being cached forever, ensuring eventual consistency. However, finding the right TTL is a trade-off: too short and you lose the benefits of caching; too long and you serve stale data to users.",
  detailedAnswer: [
    "TTL is usually defined in seconds or milliseconds and attached to a specific key during the write operation.",
    "It provides a safety net, ensuring that even if active cache invalidation fails, stale data will eventually disappear.",
    "It helps manage cache size by naturally evicting older data, although it shouldn't replace a proper eviction policy.",
    "Different data types require different TTLs (e.g., user profiles might have hours, while live game scores might have seconds).",
    "Jitter (randomization) is often added to TTLs to prevent cache stampedes (where many keys expire at the exact same time)."
  ],
  questions: [
    { id: "ttl-q1", question: "What does TTL stand for?", answer: "Time To Live.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-q2", question: "What is the primary purpose of a TTL in caching?", answer: "To ensure cached data automatically expires and is refreshed.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-q3", question: "How does TTL act as passive invalidation?", answer: "Data is invalidated by time passing, not by an explicit delete event.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-q4", question: "What is TTL jitter?", answer: "Adding a small random variance to TTLs to prevent simultaneous expirations.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ttl-q5", question: "Why is TTL jitter important?", answer: "It prevents cache stampedes that can overwhelm the database.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ttl-q6", question: "What happens when you set a TTL of 0?", answer: "Usually means the data expires immediately or is never cached, depending on the system.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-q7", question: "What is the drawback of a very short TTL?", answer: "High cache miss rate, leading to heavy database load.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-q8", question: "What is the drawback of a very long TTL?", answer: "High risk of serving stale or incorrect data to users.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-q9", question: "Can TTL be used for session management?", answer: "Yes, session tokens often use TTL to automatically log out inactive users.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ttl-q10", question: "How is TTL different from an eviction policy?", answer: "TTL evicts based on absolute time; eviction policies evict based on cache fullness and access patterns.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ttl-q11", question: "What happens if a network packet's TTL reaches 0?", answer: "The router drops the packet to prevent infinite routing loops.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-q12", question: "How does Memcached handle expired TTL keys?", answer: "Lazy expiration: it deletes them when accessed or when space is needed.", topic: "Caching", difficulty: "Advanced" },
    { id: "ttl-q13", question: "How does Redis handle expired TTL keys?", answer: "It uses both passive (lazy on access) and active (random sampling in background) expiration.", topic: "Caching", difficulty: "Advanced" },
    { id: "ttl-q14", question: "Should static assets have short or long TTLs?", answer: "Long TTLs (e.g., 1 year) combined with versioned URLs.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ttl-q15", question: "Should a live sports scoreboard have a long TTL?", answer: "No, very short (e.g., 1-5 seconds) to keep data fresh.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-q16", question: "How do you implement soft TTL?", answer: "Data is considered stale but still served while asynchronously fetched in the background.", topic: "Caching", difficulty: "Advanced" },
    { id: "ttl-q17", question: "What is a thundering herd problem related to TTL?", answer: "Same as a cache stampede: many threads trying to refresh a popular expired key.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ttl-q18", question: "Can you change the TTL of an existing key in Redis?", answer: "Yes, using the EXPIRE command.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ttl-q19", question: "Is TTL a guarantee of deletion at the exact millisecond?", answer: "No, systems often delete lazily or in background cycles.", topic: "Caching", difficulty: "Advanced" },
    { id: "ttl-q20", question: "Why not just rely on active invalidation instead of TTL?", answer: "Active invalidation can fail (network issues, crashes). TTL is a fallback guarantee.", topic: "Caching", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How do you determine the optimal TTL for a given dataset?",
    "How do you fix a cache stampede caused by TTL expiry?",
    "Explain the difference between absolute TTL and sliding TTL (idle time)."
  ],
  commonMistakes: [
    "Using identical TTLs for millions of keys created at the same time.",
    "Relying solely on TTL for critical data that must be strongly consistent.",
    "Forgetting that TTL expiry causes a latency spike on the next read."
  ],
  interviewTraps: [
    "Suggesting TTL as the only way to invalidate cache in a financial system (where strong consistency is needed)."
  ],
  tradeoffs: [
    "Long TTL vs Short TTL: Long TTL = better performance but stale data. Short TTL = fresh data but worse performance."
  ],
  memoryTrick: "TTL: Tick Tock, Lost. (Time ticks away until the data is lost).",
  realWorldExamples: [
    "DNS records have TTLs so clients eventually query for updated IP addresses.",
    "User authentication sessions expiring after 30 minutes of inactivity."
  ],
  mermaidDiagram: `sequenceDiagram
    participant User
    participant Cache
    participant DB
    User->>Cache: Read Data (Key)
    alt Key Valid (within TTL)
        Cache-->>User: Return Data
    else Key Expired (past TTL)
        Cache-->>User: Miss
        User->>DB: Fetch Data
        DB-->>User: Return Data
        User->>Cache: Write Data + New TTL
    end`,
  flashcards: [
    { id: "ttl-fc1", front: "TTL", back: "Time To Live. Lifespan of a cached item.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-fc2", front: "TTL Jitter", back: "Adding random variance to prevent stampedes.", topic: "Caching", difficulty: "Intermediate" },
    { id: "ttl-fc3", front: "Passive Invalidation", back: "Invalidation via TTL expiry instead of events.", topic: "Caching", difficulty: "Beginner" },
    { id: "ttl-fc4", front: "Soft TTL", back: "Serving stale data while refreshing in background.", topic: "Caching", difficulty: "Advanced" },
    { id: "ttl-fc5", front: "Cache Stampede", back: "Database overload when a popular key expires.", topic: "Caching", difficulty: "Intermediate" }
  ],
  cheatSheet: {
    title: "TTL Basics",
    sections: [
      { heading: "Concept", items: ["Defines lifespan of data", "Passive invalidation", "Eventual consistency"] },
      { heading: "Best Practices", items: ["Add jitter to prevent stampedes", "Match TTL to data volatility", "Use soft TTL for high availability"] },
      { heading: "Trade-offs", items: ["Short TTL = higher DB load", "Long TTL = staler data"] }
    ]
  },
  speedNotes: [
    "Defines data lifespan.",
    "Automatic eviction.",
    "Balance freshness vs load.",
    "Use jitter for safety.",
    "Acts as fallback invalidation."
  ]
};
