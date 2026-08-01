import type { ConceptRevisionContent } from "./types";

export const bulkheadPattern: ConceptRevisionContent = {
  slug: "bulkhead-pattern",
  title: "Bulkhead Pattern",
  topic: "Architecture",
  difficulty: "Intermediate",
  estimatedMinutes: 10,
  docLinks: [
    { label: "Bulkhead", href: "/docs/microservices/bulkhead" }
  ],
  summary: [
    "The Bulkhead pattern isolates elements of an application into pools so that if one fails, the others continue to function.",
    "Named after the sectioned partitions of a ship's hull that prevent the entire ship from sinking if one section is breached.",
    "Prevents faults in one part of the system from cascading and taking down the entire application.",
    "Commonly implemented using separate thread pools, connection pools, or even entirely separate deployment units."
  ],
  whyAsked: [
    "To test your knowledge of fault tolerance and isolation in distributed systems.",
    "To see if you understand how to prevent resource exhaustion from cascading failures."
  ],
  thirtySecondAnswer: "The Bulkhead pattern partitions an application's resources—like thread pools or database connections—into isolated buckets based on the service or tenant they interact with. If one downstream service becomes slow or unresponsive, it will only exhaust its specific resource pool, leaving the rest of the application unaffected and able to serve other requests normally. This contains the blast radius of a failure.",
  detailedAnswer: [
    "Identify critical resources that are shared across different parts of the application (e.g., HTTP connection pools).",
    "Partition these resources into isolated pools dedicated to specific downstream services or client tiers.",
    "If Service A becomes slow, the threads waiting for Service A will be exhausted.",
    "However, because Service B has its own dedicated thread pool, requests to Service B remain unaffected.",
    "This prevents thread starvation and cascading failures across the entire system."
  ],
  questions: [
    { id: "bh-q1", question: "What is the main goal of the Bulkhead pattern?", answer: "To isolate failures and prevent them from cascading to other parts of the system.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-q2", question: "Where does the name 'Bulkhead' come from?", answer: "From ship design, where partitions (bulkheads) prevent the whole ship from sinking if one section floods.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-q3", question: "What problem does the Bulkhead pattern solve?", answer: "Resource exhaustion caused by a slow or failing downstream dependency.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-q4", question: "Give an example of a resource that can be bulkheaded.", answer: "Thread pools, database connection pools, memory, or CPU allocations.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-q5", question: "How does a thread pool bulkhead work?", answer: "By assigning separate thread pools for calls to different downstream services.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-q6", question: "What happens if you don't use a bulkhead and one service gets slow?", answer: "All threads in the shared pool will eventually block waiting for the slow service, starving all other requests.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-q7", question: "What is the downside of the Bulkhead pattern?", answer: "It can lead to inefficient resource utilization because resources are siloed and cannot be shared when idle.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-q8", question: "Can Bulkheads be implemented at the infrastructure level?", answer: "Yes, by deploying separate instances of a service in different availability zones or clusters.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-q9", question: "How does Bulkhead differ from Circuit Breaker?", answer: "Circuit Breaker stops sending requests to a failing service. Bulkhead limits the resources a failing service can consume.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-q10", question: "Are Bulkhead and Circuit Breaker usually used together?", answer: "Yes, they complement each other perfectly to provide robust resilience.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-q11", question: "What is a 'tenant-based' bulkhead?", answer: "Allocating specific resource pools to different clients (tenants), ensuring a noisy neighbor doesn't affect premium tenants.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-q12", question: "How does asynchronous programming relate to bulkheads?", answer: "Async non-blocking I/O can reduce the need for thread-pool bulkheads, but connection pool bulkheading is still necessary.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-q13", question: "What is a 'semantic' bulkhead?", answer: "Gracefully degrading functionality in the UI when a specific backend service (like recommendations) fails, while keeping the main app functional.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-q14", question: "What metric is most important when sizing a thread pool bulkhead?", answer: "The expected concurrency (Requests per second * average latency).", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-q15", question: "Explain how service mesh implements bulkheading.", answer: "Tools like Istio can enforce connection limits and request limits per downstream service at the proxy layer.", topic: "Architecture", difficulty: "Advanced" },
    { id: "bh-q16", question: "What happens if a bulkhead pool is sized too small?", answer: "Requests will be rejected (or queued for too long) even when the overall system has plenty of capacity.", topic: "Architecture", difficulty: "Advanced" },
    { id: "bh-q17", question: "How do you implement a bulkhead using Semaphores?", answer: "Instead of dedicating threads, use semaphores to limit the number of concurrent executions for a specific task.", topic: "Architecture", difficulty: "Advanced" },
    { id: "bh-q18", question: "Why might a semaphore bulkhead be preferred over a thread pool bulkhead?", answer: "Semaphores avoid the overhead of thread context switching and are better suited for non-blocking reactive frameworks.", topic: "Architecture", difficulty: "Advanced" },
    { id: "bh-q19", question: "How does Kubernetes implement bulkheading?", answer: "Through resource requests and limits (CPU/Memory) on containers, preventing one container from hogging the node's resources.", topic: "Architecture", difficulty: "Advanced" },
    { id: "bh-q20", question: "How do you monitor the effectiveness of a Bulkhead?", answer: "Monitor the queue depth, rejection rate, and thread/connection utilization for each isolated pool.", topic: "Architecture", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "Thread pool vs Semaphore bulkheads?",
    "How do you size the bulkheads appropriately?",
    "How does it combine with Circuit Breaker?"
  ],
  commonMistakes: [
    "Using a single global connection pool for all external HTTP calls.",
    "Making pools too small, artificially throttling the system.",
    "Ignoring the overhead of managing many small thread pools."
  ],
  interviewTraps: [
    "Confusing Bulkhead with Rate Limiting (Bulkhead protects internal resources, Rate Limiting protects from external abuse)."
  ],
  tradeoffs: [
    "Resource Inefficiency: Siloed resources mean unused capacity in one pool cannot be used by a starved pool.",
    "Complexity: Managing and tuning multiple resource pools is harder than managing one."
  ],
  memoryTrick: "Don't let one slow service sink the whole ship.",
  realWorldExamples: [
    "Resilience4j provides ThreadPoolBulkhead and SemaphoreBulkhead implementations in Java.",
    "Microservice deployments across multiple availability zones act as physical bulkheads."
  ],
  mermaidDiagram: `flowchart TD
  A[Client Requests] --> B{API Gateway}
  B -->|Pool A| C[Service A]
  B -->|Pool B| D[Service B]
  B -->|Pool C| E[Service C - SLOW]
  style E fill:#f9f,stroke:#333,stroke-width:4px
  note[Pool C Exhausted, but Pool A and B continue working]`,
  flashcards: [
    { id: "bh-fc1", front: "What is the Bulkhead pattern?", back: "Isolating resources into pools so a failure in one doesn't cascade to others.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-fc2", front: "What is a Thread Pool Bulkhead?", back: "Assigning dedicated thread pools for different downstream dependencies.", topic: "Architecture", difficulty: "Beginner" },
    { id: "bh-fc3", front: "Bulkhead vs Circuit Breaker?", back: "Bulkhead limits resource consumption; Circuit breaker stops requests to a failing service entirely.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-fc4", front: "What is a Semaphore Bulkhead?", back: "Limiting concurrent executions using counters (semaphores) instead of dedicated threads.", topic: "Architecture", difficulty: "Intermediate" },
    { id: "bh-fc5", front: "Main tradeoff of Bulkheading?", back: "Resource fragmentation and inefficiency (idle resources in one pool can't help another).", topic: "Architecture", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Bulkhead Pattern",
    sections: [
      { heading: "Types", items: ["Thread Pool Bulkheads", "Semaphore Bulkheads", "Physical/Deployment Bulkheads"] },
      { heading: "Benefits", items: ["Contains blast radius", "Prevents resource exhaustion", "Protects against noisy neighbors"] },
      { heading: "Tradeoffs", items: ["Resource fragmentation", "Configuration complexity"] }
    ]
  },
  speedNotes: [
    "Isolates failures.",
    "Prevents cascading resource exhaustion.",
    "Thread pools or semaphores.",
    "Limits blast radius.",
    "Trades efficiency for resilience."
  ]
};
