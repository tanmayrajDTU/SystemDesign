import type { ConceptRevisionContent } from "./types";

export const eventSourcing: ConceptRevisionContent = {
  slug: "event-sourcing",
  title: "Event Sourcing",
  topic: "Architecture",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Event Sourcing", href: "/docs/messaging/event-sourcing" },
    { label: "CQRS", href: "/docs/messaging/cqrs" },
  ],
  summary: [
    "Event Sourcing is an architectural pattern where the state of an application is determined by a sequence of events.",
    "Instead of storing just the current state of data in a domain, append-only events are stored.",
    "The current state is derived by replaying these events from the beginning.",
    "It is inherently coupled with the CQRS (Command Query Responsibility Segregation) pattern.",
    "Provides an extremely reliable audit log and allows for time-travel queries.",
  ],
  whyAsked: [
    "To assess your understanding of complex state management in distributed systems.",
    "To see if you know how to build highly auditable and reliable systems (e.g., financial ledgers).",
    "To test your knowledge of handling eventual consistency and system recovery.",
  ],
  thirtySecondAnswer: "Event Sourcing dictates that every change to the state of an application is captured in an event object, and these event objects are themselves stored in the sequence they were applied for the same lifetime as the application state itself. Instead of storing the current state (like a bank balance), we store the history of all transactions (deposits and withdrawals) and calculate the balance by replaying them. This guarantees a perfect audit trail, the ability to reconstruct state at any point in time, and naturally supports distributed messaging.",
  detailedAnswer: [
    "All data modifications are recorded as a sequence of immutable events in an append-only store (Event Store).",
    "The application state is projected or materialized by replaying the event stream.",
    "Read models and write models are often separated using CQRS, as reading from an event store directly is inefficient for complex queries.",
    "Snapshots are used to optimize state reconstruction: instead of replaying millions of events, the system loads the latest snapshot and replays only the events that occurred after the snapshot.",
    "Event schema evolution and versioning are critical challenges, as historical events cannot be modified.",
    "Event sourcing provides resilience, as events can be replayed to rebuild lost or corrupted read models.",
  ],
  questions: [
    { id: "evs-q1", question: "What is Event Sourcing?", answer: "A pattern where state changes are logged as a sequence of immutable events rather than storing the current state directly.", topic: "Architecture", difficulty: "Beginner" },
    { id: "evs-q2", question: "Why is Event Sourcing useful for auditing?", answer: "Because every change is recorded as an immutable event, providing a complete and tamper-proof history of how the system reached its current state.", topic: "Architecture", difficulty: "Beginner" },
    { id: "evs-q3", question: "How is the current state derived in Event Sourcing?", answer: "By sequentially replaying all stored events from the beginning of time.", topic: "Architecture", difficulty: "Beginner" },
    { id: "evs-q4", question: "What is an Event Store?", answer: "A database specifically designed for storing and retrieving append-only event streams.", topic: "Architecture", difficulty: "Beginner" },
    { id: "evs-q5", question: "Why are snapshots used in Event Sourcing?", answer: "To prevent having to replay every single event from the beginning of time to calculate current state, improving performance.", topic: "Architecture", difficulty: "Beginner" },
    { id: "evs-q6", question: "What is the relationship between Event Sourcing and CQRS?", answer: "They are often used together because querying an append-only event store is inefficient. CQRS maintains separate read models updated asynchronously via events.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "evs-q7", question: "What does 'append-only' mean in this context?", answer: "Events can only be added to the store; they cannot be updated or deleted once written.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "evs-q8", question: "How do you handle event schema changes?", answer: "Through event versioning and upcasting, transforming old event formats into newer formats when they are read.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "evs-q9", question: "What is 'time-travel' in Event Sourcing?", answer: "The ability to reconstruct the application's state at any specific point in the past by replaying events up to that timestamp.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "evs-q10", question: "How does Event Sourcing help with debugging?", answer: "You can copy the event store to a test environment and replay events to reproduce the exact state that caused a bug.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "evs-q11", question: "What happens if an event processing fails?", answer: "The system can retry processing the event, or route it to a dead-letter queue for manual intervention, ensuring no data loss.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "evs-q12", question: "What is a 'Command' vs an 'Event'?", answer: "A command is an intent to change state (e.g., 'UpdateUser'), which can be rejected. An event is a record of a state change that has already happened (e.g., 'UserUpdated').", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-q13", question: "How does Event Sourcing handle data privacy requirements like GDPR's 'Right to be Forgotten'?", answer: "It's challenging due to immutability. Solutions include crypto-shredding (deleting the encryption key used for PII) or appending compensating events.", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-q14", question: "What is an aggregate in Domain-Driven Design and Event Sourcing?", answer: "A cluster of domain objects treated as a single unit for data changes, ensuring consistency boundaries.", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-q15", question: "How do you handle concurrent commands on the same aggregate?", answer: "By using optimistic concurrency control: the command checks the expected version of the aggregate before appending new events.", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-q16", question: "What is Eventual Consistency's role in Event Sourcing?", answer: "Read models (projections) are updated asynchronously, meaning they might temporarily lag behind the true state in the Event Store.", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-q17", question: "Can you use a standard RDBMS as an Event Store?", answer: "Yes, by storing events as serialized JSON in a single table, though dedicated event stores offer better streaming capabilities.", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-q18", question: "What is a saga in the context of Event Sourcing?", answer: "A mechanism to handle long-running business processes spanning multiple microservices by orchestrating a sequence of local transactions via events.", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-q19", question: "What is the difference between Event Sourcing and Event-Driven Architecture?", answer: "EDA uses events for communication between services. Event Sourcing uses events as the single source of truth for the application state.", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-q20", question: "How do you rebuild a corrupt projection?", answer: "Drop the read database entirely, reset the projection offset, and replay all events from the event store to rebuild it.", topic: "Architecture", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "How do you handle GDPR (Right to be Forgotten) in an append-only store?",
    "How do you deal with the performance overhead of replaying events?",
    "How do you handle schema migrations for events?",
  ],
  commonMistakes: [
    "Using Event Sourcing for simple CRUD applications where it introduces unnecessary complexity.",
    "Failing to implement snapshots, leading to severe performance degradation over time.",
    "Putting large payloads or binary data directly into events instead of referencing external blob storage.",
  ],
  interviewTraps: [
    "Confusing Event Sourcing with standard Event-Driven Architecture. EDA is about communication; ES is about state storage.",
    "Forgetting about eventual consistency. If a user makes a write and immediately reads, they might see stale data unless mitigated.",
  ],
  tradeoffs: [
    "Provides a perfect audit log and time-travel debugging vs. High learning curve and significant architectural complexity.",
    "Excellent for high-throughput writes vs. Requires separate read models (CQRS) for complex queries.",
    "Immune to state loss vs. Difficult to handle data deletion (GDPR) and schema evolution.",
  ],
  memoryTrick: "Event Sourcing is an Accountant's Ledger: You don't use an eraser to update a balance, you append a new transaction line.",
  realWorldExamples: [
    "Banking Systems: Keeping a ledger of all transactions rather than just updating an account balance.",
    "E-commerce Shopping Carts: Recording every 'item added' or 'item removed' to analyze user behavior before checkout.",
  ],
  mermaidDiagram: `sequenceDiagram
    participant User
    participant CommandHandler
    participant EventStore
    participant Projector
    participant ReadDatabase
    User->>CommandHandler: Send Command (e.g., AddItem)
    CommandHandler->>EventStore: Append Event (ItemAdded)
    EventStore-->>CommandHandler: Ack
    CommandHandler-->>User: Success
    EventStore->>Projector: Publish Event (ItemAdded)
    Projector->>ReadDatabase: Update Read Model
    User->>ReadDatabase: Query State
    ReadDatabase-->>User: Return Current State (Eventually Consistent)
  `,
  flashcards: [
    { id: "evs-fc1", front: "What is the core principle of Event Sourcing?", back: "Application state is stored as a sequence of immutable events rather than current state values.", topic: "Architecture", difficulty: "Beginner" },
    { id: "evs-fc2", front: "What is a Snapshot in Event Sourcing?", back: "A periodic saving of the current state to prevent replaying all historical events from the beginning.", topic: "Architecture", difficulty: "Beginner" },
    { id: "evs-fc3", front: "Why are Event Sourcing and CQRS usually paired?", back: "Because querying an append-only log of events is inefficient, so CQRS is used to create optimized read views.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "evs-fc4", front: "How do you delete data in Event Sourcing (e.g., for GDPR)?", back: "Through Crypto-Shredding (deleting the key used to encrypt the PII) or appending compensating 'forget' events.", topic: "Architecture", difficulty: "Advanced" },
    { id: "evs-fc5", front: "What is the difference between a Command and an Event?", back: "A Command is a request to do something (can fail/be rejected). An Event is a fact that something has already happened.", topic: "Architecture", difficulty: "Intermediate" },
  ],
  cheatSheet: {
    title: "Event Sourcing Concepts",
    sections: [
      {
        heading: "Core Components",
        items: [
          "Event Store: Append-only database for events.",
          "Command: Intent to mutate state.",
          "Event: Immutable fact of what happened.",
          "Aggregate: Domain boundary that processes commands and emits events.",
        ],
      },
      {
        heading: "Benefits",
        items: [
          "100% accurate audit log.",
          "Time-travel queries (point-in-time state).",
          "Excellent write performance.",
          "Prevents data loss from accidental updates.",
        ],
      },
      {
        heading: "Challenges",
        items: [
          "Steep learning curve.",
          "Eventual consistency complexity.",
          "Event schema versioning.",
          "Data deletion (GDPR).",
        ],
      },
    ],
  },
  speedNotes: [
    "State is derived from events.",
    "Events are immutable and append-only.",
    "Snapshots optimize state reconstruction.",
    "Usually paired with CQRS.",
    "Crypto-shredding solves GDPR deletion.",
  ],
};
