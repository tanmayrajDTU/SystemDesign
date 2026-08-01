import type { ConceptRevisionContent } from "./types";

export const kafka: ConceptRevisionContent = {
  slug: "kafka",
  title: "Apache Kafka",
  topic: "Messaging",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Kafka Documentation", href: "/docs/messaging/kafka" },
    { label: "Pub/Sub Messaging", href: "/docs/messaging/pub-sub" }
  ],
  summary: [
    "Apache Kafka is a distributed event streaming platform.",
    "It uses a partitioned, append-only log data structure.",
    "Producers write to topics, and consumers read from topics using consumer groups.",
    "Kafka provides high throughput, fault tolerance, and persistent storage of events.",
    "Unlike traditional message queues, messages in Kafka are retained after consumption.",
    "It requires ZooKeeper or KRaft for managing cluster metadata."
  ],
  whyAsked: [
    "To test understanding of high-throughput messaging and event streaming.",
    "To evaluate knowledge of data persistence, replays, and ordering guarantees.",
    "Kafka is heavily used in real-time analytics and microservices."
  ],
  thirtySecondAnswer: "Kafka is a distributed streaming platform that treats messages as a continuous log of events rather than independent tasks. It stores events persistently in partitioned topics, enabling multiple consumer groups to independently read the stream from different offsets. This allows high throughput, message replay, and decoupling of microservices in a highly scalable and fault-tolerant manner.",
  detailedAnswer: [
    "Topics are split into partitions, which are replicated across multiple brokers for fault tolerance.",
    "Consumers belong to consumer groups; each partition is consumed by only one consumer in a group, ensuring order and scalability.",
    "Offsets track a consumer's progress, allowing consumers to pause, resume, or replay messages.",
    "Kafka provides 'at-least-once' delivery by default, but can be configured for 'exactly-once' semantics.",
    "Because it uses sequential disk I/O, Kafka achieves very high throughput.",
    "It decouples data pipelines, allowing various microservices to consume the same data streams without impacting each other."
  ],
  questions: [
    { id: "kfk-q1", question: "What is a Kafka topic?", answer: "A logical category or feed name to which records are published.", topic: "Messaging", difficulty: "Beginner" },
    { id: "kfk-q2", question: "How does a consumer group work?", answer: "It allows multiple consumers to share the workload of reading from a topic. Each partition is assigned to one consumer in the group.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q3", question: "What is an offset in Kafka?", answer: "A unique identifier for each record within a partition, used to track the consumer's position.", topic: "Messaging", difficulty: "Beginner" },
    { id: "kfk-q4", question: "How does Kafka achieve fault tolerance?", answer: "By replicating topic partitions across multiple brokers.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q5", question: "What is the role of ZooKeeper in older Kafka clusters?", answer: "It manages cluster metadata, leader election, and broker coordination.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q6", question: "How are messages ordered in Kafka?", answer: "Kafka only guarantees order within a single partition, not across the entire topic.", topic: "Messaging", difficulty: "Beginner" },
    { id: "kfk-q7", question: "What happens if a consumer fails?", answer: "The group coordinator rebalances the partitions among the remaining consumers in the group.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q8", question: "What is log compaction?", answer: "A mechanism that ensures Kafka retains at least the last known value for each record key, saving space for state-based data.", topic: "Messaging", difficulty: "Advanced" },
    { id: "kfk-q9", question: "Explain 'exactly-once' semantics in Kafka.", answer: "It ensures records are delivered and processed exactly once, avoiding duplicates even in the event of failures, using idempotent producers and transactions.", topic: "Messaging", difficulty: "Advanced" },
    { id: "kfk-q10", question: "What is KRaft?", answer: "Kafka Raft metadata mode, which removes the dependency on ZooKeeper by using an internal Raft quorum.", topic: "Messaging", difficulty: "Advanced" },
    { id: "kfk-q11", question: "How does Kafka handle message deletion?", answer: "Messages are not deleted upon consumption. They are deleted based on a configured retention policy (time-based or size-based).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q12", question: "What is a partition leader?", answer: "The broker that handles all read and write requests for a specific partition. Followers merely replicate data.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q13", question: "Why is Kafka so fast despite writing to disk?", answer: "It relies heavily on the OS page cache and sequential disk I/O, avoiding slow random disk access.", topic: "Messaging", difficulty: "Advanced" },
    { id: "kfk-q14", question: "Can we increase the number of partitions in a topic?", answer: "Yes, but it can mess up message key hashing logic because the mapping of keys to partitions changes.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q15", question: "Can we decrease the number of partitions in a topic?", answer: "No, Kafka does not support decreasing partitions natively.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q16", question: "What is an In-Sync Replica (ISR)?", answer: "A replica that is fully caught up with the partition leader.", topic: "Messaging", difficulty: "Advanced" },
    { id: "kfk-q17", question: "How do you ensure message ordering for a specific user?", answer: "Use the user ID as the message key to ensure all messages for that user go to the same partition.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-q18", question: "What is 'acks=all'?", answer: "A producer configuration where the leader waits for all in-sync replicas to acknowledge the record before responding.", topic: "Messaging", difficulty: "Advanced" },
    { id: "kfk-q19", question: "What is a Kafka Streams application?", answer: "A client library for building applications and microservices that process and analyze data stored in Kafka.", topic: "Messaging", difficulty: "Advanced" },
    { id: "kfk-q20", question: "What is the 'thundering herd' problem in Kafka?", answer: "When many consumers connect simultaneously or a rebalance takes too long, causing massive overhead.", topic: "Messaging", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you handle poison pill messages in Kafka?",
    "How do you design a system to replay a massive stream of events from 3 months ago?",
    "How does increasing partitions affect ZooKeeper/KRaft overhead?"
  ],
  commonMistakes: [
    "Assuming Kafka topics have global order (order is only per partition).",
    "Using Kafka for large payloads like images or videos (usually limit is 1MB by default).",
    "Adding partitions dynamically without understanding the impact on key-based hashing.",
    "Not monitoring consumer lag, which can silently grow if ingestion outpaces consumption."
  ],
  interviewTraps: [
    "Treating Kafka exactly like a traditional queue (RabbitMQ) where messages vanish after being read.",
    "Failing to mention that a partition can only be read by one consumer per group."
  ],
  tradeoffs: [
    "Kafka offers extreme throughput and durability but has operational complexity and high latency compared to in-memory queues.",
    "Persistent storage allows replay but requires careful disk space management.",
    "Consumer groups provide scalability but can experience stop-the-world rebalances."
  ],
  comparisonTable: {
    title: "Kafka vs RabbitMQ vs SQS",
    columns: ["Feature", "Kafka", "RabbitMQ", "SQS"],
    rows: [
      { label: "Architecture", values: ["Distributed Log", "Message Broker", "Distributed Queue Service"] },
      { label: "Persistence", values: ["Configurable Retention", "Until consumed", "Up to 14 days"] },
      { label: "Routing", values: ["Simple (Topic/Partition)", "Complex (Exchanges)", "Simple (Queues)"] },
      { label: "Ordering", values: ["Per partition", "Per queue", "Best-effort / FIFO Queue"] },
      { label: "Replayability", values: ["Yes", "No", "No"] }
    ]
  },
  memoryTrick: "Kafka is a 'Kontinuous' log tape — you can rewind it, but you only write to the end.",
  realWorldExamples: [
    "Uber uses Kafka to stream driver and rider locations in real-time for pricing and matching.",
    "Netflix uses Kafka to process billions of events per day for analytics and monitoring."
  ],
  mermaidDiagram: `flowchart LR
    P[Producers] -->|Publish| K[Kafka Broker / Topic]
    K -->|Partition 1| C1[Consumer 1]
    K -->|Partition 2| C2[Consumer 2]
    K -->|Partition 3| C3[Consumer 3]
    subgraph Consumer Group
      C1
      C2
      C3
    end`,
  flashcards: [
    { id: "kfk-fc1", front: "Kafka Topic", back: "A logical category or stream name where records are published.", topic: "Messaging", difficulty: "Beginner" },
    { id: "kfk-fc2", front: "Consumer Group", back: "A group of consumers sharing the workload. Each partition is assigned to one consumer in the group.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-fc3", front: "Message Ordering Guarantees", back: "Kafka guarantees order only within a single partition, not globally across the topic.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "kfk-fc4", front: "Offset", back: "A sequential ID number assigned to each record in a partition.", topic: "Messaging", difficulty: "Beginner" },
    { id: "kfk-fc5", front: "Log Compaction", back: "Retains only the latest message for a specific key, useful for state restoration.", topic: "Messaging", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Apache Kafka Basics",
    sections: [
      { heading: "Core Concepts", items: ["Topic", "Partition", "Broker", "Producer", "Consumer Group"] },
      { heading: "Key Features", items: ["Persistent Storage", "High Throughput", "Message Replay", "Fault Tolerance"] },
      { heading: "Limitations", items: ["Not for large files", "Complex setup", "No global order"] }
    ]
  },
  speedNotes: [
    "Distributed log structure.",
    "Topics split into partitions.",
    "Order guaranteed per partition.",
    "Messages retained after consumption.",
    "High throughput via sequential I/O."
  ]
};
