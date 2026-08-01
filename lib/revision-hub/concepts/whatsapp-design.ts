import type { ConceptRevisionContent } from "./types";

export const whatsappDesign: ConceptRevisionContent = {
  slug: "whatsapp-design",
  title: "WhatsApp Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 45,
  docLinks: [
    { label: "WhatsApp Design", href: "/docs/case-studies/whatsapp" }
  ],
  summary: [
    "WhatsApp requires low-latency, real-time message delivery between clients.",
    "The system needs persistent bidirectional connections (WebSockets) to push messages.",
    "Messages are typically deleted from the server once delivered, storing only undelivered messages.",
    "Handling millions of concurrent connections requires highly optimized connection managers.",
    "End-to-End Encryption (E2EE) means the server cannot read the messages."
  ],
  whyAsked: [
    "Tests knowledge of real-time communication protocols (WebSockets).",
    "Evaluates how you handle massive concurrent connections.",
    "Challenges you to design stateful services (connection managers) in a stateless microservices world."
  ],
  thirtySecondAnswer: "WhatsApp maintains millions of concurrent WebSocket connections via Connection Servers. When User A sends a message, it hits a Chat Server, which routes it to User B's Connection Server. If User B is offline, the message is stored temporarily in a NoSQL database until they come online. WhatsApp uses End-to-End encryption and typically drops messages from the server once successfully delivered.",
  detailedAnswer: [
    "Connection Handling: Use WebSockets for persistent, full-duplex communication. Connection Servers maintain state for which user is connected to which server.",
    "Message Routing: A Message Service acts as a router, looking up the recipient's current Connection Server via a fast session store (Redis).",
    "Offline Storage: If the user is offline, store the encrypted message in a fast NoSQL database (Cassandra or HBase). Delete it upon successful delivery acknowledgment.",
    "Message Ordering: Use local timestamps or a sequence generator for ordering. Usually, clients handle final ordering based on embedded IDs.",
    "Presence (Last Seen/Online): Heartbeats are sent over the WebSocket. Presence Service tracks this state, broadcasting updates to interested contacts.",
    "Media Attachments: Upload media to Object Storage (S3), generate a link, encrypt the link/thumbnail, and send it as a standard text message."
  ],
  questions: [
    { id: "wad-q1", question: "What protocol is best for real-time chat applications?", answer: "WebSockets, because it provides persistent, full-duplex communication over a single TCP connection.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "wad-q2", question: "How does the server know if a user is online?", answer: "The client sends periodic heartbeats/ping messages over the active WebSocket connection.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "wad-q3", question: "Does WhatsApp store all your messages on its servers forever?", answer: "No, primarily it stores only undelivered messages. Once delivered, they are purged from the server.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "wad-q4", question: "How do you route a message from User A to User B?", answer: "User A sends to their Connection Server -> Chat Service -> looks up User B's Connection Server in Redis -> forwards to User B.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-q5", question: "How are millions of concurrent connections managed?", answer: "Using highly optimized servers (often written in Erlang/Go) capable of handling hundreds of thousands of open TCP sockets each.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-q6", question: "What database is good for storing undelivered messages?", answer: "Cassandra, HBase, or DynamoDB due to their high write throughput and fast key-value lookups.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-q7", question: "How is media (images/videos) handled?", answer: "Media is uploaded to S3. A thumbnail and the S3 URL are sent as a standard chat message to the recipient.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-q8", question: "What are read receipts (blue ticks) and how do they work?", answer: "They are system messages sent backward from the recipient to the sender acknowledging receipt and read status.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-q9", question: "How do you handle Group Chats?", answer: "A Group Service maintains a list of group members. A message sent to a group is fanned out (duplicated) to every member's connection.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-q10", question: "What is End-to-End Encryption (E2EE)?", answer: "Messages are encrypted on the sender's device and only decrypted on the recipient's device. The server only sees ciphertext.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-q11", question: "How does the Push Notification system work for offline users?", answer: "If the recipient is offline, the Chat Service triggers a payload to APNs (Apple) or FCM (Google) to wake up the user's device.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q12", question: "How do you scale the Presence (Online Status) service?", answer: "Use a Pub/Sub model. When a user's status changes, publish an event; only active friends subscribe to these events to avoid N^2 broadcasts.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q13", question: "How do you ensure message delivery exactly once?", answer: "Messages contain unique IDs. The client deduplicates based on ID, and the server relies on explicit ACKs from the client before deleting.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q14", question: "What happens if a Connection Server crashes?", answer: "Clients detect the dropped TCP connection and reconnect to a new Connection Server, which updates the session mapping in Redis.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q15", question: "How do you maintain message ordering across different networks?", answer: "Clients use local monotonic sequence numbers, but final ordering relies on server-assigned timestamps or vector clocks.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q16", question: "How do you optimize Group Chat fanout for very large groups?", answer: "Use Message Queues (Kafka) to process fanout asynchronously, decoupling the sender from the delivery latency of 10,000 members.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q17", question: "How do you handle synchronizing chat history across multiple devices (WhatsApp Web)?", answer: "The primary phone acts as the source of truth (historically), or the server temporarily queues E2E encrypted messages for each active device.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q18", question: "Why did WhatsApp originally use Erlang?", answer: "Erlang's lightweight processes and actor model are perfect for managing millions of concurrent, stateful connections with high fault tolerance.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q19", question: "How is the user session mapping (User ID -> Server IP) kept fast and consistent?", answer: "Using a distributed in-memory cache (Redis Cluster) that is updated immediately upon a new WebSocket connection.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "wad-q20", question: "How do you limit spam and abuse on the platform?", answer: "Rate limiting by user/IP, identifying irregular fanout patterns, and client-side reporting, since the server cannot read E2EE content.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How does the system change to support large Group Chats?",
    "How do you implement End-to-End Encryption?",
    "How does WhatsApp Web sync with the phone?",
    "How do you implement 'typing...' indicators?"
  ],
  commonMistakes: [
    "Using standard HTTP polling instead of WebSockets.",
    "Storing all messages forever in a relational database.",
    "Forgetting to design a scalable Presence/Last Seen service, which is notoriously heavy."
  ],
  interviewTraps: [
    "Assuming you can inspect message payloads (E2EE prevents this).",
    "Broadcasting online status to all contacts synchronously (causes massive network spikes)."
  ],
  tradeoffs: [
    "WebSockets (persistent, fast) vs Long Polling (fallback, higher overhead).",
    "Storing all history (like Telegram) vs Deleting on delivery (like WhatsApp) for privacy and storage costs.",
    "Synchronous fanout for groups vs Asynchronous fanout via Message Queues."
  ],
  memoryTrick: "WebSockets + Redis Session Store + Cassandra (for offline) + E2EE.",
  realWorldExamples: [
    "WhatsApp handles 100+ billion messages a day using Erlang for its connection managers.",
    "Discord uses similar WebSocket gateway architectures but stores all message history."
  ],
  mermaidDiagram: "flowchart LR\n    Sender <-->|WebSocket| CS1[Connection Server 1]\n    CS1 --> Router[Message Router]\n    Router -.->|Lookup| Redis[(Session Cache)]\n    Router --> DB[(Offline DB)]\n    Router --> CS2[Connection Server 2]\n    CS2 <-->|WebSocket| Receiver",
  flashcards: [
    { id: "wad-fc1", front: "What is the primary communication protocol for WhatsApp clients?", back: "WebSockets.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "wad-fc2", front: "How does the system route a message to the correct server?", back: "By looking up the recipient's User ID in a session store (Redis) to find their connected server.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-fc3", front: "Where are offline messages stored?", back: "In a fast NoSQL database (Cassandra/HBase) until delivered.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "wad-fc4", front: "What happens to a message after it is delivered?", back: "It is deleted from the server.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "wad-fc5", front: "How are typing indicators implemented?", back: "As transient system messages sent through the standard WebSocket routing path.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "WhatsApp Design Cheat Sheet",
    sections: [
      { heading: "Connections", items: ["WebSockets for duplex real-time", "Connection Managers hold state"] },
      { heading: "Routing", items: ["Redis for User -> Server mapping", "Message routers for dispatching"] },
      { heading: "Storage", items: ["NoSQL for undelivered messages", "S3 for Media", "Ephemeral storage philosophy"] }
    ]
  },
  speedNotes: [
    "WebSockets for real-time.",
    "Stateful connection managers.",
    "Redis for session lookup.",
    "Store-and-forward for offline.",
    "End-to-End Encryption."
  ]
};
