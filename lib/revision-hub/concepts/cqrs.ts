import type { ConceptRevisionContent } from "./types";

export const cqrs: ConceptRevisionContent = {
  slug: "cqrs",
  title: "CQRS (Command Query Responsibility Segregation)",
  topic: "Architecture",
  difficulty: "Advanced",
  estimatedMinutes: 15,
  docLinks: [
    { label: "CQRS", href: "/docs/messaging/cqrs" },
    { label: "Event Sourcing", href: "/docs/messaging/event-sourcing" }
  ],
  summary: [
    "CQRS stands for Command Query Responsibility Segregation.",
    "It separates the models used to read data (Queries) from the models used to write/update data (Commands).",
    "Commands change state but return no data; Queries return data but do not change state.",
    "Allows independent scaling and optimization of read and write workloads.",
    "Often paired with Event Sourcing and introduces Eventual Consistency."
  ],
  whyAsked: [
    "To test your ability to design systems for high read/write asymmetry.",
    "To evaluate your understanding of eventually consistent data models."
  ],
  thirtySecondAnswer: "CQRS separates the data mutation operations (Commands) from the data retrieval operations (Queries) into distinct models or even separate databases. In a traditional CRUD system, the same data model handles both, which can become a bottleneck when read and write workloads have vastly different requirements. By separating them, CQRS allows you to optimize a normalized write database for complex validation, while projecting that data into denormalized, materialized views optimized for ultra-fast reads. The tradeoff is added complexity and eventual consistency.",
  detailedAnswer: [
    "Commands represent intent to change state (e.g., 'UpdateUserProfile'). They validate business rules and update the write database.",
    "Queries request data (e.g., 'GetUserProfile'). They read from a database optimized for specific view requirements.",
    "The Write and Read sides can use different database technologies (e.g., SQL for writes, NoSQL/Elasticsearch for reads).",
    "Changes on the Write side are synchronized to the Read side asynchronously, usually via an event bus.",
    "This asynchronous sync means the Read side is eventually consistent with the Write side.",
    "CQRS is frequently used alongside Event Sourcing, where the Write database stores a log of events rather than current state."
  ],
  questions: [
    { id: "cqrs-q1", question: "What does CQRS stand for?", answer: "Command Query Responsibility Segregation.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cqrs-q2", question: "What is the core principle of CQRS?", answer: "Separating the models and potentially the databases used for reading data from those used for writing data.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cqrs-q3", question: "What is a 'Command' in CQRS?", answer: "An operation that changes system state but does not return data (other than success/failure).", topic: "Architecture", difficulty: "Beginner" },
    { id: "cqrs-q4", question: "What is a 'Query' in CQRS?", answer: "An operation that retrieves data but does not modify the system state.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cqrs-q5", question: "Why is CQRS useful for scaling?", answer: "Read and write workloads often have vastly different scales. CQRS allows you to scale the read and write infrastructure independently.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cqrs-q6", question: "How does data get from the write database to the read database?", answer: "Usually via an asynchronous message bus or event broker that updates the read models when the write model changes.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cqrs-q7", question: "What is the main consistency tradeoff with CQRS?", answer: "Because data sync is asynchronous, the read models are eventually consistent. A user might write data and temporarily not see it on their next read.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-q8", question: "How is CQRS different from simple Read Replicas?", answer: "Read replicas copy the exact same schema. CQRS implies different models/schemas for reading and writing, optimized for their specific tasks.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-q9", question: "Why is CQRS often paired with Event Sourcing?", answer: "Event Sourcing captures all state changes as a sequence of events. These events are the perfect mechanism to drive the updates to the CQRS read models.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-q10", question: "Can CQRS be implemented with a single database?", answer: "Yes, by using separate schemas or tables for the write model and read views within the same database.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-q11", question: "What is a 'Materialized View' in the context of CQRS?", answer: "A pre-calculated, denormalized data structure on the read side tailored for a specific UI screen or query.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-q12", question: "How do you handle validation in CQRS?", answer: "Validation and business logic belong entirely on the Command (write) side.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-q13", question: "What happens if the sync process between write and read databases fails?", answer: "The read models become stale. The sync process must be robust, usually relying on message queues with retries.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-q14", question: "How can you mitigate the UX impact of eventual consistency?", answer: "By using optimistic UI updates (updating the client UI locally while the command processes in the background).", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-q15", question: "How do you rebuild a read model if requirements change?", answer: "If using Event Sourcing, you can replay all historical events from the write store to build a completely new read model.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cqrs-q16", question: "Is CQRS a top-level architectural style?", answer: "No, it's usually applied at the bounded context or component level where the read/write asymmetry justifies the complexity.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cqrs-q17", question: "What is 'Task-Based UI' and how does it relate to CQRS?", answer: "UIs that send explicit commands (e.g., 'PromoteEmployee') rather than CRUD updates (e.g., 'UpdateUser'). This aligns perfectly with CQRS commands.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cqrs-q18", question: "How does CQRS impact security?", answer: "It allows you to apply different security and authorization rules for reading versus writing data at a granular level.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cqrs-q19", question: "What are the drawbacks of CQRS?", answer: "High architectural complexity, cognitive load for developers, and the operational burden of managing multiple data stores and message buses.", topic: "Architecture", difficulty: "Advanced" },
    { id: "cqrs-q20", question: "When should you NOT use CQRS?", answer: "For simple CRUD applications where the read and write models are identical and load is low. It introduces unnecessary complexity.", topic: "Architecture", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you deal with the eventual consistency lag on the UI?",
    "Why not just use database read replicas?",
    "How does Event Sourcing fit into this?"
  ],
  commonMistakes: [
    "Applying CQRS globally to an entire system instead of specific high-contention bounded contexts.",
    "Using CQRS without understanding how to handle eventual consistency.",
    "Making the Read and Write models identical, defeating the purpose of the pattern."
  ],
  interviewTraps: [
    "Suggesting CQRS for a simple CRUD application where standard relational models would suffice."
  ],
  tradeoffs: [
    "Complexity: Double the models, asynchronous messaging, and handling eventual consistency.",
    "Stale Data: Users might briefly see outdated data after making an update."
  ],
  memoryTrick: "Write over here, read over there.",
  realWorldExamples: [
    "Social Media feeds: Writing a post goes through complex validation/fanout (Commands), but reading the timeline pulls from a pre-computed cache (Queries).",
    "Financial Systems: High-throughput transaction recording (Commands) separate from complex reporting and analytics (Queries)."
  ],
  mermaidDiagram: `flowchart TD
  A[Client] -->|Command| B(Write API)
  A -->|Query| C(Read API)
  B --> D[(Write DB)]
  D -->|Event/Sync| E[Message Bus]
  E --> F[(Read DB/Cache)]
  F --> C`,
  flashcards: [
    { id: "cqrs-fc1", front: "What is CQRS?", back: "Separating Read (Query) models from Write (Command) models.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cqrs-fc2", front: "What is a Command?", back: "An operation that alters state but returns no data.", topic: "Architecture", difficulty: "Beginner" },
    { id: "cqrs-fc3", front: "What is the main consistency tradeoff?", back: "Eventual consistency between the write and read data stores.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-fc4", front: "CQRS vs Read Replicas?", back: "Replicas copy the exact schema. CQRS uses different schemas optimized for reads.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "cqrs-fc5", front: "Why pair CQRS with Event Sourcing?", back: "Events from the write store easily drive updates to the denormalized read views.", topic: "Architecture", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "CQRS Pattern",
    sections: [
      { heading: "Commands", items: ["Mutate state", "Contain business logic/validation", "Do not return data"] },
      { heading: "Queries", items: ["Return data", "Do not mutate state", "Read from denormalized views"] },
      { heading: "Tradeoffs", items: ["Eventual consistency", "High complexity", "Infrastructure overhead"] }
    ]
  },
  speedNotes: [
    "Separates reads and writes.",
    "Commands mutate state.",
    "Queries read state.",
    "Enables independent scaling.",
    "Introduces eventual consistency."
  ]
};
