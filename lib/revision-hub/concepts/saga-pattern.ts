import type { ConceptRevisionContent } from "./types";

export const sagaPattern: ConceptRevisionContent = {
  slug: "saga-pattern",
  title: "Saga Pattern",
  topic: "Architecture",
  difficulty: "Advanced",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Saga Pattern", href: "/docs/microservices/saga-pattern" },
    { label: "Event-Driven Architecture", href: "/docs/messaging/event-driven-architecture" }
  ],
  summary: [
    "The Saga pattern manages distributed transactions across multiple microservices.",
    "It breaks a large transaction into a sequence of smaller, local transactions.",
    "If one step fails, compensating transactions are triggered to undo the work of previous steps.",
    "It relies on eventual consistency rather than ACID compliance.",
    "Can be implemented via Choreography (events) or Orchestration (central controller)."
  ],
  whyAsked: [
    "To test your ability to handle data consistency across microservices.",
    "To see if you understand compensating transactions and eventual consistency."
  ],
  thirtySecondAnswer: "In a microservices architecture, a single business process often spans multiple databases, making standard ACID transactions impossible. The Saga pattern solves this by breaking the process into local transactions executed sequentially. If a step fails, the Saga executes 'compensating transactions' in reverse order to undo the previous steps, ensuring eventual consistency. It is implemented either via Choreography (services react to events) or Orchestration (a central coordinator manages the workflow).",
  detailedAnswer: [
    "A Saga is a sequence of local transactions where each updates data within a single service.",
    "Each local transaction publishes an event or message to trigger the next transaction in the Saga.",
    "If a local transaction fails (e.g., payment declined), the Saga executes compensating transactions to undo preceding successful steps (e.g., cancel order, restock inventory).",
    "Choreography: Decentralized. Services listen for events and decide what to do. Good for simple workflows.",
    "Orchestration: Centralized. An Orchestrator tells participants what local transactions to execute. Better for complex workflows.",
    "Sagas sacrifice Isolation (the 'I' in ACID) for Availability and Partition tolerance, relying on eventual consistency."
  ],
  questions: [
    { id: "sga-q1", question: "What problem does the Saga pattern solve?", answer: "Maintaining data consistency across multiple microservices without using distributed transactions (like 2PC).", topic: "Architecture", difficulty: "Beginner" },
    { id: "sga-q2", question: "What is a local transaction in a Saga?", answer: "A standard ACID transaction performed within a single microservice's database.", topic: "Architecture", difficulty: "Beginner" },
    { id: "sga-q3", question: "What is a compensating transaction?", answer: "An operation that conceptually undoes the work of a previous local transaction if the overall Saga fails.", topic: "Architecture", difficulty: "Beginner" },
    { id: "sga-q4", question: "What are the two main ways to coordinate a Saga?", answer: "Choreography and Orchestration.", topic: "Architecture", difficulty: "Beginner" },
    { id: "sga-q5", question: "Explain Saga Choreography.", answer: "Services broadcast events when a local transaction completes, and other services listen to those events to trigger their own transactions.", topic: "Architecture", difficulty: "Beginner" },
    { id: "sga-q6", question: "Explain Saga Orchestration.", answer: "A central controller (orchestrator) explicitly tells participating services which local transactions to execute.", topic: "Architecture", difficulty: "Beginner" },
    { id: "sga-q7", question: "Why is 2-Phase Commit (2PC) usually avoided in microservices?", answer: "It relies on synchronous blocking locks across all databases, which creates a single point of failure, reduces availability, and scales poorly.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-q8", question: "Does a Saga guarantee ACID properties?", answer: "No, it lacks Isolation. Changes made by local transactions are visible to other requests before the entire Saga completes.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-q9", question: "What is a 'pivot' transaction in a Saga?", answer: "The point of no return. If the pivot transaction succeeds, the Saga will run to completion. If it fails, the Saga rolls back.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-q10", question: "What is a 'retriable' transaction?", answer: "Transactions that occur after the pivot transaction and are guaranteed to succeed eventually.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-q11", question: "What happens if a compensating transaction fails?", answer: "It must be retried until it succeeds. Compensating transactions MUST be idempotent and guaranteed to succeed eventually.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-q12", question: "How does Idempotency play a role in Sagas?", answer: "Message delivery can be duplicated. Local and compensating transactions must be idempotent to avoid double processing.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-q13", question: "When should you choose Choreography over Orchestration?", answer: "For simple workflows with few participants (e.g., 2-4 services) where adding an orchestrator is overkill.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-q14", question: "When should you choose Orchestration over Choreography?", answer: "For complex workflows, to avoid cyclic dependencies, and when you need a central place to monitor the Saga's state.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-q15", question: "What is the 'Lost Update' anomaly in a Saga?", answer: "Because Sagas lack Isolation, another process might overwrite data updated by the first transaction of a Saga before the Saga finishes.", topic: "Architecture", difficulty: "Advanced" },
    { id: "sga-q16", question: "How do you handle lack of Isolation in Sagas?", answer: "Using techniques like semantic locks (flags like 'PENDING_PAYMENT') or commutative updates to prevent anomalies.", topic: "Architecture", difficulty: "Advanced" },
    { id: "sga-q17", question: "What is the Transactional Outbox pattern, and why is it used with Sagas?", answer: "It ensures a service reliably updates its database AND publishes the event to the message broker atomically, preventing partial failures.", topic: "Architecture", difficulty: "Advanced" },
    { id: "sga-q18", question: "How do you trace a Saga across services?", answer: "By passing a unique correlation ID across all events and API calls involved in the Saga.", topic: "Architecture", difficulty: "Advanced" },
    { id: "sga-q19", question: "What are the drawbacks of Orchestration?", answer: "The orchestrator can become a single point of failure and a bottleneck, and it concentrates too much domain logic in one place.", topic: "Architecture", difficulty: "Advanced" },
    { id: "sga-q20", question: "Can you mix Choreography and Orchestration?", answer: "Yes, a complex system might use Orchestration for complex intra-domain workflows and Choreography for inter-domain events.", topic: "Architecture", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you handle failures during a compensating transaction?",
    "How does the Outbox pattern help with Saga reliability?",
    "How do you handle isolation anomalies (e.g., users seeing partially updated data)?"
  ],
  commonMistakes: [
    "Assuming compensating transactions can easily restore the exact previous state (often they just apply a logical reverse).",
    "Designing Sagas without idempotency, leading to double-processing on retries.",
    "Using Orchestration for simple 2-step processes, adding unnecessary complexity."
  ],
  interviewTraps: [
    "Suggesting 2-Phase Commit (2PC) as the primary solution for microservice transactions without acknowledging its massive performance and availability drawbacks."
  ],
  tradeoffs: [
    "Complexity: Significant development overhead to write and maintain compensating transactions.",
    "Lack of Isolation: Requires application-level logic to handle temporary inconsistent states."
  ],
  comparisonTable: {
    title: "Choreography vs Orchestration Saga",
    columns: ["Feature", "Choreography", "Orchestration"],
    rows: [
      { label: "Control Flow", values: ["Decentralized (Event-driven)", "Centralized (Controller)"] },
      { label: "Coupling", values: ["Loose (Services don't know about each other)", "Tighter (Orchestrator knows about services)"] },
      { label: "Complexity", values: ["Low for simple workflows, High for complex ones", "High initial setup, but easier for complex workflows"] },
      { label: "State Management", values: ["Distributed across services", "Centralized in Orchestrator"] },
      { label: "Best For", values: ["Simple workflows (2-4 steps)", "Complex workflows (many steps, conditional logic)"] }
    ]
  },
  memoryTrick: "A Saga is a story of many steps. If a chapter goes wrong, you have to un-write the previous chapters.",
  realWorldExamples: [
    "E-commerce order fulfillment (Order created -> Inventory reserved -> Payment processed).",
    "Travel booking (Flight booked -> Hotel booked -> Car rental booked)."
  ],
  mermaidDiagram: `flowchart LR
  A[Order Service] -->|1. Create Order| B(Inventory Service)
  B -->|2. Reserve Stock| C(Payment Service)
  C -->|3. Payment Fails| D{Compensate}
  D -->|4. Release Stock| B
  D -->|5. Cancel Order| A`,
  flashcards: [
    { id: "sga-fc1", front: "What is a Saga?", back: "A sequence of local transactions to manage distributed transactions.", topic: "Architecture", difficulty: "Beginner" },
    { id: "sga-fc2", front: "What is a Compensating Transaction?", back: "An operation that undoes a previous local transaction in a Saga.", topic: "Architecture", difficulty: "Beginner" },
    { id: "sga-fc3", front: "Choreography vs Orchestration?", back: "Choreography is event-driven and decentralized; Orchestration uses a central controller.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-fc4", front: "Does Saga guarantee ACID?", back: "No, it lacks Isolation. It relies on eventual consistency.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "sga-fc5", front: "What is a Pivot Transaction?", back: "The go/no-go point. If it succeeds, the Saga runs to completion; if it fails, it rolls back.", topic: "Architecture", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Saga Pattern",
    sections: [
      { heading: "Concepts", items: ["Local Transaction", "Compensating Transaction", "Pivot Transaction", "Eventual Consistency"] },
      { heading: "Choreography", items: ["Event-driven", "Decentralized", "Good for simple flows", "Hard to track overall state"] },
      { heading: "Orchestration", items: ["Central controller", "Easier to manage complex flows", "Single point of failure/bottleneck"] }
    ]
  },
  speedNotes: [
    "Replaces distributed transactions.",
    "Sequence of local transactions.",
    "Uses compensating transactions for rollback.",
    "Choreography = Events.",
    "Orchestration = Controller."
  ]
};
