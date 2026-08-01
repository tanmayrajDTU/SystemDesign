import type { ConceptRevisionContent } from "./types";

export const monitoring: ConceptRevisionContent = {
  slug: "monitoring",
  title: "Monitoring",
  topic: "Observability",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Monitoring", href: "/docs/observability/monitoring" },
    { label: "Alerting", href: "/docs/observability/alerting" },
    { label: "Metrics", href: "/docs/observability/metrics" }
  ],
  summary: [
    "Monitoring is the systematic process of collecting, analyzing, and using information to track application and infrastructure performance.",
    "It forms the foundation of system reliability by allowing engineers to detect issues before users do.",
    "A robust monitoring setup includes the 'Three Pillars of Observability': Metrics, Logs, and Traces.",
    "Monitoring is tightly coupled with Alerting; monitoring gathers the data, alerting notifies humans when the data violates rules.",
    "Effective monitoring focuses on user-centric symptoms (e.g., high latency) rather than just internal causes (e.g., high CPU)."
  ],
  whyAsked: [
    "To assess your operational maturity and how you maintain systems in production.",
    "To understand your approach to defining SLIs, SLOs, and SLAs.",
    "To see if you can design systems that are 'observable' by default."
  ],
  thirtySecondAnswer: "Monitoring is the process of observing a system's state over time using metrics, logs, and distributed traces. It provides visibility into system health, performance, and user experience. Good monitoring setups use dashboards to visualize trends and alerting rules to page engineers when Service Level Objectives (SLOs) are at risk. The goal is to detect, diagnose, and resolve incidents proactively.",
  detailedAnswer: [
    "Combines Metrics (aggregations), Logs (events), and Traces (request flows) to provide full visibility.",
    "Relies on defining Service Level Indicators (SLIs) to measure performance.",
    "Helps establish Service Level Objectives (SLOs) to define acceptable system behavior.",
    "Enables proactive incident management through automated alerting.",
    "Requires careful tuning to avoid 'alert fatigue' caused by noisy, non-actionable alarms."
  ],
  questions: [
    { id: "mnt-q1", question: "What is monitoring in system design?", answer: "The continuous process of gathering system data (metrics, logs, traces) to ensure health, performance, and reliability.", topic: "Observability", difficulty: "Beginner" },
    { id: "mnt-q2", question: "What are the three pillars of observability?", answer: "Metrics, Logs, and Distributed Traces.", topic: "Observability", difficulty: "Beginner" },
    { id: "mnt-q3", question: "What is the difference between monitoring and observability?", answer: "Monitoring tells you when something is broken. Observability is a property of the system that lets you ask arbitrary questions to find out why it broke.", topic: "Observability", difficulty: "Beginner" },
    { id: "mnt-q4", question: "What is Black-box monitoring?", answer: "Testing a system from the outside as a user would, without knowing internal states (e.g., pinging an external API endpoint).", topic: "Observability", difficulty: "Beginner" },
    { id: "mnt-q5", question: "What is White-box monitoring?", answer: "Monitoring based on internal system data exposed by the application, like database connection pool size or JVM heap metrics.", topic: "Observability", difficulty: "Beginner" },
    { id: "mnt-q6", question: "What is an SLI (Service Level Indicator)?", answer: "A carefully defined quantitative measure of some aspect of the level of service provided (e.g., HTTP 5xx error rate).", topic: "Observability", difficulty: "Intermediate" },
    { id: "mnt-q7", question: "What is an SLO (Service Level Objective)?", answer: "A target value for a service level, measured by an SLI (e.g., 99.9% of HTTP requests succeed).", topic: "Observability", difficulty: "Intermediate" },
    { id: "mnt-q8", question: "What is an SLA (Service Level Agreement)?", answer: "A business contract that dictates the consequences (often financial penalties) if an SLO is not met.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mnt-q9", question: "What is Alert Fatigue?", answer: "When engineers are exposed to too many false or non-actionable alerts, causing them to ignore actual critical warnings.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mnt-q10", question: "How do you prevent Alert Fatigue?", answer: "By alerting only on symptom-based SLI violations (user impact), tuning thresholds, and routing low-priority alerts to tickets instead of pagers.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mnt-q11", question: "What is Symptom-based vs. Cause-based alerting?", difficulty: "Intermediate", topic: "Observability", answer: "Symptom: 'Users are seeing 500 errors' (Good to page). Cause: 'CPU is at 90%' (Only page if it actually impacts users)." },
    { id: "mnt-q12", question: "What is Synthetic Monitoring?", difficulty: "Intermediate", topic: "Observability", answer: "Using automated scripts to simulate user paths (like logging in or checking out) to ensure critical workflows function correctly." },
    { id: "mnt-q13", question: "How does Distributed Tracing work?", difficulty: "Intermediate", topic: "Observability", answer: "It passes a unique Trace ID through HTTP headers across all microservices, linking all spans (work units) of a single user request." },
    { id: "mnt-q14", question: "What is a single pane of glass?", difficulty: "Advanced", topic: "Observability", answer: "A management dashboard that integrates logs, metrics, and traces into one unified UI to speed up incident resolution." },
    { id: "mnt-q15", question: "How do you monitor an asynchronous message queue system?", difficulty: "Advanced", topic: "Observability", answer: "Monitor queue depth (backlog), consumer lag (time to process), and dead-letter queue growth." },
    { id: "mnt-q16", question: "What is Error Budgeting?", difficulty: "Advanced", topic: "Observability", answer: "The allowed downtime for a service (e.g., 100% - 99.9% SLO = 0.1% error budget). If exhausted, feature launches are halted to focus on reliability." },
    { id: "mnt-q17", question: "How do you handle monitoring for ephemeral containers (like Kubernetes pods)?", difficulty: "Advanced", topic: "Observability", answer: "Use a dynamic Service Discovery mechanism (like Prometheus Kubernetes SD) so the monitoring system auto-detects pods as they spin up or die." },
    { id: "mnt-q18", question: "What are golden signals?", difficulty: "Advanced", topic: "Observability", answer: "Google SRE defines four: Latency, Traffic, Errors, and Saturation. These are the most critical metrics to monitor for any system." },
    { id: "mnt-q19", question: "How do you implement monitoring without adding excessive latency to the app?", difficulty: "Advanced", topic: "Observability", answer: "Use asynchronous, non-blocking agents (like StatsD for metrics, Fluentd for logs) or pull-based models (Prometheus) on separate threads." },
    { id: "mnt-q20", question: "What is the difference between active and passive monitoring?", difficulty: "Advanced", topic: "Observability", answer: "Active: Synthetic tests generating fake traffic to check health. Passive: Analyzing actual real user traffic (RUM) and server metrics." }
  ],
  commonFollowUps: [
    "What metrics would you monitor for a heavy read-heavy database?",
    "How do you design an alert that avoids false positives during short traffic spikes?",
    "Explain how you would roll out distributed tracing in a legacy monolith."
  ],
  commonMistakes: [
    "Alerting on internal causes (CPU) instead of user symptoms (Errors/Latency).",
    "Setting SLOs to 100% (it is physically impossible and economically disastrous).",
    "Treating monitoring as an afterthought instead of baking it into the application code."
  ],
  interviewTraps: [
    "Failing to differentiate between SLIs, SLOs, and SLAs.",
    "Proposing a massive monitoring setup for a simple startup system (over-engineering). Focus on the 'Golden Signals' first."
  ],
  tradeoffs: [
    "Data Retention vs. Storage Costs (how long to keep high-res metrics/logs).",
    "High Sensitivity Alerting (catch everything) vs. Alert Fatigue (burnout).",
    "Instrumentation Overhead (performance hit) vs. Observability Depth."
  ],
  memoryTrick: "Monitoring is the dashboard of your car. Observability is having the engine diagnostic tools to fix it.",
  realWorldExamples: [
    "Google SRE uses Error Budgets based on SLO monitoring. If the error budget is depleted, the team stops releasing new features and focuses purely on stability.",
    "Netflix uses synthetic monitoring to continuously simulate users playing videos globally to catch CDN failures."
  ],
  mermaidDiagram: `flowchart TD
    App[Application] -->|Exposes| Metrics[Metrics (Prometheus)]
    App -->|Writes| Logs[Logs (ELK)]
    App -->|Sends| Traces[Traces (Jaeger)]
    Metrics --> Dash[Dashboards / Alerts]
    Logs --> Dash
    Traces --> Dash
    Dash -->|Paging| OnCall[On-Call Engineer]`,
  flashcards: [
    { id: "mnt-fc1", front: "What are the 4 Golden Signals?", back: "Latency, Traffic, Errors, and Saturation.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mnt-fc2", front: "Define SLI vs SLO vs SLA.", back: "SLI: The metric (99%). SLO: The goal (99.9%). SLA: The business contract if SLO is breached.", topic: "Observability", difficulty: "Beginner" },
    { id: "mnt-fc3", front: "What is the purpose of Distributed Tracing?", back: "To track a single request's execution path and latency across multiple microservices.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mnt-fc4", front: "What is Alert Fatigue?", back: "When engineers ignore critical alerts because they are desensitized by too many false or non-actionable alarms.", topic: "Observability", difficulty: "Intermediate" },
    { id: "mnt-fc5", front: "What is Black-box vs White-box monitoring?", back: "Black-box tests from the outside (like a user). White-box uses internal system metrics (like CPU or thread count).", topic: "Observability", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Monitoring Strategies",
    sections: [
      {
        heading: "The Three Pillars",
        items: [
          "Metrics: Is there a problem? (Prometheus, Datadog).",
          "Traces: Where is the problem? (Jaeger, Zipkin).",
          "Logs: What exactly is the problem? (ELK, Splunk)."
        ]
      },
      {
        heading: "SRE Concepts",
        items: [
          "SLI: Service Level Indicator (e.g., Error rate).",
          "SLO: Service Level Objective (e.g., < 0.1% errors).",
          "Error Budget: 100% - SLO. Allowance for failure."
        ]
      },
      {
        heading: "Golden Signals",
        items: [
          "Latency: Time to serve a request.",
          "Traffic: Demand on the system (RPS).",
          "Errors: Rate of failed requests.",
          "Saturation: How 'full' the system is (CPU/Mem)."
        ]
      }
    ]
  },
  speedNotes: [
    "Metrics, Logs, and Traces.",
    "Alert on symptoms, not causes.",
    "Track Golden Signals (LTES).",
    "Define SLIs and target SLOs.",
    "Beware of alert fatigue."
  ]
};
