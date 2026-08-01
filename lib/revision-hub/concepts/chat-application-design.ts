import type { ConceptRevisionContent } from "./types";

export const chatApplicationDesign: ConceptRevisionContent = {
  slug: "chat-application-design",
  title: "Chat Application Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 30,
  docLinks: [
    { label: "WhatsApp Case Study", href: "/docs/case-studies/whatsapp" },
    { label: "Slack Case Study", href: "/docs/case-studies/slack" }
  ],
  summary: [
    "A chat application (like WhatsApp or Slack) facilitates real-time communication using bidirectional connections.",
    "WebSockets are the primary protocol for real-time messaging, with Server-Sent Events (SSE) or long-polling as fallbacks.",
    "A Chat Server holds the active connection, while a Presence Server tracks user online/offline status.",
    "A routing or pub/sub layer (like Redis Pub/Sub or Kafka) passes messages between different chat servers.",
    "Data storage requires high write throughput (NoSQL like Cassandra or DynamoDB for message history).",
    "End-to-End Encryption (E2EE) is critical for privacy, requiring public/private key exchanges."
  ],
  whyAsked: [
    "To test knowledge of bidirectional communication protocols (WebSockets vs HTTP).",
    "To evaluate how you manage large-scale state (millions of concurrent TCP connections).",
    "To see how you handle real-time data routing, presence tracking, and high-volume message storage."
  ],
  thirtySecondAnswer: "A chat app uses WebSockets for real-time bidirectional communication. When a user connects, a Load Balancer assigns them to a Chat Server that holds their TCP connection. To send a message, User A sends it to their Chat Server, which pushes it to a Message Queue/PubSub. The system finds User B's Chat Server via a Session Service (Redis) and routes the message there, which pushes it to User B. Messages are stored in a NoSQL database (Cassandra) for fast writes. A separate Presence Service tracks online/offline status.",
  detailedAnswer: [
    "Connections: Clients maintain a persistent WebSocket connection to a stateful Chat Server.",
    "Routing: When User A messages User B, the system queries a Session Cache (Redis) to find which Chat Server holds User B's connection.",
    "Storage: Chat history is write-heavy. Wide-column stores like Cassandra or HBase are ideal for sequential writes and fast range queries.",
    "Presence: Online status is tracked via heartbeat pings. A Presence Server updates Redis and broadcasts status changes to friends.",
    "Push Notifications: If User B is offline, the message is routed to a Push Notification service (APNs/FCM).",
    "Delivery Guarantees: Clients attach local IDs to messages. Servers ACK receipt to handle retries and ensure message ordering."
  ],
  questions: [
    { id: "chatd-q1", question: "Why use WebSockets instead of HTTP for chat?", answer: "HTTP is unidirectional (client requests, server responds). WebSockets are bidirectional, allowing servers to push messages to clients in real-time.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "chatd-q2", question: "What is Long Polling?", answer: "A fallback to WebSockets where the client requests data, and the server holds the request open until new data arrives.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "chatd-q3", question: "What database is best for storing chat history?", answer: "NoSQL wide-column stores (Cassandra/HBase) due to high write throughput and easy partitioning by conversation ID.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "chatd-q4", question: "What does the Session Service do?", answer: "It maps a UserID to the specific Chat Server IP that currently holds their active WebSocket connection.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "chatd-q5", question: "What happens if a user is offline?", answer: "The Chat Server routes the message to the Push Notification Service to wake up the user's app.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "chatd-q6", question: "How does the Presence Service work?", answer: "Clients send periodic 'heartbeat' pings. If the server misses pings for a threshold time, the user is marked offline.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-q7", question: "How do you route a message from Server A to Server B?", answer: "Using a Pub/Sub system like Redis Pub/Sub, or a message broker like Kafka to decouple the servers.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-q8", question: "How do you ensure messages are displayed in the correct order?", answer: "Generate unique, time-sortable IDs (like Snowflake or Flake IDs) for each message at the server or client level.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-q9", question: "How do group chats differ from 1-on-1 chats?", answer: "In group chats, the message is fan-out processed: the server finds the active connections for all group members and pushes to them.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-q10", question: "How do you handle 'read receipts' (blue ticks)?", answer: "When Client B reads the message, it sends an ACK to the server, which forwards the ACK back to Client A.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-q11", question: "How do you handle typing indicators?", answer: "Client sends 'typing' events over WebSocket. Server routes this transient event to the receiver without saving it to the DB.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-q12", question: "How does End-to-End Encryption (E2EE) work conceptually?", answer: "Messages are encrypted on the sender's device using the receiver's public key, and only decrypted on the receiver's device.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-q13", question: "How do you scale the WebSocket servers?", answer: "Load balancers distribute new connections. The servers are stateful, so you must scale horizontally and use a Session Cache.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-q14", question: "What is the C10K problem?", answer: "The challenge of handling 10,000+ concurrent connections on a single server, solved using asynchronous I/O (epoll/kqueue).", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "chatd-q15", question: "How do you optimize fan-out for massive channels (e.g., Discord/Slack)?", answer: "Instead of pushing to every user, active users pull from a localized cache, or use a hybrid push/pull model.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "chatd-q16", question: "How do you handle a Chat Server crashing?", answer: "Clients detect TCP drop and reconnect via LB to a new server. The new server updates the Session Cache with the new binding.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "chatd-q17", question: "How does the system sync messages across multiple devices for one user?", answer: "The Session service maps UserID to multiple WebSockets. The system fans out the message to all active devices.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "chatd-q18", question: "How do you efficiently store attachments/media?", answer: "Upload media to Blob Storage (S3), generate a CDN link, and send the link text as the chat message.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "chatd-q19", question: "Why is tracking presence for 100M users hard?", answer: "Broadcasting status changes to all friends creates massive network overhead. Usually, status is only broadcasted to active/online friends.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "chatd-q20", question: "How does WhatsApp handle messages when both users are offline?", answer: "Messages are stored temporarily on the server. Once delivered, they are deleted from the server (if strictly E2EE).", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you design for large group chats with 100,000+ members (e.g., Telegram)?",
    "How do you ensure message delivery if the network is highly unstable?",
    "How do you implement End-to-End Encryption?"
  ],
  commonMistakes: [
    "Using HTTP polling instead of WebSockets as the primary communication method.",
    "Using a Relational DB for message history (it won't scale for the massive write volume).",
    "Forgetting that chat servers are stateful and require a session mapping service."
  ],
  interviewTraps: [
    "Storing media directly in the database instead of object storage.",
    "Trying to broadcast presence updates to offline users."
  ],
  tradeoffs: [
    "Push vs Pull: For 1-on-1, Push is best. For massive groups, Pull or Hybrid prevents fan-out bottlenecks.",
    "Stateful vs Stateless: Chat servers must be stateful to hold WebSocket connections, making scaling and deployments harder than stateless HTTP.",
    "E2EE vs Multi-device sync: True E2EE makes syncing across multiple devices complex, as the server cannot decrypt history for a new device."
  ],
  memoryTrick: "Chat = WebSocket for Sync, Cassandra for Storage, Redis for Session.",
  realWorldExamples: [
    "WhatsApp: Erlang for managing millions of concurrent WebSockets, E2EE, temporary server storage.",
    "Discord: Uses Cassandra for billions of messages, Elixir/Erlang for real-time presence and routing."
  ],
  mermaidDiagram: `flowchart TD
    A[Client A] <-->|WebSocket| B(Chat Server 1)
    C[Client B] <-->|WebSocket| D(Chat Server 2)
    B --> E{Session Redis}
    E -.->|User B is on Server 2| B
    B -->|Route Message| F(Message Broker / PubSub)
    F --> D
    B --> G[(Cassandra DB)]
    A -.->|Heartbeat| H(Presence Server)
    H --> I[(Presence Cache)]`,
  flashcards: [
    { id: "chatd-fc1", front: "What protocol is used for real-time chat?", back: "WebSockets", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "chatd-fc2", front: "What tracks which server a user is connected to?", back: "Session Service / Cache (Redis)", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "chatd-fc3", front: "What database is preferred for chat history?", back: "NoSQL Wide-Column (Cassandra/HBase)", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-fc4", front: "How is user online status tracked?", back: "Heartbeat pings to a Presence Server", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "chatd-fc5", front: "How do you handle massive group chat fan-out?", back: "Hybrid push/pull or localised caching", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Chat Architecture",
    sections: [
      {
        heading: "Core Protocols",
        items: [
          "WebSockets: Persistent, bidirectional.",
          "Long Polling: Fallback for older clients."
        ]
      },
      {
        heading: "Microservices",
        items: [
          "Chat Servers: Stateful, hold TCP connections.",
          "Session Service: Maps UserID -> Server IP.",
          "Presence Service: Tracks Heartbeats."
        ]
      },
      {
        heading: "Data Management",
        items: [
          "Messages: Cassandra (high write throughput).",
          "Media: S3 / Object Storage + CDN.",
          "State/Sessions: Redis."
        ]
      }
    ]
  },
  speedNotes: [
    "WebSockets are stateful connections.",
    "Session cache maps users to servers.",
    "Cassandra for high-write message logs.",
    "Presence tracked via heartbeats.",
    "Push notifications for offline users."
  ]
};
