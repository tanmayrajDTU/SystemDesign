import type { ConceptRevisionContent } from "./types";

export const disasterRecovery: ConceptRevisionContent = {
  slug: "disaster-recovery",
  title: "Disaster Recovery",
  topic: "Fundamentals",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Fault Tolerance", href: "/docs/fundamentals/fault-tolerance" },
    { label: "Availability", href: "/docs/fundamentals/availability" },
    { label: "Reliability", href: "/docs/fundamentals/reliability" },
  ],

  summary: [
    "Disaster recovery (DR) is the plan and infrastructure for restoring a system after a catastrophic event — a full region loss, a major data corruption incident, a ransomware attack — that routine high-availability mechanisms may not fully absorb on their own.",
    "DR is defined by two target numbers: RTO (Recovery Time Objective — how long until service is restored) and RPO (Recovery Point Objective — how much data loss, measured in time, is acceptable).",
    "DR is distinct from high availability: HA handles routine, often automatic recovery from component failures; DR handles rarer, larger-scale events, and recovery may be manual, slower, and deliberately planned rather than instant.",
    "Common DR strategies, from cheapest/slowest to most expensive/fastest: backup & restore, pilot light, warm standby, and multi-site active-active.",
    "A DR plan that's never been tested is not a real DR plan — untested backups and untested failover procedures routinely fail exactly when they're needed.",
    "DR strategy should match the actual business cost of downtime and data loss for that specific system — not every system needs the most expensive, fastest-recovery strategy.",
  ],

  whyAsked: [
    "It tests whether a candidate thinks beyond routine component failures to genuinely catastrophic, larger-scale scenarios.",
    "RTO/RPO are concrete, quantifiable targets — asking about them checks for real planning maturity versus a vague \"we'd restore from backup\" answer.",
    "It's a natural way to probe cost-vs-risk judgment, since DR strategies range enormously in cost and recovery speed.",
  ],

  thirtySecondAnswer:
    "Disaster recovery is the plan for restoring a system after a catastrophic event — a full region loss, major data corruption, a ransomware attack — that routine failover might not handle on its own. It's defined by two numbers: RTO, how long until service is restored, and RPO, how much data loss in time is acceptable. Strategies range from cheapest and slowest — backup and restore — through pilot light and warm standby, up to the most expensive and fastest — multi-site active-active, which can offer near-zero RTO and RPO. Disaster recovery is distinct from high availability: HA is about routine, usually automatic recovery from a component failing; DR is about a rarer, much larger event, and choosing the right strategy means matching cost to the actual business impact of downtime and data loss for that specific system, then actually testing the plan, since an untested DR plan routinely fails exactly when it's needed.",

  detailedAnswer: [
    "DR = the plan and infrastructure for restoring service after a catastrophic event beyond what routine HA/fault-tolerance mechanisms absorb automatically.",
    "RTO (Recovery Time Objective): the maximum acceptable time to restore service after a disaster.",
    "RPO (Recovery Point Objective): the maximum acceptable amount of data loss, measured as a time window (e.g. \"up to 15 minutes of data may be lost\").",
    "Strategy spectrum: backup & restore (cheap, slow — hours/days RTO), pilot light (minimal standby infra, faster to scale up), warm standby (a smaller running replica, quick to promote), multi-site active-active (near-zero RTO/RPO, most expensive).",
    "A DR plan needs actual, periodic testing (failover drills, restore verification) — an unverified backup or an unrehearsed failover procedure is a common real-world cause of DR failing when genuinely needed.",
  ],

  questions: [
    { id: "dr-q1", question: "What is disaster recovery?", answer: "The plan and infrastructure for restoring a system's service after a catastrophic event — like a full region loss or major data corruption — beyond what routine failure-handling covers.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "dr-q2", question: "What is RTO?", answer: "Recovery Time Objective — the maximum acceptable time to restore service after a disaster.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "dr-q3", question: "What is RPO?", answer: "Recovery Point Objective — the maximum acceptable amount of data loss, expressed as a time window (e.g. up to 15 minutes of recent writes might be lost).", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "dr-q4", question: "How is disaster recovery different from high availability?", answer: "HA handles routine component failures, usually automatically and near-instantly; DR handles rarer, larger-scale catastrophic events, and recovery may be slower and more deliberately planned rather than instant.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "dr-q5", question: "What are the main DR strategies, from cheapest/slowest to most expensive/fastest?", answer: "Backup & restore, pilot light, warm standby, and multi-site active-active.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "dr-q6", question: "What is the 'backup and restore' DR strategy?", answer: "Periodically backing up data, with no standing infrastructure ready to take over — recovery means provisioning new infrastructure and restoring from backup, which is cheap but has the slowest RTO (often hours to days).", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "dr-q7", question: "What is the 'pilot light' DR strategy?", answer: "A minimal, always-on skeleton of critical infrastructure (e.g. a database kept in sync but no running application servers) that can be scaled up quickly during a disaster, faster than starting from nothing.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q8", question: "What is the 'warm standby' DR strategy?", answer: "A smaller-scale but fully running replica of the production environment, ready to be scaled up and promoted quickly — faster RTO than pilot light, at higher ongoing cost.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q9", question: "What is 'multi-site active-active' as a DR strategy?", answer: "Multiple fully running production sites simultaneously serving traffic — a disaster at one site means the others continue immediately, giving near-zero RTO and RPO at the highest cost.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q10", question: "Why is an untested DR plan considered not a real plan?", answer: "Backups can silently fail to restore correctly, and failover procedures can have unrehearsed gaps — these problems are routinely only discovered during an actual disaster unless the plan is periodically tested end-to-end.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "dr-q11", question: "How should a team decide which DR strategy is appropriate for their system?", answer: "Match the strategy's cost to the actual business impact of downtime and data loss for that specific system — a strategy offering near-zero RTO/RPO is wasted expense for a system where hours of downtime would be a minor issue.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q12", question: "What's an example of a disaster that HA alone wouldn't handle?", answer: "An entire cloud region becoming unavailable, or a widespread data corruption bug that's already been replicated to every HA replica before being detected — HA protects against independent component failure, not against a correlated, catastrophic event or replicated corruption.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q13", question: "Why can replication alone be insufficient as a disaster recovery mechanism?", answer: "If corrupted or malicious data is replicated in real time to all replicas (as with ransomware or a bad deployment), replication propagates the damage everywhere just as fast as it propagates good data — DR usually also requires point-in-time backups, not just live replicas.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q14", question: "What does a DR runbook typically include?", answer: "Step-by-step recovery procedures, contact/escalation information, the specific RTO/RPO targets being worked toward, and verification steps to confirm recovery actually succeeded.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "dr-q15", question: "How often should DR failover be tested?", answer: "Regularly and on a defined schedule (varies by organization, but often at least annually for less critical systems, more frequently for critical ones) — not just written down and left unverified.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "dr-q16", question: "What's the relationship between RPO and backup frequency?", answer: "RPO directly determines how frequently backups (or replication checkpoints) need to occur — a 15-minute RPO requires backups/checkpoints at least every 15 minutes, not once a day.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "dr-q17", question: "Why might a company choose different DR strategies for different systems?", answer: "The business cost of downtime and data loss varies by system — a core transactional system might justify multi-site active-active, while an internal reporting tool might be fine with simple backup & restore.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q18", question: "What's a common mistake when discussing disaster recovery in an interview?", answer: "Treating DR as identical to HA/failover, or proposing an expensive strategy (multi-site active-active) without justifying it against the actual stated RTO/RPO requirements.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q19", question: "How does disaster recovery planning intersect with security incidents like ransomware?", answer: "DR planning needs to account for backups themselves being compromised or encrypted — practices like immutable, offline, or air-gapped backups exist specifically to ensure a clean recovery point survives even an active security incident.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "dr-q20", question: "Summarize disaster recovery in one sentence.", answer: "The planned strategy and infrastructure for restoring a system after a catastrophic event, defined by RTO (how fast) and RPO (how much data loss is acceptable), matched to the actual business cost of downtime.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What's the RTO and RPO for this system, and why those specific numbers?\"",
    "\"How would you actually test this DR plan without causing a real outage?\"",
    "\"What disaster would this design NOT survive?\"",
  ],

  commonMistakes: [
    "Conflating disaster recovery with routine high availability/failover.",
    "Proposing an expensive DR strategy without justifying it against actual RTO/RPO requirements.",
    "Assuming live replication alone is sufficient DR, without accounting for corrupted/malicious data being replicated too.",
    "Never actually testing backups or failover procedures.",
  ],

  interviewTraps: [
    "\"Isn't this the same as what we just discussed for high availability?\" is a trap distinguishing routine automated recovery (HA) from planned recovery from a genuinely catastrophic, larger event (DR).",
    "Being asked \"what if the disaster corrupted your replicated data before you noticed\" tests whether you understand replication alone isn't a complete DR strategy.",
  ],

  tradeoffs: [
    "Backup & restore: cheapest, but slowest RTO/RPO.",
    "Multi-site active-active: fastest RTO/RPO, but highest ongoing cost and complexity.",
    "More frequent backups improve RPO but increase storage cost and backup-system load.",
  ],

  comparisonTable: {
    title: "DR Strategies",
    columns: ["Cost", "Typical RTO", "Typical RPO"],
    rows: [
      { label: "Backup & Restore", values: ["Lowest", "Hours to days", "Hours (since last backup)"] },
      { label: "Pilot Light", values: ["Low-medium", "Tens of minutes to hours", "Minutes to an hour"] },
      { label: "Warm Standby", values: ["Medium-high", "Minutes", "Seconds to minutes"] },
      { label: "Multi-site Active-Active", values: ["Highest", "Near-zero", "Near-zero"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "dr-root",
    question: "What's the acceptable downtime (RTO) if this system's primary site is lost?",
    options: [
      {
        label: "Hours to a day is fine",
        next: {
          kind: "result",
          id: "dr-backup",
          result: "Backup & restore (or pilot light for slightly faster recovery).",
          rationale: "For systems where a day of downtime is tolerable, the cost savings of not running standby infrastructure are worth taking.",
        },
      },
      {
        label: "Minutes, not hours",
        next: {
          kind: "result",
          id: "dr-warm",
          result: "Warm standby — a smaller running replica ready to scale up and take over.",
          rationale: "Minute-scale recovery requires infrastructure already running, not provisioned from scratch during the disaster.",
        },
      },
      {
        label: "Near-zero — this is a critical, always-on system",
        next: {
          kind: "result",
          id: "dr-active",
          result: "Multi-site active-active — justify the cost against the severe business impact of any downtime.",
          rationale: "Near-zero RTO/RPO requires multiple fully running sites simultaneously serving traffic — the most expensive option, reserved for genuinely critical systems.",
        },
      },
    ],
  },

  memoryTrick:
    "\"RTO = Time, RPO = Data.\" RTO answers 'how long until we're back up' (Time); RPO answers 'how much can we afford to lose' (data, measured in time since last good checkpoint).",

  realWorldExamples: [
    "Financial institutions often maintain fully active, geographically separate data centers (multi-site active-active) specifically because even minutes of downtime or any data loss carries severe regulatory and financial cost.",
    "Ransomware incidents have repeatedly shown organizations that live-replicated backups alone aren't sufficient DR, since the ransomware encrypted data was faithfully replicated everywhere too — driving wider adoption of immutable, offline backup copies as part of DR planning.",
  ],

  mermaidDiagram: `flowchart LR
    Backup["Backup & Restore\n(cheap, slow)"] --> Pilot["Pilot Light"]
    Pilot --> Warm["Warm Standby"]
    Warm --> Active["Multi-site Active-Active\n(expensive, fast)"]
    Backup -.RTO/RPO.-> Days["Hours-Days"]
    Active -.RTO/RPO.-> Zero["Near-zero"]`,

  flashcards: [
    { id: "dr-fc1", front: "Disaster recovery — one-line definition", back: "The plan and infrastructure for restoring service after a catastrophic event.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "dr-fc2", front: "RTO", back: "Recovery Time Objective — max acceptable time to restore service.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "dr-fc3", front: "RPO", back: "Recovery Point Objective — max acceptable data loss, measured in time.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "dr-fc4", front: "Four DR strategies, cheapest to most expensive", back: "Backup & restore → pilot light → warm standby → multi-site active-active.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "dr-fc5", front: "Why is replication alone not sufficient DR?", back: "Corrupted/malicious data gets replicated just as fast as good data — DR usually also needs point-in-time backups.", topic: "Fundamentals", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Disaster Recovery",
    sections: [
      { heading: "Key metrics", items: ["RTO = how long until restored", "RPO = how much data loss acceptable"] },
      { heading: "Strategies (cheap→expensive)", items: ["Backup & restore", "Pilot light", "Warm standby", "Multi-site active-active"] },
      { heading: "Remember", items: ["DR ≠ HA (bigger, rarer events)", "Test the plan regularly", "Replication alone isn't DR (corruption replicates too)"] },
    ],
  },

  speedNotes: [
    "DR = plan for restoring after a catastrophic event.",
    "RTO = time to restore. RPO = acceptable data loss (in time).",
    "Strategies: backup&restore → pilot light → warm standby → multi-site active-active.",
    "DR ≠ HA — HA is routine/automatic; DR is rare/catastrophic.",
    "Untested DR plan = not a real plan. Replication alone ≠ DR.",
  ],
};
