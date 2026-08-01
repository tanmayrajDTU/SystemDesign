import type { ConceptRevisionContent } from "./types";

export const spotifyDesign: ConceptRevisionContent = {
  slug: "spotify-design",
  title: "Spotify Design (Audio Streaming Service)",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 45,
  docLinks: [
    { label: "Spotify System Design", href: "/docs/case-studies/spotify" }
  ],
  summary: [
    "Spotify is an audio streaming platform that requires low-latency playback.",
    "Audio files are stored in Object Storage and distributed globally via CDNs.",
    "Metadata (artist info, playlists) is cached aggressively using Redis/Memcached.",
    "Playback heavily relies on local device caching to hide network latency.",
    "A massive data pipeline processes telemetry for royalties, analytics, and recommendations."
  ],
  whyAsked: [
    "Assesses knowledge of Content Delivery Networks (CDNs) and streaming protocols.",
    "Evaluates handling of read-heavy systems with high availability.",
    "Tests understanding of decoupling critical paths from batch processing (analytics)."
  ],
  thirtySecondAnswer: "A Spotify clone requires storing audio files in Object Storage and distributing them via a CDN for low-latency global playback. Metadata (artists, playlists) is stored in a scalable database (like Cassandra or Postgres) and heavily cached. The client app caches audio locally to prevent buffering. For recommendations and royalties, massive data pipelines (Kafka + Hadoop/Spark) process playback events asynchronously.",
  detailedAnswer: [
    "Store media files (songs) in Object Storage (S3).",
    "Use a CDN (Cloudflare, CloudFront) to serve media files close to users.",
    "Store metadata in a highly available database (e.g., Cassandra for high read/write throughput).",
    "Cache metadata using Redis or Memcached to handle high read volumes.",
    "Implement client-side caching to pre-fetch upcoming tracks and allow offline playback.",
    "Use Kafka to ingest telemetry/play events, which are processed by stream/batch frameworks for royalties and recommendations."
  ],
  questions: [
    { id: "spfd-q1", question: "What are the core requirements of a Spotify clone?", answer: "Users must be able to search for music, play songs with no buffering, create playlists, and the system must track plays for royalties.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "spfd-q2", question: "Where should the actual song files be stored?", answer: "In Object Storage (like AWS S3) due to its high durability and scalability for large, immutable files.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "spfd-q3", question: "How do you ensure songs play without buffering?", answer: "Use Content Delivery Networks (CDNs) to cache songs at the edge, closer to users, and implement client-side caching/prefetching.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q4", question: "What streaming protocol should be used?", answer: "Adaptive Bitrate Streaming (like HLS or DASH) to adjust audio quality based on the user's current network bandwidth.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q5", question: "How do you store user playlists?", answer: "A NoSQL database like Cassandra or a sharded relational database, as playlists are highly requested and require fast reads/writes.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q6", question: "How do you track song plays for royalties?", answer: "Clients send playback events to an API gateway, which pushes them to a message queue (Kafka) for reliable, asynchronous processing.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "spfd-q7", question: "What happens if a user is offline but listens to a downloaded song?", answer: "The client stores playback events locally and syncs them to the backend when an internet connection is restored.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q8", question: "How would you handle search?", answer: "Use a specialized search engine like Elasticsearch, which indexes song metadata, artists, and playlists for fast, fuzzy searching.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q9", question: "Why heavily cache metadata?", answer: "Metadata (like artist name or album art) is read on every song load. Caching it in Redis reduces database load and lowers latency.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "spfd-q10", question: "How does Spotify handle extreme traffic spikes for new album releases?", answer: "By heavily pre-warming CDNs with the new album tracks and aggressively caching metadata in distributed in-memory caches.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "spfd-q11", question: "How does the client know what quality to stream?", answer: "The client continuously monitors buffer health and network speed, requesting different bitrate chunks from the CDN dynamically.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q12", question: "What is the purpose of Kafka in this system?", answer: "Kafka acts as a massive buffer/ingestion layer for telemetry and log data, decoupling the frontend from slow batch processing systems.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q13", question: "How are recommendations generated?", answer: "Play events in Kafka are processed by machine learning models (using Spark or Flink) to generate collaborative filtering matrices.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "spfd-q14", question: "How can you optimize database reads for a global user base?", answer: "Use read replicas deployed in multiple geographic regions, caching, and database partitioning/sharding by user or region.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q15", question: "How is audio DRM (Digital Rights Management) handled?", answer: "Songs are encrypted. When a user hits play, the client requests a decryption key from a DRM server, verifying the user's active subscription.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "spfd-q16", question: "How would you structure the user service?", answer: "A microservice managing authentication, subscription status, and basic profile data, backed by a relational database.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "spfd-q17", question: "What happens if the CDN goes down?", answer: "Clients fallback to fetching media directly from the origin object storage, though this would increase latency and origin load.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q18", question: "How do you manage concurrent playlist edits?", answer: "Use optimistic locking (version numbers) or last-write-wins (LWW) conflict resolution for collaborative playlists.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "spfd-q19", question: "How does the architecture scale for 100M active users?", answer: "Horizontal scaling of stateless web servers, extensive use of CDNs, microservices architecture, and sharded databases.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-q20", question: "Why is Cassandra often chosen for systems like Spotify?", answer: "Cassandra provides high availability, fault tolerance, and linear scalability, ideal for handling massive read/write volumes of user data across data centers.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How does the system ensure play counts are accurate and not artificially inflated by bots?",
    "How would you design the 'Spotify Wrapped' feature?",
    "How do you implement collaborative playlists?"
  ],
  commonMistakes: [
    "Serving audio files directly from app servers instead of CDNs.",
    "Synchronously processing play events for analytics instead of using an asynchronous queue (Kafka).",
    "Ignoring client-side caching and prefetching."
  ],
  interviewTraps: [
    "Focusing too much on the media storage and forgetting the massive scale of telemetry and logging required for royalties.",
    "Not differentiating between metadata caching (Redis) and media caching (CDN)."
  ],
  tradeoffs: [
    "Eventual vs Strong Consistency: Playlists and play counts can tolerate eventual consistency to achieve higher availability and lower latency.",
    "Storage vs Compute: Caching pre-computed recommendations costs storage but saves massive compute time on user login.",
    "Adaptive Bitrate: Higher quality increases user satisfaction but costs more in CDN egress fees and requires stronger networks."
  ],
  memoryTrick: "Think 'CDN for songs, Kafka for logs'. Media goes outward via CDNs, data comes inward via Kafka.",
  realWorldExamples: [
    "Spotify moved from a P2P streaming model to a strict client-server model via CDNs as bandwidth became cheaper.",
    "They heavily rely on Google Cloud Platform (GCP) for data analytics and BigQuery."
  ],
  mermaidDiagram: `flowchart TD
    Client -->|1. Stream Auth & Metadata| API[API Gateway]
    Client -->|2. Stream Audio| CDN[Content Delivery Network]
    CDN -->|Cache Miss| S3[(Object Storage)]
    
    API --> MetaService[Metadata Service]
    MetaService <--> Cache[(Redis Cache)]
    MetaService <--> DB[(Cassandra/DB)]
    
    Client -->|3. Send Play Events| Telemetry[Telemetry Service]
    Telemetry --> Kafka[Kafka Stream]
    Kafka --> Analytics[Analytics / Spark]`,
  flashcards: [
    { id: "spfd-fc1", front: "How are audio files delivered efficiently to users?", back: "Via Content Delivery Networks (CDNs) strategically located near edge networks.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "spfd-fc2", front: "How are play events handled to ensure royalties are paid?", back: "Sent asynchronously via Kafka to batch/stream processing pipelines.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-fc3", front: "What database is commonly used for song search?", back: "Elasticsearch, which allows fast, fuzzy text searching across millions of tracks.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-fc4", front: "What is Adaptive Bitrate Streaming?", back: "Dynamically adjusting the audio quality/bitrate based on the client's current network bandwidth.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "spfd-fc5", front: "Why is Cassandra suitable for Spotify's metadata?", back: "It offers high availability, multi-datacenter replication, and handles massive read/write throughput.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Spotify Design Cheat Sheet",
    sections: [
      { heading: "Media Delivery", items: ["Object Storage (S3)", "CDN (Edge)", "Adaptive Bitrate", "Client Cache"] },
      { heading: "Metadata & Search", items: ["Cassandra/Postgres", "Redis Cache", "Elasticsearch"] },
      { heading: "Data Pipeline", items: ["Kafka ingestion", "Spark/Hadoop for ML", "Eventual consistency"] }
    ]
  },
  speedNotes: [
    "Store audio in S3.",
    "Serve audio via CDN.",
    "Cache metadata in Redis.",
    "Ingest logs via Kafka.",
    "Use Elasticsearch for search."
  ]
};
