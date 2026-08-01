import type { ConceptRevisionContent } from "./types";

export const rabbitmq: ConceptRevisionContent = {
  slug: "rabbitmq",
  title: "RabbitMQ",
  topic: "Messaging",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "RabbitMQ Docs", href: "/docs/messaging/rabbitmq" },
    { label: "Queues", href: "/docs/messaging/queues" }
  ],
  summary: [
    "RabbitMQ is an open-source message broker widely used for traditional message queuing.",
    "It implements the Advanced Message Queuing Protocol (AMQP).",
    "It supports complex routing through exchanges and bindings.",
    "Once a message is delivered and acknowledged, it is removed from the queue.",
    "RabbitMQ is designed for low latency and flexible routing rather than infinite persistence."
  ],
  whyAsked: [
    "To test understanding of traditional message queues.",
    "To evaluate knowledge of complex routing topologies.",
    "Because RabbitMQ is the standard choice for task queues and async background jobs."
  ],
  thirtySecondAnswer: "RabbitMQ is a flexible, low-latency message broker that uses exchanges to route messages to various queues based on rules (bindings). It is primarily designed for point-to-point task queues and pub-sub where messages are deleted immediately after successful processing, making it ideal for decoupled microservices that require complex routing.",
  detailedAnswer: [
    "Producers publish messages to Exchanges, not directly to Queues.",
    "Exchanges use Binding rules to route messages to one or more Queues (Direct, Topic, Fanout, Headers).",
    "Consumers pull or are pushed messages from Queues.",
    "Messages are typically deleted once they are consumed and acknowledged (ack).",
    "RabbitMQ supports message acknowledgments and dead-letter exchanges for error handling.",
    "It works best when the dataset fits in memory, though it can page to disk."
  ],
  questions: [
    { id: "rmq-q1", question: "What is an Exchange in RabbitMQ?", answer: "A routing entity that receives messages from producers and pushes them to queues based on rules.", topic: "Messaging", difficulty: "Beginner" },
    { id: "rmq-q2", question: "Name the four types of exchanges in RabbitMQ.", answer: "Direct, Topic, Fanout, and Headers.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-q3", question: "How does a Direct exchange work?", answer: "It routes messages to queues based on an exact match of the routing key.", topic: "Messaging", difficulty: "Beginner" },
    { id: "rmq-q4", question: "How does a Fanout exchange work?", answer: "It broadcasts all messages it receives to all queues bound to it.", topic: "Messaging", difficulty: "Beginner" },
    { id: "rmq-q5", question: "How does a Topic exchange work?", answer: "It routes messages to queues based on wildcard matches between the routing key and the routing pattern.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-q6", question: "What is a Binding in RabbitMQ?", answer: "A link between a queue and an exchange, defining the rules (like routing keys) for routing messages.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-q7", question: "What happens to a message after it is consumed?", answer: "Once the consumer sends an acknowledgment (ack), the message is deleted from the broker.", topic: "Messaging", difficulty: "Beginner" },
    { id: "rmq-q8", question: "What is a Dead Letter Exchange (DLX)?", answer: "An exchange to which messages are routed if they are rejected, expire, or if the queue is full.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-q9", question: "Can RabbitMQ store messages indefinitely like Kafka?", answer: "No, RabbitMQ is not a database. It is designed to empty queues as fast as possible.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-q10", question: "What is AMQP?", answer: "Advanced Message Queuing Protocol, the standard protocol that RabbitMQ implements.", topic: "Messaging", difficulty: "Beginner" },
    { id: "rmq-q11", question: "How does RabbitMQ handle consumer failures?", answer: "If a consumer disconnects without sending an ack, RabbitMQ requeues the message for another consumer.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-q12", question: "What is basic.qos (prefetch count)?", answer: "A setting that limits the number of unacknowledged messages sent to a consumer at once.", topic: "Messaging", difficulty: "Advanced" },
    { id: "rmq-q13", question: "How do you achieve high availability in RabbitMQ?", answer: "Using Quorum Queues or Classic Mirrored Queues across a cluster.", topic: "Messaging", difficulty: "Advanced" },
    { id: "rmq-q14", question: "What happens if a queue has no consumers?", answer: "Messages will pile up in the queue until a consumer connects or it hits a limit (like TTL or length limit).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-q15", question: "What is message durability?", answer: "Marking messages as persistent so they survive a broker restart (saved to disk).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-q16", question: "What is the difference between a durable queue and a persistent message?", answer: "A durable queue survives restarts, but its messages won't unless they are also marked persistent.", topic: "Messaging", difficulty: "Advanced" },
    { id: "rmq-q17", question: "What is a delayed message in RabbitMQ?", answer: "A message scheduled to be delivered to a queue after a certain time, often implemented via TTL and DLX.", topic: "Messaging", difficulty: "Advanced" },
    { id: "rmq-q18", question: "Can you replay messages in RabbitMQ?", answer: "No, once acknowledged, they are gone.", topic: "Messaging", difficulty: "Beginner" },
    { id: "rmq-q19", question: "What is the 'publisher confirms' feature?", answer: "An extension where the broker asynchronously confirms to the publisher that the message has been handled safely.", topic: "Messaging", difficulty: "Advanced" },
    { id: "rmq-q20", question: "How does RabbitMQ handle backpressure?", answer: "It can block publishers (TCP backpressure) or use publisher confirms to throttle incoming rates.", topic: "Messaging", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you build a delayed retry mechanism using RabbitMQ?",
    "When would you choose RabbitMQ over Kafka?",
    "How do you handle poisonous messages that cause consumers to crash repeatedly?"
  ],
  commonMistakes: [
    "Confusing Exchanges and Queues.",
    "Forgetting that RabbitMQ deletes messages after acknowledgment.",
    "Assuming RabbitMQ is suitable for real-time stream processing with replay."
  ],
  interviewTraps: [
    "Using RabbitMQ as a permanent data store.",
    "Not mentioning prefetch limits, which can lead to consumer memory exhaustion if one consumer takes all messages."
  ],
  tradeoffs: [
    "Offers very flexible routing but lower throughput compared to append-only logs like Kafka.",
    "Low latency in-memory processing, but performance degrades if queues grow too large and page to disk.",
    "Strong traditional queuing features (DLX, TTL) but lacks event streaming capabilities."
  ],
  memoryTrick: "Rabbits jump fast from exchange to queue, but leave no tracks (messages are deleted).",
  realWorldExamples: [
    "Sending welcome emails when a user signs up (background task).",
    "Processing payment webhooks where each job must be processed reliably and retried on failure."
  ],
  mermaidDiagram: `flowchart LR
    P[Producer] -->|Publish| E(Exchange)
    E -->|Binding 1| Q1[Queue 1]
    E -->|Binding 2| Q2[Queue 2]
    Q1 -->|Consume/Ack| C1[Consumer A]
    Q2 -->|Consume/Ack| C2[Consumer B]`,
  flashcards: [
    { id: "rmq-fc1", front: "Exchange", back: "Receives messages and routes them to queues based on bindings.", topic: "Messaging", difficulty: "Beginner" },
    { id: "rmq-fc2", front: "Fanout Exchange", back: "Broadcasts messages to all bound queues.", topic: "Messaging", difficulty: "Beginner" },
    { id: "rmq-fc3", front: "Message Acknowledgment", back: "Consumer signals successful processing, triggering message deletion.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-fc4", front: "Dead Letter Exchange (DLX)", back: "A destination for rejected, expired, or dropped messages.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "rmq-fc5", front: "Prefetch Count", back: "Limits unacknowledged messages per consumer to prevent overwhelming them.", topic: "Messaging", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "RabbitMQ Essentials",
    sections: [
      { heading: "Exchange Types", items: ["Direct (Exact match)", "Topic (Wildcard match)", "Fanout (Broadcast)", "Headers (Header match)"] },
      { heading: "Key Features", items: ["Complex Routing", "Message Acknowledgments", "Dead Letter Exchanges"] },
      { heading: "Best Use Cases", items: ["Task Queues", "Microservice decoupling", "Background Jobs"] }
    ]
  },
  speedNotes: [
    "Smart broker, dumb consumers.",
    "Messages deleted after Ack.",
    "Exchanges route to queues.",
    "Optimized for low latency.",
    "Not for infinite retention."
  ]
};
