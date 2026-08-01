import type { ConceptRevisionContent } from "./types";

export const metrics: ConceptRevisionContent = {
  slug: "metrics",
  title: "Metrics",
  topic: "Observability",
  difficulty: "Beginner",
  estimatedMinutes: 10,
  docLinks: [
    { label: "Metrics", href: "/docs/observability/metrics" },
    { label: "Monitoring", href: "/docs/observability/monitoring" }
  ],
  summary: [
    "Metrics are numerical measurements representing system state at specific points in time.",
    "They are lightweight, highly compressible, and ideal for real-time monitoring and alerting.",
    "Unlike logs, metrics aggregate data (e.g., total requests, average latency) rather than recording every individual event.",
    "Time-Series Databases (TSDB) like Prometheus are specifically designed to store and query metrics efficiently.",
    "Metrics provide the high-level 'health check' that triggers alerts, while logs provide the details to debug the root cause."
  ],
  whyAsked: [
    "To evaluate how you measure system health and performance.",
    "To test your understanding of observability pillars (Logs, Metrics, Traces).",
    "To see if you know when to use metrics vs. logs for system visibility."
  ],
  thirtySecondAnswer: "Metrics are numerical values measured over time, capturing the health and performance of a system. Examples include CPU usage, memory consumption, request rates, and latency. Because they are aggregated numbers, metrics are highly efficient to store and process, making them perfect for powering dashboards and real-time alerting systems. They tell you *that* a problem is occurring, prompting you to look at logs and traces to find out *why*.",
  detailedAnswer: [
    "Metrics represent aggregated data points with timestamps, making them space-efficient.",
    "Common types include Counters (only go up), Gauges (go up and down), and Histograms/Summaries (distributions).",
    "Metrics are the foundation of proactive monitoring and alerting systems.",
    "They allow for historical trend analysis and capacity planning.",
    "Cardinality (the number of unique metric label combinations) must be managed to prevent database explosion."
  ],
  questions: [
    { id: "mtr-q1", question: "What are metrics?", answer: "Numerical representations of data measured over intervals of time, used to monitor system health.", topic: "Observability", difficulty: "Beginner" },
    { id: "mtr-q2", question: "What is the difference between metrics and logs?", answer: "Metrics are aggregated numbers (e.g., 100 requests/sec). Logs are detailed textual records of individual events.", topic: "Observability", difficulty: "Beginner" },
    { id: "mtr-q3", question: "Why are metrics better for alerting than logs?", answer: "Metrics are numeric and highly structured, making it extremely fast and cheap to evaluate thresholds (e.g., CPU > 90%).", topic: "Observability", difficulty: "Beginner" },
    { id: "mtr-q4", question: "What is a Counter metric?", answer: "A metric that only increases or resets to zero, typically used for tracking total requests or errors.", topic: "Observability", difficulty: "Beginner" },
    { id: "mtr-q5", question: "What is a Gauge metric?", answer: "A metric that can go up and down, representing a current state, like memory usage or active connections.", topic: "Observability", difficulty: "Beginner" },
    { id: "mtr-q6", question: "What is a Histogram metric?", answer: "A metric that samples observations (like request durations) and counts them in configurable buckets to calculate percentiles.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mtr-q7", question: "What is a Time-Series Database (TSDB)?", answer: "A database optimized for storing and querying data points indexed by time, such as Prometheus or InfluxDB.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mtr-q8", question: "What is Prometheus?", answer: "A popular open-source systems monitoring and alerting toolkit that pulls (scrapes) metrics from services via HTTP.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mtr-q9", question: "What is 'push' vs. 'pull' metrics collection?", answer: "Push: services send metrics to a central server (e.g., StatsD). Pull: a central server periodically requests metrics from services (e.g., Prometheus).", topic: "Observability", difficulty: "Intermediate" },
    { id: "mtr-q10", question: "What are the RED metrics?", answer: "Rate (requests per second), Errors (failed requests), and Duration (latency) — key metrics for microservices.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mtr-q11", question: "What are the USE metrics?", difficulty: "Intermediate", topic: "Observability", answer: "Utilization, Saturation, and Errors — a methodology for analyzing system resources (like CPU, disk)." },
    { id: "mtr-q12", question: "What is metric cardinality?", difficulty: "Intermediate", topic: "Observability", answer: "The number of unique time-series generated by a metric's labels. High cardinality (e.g., labeling by User ID) can crash a TSDB." },
    { id: "mtr-q13", question: "Why shouldn't you use User ID as a metric label?", difficulty: "Intermediate", topic: "Observability", answer: "Because millions of users will create millions of unique time-series (high cardinality), overwhelming the metrics database. Use logs or tracing instead." },
    { id: "mtr-q14", question: "What is the 99th percentile (p99) latency?", difficulty: "Advanced", topic: "Observability", answer: "The maximum latency experienced by 99% of requests. Only 1% of requests are slower than this value. It's a better metric for user experience than average latency." },
    { id: "mtr-q15", question: "Why is average latency often a misleading metric?", difficulty: "Advanced", topic: "Observability", answer: "Averages hide outliers. A system might have a great average, but 5% of users might experience extreme timeouts. Percentiles (p95, p99) reveal the true long-tail experience." },
    { id: "mtr-q16", question: "How do you downsample metrics?", difficulty: "Advanced", topic: "Observability", answer: "Aggregating older, high-resolution data (e.g., 1-second intervals) into lower-resolution data (e.g., 1-hour averages) to save disk space over time." },
    { id: "mtr-q17", question: "What is StatsD?", difficulty: "Advanced", topic: "Observability", answer: "A simple daemon for pushing metrics via UDP, aggregating them locally, and forwarding them to a backend like Graphite or Datadog." },
    { id: "mtr-q18", question: "Explain the Prometheus Pull model advantages.", difficulty: "Advanced", topic: "Observability", answer: "It makes it easy to detect when a target is down (scrape fails), prevents the monitoring system from being overwhelmed by pushes, and simplifies local testing." },
    { id: "mtr-q19", question: "How does OpenTelemetry relate to metrics?", difficulty: "Advanced", topic: "Observability", answer: "It provides a vendor-neutral standard and SDK for instrumenting, generating, and exporting metrics, logs, and traces." },
    { id: "mtr-q20", question: "What happens if the metrics server goes down?", difficulty: "Advanced", topic: "Observability", answer: "You lose visibility. To mitigate, use highly available clustered TSDBs (like Thanos or Cortex for Prometheus) and buffer metrics locally on the node." }
  ],
  commonFollowUps: [
    "How do you handle high cardinality data?",
    "Why prefer p99 over average latency?",
    "Should you alert on every metric spike?"
  ],
  commonMistakes: [
    "Putting unbounded variables (like user IDs, raw URLs) into metric labels/tags.",
    "Alerting on averages instead of percentiles.",
    "Treating metrics as a replacement for detailed logs."
  ],
  interviewTraps: [
    "Suggesting storing metric data in a standard relational DB (MySQL) at scale, instead of a TSDB.",
    "Ignoring the network overhead of pushing high-frequency metrics."
  ],
  tradeoffs: [
    "High Resolution (granularity) vs. Storage Cost/Downsampling.",
    "Push Model (fire and forget, easy for ephemeral jobs) vs. Pull Model (better central control, easy target health checking)."
  ],
  memoryTrick: "Metrics tell you *THAT* something is broken (Dashboard turns red). Logs tell you *WHY* it is broken.",
  realWorldExamples: [
    "A Grafana dashboard showing a p99 latency spike (Metric) triggers a PagerDuty alert. The on-call engineer then checks Splunk (Logs) to find the specific database query timing out.",
    "Using Prometheus to scrape a `/metrics` endpoint on thousands of Kubernetes pods every 15 seconds."
  ],
  mermaidDiagram: `flowchart LR
    App1[Microservice A] -->|Expose /metrics| Prom[Prometheus\\n(Pull Model TSDB)]
    App2[Microservice B] -->|Expose /metrics| Prom
    Prom -->|Evaluate Rules| Alert[Alertmanager]
    Alert -->|Trigger| PD[PagerDuty]
    Prom -->|Query| Grafana[Grafana Dashboards]`,
  flashcards: [
    { id: "mtr-fc1", front: "What is the difference between a Counter and a Gauge?", back: "Counters only increase (e.g., total requests). Gauges can increase and decrease (e.g., active connections).", topic: "Observability", difficulty: "Beginner" },
    { id: "mtr-fc2", front: "Why are metrics better than logs for dashboards?", back: "Metrics are highly compressed numbers, making them much faster to query and visualize at scale than parsing text logs.", topic: "Observability", difficulty: "Beginner" },
    { id: "mtr-fc3", front: "What are RED metrics?", back: "Rate, Errors, Duration. Key metrics to track for HTTP services.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mtr-fc4", front: "What is Cardinality in metrics?", back: "The number of unique combinations of metric labels. High cardinality (like user_id labels) can crash Time-Series Databases.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mtr-fc5", front: "Why use Percentiles (p95, p99) instead of Averages?", back: "Averages hide extreme outliers. Percentiles show the true experience of the slowest requests.", topic: "Observability", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Metrics Fundamentals",
    sections: [
      {
        heading: "Metric Types",
        items: [
          "Counter: Cumulative count (requests, errors).",
          "Gauge: Current value (CPU usage, queue size).",
          "Histogram: Statistical distribution (latency percentiles)."
        ]
      },
      {
        heading: "Key Frameworks",
        items: [
          "RED (Services): Rate, Errors, Duration.",
          "USE (Resources): Utilization, Saturation, Errors."
        ]
      },
      {
        heading: "Best Practices",
        items: [
          "Avoid High Cardinality tags.",
          "Alert on percentiles, not averages.",
          "Use a specialized TSDB (Prometheus, InfluxDB)."
        ]
      }
    ]
  },
  speedNotes: [
    "Numerical, aggregated time-series data.",
    "Fast, cheap, perfect for alerts.",
    "Beware of high cardinality tags.",
    "Track RED (Rate, Errors, Duration).",
    "Use p99 over averages."
  ]
};
