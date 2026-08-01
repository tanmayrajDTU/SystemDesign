import type { ConceptRevisionContent } from "./types";

export const amazonSqs: ConceptRevisionContent = {
  slug: "amazon-sqs",
  title: "Amazon SQS",
  topic: "Messaging",
  difficulty: "Intermediate",
  estimatedMinutes: 10,
  docLinks: [
    { label: "Amazon SQS", href: "/docs/messaging/sqs" },
    { label: "Message Queues", href: "/docs/messaging/queues" }
  ],
  summary: [
    "Amazon SQS is a fully managed message queuing service by AWS.",
    "It offers standard queues (high throughput, best-effort ordering) and FIFO queues (strict ordering, lower throughput).",
    "Consumers pull messages using short or long polling.",
    "It uses a visibility timeout to prevent multiple consumers from processing the same message simultaneously.",
    "SQS integrates seamlessly with AWS Lambda and SNS.",
    "It is serverless, meaning no infrastructure to manage and scales infinitely."
  ],
  whyAsked: [
    "To test cloud-native architectural patterns.",
    "To see if you understand standard vs. FIFO tradeoffs.",
    "SQS is a staple in AWS-based system design interviews for decoupling systems."
  ],
  thirtySecondAnswer: "Amazon SQS is a managed message queue that reliably stores messages as they travel between microservices. It scales automatically and requires no infrastructure management. Consumers poll the queue, and a 'visibility timeout' hides the message from others while it's being processed. Once processed, the consumer explicitly deletes it. SQS comes in Standard (best-effort order, at-least-once) and FIFO (strict order, exactly-once) flavors.",
  detailedAnswer: [
    "Standard Queues offer nearly unlimited throughput but can deliver duplicates (at-least-once) and might deliver out of order.",
    "FIFO Queues guarantee order and exactly-once processing but have throughput limits (300-3000 API calls/sec).",
    "Visibility Timeout temporarily hides a message after it's polled; if not deleted before timeout, it reappears in the queue.",
    "Long Polling reduces API calls by holding the connection open until a message arrives, saving cost.",
    "Dead-Letter Queues (DLQ) capture messages that fail processing multiple times.",
    "Maximum message size is 256 KB (can use S3 for larger payloads via Extended Client Library)."
  ],
  questions: [
    { id: "sqs-q1", question: "What is Amazon SQS?", answer: "A fully managed message queuing service for decoupling microservices.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-q2", question: "What is the difference between Standard and FIFO queues?", answer: "Standard has high throughput with best-effort ordering; FIFO ensures strict ordering and exactly-once processing but lower throughput.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-q3", question: "What is a Visibility Timeout?", answer: "A period during which a polled message is invisible to other consumers to prevent duplicate processing.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-q4", question: "What happens if a consumer crashes while processing a message?", answer: "The visibility timeout expires, and the message becomes visible in the queue again for another consumer.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-q5", question: "What is Long Polling?", answer: "A method where the SQS consumer waits (up to 20s) for a message to arrive if the queue is empty, reducing API calls.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-q6", question: "What is Short Polling?", answer: "The consumer queries a subset of SQS servers and returns immediately, even if no messages are found.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-q7", question: "How does a message get removed from SQS?", answer: "The consumer must explicitly call the DeleteMessage API after successful processing.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-q8", question: "What is a Dead Letter Queue (DLQ) in SQS?", answer: "A queue for messages that cannot be successfully processed after a maximum number of receives.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-q9", question: "What is the maximum message size in SQS?", answer: "256 KB.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-q10", question: "How do you handle messages larger than 256 KB?", answer: "Store the payload in S3 and send a message containing the S3 pointer (SQS Extended Client).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-q11", question: "Can SQS trigger a Lambda function?", answer: "Yes, AWS Lambda supports SQS as an event source mapping.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-q12", question: "What is a Message Group ID in FIFO queues?", answer: "A tag that specifies that messages belonging to the same group are processed in strict order.", topic: "Messaging", difficulty: "Advanced" },
    { id: "sqs-q13", question: "What is Message Deduplication ID?", answer: "A token used in FIFO queues to identify and prevent duplicate messages within a 5-minute deduplication interval.", topic: "Messaging", difficulty: "Advanced" },
    { id: "sqs-q14", question: "What is the maximum retention period for an SQS message?", answer: "14 days.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-q15", question: "Can you broadcast a single message to multiple SQS queues directly?", answer: "No, SQS is point-to-point. You must use Amazon SNS to fan out to multiple SQS queues.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-q16", question: "What is the 'ReceiveMessageWaitTimeSeconds' attribute?", answer: "The configuration that enables Long Polling (when set to > 0).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-q17", question: "Is SQS a push or pull based system?", answer: "Pull-based. Consumers must poll SQS for messages.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-q18", question: "How do you scale consumers for a Standard Queue?", answer: "Simply add more consumer instances (e.g., auto-scaling group based on queue length).", topic: "Messaging", difficulty: "Advanced" },
    { id: "sqs-q19", question: "How do you scale consumers for a FIFO Queue?", answer: "Throughput is limited by Message Group IDs; you must use many diverse Group IDs to scale out parallel consumption.", topic: "Messaging", difficulty: "Advanced" },
    { id: "sqs-q20", question: "What is an In-flight message?", answer: "A message that has been received by a consumer but not yet deleted, and whose visibility timeout has not expired.", topic: "Messaging", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How does SNS + SQS fan-out pattern work?",
    "Why might you receive the same message twice in a Standard queue?",
    "How do you design a retry mechanism with exponential backoff using SQS?"
  ],
  commonMistakes: [
    "Assuming standard SQS provides ordered delivery.",
    "Forgetting to delete messages after processing, causing infinite processing loops.",
    "Polling with short polling in low-traffic queues, wasting CPU and API costs."
  ],
  interviewTraps: [
    "Confusing SQS (queuing) with SNS (pub/sub).",
    "Designing high-throughput systems with FIFO queues without understanding the harsh RPS limits."
  ],
  tradeoffs: [
    "Fully managed and infinitely scalable, but lacks complex routing out-of-the-box (needs SNS).",
    "FIFO provides guarantees but drastically reduces throughput.",
    "Pull-based model requires worker infrastructure, unlike push models."
  ],
  memoryTrick: "SQS Visibility Timeout is like renting a book — if you don't 'buy' (delete) it in time, it goes back on the shelf for others.",
  realWorldExamples: [
    "Decoupling an e-commerce checkout from the inventory reservation system.",
    "Buffering high-velocity clickstream logs before processing them into a database."
  ],
  mermaidDiagram: `flowchart LR
    P[Producer] -->|Send| Q[(SQS Queue)]
    Q -.->|Poll/Receive| C[Consumer]
    C -.->|Delete on Success| Q
    Q -->|Visibility Timeout Expires| Q
    Q -->|Max Receives Reached| DLQ[(Dead Letter Queue)]`,
  flashcards: [
    { id: "sqs-fc1", front: "Standard vs FIFO SQS", back: "Standard = At-least-once, out of order, high throughput. FIFO = Exactly-once, ordered, limited throughput.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-fc2", front: "Visibility Timeout", back: "Time a message is hidden from other consumers while being processed.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-fc3", front: "Long Polling", back: "Consumer waits up to 20s for a message, reducing empty responses and cost.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "sqs-fc4", front: "Dead Letter Queue (DLQ)", back: "A queue to capture messages that fail processing multiple times.", topic: "Messaging", difficulty: "Beginner" },
    { id: "sqs-fc5", front: "SNS to SQS Pattern", back: "Fan-out architecture where an SNS topic broadcasts messages to multiple subscribed SQS queues.", topic: "Messaging", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Amazon SQS Basics",
    sections: [
      { heading: "Queue Types", items: ["Standard (Best-effort)", "FIFO (Strict order)"] },
      { heading: "Key Mechanics", items: ["Visibility Timeout", "Long vs Short Polling", "Explicit Deletion required"] },
      { heading: "Limits", items: ["Max Size: 256 KB", "Max Retention: 14 days"] }
    ]
  },
  speedNotes: [
    "Fully managed AWS queue.",
    "Pull-based consumer model.",
    "Visibility timeout prevents dupes.",
    "Standard = high scale, unordered.",
    "FIFO = strict order, low scale."
  ]
};
