import type { ConceptRevisionContent } from "./types";

export const observability: ConceptRevisionContent = {
  slug: "observability",
  title: "Observability",
  topic: "Observability",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Monitoring", href: "/docs/observability/monitoring" },
    { label: "Tracing", href: "/docs/observability/tracing" },
    { label: "Logging", href: "/docs/observability/logging" },
  ],
  summary: [
    "Observability is the ability to measure a system's internal states solely by examining its external outputs (telemetry).",
    "It is built on three main pillars: Metrics, Logs, and Traces.",
    "Unlike traditional monitoring (which asks 'is it broken?'), observability asks 'why is it broken?'.",
    "It empowers engineers to debug unknown-unknowns in highly distributed, dynamic microservice architectures.",
    "Effective observability requires standardized instrumentation, centralized storage, and powerful querying tools."
  ],
  whyAsked: [
    "To ensure you can design systems that are operable, not just functional.",
    "To test your understanding of how to debug complex distributed failures.",
    "To see if you know when to use metrics vs. logs vs. traces."
  ],
  thirtySecondAnswer: "Observability lets you understand the internal state of a complex system from the outside. While monitoring alerts you when things go wrong based on known failure modes (known-unknowns), observability lets you investigate arbitrary, novel issues (unknown-unknowns). It relies on the 'Three Pillars': Metrics (aggregations over time, great for alerting), Logs (detailed discrete events, great for debugging), and Traces (request flows across services, great for finding bottlenecks).",
  detailedAnswer: [
    "The Three Pillars: Metrics (numerical aggregations, low cost), Logs (unstructured or structured text for deep context, high cost), and Traces (request causality across boundaries).",
    "Monitoring vs Observability: Monitoring is dashboarding known metrics. Observability is providing the raw data and tools to ask ad-hoc questions during an incident.",
    "Cardinality: A major challenge in observability. High cardinality (e.g., tagging a metric with a UserID) breaks many time-series databases but is essential for deep debugging.",
    "Instrumentation: Using tools like OpenTelemetry to generate telemetry data at the application layer without vendor lock-in.",
    "Correlation: The true power of observability comes from linking the pillars (e.g., using a Trace ID found in a Log to pull up a Trace, which correlates to a spike in a Metric)."
  ],
  questions: [
    { id: "obs-q1", question: "What is Observability in software engineering?", answer: "The ability to understand a system's internal state and debug issues using only its external outputs (telemetry).", topic: "Observability", difficulty: "Beginner" },
    { id: "obs-q2", question: "What are the 'Three Pillars' of Observability?", answer: "Metrics, Logs, and Traces.", topic: "Observability", difficulty: "Beginner" },
    { id: "obs-q3", question: "What is the difference between Monitoring and Observability?", answer: "Monitoring tracks known metrics to see if things are broken. Observability collects rich data to figure out WHY they are broken, especially for novel issues.", topic: "Observability", difficulty: "Beginner" },
    { id: "obs-q4", question: "What are Metrics best used for?", answer: "Aggregated quantitative data over time. Best for high-level health checks, dashboards, and alerting (e.g., CPU %, error rates).", topic: "Observability", difficulty: "Beginner" },
    { id: "obs-q5", question: "What are Logs best used for?", answer: "Recording discrete events with rich, contextual payload data. Best for deep-dive debugging of a specific failure.", topic: "Observability", difficulty: "Beginner" },
    { id: "obs-q6", question: "What are Traces best used for?", answer: "Visualizing the lifecycle of a single request across multiple microservices. Best for finding latency bottlenecks and identifying failing components.", topic: "Observability", difficulty: "Beginner" },
    { id: "obs-q7", question: "What is Structured Logging?", answer: "Writing logs in a machine-readable format (like JSON) rather than plain text, allowing centralized log systems to easily parse and query fields.", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-q8", question: "What is cardinality in the context of metrics?", answer: "The number of unique combinations of metric labels/tags. High cardinality (like tagging by UserID) causes state explosion in time-series databases.", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-q9", question: "Why is high cardinality a problem?", answer: "It drastically increases storage requirements and slows down queries, potentially bringing down the metrics database (e.g., Prometheus).", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-q10", question: "How do you correlate logs and traces?", answer: "By injecting the Trace ID into the structured log payload. This allows you to jump from a specific log line directly to the full distributed trace.", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-q11", question: "What is OpenTelemetry?", answer: "A CNCF open standard and framework for generating, capturing, and exporting metrics, logs, and traces without vendor lock-in.", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-q12", question: "What are the RED metrics?", answer: "Rate, Errors, Duration. The essential metrics to monitor for request-driven services.", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-q13", question: "What are the USE metrics?", answer: "Utilization, Saturation, Errors. The essential metrics to monitor for infrastructure resources (like CPU, disk).", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-q14", question: "How does observability change in a microservices architecture vs. a monolith?", answer: "It becomes critical. In a monolith, a stack trace is enough. In microservices, a request spans multiple processes, requiring distributed tracing.", topic: "Observability", difficulty: "Advanced" },
    { id: "obs-q15", question: "How do you manage the cost of observability data?", answer: "Through sampling (for traces), log retention policies, dropping debug logs in prod, and aggregating metrics before storage.", topic: "Observability", difficulty: "Advanced" },
    { id: "obs-q16", question: "What is 'unknown-unknowns' debugging?", answer: "Debugging issues that you have never seen before and didn't predict. Observability provides the rich data needed to investigate these.", topic: "Observability", difficulty: "Advanced" },
    { id: "obs-q17", question: "Explain the concept of an Observability Pipeline.", answer: "A routing layer (like Vector or OpenTelemetry Collector) that processes telemetry data before storage—performing sampling, redacting PII, and routing to different backends.", topic: "Observability", difficulty: "Advanced" },
    { id: "obs-q18", question: "How do you ensure PII (Personally Identifiable Information) doesn't leak into observability tools?", answer: "By using automated redaction at the collector level, sanitizing logs in code, and having strict RBAC on observability dashboards.", topic: "Observability", difficulty: "Advanced" },
    { id: "obs-q19", question: "What is synthetic monitoring?", answer: "Simulating user traffic (e.g., automated scripts running in different regions) to continuously test availability and latency from the outside.", topic: "Observability", difficulty: "Advanced" },
    { id: "obs-q20", question: "Why might you use Exemplars in metrics?", answer: "Exemplars attach a specific Trace ID to a metric aggregate. When viewing a metric spike, an exemplar lets you click directly to a representative trace.", topic: "Observability", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you handle metrics cardinality explosions?",
    "Describe a time you used logs, metrics, and traces together to solve an outage.",
    "How do you handle observability for asynchronous systems (e.g., event-driven)?"
  ],
  commonMistakes: [
    "Thinking monitoring and observability are exactly the same thing.",
    "Logging too much unstructured data, making it impossible to query and expensive to store.",
    "Failing to propagate Trace IDs, breaking the correlation between services."
  ],
  interviewTraps: [
    "Saying you'll 'just log everything' in a high-scale system design. You must mention sampling and retention limits.",
    "Using high-cardinality tags (like UUIDs) in Prometheus metrics."
  ],
  tradeoffs: [
    "Data Volume vs. Cost: Storing 100% of telemetry gives perfect visibility but is prohibitively expensive. You must sample and summarize.",
    "Vendor vs. Open Source: SaaS (Datadog) is easy but expensive and causes lock-in. OSS (Prometheus/Jaeger) is cheap but requires managing complex infrastructure."
  ],
  memoryTrick: "Metrics to Alert, Traces to Isolate, Logs to Fix.",
  realWorldExamples: [
    "Stripe uses extremely detailed structured logging with Trace IDs to investigate complex payment failures.",
    "Netflix uses massive real-time stream processing for their observability pipeline to handle millions of events per second."
  ],
  mermaidDiagram: `flowchart TD
    App(Application)
    
    App -->|OpenTelemetry| Collector(OTel Collector)
    Collector -->|Metrics| Prom(Prometheus)
    Collector -->|Traces| Jaeger(Jaeger)
    Collector -->|Logs| ES(Elasticsearch)
    
    Prom --> Grafana
    Jaeger --> Grafana
    ES --> Grafana
    
    Grafana(Grafana - Single Pane of Glass)`,
  flashcards: [
    { id: "obs-fc1", front: "Three Pillars of Observability", back: "Metrics, Logs, and Traces.", topic: "Observability", difficulty: "Beginner" },
    { id: "obs-fc2", front: "High Cardinality", back: "Having many unique tags on a metric (e.g., UserID), which can crash time-series databases.", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-fc3", front: "RED Metrics", back: "Rate, Errors, Duration (used for monitoring services).", topic: "Observability", difficulty: "Intermediate" },
    { id: "obs-fc4", front: "Structured Logging", back: "Logging in JSON or similar format to allow easy searching and filtering.", topic: "Observability", difficulty: "Beginner" },
    { id: "obs-fc5", front: "Unknown-unknowns", back: "Unpredictable failures. Observability provides the rich data needed to debug them.", topic: "Observability", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Observability Cheat Sheet",
    sections: [
      {
        heading: "The Three Pillars",
        items: [
          "Metrics: Cheap, aggregate, best for alerting.",
          "Traces: Request flow, best for bottlenecks.",
          "Logs: Expensive, discrete, best for deep debugging."
        ]
      },
      {
        heading: "Key Frameworks",
        items: [
          "USE Method: Utilization, Saturation, Errors (for hardware).",
          "RED Method: Rate, Errors, Duration (for services)."
        ]
      },
      {
        heading: "Best Practices",
        items: [
          "Always use structured logs (JSON).",
          "Inject Trace IDs into logs for correlation.",
          "Avoid high cardinality in metrics."
        ]
      }
    ]
  },
  speedNotes: [
    "Metrics alert, traces isolate, logs fix.",
    "Beware high cardinality metrics.",
    "OpenTelemetry prevents vendor lock-in.",
    "Structured logging is mandatory.",
    "Debug the unknown-unknowns."
  ]
};
