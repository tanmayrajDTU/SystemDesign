import type { ConceptRevisionContent } from "./types";

export const transactions: ConceptRevisionContent = {
  slug: "transactions",
  title: "Transactions",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  // No dedicated chapter exists for Transactions specifically — the concept
  // is covered in depth as part of ACID (which formalizes exactly what a
  // transaction guarantees), plus SQL, where transactions are demonstrated.
  docLinks: [
    { label: "ACID", href: "/docs/databases/acid" },
    { label: "SQL", href: "/docs/databases/sql" },
  ],

  summary: [
    "A transaction is a group of one or more database operations executed as a single logical unit — either all of them take effect, or none do.",
    "ACID is the formal name for the guarantees a transaction provides: Atomicity (all-or-nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't interfere), Durability (survives a crash once committed).",
    "The classic motivating example is a funds transfer: debiting one account and crediting another must happen together, or a crash halfway through leaves money vanished from one side and never arrived on the other.",
    "Transactions are bounded by BEGIN/COMMIT (or ROLLBACK) — everything between those markers is the unit that succeeds or fails together.",
    "Isolation between concurrent transactions is tunable (isolation levels), because full isolation costs real concurrency — most systems default to a practical middle ground rather than the strongest setting everywhere.",
    "A single-database transaction is a mature, well-solved problem; coordinating a transaction-like outcome across multiple independently-owned databases (as in microservices) is a much harder distributed problem, generally solved with patterns like Saga or two-phase commit rather than a direct extension of local transactions.",
  ],

  whyAsked: [
    "It's the single most practical, hands-on application of ACID — interviewers use it to check you can connect the abstract guarantees to an actual BEGIN/COMMIT/ROLLBACK flow and a concrete failure scenario.",
    "It tests whether you know transaction scope (what's inside vs. outside the BEGIN/COMMIT boundary) and can reason about what happens if a crash hits at different points.",
    "It's the natural bridge to distributed transactions — whether you know single-database transactions don't automatically extend across services, and what to reach for instead.",
  ],

  thirtySecondAnswer:
    "A transaction is a group of one or more database operations treated as a single logical unit of work — bounded by BEGIN and COMMIT (or ROLLBACK) — where either all the operations take effect or none do. The guarantees a transaction provides are formalized as ACID: Atomicity means all-or-nothing execution, Consistency means the database moves from one valid state to another respecting its constraints, Isolation means concurrent transactions behave as if run one at a time even though they may execute simultaneously, and Durability means once committed, the changes survive a subsequent crash. The classic example is a funds transfer — debiting one account and crediting another needs to happen as a single unit, since a crash between the two operations should never leave money missing from one side without arriving on the other. Isolation between concurrent transactions is actually tunable via isolation levels, because the strongest guarantee (Serializable) costs real concurrency, so most production systems default to a practical middle ground like Read Committed. The important limit to know is that this is a single-database guarantee — coordinating a transaction-like all-or-nothing outcome across multiple independently-owned databases, as in a microservices architecture, is a genuinely harder problem generally solved with patterns like Saga or two-phase commit, not a direct extension of local transactions.",

  detailedAnswer: [
    "A transaction is a BEGIN...COMMIT (or ROLLBACK) boundary around one or more operations that must succeed or fail together as a single unit.",
    "ACID formalizes the guarantee: Atomicity (all-or-nothing), Consistency (valid state to valid state), Isolation (concurrent transactions don't interfere), Durability (committed changes survive a crash).",
    "If a crash occurs after some operations in the transaction but before COMMIT, the database's recovery process rolls back the entire transaction — as if it never started.",
    "Isolation is tunable: isolation levels (Read Uncommitted through Serializable) trade correctness guarantees against concurrent-transaction anomalies for concurrency/throughput.",
    "Durability is implemented via a write-ahead log: the transaction's changes are durably logged before commit is acknowledged, so recovery can replay the log if the main data files weren't updated yet.",
    "Single-database transactions don't automatically extend across service boundaries — distributed, cross-service transaction-like guarantees require separate patterns (Saga's compensating actions, or two-phase commit) rather than a bigger BEGIN/COMMIT.",
  ],

  questions: [
    { id: "txn-q1", question: "What is a database transaction?", answer: "A group of one or more operations executed as a single logical unit of work, bounded by BEGIN and COMMIT (or ROLLBACK), where either all operations take effect or none do.", topic: "Databases", difficulty: "Beginner" },
    { id: "txn-q2", question: "What does COMMIT do, and what does ROLLBACK do?", answer: "COMMIT makes all of the transaction's changes permanent and visible; ROLLBACK discards all of the transaction's changes as if none of them happened.", topic: "Databases", difficulty: "Beginner" },
    { id: "txn-q3", question: "Why is a funds transfer the classic example for explaining transactions?", answer: "Debiting one account and crediting another must happen together — a crash between the two operations without transaction guarantees could leave money debited from one account but never credited to the other.", topic: "Databases", difficulty: "Beginner" },
    { id: "txn-q4", question: "What set of guarantees formalizes what a transaction provides?", answer: "ACID — Atomicity, Consistency, Isolation, Durability.", topic: "Databases", difficulty: "Beginner" },
    { id: "txn-q5", question: "What happens if a crash occurs mid-transaction, after some operations but before COMMIT?", answer: "The database's recovery process rolls back the entire transaction on restart — none of its partial changes are kept, as if the transaction never began.", topic: "Databases", difficulty: "Intermediate" },
    { id: "txn-q6", question: "Why are isolation levels tunable rather than fixed at the strongest setting?", answer: "Full isolation (Serializable) requires more locking or conflict detection, reducing concurrency — most production systems default to a weaker level like Read Committed as a practical trade-off, using stronger isolation only where a specific operation truly needs it.", topic: "Databases", difficulty: "Intermediate" },
    { id: "txn-q7", question: "How is Durability actually implemented under the hood?", answer: "Via a write-ahead log — the transaction's changes are written to a durable, sequential log before being acknowledged as committed, so a crash before the main data files are updated can still be recovered by replaying the log.", topic: "Databases", difficulty: "Intermediate" },
    { id: "txn-q8", question: "What's the difference between a dirty read and a non-repeatable read?", answer: "A dirty read is reading another transaction's uncommitted changes; a non-repeatable read is a value changing between two reads within the same transaction because another transaction committed in between.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-q9", question: "Why doesn't a single-database transaction automatically extend across multiple microservices?", answer: "Each service typically owns its own database, and there's no single BEGIN/COMMIT boundary spanning independently-owned databases — coordinating an all-or-nothing outcome across them is a genuinely harder distributed-systems problem.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-q10", question: "What is the Saga pattern, and how does it approximate a transaction across services?", answer: "A sequence of local transactions, each in a different service, where every step has a corresponding compensating action to undo it if a later step in the sequence fails — approximating all-or-nothing behavior without a single cross-service transaction.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-q11", question: "What is two-phase commit (2PC), briefly?", answer: "A distributed transaction protocol where a coordinator asks all participants to 'prepare' to commit, and only tells them to actually commit once every participant has confirmed readiness — guaranteeing all-or-nothing across multiple databases, at the cost of blocking and coordination overhead.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-q12", question: "Why might a long-running transaction be a problem in a production system?", answer: "It holds locks (and often connections) open for longer, increasing contention with other transactions and raising the risk of lock timeouts or deadlocks — transactions are generally kept as short as practical.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-q13", question: "What's a deadlock, in the context of transactions?", answer: "A situation where two or more transactions each hold a lock the other needs, so neither can proceed — databases typically detect this and abort one of the transactions to break the cycle.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-q14", question: "Why would you explicitly choose a stronger isolation level for one specific operation but not others?", answer: "Because the correctness need is operation-specific — a financial balance update might need Serializable to avoid a specific concurrency anomaly, while a low-stakes read elsewhere in the same system is fine at the default level.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-q15", question: "What's a common mistake when wrapping operations in a transaction?", answer: "Including operations that don't actually need to be atomic together inside the same transaction, unnecessarily lengthening lock hold time and increasing contention.", topic: "Databases", difficulty: "Intermediate" },
    { id: "txn-q16", question: "Can a transaction span multiple tables?", answer: "Yes — a transaction can include any number of operations across any number of tables within the same database; atomicity applies to the whole set, not per table.", topic: "Databases", difficulty: "Beginner" },
    { id: "txn-q17", question: "What's the relationship between transactions and consistency in the ACID sense?", answer: "A transaction is the unit that ACID's 'Consistency' guarantee applies to — the transaction must take the database from one state respecting all defined constraints to another state also respecting them, never leaving it in an invalid state in between visible to other transactions.", topic: "Databases", difficulty: "Intermediate" },
    { id: "txn-q18", question: "Why might a hotel booking system use a single transaction to both mark a room booked and charge a customer?", answer: "So the two operations can never happen independently — atomicity guarantees the room is booked and the customer is charged together, preventing the specific failure mode of charging without booking or vice versa.", topic: "Databases", difficulty: "Intermediate" },
    { id: "txn-q19", question: "How would you decide whether an operation needs a stronger isolation level than your system's default?", answer: "Identify whether the specific concurrency anomaly (dirty read, non-repeatable read, phantom read) that a weaker level allows would actually cause a real correctness problem for that operation — if so, raise isolation just for that operation.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-q20", question: "Summarize a database transaction in one sentence.", answer: "A group of operations executed as a single all-or-nothing unit of work, guaranteeing atomicity, consistency, isolation, and durability within a single database, but not automatically across multiple independently-owned databases.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What happens if the process crashes right in the middle of this transaction?\"",
    "\"How would you achieve transaction-like guarantees across multiple microservices?\"",
    "\"Would you use a stronger isolation level here, and why?\"",
  ],

  commonMistakes: [
    "Wrapping unrelated operations into one long transaction, unnecessarily increasing lock contention.",
    "Assuming a transaction automatically extends across multiple services/databases without an additional pattern like Saga or 2PC.",
    "Defaulting to the strongest isolation level everywhere, paying an unnecessary throughput cost.",
    "Not considering deadlocks when multiple transactions can acquire locks on the same rows in different orders.",
  ],

  interviewTraps: [
    "\"Can you just wrap these microservice calls in one big transaction?\" is testing whether you know single-database transaction boundaries don't span independently-owned databases.",
    "\"Walk me through what happens if this crashes mid-transaction\" is testing whether you understand rollback and the write-ahead log, not just that 'ACID handles it.'",
  ],

  tradeoffs: [
    "Stronger isolation guarantees correctness against more concurrency anomalies, at the cost of throughput and concurrency.",
    "Shorter transactions reduce lock contention risk but may require more careful application logic to batch related operations correctly.",
    "Single-database transactions are simple and mature; cross-service transaction-like guarantees (Saga, 2PC) trade that simplicity for coordination complexity.",
  ],

  comparisonTable: {
    title: "Local Transaction vs Distributed Transaction (Saga / 2PC)",
    columns: ["Local Transaction", "Saga", "Two-Phase Commit"],
    rows: [
      { label: "Scope", values: ["Single database", "Multiple services/databases", "Multiple databases"] },
      { label: "Mechanism", values: ["BEGIN/COMMIT/ROLLBACK", "Compensating actions per step", "Coordinator + prepare/commit phases"] },
      { label: "Failure handling", values: ["Automatic rollback", "Explicit compensation logic", "Coordinator-driven abort"] },
      { label: "Complexity", values: ["Low, mature, built-in", "Application must design compensations", "Blocking, coordination overhead"] },
      { label: "Best fit", values: ["Operations within one database", "Cross-service business workflows", "Rare — tight distributed consistency needs"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "txn-root",
    question: "Does this operation span a single database, or multiple independently-owned databases/services?",
    options: [
      {
        label: "Single database",
        next: {
          kind: "result",
          id: "txn-local",
          result: "Use a standard local transaction (BEGIN/COMMIT).",
          rationale: "Single-database transactions are mature, well-understood, and give you full ACID guarantees directly.",
        },
      },
      {
        label: "Multiple services, each with its own database",
        next: {
          kind: "result",
          id: "txn-distributed",
          result: "Reach for the Saga pattern (or, rarely, two-phase commit).",
          rationale: "Local transactions can't span independently-owned databases — Saga's compensating actions (or 2PC's coordinated commit) approximate an all-or-nothing outcome across them instead.",
        },
      },
    ],
  },

  memoryTrick:
    "\"BEGIN...COMMIT is a promise: all of this, or none of it.\" Everything between those two markers lives or dies together — that's the whole idea of a transaction.",

  realWorldExamples: [
    "A hotel booking system uses a single transaction to both mark a room as booked and charge the customer's payment method, so neither can happen without the other.",
    "An e-commerce checkout wraps inventory decrement and order creation in one transaction, so an order is never created for an item that was never actually reserved.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant App
    participant DB
    App->>DB: BEGIN TRANSACTION
    App->>DB: UPDATE accounts SET balance -= 100 WHERE id='A'
    App->>DB: UPDATE accounts SET balance += 100 WHERE id='B'
    App->>DB: COMMIT
    Note over DB: Both updates durable and visible,\nor neither is (on crash/rollback)`,

  flashcards: [
    { id: "txn-fc1", front: "Transaction — one-line definition", back: "A group of operations executed as a single all-or-nothing unit of work, bounded by BEGIN and COMMIT/ROLLBACK.", topic: "Databases", difficulty: "Beginner" },
    { id: "txn-fc2", front: "What guarantees does a transaction provide?", back: "ACID: Atomicity, Consistency, Isolation, Durability.", topic: "Databases", difficulty: "Beginner" },
    { id: "txn-fc3", front: "What happens on a crash mid-transaction, before COMMIT?", back: "The whole transaction is rolled back on recovery — none of its partial changes are kept.", topic: "Databases", difficulty: "Intermediate" },
    { id: "txn-fc4", front: "Do local transactions span multiple microservices?", back: "No — each service typically owns its own database; cross-service atomicity needs Saga or two-phase commit instead.", topic: "Databases", difficulty: "Advanced" },
    { id: "txn-fc5", front: "Why aren't isolation levels always set to the strongest (Serializable)?", back: "Stronger isolation costs concurrency/throughput via more locking — most systems default to a weaker practical level like Read Committed.", topic: "Databases", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Transactions",
    sections: [
      { heading: "Core idea", items: ["BEGIN...COMMIT/ROLLBACK boundary", "All operations succeed together, or none do", "Guarantees formalized as ACID"] },
      { heading: "Under the hood", items: ["Crash before COMMIT → full rollback", "Durability via write-ahead log", "Isolation is a tunable spectrum, not fixed"] },
      { heading: "Beyond one database", items: ["Local txns don't span services", "Saga: compensating actions per step", "2PC: coordinator + prepare/commit phases"] },
      { heading: "Watch for", items: ["Long transactions → lock contention/deadlocks", "Unrelated ops bundled unnecessarily", "Isolation level not matched to actual need"] },
    ],
  },

  speedNotes: [
    "Transaction = BEGIN...COMMIT/ROLLBACK, all-or-nothing.",
    "Guarantees = ACID (Atomicity, Consistency, Isolation, Durability).",
    "Crash before COMMIT → full rollback on recovery.",
    "Doesn't span multiple databases/services automatically — use Saga/2PC.",
    "Isolation level is tunable — don't default to Serializable everywhere.",
  ],
};
