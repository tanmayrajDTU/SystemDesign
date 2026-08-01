import type { ConceptRevisionContent } from "./types";

export const capTheorem: ConceptRevisionContent = {
  slug: "cap-theorem",
  title: "CAP Theorem",
  topic: "Fundamentals",
  difficulty: "Intermediate",
  estimatedMinutes: 15,

  docLinks: [
    { label: "CAP Theorem", href: "/docs/fundamentals/cap-theorem" },
    { label: "PACELC", href: "/docs/fundamentals/pacelc" },
  ],

  summary: [
    "CAP theorem states a distributed data store can provide at most two of Consistency (every read gets the latest write, or an error), Availability (every request gets a non-error response), and Partition Tolerance (the system keeps working despite network partitions).",
    "The practically important part: partitions will happen in any real distributed system, so partition tolerance isn't really an optional choice — the real trade-off is C vs A during a partition.",
    "\"Choose 2 of 3\" is a common oversimplification; in practice, the choice only actually matters while a partition is occurring — CAP says nothing about normal operation without a partition.",
    "CP systems (consistency + partition tolerance) refuse to serve possibly-stale reads during a partition, sacrificing availability.",
    "AP systems (availability + partition tolerance) keep serving during a partition, accepting the risk of stale or conflicting data.",
    "CAP is often criticized as incomplete for real design decisions because it ignores latency — PACELC is the extension that adds the latency-vs-consistency trade-off during normal operation too.",
  ],

  whyAsked: [
    "It's one of the most commonly asked distributed-systems theory questions, and a fast way to check for a memorized-but-not-understood buzzword vs. real comprehension.",
    "The common trap (\"choose 2 of 3\" taken too literally) is an easy tell for surface-level knowledge versus someone who understands partition tolerance isn't optional in practice.",
    "It sets up deeper questions about specific databases' actual CAP positioning and how that maps to real product requirements.",
  ],

  thirtySecondAnswer:
    "CAP theorem says a distributed data store can provide at most two of three guarantees: Consistency, meaning every read gets the most recent write or an error; Availability, meaning every request gets a non-error response; and Partition Tolerance, meaning the system keeps working despite network partitions between nodes. The important nuance is that partition tolerance isn't really optional — network partitions will happen in any real distributed system — so the actual trade-off in practice is between consistency and availability specifically during a partition. A CP system refuses to answer with possibly-stale data when partitioned, choosing correctness over uptime. An AP system keeps serving requests during a partition, accepting the risk of returning stale or conflicting data. CAP only describes what happens during a partition — it says nothing about the latency-consistency trade-off during normal operation, which is exactly what PACELC extends it to cover.",

  detailedAnswer: [
    "Consistency (C): every read returns the most recent write, or an error — not to be confused with ACID consistency, which is a different, database-internal notion.",
    "Availability (A): every request receives a non-error response, though not guaranteed to reflect the most recent write.",
    "Partition Tolerance (P): the system continues operating despite network partitions (messages between nodes being dropped or delayed).",
    "Since partitions are a real, unavoidable occurrence in distributed systems, P is effectively mandatory — the genuine design choice is C vs A specifically during a partition, not a free pick of any 2 of 3.",
    "CAP is silent about behavior when there's no partition — that's where PACELC's added 'else, Latency vs Consistency' trade-off becomes the more complete framework for reasoning about normal-operation behavior too.",
  ],

  questions: [
    { id: "cap-q1", question: "What does CAP theorem state?", answer: "A distributed data store can provide at most two of Consistency, Availability, and Partition Tolerance simultaneously.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "cap-q2", question: "What does 'Consistency' mean in CAP?", answer: "Every read receives the most recent write, or an error — all nodes see the same data at the same time.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "cap-q3", question: "What does 'Availability' mean in CAP?", answer: "Every request receives a non-error response, though not guaranteed to be the most recent write.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "cap-q4", question: "What does 'Partition Tolerance' mean in CAP?", answer: "The system continues to operate despite network partitions — messages between nodes being dropped or arbitrarily delayed.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "cap-q5", question: "Why is 'choose any 2 of 3' a misleading way to state CAP in practice?", answer: "Network partitions are a real, unavoidable occurrence in distributed systems, so partition tolerance isn't optional — the actual, meaningful choice is between consistency and availability specifically during a partition.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-q6", question: "What is a CP system, and what does it do during a partition?", answer: "A system prioritizing Consistency and Partition tolerance — during a partition, it refuses to serve a request it can't guarantee is up to date, sacrificing availability for correctness.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-q7", question: "What is an AP system, and what does it do during a partition?", answer: "A system prioritizing Availability and Partition tolerance — during a partition, it keeps serving requests, accepting the risk of returning stale or conflicting data.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-q8", question: "Give an example of a use case that would favor a CP system.", answer: "A banking balance check — serving a stale balance during a partition could lead to real financial errors, so refusing to answer (or erroring) is preferable to answering incorrectly.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-q9", question: "Give an example of a use case that would favor an AP system.", answer: "A social media 'like' count or a shopping cart — briefly showing a slightly stale count/cart during a partition is far less costly than the service becoming unavailable entirely.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-q10", question: "What does CAP theorem NOT say anything about?", answer: "Behavior when there's no partition — CAP is entirely about the trade-off during a partition; normal-operation latency-vs-consistency trade-offs are outside its scope (that's what PACELC adds).", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "cap-q11", question: "Is CAP's 'Consistency' the same as the 'C' in ACID?", answer: "No — CAP consistency is about all nodes agreeing on the most recent value (a distributed-systems notion); ACID consistency is about a database transaction moving between valid states according to its own rules — they're different concepts that happen to share a name.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "cap-q12", question: "Can a single-node (non-distributed) database violate CAP?", answer: "CAP theorem applies specifically to distributed systems where partitions are possible — a single-node system has no partition scenario to reason about, so CAP's trade-off doesn't apply to it.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "cap-q13", question: "Why might a system's CAP choice differ per operation rather than being fixed system-wide?", answer: "Some systems deliberately choose different consistency guarantees for different operations (e.g. strongly consistent writes, eventually consistent reads) based on which operations actually need which guarantee.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "cap-q14", question: "What's a common mistake candidates make when discussing CAP?", answer: "Treating it as a free choice of any 2 of 3 as if partitions were optional, rather than recognizing P is effectively mandatory and the real decision is C vs A during a partition.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-q15", question: "How does CAP relate to eventual consistency?", answer: "Eventual consistency is the typical model AP systems use — during and after a partition, replicas may briefly disagree, but they converge to the same value once communication is restored.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-q16", question: "Why do many modern databases let you tune consistency per query rather than being purely CP or AP?", answer: "Because real applications often have a mix of needs — some data genuinely needs strong consistency, other data can tolerate staleness — a single fixed system-wide choice is often more rigid than necessary.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "cap-q17", question: "What happens to a CP system when there's no partition?", answer: "It can typically provide both consistency and availability simultaneously — the trade-off CAP describes only bites during an actual partition; the 'C' in CP isn't sacrificing availability at all times.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "cap-q18", question: "Why is CAP theorem sometimes criticized as insufficiently useful for real design decisions on its own?", answer: "It only addresses the partition scenario, ignoring the far more common latency-vs-consistency trade-off during normal operation — which is why PACELC is often considered a more complete framework.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "cap-q19", question: "How would you decide whether a new feature's data store should lean CP or AP?", answer: "Ask what's more costly for that specific data: serving stale/wrong data (favor CP) or the service being briefly unavailable (favor AP) — the answer is data/use-case specific, not a system-wide default.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "cap-q20", question: "Summarize CAP theorem in one sentence.", answer: "A distributed system facing a network partition must choose between consistency (refuse to risk stale answers) and availability (keep serving, risking staleness) — partition tolerance itself isn't really optional.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Which specific databases are CP vs AP, and how do you know?\"",
    "\"What would this system do during an actual network partition, concretely?\"",
    "\"How does this relate to PACELC?\"",
  ],

  commonMistakes: [
    "Treating CAP as a free choice of any 2 of 3, as if partition tolerance were optional.",
    "Confusing CAP's 'Consistency' with ACID's 'Consistency' — they're different concepts.",
    "Applying CAP reasoning to a non-distributed, single-node system.",
    "Assuming a CP system sacrifices availability at all times, rather than only during a partition.",
  ],

  interviewTraps: [
    "\"So you'd just pick Consistency and Availability then?\" is a trap testing whether you recognize P isn't actually optional in a real distributed system.",
    "Asking \"what does this system do when there's no partition\" is testing whether you understand CAP's trade-off is scoped specifically to partition scenarios, not all operating conditions.",
  ],

  tradeoffs: [
    "CP: stronger correctness guarantee during a partition, at the cost of availability for some requests.",
    "AP: system stays responsive during a partition, at the cost of potentially stale or conflicting data.",
    "Per-operation tuning (mixing CP and AP behavior within one system) offers flexibility but adds real design and reasoning complexity.",
  ],

  comparisonTable: {
    title: "CP vs AP (during a partition)",
    columns: ["CP System", "AP System"],
    rows: [
      { label: "During a partition", values: ["Refuses/errors on uncertain reads", "Keeps serving requests"] },
      { label: "Prioritizes", values: ["Correctness", "Uptime"] },
      { label: "Risk accepted", values: ["Reduced availability", "Stale or conflicting data"] },
      { label: "Good fit for", values: ["Financial balances, inventory counts", "Social counters, shopping carts, caches"] },
      { label: "Typical consistency model", values: ["Strong consistency", "Eventual consistency"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "cap-root",
    question: "During a network partition, what's more costly for this specific data?",
    options: [
      {
        label: "Serving stale or wrong data",
        next: {
          kind: "result",
          id: "cap-cp",
          result: "Lean CP — refuse/error on uncertain reads rather than risk incorrect data.",
          rationale: "For data like financial balances or inventory counts, an incorrect answer is worse than a temporary error.",
        },
      },
      {
        label: "The service being unavailable",
        next: {
          kind: "result",
          id: "cap-ap",
          result: "Lean AP — keep serving, accept eventual consistency.",
          rationale: "For data like social counters or cart contents, staying responsive matters more than momentary staleness.",
        },
      },
    ],
  },

  memoryTrick:
    "\"P isn't a choice.\" Partitions happen whether you want them to or not — the real CAP decision is C vs A during a partition, not a free pick of any 2 of 3. Ask: 'stale answer or no answer?'",

  realWorldExamples: [
    "Traditional relational databases configured for strong consistency (single-leader replication) behave as CP during a partition — a follower that can't confirm it has the latest write will refuse to serve rather than risk staleness.",
    "DNS is a classic AP system — it keeps resolving names even when parts of the network can't fully communicate, tolerating temporarily stale records rather than failing lookups outright.",
  ],

  mermaidDiagram: `flowchart TD
    P[Network Partition Occurs] --> Choice{Choose during partition}
    Choice -->|Prioritize correctness| CP[CP: refuse uncertain reads\nsacrifice availability]
    Choice -->|Prioritize uptime| AP[AP: keep serving\nrisk stale data]`,

  flashcards: [
    { id: "cap-fc1", front: "CAP theorem — one-line definition", back: "A distributed data store can provide at most 2 of Consistency, Availability, Partition Tolerance.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "cap-fc2", front: "Why isn't Partition Tolerance really optional?", back: "Network partitions happen in any real distributed system — so P is effectively mandatory; the real choice is C vs A during a partition.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-fc3", front: "CP system, during a partition", back: "Refuses/errors on uncertain reads rather than risk stale data — prioritizes correctness.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-fc4", front: "AP system, during a partition", back: "Keeps serving requests, accepting the risk of stale/conflicting data — prioritizes uptime.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "cap-fc5", front: "What does CAP say about normal operation (no partition)?", back: "Nothing — CAP only describes the trade-off during a partition; PACELC extends it to normal-operation latency vs. consistency.", topic: "Fundamentals", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "CAP Theorem",
    sections: [
      { heading: "Three guarantees", items: ["Consistency: latest write or error", "Availability: always a non-error response", "Partition Tolerance: survives network partitions"] },
      { heading: "Reality check", items: ["P is mandatory in practice", "Real choice: C vs A during a partition"] },
      { heading: "CP vs AP", items: ["CP: refuse stale reads (correctness first)", "AP: keep serving (uptime first)"] },
      { heading: "Remember", items: ["CAP ≠ ACID's 'C'", "CAP says nothing about normal operation", "See PACELC for the fuller picture"] },
    ],
  },

  speedNotes: [
    "CAP: pick 2 of Consistency, Availability, Partition Tolerance.",
    "P is mandatory in real distributed systems — real choice is C vs A during a partition.",
    "CP = refuse stale reads. AP = keep serving, risk staleness.",
    "CAP's 'C' ≠ ACID's 'C' — different concepts, same letter.",
    "CAP is silent on normal operation — PACELC extends it with latency vs consistency.",
  ],
};
