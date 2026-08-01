import type { ConceptRevisionContent } from "./types";

export const ecommercePlatformDesign: ConceptRevisionContent = {
  slug: "ecommerce-platform-design",
  title: "E-commerce Platform Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 25,
  docLinks: [
    { label: "E-commerce System", href: "/docs/case-studies/e-commerce" },
  ],
  summary: [
    "An E-commerce platform involves catalog management, search, cart, checkout, payment, and inventory.",
    "It requires handling massive scale for browsing (reads) and spikes in traffic during sales (writes).",
    "Microservices architecture is standard to allow independent scaling of Search, Cart, and Order services.",
    "Search typically relies on Elasticsearch; Catalogs on NoSQL/CDN; Transactions on SQL.",
    "Distributed transactions across microservices are handled using event-driven architectures and the Saga pattern.",
  ],
  whyAsked: [
    "Tests broad understanding of multiple system design concepts in a single architecture.",
    "Evaluates ability to design for high availability (browsing) while maintaining strong consistency (payments).",
    "Assesses knowledge of handling traffic spikes (e.g., Black Friday).",
  ],
  thirtySecondAnswer: "Designing an E-commerce platform requires splitting domains into microservices. The Product Catalog is read-heavy, using CDNs, Redis, and NoSQL. Search is powered by Elasticsearch. The Shopping Cart must be highly available, often using DynamoDB or Redis. The Order and Payment services require strong consistency, utilizing a Relational DB. Inventory is updated transactionally. Asynchronous processing via Kafka handles post-order tasks like notifications, shipping, and analytics, ensuring high throughput during flash sales.",
  detailedAnswer: [
    "Use a CDN for product images and static assets to reduce server load.",
    "Product Catalog Service serves product details, often caching heavily in Redis and storing unstructured data in MongoDB/Cassandra.",
    "Search Service uses Elasticsearch, kept in sync with the catalog via CDC or event queues.",
    "Shopping Cart Service uses a highly available datastore (like DynamoDB) to ensure users never fail to add items, handling merge conflicts on read.",
    "Order Service manages the checkout workflow, coordinating inventory reservation and payment processing within a transactional boundary or Saga.",
    "Inventory Service is tricky during flash sales; use Redis for fast atomic decrements, synced to a SQL DB for persistence.",
  ],
  questions: [
    { id: "ecpd-q1", question: "How do you handle sudden spikes in traffic (Flash Sales)?", answer: "Scale horizontally, pre-warm caches, use Redis for inventory holding, queue order requests in Kafka to protect backend DBs, and gracefully degrade non-critical features.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ecpd-q2", question: "What database is best for the Product Catalog?", answer: "NoSQL (e.g., MongoDB, Cassandra) is often used for flexible schemas (different products have different attributes), backed by Redis caching.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-q3", question: "How do you ensure strong consistency for payments?", answer: "Use a Relational Database (SQL) for order/payment tables, utilizing ACID properties, idempotency keys, and 2PC or Saga patterns.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ecpd-q4", question: "How does the search functionality work?", answer: "Data is indexed into Elasticsearch. Product updates publish events to Kafka, which a consumer reads to update the Elasticsearch index.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-q5", question: "How do you handle inventory deduction?", answer: "Deduct inventory temporarily during checkout (using Redis/DB locks). If payment fails or times out, restock it. If successful, permanently confirm deduction.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ecpd-q6", question: "What is the Saga pattern in this context?", answer: "A sequence of local transactions (Order -> Inventory -> Payment). If one step fails, compensating transactions run to undo previous steps.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ecpd-q7", question: "Where do you store product images?", answer: "In Object Storage (like Amazon S3) and serve them globally via a CDN (Content Delivery Network).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ecpd-q8", question: "How do you make the shopping cart highly available?", answer: "Store cart data in a distributed NoSQL DB (DynamoDB) or Redis. Availability is prioritized; eventual consistency is acceptable for carts.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-q9", question: "How to prevent duplicate orders if a user double-clicks 'Pay'?", answer: "Implement idempotency. The client generates a unique 'idem-key' per checkout attempt. The backend checks if this key was already processed.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-q10", question: "How do you handle real-time recommendations?", answer: "Stream user click/view events via Kafka to a stream processing engine (Spark/Flink) which updates recommendation models served via a fast cache.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ecpd-q11", question: "Why use microservices for e-commerce?", answer: "Independent scaling (Search scales differently than Payment), fault isolation, and independent team deployments.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ecpd-q12", question: "How do you design for multiple geographic regions?", answer: "Deploy in multiple regions. Use CDN for assets, replicate product catalogs globally, but partition user data and orders by region to comply with data laws.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ecpd-q13", question: "How to handle a failed third-party payment gateway?", answer: "Provide fallback gateways if possible, queue the transaction for retry, and use circuit breakers to fail fast and inform the user.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-q14", question: "What happens if a microservice crashes during order processing?", answer: "Event-driven architecture ensures the message (e.g., 'PaymentCompleted') remains in Kafka until a restarted service consumes and acknowledges it.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-q15", question: "How do you handle reviews and ratings?", answer: "A separate Reviews Service. Ratings are pre-aggregated (average score, count) and stored in the catalog cache, updated asynchronously when new reviews are posted.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-q16", question: "How to shard the orders database?", answer: "Typically sharded by UserID, so a user's entire order history can be retrieved from a single shard.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ecpd-q17", question: "What is API composition?", answer: "An API Gateway or BFF (Backend for Frontend) aggregates data from multiple microservices (Catalog, Reviews, Inventory) into a single response for the client.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ecpd-q18", question: "How do you manage sessions?", answer: "Stateless sessions using JWTs stored in secure cookies, or session IDs backed by a distributed cache like Redis.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ecpd-q19", question: "How to handle tax calculations?", answer: "Integrate a dedicated Tax Service or third-party API during the checkout phase, caching generic rates but computing exact amounts synchronously.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-q20", question: "How do you monitor the platform?", answer: "Use distributed tracing (Jaeger/Zipkin) for request flows, Prometheus for metrics (order rate, error rate), and ELK for centralized logging.", topic: "System Design Case Studies", difficulty: "Beginner" },
  ],
  commonFollowUps: [
    "How would you redesign this specifically for a massive flash sale (e.g., Singles' Day)?",
    "How do you handle eventual consistency if the inventory says 'in stock' but it's actually sold out at checkout?",
    "How do you integrate machine learning for personalized homepages?",
  ],
  commonMistakes: [
    "Using a monolithic database for the entire platform.",
    "Synchronous communication between all microservices leading to cascading failures.",
    "Forgetting idempotency in the payment and order flow.",
  ],
  interviewTraps: [
    "Trying to keep the search index synchronously updated with the database.",
    "Locking database rows for inventory during the entire cart-building process instead of just at checkout.",
  ],
  tradeoffs: [
    "Availability vs Consistency in Carts: It's better to accept a cart addition even if network is split (Availability), and resolve conflicts later, rather than rejecting the action.",
    "Choreography vs Orchestration (Sagas): Orchestration is easier to manage and monitor for complex orders, while choreography is more decoupled but harder to track.",
  ],
  memoryTrick: "Browse fast (Cache/NoSQL), Buy safe (SQL/Sagas).",
  realWorldExamples: [
    "Amazon migrated from a monolith to microservices to scale independently.",
    "Shopify uses heavily sharded MySQL databases and relies heavily on Redis for flash sale inventory.",
  ],
  mermaidDiagram: `flowchart TD
    Client --> CDN
    Client --> API[API Gateway]
    API --> CS[Catalog Service]
    API --> Cart[Cart Service]
    API --> Search[Search Service]
    API --> Order[Order Service]
    
    CS --> C_DB[(NoSQL DB)]
    CS --> Redis[(Redis)]
    Search --> ES[(Elasticsearch)]
    Cart --> Dynamo[(DynamoDB)]
    
    Order --> SQL[(SQL DB)]
    Order --> Pay[Payment Service]
    Order --> Inv[Inventory Service]
    Order --> Kafka[Kafka Queue]
    
    Kafka --> Notif[Notification Service]
`,
  flashcards: [
    { id: "ecpd-fc1", front: "Which DB is best for a shopping cart?", back: "DynamoDB, Redis, or Cassandra due to high availability needs.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ecpd-fc2", front: "How is Search typically implemented?", back: "Elasticsearch, updated asynchronously from the catalog via Kafka/CDC.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ecpd-fc3", front: "How to handle distributed transactions in checkout?", back: "Using the Saga pattern (Orchestration or Choreography).", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ecpd-fc4", front: "How do you protect databases during flash sales?", back: "Queue requests in a message broker and use Redis for fast atomic inventory checks.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ecpd-fc5", front: "How to avoid double charging a user?", back: "Idempotency keys generated by the client and validated by the payment service.", topic: "System Design Case Studies", difficulty: "Intermediate" },
  ],
  cheatSheet: {
    title: "E-commerce Platform",
    sections: [
      { heading: "Databases", items: ["Catalog: NoSQL", "Cart: DynamoDB/Redis", "Orders: SQL", "Search: Elasticsearch"] },
      { heading: "Key Patterns", items: ["Saga Pattern", "Event-Driven Architecture", "Circuit Breaker", "BFF/API Gateway"] },
      { heading: "Flash Sales", items: ["Pre-warm caches", "Redis atomic operations", "Kafka buffering"] },
    ],
  },
  speedNotes: [
    "Microservices are essential",
    "Async updates via Kafka",
    "Sagas for checkout flow",
    "Idempotency prevents double billing",
    "CDN for all static assets",
  ],
};
