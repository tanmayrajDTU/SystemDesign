import type { ConceptRevisionContent } from "./types";

export const databasePerService: ConceptRevisionContent = {
  slug: "database-per-service",
  title: "Database per Service",
  topic: "Architecture",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Database per Service", href: "/docs/microservices/database-per-service" },
    { label: "Microservices", href: "/docs/microservices/microservices" },
  ],
  summary: [
    "Database per Service is a core pattern in microservices where each service manages its own private database.",
    "Other services cannot access this database directly; they must use the owning service's API.",
    "This ensures loose coupling and allows independent scaling and evolution of data schemas.",
    "It introduces significant complexity regarding data consistency, distributed transactions, and cross-service queries.",
    "Polyglot persistence is enabled, allowing each service to choose the best database type for its specific needs.",
  ],
  whyAsked: [
    "To test your understanding of the foundational principles of microservices.",
    "To see how you handle the trade-offs of distributed data management.",
    "To assess your knowledge of distributed transactions (Sagas) and querying (CQRS/API Composition).",
  ],
  thirtySecondAnswer: "In the Database per Service pattern, each microservice has its own dedicated data store, completely isolated from other services. Access to that data is strictly mediated through the service's API. This ensures loose coupling, preventing schema changes in one service from breaking another. It also allows teams to choose the best database technology for their specific workload. However, it completely breaks traditional ACID transactions across domains, requiring complex patterns like Sagas for writes and API Composition or CQRS for reads.",
  detailedAnswer: [
    "Enforces strict data encapsulation at the microservice boundary.",
    "Prevents a single database from becoming a bottleneck or a single point of failure.",
    "Enables polyglot persistence (e.g., Search service uses Elasticsearch, Cart uses Redis, Orders uses PostgreSQL).",
    "Requires distributed transaction patterns like Sagas to maintain consistency across services.",
    "Requires API Composition or CQRS for queries that span multiple service boundaries.",
    "Significantly complicates backup, restore, and general operational overhead.",
  ],
  questions: [
    { id: "dps-q1", question: "What is the Database per Service pattern?", answer: "An architecture where each microservice has its own private database that cannot be accessed directly by other services.", topic: "Architecture", difficulty: "Beginner" },
    { id: "dps-q2", question: "Why is Database per Service important for microservices?", answer: "It ensures loose coupling, allowing services to evolve, scale, and deploy independently without database schema conflicts.", topic: "Architecture", difficulty: "Beginner" },
    { id: "dps-q3", question: "What is the opposite of Database per Service?", answer: "The Shared Database pattern, common in monolithic applications.", topic: "Architecture", difficulty: "Beginner" },
    { id: "dps-q4", question: "How do services communicate data if they can't access each other's databases?", answer: "They must communicate exclusively through well-defined APIs (REST, gRPC, or events).", topic: "Architecture", difficulty: "Beginner" },
    { id: "dps-q5", question: "What is Polyglot Persistence?", answer: "The practice of using different database technologies for different services based on their specific workload requirements.", topic: "Architecture", difficulty: "Beginner" },
    { id: "dps-q6", question: "How does Database per Service affect ACID transactions?", answer: "It breaks them. You can no longer rely on database-level ACID guarantees for operations that span multiple services.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "dps-q7", question: "What pattern is used to handle distributed transactions in this architecture?", answer: "The Saga pattern, which coordinates a sequence of local transactions using events or orchestration.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "dps-q8", question: "How do you implement JOINs across different microservices?", answer: "You cannot use SQL JOINs. You must use API Composition or CQRS at the application level.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "dps-q9", question: "What are the operational challenges of Database per Service?", answer: "Managing backups, provisioning, migrations, and monitoring for dozens of different databases instead of just one.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "dps-q10", question: "Does Database per Service strictly mean separate database servers?", answer: "No, it can mean separate schemas or logical databases on the same physical server to save costs, as long as access is strictly isolated.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "dps-q11", question: "What is the impact of eventual consistency in this pattern?", answer: "Because cross-service updates happen asynchronously (via Sagas), the system is often eventually consistent, which UI/UX must account for.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "dps-q12", question: "How does this pattern improve fault tolerance?", answer: "If one service's database goes down, only that service is impacted; the rest of the application can continue functioning.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "dps-q13", question: "How do you handle Foreign Keys in Database per Service?", answer: "You don't. You store the ID (reference) of the entity from the other service, but the database cannot enforce referential integrity.", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-q14", question: "What happens if a referenced entity in another service is deleted?", answer: "You must handle 'dangling references' either by ignoring them, cleaning them up asynchronously via domain events, or soft-deleting.", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-q15", question: "How do you generate global analytics/reports in this architecture?", answer: "By streaming data from all microservice databases into a centralized Data Warehouse or Data Lake using Change Data Capture (CDC).", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-q16", question: "What is the Outbox Pattern and why is it used here?", answer: "It ensures that local database updates and domain event publications happen atomically, preventing data inconsistencies during distributed operations.", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-q17", question: "Why is Two-Phase Commit (2PC) generally avoided for microservices?", answer: "It is blocking, has poor performance, and does not scale well in highly distributed environments compared to Sagas.", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-q18", question: "How does bounded context relate to Database per Service?", answer: "Domain-Driven Design (DDD) dictates that each bounded context should own its domain model and data, naturally mapping to this database pattern.", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-q19", question: "Can multiple instances of the same microservice share the same database?", answer: "Yes, instances of the *same* microservice share a database. The isolation is between *different* microservices.", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-q20", question: "What is a 'Shared Database' anti-pattern in microservices?", answer: "When multiple independent services connect to the same database tables, creating tight coupling and deployment bottlenecks.", topic: "Architecture", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "How do you ensure data consistency without ACID transactions?",
    "How do you implement a query that requires joining data from three different services?",
    "How do you handle data analytics when data is siloed?",
  ],
  commonMistakes: [
    "Assuming it strictly requires separate physical servers (schemas are fine for logical separation).",
    "Trying to implement Two-Phase Commit (2PC) instead of Sagas for distributed transactions.",
    "Leaking database schema details into the public API responses.",
  ],
  interviewTraps: [
    "Proposing a shared database just to solve a reporting issue. (Use an ETL pipeline or CDC to a data warehouse instead).",
    "Forgetting about referential integrity. You must explain how to handle invalid IDs when foreign keys don't exist.",
  ],
  tradeoffs: [
    "Loose coupling and independent scaling vs. Complex distributed transactions and queries.",
    "Polyglot persistence vs. Increased operational complexity (managing multiple DBs).",
    "Fault isolation vs. Eventual consistency challenges.",
  ],
  comparisonTable: {
    title: "Shared Database vs Database per Service",
    columns: ["Attribute", "Shared Database", "Database per Service"],
    rows: [
      { label: "Coupling", values: ["Tight (schema changes break things)", "Loose (API hides schema)"] },
      { label: "Transactions", values: ["ACID (Simple)", "Sagas / Eventual Consistency (Complex)"] },
      { label: "Queries", values: ["SQL JOINs (Simple)", "API Composition / CQRS (Complex)"] },
      { label: "Technology", values: ["Single DB type", "Polyglot Persistence"] },
    ]
  },
  memoryTrick: "Database per Service is like roommates keeping separate mini-fridges: Nobody can steal your food (data), but cooking a shared meal (joins) is much harder.",
  realWorldExamples: [
    "Uber: The Driver service uses Riak for high availability, while the billing service uses PostgreSQL for consistency.",
    "Amazon: The shopping cart uses DynamoDB for ultra-fast key-value access, while catalog uses a relational DB.",
  ],
  mermaidDiagram: `flowchart TD
    subgraph Service A Boundary
        API_A[Order Service] --> DB_A[(PostgreSQL)]
    end
    subgraph Service B Boundary
        API_B[Product Service] --> DB_B[(MongoDB)]
    end
    subgraph Service C Boundary
        API_C[User Service] --> DB_C[(MySQL)]
    end
    API_A -.-x|Direct Access Forbidden| DB_B
    API_A -->|HTTP/gRPC API| API_B
  `,
  flashcards: [
    { id: "dps-fc1", front: "What is the fundamental rule of Database per Service?", back: "A microservice's database can only be accessed via that specific microservice's API.", topic: "Architecture", difficulty: "Beginner" },
    { id: "dps-fc2", front: "What is Polyglot Persistence?", back: "Using different types of databases (SQL, NoSQL, Graph) across different services based on their specific needs.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "dps-fc3", front: "How do you handle transactions spanning multiple services?", back: "Using the Saga pattern (eventual consistency) rather than traditional ACID transactions.", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-fc4", front: "How do you enforce Referential Integrity (Foreign Keys) across services?", back: "You can't enforce it at the database level. It must be handled asynchronously via domain events or API checks.", topic: "Architecture", difficulty: "Advanced" },
    { id: "dps-fc5", front: "How do you perform complex analytical queries in this architecture?", back: "Use Change Data Capture (CDC) to stream data from all service databases into a centralized Data Warehouse.", topic: "Architecture", difficulty: "Intermediate" },
  ],
  cheatSheet: {
    title: "Database per Service Survival Guide",
    sections: [
      {
        heading: "Benefits",
        items: [
          "Zero schema coupling between teams.",
          "Independent scaling of data layers.",
          "Polyglot persistence capabilities.",
          "Blast radius of DB failure is limited.",
        ],
      },
      {
        heading: "Required Patterns",
        items: [
          "Sagas: For distributed writes.",
          "API Composition/CQRS: For distributed reads.",
          "Outbox Pattern: For atomic events.",
          "CDC: For data analytics/warehousing.",
        ],
      },
      {
        heading: "Physical vs Logical",
        items: [
          "Physical: Separate database servers (maximum isolation).",
          "Logical: Separate schemas in the same database server (cost-effective, still logically isolated).",
        ],
      },
    ],
  },
  speedNotes: [
    "Each service owns its data.",
    "No direct DB access from outside.",
    "Breaks ACID transactions.",
    "Requires Sagas for writes.",
    "Enables polyglot persistence.",
  ],
};
