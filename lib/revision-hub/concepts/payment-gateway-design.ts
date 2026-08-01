import type { ConceptRevisionContent } from "./types";

export const paymentGatewayDesign: ConceptRevisionContent = {
  slug: "payment-gateway-design",
  title: "Payment Gateway Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 30,
  docLinks: [
    { label: "Payment Gateway Case Study", href: "/docs/case-studies/payment-gateway" },
  ],
  summary: [
    "A payment gateway securely facilitates online transactions between a user, merchant, and acquiring/issuing banks.",
    "Key components include the Payment Gateway API, Risk/Fraud Check service, Payment Processor, and Ledger/Wallet system.",
    "Reliability and exactly-once processing are critical to avoid double-charging users or dropping payments.",
    "ACID compliance is mandatory for payment databases; relational databases are typically used.",
    "Idempotency keys must be implemented across all APIs to handle retries safely.",
    "Reconciliation processes run asynchronously to ensure internal records match third-party bank settlements."
  ],
  whyAsked: [
    "To evaluate your understanding of distributed transactions and data consistency.",
    "To test knowledge of idempotency, exactly-once processing, and handling network failures.",
    "To see how you approach high-security, high-reliability systems where financial loss is a risk."
  ],
  thirtySecondAnswer: "A payment system handles moving money reliably. It relies on a Gateway to accept requests with idempotency keys, a Risk engine to block fraud, and a Processor to communicate with external bank APIs. Databases must be ACID compliant (usually PostgreSQL). To handle network failures, we use idempotency to safely retry requests, two-phase commits or saga patterns for distributed transactions, and asynchronous reconciliation to detect and correct discrepancies between internal ledgers and bank records.",
  detailedAnswer: [
    "Idempotency: Every payment request must include a unique idempotency key (e.g., UUID) to prevent double charging on retries.",
    "Databases: Use relational databases (ACID) for financial transactions. Avoid NoSQL for the core ledger.",
    "External Integrations: The system integrates with Payment Service Providers (PSPs) like Stripe or banks. Expect high latency and timeouts.",
    "State Machine: Payments follow a strict state machine (e.g., Pending -> Authorized -> Captured -> Settled).",
    "Reconciliation: A background cron job that fetches settlement files from banks and compares them against the internal ledger.",
    "Security: PCI-DSS compliance is required. Credit card details are tokenized and rarely stored in plaintext."
  ],
  questions: [
    { id: "pgd-q1", question: "What is a payment gateway?", answer: "A service that authorizes and processes credit card or direct payments for e-commerce.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "pgd-q2", question: "What does ACID stand for?", answer: "Atomicity, Consistency, Isolation, Durability. Crucial for financial databases.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "pgd-q3", question: "What is an idempotency key?", answer: "A unique identifier sent by the client to ensure a retried request is only processed once.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "pgd-q4", question: "Why do we prefer SQL databases for payments?", answer: "Because they provide strong ACID guarantees natively, preventing inconsistent financial states.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "pgd-q5", question: "What is tokenization in payments?", answer: "Replacing sensitive data (like a credit card number) with a non-sensitive equivalent (token) for safe storage.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "pgd-q6", question: "What is PCI-DSS?", answer: "Payment Card Industry Data Security Standard; compliance rules for systems handling credit card info.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "pgd-q7", question: "How do you implement idempotency?", answer: "Check if the idempotency key exists in the DB. If yes, return the cached result. If no, process and store the key.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-q8", question: "Explain Authorization vs. Capture.", answer: "Authorization holds the funds on the user's card. Capture actually transfers the funds to the merchant.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-q9", question: "What happens if a call to the bank API times out?", answer: "Do not mark as failed immediately. Retry with the same idempotency key, or poll the bank for the transaction status.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-q10", question: "What is reconciliation?", answer: "The process of comparing internal database records with external bank settlement files to find discrepancies.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-q11", question: "How do you handle distributed transactions in payments?", answer: "Using the Saga pattern (choreography or orchestration) or Two-Phase Commit (2PC).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-q12", question: "What is double-entry bookkeeping?", answer: "An accounting method where every transaction has equal and opposite entries (credit and debit), ensuring sum equals zero.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-q13", question: "How do you protect against fraud?", answer: "Use a rules engine and ML models evaluating IP, device fingerprint, transaction velocity, and CVV checks before processing.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-q14", question: "Why might you use event sourcing in a payment ledger?", answer: "To maintain an immutable log of all state changes, making it easy to audit, replay, and debug financial transactions.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "pgd-q15", question: "How do you design the reconciliation system at scale?", answer: "Use stream processing (e.g., Spark/Flink) or batch map-reduce jobs to join internal DB snapshots with bank CSV files.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "pgd-q16", question: "How do you avoid race conditions when two identical payment requests arrive simultaneously?", answer: "Use a database unique constraint on the idempotency key to ensure only one transaction commits.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "pgd-q17", question: "What is the outbox pattern?", answer: "Storing events in the same DB transaction as state changes, then a separate process publishes them to a message broker.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "pgd-q18", question: "How would you handle a sudden spike in payment requests (e.g., Flash Sale)?", answer: "Queue requests using Kafka/RabbitMQ, process them asynchronously, and implement rate-limiting to protect downstream banking APIs.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "pgd-q19", question: "What happens if the internal ledger and bank disagree during reconciliation?", answer: "A mismatch alert is raised for manual human review by a financial operations (FinOps) team.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "pgd-q20", question: "How do you ensure exactly-once semantics in Kafka for payment events?", answer: "Enable Kafka's idempotent producer and transactional API, coupled with consumer-side idempotency checks.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you handle a scenario where the bank charges the user, but your database update fails?",
    "How do you scale the ledger system?",
    "How do you design the reconciliation cron job?"
  ],
  commonMistakes: [
    "Failing to mention idempotency, which is the most critical concept in payments.",
    "Using NoSQL databases for the core transactional ledger without addressing consistency issues.",
    "Assuming network calls to external bank APIs are reliable and fast."
  ],
  interviewTraps: [
    "Not handling timeouts gracefully. A timeout does not mean failure; the bank may have processed the payment.",
    "Forgetting about the asynchronous nature of bank settlements and the need for reconciliation."
  ],
  tradeoffs: [
    "Synchronous vs. Asynchronous: Sync provides immediate feedback but ties up resources. Async is better for scale but requires polling/webhooks.",
    "Monolithic Ledger vs. Microservices: Microservices require complex distributed transactions (Sagas), monolithic is easier for ACID but harder to scale.",
    "Consistency vs. Availability: Payments always choose Consistency (CP in CAP theorem) over Availability."
  ],
  memoryTrick: "Payments need AIR: ACID, Idempotency, Reconciliation.",
  realWorldExamples: [
    "Stripe: Uses idempotency keys, PostgreSQL for ACID guarantees, and sophisticated ML for fraud detection.",
    "Uber Payments: Uses double-entry ledgers to track driver earnings and rider charges accurately."
  ],
  mermaidDiagram: `flowchart TD
    A[Client] -->|POST /pay + Idempotency Key| B(API Gateway)
    B --> C(Payment Service)
    C --> D[(SQL DB)]
    C --> E{Fraud Check}
    E -->|Pass| F(PSP / Bank API)
    F -->|Response| C
    C --> G(Ledger Service)
    G --> H[(Ledger DB)]
    I(Reconciliation Job) -.->|Verify| H
    I -.->|Fetch Settlement| F`,
  flashcards: [
    { id: "pgd-fc1", front: "What prevents double charging on retries?", back: "Idempotency Key", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "pgd-fc2", front: "What database type is standard for payments?", back: "Relational (SQL) for ACID guarantees", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "pgd-fc3", front: "What process checks DB records against bank files?", back: "Reconciliation", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-fc4", front: "How do you securely store credit card data?", back: "Tokenization / PCI-DSS compliance", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "pgd-fc5", front: "What accounting method tracks money movement?", back: "Double-entry bookkeeping", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Payment Systems",
    sections: [
      {
        heading: "Must-Haves",
        items: [
          "Idempotency Keys for all write operations.",
          "ACID compliant SQL Database.",
          "Strict timeout handling & retries."
        ]
      },
      {
        heading: "Key Processes",
        items: [
          "Auth & Capture: Hold funds, then take them.",
          "Reconciliation: Match internal ledgers with bank settlements.",
          "Tokenization: Securely handle PCI data."
        ]
      },
      {
        heading: "Distributed Patterns",
        items: [
          "Saga Pattern / Outbox Pattern for distributed transactions.",
          "Double-entry bookkeeping for ledgers."
        ]
      }
    ]
  },
  speedNotes: [
    "Always use idempotency keys.",
    "Relational DBs for ACID.",
    "Network timeouts are not failures.",
    "Reconciliation fixes discrepancies.",
    "Double-entry ledger tracks funds."
  ]
};
