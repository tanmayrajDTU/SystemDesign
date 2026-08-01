import type { ConceptRevisionContent } from "./types";

export const discordDesign: ConceptRevisionContent = {
  slug: "discord-design",
  title: "Discord Design (Real-time Messaging & Voice)",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 50,
  docLinks: [
    { label: "Discord System Design", href: "/docs/case-studies/discord" }
  ],
  summary: [
    "Discord is a real-time communication platform supporting text, voice, and video.",
    "It heavily utilizes WebSockets for pushing real-time events to connected clients.",
    "The system is organized around 'Guilds' (servers), 'Channels', and 'Users'.",
    "Messages are stored in a distributed database like ScyllaDB or Cassandra.",
    "Voice and video rely on WebRTC, with dedicated Selective Forwarding Units (SFUs) for routing.",
    "Presence (online/offline status) is a major scaling challenge handled by dedicated services."
  ],
  whyAsked: [
    "Tests knowledge of WebSockets and persistent bidirectional connections.",
    "Evaluates handling of massive fan-out (sending one message to millions in a large server).",
    "Assesses understanding of NoSQL database schema design for time-series/chat data."
  ],
  thirtySecondAnswer: "Designing Discord involves managing persistent WebSocket connections via a Gateway service to push events. When a user sends a message, it hits an API layer, is saved to a NoSQL database (ScyllaDB/Cassandra) partitioned by ChannelID, and then routed via a message broker (Redis Pub/Sub or Kafka) back to the Gateways holding connections for that channel's users. Voice/video uses WebRTC routed through SFUs. Presence is isolated into a separate high-throughput service.",
  detailedAnswer: [
    "Use a Gateway Service to maintain millions of concurrent WebSocket connections.",
    "Route text messages through stateless API servers, which write to the database and publish to an event bus.",
    "Store messages in Cassandra/ScyllaDB, partitioning data by `channel_id` to keep channel history contiguous.",
    "Use Redis Pub/Sub for routing real-time messages to the correct Gateway instances.",
    "Implement Selective Forwarding Units (SFUs) for multi-party voice/video calls (WebRTC).",
    "Isolate the Presence Service (online status) as it generates far more traffic than messaging itself."
  ],
  questions: [
    { id: "dscd-q1", question: "What are the core features of Discord?", answer: "Real-time text chat in channels, voice/video calls, and tracking user presence (online status).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dscd-q2", question: "How do clients receive messages instantly?", answer: "Clients maintain a persistent WebSocket connection to a Gateway server, which pushes events to them.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dscd-q3", question: "How do you scale WebSocket connections?", answer: "Use a load balancer to distribute connections across many Gateway instances. Each Gateway holds tens of thousands of connections.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q4", question: "What database is best for storing chat messages?", answer: "A wide-column NoSQL store like Cassandra or ScyllaDB, as chat is heavily write-oriented and naturally ordered by time.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q5", question: "How should chat messages be partitioned in the database?", answer: "Partition by `channel_id` and sort by `message_id` (Snowflake ID). This makes loading a channel's history extremely fast.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q6", question: "What happens if a channel gets too large (e.g., millions of messages)?", answer: "You must use bucketed partitioning (e.g., `channel_id` + `time_bucket`) to prevent the partition from growing too large (a 'fat partition').", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dscd-q7", question: "How are messages routed to the correct users?", answer: "When a message is saved, the API server publishes it to Redis Pub/Sub. Gateways subscribe to channels for their connected users and push the message down the WebSockets.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dscd-q8", question: "How do you handle 'Presence' (online/offline status)?", answer: "Presence is extremely noisy. Use a dedicated Presence Service that batches updates and uses a key-value store (Redis) to track active sessions.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dscd-q9", question: "Why not use WebRTC Peer-to-Peer (P2P) for voice channels?", answer: "P2P doesn't scale for group calls (N^2 connections). Discord uses SFUs (Selective Forwarding Units) where clients send 1 stream to the server, and the server routes it to others.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q10", question: "What is the fan-out problem in Discord?", answer: "If someone sends a message in a server with 1 million users, the system must generate and route 1 million WebSocket events instantly.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dscd-q11", question: "How do you generate unique message IDs?", answer: "Use a Snowflake ID generator (Timestamp + Worker ID + Sequence) to ensure IDs are globally unique and time-sortable.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q12", question: "How do you handle offline users receiving missed messages?", answer: "When a user reconnects, their client fetches the delta of messages from the database using the ID of the last message they received.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q13", question: "How are images and attachments handled?", answer: "Uploaded to Object Storage (S3), with a CDN in front. The chat message only contains the URL to the image.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dscd-q14", question: "How do you implement search?", answer: "Messages are asynchronously indexed into Elasticsearch. Searching hits Elasticsearch to find message IDs, then hydrates from the DB if necessary.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q15", question: "How does Discord handle push notifications for mobile?", answer: "If a user is disconnected from WebSockets, a notification service sends a payload via APNs (Apple) or FCM (Firebase).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q16", question: "What is a 'Guild' in Discord terminology?", answer: "A Server (a collection of channels and users). Guild architecture defines how routing and permissions are bounded.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dscd-q17", question: "How do you manage Gateway server deployments without dropping users?", answer: "Implement graceful disconnects where clients are instructed to seamlessly reconnect to a new Gateway instance.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dscd-q18", question: "Why did Discord migrate from Cassandra to ScyllaDB?", answer: "To reduce latency spikes caused by Java garbage collection, as ScyllaDB is written in C++ and optimized for modern NVMe drives.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dscd-q19", question: "How do you handle rate limiting to prevent spam?", answer: "Use a sliding window or token bucket algorithm at the API Gateway or WebSocket level, backed by Redis.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-q20", question: "What is Consistent Hashing used for in this architecture?", answer: "To distribute Guilds or voice sessions across a cluster of servers evenly, minimizing reshuffling when servers scale up or down.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you handle 'hot partitions' when a popular server has a massive spike in chat activity?",
    "How would you design the unread message indicators?",
    "How does the system know when a user's WebSocket silently drops (half-open connection)?"
  ],
  commonMistakes: [
    "Using a standard SQL database for chat messages, which cannot handle the write throughput.",
    "Forgetting the massive fan-out challenge of presence and typing indicators.",
    "Proposing P2P WebRTC for a 50-person voice channel."
  ],
  interviewTraps: [
    "Treating Discord like a standard 1-to-1 chat app. Discord is group-centric (Guilds), changing the routing architecture heavily.",
    "Coupling the WebSocket gateway logic with business logic. Gateways should only hold connections and route bytes."
  ],
  tradeoffs: [
    "Fan-out on Write vs Read: Discord does fan-out on write (pushing to active users) but relies on pull (DB reads) for offline users.",
    "Consistency vs Availability: Message delivery prioritizes availability and low latency over strict consistency.",
    "Storage vs Compute for Unreads: Storing exactly what every user has read is expensive; often optimizations are made to store the 'last read message ID' per channel."
  ],
  memoryTrick: "Think 'Gateways, Guilds, and Scylla'. Gateways hold sockets, Guilds define routing boundaries, Scylla stores the history.",
  realWorldExamples: [
    "Discord handles trillions of messages using ScyllaDB.",
    "They built a custom Elixir/Erlang service to manage millions of concurrent WebSocket connections due to Erlang's lightweight processes."
  ],
  mermaidDiagram: `flowchart TD
    Client <-->|WebSockets| Gateway[Gateway Servers]
    Gateway <--> RedisPubSub[(Redis Pub/Sub)]
    Client -->|HTTP Post| API[API Servers]
    
    API --> RedisPubSub
    API --> Scylla[(ScyllaDB / Cassandra)]
    
    Client <-->|WebRTC| SFU[Voice/Video SFU]
    API -.-> Presence[Presence Service]`,
  flashcards: [
    { id: "dscd-fc1", front: "How do clients maintain real-time connections?", back: "Via persistent WebSockets to Gateway servers.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dscd-fc2", front: "What database is best for storing chat history?", back: "Cassandra or ScyllaDB (Wide-column NoSQL).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-fc3", front: "How is database partitioning handled for chat?", back: "Partition by `channel_id`, cluster by `message_id` (time-based Snowflake).", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dscd-fc4", front: "How is group voice chat implemented?", back: "Using WebRTC routed through a server-side Selective Forwarding Unit (SFU).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dscd-fc5", front: "How is message routing implemented internally?", back: "Using Redis Pub/Sub or a message broker to route events from APIs to the correct Gateway holding the user.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Discord Design Cheat Sheet",
    sections: [
      { heading: "Real-time layer", items: ["WebSockets via Gateways", "Redis Pub/Sub for routing", "Presence Service"] },
      { heading: "Storage", items: ["ScyllaDB/Cassandra", "Snowflake IDs", "Partition by channel"] },
      { heading: "Voice/Video", items: ["WebRTC", "SFU (Selective Forwarding Unit)"] }
    ]
  },
  speedNotes: [
    "WebSockets for real-time push.",
    "Cassandra/ScyllaDB for messages.",
    "Partition by channel ID.",
    "SFU for group voice/video.",
    "Redis Pub/Sub for routing."
  ]
};
