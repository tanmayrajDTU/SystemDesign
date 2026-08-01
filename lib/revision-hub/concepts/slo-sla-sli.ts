import type { ConceptRevisionContent } from "./types";

export const sloSlaSli: ConceptRevisionContent = {
  slug: "slo-sla-sli",
  title: "SLO, SLA, SLI",
  topic: "Fundamentals",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Availability", href: "/docs/fundamentals/availability" },
    { label: "Reliability", href: "/docs/fundamentals/reliability" },
  ],

  summary: [
    "SLI (Service Level Indicator) is the actual measured metric — e.g. \"99.95% of requests succeeded\" or \"p99 latency was 180ms.\"",
    "SLO (Service Level Objective) is the internal target for that metric — e.g. \"p99 latency should be under 200ms\" — a goal a team holds itself to.",
    "SLA (Service Level Agreement) is the external, often contractual promise made to customers — usually a looser version of the SLO, with defined consequences (service credits, penalties) if missed.",
    "The relationship: SLI measures it, SLO targets it internally, SLA promises it externally — and the SLO should always be stricter than the SLA, so an internal miss can be caught and fixed before it becomes an external, contractual breach.",
    "An error budget is the practical tool built on an SLO: 100% minus the SLO target is the allowed 'budget' of failure, which teams can deliberately spend on releasing new features/risk, rather than treating every SLO miss as an emergency.",
    "Choosing SLOs poorly (too strict, too loose, or measuring the wrong SLI entirely) undermines the whole framework — the SLI needs to genuinely reflect user experience, not just be easy to measure.",
  ],

  whyAsked: [
    "It's a fast vocabulary and precision check — these three terms are frequently used interchangeably in casual conversation, and an interviewer wants to see the distinction is actually understood.",
    "It reveals whether a candidate can connect a monitoring metric (SLI) to an internal goal (SLO) to an external promise (SLA) as a coherent system, not three unrelated buzzwords.",
    "Error budgets are a natural, deeper follow-up that tests whether the candidate understands SLOs as an actionable engineering tool, not just a compliance number.",
  ],

  thirtySecondAnswer:
    "SLI, SLO, and SLA describe three related but distinct things. The SLI is the actual measured metric — say, 99.95% of requests succeeded, or p99 latency was 180ms. The SLO is the internal target for that metric — p99 latency should be under 200ms — a goal the team holds itself to. The SLA is the external, often contractual promise made to customers, usually a looser version of the SLO, with defined consequences like service credits if it's missed. The SLO should always be stricter than the SLA, so an internal miss gets caught and fixed before it ever becomes an external, contractual breach. A practical tool built on top of this is the error budget — 100% minus the SLO target is the allowed budget of acceptable failure, which a team can deliberately spend on shipping riskier changes rather than treating every single SLO miss as a crisis.",

  detailedAnswer: [
    "SLI (indicator) = the measured value of a metric that reflects service health from the user's perspective (e.g. success rate, latency percentile).",
    "SLO (objective) = the internal target for an SLI (e.g. \"99.9% of requests succeed over 30 days\") — a goal, not a contract.",
    "SLA (agreement) = the external, contractual promise to customers, typically looser than the SLO, with defined penalties/credits for a miss.",
    "The stacking relationship: SLI measures reality, SLO sets an internal bar above the external promise, SLA is the actual external commitment — giving the team room to notice and fix a slipping SLO before it becomes a breached SLA.",
    "An error budget operationalizes the SLO: if the SLO is 99.9%, the error budget is the remaining 0.1% of allowed failure — teams can spend that budget on deploying riskier changes, and should slow down/freeze releases if the budget is exhausted.",
  ],

  questions: [
    { id: "sla-q1", question: "What is an SLI?", answer: "Service Level Indicator — the actual measured value of a metric reflecting service health, e.g. 'p99 latency was 180ms' or '99.95% of requests succeeded.'", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sla-q2", question: "What is an SLO?", answer: "Service Level Objective — the internal target for an SLI, e.g. 'p99 latency should be under 200ms' — a goal a team holds itself to.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sla-q3", question: "What is an SLA?", answer: "Service Level Agreement — the external, often contractual promise made to customers, usually looser than the SLO, with defined consequences (like service credits) if missed.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sla-q4", question: "Why should an SLO always be stricter than the corresponding SLA?", answer: "So an internal target miss is caught and can be fixed before it becomes an external, contractual breach — the SLO acts as an early-warning buffer above the SLA.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sla-q5", question: "What is an error budget?", answer: "100% minus the SLO target, representing the allowed amount of failure a team can 'spend' — e.g. a 99.9% SLO gives a 0.1% error budget.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sla-q6", question: "How is an error budget used in practice?", answer: "Teams can deliberately spend it on shipping riskier changes or new features; if the budget is exhausted, the team typically slows down or freezes releases to focus on stability instead.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sla-q7", question: "Give an example of a good SLI for a web service.", answer: "The percentage of HTTP requests returning a successful status code within a target latency, measured over a rolling window — reflects actual user-facing experience.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sla-q8", question: "Why does the choice of SLI matter as much as the SLO target itself?", answer: "An SLO built on a poorly chosen SLI (one that doesn't genuinely reflect user experience) can be perfectly met while users still have a bad experience — the metric has to actually matter.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sla-q9", question: "What typically happens when an SLA is breached?", answer: "Defined contractual consequences apply — commonly service credits, refunds, or other compensation specified in the agreement with the customer.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sla-q10", question: "Can a team miss its SLO without breaching its SLA?", answer: "Yes — that's the intended design: the SLO is stricter than the SLA, so missing the internal SLO target is a warning signal to fix things, not automatically a contractual failure.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sla-q11", question: "Why might an SLO be set too strict, and what's the cost of that?", answer: "An overly strict SLO (e.g. 99.999% when 99.9% would satisfy real user and business needs) forces excessive engineering investment and can freeze feature velocity via error-budget exhaustion, for a guarantee beyond what's actually needed.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sla-q12", question: "Why might an SLO be set too loose, and what's the cost of that?", answer: "It fails to catch real degradation early — problems only surface once they're bad enough to risk breaching the (looser) external SLA, losing the whole point of having an internal buffer.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sla-q13", question: "How does an error budget change the conversation between engineering and product teams?", answer: "It reframes reliability as a quantified, spendable resource rather than an abstract goal — both teams can explicitly discuss trading some error budget for faster feature velocity, rather than treating 'be reliable' as unlimited and free.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sla-q14", question: "What's a common mistake when defining an SLI?", answer: "Measuring something easy to instrument (like server CPU usage) instead of something that actually reflects user experience (like request success rate or latency).", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sla-q15", question: "How do SLIs, SLOs, and SLAs relate to the general concept of availability?", answer: "Availability is often the underlying metric being measured (the SLI), targeted (the SLO), and promised (the SLA) — the three terms give structure to how an availability number is actually measured, targeted, and contractually committed to.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sla-q16", question: "Why might different SLOs exist for different parts of the same system?", answer: "Different components have different criticality — a checkout flow might have a stricter SLO than a recommendations widget, matching the actual cost of each component underperforming.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sla-q17", question: "What role does an SLO play in incident response prioritization?", answer: "An SLO breach (or fast-depleting error budget) gives an objective, pre-agreed trigger for treating something as an incident, rather than relying on ad hoc judgment calls about severity.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sla-q18", question: "What's a common mistake teams make with SLAs specifically?", answer: "Setting an SLA without first validating that the SLO (and underlying system) can reliably meet it — promising externally something that hasn't been demonstrated internally.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sla-q19", question: "How often should SLOs be reviewed and potentially adjusted?", answer: "Periodically, as the system, its usage patterns, and business priorities evolve — an SLO set years ago for a different scale or use case may no longer reflect what actually matters.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sla-q20", question: "Summarize the SLI/SLO/SLA relationship in one sentence.", answer: "The SLI measures reality, the SLO is the internal target for that measurement, and the SLA is the external, often contractual promise — usually looser than the SLO, so an internal miss is caught before it becomes a breach.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What SLI would you actually choose here, and why that one over something easier to measure?\"",
    "\"What happens when the error budget runs out?\"",
    "\"How much buffer would you put between the SLO and the SLA, and why?\"",
  ],

  commonMistakes: [
    "Using SLI, SLO, and SLA interchangeably as if they were the same thing.",
    "Setting the SLO equal to (rather than stricter than) the SLA, removing the internal early-warning buffer.",
    "Choosing an SLI that's easy to measure but doesn't reflect actual user experience.",
    "Treating an SLO miss and an SLA breach as equally severe, when they're meant to be different severity levels.",
  ],

  interviewTraps: [
    "\"Aren't SLO and SLA the same thing, just different names?\" is a trap for candidates who haven't internalized that the SLA is the external contractual promise and the SLO is the internal, stricter target.",
    "Being asked \"what's your SLI for this system\" before ever being asked about SLO or SLA is testing whether you understand SLI is the foundational measurement everything else builds on.",
  ],

  tradeoffs: [
    "Stricter SLOs give more warning buffer before an SLA breach, but consume engineering effort and error budget faster.",
    "Looser SLOs preserve feature velocity (more error budget to spend) but reduce the early-warning margin before a real contractual breach.",
    "More SLIs/dimensions tracked gives finer-grained visibility but adds monitoring and reporting overhead.",
  ],

  comparisonTable: {
    title: "SLI vs SLO vs SLA",
    columns: ["SLI", "SLO", "SLA"],
    rows: [
      { label: "What it is", values: ["The measured metric", "The internal target", "The external promise"] },
      { label: "Audience", values: ["Engineering (monitoring)", "Engineering (internal goal)", "Customers (contract)"] },
      { label: "Strictness", values: ["N/A — it's just the data", "Stricter", "Looser"] },
      { label: "Consequence of miss", values: ["None directly — it's a measurement", "Internal review/action, error budget spend", "Contractual penalty (credits, refunds)"] },
      { label: "Example", values: ["\"99.95% success rate\"", "\"Target: 99.9% success\"", "\"Guarantee: 99.5% success or credit\""] },
    ],
  },

  decisionGuide: undefined,

  memoryTrick:
    "\"I-O-A: Indicator, Objective, Agreement.\" SLI = what you measure. SLO = what you aim for internally. SLA = what you promise externally — and SLA should always be the loosest of the three.",

  realWorldExamples: [
    "Cloud providers publish SLAs (e.g. 99.99% for a specific managed service tier) with defined service credits for a breach, while internally targeting a stricter SLO to give their own teams room to catch and fix degradation first.",
    "Google popularized the error-budget approach (via Site Reliability Engineering practice) specifically to give product and engineering teams a shared, quantified way to decide how much release risk is acceptable at any given time.",
  ],

  mermaidDiagram: `flowchart LR
    SLI["SLI: measured value\ne.g. 99.95% success"] --> SLO["SLO: internal target\ne.g. 99.9%"]
    SLO --> SLA["SLA: external promise\ne.g. 99.5% (looser)"]
    SLO -.error budget.-> Budget["0.1% = spendable\non risk/releases"]`,

  flashcards: [
    { id: "sla-fc1", front: "SLI", back: "Service Level Indicator — the actual measured metric.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sla-fc2", front: "SLO", back: "Service Level Objective — the internal target for an SLI.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sla-fc3", front: "SLA", back: "Service Level Agreement — the external, contractual promise, usually looser than the SLO.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sla-fc4", front: "Why is SLO stricter than SLA?", back: "So an internal miss is caught and fixed before it becomes an external contractual breach.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sla-fc5", front: "Error budget", back: "100% minus the SLO target — the allowed 'budget' of failure a team can spend on risk/releases.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "SLO, SLA, SLI",
    sections: [
      { heading: "The three terms", items: ["SLI = measured metric", "SLO = internal target", "SLA = external promise (contractual)"] },
      { heading: "Stacking order", items: ["SLA (loosest) < SLO (stricter) — internal buffer above the promise"] },
      { heading: "Error budget", items: ["100% − SLO = allowed failure budget", "Spend it on risk/releases", "Exhausted → slow down, focus on stability"] },
    ],
  },

  speedNotes: [
    "SLI = measured. SLO = internal target. SLA = external contractual promise.",
    "SLO should be stricter than SLA (internal buffer).",
    "Error budget = 100% − SLO target.",
    "Choose SLIs that reflect real user experience, not just what's easy to measure.",
    "SLA breach = contractual penalty. SLO miss = internal warning.",
  ],
};
