import type { ConceptRevisionContent } from "./types";

export const messageQueues: ConceptRevisionContent = {
  slug: "message-queues",
  title: "Message Queues",
  topic: "Messaging",
  difficulty: "Intermediate",
  estimatedMinutes: 12,
  docLinks: [
    { label: "Message Queues", href: "/docs/messaging/queues" },
    { label: "Kafka", href: "/docs/messaging/kafka" },
    { label: "RabbitMQ", href: "/docs/messaging/rabbitmq" }
  ],
  summary: [
    "A message queue is a form of asynchronous service-to-service communication used in serverless and microservices architectures.",
    "It decouples the producer of a message from the consumer, allowing them to scale independently.",
    "Messages are stored on the queue until they are processed and deleted by a consumer.",
    "They provide reliable delivery, buffering during traffic spikes (leveling), and help build resilient systems.",
    "Common examples include RabbitMQ, Amazon SQS, and ActiveMQ."
  ],
  whyAsked: [
    "To test understanding of asynchronous processing and decoupling.",
    "To see how you handle traffic bursts without dropping requests.",
    "To evaluate knowledge of system resilience and background job processing."
  ],
  thirtySecondAnswer: "Message queues allow different parts of a system to communicate asynchronously. A producer pushes a message onto a queue, and a consumer pulls it off later to process it. This decouples the services, meaning if the consumer is slow or goes down, messages are safely buffered in the queue. They are essential for handling traffic spikes, running background tasks, and increasing overall system fault tolerance.",
  detailedAnswer: [
    "Decoupling: Producers and consumers don't need to know about each other or be online at the same time.",
    "Load Leveling: Queues act as a buffer. If a sudden spike in traffic occurs, the queue absorbs the messages, and consumers process them at their own pace.",
    "Reliability: Messages persist in the queue (if configured) until a consumer explicitly acknowledges successful processing.",
    "Point-to-Point: Typically, in a standard queue, a message is consumed by exactly one consumer (unlike pub/sub where many receive it).",
    "Dead Letter Queues (DLQ): If a message repeatedly fails to process, it is moved to a DLQ for manual inspection.",
    "Scaling: You can independently scale producers (web servers) and consumers (worker nodes) based on the queue depth."
  ],
  questions: [
    { id: "mq-q1", question: "What is a message queue?", answer: "An asynchronous communication mechanism that buffers messages between a producer and a consumer.", topic: "Messaging", difficulty: "Beginner" },
    { id: "mq-q2", question: "What is decoupling in the context of message queues?", answer: "Producers and consumers operate independently; they don't need to be available at the same time.", topic: "Messaging", difficulty: "Beginner" },
    { id: "mq-q3", question: "What happens if a consumer crashes while processing a message?", answer: "Because it hasn't sent an acknowledgment (ACK), the queue makes the message visible again for another consumer to process.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-q4", question: "What is a Dead Letter Queue (DLQ)?", answer: "A secondary queue where messages are sent if they repeatedly fail to process, preventing infinite retry loops.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-q5", question: "What is load leveling?", answer: "Using a queue to absorb bursts of traffic so downstream services can process work at a steady, sustainable pace.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-q6", question: "What is the difference between a Queue and Pub/Sub?", answer: "In a Queue, one message goes to one consumer. In Pub/Sub, one message goes to all subscribed consumers.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-q7", question: "How do queues help with auto-scaling?", answer: "You can monitor the queue length (depth). If it grows, you can spin up more consumer instances.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-q8", question: "What is 'at-least-once' delivery?", answer: "The queue guarantees the message is delivered, but in failure scenarios, it might be delivered multiple times.", topic: "Messaging", difficulty: "Advanced" },
    { id: "mq-q9", question: "Why must consumers be idempotent?", answer: "Because queues typically provide at-least-once delivery, consumers must safely handle processing the same message twice.", topic: "Messaging", difficulty: "Advanced" },
    { id: "mq-q10", question: "What is a visibility timeout?", answer: "The time a message is hidden from other consumers while one consumer processes it. If it expires before an ACK, the message reappears.", topic: "Messaging", difficulty: "Advanced" },
    { id: "mq-q11", question: "Give an example use case for a message queue.", answer: "Sending welcome emails after a user registers, or processing video uploads.", topic: "Messaging", difficulty: "Beginner" },
    { id: "mq-q12", question: "What is FIFO (First-In-First-Out)?", answer: "A queue that guarantees messages are processed in the exact order they were received. (Often harder to scale).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-q13", question: "What is head-of-line blocking in queues?", answer: "When a problematic message at the front of a FIFO queue prevents subsequent messages from being processed.", topic: "Messaging", difficulty: "Advanced" },
    { id: "mq-q14", question: "How does polling work in queues?", answer: "Consumers constantly ask the queue 'do you have messages?' (Short polling) or wait for a set time for messages to arrive (Long polling).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-q15", question: "What is backpressure?", answer: "When a queue gets full, it signals producers to slow down to prevent out-of-memory errors on the message broker.", topic: "Messaging", difficulty: "Advanced" },
    { id: "mq-q16", question: "Name a popular cloud-based message queue service.", answer: "Amazon SQS (Simple Queue Service).", topic: "Messaging", difficulty: "Beginner" },
    { id: "mq-q17", question: "What is 'exactly-once' processing?", answer: "A hard-to-achieve guarantee where a message is processed only one time, requiring coordination between the queue and consumer state.", topic: "Messaging", difficulty: "Advanced" },
    { id: "mq-q18", question: "Why avoid putting large payloads (like images) directly in a queue?", answer: "Queues are optimized for small text messages. Put large files in S3 and pass the S3 URL in the queue message.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-q19", question: "What is message persistence?", answer: "The broker saves messages to disk so they survive a broker restart.", topic: "Messaging", difficulty: "Beginner" },
    { id: "mq-q20", question: "Can a message queue reduce latency?", answer: "For the user, yes: the web server instantly returns 'Success' after queueing the task, rather than waiting for the task to finish.", topic: "Messaging", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How do you handle duplicate messages in a queue system?",
    "When would you choose Kafka (Event Streaming) over RabbitMQ (Message Queue)?",
    "How do you design a system to maintain strict ordering of messages?"
  ],
  commonMistakes: [
    "Assuming queues guarantee exactly-once delivery by default.",
    "Putting large binary blobs directly into the queue payload.",
    "Not designing consumer services to be idempotent."
  ],
  interviewTraps: [
    "Using a queue when synchronous communication (HTTP/gRPC) is actually required (e.g., waiting for a payment confirmation to show the user).",
    "Forgetting about the Dead Letter Queue, leading to poison pill messages breaking the consumer loop forever."
  ],
  tradeoffs: [
    "Asynchronous vs Synchronous: Async (queues) improves user latency and resilience but adds complexity and eventual consistency.",
    "Standard vs FIFO Queues: Standard is highly scalable and fast but out-of-order; FIFO guarantees order but limits throughput."
  ],
  memoryTrick: "Queues are like a coffee shop line: Cashier (Producer) takes orders fast, Baristas (Consumers) make them at their own pace.",
  realWorldExamples: [
    "Amazon SQS handling background email notifications.",
    "RabbitMQ distributing image resizing tasks to worker nodes."
  ],
  mermaidDiagram: `flowchart LR\n    P1[Producer] -->|Message| Q[(Message Queue)]\n    P2[Producer] -->|Message| Q\n    Q -->|Pulls Message| C1[Consumer 1]\n    Q -->|Pulls Message| C2[Consumer 2]\n    C1 -.->|ACK| Q\n    style Q fill:#f9f,stroke:#333,stroke-width:2px`,
  flashcards: [
    { id: "mq-fc1", front: "What is decoupling?", back: "Separating producers and consumers so they can scale and fail independently.", topic: "Messaging", difficulty: "Beginner" },
    { id: "mq-fc2", front: "What is Load Leveling?", back: "Using a queue as a buffer to absorb traffic spikes so consumers aren't overwhelmed.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-fc3", front: "What happens if a consumer doesn't ACK a message?", back: "The visibility timeout expires and the message is put back in the queue.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "mq-fc4", front: "What is a Dead Letter Queue (DLQ)?", back: "A queue for messages that repeatedly fail to process.", topic: "Messaging", difficulty: "Beginner" },
    { id: "mq-fc5", front: "Why must consumers be idempotent?", back: "Because queues usually guarantee 'at-least-once' delivery, meaning duplicates can happen.", topic: "Messaging", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Message Queues Cheat Sheet",
    sections: [
      {
        heading: "Core Concepts",
        items: [
          "Producer: Sends the message.",
          "Consumer: Processes the message.",
          "Broker: The server hosting the queue."
        ]
      },
      {
        heading: "Delivery Guarantees",
        items: [
          "At-most-once: Messages might drop, no duplicates.",
          "At-least-once: No drops, duplicates possible (standard).",
          "Exactly-once: Hard to achieve, requires state coordination."
        ]
      },
      {
        heading: "Design Rules",
        items: [
          "Keep payloads small (pointers to S3 for big data).",
          "Always make consumers idempotent.",
          "Always configure a Dead Letter Queue."
        ]
      }
    ]
  },
  speedNotes: [
    "Decouples producers and consumers.",
    "Absorbs massive traffic spikes.",
    "Consumers must be idempotent.",
    "DLQs catch poison pill messages.",
    "Usually point-to-point (1:1)."
  ]
};
