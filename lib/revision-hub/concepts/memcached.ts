import type { ConceptRevisionContent } from "./types";

export const memcached: ConceptRevisionContent = {
  slug: "memcached",
  title: "Memcached",
  topic: "Caching",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Memcached", href: "/docs/caching/memcached" },
    { label: "Why Cache?", href: "/docs/caching/why-cache" },
  ],
  summary: [
    "Memcached is a high-performance, distributed memory object caching system.",
    "It is primarily used to speed up dynamic web applications by alleviating database load.",
    "Data is stored as simple key-value pairs in memory.",
    "It uses a multithreaded architecture, making it extremely efficient for simple, concurrent read/write operations.",
    "It does not provide data persistence or advanced data structures like Redis does.",
  ],
  whyAsked: [
    "To test your understanding of in-memory caching systems.",
    "To see if you know when to choose Memcached over Redis (simplicity vs features).",
    "To evaluate your knowledge of multithreaded caching architectures.",
  ],
  thirtySecondAnswer: "Memcached is a simple, ultra-fast, distributed in-memory key-value store used primarily as a cache to speed up applications. It shines in its simplicity and multithreaded performance, making it ideal for caching strings or objects (like HTML fragments or database results) where advanced data structures and disk persistence are not needed.",
  detailedAnswer: [
    "Memcached stores data purely in RAM; if the server restarts, data is lost.",
    "It employs an LRU (Least Recently Used) cache eviction policy by default.",
    "Unlike Redis, Memcached is multithreaded out of the box, easily utilizing multiple CPU cores.",
    "It is extremely effective for caching large, unstructured chunks of data like full page caches or API responses.",
    "Horizontal scaling is achieved via client-side consistent hashing to distribute keys across multiple Memcached nodes.",
  ],
  questions: [
    { id: "mcd-q1", question: "What is Memcached?", answer: "A high-performance, distributed, in-memory key-value caching system.", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-q2", question: "Is Memcached single-threaded or multi-threaded?", answer: "Multi-threaded.", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-q3", question: "Does Memcached support data persistence?", answer: "No, it is purely in-memory. Data is lost on restart.", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-q4", question: "What data types does Memcached support?", answer: "It primarily supports strings (which can hold serialized objects).", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-q5", question: "What is the default eviction policy in Memcached?", answer: "Least Recently Used (LRU).", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-q6", question: "How does Memcached handle distributed nodes?", answer: "Nodes are unaware of each other; distribution is handled by the client (usually via consistent hashing).", topic: "Caching", difficulty: "Intermediate" },
    { id: "mcd-q7", question: "When would you choose Memcached over Redis?", answer: "When you need a simple string cache, maximum multi-core CPU utilization, and don't need persistence or complex data types.", topic: "Caching", difficulty: "Intermediate" },
    { id: "mcd-q8", question: "What is the maximum size of a key in Memcached?", answer: "250 bytes.", topic: "Caching", difficulty: "Intermediate" },
    { id: "mcd-q9", question: "What is the default maximum size of a value in Memcached?", answer: "1 Megabyte.", topic: "Caching", difficulty: "Intermediate" },
    { id: "mcd-q10", question: "How does slab allocation work in Memcached?", answer: "Memory is divided into slabs of different sizes to avoid memory fragmentation when storing items.", topic: "Caching", difficulty: "Advanced" },
    { id: "mcd-q11", question: "What is the Thundering Herd problem in caching?", answer: "When a popular cache key expires, and numerous requests hit the database simultaneously to regenerate it.", topic: "Caching", difficulty: "Intermediate" },
    { id: "mcd-q12", question: "How can you prevent the Thundering Herd problem?", answer: "By using probabilistic early expiration or mutex locks when regenerating cache.", topic: "Caching", difficulty: "Advanced" },
    { id: "mcd-q13", question: "What happens if a Memcached node crashes in a distributed setup?", answer: "The keys hashed to that node result in cache misses, and the load falls back to the database until the cache is repopulated on another node.", topic: "Caching", difficulty: "Intermediate" },
    { id: "mcd-q14", question: "Does Memcached support replication?", answer: "No, it does not have built-in replication or high availability features like Redis Sentinel.", topic: "Caching", difficulty: "Intermediate" },
    { id: "mcd-q15", question: "What is the CAS (Check-And-Set) operation?", answer: "An optimistic locking mechanism to prevent race conditions when updating a cache key.", topic: "Caching", difficulty: "Advanced" },
    { id: "mcd-q16", question: "Why is multithreading a major advantage for Memcached?", answer: "It allows a single Memcached instance to scale up efficiently on multi-core servers without running multiple instances.", topic: "Caching", difficulty: "Advanced" },
    { id: "mcd-q17", question: "Can Memcached evict items before their TTL expires?", answer: "Yes, if the memory is full, it will evict older items based on LRU.", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-q18", question: "How is memory fragmentation handled in Memcached?", answer: "Through slab allocation; items are grouped into chunks of similar sizes.", topic: "Caching", difficulty: "Advanced" },
    { id: "mcd-q19", question: "What is the typical port for Memcached?", answer: "11211.", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-q20", question: "Is Memcached good for session storage?", answer: "Only if you can tolerate losing sessions on restart; otherwise, Redis is better due to persistence.", topic: "Caching", difficulty: "Intermediate" },
  ],
  commonFollowUps: [
    "How would you scale Memcached?",
    "Explain slab allocation and how it prevents memory fragmentation.",
    "Compare Memcached's threading model with Redis.",
  ],
  commonMistakes: [
    "Using Memcached for critical data that cannot be lost.",
    "Expecting Memcached nodes to synchronize with each other automatically.",
    "Trying to store very large objects (>1MB) without configuring it.",
  ],
  interviewTraps: [
    "Assuming Memcached is exactly like Redis. It lacks data structures, persistence, and replication.",
    "Forgetting that Memcached distribution is client-side, not server-side.",
  ],
  tradeoffs: [
    "Simplicity vs Features: Memcached is incredibly easy to set up and fast, but lacks data types and persistence.",
    "Multi-threaded scaling vs Single-threaded predictability.",
  ],
  comparisonTable: {
    title: "Memcached vs Redis",
    columns: ["Feature", "Memcached", "Redis"],
    rows: [
      { label: "Architecture", values: ["Multi-threaded", "Single-threaded (primarily)"] },
      { label: "Data Types", values: ["Strings, Objects (serialized)", "Strings, Lists, Sets, Hashes, etc."] },
      { label: "Persistence", values: ["No", "Yes (RDB, AOF)"] },
      { label: "Replication", values: ["No built-in replication", "Master-slave, Sentinel, Cluster"] },
      { label: "Use Case", values: ["Simple, ultra-fast caching", "Caching, message queues, leaderboards"] },
    ],
  },
  memoryTrick: "Memcached is like a giant, super-fast, multi-threaded RAM disk that forgets everything when you pull the plug.",
  realWorldExamples: [
    "Facebook uses heavily customized Memcached clusters to scale its massive read operations.",
    "Wikipedia uses Memcached to serve rendered HTML pages quickly.",
  ],
  mermaidDiagram: `flowchart LR
    Client --> |Hash(key1)| Node1[Memcached Node 1]
    Client --> |Hash(key2)| Node2[Memcached Node 2]
    Client --> |Hash(key3)| Node3[Memcached Node 3]
    Node1 -.-> |Cache Miss| DB[(Database)]
    Node2 -.-> |Cache Miss| DB
    Node3 -.-> |Cache Miss| DB`,
  flashcards: [
    { id: "mcd-fc1", front: "Is Memcached multi-threaded?", back: "Yes, it can efficiently utilize multi-core CPUs natively.", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-fc2", front: "Does Memcached support data persistence?", back: "No, it is strictly an in-memory cache.", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-fc3", front: "How is data distributed across Memcached nodes?", back: "Via the client, typically using consistent hashing. Nodes do not talk to each other.", topic: "Caching", difficulty: "Intermediate" },
    { id: "mcd-fc4", front: "What is Memcached's default eviction policy?", back: "LRU (Least Recently Used).", topic: "Caching", difficulty: "Beginner" },
    { id: "mcd-fc5", front: "How does Memcached manage memory to avoid fragmentation?", back: "Using Slab Allocation, which divides memory into chunks of predetermined sizes.", topic: "Caching", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "Memcached Cheat Sheet",
    sections: [
      {
        heading: "Core Characteristics",
        items: [
          "In-memory only (volatile).",
          "Key-value store (mostly strings).",
          "Multi-threaded.",
        ],
      },
      {
        heading: "Architecture",
        items: [
          "Client-side distribution.",
          "Slab allocation for memory management.",
          "LRU eviction.",
        ],
      },
      {
        heading: "Best Used For",
        items: [
          "Simple caching of HTML fragments or DB queries.",
          "Systems requiring massive multithreaded throughput per node.",
        ],
      },
    ],
  },
  speedNotes: [
    "Purely in-memory, volatile.",
    "Multi-threaded performance.",
    "Client-side consistent hashing.",
    "Slab allocation manages memory.",
    "No persistence, no replication.",
  ],
};
