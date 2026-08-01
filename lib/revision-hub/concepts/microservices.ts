import type { ConceptRevisionContent } from "./types";

export const microservices: ConceptRevisionContent = {
  slug: "microservices",
  title: "Microservices Architecture",
  topic: "Architecture",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Microservices", href: "/docs/microservices/microservices" },
    { label: "Monolith", href: "/docs/microservices/monolith" }
  ],
  summary: [
    "Microservices architecture structures an application as a collection of loosely coupled, independently deployable services.",
    "Each service is responsible for a specific business capability and communicates via lightweight protocols.",
    "It enables teams to develop, test, and scale services independently.",
    "It introduces complexities in networking, data consistency, and distributed debugging.",
    "It allows for heterogeneous technology stacks."
  ],
  whyAsked: [
    "To verify understanding of modern distributed application design.",
    "To check if you understand the operational complexity and trade-offs of microservices.",
    "To evaluate knowledge of concepts like service discovery, inter-service communication, and distributed data."
  ],
  thirtySecondAnswer: "Microservices break down an application into small, independent services, each focused on a single business domain. They communicate over a network (usually REST, gRPC, or messaging queues) and maintain their own databases. This allows teams to iterate quickly, scale specific components independently, and use different technologies. However, it shifts complexity from the code to the network, requiring robust DevOps, monitoring, and strategies for handling distributed transactions.",
  detailedAnswer: [
    "Independent Deployment: Services can be updated without redeploying the entire application.",
    "Loose Coupling: Changes in one service should ideally not require changes in another.",
    "Organized Around Business Capabilities: Services reflect business domains (e.g., Billing Service, User Service).",
    "Database per Service: Each service manages its own data, preventing hidden coupling at the DB layer.",
    "Polyglot Programming: Different services can be written in different languages best suited for their tasks.",
    "Operational Complexity: Requires extensive infrastructure (service meshes, API gateways, CI/CD, tracing)."
  ],
  questions: [
    { id: "msvc-q1", question: "What are Microservices?", answer: "An architecture that structures an application as a collection of small, autonomous services modeled around a business domain.", topic: "Architecture", difficulty: "Beginner" },
    { id: "msvc-q2", question: "What is the main benefit of microservices?", answer: "Independent scaling and deployment of individual components.", topic: "Architecture", difficulty: "Beginner" },
    { id: "msvc-q3", question: "What is the Database-per-Service pattern?", answer: "Each microservice has its own private database to ensure loose coupling.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q4", question: "How do microservices communicate?", answer: "Synchronously (REST, gRPC) or asynchronously (message brokers like Kafka, RabbitMQ).", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q5", question: "What is API Gateway?", answer: "A single entry point for clients that routes requests to appropriate microservices.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q6", question: "What is distributed tracing?", answer: "A method to track a request as it flows through multiple microservices, essential for debugging.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q7", question: "What is a saga pattern?", answer: "A sequence of local transactions across services to manage distributed data consistency without two-phase commit.", topic: "Architecture", difficulty: "Advanced" },
    { id: "msvc-q8", question: "What is service discovery?", answer: "A mechanism for services to find each other dynamically without hardcoded IP addresses.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q9", question: "How do you handle failures in microservices?", answer: "Using patterns like Circuit Breaker, retries with exponential backoff, and bulkheads.", topic: "Architecture", difficulty: "Advanced" },
    { id: "msvc-q10", question: "What is the strangler fig pattern?", answer: "A method to migrate a monolith to microservices by gradually extracting services.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q11", question: "Why is testing microservices hard?", answer: "Because it requires managing complex interactions, network conditions, and distributed data states.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q12", question: "What are the drawbacks of microservices?", answer: "Increased operational complexity, network latency, and difficulty in managing data consistency.", topic: "Architecture", difficulty: "Beginner" },
    { id: "msvc-q13", question: "What is polyglot persistence?", answer: "Using different database technologies for different microservices based on their specific needs.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q14", question: "How to share common code among microservices?", answer: "Through shared libraries or sidecar containers, but caution is needed to avoid tight coupling.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q15", question: "What is bounded context?", answer: "A domain-driven design concept that defines the boundaries within which a particular domain model is applicable.", topic: "Architecture", difficulty: "Advanced" },
    { id: "msvc-q16", question: "How do you achieve security in microservices?", answer: "By using API gateways, JWTs for authentication, mTLS for inter-service communication.", topic: "Architecture", difficulty: "Advanced" },
    { id: "msvc-q17", question: "What happens if a microservice is too small?", answer: "It leads to a 'nanoservices' anti-pattern, causing excessive network overhead.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q18", question: "Explain choreography vs orchestration.", answer: "Orchestration uses a central controller; choreography lets services react to events independently.", topic: "Architecture", difficulty: "Advanced" },
    { id: "msvc-q19", question: "What is eventual consistency?", answer: "A model where data across services might be temporarily out of sync but will eventually converge.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-q20", question: "How do you monitor a microservices architecture?", answer: "Aggregated logging (ELK stack), metrics (Prometheus), and distributed tracing (Jaeger).", topic: "Architecture", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How do you handle transactions that span multiple microservices?",
    "How do you migrate from a monolithic application?",
    "What are the best practices for setting microservice boundaries?"
  ],
  commonMistakes: [
    "Using a shared database for multiple microservices.",
    "Making synchronous REST calls deeply chained, leading to high latency.",
    "Adopting microservices before building CI/CD and observability infrastructure."
  ],
  interviewTraps: [
    "Saying microservices 'improve performance'. They actually add network overhead.",
    "Ignoring the complexity of distributed data management."
  ],
  tradeoffs: [
    "Independence vs. Network Overhead",
    "Scalability vs. Operational Complexity",
    "Polyglot environment vs. Duplication of effort"
  ],
  memoryTrick: "Microservices = A team of specialists. Great at their specific jobs, but require good communication to work together.",
  realWorldExamples: [
    "Netflix: Transitioned from monolith to microservices to handle scale and rapid innovation.",
    "Amazon: Decomposed their e-commerce platform to allow autonomous teams to build and deploy faster."
  ],
  mermaidDiagram: `flowchart TD
    Client --> API_Gateway
    API_Gateway --> ServiceA[User Service]
    API_Gateway --> ServiceB[Order Service]
    ServiceA --> DB1[(User DB)]
    ServiceB --> DB2[(Order DB)]
    ServiceA -.-> |Event Bus| ServiceB`,
  flashcards: [
    { id: "msvc-fc1", front: "What is Microservices Architecture?", back: "An application built as independent, loosely coupled services.", topic: "Architecture", difficulty: "Beginner" },
    { id: "msvc-fc2", front: "Database-per-Service pattern?", back: "Each service has its own database to prevent tight coupling.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-fc3", front: "What is an API Gateway?", back: "A single entry point that routes client requests to services.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-fc4", front: "What is distributed tracing?", back: "Tracking a single request as it crosses multiple service boundaries.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "msvc-fc5", front: "What is the Saga pattern?", back: "A way to manage distributed transactions using a sequence of local transactions.", topic: "Architecture", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Microservices Architecture",
    sections: [
      {
        heading: "Key Patterns",
        items: [
          "API Gateway",
          "Database per Service",
          "Circuit Breaker",
          "Saga Pattern"
        ]
      },
      {
        heading: "Pros",
        items: [
          "Independent scaling",
          "Independent deployment",
          "Technology flexibility",
          "Fault isolation"
        ]
      },
      {
        heading: "Cons",
        items: [
          "Network latency",
          "Data consistency challenges",
          "Complex debugging",
          "DevOps overhead"
        ]
      }
    ]
  },
  speedNotes: [
    "Loosely coupled services",
    "Database per service",
    "Independent deployments",
    "High network overhead",
    "Requires robust observability"
  ]
};
