import type { ConceptRevisionContent } from "./types";

export const availability: ConceptRevisionContent = {
  slug: "availability",
  title: "Availability",
  topic: "Fundamentals",
  difficulty: "Beginner",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Availability", href: "/docs/fundamentals/availability" },
    { label: "Reliability", href: "/docs/fundamentals/reliability" },
  ],

  summary: [
    "Availability is the percentage of time a system is operational and able to serve requests successfully, over some period — usually expressed in \"nines\" (99.9%, 99.99%, ...).",
    "Each additional nine is a roughly 10x reduction in allowed downtime, and gets progressively harder and more expensive to achieve.",
    "Availability is achieved primarily through redundancy — eliminating single points of failure so one component's failure doesn't take down the whole system.",
    "Availability and reliability are related but distinct: a system can be available (responding) while unreliable (returning wrong data) — see the dedicated Reliability concept.",
    "Availability is usually the metric written into an SLA, since it's straightforward to measure and monitor externally.",
    "Higher availability targets have steep, non-linear cost — going from 99.9% to 99.99% often costs more than going from 99% to 99.9%, because the easy redundancy wins are used up first.",
  ],

  whyAsked: [
    "It's a foundational vocabulary check — interviewers need to know a candidate can talk precisely about uptime before discussing redundancy strategies.",
    "The nines-to-downtime math is a common quick calculation interviewers use to check real understanding vs. memorized buzzwords.",
    "It sets up deeper questions about redundancy, failover, and disaster recovery.",
  ],

  thirtySecondAnswer:
    "Availability is the percentage of time a system is up and successfully serving requests, usually expressed in nines — 99.9%, 99.99%, and so on. Each additional nine is roughly a 10x reduction in allowed downtime per year, and gets progressively harder to achieve because the easy redundancy wins get used up first. Availability is mainly achieved by removing single points of failure through redundancy — multiple instances, multiple availability zones, automatic failover — so that one component failing doesn't take the whole system down. It's usually the number written into an SLA because it's straightforward to measure externally, even though it doesn't capture whether responses are actually correct — that's reliability's job.",

  detailedAnswer: [
    "Availability = uptime / total time, over a measurement period, typically expressed as a percentage of nines.",
    "99% ≈ 3.65 days of downtime/year; 99.9% ≈ 8.7 hours/year; 99.99% ≈ 52 minutes/year; 99.999% ≈ 5 minutes/year — memorizing this table is genuinely useful for interviews.",
    "The primary lever for availability is redundancy: no single component (server, availability zone, region) should be a single point of failure.",
    "Load balancers, multiple replicas, multi-AZ/multi-region deployment, and automatic failover are the standard toolkit for improving availability.",
    "Availability is necessary but not sufficient — a system can be 'up' while serving stale or wrong data, which is a reliability problem, not an availability one.",
  ],

  questions: [
    { id: "av-q1", question: "What is availability?", answer: "The percentage of time a system is operational and successfully serving requests over some period, usually expressed as a percentage of nines.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "av-q2", question: "How much downtime per year does 99.9% availability allow?", answer: "About 8.7 hours per year.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "av-q3", question: "How much downtime does 99.99% allow per year?", answer: "About 52 minutes per year.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-q4", question: "Why does each additional nine get progressively harder to achieve?", answer: "The easiest redundancy wins (removing the most obvious single points of failure) are used up first — each further nine requires addressing rarer, more subtle failure modes.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-q5", question: "What is the main technique for improving availability?", answer: "Redundancy — eliminating single points of failure through multiple instances, multiple availability zones/regions, and automatic failover.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "av-q6", question: "Can a system be available but not reliable?", answer: "Yes — an available system responds to requests, but those responses could still be wrong, stale, or corrupted; reliability is the stricter guarantee that responses are also correct.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-q7", question: "Why is availability usually the metric written into an SLA?", answer: "It's straightforward to measure externally (uptime monitoring) compared to reliability, which requires verifying correctness, not just responsiveness.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-q8", question: "What's a single point of failure, and why does it hurt availability?", answer: "Any component whose failure alone takes down the whole system; a single point of failure caps availability at that component's own uptime, regardless of how reliable everything else is.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "av-q9", question: "How does a load balancer improve availability?", answer: "It routes traffic only to healthy instances and can detect and route around a failed one, so a single instance failure doesn't cause an outage.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-q10", question: "Why might multi-region deployment be needed for very high availability targets?", answer: "A single region can still fail entirely (power, networking, natural disaster) — multi-region deployment removes the region itself as a single point of failure.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "av-q11", question: "What's the formula for availability given uptime and downtime?", answer: "Availability = uptime / (uptime + downtime), expressed as a percentage.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "av-q12", question: "If a system has two components in series, each 99.9% available, what's the combined availability?", answer: "Roughly 99.9% × 99.9% ≈ 99.8% — availability of components in series multiplies and is always lower than either individual component's availability.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "av-q13", question: "If a system has two redundant components in parallel, each 99% available, what's the combined availability?", answer: "Roughly 1 − (1−0.99)×(1−0.99) = 99.99% — redundant components in parallel multiply their downtimes, producing much higher combined availability than either alone.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "av-q14", question: "Why is planned maintenance downtime often excluded from an SLA's availability calculation?", answer: "Because it's scheduled and can be communicated in advance, providers often distinguish it from unplanned outages, though this convention varies and should be confirmed per contract.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "av-q15", question: "What's the relationship between availability and cost?", answer: "Cost rises steeply and non-linearly with each additional nine, since it requires progressively more redundancy, automation, and operational rigor.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-q16", question: "How would you measure a system's actual availability in production?", answer: "Track total measurement time vs. time the system was successfully serving requests (often via health checks or synthetic monitoring), then compute uptime / total time.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-q17", question: "Does high availability require strong consistency?", answer: "No — in fact they can be in tension (see CAP theorem); many highly available systems intentionally relax consistency to keep serving requests during a network partition.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "av-q18", question: "What's a common mistake when discussing availability targets in an interview?", answer: "Picking an arbitrarily high nines target (e.g. 99.999%) without justifying why the stated requirements need it, ignoring the steep cost curve.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "av-q19", question: "How does automatic failover contribute to availability?", answer: "It detects a failed component and redirects traffic to a healthy one without manual intervention, minimizing the downtime window compared to a manual response.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-q20", question: "Why is 'the system never goes down' not a realistic engineering goal?", answer: "Every component has some failure probability; the realistic goal is minimizing both the probability and blast radius of failure through redundancy, not eliminating failure entirely.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  commonFollowUps: [
    "\"How much downtime does that availability target actually allow, in hours per year?\"",
    "\"What's the single point of failure in this design right now?\"",
    "\"How would you improve this from 99.9% to 99.99%, and what would that cost?\"",
  ],

  commonMistakes: [
    "Not knowing the actual downtime-per-year for common nines figures.",
    "Conflating availability with reliability (treating 'responds' as the same as 'responds correctly').",
    "Proposing a very high availability target without justifying the cost/complexity trade-off.",
    "Forgetting that components in series multiply availability down, while redundant components in parallel multiply it up.",
  ],

  interviewTraps: [
    "Being asked to calculate combined availability of a multi-component system is a trap for people who've memorized nines figures without understanding the underlying math.",
    "\"Is 99.99% always better than 99.9%?\" is testing whether you'll blindly say yes without weighing the cost against the actual stated requirement.",
  ],

  tradeoffs: [
    "Higher availability targets cost disproportionately more as each nine is added.",
    "Redundancy that improves availability adds operational and architectural complexity (data replication, failover logic).",
    "Optimizing purely for availability can conflict with strong consistency guarantees during a network partition.",
  ],

  decisionGuide: undefined,

  memoryTrick:
    "\"9s and downtime\": 2 nines ≈ 3.65 days/yr, 3 nines ≈ 8.7 hrs/yr, 4 nines ≈ 52 min/yr, 5 nines ≈ 5 min/yr. Each nine roughly divides downtime by 10.",

  realWorldExamples: [
    "Cloud providers publish specific availability SLAs (e.g. 99.99% for a given service tier) with defined service credits if they're missed — a direct real-world application of the nines math.",
    "Multi-AZ database deployments exist specifically to remove a single availability zone as a single point of failure, trading some cost/complexity for a meaningfully higher availability ceiling.",
  ],

  mermaidDiagram: `flowchart LR
    Client --> LB[Load Balancer]
    LB --> I1[Instance A]
    LB --> I2[Instance B]
    LB --> I3[Instance C]
    I1 -.fails.-> LB
    LB -->|routes around failure| I2`,

  flashcards: [
    { id: "av-fc1", front: "Availability — one-line definition", back: "The percentage of time a system is operational and serving requests successfully.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "av-fc2", front: "99.9% availability = how much downtime/year?", back: "~8.7 hours/year.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-fc3", front: "99.99% availability = how much downtime/year?", back: "~52 minutes/year.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "av-fc4", front: "Main technique for improving availability", back: "Redundancy — removing single points of failure.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "av-fc5", front: "Available but not reliable — what does that mean?", back: "The system responds to requests, but responses may be wrong, stale, or corrupted.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Availability",
    sections: [
      { heading: "Nines table", items: ["99% ≈ 3.65 days/yr down", "99.9% ≈ 8.7 hrs/yr down", "99.99% ≈ 52 min/yr down", "99.999% ≈ 5 min/yr down"] },
      { heading: "How to improve it", items: ["Remove single points of failure", "Redundant instances / AZs / regions", "Load balancing + health checks", "Automatic failover"] },
      { heading: "Remember", items: ["Series components multiply availability down", "Parallel redundant components multiply availability up", "Available ≠ reliable"] },
    ],
  },

  speedNotes: [
    "Availability = % of time system serves requests successfully.",
    "99.9% ≈ 8.7 hrs/yr down. 99.99% ≈ 52 min/yr down.",
    "Improve via redundancy: remove single points of failure.",
    "Series components → availability multiplies down. Parallel redundancy → multiplies up.",
    "Available ≠ reliable — up isn't the same as correct.",
  ],
};
