import type { ConceptRevisionContent } from "./types";

export const redis: ConceptRevisionContent = {
  slug: "redis",
  title: "Redis",
  topic: "Caching",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Redis Deep Dive", href: "/docs/caching/redis" },
    { label: "Why Cache?", href: "/docs/caching/why-cache" },
  ],
  summary: [
    "Redis (Remote Dictionary Server) is an open-source, in-memory key-value data store.",
    "It is primarily used as a high-performance cache, but also functions as a database, message broker, and streaming engine.",
    "Redis supports complex data structures like Strings, Hashes, Lists, Sets, and Sorted Sets.",
    "It operates primarily on a single-threaded event loop, making it incredibly fast and avoiding lock contention.",
    "Redis offers persistence via RDB (snapshots) and AOF (Append Only File), and high availability via Redis Sentinel and Cluster."
  ],
  whyAsked: [
    "Redis is the most ubiquitous caching technology in modern system design.",
    "Interviewers want to know if you understand when to use Redis vs Memcached or a traditional DB.",
    "To test your knowledge of in-memory constraints, single-threaded architectures, and persistence tradeoffs."
  ],
  thirtySecondAnswer: "Redis is an incredibly fast, in-memory data store widely used for caching, session management, and real-time analytics. Unlike basic caches, it supports complex data structures like Sorted Sets (great for leaderboards) and Hashes. It's single-threaded, avoiding race conditions, and can handle millions of requests per second. It also supports persistence (RDB/AOF) to survive restarts, and scales via Redis Cluster. You use it when you need sub-millisecond latency for complex data manipulation.",
  detailedAnswer: [
    "Single-Threaded Model: Redis processes commands sequentially using an I/O multiplexing model (epoll). This makes atomic operations easy.",
    "Data Structures: Beyond strings, Redis provides Sets (uniqueness), Sorted Sets (leaderboards), Lists (queues), Hashes (objects), and Bitmaps (analytics).",
    "Persistence: RDB takes point-in-time snapshots; AOF logs every write operation. You can combine them for durability.",
    "Replication & HA: Supports leader-follower replication. Redis Sentinel provides automatic failover, while Redis Cluster provides horizontal sharding.",
    "Eviction: Supports multiple eviction policies, including approximated LRU, LFU, and random, configurable based on workload."
  ],
  questions: [
    { id: "rds-q1", question: "What is Redis?", answer: "An open-source, in-memory, key-value data store used as a cache, DB, and message broker.", topic: "Caching", difficulty: "Beginner" },
    { id: "rds-q2", question: "Is Redis single-threaded or multi-threaded?", answer: "Primarily single-threaded for command execution, though modern versions use threads for background I/O.", topic: "Caching", difficulty: "Beginner" },
    { id: "rds-q3", question: "Why is Redis single-threaded?", answer: "To avoid context switching and lock contention, ensuring predictable high performance.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q4", question: "What are the common data types in Redis?", answer: "Strings, Lists, Sets, Sorted Sets, Hashes, Bitmaps, HyperLogLog.", topic: "Caching", difficulty: "Beginner" },
    { id: "rds-q5", question: "What is a Sorted Set in Redis used for?", answer: "Leaderboards, rate limiting, and priority queues. Elements are ordered by a score.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q6", question: "What is Redis RDB?", answer: "Redis Database Backup: point-in-time snapshots of your dataset saved to disk.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q7", question: "What is Redis AOF?", answer: "Append Only File: logs every write operation received by the server for durability.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q8", question: "Which persistence is faster to recover from, RDB or AOF?", answer: "RDB is much faster to load into memory on startup.", topic: "Caching", difficulty: "Advanced" },
    { id: "rds-q9", question: "What is the difference between Redis and Memcached?", answer: "Redis supports complex data types and persistence; Memcached is string-only and strictly volatile.", topic: "Caching", difficulty: "Beginner" },
    { id: "rds-q10", question: "What is Redis Sentinel?", answer: "A system designed to provide high availability, monitoring, and automatic failover for Redis.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q11", question: "What is Redis Cluster?", answer: "A distributed implementation that partitions data across multiple Redis nodes.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q12", question: "How does Redis handle transactions?", answer: "Using MULTI, EXEC, DISCARD, and WATCH commands, though they don't support rollbacks on failure.", topic: "Caching", difficulty: "Advanced" },
    { id: "rds-q13", question: "What happens if a long-running command (like KEYS *) runs in Redis?", answer: "It blocks the single thread, causing all other operations to queue up and increasing latency.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q14", question: "What command should you use instead of KEYS *?", answer: "SCAN, which iterates through keys incrementally without blocking.", topic: "Caching", difficulty: "Advanced" },
    { id: "rds-q15", question: "How does Redis implement Pub/Sub?", answer: "Clients subscribe to channels, and publishers push messages; messages are fire-and-forget.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q16", question: "What is a HyperLogLog in Redis?", answer: "A probabilistic data structure used to estimate unique elements in a set using very little memory.", topic: "Caching", difficulty: "Advanced" },
    { id: "rds-q17", question: "Can Redis be used as a primary database?", answer: "Yes, but data must fit in RAM and you must configure persistence (AOF) appropriately.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-q18", question: "How does Redis approximate LRU?", answer: "It randomly samples a few keys and evicting the one with the oldest access time.", topic: "Caching", difficulty: "Advanced" },
    { id: "rds-q19", question: "What is Redis pipelining?", answer: "Sending multiple commands to the server in a single network trip to save latency.", topic: "Caching", difficulty: "Advanced" },
    { id: "rds-q20", question: "What is the max size of a Redis string?", answer: "512 MB.", topic: "Caching", difficulty: "Beginner" }
  ],
  commonFollowUps: [
    "How would you build a real-time leaderboard using Redis?",
    "Explain how Redis Cluster handles node failures.",
    "If memory is full and eviction policy is noeviction, what happens on the next write?"
  ],
  commonMistakes: [
    "Running `KEYS *` in production, which blocks the entire database.",
    "Using Redis just to store simple strings when Memcached might suffice and use less memory.",
    "Assuming Redis transactions roll back like SQL transactions (they do not)."
  ],
  interviewTraps: [
    "Forgetting that all Redis data must fit entirely in RAM.",
    "Assuming Redis Pub/Sub provides message durability like Kafka (it doesn't; messages are lost if subscribers are offline)."
  ],
  tradeoffs: [
    "RDB vs AOF: RDB is compact and fast to load, but loses recent data on crash. AOF is durable but slower and takes more disk space.",
    "Single-threaded vs Multi-threaded: Single-thread ensures safety and no locks, but cannot scale vertically across multiple CPU cores natively."
  ],
  memoryTrick: "Redis = Remote Dictionary Server. (Think of it as a giant, incredibly fast, persistent HashMap in the sky).",
  realWorldExamples: [
    "Twitter uses Redis to cache user timelines and serve them in milliseconds.",
    "Gaming companies use Redis Sorted Sets to maintain massive real-time leaderboards."
  ],
  mermaidDiagram: `flowchart TD
    A[Client] -->|Read/Write| B(Redis Master)
    B -->|Async Replication| C(Redis Replica 1)
    B -->|Async Replication| D(Redis Replica 2)
    E[Redis Sentinel] -.->|Monitors| B
    E -.->|Monitors| C
    E -.->|Monitors| D`,
  flashcards: [
    { id: "rds-fc1", front: "Single-Threaded", back: "Redis uses one thread for commands. No locks, very fast.", topic: "Caching", difficulty: "Beginner" },
    { id: "rds-fc2", front: "Sorted Set", back: "Data structure ordered by score. Perfect for leaderboards.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-fc3", front: "RDB", back: "Redis snapshot persistence. Fast but loses recent data.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-fc4", front: "AOF", back: "Append Only File. Logs every write. Durable but large.", topic: "Caching", difficulty: "Intermediate" },
    { id: "rds-fc5", front: "SCAN vs KEYS", back: "Use SCAN to safely iterate keys without blocking the thread.", topic: "Caching", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Redis Essentials",
    sections: [
      { heading: "Architecture", items: ["In-memory", "Single-threaded", "Event-driven"] },
      { heading: "Data Types", items: ["Strings, Hashes, Lists", "Sets, Sorted Sets", "Bitmaps, HyperLogLog"] },
      { heading: "Scaling", items: ["Replication (Master-Slave)", "Sentinel (HA)", "Cluster (Sharding)"] }
    ]
  },
  speedNotes: [
    "In-memory key-value store.",
    "Single-threaded event loop.",
    "Supports advanced data structures.",
    "RDB (snapshot) + AOF (log).",
    "Never run KEYS * in production."
  ]
};
