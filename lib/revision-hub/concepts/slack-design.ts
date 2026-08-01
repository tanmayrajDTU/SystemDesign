import type { ConceptRevisionContent } from "./types";

export const slackDesign: ConceptRevisionContent = {
  slug: "slack-design",
  title: "Slack Design (Enterprise Collaboration)",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 50,
  docLinks: [
    { label: "Slack System Design", href: "/docs/case-studies/slack" }
  ],
  summary: [
    "Slack is an enterprise messaging platform focused on workspaces, channels, and integrations.",
    "Unlike Discord, Slack places heavy emphasis on robust search, threading, and enterprise security.",
    "It uses a mix of WebSockets for real-time delivery and rich REST APIs for integrations.",
    "Client state is aggressively cached on load, requiring complex state synchronization.",
    "Messages are traditionally stored in a sharded relational DB (MySQL/Vitess) to support complex transactional needs and compliance."
  ],
  whyAsked: [
    "Tests understanding of B2B/Enterprise software requirements (compliance, data isolation).",
    "Evaluates handling complex search requirements in a chat environment.",
    "Assesses knowledge of state synchronization across multiple client devices."
  ],
  thirtySecondAnswer: "Designing Slack requires focusing on 'Workspaces'. When a client loads, it fetches massive amounts of initial state (channels, users, unreads) from a sharded MySQL database. Real-time events are pushed via WebSockets connected to a message broker (Pub/Sub). Because search is a core feature, every message is asynchronously indexed into Solr or Elasticsearch. Threading requires hierarchical data models. The architecture strongly prioritizes enterprise compliance, reliable message delivery, and robust integration APIs.",
  detailedAnswer: [
    "Structure data heavily around Workspaces (Organizations) to ensure data isolation.",
    "Use a sharded relational database (e.g., MySQL via Vitess) for messages and metadata to support complex queries and enterprise compliance.",
    "Maintain real-time connections via WebSockets, using a Pub/Sub system to route messages to connected clients.",
    "Send all messages asynchronously to a search index (Elasticsearch/Solr) for fast, faceted enterprise search.",
    "Implement a robust API Gateway to handle custom app integrations, webhooks, and rate limiting.",
    "Cache workspace state aggressively (Redis) so clients can boot up quickly without hammering the primary DB."
  ],
  questions: [
    { id: "slkd-q1", question: "What distinguishes Slack's requirements from standard chat apps?", answer: "Enterprise focus: data isolation per workspace, advanced search, threading, third-party integrations, and strict compliance (e.g., data retention).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "slkd-q2", question: "How does Slack deliver messages in real-time?", answer: "Clients maintain a WebSocket connection to a Real-Time Messaging (RTM) server, which pushes JSON events.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "slkd-q3", question: "What is the boot sequence when a Slack client opens?", answer: "The client makes a 'rtm.start' API call, downloading a massive initial payload of channels, users, and unread states, then establishes a WebSocket.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q4", question: "Why might Slack choose MySQL (Vitess) over Cassandra for messages?", answer: "Relational DBs provide better support for complex queries, threading, edits, and enterprise compliance requirements, made scalable via Vitess.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "slkd-q5", question: "How do you implement Slack threads?", answer: "Add a `parent_message_id` column to the messages table. A message with no parent is a top-level message; others belong to the thread.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q6", question: "How is database sharding typically handled in Slack?", answer: "Data is heavily sharded by `workspace_id` (Team ID), ensuring all data for one company lives on the same shard for fast querying.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "slkd-q7", question: "What happens if an enterprise workspace is too large for one shard?", answer: "Large organizations require a specialized sharding strategy, breaking them down further by `channel_id` or `user_id`.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "slkd-q8", question: "How is search implemented?", answer: "An asynchronous pipeline feeds messages from the DB into a search engine like Apache Solr or Elasticsearch, indexed by workspace, user, and channel.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q9", question: "How are typing indicators handled efficiently?", answer: "Typing events are sent over WebSockets but are transient; they are routed through Pub/Sub and dropped if undeliverable, never hitting the database.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q10", question: "How do you handle unread message counts?", answer: "Maintain a `user_channel_read_state` table tracking the highest `message_id` a user has seen in a channel. Compare this to the channel's current max `message_id`.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "slkd-q11", question: "How are third-party integrations (webhooks) supported?", answer: "Through a dedicated async task queue (e.g., Celery/Kafka). When an event occurs, workers fetch webhook URLs and POST payloads securely.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q12", question: "How does Slack handle offline availability?", answer: "The client uses local storage (IndexedDB/SQLite) to cache the workspace state, allowing users to read old messages and queue new ones while offline.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q13", question: "How do you handle file uploads?", answer: "Files upload directly to Object Storage (S3) via pre-signed URLs. The message only stores the file's metadata and URL.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "slkd-q14", question: "How do you ensure message delivery exactly once?", answer: "Use idempotency keys (client-generated UUIDs) for message creation. If a retry happens, the server drops duplicates.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q15", question: "What is 'Slack Connect' and why is it hard to design?", answer: "It allows distinct workspaces to share a channel. It breaks the 'shard by workspace' rule, requiring complex cross-shard queries and replication.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "slkd-q16", question: "How do you handle rate limiting for bot integrations?", answer: "Implement strict rate limits per token/workspace using Redis (Token Bucket algorithm) at the API Gateway.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q17", question: "How are mentions (@user) processed?", answer: "The backend parses the message text. If a mention is found, it triggers a push notification payload to the APNs/FCM for that specific user.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q18", question: "How does Slack sync state across multiple devices of the same user?", answer: "The WebSocket gateway pushes state changes to all active connections for that user, keeping mobile and desktop apps synchronized.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-q19", question: "Why is caching critical on the client-side?", answer: "To reduce server load during the 'thundering herd' when thousands of employees open their laptops at 9 AM.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "slkd-q20", question: "How are message edits and deletions handled?", answer: "Edits update the DB row and push an `message_changed` event via WebSockets. Deletes soft-delete the row (for compliance/retention) and push a `message_deleted` event.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How does the architecture change to support 'Slack Connect' (channels shared between organizations)?",
    "How do you optimize the client boot time for massive workspaces?",
    "How do you handle a company requiring all data to be stored on-premise?"
  ],
  commonMistakes: [
    "Using a NoSQL database without addressing how complex searches, threads, and compliance reporting will be executed.",
    "Ignoring the heavy read-load of the initial client boot sequence.",
    "Failing to separate the transient real-time event layer from the persistent storage layer."
  ],
  interviewTraps: [
    "Treating Slack as a consumer app. B2B software implies different constraints: strict SLAs, data retention policies, and organizational boundaries."
  ],
  tradeoffs: [
    "Sharding by Workspace vs Channel: Sharding by workspace keeps company data local but creates 'hot shards' for giant companies.",
    "Thick Client vs Thin Client: Slack is a thick client (caches massive state), making it fast to navigate but memory-hungry.",
    "Sync vs Async Search Indexing: Indexing async improves chat latency but means a search right after posting might miss the message."
  ],
  memoryTrick: "Think 'Workspaces, WebSockets, and Webhooks'. Everything is scoped to a workspace, delivered via WebSockets, and highly extensible via Webhooks.",
  realWorldExamples: [
    "Slack uses Vitess to horizontally scale their massive MySQL database.",
    "They migrated their search backend to Apache Solr for complex text analysis.",
    "Slack uses a custom Edge network to terminate WebSockets closer to users."
  ],
  mermaidDiagram: `flowchart TD
    Client <-->|WebSockets| Edge[Edge / RTM Servers]
    Client -->|HTTP| API[API Gateway]
    
    API --> Vitess[(Vitess / Sharded MySQL)]
    API -.->|Async Queue| Integrations[Webhook Workers]
    API -.->|Async Queue| Search[Solr / Search Index]
    
    Edge <--> PubSub[(Message Broker)]
    API --> PubSub`,
  flashcards: [
    { id: "slkd-fc1", front: "How is Slack data primarily sharded?", back: "By `workspace_id` (Team ID), to keep all data for a company together.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-fc2", front: "What happens during a client's boot sequence?", back: "It downloads a large payload of initial state (channels, users, unreads) to cache locally, then opens a WebSocket.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-fc3", front: "How are threads implemented?", back: "By adding a `parent_message_id` to message records to establish a hierarchy.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "slkd-fc4", front: "What handles third-party app integrations?", back: "An API Gateway and async task workers to process outgoing webhooks without blocking chat.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "slkd-fc5", front: "Why is a relational database often chosen for Slack?", back: "To support complex enterprise compliance, threading, edits, and intricate data relationships.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Slack Design Cheat Sheet",
    sections: [
      { heading: "Architecture Focus", items: ["Enterprise compliance", "Data isolation per Workspace", "Rich API ecosystem"] },
      { heading: "Data & Storage", items: ["Sharded MySQL (Vitess)", "Elasticsearch/Solr", "Shard by Workspace ID"] },
      { heading: "Real-time", items: ["WebSockets for push", "Heavy client-side caching", "Async webhook processing"] }
    ]
  },
  speedNotes: [
    "Shard data by Workspace.",
    "WebSockets for real-time push.",
    "Thick clients cache state.",
    "Relational DB (Vitess) for chat.",
    "Async index to Solr/Elastic."
  ]
};
