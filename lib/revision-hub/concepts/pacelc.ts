import type { ConceptRevisionContent } from "./types";

export const pacelc: ConceptRevisionContent = {
  slug: "pacelc",
  title: "PACELC",
  topic: "Fundamentals",
  difficulty: "Advanced",
  estimatedMinutes: 15,

  docLinks: [
    { label: "PACELC", href: "/docs/fundamentals/pacelc" },
    { label: "CAP Theorem", href: "/docs/fundamentals/cap-theorem" },
  ],

  summary: [
    "PACELC extends CAP theorem: if there's a Partition (P), choose Availability (A) or Consistency (C); Else (E), even with no partition, choose Latency (L) or Consistency (C).",
    "CAP only describes the rare case — an active partition. PACELC adds the everyday case: a perfectly healthy network still forces a latency-vs-consistency trade-off on every write.",
    "The 'Else' branch is the practically important one, since most systems spend nearly all their time in normal operation, not mid-partition.",
    "The trade-off in the 'Else' branch: wait for all replicas to confirm a write (stronger consistency, higher latency) vs. respond as soon as one replica has it (lower latency, other replicas briefly behind).",
    "A system's PACELC classification is usually written as PA/EL or PC/EC — e.g. Dynamo-style systems are PA/EL; many traditional single-leader relational setups configured for strong consistency are PC/EC.",
    "PACELC is a more complete framework than CAP alone for actual architecture decisions, since it forces the latency-consistency trade-off to be reasoned about even when nothing is broken.",
  ],

  whyAsked: [
    "It's the natural, harder follow-up after CAP theorem, used to separate candidates who memorized CAP from those who understand its actual limitation.",
    "It tests whether a candidate can reason about trade-offs during normal operation, not just failure scenarios — which is where most systems spend almost all their time.",
    "It's a strong signal for genuine distributed-systems depth versus surface-level buzzword familiarity.",
  ],

  thirtySecondAnswer:
    "PACELC extends CAP theorem to cover the case CAP is silent about: normal operation. It says if there's a Partition, a system must choose between Availability and Consistency — that's just CAP. But Else, even when the network is perfectly healthy with no partition at all, it must still choose between Latency and Consistency on every write: wait for all replicas to confirm before responding, which is more consistent but slower, or respond as soon as one replica has it, which is faster but leaves other replicas briefly behind. This 'Else' branch is the practically important one, since real systems spend nearly all their time in normal operation, not mid-partition — which is exactly why PACELC is considered a more complete framework than CAP alone for actual architecture decisions.",

  detailedAnswer: [
    "PACELC = if Partition, choose Availability or Consistency (this part is just CAP); Else, choose Latency or Consistency.",
    "The 'Else' branch applies during normal, healthy operation — and is the practically dominant case, since partitions are comparatively rare and short-lived.",
    "The Else trade-off concretely: synchronous replication (wait for all/majority replicas to ack a write) gives stronger consistency at higher latency; asynchronous replication (ack after one replica, propagate the rest later) gives lower latency at the cost of temporary replica lag.",
    "A system's full PACELC classification combines both branches, e.g. PA/EL (Dynamo-style: available during a partition, low-latency normally, both at the cost of consistency) or PC/EC (traditionally consistent systems: consistent during a partition and normally, at the cost of availability/latency respectively).",
    "PACELC doesn't replace CAP — it adds the missing half of the picture, which is why the two are usually taught and discussed together.",
  ],

  questions: [
    { id: "pac-q1", question: "What does PACELC stand for?", answer: "If Partition, choose Availability or Consistency; Else, choose Latency or Consistency.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-q2", question: "What gap in CAP theorem does PACELC address?", answer: "CAP only describes behavior during an active network partition; PACELC adds the far more common case — what trade-off exists during normal operation with no partition at all.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-q3", question: "What is the 'Else' branch of PACELC concretely trading off?", answer: "Latency vs. consistency on every write: wait for replicas to confirm (more consistent, slower) vs. respond immediately after one replica has it (faster, other replicas briefly behind).", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-q4", question: "Why is the 'Else' branch described as the practically dominant case?", answer: "Network partitions are comparatively rare and short-lived; a system spends the overwhelming majority of its operating time in normal, healthy conditions, where the Else trade-off is what's actually in play.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q5", question: "What does 'PA/EL' mean as a system classification?", answer: "During a Partition, the system favors Availability; Else (no partition), it favors Latency — both branches accepting weaker consistency (Dynamo-style systems are a classic example).", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q6", question: "What does 'PC/EC' mean as a system classification?", answer: "During a Partition, the system favors Consistency; Else, it also favors Consistency (accepting reduced availability during a partition and higher latency during normal operation) — traditional strongly consistent systems often fit this.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q7", question: "How does synchronous replication relate to the Else branch's trade-off?", answer: "Waiting for all (or a majority of) replicas to acknowledge a write before responding gives stronger consistency, at the cost of higher latency — the 'choose consistency' side of the Else trade-off.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-q8", question: "How does asynchronous replication relate to the Else branch's trade-off?", answer: "Acknowledging a write after only one replica has it, then propagating to others later, gives lower latency at the cost of those other replicas briefly lagging behind — the 'choose latency' side of the trade-off.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-q9", question: "Why is PACELC considered a more complete framework than CAP alone?", answer: "CAP is entirely silent about normal-operation behavior; PACELC forces the latency-vs-consistency trade-off to be reasoned about even when the network is healthy, which is where real systems spend nearly all their time.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q10", question: "Does PACELC replace CAP theorem?", answer: "No — it extends it. The 'PA' or 'PC' half of a PACELC classification is exactly CAP's own trade-off; PACELC just adds the 'Else' half CAP doesn't cover.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-q11", question: "Can a system's P-branch and E-branch choices be different (e.g. PA/EC)?", answer: "Yes — the two branches are independent design choices; a system could favor availability during a partition but still favor consistency (accepting higher latency) during normal operation, or any other combination.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q12", question: "Why might an interviewer consider PACELC a stronger signal of depth than CAP alone?", answer: "Reciting CAP is common and often memorized; explaining the Else/normal-operation trade-off requires understanding replication mechanics (sync vs. async) that a surface-level answer usually skips.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q13", question: "How would you decide where a new system should sit on the latency-vs-consistency spectrum during normal operation?", answer: "Ask what's more costly for the specific data: a slightly stale read (favor latency/async replication) or ever seeing an inconsistent value (favor consistency/sync replication) — the same reasoning style as the CAP CP/AP decision, applied to normal operation.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q14", question: "What's a real-world example of a PA/EL system?", answer: "Amazon's original Dynamo design — available during a partition and low-latency during normal operation, both by relaxing strict consistency in favor of eventual consistency.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q15", question: "What's a real-world example of a PC/EC-leaning system?", answer: "A traditional single-leader relational database configured with synchronous replication to a standby — it prioritizes consistency both during a partition (refusing uncertain reads) and normally (paying the latency cost of confirming writes).", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q16", question: "Why doesn't CAP theorem alone give you enough information to choose a database for a new system?", answer: "Two databases could have identical CAP classifications (both AP, say) but behave completely differently during normal operation — PACELC's Else branch is needed to distinguish them meaningfully.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q17", question: "What's a common mistake when discussing PACELC in an interview?", answer: "Only reciting the Partition/CAP half and stopping there, without addressing what happens Else (during normal operation) — which is the actual extension PACELC contributes.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-q18", question: "How does PACELC relate to the choice between strong and eventual consistency models?", answer: "The Else branch's latency-vs-consistency choice is essentially the same decision as choosing strong consistency (sync replication, higher latency) vs. eventual consistency (async replication, lower latency) for normal-operation writes.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q19", question: "Why might a system choose different PACELC trade-offs for different types of data?", answer: "Just as with CP/AP choices in CAP, different data within the same system can have different tolerance for staleness vs. latency — critical data might use synchronous replication while less critical data uses asynchronous.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-q20", question: "Summarize PACELC in one sentence.", answer: "If there's a Partition, choose Availability or Consistency (CAP's trade-off); Else, even with a healthy network, choose Latency or Consistency — the trade-off that actually applies almost all the time.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What does this system do in the 'Else' case, not just during a partition?\"",
    "\"Is this replication synchronous or asynchronous, and what does that cost?\"",
    "\"How would you classify this system's PACELC trade-offs — PA/EL, PC/EC, or something mixed?\"",
  ],

  commonMistakes: [
    "Only discussing the Partition/CAP half and never addressing the Else/normal-operation trade-off.",
    "Treating PACELC as unrelated to CAP rather than as its direct extension.",
    "Assuming a system's P-branch choice automatically determines its E-branch choice (they're independent).",
    "Not connecting the Else trade-off to concrete replication mechanics (sync vs. async).",
  ],

  interviewTraps: [
    "\"So this is basically the same as CAP?\" is a trap — the honest answer distinguishes the 'Else' branch as PACELC's actual contribution beyond CAP.",
    "Being asked to classify a specific real database's PACELC profile (not just its CAP profile) tests whether you understand both branches are independent, real design choices.",
  ],

  tradeoffs: [
    "Synchronous replication (favor consistency in Else): stronger guarantees, higher write latency.",
    "Asynchronous replication (favor latency in Else): faster writes, temporary replica staleness.",
    "A system's P-branch and E-branch trade-offs can be mixed and matched rather than always aligned.",
  ],

  comparisonTable: {
    title: "CAP vs PACELC — what each actually covers",
    columns: ["CAP Theorem", "PACELC"],
    rows: [
      { label: "Covers", values: ["Behavior during a partition only", "Behavior during a partition AND normal operation"] },
      { label: "Trade-off (partition)", values: ["Consistency vs Availability", "Same — this is CAP's own trade-off (the 'P' branch)"] },
      { label: "Trade-off (normal operation)", values: ["Not addressed", "Latency vs Consistency (the 'Else' branch)"] },
      { label: "How common is the scenario", values: ["Rare (partitions are uncommon)", "Else branch: constant (this is the everyday case)"] },
      { label: "Example classification", values: ["AP or CP", "PA/EL or PC/EC"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "pac-root",
    question: "During normal operation (no partition), what matters more for this data?",
    options: [
      {
        label: "Every read must reflect the latest write",
        next: {
          kind: "result",
          id: "pac-ec",
          result: "Favor Consistency (EC) — use synchronous replication, accept higher write latency.",
          rationale: "Data where staleness is unacceptable (e.g. financial balances) justifies paying the latency cost of confirming writes across replicas.",
        },
      },
      {
        label: "Fast writes matter more than immediate consistency",
        next: {
          kind: "result",
          id: "pac-el",
          result: "Favor Latency (EL) — use asynchronous replication, accept brief replica staleness.",
          rationale: "Data where brief staleness is tolerable (e.g. a view counter) benefits more from fast writes than from every replica being instantly current.",
        },
      },
    ],
  },

  memoryTrick:
    "\"CAP handles P. PACELC handles P AND Else.\" If there's a Partition: A or C (that's CAP). Else (healthy network): L or C. Most of the time you're in the 'Else' world, not the partition world — that's the part CAP forgets to mention.",

  realWorldExamples: [
    "Amazon's Dynamo (and Dynamo-style systems like Cassandra) are classically PA/EL — available during a partition, low-latency normally, both by relaxing consistency guarantees.",
    "Traditional relational databases with synchronous replica confirmation lean PC/EC — consistent both during a partition (refusing uncertain reads) and during normal operation (paying the latency cost of replica confirmation).",
  ],

  mermaidDiagram: `flowchart TD
    Start{Partition?} -->|Yes: P| PChoice{Choose}
    PChoice -->|Availability| PA[PA]
    PChoice -->|Consistency| PC[PC]
    Start -->|No: Else| EChoice{Choose}
    EChoice -->|Latency| EL[EL]
    EChoice -->|Consistency| EC[EC]`,

  flashcards: [
    { id: "pac-fc1", front: "PACELC — expand the acronym", back: "If Partition: Availability or Consistency. Else: Latency or Consistency.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-fc2", front: "What does PACELC add that CAP doesn't cover?", back: "The 'Else' branch — the latency-vs-consistency trade-off during normal operation, with no partition.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "pac-fc3", front: "PA/EL — what does it mean?", back: "Favors Availability during a Partition, favors Latency Else (normal operation) — e.g. Dynamo-style systems.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-fc4", front: "Why is the 'Else' branch practically dominant?", back: "Partitions are rare and short-lived; systems spend nearly all their time in normal operation.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "pac-fc5", front: "Sync vs async replication — which favors which Else choice?", back: "Sync replication favors Consistency (EC, higher latency); async replication favors Latency (EL, brief staleness).", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "PACELC",
    sections: [
      { heading: "Formula", items: ["If Partition: Availability or Consistency", "Else: Latency or Consistency"] },
      { heading: "What's new vs CAP", items: ["The 'Else' (normal operation) branch", "CAP is silent on this; PACELC adds it"] },
      { heading: "Classifications", items: ["PA/EL — Dynamo-style", "PC/EC — traditional strong consistency"] },
      { heading: "Else trade-off mechanics", items: ["Sync replication → consistency, higher latency", "Async replication → latency, brief staleness"] },
    ],
  },

  speedNotes: [
    "PACELC = CAP + the 'Else' (normal operation) branch.",
    "If Partition: A or C. Else: L or C.",
    "Else branch is the everyday case — partitions are rare.",
    "PA/EL = Dynamo-style. PC/EC = traditional strong consistency.",
    "Sync replication → consistency/slower. Async → latency/staleness.",
  ],
};
