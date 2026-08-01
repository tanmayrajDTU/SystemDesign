import type { ConceptRevisionContent } from "./types";

export const publishSubscribe: ConceptRevisionContent = {
  slug: "publish-subscribe",
  title: "Publish/Subscribe",
  topic: "Messaging",
  difficulty: "Intermediate",
  estimatedMinutes: 12,
  docLinks: [
    { label: "Pub/Sub Architecture", href: "/docs/messaging/pub-sub" },
    { label: "Kafka", href: "/docs/messaging/kafka" }
  ],
  summary: [
    "Publish/Subscribe (Pub/Sub) is an asynchronous messaging pattern where publishers send messages to a topic without knowing who will receive them.",
    "Subscribers express interest in one or more topics and only receive messages that are of interest.",
    "Unlike point-to-point queues where one consumer gets the message, in Pub/Sub, a single message is broadcast to all active subscribers.",
    "It is highly scalable and enables real-time event distribution and event-driven architectures.",
    "Common implementations include Apache Kafka, Google Cloud Pub/Sub, and AWS SNS."
  ],
  whyAsked: [
    "To test your ability to design event-driven architectures.",
    "To evaluate how you handle one-to-many communication between microservices.",
    "To see if you understand the differences between queues (1:1) and topics (1:N)."
  ],
  thirtySecondAnswer: "Pub/Sub is a messaging pattern for one-to-many communication. A publisher sends an event to a central 'Topic'. Multiple independent subscribers listen to that topic. When a message arrives, a copy is delivered to every subscriber. This perfectly decouples services: the publisher doesn't need to know how many systems care about the event, making it incredibly easy to add new features or microservices without touching existing code.",
  detailedAnswer: [
    "Topics: Logical channels where publishers push messages.",
    "Fan-out: The process of taking one incoming message and duplicating it to multiple subscriber queues.",
    "Decoupling: Publishers have no knowledge of subscribers. You can add or remove subscribers at any time without changing the publisher.",
    "Push vs Pull: Some systems push messages to subscribers via HTTP hooks (AWS SNS), others require subscribers to pull (Kafka).",
    "Event-Driven: Perfect for architectures where an action (e.g., 'User Registered') needs to trigger multiple independent actions (Send Email, Update Analytics, Create Billing Record).",
    "Durability: Varies by system. SNS drops messages if subscribers aren't available, while Kafka retains them on disk for days."
  ],
  questions: [
    { id: "ps-q1", question: "What is the Pub/Sub pattern?", answer: "A messaging pattern where publishers send messages to a topic, and all subscribers to that topic receive a copy.", topic: "Messaging", difficulty: "Beginner" },
    { id: "ps-q2", question: "How does Pub/Sub differ from a Message Queue?", answer: "Queues are 1:1 (one message to one consumer). Pub/Sub is 1:N (one message to many subscribers).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-q3", question: "What is a Topic?", answer: "A named channel or category where publishers send messages and subscribers listen.", topic: "Messaging", difficulty: "Beginner" },
    { id: "ps-q4", question: "What is 'Fan-out' architecture?", answer: "Using a Pub/Sub topic to instantly broadcast a single message out to multiple separate message queues (e.g., SNS to SQS).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-q5", question: "Are publishers aware of their subscribers?", answer: "No, they are completely decoupled. Publishers just push to the topic.", topic: "Messaging", difficulty: "Beginner" },
    { id: "ps-q6", question: "What happens to a message if a topic has no subscribers?", answer: "Usually, the message is simply discarded (unless it's an event stream like Kafka that retains logs).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-q7", question: "What is the difference between AWS SNS and SQS?", answer: "SNS is a Pub/Sub service (Push, 1:N). SQS is a Message Queue (Pull, 1:1).", topic: "Messaging", difficulty: "Beginner" },
    { id: "ps-q8", question: "Why combine SNS and SQS?", answer: "SNS fans out the message to multiple SQS queues, which then buffer the messages to provide reliable load-leveling for each consumer.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-q9", question: "What is message filtering in Pub/Sub?", answer: "Subscribers define rules so they only receive messages from a topic that match certain attributes, ignoring the rest.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-q10", question: "What is an event-driven architecture?", answer: "A system design where state changes (events) are broadcast via Pub/Sub, triggering independent microservices to react.", topic: "Messaging", difficulty: "Advanced" },
    { id: "ps-q11", question: "How do you guarantee ordering in Pub/Sub?", answer: "It is generally very hard. Systems like Kafka do it by partitioning topics and routing related events to the same partition.", topic: "Messaging", difficulty: "Advanced" },
    { id: "ps-q12", question: "What is a transient subscriber?", answer: "A subscriber that only receives messages published while it is actively connected (e.g., WebSockets).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-q13", question: "What is a durable subscriber?", answer: "A subscriber whose messages are buffered by the broker if it disconnects, receiving them when it reconnects.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-q14", question: "Can a subscriber be overwhelmed in a push-based Pub/Sub?", answer: "Yes. If the broker pushes messages faster than the subscriber can process, the subscriber will crash (lack of backpressure).", topic: "Messaging", difficulty: "Advanced" },
    { id: "ps-q15", question: "How does Kafka differ from traditional Pub/Sub like Redis Pub/Sub?", answer: "Kafka persists messages to disk (Event Streaming) allowing replay; Redis Pub/Sub is fire-and-forget in memory.", topic: "Messaging", difficulty: "Advanced" },
    { id: "ps-q16", question: "Give an example of a good use case for Pub/Sub.", answer: "A 'Video Uploaded' event that triggers three independent services: Compression, Audio Extraction, and Metadata generation.", topic: "Messaging", difficulty: "Beginner" },
    { id: "ps-q17", question: "What is the primary bottleneck in a Pub/Sub system?", answer: "Network bandwidth and broker CPU to duplicate the message to thousands of subscribers.", topic: "Messaging", difficulty: "Advanced" },
    { id: "ps-q18", question: "Does Pub/Sub improve latency?", answer: "It improves latency for the publisher (returns instantly), but event processing is eventually consistent.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-q19", question: "What is exactly-once semantics in Pub/Sub?", answer: "A very difficult guarantee ensuring a subscriber acts on a message one and only one time.", topic: "Messaging", difficulty: "Advanced" },
    { id: "ps-q20", question: "How do you handle schema changes in Pub/Sub events?", answer: "Use schema registries (like Avro or Protobuf) and maintain backward compatibility in the event payloads.", topic: "Messaging", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "When would you use Pub/Sub vs an Event Stream (like Kafka)?",
    "How do you design for failure if one of the subscribers goes offline?",
    "Explain the SNS to SQS fan-out pattern."
  ],
  commonMistakes: [
    "Using a simple Push-based Pub/Sub without queues, causing downstream services to be DDoSed by high traffic.",
    "Failing to make subscribers idempotent.",
    "Putting too much data in the event (fat events) instead of passing a reference (thin events)."
  ],
  interviewTraps: [
    "Confusing Queues and Topics. (Queue = 1 worker gets it. Topic = all workers get a copy).",
    "Assuming all Pub/Sub systems save messages (most traditional ones drop messages if no one is listening)."
  ],
  tradeoffs: [
    "Pub/Sub vs Queue: Pub/Sub is great for broadcasting to multiple domains, but lacks the native load-leveling and consumer competing of a simple queue.",
    "Push vs Pull Subscribers: Push (SNS) is lower latency but risks overwhelming consumers; Pull (Kafka) is safe (consumers control pace) but adds polling overhead."
  ],
  comparisonTable: {
    title: "Pub/Sub vs Message Queue",
    columns: ["Feature", "Message Queue", "Pub/Sub (Topics)"],
    rows: [
      { label: "Delivery", values: ["Point-to-Point (1:1)", "Broadcast (1:N)"] },
      { label: "Consumer coupling", values: ["Competing consumers", "Independent subscribers"] },
      { label: "Message lifecycle", values: ["Deleted after consumption", "Deleted after all subs get it (or retention expires)"] },
      { label: "Best for", values: ["Background jobs, load leveling", "Event notifications, fan-out"] },
      { label: "Examples", values: ["RabbitMQ, SQS", "Kafka, AWS SNS, Google Pub/Sub"] }
    ]
  },
  memoryTrick: "Queue is a To-Do list (one person crosses it off). Pub/Sub is a Radio Broadcast (everyone tuned in hears it).",
  realWorldExamples: [
    "YouTube sending a notification to millions of subscribers when a channel posts a video.",
    "Microservices architecture using AWS SNS to fan-out a 'UserCreated' event to Analytics, Email, and Billing services."
  ],
  mermaidDiagram: `flowchart LR\n    P[Publisher] -->|Publishes| T((Topic))\n    T -->|Copy 1| S1[Subscriber A: Email]\n    T -->|Copy 2| S2[Subscriber B: Analytics]\n    T -->|Copy 3| S3[Subscriber C: Billing]\n    style T fill:#f96,stroke:#333,stroke-width:2px`,
  flashcards: [
    { id: "ps-fc1", front: "Pub/Sub vs Queue?", back: "Queue is 1:1 (point-to-point). Pub/Sub is 1:N (broadcast).", topic: "Messaging", difficulty: "Beginner" },
    { id: "ps-fc2", front: "What is Fan-out?", back: "Publishing a single message to a topic which replicates it to multiple queues.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-fc3", front: "What happens if a Push subscriber is too slow?", back: "It can be overwhelmed and crash (lack of backpressure). Use a pull queue instead.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "ps-fc4", front: "Are publishers aware of subscribers?", back: "No, they are completely decoupled.", topic: "Messaging", difficulty: "Beginner" },
    { id: "ps-fc5", front: "What is a Durable Subscriber?", back: "A subscriber whose messages are saved by the broker while it is temporarily offline.", topic: "Messaging", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Pub/Sub Cheat Sheet",
    sections: [
      {
        heading: "Key Terms",
        items: [
          "Topic: The channel messages are sent to.",
          "Publisher: Sends the event.",
          "Subscriber: Listens to the event.",
          "Fan-out: Broadcasting to multiple queues."
        ]
      },
      {
        heading: "AWS Stack",
        items: [
          "SNS: The Pub/Sub topic (Push).",
          "SQS: The Queue (Pull).",
          "SNS + SQS = The standard fan-out pattern."
        ]
      },
      {
        heading: "Event Patterns",
        items: [
          "Fat Events: Contain all data. Heavy, but no callbacks needed.",
          "Thin Events: Contain just an ID. Subscribers must fetch data."
        ]
      }
    ]
  },
  speedNotes: [
    "Broadcasts one message to many.",
    "Decouples publishers and subscribers.",
    "Topics route messages to subscribers.",
    "Enables event-driven architectures.",
    "Combine with queues for backpressure."
  ]
};
