import type { ConceptRevisionContent } from "./types";

export const instagramDesign: ConceptRevisionContent = {
  slug: "instagram-design",
  title: "Instagram Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 45,
  docLinks: [
    { label: "Instagram Design", href: "/docs/case-studies/instagram" }
  ],
  summary: [
    "Instagram is a highly visual, read-heavy social network focusing on photos, videos, and feeds.",
    "The core challenge is generating and delivering personalized news feeds efficiently to millions of users.",
    "It requires massive object storage for media and a highly optimized graph/relational database for followers.",
    "Feed generation uses a mix of push (fanout-on-write) and pull (fanout-on-read) models.",
    "Caching is heavily utilized at every layer to handle the 100:1 read-to-write ratio."
  ],
  whyAsked: [
    "Evaluates your understanding of feed generation algorithms and fanout architectures.",
    "Tests your ability to design hybrid architectures for celebrities vs normal users.",
    "Requires knowledge of CDN integration and media storage."
  ],
  thirtySecondAnswer: "Designing Instagram involves media storage (S3 + CDNs), metadata storage (Sharded Postgres/Cassandra), and a complex feed generation system. Since it's read-heavy, aggressive caching via Redis/Memcached is critical. For feed generation, a hybrid approach is best: push new posts to the feeds of users with small follower counts (fanout-on-write), but force followers of celebrities to pull posts (fanout-on-read) to avoid massive write spikes.",
  detailedAnswer: [
    "Storage: Photos and videos are stored in Object Storage (S3) and served via globally distributed CDNs.",
    "Metadata: Use a sharded relational DB (PostgreSQL) or NoSQL (Cassandra) to store user profiles, post metadata, and follower graphs.",
    "Feed Generation (Push/Fanout-on-Write): When a user posts, the system pre-computes the feed by pushing the post ID to all followers' in-memory feed queues (Redis). Fast reads, heavy writes.",
    "Feed Generation (Pull/Fanout-on-Read): Used for celebrities. Generating feeds for millions of followers on write is too slow. Instead, clients pull the celebrity's posts at read time and merge them into their feed.",
    "Hybrid Fanout: Instagram uses a hybrid model. Push for normal users, pull for celebrities.",
    "Caching: Cache heavily at the database layer (user data), feed layer (Redis lists), and media layer (CDN)."
  ],
  questions: [
    { id: "igd-q1", question: "What is the primary characteristic of Instagram's workload?", answer: "It is extremely read-heavy, with users viewing feeds vastly more often than they post.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "igd-q2", question: "Where are photos and videos stored?", answer: "In Object Storage (like S3), and cached globally on CDNs.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "igd-q3", question: "What is Fanout-on-Write (Push model)?", answer: "When a user posts, the system immediately pushes the post to the feeds of all their followers.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "igd-q4", question: "What is Fanout-on-Read (Pull model)?", answer: "The feed is computed on the fly when the user opens the app, pulling recent posts from all the people they follow.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "igd-q5", question: "Why doesn't Fanout-on-Write work for celebrities?", answer: "Pushing a single post to 100 million followers causes a massive write spike (thundering herd) and delays.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "igd-q6", question: "How does the Hybrid Feed Generation model work?", answer: "Use push for normal users. For celebrities, don't push; instead, the system pulls their posts at read-time and merges them with the user's pre-computed push feed.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "igd-q7", question: "How do you store the follower/following relationship?", answer: "Using a graph database or a highly optimized relational database table (e.g., FollowerID, FolloweeID) that is properly indexed and sharded.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "igd-q8", question: "How are user feeds stored in memory?", answer: "Often using Redis Lists or Sorted Sets, keyed by UserID, containing a list of Post IDs.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "igd-q9", question: "Why do we store Post IDs in the Redis feed instead of full post data?", answer: "To save memory. The client fetches the Post IDs and then queries a separate cache/DB for the actual post metadata and images.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q10", question: "How do you shard the relational database for user metadata?", answer: "Shard by UserID so all metadata (profile, posts) for a specific user resides on the same shard.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q11", question: "What is the problem with sharding by UserID?", answer: "Hot partitions. A celebrity's shard will receive massively more traffic than a normal user's shard.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q12", question: "How do you mitigate hot partitions for celebrities?", answer: "Heavy application-level caching (Memcached/Redis) in front of the database for celebrity profiles and posts.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q13", question: "How do you handle generating unique Post IDs at Instagram scale?", answer: "Use a distributed ID generator (like Snowflake) or DB auto-increment with logical shards (Instagram's actual older approach).", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q14", question: "How do you support Infinite Scroll?", answer: "Use cursor-based pagination (e.g., passing the ID or timestamp of the last seen post) rather than offset-based pagination.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q15", question: "How do you handle reliable photo uploads?", answer: "Upload the photo asynchronously directly to S3. Once successful, S3 triggers an event to update the backend metadata DB.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q16", question: "How would you design the 'Explore' tab?", answer: "It requires offline batch processing (Hadoop/Spark) and machine learning models to analyze user interactions and generate personalized recommendations, stored in a separate cache.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q17", question: "How do you handle Story expiration after 24 hours?", answer: "Set a TTL (Time To Live) in the NoSQL database or Redis, and run background sweepers to permanently delete expired media from object storage.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q18", question: "What happens if a user's feed Redis node crashes?", answer: "The feed must be rebuilt by falling back to the database, querying the 'following' list and fetching their most recent posts.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q19", question: "How do you ensure low latency for users globally?", answer: "Deploy the app in multiple regions, replicate user data geographically, and aggressively use CDNs for media.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-q20", question: "How are notifications handled?", answer: "Through a message queue (Kafka) that feeds into a Notification Service, which then pushes via APNs/FCM.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How does the system change to support Instagram Stories?",
    "How do you rank the feed (algorithmic instead of chronological)?",
    "How do you implement the Explore tab?",
    "How do you handle a celebrity posting a photo?"
  ],
  commonMistakes: [
    "Choosing only Fanout-on-Write and failing to address the celebrity problem.",
    "Storing full post metadata inside the Redis feed instead of just Post IDs.",
    "Using offset pagination (`LIMIT 10 OFFSET 100`) which performs poorly at scale and skips items if new posts arrive."
  ],
  interviewTraps: [
    "Forgetting that generating feeds on the fly (Fanout-on-Read) for everyone is too slow.",
    "Not mentioning CDNs; you cannot serve massive images directly from an API server."
  ],
  tradeoffs: [
    "Fanout-on-Write (Fast reads, slow writes) vs Fanout-on-Read (Slow reads, fast writes).",
    "Chronological Feed (easier to implement via queues) vs Algorithmic Feed (heavy ML processing on read/write).",
    "Relational DB (ACID, complex joins for graphs) vs Graph DB (Neo4j, native relationships but harder to scale)."
  ],
  memoryTrick: "Hybrid Fanout + Redis Feed + S3/CDN + Cursor Pagination.",
  realWorldExamples: [
    "Instagram uses heavily sharded PostgreSQL for metadata.",
    "Twitter uses a very similar hybrid fanout architecture for timelines."
  ],
  mermaidDiagram: "flowchart LR\n    Client --> API[API Gateway]\n    Client -.-> CDN[CDN]\n    API --> PostService[Post Service]\n    PostService --> DB[(Metadata DB)]\n    PostService --> Fanout[Fanout Workers]\n    Fanout --> Redis[(Redis Feed Cache)]\n    API --> FeedService[Feed Service]\n    FeedService --> Redis",
  flashcards: [
    { id: "igd-fc1", front: "What is Fanout-on-Write?", back: "Pushing a new post directly to the in-memory feeds of all followers.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "igd-fc2", front: "Why is Fanout-on-Write bad for celebrities?", back: "It causes massive write spikes and delays (the thundering herd problem).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "igd-fc3", front: "What is the hybrid feed approach?", back: "Push posts for normal users, pull posts for celebrities at read time.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "igd-fc4", front: "What is the best way to paginate a feed?", back: "Cursor-based pagination to ensure consistent results and good performance.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "igd-fc5", front: "What is stored in the Redis feed cache?", back: "Only a list of Post IDs, not the full post data, to save memory.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Instagram Design Cheat Sheet",
    sections: [
      { heading: "Feed Generation", items: ["Push: Fanout-on-write (Normal)", "Pull: Fanout-on-read (Celebs)", "Hybrid Model"] },
      { heading: "Data Storage", items: ["Media: S3 + CDN", "Metadata: Sharded RDBMS", "Feeds: Redis Lists/Sets"] },
      { heading: "Key Techniques", items: ["Cursor Pagination", "Async Uploads", "Aggressive Caching"] }
    ]
  },
  speedNotes: [
    "Read-heavy image network.",
    "Hybrid fanout for feeds.",
    "Redis for fast feed retrieval.",
    "CDNs for global image delivery.",
    "Cursor-based pagination."
  ]
};
