import type { ConceptRevisionContent } from "./types";

export const monolith: ConceptRevisionContent = {
  slug: "monolith",
  title: "Monolithic Architecture",
  topic: "Architecture",
  difficulty: "Beginner",
  estimatedMinutes: 10,
  docLinks: [
    { label: "Monolith", href: "/docs/microservices/monolith" },
    { label: "Microservices", href: "/docs/microservices/microservices" }
  ],
  summary: [
    "A monolithic architecture is a unified software model where all components of an application are interconnected and interdependent.",
    "The user interface, business logic, and data access layers are combined into a single program from a single platform.",
    "It is simple to develop, test, and deploy in the early stages of a project.",
    "However, as the application grows, a monolith can become complex, difficult to maintain, and hard to scale.",
    "Scaling requires replicating the entire application, which can be inefficient."
  ],
  whyAsked: [
    "To understand the fundamental baseline of software architecture.",
    "To evaluate knowledge of trade-offs between monoliths and distributed systems.",
    "To test your ability to recognize when an application has outgrown a monolithic approach."
  ],
  thirtySecondAnswer: "A monolithic application is built as a single, indivisible unit where all business logic, UI, and data access are housed in one codebase and deployed together. While this simplicity accelerates initial development, testing, and deployment, it becomes a bottleneck as the application scales. Large monoliths suffer from long build times, tight coupling, scaling inefficiencies (you must scale the whole app, not just the bottleneck), and a lack of fault tolerance (a bug in one module can crash the whole system).",
  detailedAnswer: [
    "Single Codebase: All features and components live in a single repository.",
    "Shared Memory: Components often communicate via direct method calls in shared memory, making them very fast.",
    "Simplified Deployment: You only need to deploy a single artifact (e.g., a WAR file or a single binary) to a server.",
    "Tight Coupling: Code can easily become intertwined without strict discipline, leading to 'spaghetti code'.",
    "Scaling Challenges: You must scale the entire application, even if only one module is experiencing high load.",
    "Technology Lock-in: It's very difficult to introduce new languages or frameworks, as the entire app uses the same tech stack."
  ],
  questions: [
    { id: "monl-q1", question: "What is a monolithic architecture?", answer: "An architectural style where all components of an application are combined into a single, unified unit.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-q2", question: "Why start with a monolith?", answer: "It is easier to build, test, deploy, and debug initially when the team and codebase are small.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-q3", question: "What is the biggest drawback of a monolith?", answer: "As it grows, it becomes difficult to understand, maintain, scale, and deploy quickly.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q4", question: "How do you scale a monolith?", answer: "By running multiple instances of the entire application behind a load balancer.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-q5", question: "Why is scaling a monolith inefficient?", answer: "You must allocate resources for the entire application, even if only a specific module needs scaling.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q6", question: "What is tight coupling in a monolith?", answer: "When different modules are highly dependent on each other, making independent changes risky and difficult.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q7", question: "How does a monolith affect deployment frequency?", answer: "Deployments become slower and less frequent because any small change requires redeploying the entire application.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-q8", question: "What is the impact of a bug in a monolith?", answer: "A severe bug (like a memory leak) in one module can crash the entire application.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q9", question: "How does technology lock-in occur in monoliths?", answer: "The entire application must use the same technology stack, making it hard to adopt new languages or frameworks.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-q10", question: "What is a modular monolith?", answer: "A monolith with strict boundaries and well-defined interfaces between modules, offering some benefits of microservices while remaining a single deployment unit.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q11", question: "When should you definitely avoid a monolith?", answer: "When different parts of the system have vastly different scalability, reliability, or technology requirements.", topic: "Architecture", difficulty: "Advanced" },
    { id: "monl-q12", question: "How do teams collaborate on a large monolith?", answer: "It can be difficult; teams often step on each other's toes, requiring complex merge strategies and coordinated releases.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q13", question: "Is performance better in a monolith or microservices?", answer: "Often better in a monolith for a single request, as components communicate via fast in-memory method calls rather than network hops.", topic: "Architecture", difficulty: "Advanced" },
    { id: "monl-q14", question: "What is the database pattern typically used?", answer: "A single, shared relational database is most common.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-q15", question: "How does a shared database affect a monolith?", answer: "It creates hidden coupling at the data layer, making schema changes risky.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q16", question: "What is a 'Big Ball of Mud'?", answer: "A haphazardly structured software system with no clear architecture, often the result of an overgrown monolith.", topic: "Architecture", difficulty: "Advanced" },
    { id: "monl-q17", question: "How does onboarding new developers work in a monolith?", answer: "Initially easy, but becomes very difficult in large monoliths due to the massive codebase they must understand.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q18", question: "What is the Strangler Fig pattern?", answer: "A strategy to migrate a monolith to microservices by gradually replacing specific functionalities with new services.", topic: "Architecture", difficulty: "Advanced" },
    { id: "monl-q19", question: "Does a monolith imply bad design?", answer: "No, a well-structured modular monolith is a very valid and often preferred architecture for many use cases.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-q20", question: "How do you test a monolith?", answer: "Typically involves heavy reliance on end-to-end and integration tests, which can become very slow.", topic: "Architecture", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "When does it make sense to transition to microservices?",
    "How do you decouple a tightly coupled monolith?",
    "What are the benefits of a modular monolith over microservices?"
  ],
  commonMistakes: [
    "Assuming microservices are always better than a monolith.",
    "Allowing boundaries between modules to erode over time (creating spaghetti code).",
    "Starting with microservices too early before domain boundaries are well understood."
  ],
  interviewTraps: [
    "Dismissing monoliths entirely; many successful large-scale companies started with or still use monoliths.",
    "Failing to mention the network overhead and complexity introduced when breaking up a monolith."
  ],
  tradeoffs: [
    "Development Simplicity vs. Long-term Maintainability",
    "Operational Simplicity vs. Granular Scalability",
    "Performance (no network hops) vs. Fault Isolation"
  ],
  comparisonTable: {
    title: "Monolith vs Microservices",
    columns: ["Feature", "Monolith", "Microservices"],
    rows: [
      { label: "Deployment", values: ["Single unit", "Multiple independent units"] },
      { label: "Scalability", values: ["Scale the entire app", "Scale individual components"] },
      { label: "Technology Stack", values: ["Uniform", "Heterogeneous"] },
      { label: "Fault Tolerance", values: ["Low (single point of failure)", "High (isolated failures)"] },
      { label: "Communication", values: ["In-memory method calls", "Network calls (REST/gRPC)"] },
      { label: "Complexity", values: ["High in codebase, low in ops", "Low in codebase, high in ops"] }
    ]
  },
  memoryTrick: "Monolith = A giant stone block. Solid and simple, but hard to break apart or move efficiently.",
  realWorldExamples: [
    "StackOverflow: Runs incredibly efficiently on a monolithic architecture.",
    "E-commerce startup: Starting with a single codebase for quick feature delivery before finding product-market fit."
  ],
  mermaidDiagram: `flowchart TD
    Client --> LoadBalancer
    LoadBalancer --> App1[Monolith Instance 1]
    LoadBalancer --> App2[Monolith Instance 2]
    App1 --> DB[(Shared Database)]
    App2 --> DB`,
  flashcards: [
    { id: "monl-fc1", front: "What is a Monolith?", back: "An application built as a single, unified deployment unit.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-fc2", front: "Main advantage of Monoliths?", back: "Simplicity in initial development, testing, and deployment.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-fc3", front: "Main disadvantage of Monoliths?", back: "Hard to scale and maintain as the codebase and team grow.", topic: "Architecture", difficulty: "Beginner" },
    { id: "monl-fc4", front: "How do components communicate in a Monolith?", back: "Via direct in-memory method calls.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "monl-fc5", front: "What is a Modular Monolith?", back: "A single deployment unit with strict internal module boundaries and interfaces.", topic: "Architecture", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Monolithic Architecture",
    sections: [
      {
        heading: "Pros",
        items: [
          "Simple to develop and deploy initially",
          "Easy to test end-to-end",
          "No network latency between components",
          "Single technology stack to manage"
        ]
      },
      {
        heading: "Cons",
        items: [
          "Difficult to scale independently",
          "A bug can crash the whole system",
          "Slower deployment cycles",
          "Codebase can become tangled"
        ]
      },
      {
        heading: "When to use",
        items: [
          "Startups finding product-market fit",
          "Small to medium complexity applications",
          "When domain boundaries are not yet clear"
        ]
      }
    ]
  },
  speedNotes: [
    "Single deployment unit",
    "In-memory communication",
    "Shared database usually",
    "Hard to scale parts",
    "Start simple, split later"
  ]
};
