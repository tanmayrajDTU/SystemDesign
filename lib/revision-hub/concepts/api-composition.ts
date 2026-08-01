import type { ConceptRevisionContent } from "./types";

export const apiComposition: ConceptRevisionContent = {
  slug: "api-composition",
  title: "API Composition",
  topic: "Architecture",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "API Composition", href: "/docs/microservices/api-composition" },
    { label: "Database per Service", href: "/docs/microservices/database-per-service" },
  ],
  summary: [
    "API Composition is a pattern used in microservices to implement queries that span multiple services.",
    "Because of the Database per Service pattern, complex joins across different domains are impossible at the database level.",
    "An API Composer (or Aggregator) service makes concurrent calls to multiple independent microservices to fetch data.",
    "It then performs an in-memory join of the retrieved data before sending a unified response back to the client.",
    "It is a simpler alternative to CQRS but can struggle with large datasets and deep pagination.",
  ],
  whyAsked: [
    "To test your understanding of data retrieval challenges in microservices.",
    "To evaluate how you handle missing SQL JOIN capabilities in a distributed system.",
    "To see if you can balance the trade-offs between API Composition and CQRS.",
  ],
  thirtySecondAnswer: "In a microservices architecture, data is often partitioned across multiple services, each with its own database. To fulfill a client request that requires data from multiple domains (like a user's profile and their recent orders), an API Composition pattern is used. An API Gateway or a dedicated Aggregator service makes separate API calls to the User Service and the Order Service, stitches the results together in memory, and returns a single combined payload. It acts as a distributed 'JOIN' at the application layer.",
  detailedAnswer: [
    "Acts as an orchestrator for read operations across multiple microservices.",
    "Often implemented within an API Gateway or as a standalone Backend-for-Frontend (BFF).",
    "Uses concurrent or asynchronous I/O to minimize overall latency when calling multiple downstream services.",
    "Performs in-memory joining and filtering of data sets.",
    "Vulnerable to the 'straggler problem', where the overall response time is bound by the slowest downstream service.",
    "Inefficient for complex queries involving sorting, filtering, or deep pagination across large datasets.",
  ],
  questions: [
    { id: "apic-q1", question: "What is API Composition?", answer: "A pattern where a service queries multiple microservices and aggregates the results into a single response.", topic: "Architecture", difficulty: "Beginner" },
    { id: "apic-q2", question: "Why is API Composition necessary in microservices?", answer: "Because microservices often use a Database per Service pattern, preventing direct SQL joins across different domains.", topic: "Architecture", difficulty: "Beginner" },
    { id: "apic-q3", question: "What component usually acts as the API Composer?", answer: "An API Gateway, a Backend-for-Frontend (BFF), or a dedicated aggregator service.", topic: "Architecture", difficulty: "Beginner" },
    { id: "apic-q4", question: "How does API Composition impact latency?", answer: "It can increase latency due to multiple network hops, and overall response time is bottlenecked by the slowest service.", topic: "Architecture", difficulty: "Beginner" },
    { id: "apic-q5", question: "How should an API Composer make requests to downstream services?", answer: "Concurrently (in parallel) whenever possible to minimize total latency.", topic: "Architecture", difficulty: "Beginner" },
    { id: "apic-q6", question: "What is a common alternative to API Composition?", answer: "CQRS (Command Query Responsibility Segregation).", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-q7", question: "When should you choose CQRS over API Composition?", answer: "When queries require complex joining, filtering, sorting, or pagination over large datasets from multiple services.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-q8", question: "What happens if one of the downstream services fails during composition?", answer: "The composer must handle the failure gracefully, perhaps by returning partial data, returning cached data, or failing the entire request.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-q9", question: "How do you handle pagination with API Composition?", answer: "It is very difficult. It often requires fetching large amounts of data in memory, sorting it, and then paginating, which is highly inefficient.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-q10", question: "What is the 'straggler problem' in API Composition?", answer: "The total response time of the composite API is tied to the response time of the slowest downstream microservice.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-q11", question: "How can GraphQL be used for API Composition?", answer: "GraphQL naturally acts as an API composer by resolving fields concurrently from multiple backend services in a single query.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-q12", question: "What is a Backend-for-Frontend (BFF)?", answer: "A specific type of API composer tailored to the exact needs of a specific client type (e.g., mobile vs web).", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-q13", question: "How does API Composition relate to the Scatter-Gather pattern?", answer: "It is essentially an implementation of Scatter-Gather, broadcasting requests to multiple nodes and gathering the results.", topic: "Architecture", difficulty: "Advanced" },
    { id: "apic-q14", question: "How can caching be applied in API Composition?", answer: "The composer can cache responses from individual downstream services, or cache the final aggregated result if the data is not highly dynamic.", topic: "Architecture", difficulty: "Advanced" },
    { id: "apic-q15", question: "Why is sorting across multiple microservices difficult with API Composition?", answer: "Because the data resides in different databases, it must be fetched into the composer's memory entirely before a global sort can be applied.", topic: "Architecture", difficulty: "Advanced" },
    { id: "apic-q16", question: "What is in-memory join?", answer: "The process where the composer service manually links data from different API responses using a common identifier, similar to a database JOIN.", topic: "Architecture", difficulty: "Advanced" },
    { id: "apic-q17", question: "How does circuit breaking fit into API Composition?", answer: "The composer should wrap calls to downstream services in circuit breakers to prevent cascading failures if a service is down or slow.", topic: "Architecture", difficulty: "Advanced" },
    { id: "apic-q18", question: "Can API Composition be used for write operations?", answer: "No, it is strictly a read (query) pattern. Write orchestration is usually handled by Saga patterns or distributed transactions.", topic: "Architecture", difficulty: "Advanced" },
    { id: "apic-q19", question: "What are the security implications of API Composition?", answer: "The composer service must propagate authentication/authorization tokens to downstream services to ensure the user has rights to all data fetched.", topic: "Architecture", difficulty: "Advanced" },
    { id: "apic-q20", question: "How do you minimize memory consumption in an API Composer?", answer: "Use streaming where possible, paginate at the downstream service level, and project (select) only the necessary fields.", topic: "Architecture", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "What if the query requires sorting or filtering across two different microservices?",
    "How do you handle failures if 1 out of 5 services times out?",
    "Why not use CQRS instead?",
  ],
  commonMistakes: [
    "Making sequential API calls instead of concurrent calls, destroying latency.",
    "Using API composition for complex queries involving millions of rows, leading to Out-Of-Memory errors.",
    "Failing the entire request if a non-critical downstream service is temporarily unavailable.",
  ],
  interviewTraps: [
    "Suggesting API composition as a solution for distributed transactions (it is only for reads).",
    "Ignoring the network overhead. In-memory joins mean pulling all relevant data over the network first.",
  ],
  tradeoffs: [
    "Simple to implement and understand vs. Inefficient for complex joins and large datasets.",
    "Real-time data fetching vs. Increased latency due to multiple network hops.",
    "No extra data stores required vs. Difficult to perform cross-service sorting and pagination.",
  ],
  comparisonTable: {
    title: "API Composition vs CQRS",
    columns: ["Feature", "API Composition", "CQRS"],
    rows: [
      { label: "Implementation", values: ["Simple (Aggregator service)", "Complex (Eventual consistency, Event Bus)"] },
      { label: "Data Freshness", values: ["Real-time (Strong consistency)", "Eventually consistent"] },
      { label: "Performance", values: ["Slower (Multiple network hops)", "Faster (Querying a pre-joined view)"] },
      { label: "Best For", values: ["Simple aggregations, small data", "Complex queries, sorting, high scale"] },
    ]
  },
  memoryTrick: "API Composition is like a Personal Shopper: They go to the bakery, the butcher, and the grocer concurrently, then give you one single bag.",
  realWorldExamples: [
    "E-commerce Product Page: An API Gateway fetches product details from Catalog Service, prices from Pricing Service, and reviews from Review Service.",
    "Social Media Profile: Fetching user details, follower count, and recent posts concurrently to render a profile screen.",
  ],
  mermaidDiagram: `flowchart TD
    Client[Client] -->|GET /profile| Composer[API Composer / Gateway]
    Composer -->|GET /users/1| UserService[User Service]
    Composer -->|GET /orders?userId=1| OrderService[Order Service]
    Composer -->|GET /reviews?userId=1| ReviewService[Review Service]
    UserService -.->|User Data| Composer
    OrderService -.->|Order Data| Composer
    ReviewService -.->|Review Data| Composer
    Composer -->|Aggregated JSON| Client
  `,
  flashcards: [
    { id: "apic-fc1", front: "What problem does API Composition solve?", back: "Retrieving and aggregating data scattered across multiple microservices that lack shared databases.", topic: "Architecture", difficulty: "Beginner" },
    { id: "apic-fc2", front: "What is a major limitation of API Composition?", back: "It cannot efficiently handle cross-service sorting, filtering, or deep pagination over large datasets.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-fc3", front: "What happens to latency in API Composition?", back: "It increases due to network hops and is bound by the slowest downstream service (straggler problem).", topic: "Architecture", difficulty: "Beginner" },
    { id: "apic-fc4", front: "How should an API Composer fetch data?", back: "Concurrently (in parallel) to minimize the total response time.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "apic-fc5", front: "What is the primary alternative to API Composition for complex queries?", back: "CQRS (Command Query Responsibility Segregation).", topic: "Architecture", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "API Composition Overview",
    sections: [
      {
        heading: "How it Works",
        items: [
          "Client requests data spanning domains.",
          "Composer calls services concurrently.",
          "Composer joins data in-memory.",
          "Composer returns aggregated response.",
        ],
      },
      {
        heading: "Best Practices",
        items: [
          "Use concurrent I/O.",
          "Implement partial responses (graceful degradation).",
          "Use timeouts and circuit breakers.",
          "Cache responses where appropriate.",
        ],
      },
      {
        heading: "When to avoid",
        items: [
          "Need to sort on fields from multiple services.",
          "Need to paginate across multiple services.",
          "Handling massive datasets.",
        ],
      },
    ],
  },
  speedNotes: [
    "Aggregates data from multiple microservices.",
    "Acts as an application-layer JOIN.",
    "Must execute downstream calls concurrently.",
    "Struggles with cross-service pagination.",
    "Simpler but slower alternative to CQRS.",
  ],
};
