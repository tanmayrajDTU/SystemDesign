import type { ConceptRevisionContent } from "./types";

export const distributedTracing: ConceptRevisionContent = {
  slug: "distributed-tracing",
  title: "Distributed Tracing",
  topic: "Observability",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Tracing", href: "/docs/observability/tracing" },
    { label: "Logging", href: "/docs/observability/logging" },
  ],
  summary: [
    "Distributed tracing is a method to track application requests as they flow from frontend devices to backend services and databases.",
    "It helps identify performance bottlenecks, understand system dependencies, and debug failures across microservices.",
    "Requests are tracked using a unique Trace ID, which is passed along through service calls.",
    "Each operation or segment of the request is recorded as a 'Span', with a start and end time.",
    "A trace is essentially a tree of spans, allowing visualization of the entire request lifecycle."
  ],
  whyAsked: [
    "To see if you understand how to debug and monitor complex microservice architectures.",
    "To evaluate your knowledge of request flow, latency analysis, and bottleneck identification.",
    "To assess your familiarity with observability tools and standards like OpenTelemetry."
  ],
  thirtySecondAnswer: "Distributed tracing tracks a single request as it traverses multiple services in a distributed system. By injecting a unique Trace ID at the entry point and propagating it across all subsequent service calls, we can correlate logs and performance data. Each service records its work as a 'Span' (containing start/end times and metadata), allowing us to visualize the entire request path, pinpoint latency bottlenecks, and debug complex cross-service failures.",
  detailedAnswer: [
    "Context Propagation: The Trace ID and Span ID must be injected into headers (like HTTP headers or message brokers) and extracted by the receiving service to maintain the trace continuity.",
    "Spans and Traces: A Trace represents the entire request. A Span represents a single unit of work (e.g., a DB query or an HTTP call). Spans have parent-child relationships.",
    "Sampling: Since tracing every single request generates too much data, sampling (e.g., keeping 1% of traces or using tail-based sampling for errors/slow requests) is critical to manage overhead and storage costs.",
    "Instrumentation: Applications must be instrumented to generate tracing data, increasingly done using standard frameworks like OpenTelemetry to avoid vendor lock-in.",
    "Storage and Visualization: Trace data is sent to a backend (like Jaeger, Zipkin, or Datadog) where it is indexed, stored, and visualized as a Gantt chart to analyze timing and dependencies."
  ],
  questions: [
    { id: "dt-q1", question: "What is a Trace ID?", answer: "A globally unique identifier assigned to a request when it first enters the system, used to correlate all subsequent operations related to that request.", topic: "Observability", difficulty: "Beginner" },
    { id: "dt-q2", question: "What is a Span?", answer: "A single logical operation or unit of work within a trace, containing a name, start time, duration, and optional metadata.", topic: "Observability", difficulty: "Beginner" },
    { id: "dt-q3", question: "How is tracing different from logging?", answer: "Logging records discrete events. Tracing tracks the flow of a single request across multiple services, linking operations together via IDs.", topic: "Observability", difficulty: "Beginner" },
    { id: "dt-q4", question: "What is Context Propagation?", answer: "The process of passing trace identifiers (Trace ID, parent Span ID) across service boundaries, typically via HTTP headers.", topic: "Observability", difficulty: "Beginner" },
    { id: "dt-q5", question: "Why do we need distributed tracing in microservices?", answer: "Because a single user request might touch dozens of services; without tracing, it's nearly impossible to know which service caused a failure or latency.", topic: "Observability", difficulty: "Beginner" },
    { id: "dt-q6", question: "What is OpenTelemetry?", answer: "An open-source observability framework providing a standard way to instrument, generate, collect, and export telemetry data (metrics, logs, traces).", topic: "Observability", difficulty: "Beginner" },
    { id: "dt-q7", question: "What is head-based sampling?", answer: "A sampling decision made at the beginning of a trace (e.g., at the API gateway). Once decided, the entire trace is either kept or dropped.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-q8", question: "What is tail-based sampling?", answer: "A sampling decision made at the end of a trace, allowing the system to keep traces that had errors or high latency while dropping normal ones.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-q9", question: "How do you propagate trace context in asynchronous messaging (e.g., Kafka)?", answer: "By injecting the trace IDs into the message headers or metadata before publishing, and extracting them when consuming.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-q10", question: "What happens if one service in the chain drops the trace context?", answer: "The trace becomes broken or fragmented. Subsequent services will start a new trace, losing the correlation to the original request.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-q11", question: "What are span tags/attributes used for?", answer: "To add contextual metadata to a span, like HTTP status codes, user IDs, or query strings, which helps in filtering and searching traces.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-q12", question: "How does tracing impact application performance?", answer: "Instrumenting code and network propagation adds CPU and memory overhead, which is why sampling and asynchronous data exporting are used.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-q13", question: "What is a root span?", answer: "The first span in a trace, which has no parent. Its duration typically represents the end-to-end latency of the request.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-q14", question: "Explain the architecture of a tracing system (like Jaeger).", answer: "It typically involves client libraries (instrumentation), an agent/collector (to batch and forward data), a storage backend, and a UI for querying.", topic: "Observability", difficulty: "Advanced" },
    { id: "dt-q15", question: "Why is tail-based sampling harder to implement than head-based?", answer: "Because you must buffer all spans of a trace until it completes to make a decision, which requires significant memory and state management across collectors.", topic: "Observability", difficulty: "Advanced" },
    { id: "dt-q16", question: "How do you handle clock skew between services in distributed tracing?", answer: "Clock skew can cause child spans to appear before parents. Tracing backends use algorithms to adjust span timestamps relative to the parent's boundaries.", topic: "Observability", difficulty: "Advanced" },
    { id: "dt-q17", question: "How do you trace database queries if you can't instrument the database?", answer: "You instrument the database client/driver in the application code, creating a span representing the time spent waiting for the DB to respond.", topic: "Observability", difficulty: "Advanced" },
    { id: "dt-q18", question: "How would you implement trace ID propagation across a load balancer?", answer: "Ensure the load balancer is configured to pass through specific trace headers (e.g., W3C Trace Context) or even generate a root trace if missing.", topic: "Observability", difficulty: "Advanced" },
    { id: "dt-q19", question: "What is the W3C Trace Context standard?", answer: "A standardized set of HTTP headers (traceparent, tracestate) to ensure different tracing tools can propagate context across boundaries interoperably.", topic: "Observability", difficulty: "Advanced" },
    { id: "dt-q20", question: "How can tracing data be used for dependency mapping?", answer: "By aggregating span relationships over time, tracing systems can dynamically generate an architecture topology or service dependency graph.", topic: "Observability", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you store millions of spans per second?",
    "How does head-based vs. tail-based sampling work?",
    "How do you ensure trace IDs are propagated across asynchronous message queues?"
  ],
  commonMistakes: [
    "Confusing tracing with logging or metrics; they are the three pillars, not substitutes.",
    "Forgetting to propagate trace context in background workers or async queues.",
    "Trying to trace 100% of requests in a high-throughput system without sampling."
  ],
  interviewTraps: [
    "Saying you will store all traces in a relational DB. Traces are high-volume time-series/document data better suited for Cassandra or Elasticsearch.",
    "Not mentioning the overhead of instrumentation. Tracing has a real CPU/Network cost."
  ],
  tradeoffs: [
    "100% Sampling vs. Cost: Capturing everything is great for debugging rare errors, but astronomically expensive to store.",
    "Head-based vs. Tail-based Sampling: Head-based is cheap and stateless, but misses rare errors. Tail-based catches all errors but requires complex, stateful collectors to buffer traces."
  ],
  memoryTrick: "Tracing is like a package tracking number (Trace ID) with checkpoints (Spans) showing exactly where it was delayed.",
  realWorldExamples: [
    "Uber developed Jaeger to trace requests across their thousands of microservices.",
    "E-commerce platforms use tracing to find out exactly which service (inventory, payment, or shipping) caused a user's checkout to take 5 seconds."
  ],
  mermaidDiagram: `flowchart TD
    Client -->|Req + TraceID| API_Gateway
    API_Gateway -->|Span A| Service_X
    Service_X -->|Span B| Service_Y
    Service_X -->|Span C| Database
    Service_Y -->|Span D| Cache
    
    subgraph Tracing Backend
    Collector
    Storage
    UI
    end
    
    API_Gateway -.-> Collector
    Service_X -.-> Collector
    Service_Y -.-> Collector`,
  flashcards: [
    { id: "dt-fc1", front: "Trace ID vs Span ID", back: "Trace ID identifies the entire request; Span ID identifies a specific operation within that request.", topic: "Observability", difficulty: "Beginner" },
    { id: "dt-fc2", front: "Context Propagation", back: "Passing trace headers across service boundaries so the trace remains connected.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-fc3", front: "Tail-based Sampling", back: "Deciding whether to keep a trace AFTER the request completes, allowing you to selectively save error/slow traces.", topic: "Observability", difficulty: "Advanced" },
    { id: "dt-fc4", front: "W3C Trace Context", back: "The standardized HTTP headers (traceparent, tracestate) used for interoperable context propagation.", topic: "Observability", difficulty: "Intermediate" },
    { id: "dt-fc5", front: "Root Span", back: "The first span in a trace, representing the entry point and total duration of the request.", topic: "Observability", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Distributed Tracing",
    sections: [
      {
        heading: "Core Concepts",
        items: [
          "Trace: The end-to-end journey of a request.",
          "Span: A single logical operation (has start/end times).",
          "Trace ID: Unique ID for the whole trace.",
          "Context Propagation: Passing IDs via HTTP headers (W3C standard)."
        ]
      },
      {
        heading: "Sampling Strategies",
        items: [
          "Head-based: Decide at the start. Simple, low overhead, random.",
          "Tail-based: Decide at the end. Can save all errors, but requires buffering/state."
        ]
      },
      {
        heading: "Popular Tools",
        items: [
          "OpenTelemetry: Industry standard for instrumentation.",
          "Jaeger/Zipkin: Open-source backends.",
          "Datadog/Honeycomb: SaaS tracing platforms."
        ]
      }
    ]
  },
  speedNotes: [
    "Traces track requests across services.",
    "Trace ID is passed everywhere.",
    "Spans represent single operations.",
    "Sampling prevents storage explosion.",
    "Headers propagate context seamlessly."
  ]
};
