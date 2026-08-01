import type { ConceptRevisionContent } from "./types";

export const multiLeader: ConceptRevisionContent = {
  slug: "multi-leader-replication",
  title: "Multi-Leader Replication",
  topic: "Databases",
  difficulty: "Advanced",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Multi-leader", href: "/docs/databases/multi-leader" },
    { label: "Leader-Follower", href: "/docs/databases/leader-follower" },
    { label: "Replication", href: "/docs/databases/replication" },
  ],

  summary: [
    "Multi-leader (master-master) replication lets more than one node accept writes independently, each replicating its changes to the others — unlike leader-follower, where only one node ever writes.",
    "It exists specifically to solve geographic write latency: a global user base routing every write to one distant leader pays real, unavoidable round-trip latency that local leaders per region avoid.",
    "The core new problem it introduces: two leaders can accept conflicting writes to the same data concurrently, before either knows about the other's change — genuine conflict resolution is unavoidable.",
    "Conflict resolution strategies range from simple (last-write-wins, which can silently lose data) to sophisticated (vector clocks, application-level merge, CRDTs for automatic, correct merging).",
    "It's a deliberate, advanced trade-off: lower write latency across distant regions, at the real cost of conflict-resolution complexity that's genuinely one of the harder problems in distributed systems.",
    "It should only be adopted when geographic write latency is a real, measured requirement — not as a default, since the complexity cost is substantial and unforced otherwise.",
  ],

  whyAsked: [
    "It tests whether a candidate understands exactly what new problem multi-leader introduces (conflict resolution), not just that it 'allows more writes'.",
    "The conflict-resolution-strategy question is a strong signal of depth — knowing last-write-wins' risk vs. CRDTs' guarantees shows real understanding.",
    "It checks whether a candidate treats it as a deliberate, justified trade-off rather than a default replication choice.",
  ],

  thirtySecondAnswer:
    "Multi-leader replication allows more than one node to accept writes independently, each propagating its changes to the others — solving the real problem that routing every write to a single, distant leader adds unavoidable latency for users far from it. Each region's leader can accept writes locally and fast, but this introduces a genuinely hard new problem leader-follower never has: two leaders can accept conflicting writes to the same data concurrently, before either has heard about the other's change, and something has to resolve that conflict. Strategies range from simple but risky (last-write-wins, which can silently discard a legitimate concurrent update) to more sophisticated approaches like vector clocks, application-specific merge logic, or CRDTs that merge automatically and correctly. It's a deliberate trade-off worth making specifically when low-latency writes across distant regions are a real, measured requirement — and a significant, unforced complexity cost otherwise.",

  detailedAnswer: [
    "More than one node accepts writes independently, propagating changes to other leaders — unlike leader-follower's single write path.",
    "Solves geographic write latency: local writes in each region, avoiding a round trip to one distant global leader.",
    "Introduces genuine write-conflict resolution: two leaders can modify the same data concurrently before syncing.",
    "Conflict strategies: last-write-wins (simple, can lose data), vector clocks (detect true concurrency), application-level merge, CRDTs (automatic, correct merging).",
    "Debugging is harder — understanding what happened to concurrently modified data requires tracking causality, not a simple linear history.",
    "Adopt only with a real, measured geographic-latency requirement — the conflict-resolution cost is substantial and unforced otherwise.",
  ],

  questions: [
    { id: "ml-q1", question: "What is multi-leader replication, in one sentence?", answer: "A replication topology where more than one node can accept writes independently, each propagating its changes to the other leaders.", topic: "Databases", difficulty: "Beginner" },
    { id: "ml-q2", question: "What specific problem does multi-leader replication solve that leader-follower can't?", answer: "Geographic write latency — routing every write to one distant leader adds real, unavoidable latency for users far from it; multi-leader lets each region write locally.", topic: "Databases", difficulty: "Intermediate" },
    { id: "ml-q3", question: "What's the core new problem multi-leader replication introduces?", answer: "Two leaders can accept conflicting writes to the same piece of data concurrently, before either has heard about the other's change, requiring genuine conflict resolution.", topic: "Databases", difficulty: "Intermediate" },
    { id: "ml-q4", question: "What's the risk of last-write-wins conflict resolution?", answer: "It can silently discard a legitimate concurrent update, simply because it happened to have an earlier timestamp — data loss with no warning.", topic: "Databases", difficulty: "Intermediate" },
    { id: "ml-q5", question: "What do vector clocks provide that a simple timestamp doesn't?", answer: "They track causal relationships between writes across nodes, letting the system detect when two writes were genuinely concurrent rather than one causally following the other.", topic: "Databases", difficulty: "Advanced" },
    { id: "ml-q6", question: "What is a CRDT, and why is it useful here?", answer: "A Conflict-free Replicated Data Type — a data structure specifically designed so concurrent updates can always be merged automatically and deterministically, without losing information or needing manual resolution.", topic: "Databases", difficulty: "Advanced" },
    { id: "ml-q7", question: "What's an example of application-level merge conflict resolution?", answer: "Merging two concurrently-edited shopping carts by taking the union of items from both, rather than picking one cart's version and discarding the other's changes entirely.", topic: "Databases", difficulty: "Intermediate" },
    { id: "ml-q8", question: "When should multi-leader replication actually be adopted?", answer: "Only when there's a real, measured geographic-latency requirement driving it — not as a default replication choice, given the real conflict-resolution complexity it introduces.", topic: "Databases", difficulty: "Intermediate" },
    { id: "ml-q9", question: "What's a common mistake when adopting multi-leader replication?", answer: "Defaulting to last-write-wins without considering whether it's acceptable to silently lose legitimate concurrent updates for the specific data involved.", topic: "Databases", difficulty: "Advanced" },
    { id: "ml-q10", question: "What's a real production example of multi-leader (multi-master) replication?", answer: "CouchDB and Cassandra both support multi-leader style replication, commonly used for globally distributed applications needing low-latency local writes in multiple regions.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Why might a globally distributed system choose multi-leader replication over single-leader?\"",
    "\"Two regions concurrently update the same record — walk me through how your system resolves that conflict.\"",
    "\"What's the risk of using last-write-wins, and when would you choose something more sophisticated?\"",
  ],

  commonMistakes: [
    "Adopting multi-leader replication without a real geographic-latency need.",
    "Defaulting to last-write-wins without considering what it might silently lose.",
    "Underestimating how genuinely hard correct conflict resolution is, treating it as an afterthought.",
  ],

  interviewTraps: [
    "\"Multi-leader is just leader-follower with more leaders\" undersells the real difficulty — conflict resolution is a fundamentally new, hard problem.",
    "Being asked why not always use multi-leader is testing whether you name the conflict-resolution cost, not just 'it's more complex.'",
  ],

  tradeoffs: [
    "Low-latency local writes across distant regions vs. genuine, often complex conflict resolution.",
    "Higher availability (one region's leader failing doesn't stop others from writing) vs. harder debugging of concurrently modified data.",
  ],

  memoryTrick:
    "\"Multiple pens, same document.\" Everyone can write locally and fast, but someone has to reconcile it when two pens touch the same line at once.",

  realWorldExamples: [
    "CouchDB and Cassandra support multi-leader style replication for globally distributed apps needing low-latency local writes per region.",
    "A collaborative shopping cart or document editor uses CRDTs so concurrent edits from different regions merge automatically as a union, rather than one region's changes overwriting the other's.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant US as US Leader
    participant EU as EU Leader
    Note over US,EU: Both start with price = $10
    US->>US: Set price = $12 (at T1)
    EU->>EU: Set price = $15 (at T1, concurrently)
    US->>EU: Replicate: price = $12
    EU->>US: Replicate: price = $15
    Note over US,EU: Conflict! Resolution strategy decides the outcome`,

  flashcards: [
    { id: "ml-fc1", front: "Multi-leader — one-line definition", back: "More than one node accepts writes independently, replicating changes to each other.", topic: "Databases", difficulty: "Beginner" },
    { id: "ml-fc2", front: "Why does multi-leader exist?", back: "To let distant regions write locally, avoiding round-trip latency to one global leader.", topic: "Databases", difficulty: "Intermediate" },
    { id: "ml-fc3", front: "Core new problem it introduces", back: "Concurrent conflicting writes to the same data across leaders — genuine conflict resolution needed.", topic: "Databases", difficulty: "Intermediate" },
    { id: "ml-fc4", front: "Last-write-wins risk", back: "Can silently discard a legitimate concurrent update.", topic: "Databases", difficulty: "Intermediate" },
    { id: "ml-fc5", front: "CRDT", back: "A data structure enabling automatic, correct merging of concurrent updates with no data loss.", topic: "Databases", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Multi-Leader Replication",
    sections: [
      { heading: "Core idea", items: ["Multiple leaders accept writes independently", "Each propagates to the others"] },
      { heading: "Solves", items: ["Geographic write latency"] },
      { heading: "Introduces", items: ["Concurrent write conflicts"] },
      { heading: "Conflict strategies", items: ["Last-write-wins — simple, risky", "Vector clocks — detect true concurrency", "App-level merge — custom logic", "CRDTs — automatic, correct merge"] },
    ],
  },

  speedNotes: [
    "Multi-leader = multiple nodes accept writes independently.",
    "Solves geographic write latency for distant regions.",
    "Introduces real conflict resolution — the hard new problem.",
    "LWW is simple but can lose data; CRDTs merge automatically.",
    "Adopt only with a real, measured multi-region latency need.",
  ],
};
