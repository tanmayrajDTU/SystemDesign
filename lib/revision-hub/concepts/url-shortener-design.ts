import type { ConceptRevisionContent } from "./types";

export const urlShortenerDesign: ConceptRevisionContent = {
  slug: "url-shortener-design",
  title: "URL Shortener Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 30,
  docLinks: [
    { label: "URL Shortener Design", href: "/docs/case-studies/url-shortener" }
  ],
  summary: [
    "A URL shortener (like TinyURL or bit.ly) maps long URLs to short aliases.",
    "It requires generating unique short IDs, storing the mappings, and handling fast redirects.",
    "The system is extremely read-heavy (e.g., 100:1 read-to-write ratio).",
    "Key challenges include ensuring uniqueness of short URLs at scale and low-latency redirects.",
    "Common approaches for ID generation include hash + base62 encoding or an offline Key Generation Service (KGS)."
  ],
  whyAsked: [
    "It tests your ability to design a simple but highly scalable system.",
    "It evaluates your knowledge of encoding schemes (Base62) and database choices.",
    "It serves as a baseline to discuss caching, load balancing, and distributed ID generation."
  ],
  thirtySecondAnswer: "A URL shortener maps long URLs to short, unique aliases. At scale, the best approach is pre-generating unique IDs using a Key Generation Service (KGS) and encoding them in Base62. The system is extremely read-heavy, making it a perfect candidate for caching (Redis/Memcached). A NoSQL database like Cassandra or DynamoDB is ideal for storing the mappings due to high availability and scalability, though a relational database can work with sharding.",
  detailedAnswer: [
    "Requirements: Shorten URL, redirect from short to long URL, highly available, low latency.",
    "ID Generation: Use a Key Generation Service (KGS) to pre-generate unique IDs (e.g., using a database with auto-increment or ZooKeeper) to avoid collisions.",
    "Encoding: Base62 (a-z, A-Z, 0-9) is standard. A 7-character Base62 string provides ~3.5 trillion unique URLs.",
    "Storage: Relational database (MySQL) or NoSQL (Cassandra, DynamoDB). NoSQL is preferred for scale, but RDBMS works well for simple key-value lookups with caching.",
    "Caching: Implement aggressive caching (Redis) for reads since the read/write ratio is very high.",
    "Redirects: Return HTTP 301 (Permanent) to cache the redirect at the browser level, or 302 (Temporary) if tracking analytics is required."
  ],
  questions: [
    { id: "urls-q1", question: "What is the typical read-to-write ratio for a URL shortener?", answer: "Usually 100:1 or higher, meaning it is heavily read-bound.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "urls-q2", question: "Why use Base62 encoding for short URLs?", answer: "It uses only alphanumeric characters, avoiding special characters that can cause issues in URLs.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "urls-q3", question: "How many unique URLs can a 7-character Base62 string represent?", answer: "62^7, which is approximately 3.5 trillion.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "urls-q4", question: "What is the difference between an HTTP 301 and 302 redirect?", answer: "301 is permanent and cached by browsers; 302 is temporary and forces the browser to hit the server every time, useful for analytics.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "urls-q5", question: "How does a Key Generation Service (KGS) prevent collisions?", answer: "It pre-generates unique IDs in a database and marks them as used once assigned, ensuring no two servers assign the same ID.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "urls-q6", question: "What database would you choose for a URL shortener?", answer: "NoSQL like DynamoDB or Cassandra is great for scale, but a well-indexed relational database with caching also works well.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "urls-q7", question: "How do you handle custom short URLs (aliases)?", answer: "Check the database for uniqueness before assigning. If available, map it directly; if not, return an error.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "urls-q8", question: "What caching eviction policy is best for this system?", answer: "LRU (Least Recently Used), since a small subset of URLs will likely get the majority of traffic.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "urls-q9", question: "How do you purge old or expired URLs?", answer: "Use lazy cleanup (delete on read if expired) and a background job to periodically sweep the database.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "urls-q10", question: "How can you prevent abuse (e.g., spamming the creation API)?", answer: "Implement rate limiting based on IP address or API keys.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "urls-q11", question: "What happens if the KGS goes down?", answer: "The system cannot generate new URLs, but reads (redirects) will still work.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q12", question: "How do you scale the KGS?", answer: "Run multiple KGS servers, each requesting a block of IDs (e.g., 10,000 at a time) from a central coordinator like ZooKeeper.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q13", question: "Why not use a standard hash function (like MD5) directly?", answer: "MD5 produces a long string. Truncating it to 7 characters increases the risk of collisions, requiring collision-handling logic.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q14", question: "How do you design for high availability in the caching layer?", answer: "Use a distributed cache cluster (like Redis Cluster) with replication and automatic failover.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q15", question: "How would you structure the database schema?", answer: "A simple table: `id` (primary key, Base62), `long_url`, `created_at`, `expires_at`, `user_id`.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q16", question: "How do you track click analytics without slowing down redirects?", answer: "Send an asynchronous event (e.g., to Kafka) during the redirect process to be aggregated later.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q17", question: "What is the tradeoff of using 301 vs 302 redirects?", answer: "301 reduces server load but loses fine-grained analytics; 302 increases server load but captures every click.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q18", question: "How do you handle a massive traffic spike to a single short URL?", answer: "The caching layer (Redis) absorbs the spike. Ensure hot keys don't overwhelm a single cache node by adding local in-memory caches on the API servers.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q19", question: "How do you shard the database for URL mappings?", answer: "Shard by the short URL ID (hash-based partitioning) to ensure an even distribution of data.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-q20", question: "How do you handle malicious long URLs?", answer: "Integrate with a third-party API (like Google Safe Browsing) asynchronously or synchronously during creation.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you track analytics for each short URL?",
    "How do you handle malicious URLs or phishing links?",
    "How would you support custom aliases?",
    "How do you expire old URLs?"
  ],
  commonMistakes: [
    "Designing a complex hashing-and-collision-handling system instead of a simple pre-generated ID system (KGS).",
    "Not mentioning caching for a system that is 99% reads.",
    "Failing to discuss the difference between 301 and 302 redirects."
  ],
  interviewTraps: [
    "Ignoring the concurrency issues if multiple servers try to generate the same ID.",
    "Assuming MD5 or SHA-256 is sufficient without addressing collision handling and truncation."
  ],
  tradeoffs: [
    "301 Permanent Redirect vs 302 Temporary Redirect for analytics tracking.",
    "Generating IDs on the fly (complex collision handling) vs Pre-generating IDs via KGS (easier but requires a separate component).",
    "Relational DB (ACID, easier to query) vs NoSQL DB (better horizontal scaling)."
  ],
  memoryTrick: "KGS + Base62 + Redis + 302 = Scalable Shortener.",
  realWorldExamples: [
    "Bit.ly handles billions of clicks a month using distributed databases and heavy caching.",
    "TinyURL uses simple hashing and database lookups."
  ],
  mermaidDiagram: "flowchart LR\n    Client --> LB[Load Balancer]\n    LB --> API[API Servers]\n    API --> Cache[(Redis)]\n    API --> DB[(NoSQL/RDBMS)]\n    API --> KGS[Key Generation Service]",
  flashcards: [
    { id: "urls-fc1", front: "What is the typical encoding used for URL shorteners?", back: "Base62 (a-z, A-Z, 0-9).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "urls-fc2", front: "What HTTP status code is used for temporary redirects to track analytics?", back: "HTTP 302 Found.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "urls-fc3", front: "How many unique IDs can 7 characters of Base62 provide?", back: "62^7 (~3.5 trillion).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "urls-fc4", front: "What is a KGS?", back: "Key Generation Service; pre-generates unique IDs to prevent collisions.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "urls-fc5", front: "What caching policy is best for a URL shortener?", back: "LRU (Least Recently Used).", topic: "System Design Case Studies", difficulty: "Intermediate" }
  ],
  cheatSheet: {
    title: "URL Shortener Design Cheat Sheet",
    sections: [
      { heading: "Core Components", items: ["API Gateway", "Key Generation Service (KGS)", "Cache (Redis)", "Database (NoSQL/RDBMS)"] },
      { heading: "Key Metrics", items: ["100:1 Read-to-Write Ratio", "Base62 Encoding", "7 characters = 3.5T URLs"] },
      { heading: "Redirect Codes", items: ["301: Permanent (Browser Caches)", "302: Temporary (Server Tracks Analytics)"] }
    ]
  },
  speedNotes: [
    "Highly read-heavy system.",
    "Use Base62 encoding.",
    "KGS prevents collisions.",
    "Redis caches read requests.",
    "302 enables click tracking."
  ]
};
