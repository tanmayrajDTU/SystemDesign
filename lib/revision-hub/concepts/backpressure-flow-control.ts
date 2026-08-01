import type { ConceptRevisionContent } from "./types";

export const backpressureFlowControl: ConceptRevisionContent = {
  slug: "backpressure-flow-control",
  title: "Backpressure & Flow Control",
  topic: "Advanced Topics",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Message Queues", href: "/docs/messaging/queues" },
    { label: "Kafka", href: "/docs/messaging/kafka" },
  ],
  summary: [
    "Backpressure is a mechanism to handle situations where a data producer outpaces a consumer.",
    "Without backpressure, consumers can crash due to Out of Memory (OOM) errors.",
    "Flow control manages the rate of data transmission to prevent overwhelming receivers.",
    "Techniques include buffering, dropping data, or signaling the producer to slow down.",
    "Message brokers like Kafka decouple producers and consumers, acting as a massive buffer.",
    "Reactive Streams is a standard for asynchronous stream processing with non-blocking backpressure."
  ],
  whyAsked: [
    "To test your understanding of system stability under heavy load.",
    "To evaluate how you prevent cascading failures in streaming/event-driven architectures.",
    "To see if you understand the differences between push and pull models."
  ],
  thirtySecondAnswer: "Backpressure is how a system gracefully handles spikes in traffic when consumers cannot keep up with producers. Instead of blindly accepting data until memory runs out, a system applying backpressure will tell the producer to slow down, drop less critical packets, or buffer the data in a robust queue like Kafka. Flow control is the broader concept of matching transmission rates between nodes.",
  detailedAnswer: [
    "In a strict push model, a fast producer overwhelms a slow consumer, leading to resource exhaustion.",
    "Backpressure signals upstream components to throttle data generation.",
    "Buffering stores excess data temporarily but is limited by memory/disk.",
    "Load shedding (dropping data) is used when data is lossy (e.g., metrics, video frames).",
    "Pull models (like Kafka consumers) naturally implement backpressure because consumers only request data when ready.",
    "TCP uses sliding windows for network-level flow control and backpressure."
  ],
  questions: [
    { id: "bpfc-q1", question: "What is backpressure?", answer: "A feedback mechanism where a system signals upstream components to slow down data transmission because it cannot keep up.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bpfc-q2", question: "What happens if a system lacks backpressure?", answer: "Buffers overflow, leading to Out Of Memory (OOM) errors, crashes, and lost data.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bpfc-q3", question: "What is flow control?", answer: "The process of managing the rate of data transmission between nodes to prevent overwhelming the receiver.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bpfc-q4", question: "How does a message queue like RabbitMQ or Kafka help with backpressure?", answer: "It acts as a durable buffer, decoupling the producer's rate from the consumer's rate.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bpfc-q5", question: "What is load shedding?", answer: "Intentionally dropping incoming requests or data to prevent the system from collapsing under load.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bpfc-q6", question: "Why is buffering alone not a complete backpressure solution?", answer: "Because buffers have finite size; eventually, memory or disk space will run out.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bpfc-q7", question: "What is the difference between push and pull models regarding backpressure?", answer: "Pull models naturally have backpressure (consumers fetch when ready). Push models require explicit backpressure signaling to avoid overwhelming the consumer.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-q8", question: "How does TCP implement flow control?", answer: "Using a sliding window protocol, where the receiver advertises how much buffer space it has left.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-q9", question: "What is the Leaky Bucket algorithm used for?", answer: "Traffic shaping and flow control, ensuring data is processed at a constant rate regardless of bursty input.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-q10", question: "What is the Token Bucket algorithm?", answer: "An algorithm that allows bursts of traffic up to a limit, as long as 'tokens' are available.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-q11", question: "How does Reactive Streams handle backpressure?", answer: "It uses a non-blocking pull model where the subscriber requests a specific number of items (demand) from the publisher.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-q12", question: "When would you choose to drop data as a backpressure strategy?", answer: "When processing real-time sensor data, video streaming, or non-critical logs where the latest data is more important than old data.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-q13", question: "How does returning HTTP 429 Too Many Requests relate to backpressure?", answer: "It is a form of explicit backpressure (rate limiting), telling the client to slow down and retry later.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-q14", question: "What is 'Cascading Failure' and how does backpressure prevent it?", answer: "When one node fails, shifting load to others and causing them to fail. Backpressure prevents this by rejecting load early rather than crashing.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-q15", question: "What is a 'Circuit Breaker' and how does it differ from backpressure?", answer: "A circuit breaker stops calling a failing downstream service entirely. Backpressure is about slowing down the rate, not stopping it completely.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bpfc-q16", question: "How do you implement backpressure in an actor system (like Akka)?", answer: "Actors use bounded mailboxes. If a mailbox is full, the system can drop messages or return a failure to the sender.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bpfc-q17", question: "What is the 'Thundering Herd' problem and how does jitter help?", answer: "When many clients retry simultaneously after a failure. Jitter adds randomness to backoff times to smooth out the load.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bpfc-q18", question: "Explain 'CoDel' (Controlled Delay) algorithm.", answer: "An active queue management algorithm used in networking to solve bufferbloat by dropping packets if they stay in the queue too long.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bpfc-q19", question: "How does Kafka handle backpressure if a consumer is completely dead?", answer: "Kafka retains messages on disk up to a time or size limit (retention policy). If the consumer doesn't recover in time, data is deleted.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bpfc-q20", question: "Can backpressure propagate all the way to the user interface?", answer: "Yes, ideally. If the DB is slow, the backend throttles the API, which returns a 429, prompting the UI to show a 'please wait' message.", topic: "Advanced Topics", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you design a system that handles 10x normal traffic spikes?",
    "When is it acceptable to drop data instead of buffering it?",
    "How does the pull model of Kafka solve the fast-producer/slow-consumer problem?"
  ],
  commonMistakes: [
    "Assuming unbounded queues are a safe solution (they cause OOM).",
    "Confusing rate limiting (API level) with backpressure (internal system architecture), though they are related.",
    "Forgetting that backpressure must propagate up the entire chain to be fully effective."
  ],
  interviewTraps: [
    "Saying you will just 'scale up consumers'—scaling takes time and might not happen fast enough to prevent a crash.",
    "Using synchronous HTTP calls between microservices without timeouts or circuit breakers."
  ],
  tradeoffs: [
    "Buffering: Safe but increases latency and memory usage.",
    "Dropping Data: Preserves system stability but loses information.",
    "Throttling upstream: Prevents overload but reduces overall throughput."
  ],
  memoryTrick: "Think of a funnel. If you pour water too fast, it overflows (crash). Backpressure is yelling at the person pouring to slow down, or putting a larger bowl (buffer) underneath.",
  realWorldExamples: [
    "Node.js streams use the pause() and resume() methods to implement backpressure when piping file reads to network sockets.",
    "Netflix uses Reactive Streams (RxJava) heavily to handle asynchronous data streams with built-in backpressure."
  ],
  mermaidDiagram: `flowchart TD\n    A[Fast Producer] -->|Send Data| B(Bounded Queue)\n    B -->|Pull Data| C[Slow Consumer]\n    B -.->|Queue Full: Signal to Slow Down| A`,
  flashcards: [
    { id: "bpfc-fc1", front: "What is the main purpose of backpressure?", back: "To prevent a slow consumer from being overwhelmed by a fast producer, avoiding OOM errors.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bpfc-fc2", front: "Why are unbounded queues dangerous?", back: "Under heavy load, they will grow infinitely until the system runs out of memory and crashes.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-fc3", front: "What is Load Shedding?", back: "Intentionally dropping data or requests to maintain system stability under extreme load.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bpfc-fc4", front: "How does a Pull Model help with backpressure?", back: "Consumers only request data when they have capacity to process it, inherently throttling the flow.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bpfc-fc5", front: "What HTTP status code is often used to signal backpressure to a client?", back: "429 Too Many Requests.", topic: "Advanced Topics", difficulty: "Intermediate" }
  ],
  cheatSheet: {
    title: "Backpressure & Flow Control",
    sections: [
      { heading: "Strategies", items: ["Control/Throttle Producer", "Buffer in Queue", "Drop Data (Load Shedding)", "Scale Consumers"] },
      { heading: "Push vs Pull", items: ["Push: Risky without signaling", "Pull: Inherently safe (consumers control rate)"] },
      { heading: "Network Level", items: ["TCP Sliding Window", "CoDel (Active Queue Management)"] },
      { heading: "Application Level", items: ["Reactive Streams", "Circuit Breakers", "Bounded Queues"] }
    ]
  },
  speedNotes: [
    "Prevents fast producers crashing consumers.",
    "Throttles upstream data flow.",
    "Unbounded queues cause OOM errors.",
    "Pull models have natural backpressure.",
    "Load shedding drops data to survive."
  ]
};
