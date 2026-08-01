import type { ConceptRevisionContent } from "./types";

export const alerting: ConceptRevisionContent = {
  slug: "alerting",
  title: "Alerting",
  topic: "Observability",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Alerting", href: "/docs/observability/alerting" },
    { label: "Monitoring", href: "/docs/observability/monitoring" },
  ],
  summary: [
    "Alerting is the process of automatically notifying human operators when a system metric or condition falls outside of expected bounds.",
    "It bridges the gap between passive monitoring and active incident response.",
    "Effective alerting minimizes noise and alert fatigue by focusing on actionable, user-facing symptoms.",
    "Alerts are typically routed through systems like PagerDuty or Opsgenie to reach on-call engineers.",
    "Alert rules use thresholds, anomalies, or rate-of-change on collected telemetry (metrics, logs)."
  ],
  whyAsked: [
    "To test if you can design systems that can be operated reliably in production.",
    "To see if you understand the difference between causes (e.g., high CPU) and symptoms (e.g., failing requests).",
    "To assess your knowledge of SLIs, SLOs, and reducing alert fatigue."
  ],
  thirtySecondAnswer: "Alerting automatically notifies engineers when a system degrades. Instead of alerting on every minor issue, modern alerting focuses on Service Level Objectives (SLOs) and user-facing symptoms (like high error rates or latency). Good alerting requires tuning thresholds, applying dampening to avoid flakiness, and routing high-severity issues to on-call pages while sending low-severity issues to chat or email. The goal is actionable alerts without causing alert fatigue.",
  detailedAnswer: [
    "Symptoms vs. Causes: Alert on symptoms (what the user feels, e.g., HTTP 500s) rather than causes (e.g., CPU is at 80%). Causes are for debugging, symptoms are for waking people up.",
    "SLIs and SLOs: Service Level Indicators (metrics like error rate) and Objectives (targets like 99.9%) form the foundation of objective-based alerting.",
    "Alert Fatigue: If alerts trigger too often for non-actionable events, engineers start ignoring them. Alerts must be actionable and urgent.",
    "Thresholds and Windows: Alerts shouldn't trigger on a 1-second spike. They use rolling windows (e.g., 'error rate > 5% for 5 minutes') to smooth out noise.",
    "Routing and Escalation: Alerts are categorized by severity. Criticals trigger phone calls (PagerDuty). Warnings go to Slack/Email. Unacknowledged alerts escalate to managers."
  ],
  questions: [
    { id: "alrt-q1", question: "What is the purpose of alerting?", answer: "To notify operators when a system requires human intervention to maintain reliability.", topic: "Observability", difficulty: "Beginner" },
    { id: "alrt-q2", question: "What is an actionable alert?", answer: "An alert that requires a specific, immediate action by an engineer to resolve a real problem.", topic: "Observability", difficulty: "Beginner" },
    { id: "alrt-q3", question: "What is alert fatigue?", answer: "Desensitization caused by receiving too many frequent, non-actionable, or false-positive alerts, leading engineers to ignore them.", topic: "Observability", difficulty: "Beginner" },
    { id: "alrt-q4", question: "What is the difference between an alert and a metric?", answer: "A metric is a raw measurement (e.g., CPU usage). An alert is a rule evaluated against a metric to trigger a notification.", topic: "Observability", difficulty: "Beginner" },
    { id: "alrt-q5", question: "Should you alert on a database server hitting 90% CPU?", answer: "Generally, no, unless it causes a symptom (like increased latency). High CPU alone might just mean efficient resource usage.", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-q6", question: "What is symptom-based alerting?", answer: "Alerting on metrics that directly impact user experience (errors, latency) rather than internal component states (CPU, memory).", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-q7", question: "What is an SLI?", answer: "Service Level Indicator: a carefully defined quantitative measure of some aspect of the level of service (e.g., fraction of successful HTTP requests).", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-q8", question: "What is an SLO?", answer: "Service Level Objective: a target value or range of values for a service level that is measured by an SLI (e.g., 99.9% of requests successful).", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-q9", question: "How do you prevent a momentary network blip from triggering an alert?", answer: "By using evaluation windows (e.g., 'condition must hold for 5 minutes') or 'for' clauses in Prometheus.", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-q10", question: "What is alert routing?", answer: "The process of determining where an alert should go based on its severity and team ownership (e.g., PagerDuty for critical, Slack for info).", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-q11", question: "What is escalation in alerting?", answer: "If an on-call engineer doesn't acknowledge an alert within a timeframe, it automatically notifies a secondary engineer or manager.", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-q12", question: "What is a runbook?", answer: "A document linked to an alert that provides step-by-step instructions for an engineer to diagnose and mitigate the specific issue.", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-q13", question: "How does anomaly detection alerting differ from threshold alerting?", answer: "Threshold uses static bounds (e.g., > 80%). Anomaly detection uses machine learning to alert on deviations from historical baselines.", topic: "Observability", difficulty: "Advanced" },
    { id: "alrt-q14", question: "What is burn rate alerting?", answer: "Alerting based on how quickly a service is consuming its error budget. It's the most effective way to alert on SLOs.", topic: "Observability", difficulty: "Advanced" },
    { id: "alrt-q15", question: "Why is multi-window burn rate alerting used?", answer: "To catch both severe, sudden outages (short window) and slow, lingering degradation (long window) while minimizing false positives.", topic: "Observability", difficulty: "Advanced" },
    { id: "alrt-q16", question: "What is alert silencing/muting?", answer: "Temporarily suppressing notifications for a specific alert rule, often used during planned maintenance or a known ongoing incident.", topic: "Observability", difficulty: "Advanced" },
    { id: "alrt-q17", question: "What is alert grouping/deduplication?", answer: "Combining multiple related alerts into a single notification to prevent overwhelming the on-call engineer during a cascading failure.", topic: "Observability", difficulty: "Advanced" },
    { id: "alrt-q18", question: "How would you alert on a batch job that runs once a day?", answer: "Instead of alerting on error rate, use a 'dead man's switch' or alert if the job's last success timestamp is older than 25 hours.", topic: "Observability", difficulty: "Advanced" },
    { id: "alrt-q19", question: "What is flapping?", answer: "When a metric rapidly oscillates above and below a threshold, causing an alert to repeatedly fire and resolve.", topic: "Observability", difficulty: "Advanced" },
    { id: "alrt-q20", question: "How do you mitigate alert flapping?", answer: "Use hysteresis (different thresholds for firing vs. resolving) or require the condition to persist for a minimum duration.", topic: "Observability", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you design alerting for a system that scales up and down dynamically?",
    "Explain how you would set up SLO-based burn-rate alerting.",
    "What goes into a good runbook?"
  ],
  commonMistakes: [
    "Alerting on high CPU or memory without user impact.",
    "Setting static thresholds on cyclical traffic (e.g., alerting when traffic is low at night).",
    "Sending non-critical alerts to the on-call pager."
  ],
  interviewTraps: [
    "Suggesting you should just 'alert on everything'. This guarantees alert fatigue.",
    "Ignoring the human element: alerts exist to wake people up at 3 AM; they must be justified."
  ],
  tradeoffs: [
    "Sensitivity vs. Specificity: High sensitivity catches all issues but causes false positives (fatigue). High specificity is quiet but might miss real outages.",
    "Static Thresholds vs. Anomaly Detection: Static is easy to understand but brittle. Anomaly is adaptive but can be opaque and hard to tune."
  ],
  memoryTrick: "Alert on Symptoms (what users feel), not Causes (what servers feel).",
  realWorldExamples: [
    "Google's SRE book popularized SLO-based alerting to eliminate toil.",
    "PagerDuty uses intelligent alert grouping to bundle 50 database-related alerts into one incident."
  ],
  mermaidDiagram: `flowchart LR
    Metrics(Prometheus/Metrics) --> Evaluator{Alert Rules}
    Evaluator -- Trigger --> AlertManager
    AlertManager -- Group/Dedupe --> Routing
    Routing -- High Sev --> PagerDuty(PagerDuty / Phone)
    Routing -- Low Sev --> Slack(Slack / Email)`,
  flashcards: [
    { id: "alrt-fc1", front: "Alert Fatigue", back: "Desensitization from too many non-actionable alerts, leading to ignored pages.", topic: "Observability", difficulty: "Beginner" },
    { id: "alrt-fc2", front: "Symptom-based Alerting", back: "Alerting on user-facing impact (errors, latency) instead of internal causes (CPU usage).", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-fc3", front: "Burn Rate Alerting", back: "Alerting when a service is consuming its SLO error budget too quickly.", topic: "Observability", difficulty: "Advanced" },
    { id: "alrt-fc4", front: "Alert Grouping", back: "Combining related alerts into a single notification during cascading failures.", topic: "Observability", difficulty: "Intermediate" },
    { id: "alrt-fc5", front: "Runbook", back: "A step-by-step guide attached to an alert for diagnosing and resolving the issue.", topic: "Observability", difficulty: "Beginner" }
  ],
  cheatSheet: {
    title: "Alerting Best Practices",
    sections: [
      {
        heading: "What to Alert On",
        items: [
          "Symptoms, not causes (Errors, Latency, Traffic).",
          "SLO Burn Rates.",
          "Batch job failures or staleness."
        ]
      },
      {
        heading: "Alert Properties",
        items: [
          "Actionable: Requires human intervention.",
          "Urgent: Needs immediate attention (for pages).",
          "Clear: Has a runbook and context."
        ]
      },
      {
        heading: "Reducing Noise",
        items: [
          "Use 'for' durations to ignore brief spikes.",
          "Group related alerts together.",
          "Route warnings to chat, not the pager."
        ]
      }
    ]
  },
  speedNotes: [
    "Alert on user impact.",
    "Avoid alert fatigue.",
    "Use SLO burn rates.",
    "Group cascading failures.",
    "Always attach a runbook."
  ]
};
