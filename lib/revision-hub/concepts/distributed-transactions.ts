import type { ConceptRevisionContent } from "./types";

export const distributedTransactions: ConceptRevisionContent = {
  slug: "distributed-transactions",
  title: "Distributed Transactions (2PC vs Saga)",
  topic: "Advanced Topics",
  difficulty: "Advanced",
  estimatedMinutes: 25,
  docLinks: [
    { label: "ACID Properties", href: "/docs/databases/acid" },
    { label: "Saga Pattern", href: "/docs/microservices/saga-pattern" },
  ],
  summary: [
    "A distributed transaction involves updating data across multiple independent databases or services.",
    "Ensuring ACID properties across distributed systems is notoriously difficult.",
    "Two-Phase Commit (2PC) is a synchronous protocol to achieve strong consistency.",
    "2PC relies on a coordinator and has a prepare phase and a commit phase.",
    "The Saga pattern is an asynchronous approach for long-running transactions.",
    "Saga relies on local transactions and compensating transactions for rollbacks."
  ],
  whyAsked: [
    "To test your ability to design robust microservices architectures.",
    "To evaluate your understanding of consistency vs. availability tradeoffs.",
    "To see if you know how to handle partial failures in distributed systems."
  ],
  thirtySecondAnswer: "Distributed transactions update data across multiple services. 2PC guarantees strong consistency using a coordinator that asks all participants to prepare, then commit, but it is blocking and a single point of failure. The Saga pattern splits the transaction into a sequence of local transactions, providing eventual consistency. If one step fails, compensating transactions are triggered to undo the previous steps.",
  detailedAnswer: [
    "2PC Phase 1 (Prepare): Coordinator asks all nodes if they can commit. Nodes lock resources and reply.",
    "2PC Phase 2 (Commit/Rollback): If all reply yes, coordinator sends commit. If any say no, it sends rollback.",
    "2PC is synchronous, blocks resources, and struggles with coordinator failure.",
    "Saga executes a sequence of local transactions, publishing events/messages to trigger the next step.",
    "If a Saga step fails, the system executes compensating transactions in reverse order to undo changes.",
    "Saga provides BASE/eventual consistency and is preferred in microservices for scalability."
  ],
  questions: [
    { id: "dtx-q1", question: "What is a distributed transaction?", answer: "A transaction that involves updating data across multiple independent data stores or services.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dtx-q2", question: "What does 2PC stand for?", answer: "Two-Phase Commit.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dtx-q3", question: "What are the two phases of 2PC?", answer: "The Prepare phase and the Commit (or Rollback) phase.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dtx-q4", question: "What is the role of the coordinator in 2PC?", answer: "It manages the transaction, querying participants in the prepare phase and broadcasting the final decision.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dtx-q5", question: "What is a Saga?", answer: "A sequence of local transactions where each step triggers the next, using compensating transactions for rollbacks.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dtx-q6", question: "Does Saga guarantee ACID?", answer: "No, it typically guarantees eventual consistency (ACD without full Isolation).", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dtx-q7", question: "What happens if the coordinator fails in 2PC during the prepare phase?", answer: "Participants may remain blocked, holding locks on resources until the coordinator recovers or a timeout occurs.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-q8", question: "Why is 2PC considered anti-scalable?", answer: "Because it relies on synchronous blocking locks across all participants, limiting throughput.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-q9", question: "What is a compensating transaction?", answer: "A transaction specifically designed to semantically undo the effects of a previous local transaction in a Saga.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-q10", question: "What are the two main ways to coordinate a Saga?", answer: "Choreography (event-driven, decentralized) and Orchestration (centralized controller).", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-q11", question: "Which is better for simple Sagas: Choreography or Orchestration?", answer: "Choreography is simpler for a few steps, but Orchestration is better for complex workflows.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-q12", question: "How do you handle isolation issues in Sagas?", answer: "Using semantic locks, commutative updates, or versioning, since Sagas lack true database isolation.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-q13", question: "What is 3PC (Three-Phase Commit)?", answer: "An extension of 2PC adding a 'pre-commit' phase to avoid blocking on coordinator failure, though rarely used in practice.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-q14", question: "How does the Outbox pattern relate to Sagas?", answer: "It ensures that local database updates and the event published to trigger the next Saga step are committed atomically.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-q15", question: "Can a compensating transaction fail?", answer: "Yes, compensating transactions must be idempotent and retried until successful, as you cannot 'rollback a rollback'.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dtx-q16", question: "What is the 'Lost Update' anomaly in Sagas?", answer: "Since Sagas lack isolation, a concurrent transaction might overwrite a Saga's partial update before it completes.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dtx-q17", question: "How does the 'Try-Confirm/Cancel' (TCC) pattern differ from Saga?", answer: "TCC is similar to 2PC but at the service level. It reserves resources (Try) before confirming or canceling, whereas Saga commits immediately and compensates later.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dtx-q18", question: "Explain the heuristic exception in distributed transactions.", answer: "It occurs when a participant makes a unilateral decision to commit/rollback (due to timeout) that contradicts the global decision.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dtx-q19", question: "How does Spanner handle distributed transactions?", answer: "Google Spanner uses 2PC combined with Paxos and TrueTime (atomic clocks) to provide strong consistency without the typical blocking issues.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "dtx-q20", question: "Why avoid distributed transactions if possible?", answer: "They add significant complexity, latency, and points of failure. Redesigning boundaries or accepting eventual consistency is often better.", topic: "Advanced Topics", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you implement orchestration for a Saga?",
    "What happens if the message broker goes down during a Saga?",
    "How does Google Spanner solve the 2PC performance problem?"
  ],
  commonMistakes: [
    "Assuming 2PC is suitable for high-throughput microservices.",
    "Forgetting that compensating transactions must be idempotent.",
    "Confusing Saga with a standard database rollback."
  ],
  interviewTraps: [
    "Proposing 2PC in a loosely coupled microservices architecture.",
    "Failing to account for the lack of isolation in a Saga pattern."
  ],
  tradeoffs: [
    "2PC: Strong consistency vs. low availability/performance.",
    "Saga: High availability/performance vs. eventual consistency.",
    "Saga Choreography: Decentralized/no single point of failure vs. hard to debug/trace.",
    "Saga Orchestration: Easy to trace/manage vs. single point of failure (the orchestrator)."
  ],
  comparisonTable: {
    title: "2PC vs Saga Pattern",
    columns: ["Feature", "Two-Phase Commit (2PC)", "Saga Pattern"],
    rows: [
      { label: "Consistency", values: ["Strong (ACID)", "Eventual (BASE)"] },
      { label: "Locking", values: ["Synchronous blocking", "No global locks (local commits)"] },
      { label: "Rollback Mechanism", values: ["Standard DB rollback", "Compensating transactions"] },
      { label: "Performance", values: ["Low (high latency)", "High (asynchronous)"] },
      { label: "Best Use Case", values: ["Single monolithic DB / low-scale", "Distributed microservices"] }
    ]
  },
  memoryTrick: "2PC is like a strict wedding (everyone must agree before it's official). Saga is like buying an airline ticket and a hotel separately (if the hotel is full, you have to explicitly cancel the airline ticket).",
  realWorldExamples: [
    "E-commerce order fulfillment (payment, inventory, shipping) typically uses the Saga pattern.",
    "Traditional enterprise RDBMS operations across multiple tables/databases use 2PC (XA transactions)."
  ],
  mermaidDiagram: `flowchart LR\n    A[Order Service] -->|1. Create Order| B[Payment Service]\n    B -->|2. Charge| C{Success?}\n    C -->|Yes| D[Inventory Service]\n    D -->|3. Reserve| E[Complete]\n    C -->|No| F[Compensate: Cancel Order]`,
  flashcards: [
    { id: "dtx-fc1", front: "What is the main drawback of Two-Phase Commit?", back: "It is synchronous, blocking, and a single point of failure (coordinator).", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dtx-fc2", front: "How does Saga handle failure?", back: "By executing compensating transactions to undo previous steps.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-fc3", front: "What consistency model does Saga provide?", back: "Eventual consistency.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "dtx-fc4", front: "What are the two ways to implement Saga?", back: "Choreography (event-driven) and Orchestration (central controller).", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "dtx-fc5", front: "Must compensating transactions be idempotent?", back: "Yes, because they might be retried upon network failures.", topic: "Advanced Topics", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Distributed Transactions",
    sections: [
      { heading: "2PC (Two-Phase Commit)", items: ["Prepare Phase", "Commit/Rollback Phase", "Strong consistency", "Synchronous blocking"] },
      { heading: "Saga Pattern", items: ["Local transactions sequence", "Compensating transactions", "Eventual consistency", "Asynchronous"] },
      { heading: "Saga Types", items: ["Choreography: Event-driven, decentralized", "Orchestration: Centralized controller"] },
      { heading: "Key Rule", items: ["Always make compensating actions idempotent"] }
    ]
  },
  speedNotes: [
    "2PC guarantees strong consistency.",
    "2PC blocks and limits scalability.",
    "Saga uses local DB transactions.",
    "Saga rolls back via compensation.",
    "Sagas offer eventual consistency."
  ]
};
