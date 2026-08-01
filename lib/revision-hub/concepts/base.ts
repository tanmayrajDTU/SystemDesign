import type { ConceptRevisionContent } from "./types";

export const base: ConceptRevisionContent = {
  slug: "base",
  title: "BASE",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 10,

  docLinks: [
    { label: "BASE", href: "/docs/databases/base" },
    { label: "ACID", href: "/docs/databases/acid" },
    { label: "CAP Theorem", href: "/docs/fundamentals/cap-theorem" },
  ],

  summary: [
    "BASE (Basically Available, Soft state, Eventually consistent) is the deliberate, named alternative to ACID — a set of properties common in distributed systems that relax strong consistency in favor of availability and horizontal scalability.",
    "It exists because ACID's strong guarantees, especially immediate consistency across replicas, become expensive or outright impossible to maintain during a network partition without sacrificing availability — the exact constraint CAP theorem describes.",
    "Basically Available: the system always returns a response, even if not the absolute latest data. Soft state: state can change over time even without new writes, as replicas sync. Eventually consistent: given enough time without new writes, all replicas converge.",
    "Because writes can land on different replicas before they've synced, BASE systems need explicit conflict-resolution strategies — last-write-wins, vector clocks, or application-level merge logic.",
    "Quorum-based reads/writes are a common tunable middle ground: rather than requiring all replicas (fully synchronous) or just one (fully async), a majority quorum balances consistency and availability more finely.",
    "The right call depends entirely on the data: BASE is a good trade for data that tolerates brief staleness (like counters), and the wrong one where correctness can't be compromised even briefly (like account balances).",
  ],

  whyAsked: [
    "It tests whether you can name the actual trade CAP theorem forces, and BASE is the concrete, named philosophy that emerges from choosing availability over strict consistency.",
    "It's used to check whether you understand that adopting BASE isn't free — the application inherits real complexity (conflict resolution) that ACID would have otherwise handled for you.",
    "It's a good test of judgment: whether you can identify which specific pieces of data in a system are safe to make eventually consistent, and which aren't.",
  ],

  thirtySecondAnswer:
    "BASE — Basically Available, Soft state, Eventually consistent — is the deliberate, named alternative to ACID's strong consistency, adopted by many distributed systems that prioritize availability and horizontal scalability instead. Basically Available means the system always gives you a response, even if it's not the absolute latest data; Soft state means the system's state can keep changing over time, even without new input, as replicas asynchronously sync with each other; and Eventually consistent means that given enough time without new writes, all replicas converge to the same value. It exists because trying to maintain ACID's strong, immediate consistency across a globally distributed, always-available system runs directly into what CAP theorem describes — during a network partition, you can't have both full availability and strict consistency. The real cost of choosing BASE is that the application, not the database, now needs explicit conflict-resolution logic — last-write-wins, vector clocks, or custom merge logic — for cases where the same data is written concurrently on two replicas before they've synced, which is exactly the kind of correctness reasoning ACID would otherwise have handled for you.",

  detailedAnswer: [
    "Basically Available: the system guarantees a response, even if it's not the latest write — prioritizing responsiveness over perfect freshness.",
    "Soft state: replicas' state can drift and change over time even without new writes, as asynchronous propagation catches them up to each other.",
    "Eventually consistent: given enough time with no new writes, all replicas converge — but there's a real, non-zero window where reads can be stale or divergent.",
    "Directly follows from CAP: during a network partition, BASE explicitly chooses availability (AP) over strict consistency, rather than pretending the trade-off doesn't exist.",
    "Requires explicit conflict resolution for concurrent writes to the same data — last-write-wins (simplest, can silently drop valid updates), vector clocks, or application-specific merge logic (e.g. CRDTs).",
    "Quorum reads/writes are a common tunable middle ground between full synchronous replication and single-node async writes, letting teams dial in a specific consistency/availability balance per system.",
  ],

  questions: [
    { id: "base-q1", question: "What does BASE stand for?", answer: "Basically Available, Soft state, Eventually consistent.", topic: "Databases", difficulty: "Beginner" },
    { id: "base-q2", question: "What does 'Basically Available' mean?", answer: "The system guarantees a response to a request, even if it's not the absolute latest data — prioritizing responsiveness over perfect freshness.", topic: "Databases", difficulty: "Beginner" },
    { id: "base-q3", question: "What does 'Soft state' mean?", answer: "The system's state may change over time even without new input, as it asynchronously synchronizes across replicas in the background.", topic: "Databases", difficulty: "Beginner" },
    { id: "base-q4", question: "What does 'Eventually consistent' actually guarantee, and what does it not guarantee?", answer: "It guarantees that given enough time without new writes, all replicas will converge to the same value — it does NOT guarantee that reads are always fresh, or specify exactly how long convergence takes.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-q5", question: "Why does BASE exist as a named alternative to ACID?", answer: "Because maintaining ACID's strong, immediate consistency across a globally distributed, highly available system runs directly into CAP's constraint — you can't have both full availability and strict consistency during a partition — so BASE names and embraces the deliberate AP-leaning choice.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-q6", question: "What real complexity does adopting BASE push into the application layer?", answer: "Conflict resolution — the application must explicitly handle cases where the same data is concurrently written on two replicas before they've synced, something ACID would have handled at the database level.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-q7", question: "Name three conflict-resolution strategies used in BASE-oriented systems.", answer: "Last-write-wins, vector clocks, and application-level (or CRDT-based) merge logic.", topic: "Databases", difficulty: "Advanced" },
    { id: "base-q8", question: "What's a risk of using simple last-write-wins conflict resolution?", answer: "It can silently discard a valid concurrent update — if two replicas each accept a different concurrent write, naive last-write-wins keeps only one, losing the other without any signal that data was dropped.", topic: "Databases", difficulty: "Advanced" },
    { id: "base-q9", question: "What is a quorum-based read/write, and why is it useful?", answer: "A tunable middle ground requiring a majority of replicas to acknowledge a write (rather than all replicas, or just one), balancing consistency and availability more finely than an all-or-nothing choice.", topic: "Databases", difficulty: "Advanced" },
    { id: "base-q10", question: "Give an example of data that's a good fit for BASE.", answer: "A 'like' counter on a social media post — brief inconsistency across replicas has essentially zero real-world cost and converges quickly.", topic: "Databases", difficulty: "Beginner" },
    { id: "base-q11", question: "Give an example of data that's a poor fit for BASE.", answer: "A bank account balance — even brief inconsistency could cause real financial or trust problems, so strong (ACID) consistency is worth the availability trade-off.", topic: "Databases", difficulty: "Beginner" },
    { id: "base-q12", question: "Why did Amazon design Dynamo (and DynamoDB) around BASE principles?", answer: "For the shopping cart use case, where the cart being always available to add to matters more than the cart being perfectly, immediately consistent across every replica — a stale-but-available cart is a better customer experience than an unavailable one.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-q13", question: "What's a common mistake when choosing a BASE-oriented database?", answer: "Choosing it for data that actually needs strong consistency, without realizing the application now has to build its own conflict-resolution logic that a relational/ACID database would have handled automatically.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-q14", question: "Does 'eventually consistent' mean 'consistent quickly'?", answer: "Not necessarily — the actual propagation delay depends on the specific system and network conditions, and can be longer than assumed, especially under certain failure conditions.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-q15", question: "How does BASE relate to CAP theorem's AP vs CP choice?", answer: "BASE is essentially the concrete philosophy and vocabulary for systems that choose AP (availability + partition tolerance) over CP — accepting temporary inconsistency to stay available.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-q16", question: "Why is reasoning about correctness harder in a BASE system than an ACID one?", answer: "'The data will eventually be consistent' requires careful, case-by-case thought about what happens in the meantime — during the inconsistency window — for every specific use case, rather than relying on one uniform database-level guarantee.", topic: "Databases", difficulty: "Advanced" },
    { id: "base-q17", question: "What advantage does BASE give for horizontal scaling specifically?", answer: "Nodes don't need to coordinate synchronously on every write, so data and traffic can be distributed across many nodes more naturally than a system requiring strict cross-node consistency on every operation.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-q18", question: "What should you communicate to other engineers building on top of a BASE-oriented data store?", answer: "The real-world implications of eventual consistency clearly — since the 'it'll be consistent eventually' behavior can genuinely surprise developers used to ACID guarantees, leading to subtle bugs if unaddressed.", topic: "Databases", difficulty: "Advanced" },
    { id: "base-q19", question: "How would you decide whether to use an ACID-strong or BASE-oriented store for a given piece of data?", answer: "Weigh how costly brief staleness actually is for that specific data — pick BASE deliberately per data type based on real cost of inconsistency, not as a blanket architectural default.", topic: "Databases", difficulty: "Advanced" },
    { id: "base-q20", question: "Summarize BASE in one sentence.", answer: "The deliberate, named alternative to ACID — Basically Available, Soft state, Eventually consistent — trading immediate consistency for higher availability and easier horizontal scaling, right for data that can tolerate brief staleness and wrong for data where correctness can never be compromised.", topic: "Databases", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What does 'eventually consistent' actually guarantee, and what does it not guarantee?\"",
    "\"For this use case, would you choose an ACID-strong or BASE-oriented data store, and why?\"",
    "\"How would you handle two replicas receiving conflicting concurrent writes to the same key?\"",
  ],

  commonMistakes: [
    "Choosing a BASE-oriented (AP) database for data that actually needs strong consistency, without realizing the application now needs its own conflict resolution.",
    "Assuming 'eventually consistent' means 'consistent quickly' — actual propagation delay depends on the system and can be longer than assumed.",
    "Not designing explicit conflict resolution for concurrent writes, leading to silently lost updates from naive last-write-wins.",
    "Adopting BASE as a blanket default rather than deciding per data type based on the real cost of brief staleness.",
  ],

  interviewTraps: [
    "\"Doesn't eventually consistent just mean slightly delayed but otherwise normal?\" is testing whether you know it's a real correctness trade-off requiring explicit conflict handling, not just a delay.",
    "\"Would you use BASE for this account balance?\" is testing whether you can correctly identify data where availability should NOT win over correctness.",
  ],

  tradeoffs: [
    "Higher availability and easier horizontal scaling vs. real application-level complexity (conflict resolution) that ACID would have handled for you.",
    "Good fit for data tolerating brief staleness (counters, feeds, carts) vs. wrong fit for data needing strict correctness (balances, inventory counts where overselling has real cost).",
    "Quorum-based reads/writes offer a tunable middle ground rather than an all-or-nothing consistency/availability choice.",
  ],

  comparisonTable: {
    title: "BASE vs ACID",
    columns: ["BASE", "ACID"],
    rows: [
      { label: "Priority", values: ["Availability", "Strong consistency"] },
      { label: "Consistency model", values: ["Eventual", "Immediate, strict"] },
      { label: "Typical scope", values: ["Distributed, horizontally scaled", "Single database, transactional"] },
      { label: "Cost", values: ["Application-level conflict resolution", "Locking, reduced concurrency"] },
      { label: "Best fit", values: ["Social counters, carts, catalogs", "Financial data, bookings, inventory"] },
      { label: "CAP leaning", values: ["AP (availability over consistency)", "CP (consistency over availability)"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "base-root",
    question: "Can this data tolerate a brief window of staleness across replicas?",
    options: [
      {
        label: "Yes — a counter, feed, cart, or catalog where staleness is nearly costless",
        next: {
          kind: "result",
          id: "base-pick",
          result: "A BASE-oriented, eventually consistent store is a strong fit.",
          rationale: "Trading brief staleness for higher availability and easier horizontal scaling is the right call when incorrectness has essentially no real cost.",
        },
      },
      {
        label: "No — any inconsistency causes real financial, safety, or trust harm",
        next: {
          kind: "result",
          id: "base-acid",
          result: "Use strong ACID guarantees instead.",
          rationale: "Where even a brief inconsistency is unacceptable, the availability gains of BASE aren't worth the correctness risk.",
        },
      },
    ],
  },

  memoryTrick:
    "\"BASE: always answer, catch up later.\" The system never refuses to respond — it just might tell you something slightly stale, and quietly reconciles it in the background.",

  realWorldExamples: [
    "Amazon's Dynamo (and DynamoDB) is explicitly designed around BASE principles for the shopping cart use case, prioritizing availability over perfect immediate consistency.",
    "A 'like' counter on a social media post uses a BASE-oriented, eventually consistent counter, since brief divergence between replicas costs essentially nothing and converges quickly.",
  ],

  mermaidDiagram: `flowchart LR
    A["Write hits Replica 1"] --> B["Replica 1: updated; Replica 2, 3: not yet"]
    B --> C["Propagation happens (async, background)"]
    C --> D["All replicas eventually agree"]`,

  flashcards: [
    { id: "base-fc1", front: "BASE — expand the acronym", back: "Basically Available, Soft state, Eventually consistent.", topic: "Databases", difficulty: "Beginner" },
    { id: "base-fc2", front: "Why does BASE exist?", back: "ACID's strong, immediate consistency becomes expensive or impossible to maintain across a distributed system without sacrificing availability during a partition (CAP).", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-fc3", front: "What complexity does BASE push onto the application?", back: "Conflict resolution for concurrent writes to the same data across replicas — last-write-wins, vector clocks, or custom merge logic.", topic: "Databases", difficulty: "Intermediate" },
    { id: "base-fc4", front: "BASE good fit vs bad fit example", back: "Good: a social media like counter. Bad: a bank account balance.", topic: "Databases", difficulty: "Beginner" },
    { id: "base-fc5", front: "Quorum-based reads/writes", back: "A tunable middle ground — require a majority of replicas to acknowledge, rather than all (sync) or just one (async).", topic: "Databases", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "BASE",
    sections: [
      { heading: "The three properties", items: ["Basically Available: always a response", "Soft state: state drifts/syncs over time", "Eventually consistent: replicas converge given time"] },
      { heading: "Why it exists", items: ["CAP: can't have full availability + strict consistency during a partition", "BASE names the deliberate AP-leaning choice"] },
      { heading: "Real cost", items: ["App must handle conflict resolution", "Last-write-wins, vector clocks, CRDTs", "Quorum reads/writes as tunable middle ground"] },
      { heading: "Use for / avoid for", items: ["Use: counters, feeds, carts, catalogs", "Avoid: balances, inventory needing strict correctness"] },
    ],
  },

  speedNotes: [
    "BASE = Basically Available, Soft state, Eventually consistent.",
    "Named AP-leaning alternative to ACID's CP-leaning guarantees.",
    "Requires explicit conflict resolution (last-write-wins, vector clocks).",
    "Quorum reads/writes = tunable consistency/availability middle ground.",
    "Good for counters/carts; bad for balances/strict-correctness data.",
  ],
};
