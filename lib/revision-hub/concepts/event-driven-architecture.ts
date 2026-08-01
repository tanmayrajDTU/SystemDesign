import type { ConceptRevisionContent } from "./types";

export const eventDrivenArchitecture: ConceptRevisionContent = {
  slug: "event-driven-architecture",
  title: "Event-Driven Architecture",
  topic: "Messaging",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Event-Driven Architecture", href: "/docs/messaging/event-driven-architecture" },
    { label: "Pub-Sub Pattern", href: "/docs/messaging/pub-sub" },
    { label: "Apache Kafka", href: "/docs/messaging/kafka" }
  ],
  summary: [
    "Event-Driven Architecture (EDA) is a design pattern where decoupled services communicate by producing and consuming events.",
    "An event represents a state change or an action that has occurred in the past (e.g., 'OrderPlaced').",
    "It promotes high loose-coupling and asynchronous processing.",
    "Producers do not know who the consumers are (fire-and-forget).",
    "It heavily relies on message brokers or event streaming platforms like Kafka, RabbitMQ, or AWS EventBridge.",
    "EDA is essential for highly scalable, real-time reactive systems."
  ],
  whyAsked: [
    "To evaluate your ability to design decoupled, scalable microservices.",
    "To test your knowledge of eventual consistency and distributed data management.",
    "EDA is a standard pattern for modern cloud-native systems."
  ],
  thirtySecondAnswer: "Event-Driven Architecture is a paradigm where system components communicate asynchronously via events. When a state change happens, a service publishes an event to a broker. Any number of interested services can subscribe to and react to that event independently. This decouples the producer from the consumer, improving scalability and resilience, but introduces challenges like eventual consistency, complex debugging, and message ordering.",
  detailedAnswer: [
    "Events are immutable facts about something that happened in the past.",
    "Producers publish events to a broker/router; consumers subscribe to topics or event streams.",
    "Supports patterns like Event Sourcing (storing all events as the source of truth) and CQRS (separating reads and writes).",
    "Choreography is a common way to manage sagas in EDA, where services react to each other's events without a central controller.",
    "Because processing is asynchronous, the system relies on eventual consistency rather than ACID transactions.",
    "Failure handling often requires dead-letter queues, retries, and idempotent consumers."
  ],
  questions: [
    { id: "eda-q1", question: "What is an event in EDA?", answer: "An immutable record of a state change or an action that occurred in the past.", topic: "Messaging", difficulty: "Beginner" },
    { id: "eda-q2", question: "What is the difference between a command and an event?", answer: "A command is a request for an action to happen (imperative); an event is a statement that an action has already happened (declarative).", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-q3", question: "What is Publisher/Subscriber (Pub/Sub)?", answer: "A messaging pattern where publishers send messages to topics, and any number of subscribers can receive them independently.", topic: "Messaging", difficulty: "Beginner" },
    { id: "eda-q4", question: "How does EDA improve system coupling?", answer: "By making producers unaware of consumers. The producer just fires an event, allowing consumers to be added or modified independently.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-q5", question: "What is Event Sourcing?", answer: "A pattern where the entire state of an application is derived from a sequence of stored events rather than keeping just the current state.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-q6", question: "What is CQRS?", answer: "Command Query Responsibility Segregation. It separates the read model from the write model, often using events to synchronize them.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-q7", question: "What is eventual consistency?", answer: "A guarantee that, given enough time without new updates, all nodes/services will reflect the same state.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-q8", question: "How do you handle duplicate events?", answer: "By designing consumers to be idempotent, meaning processing the same event multiple times has the same effect as processing it once.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-q9", question: "What is Event Choreography?", answer: "A decentralized way to handle distributed transactions where each service produces and listens to events to decide what to do next.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-q10", question: "What is Event Orchestration?", answer: "A centralized approach where a coordinator service (orchestrator) commands other services on what to execute.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-q11", question: "Why is tracing difficult in EDA?", answer: "Because requests cross multiple asynchronous boundaries, making it hard to track the full lifecycle without correlation IDs.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-q12", question: "What is an Outbox Pattern?", answer: "A technique to reliably publish events by storing them in the same database transaction as the business entity, then forwarding them to a broker.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-q13", question: "What happens if a broker goes down?", answer: "In a well-designed EDA, producers might buffer events or fail fast, but consumers simply stop processing until the broker recovers, without losing data.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-q14", question: "What is a 'fat event' vs a 'thin event'?", answer: "A fat event contains the entire state payload; a thin event only contains IDs, requiring the consumer to fetch the state via API.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-q15", question: "What is a dead-letter queue (DLQ) used for in EDA?", answer: "To isolate events that repeatedly fail processing so they don't block the processing pipeline and can be inspected later.", topic: "Messaging", difficulty: "Beginner" },
    { id: "eda-q16", question: "How do you handle schema changes for events?", answer: "By using schema registries (like Avro/Protobuf) and versioning events to ensure backward/forward compatibility.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-q17", question: "Can EDA be used for synchronous UI interactions?", answer: "Usually no; if the UI needs immediate confirmation of a complex flow, polling or WebSockets are needed to bridge the async gap.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-q18", question: "What is an Event Router/Broker?", answer: "The middleware (like Kafka, EventBridge, or RabbitMQ) responsible for receiving events and routing them to subscribers.", topic: "Messaging", difficulty: "Beginner" },
    { id: "eda-q19", question: "What is a poison pill?", answer: "A malformed event that a consumer cannot process, causing it to crash or infinitely retry, blocking the queue.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-q20", question: "Why avoid using a shared database in microservices instead of events?", answer: "A shared DB tightly couples services, causing a single point of failure and preventing independent scaling and schema evolution.", topic: "Messaging", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How do you implement the Outbox pattern effectively?",
    "How do you choose between Choreography and Orchestration for a Saga?",
    "How do you enforce idempotency in a consumer?"
  ],
  commonMistakes: [
    "Publishing 'commands' instead of 'events' (tight coupling).",
    "Not planning for out-of-order events.",
    "Assuming event delivery is strictly exactly-once without idempotent consumers."
  ],
  interviewTraps: [
    "Designing an EDA system but requiring synchronous HTTP calls between microservices to complete a workflow.",
    "Ignoring the complexity of debugging and lack of correlation IDs."
  ],
  tradeoffs: [
    "Extreme decoupling and scalability, but high operational complexity and steep learning curve.",
    "Better performance for writes, but eventual consistency can confuse users expecting immediate reads.",
    "Great fault tolerance (services can go down independently), but difficult to trace end-to-end flows."
  ],
  memoryTrick: "In EDA, services are like gossips: one shouts 'I did this!', and anyone interested listens and acts without the shouter caring.",
  realWorldExamples: [
    "E-commerce order flow: Checkout service emits 'OrderPlaced', Inventory, Payment, and Shipping services independently react.",
    "Ridesharing: Driver app emits 'LocationUpdated', which billing, mapping, and ETA services consume asynchronously."
  ],
  mermaidDiagram: `flowchart TD
    OS[Order Service] -->|OrderPlaced Event| EB(Event Broker / Kafka)
    EB -->|Subscribes| IS[Inventory Service]
    EB -->|Subscribes| PS[Payment Service]
    EB -->|Subscribes| NS[Notification Service]`,
  flashcards: [
    { id: "eda-fc1", front: "Event", back: "An immutable record of something that happened in the past.", topic: "Messaging", difficulty: "Beginner" },
    { id: "eda-fc2", front: "Idempotency", back: "The property where processing an event multiple times yields the same result as processing it once.", topic: "Messaging", difficulty: "Intermediate" },
    { id: "eda-fc3", front: "Outbox Pattern", back: "Saving events to a DB table in the same transaction as state changes, then relaying them to a broker.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-fc4", front: "Choreography vs Orchestration", back: "Choreography: Services react to each other's events. Orchestration: A central controller commands services.", topic: "Messaging", difficulty: "Advanced" },
    { id: "eda-fc5", front: "Eventual Consistency", back: "The system will eventually reach a consistent state once all events are processed, but might be inconsistent briefly.", topic: "Messaging", difficulty: "Intermediate" }
  ],
  cheatSheet: {
    title: "Event-Driven Architecture",
    sections: [
      { heading: "Core Patterns", items: ["Pub/Sub", "Event Sourcing", "CQRS", "Outbox Pattern"] },
      { heading: "Benefits", items: ["Loose Coupling", "Asynchronous Scaling", "Fault Isolation"] },
      { heading: "Challenges", items: ["Eventual Consistency", "Duplicate Handling", "Distributed Tracing"] }
    ]
  },
  speedNotes: [
    "Asynchronous communication.",
    "Producers decouple from consumers.",
    "Events are immutable facts.",
    "Requires idempotent consumers.",
    "Relies on eventual consistency."
  ]
};
