import type { ConceptRevisionContent } from "./types";

export const horizontalVsVerticalScaling: ConceptRevisionContent = {
  slug: "horizontal-vs-vertical-scaling",
  title: "Horizontal vs Vertical Scaling",
  topic: "Fundamentals",
  difficulty: "Beginner",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Horizontal vs Vertical Scaling", href: "/docs/fundamentals/horizontal-vs-vertical-scaling" },
    { label: "Scalability", href: "/docs/fundamentals/scalability" },
  ],

  summary: [
    "Vertical scaling (\"scaling up\") increases capacity by making a single machine more powerful — more CPU, RAM, faster storage.",
    "Horizontal scaling (\"scaling out\") increases capacity by adding more machines and distributing work across them.",
    "Vertical scaling is operationally simpler (no distributed-systems complexity) but has a hard physical ceiling and remains a single point of failure.",
    "Horizontal scaling has no hard ceiling and can improve fault tolerance, but requires the workload to be splittable — statelessness for easy cases, sharding/replication for stateful ones.",
    "Most real systems do both over their lifetime: vertical scaling first (simple, buys time), horizontal scaling later (once vertical limits or single-point-of-failure risk become the actual constraint).",
    "The decision isn't permanent or exclusive — it's revisited as bottlenecks shift, and different components of the same system often scale differently (a stateless API tier horizontally, a database vertically for longer).",
  ],

  whyAsked: [
    "It's a fast, concrete way to check whether a candidate understands the actual mechanics behind \"scale this\" rather than just using the word.",
    "It surfaces whether someone understands that the choice depends on whether a component is stateless or stateful.",
    "It's a natural setup for deeper questions about sharding, replication, and load balancing.",
  ],

  thirtySecondAnswer:
    "Vertical scaling means making a single machine bigger — more CPU, RAM, faster disks. Horizontal scaling means adding more machines and splitting the work across them. Vertical scaling is simpler operationally but has a hard ceiling — you eventually run out of bigger machines to buy — and that one machine remains a single point of failure. Horizontal scaling has no hard ceiling and can improve fault tolerance, but it only works cleanly for components that are stateless, or stateful components that have been deliberately designed to partition their data, like through sharding or replication. Most real systems use both over their lifetime — vertical scaling early because it's simple and buys time, horizontal scaling later once the vertical ceiling or single-point-of-failure risk actually becomes the binding constraint.",

  detailedAnswer: [
    "Vertical scaling: upgrade the machine itself — more cores, more memory, faster storage. Simple, no architecture change needed, but bounded by the biggest machine available and remains a single point of failure.",
    "Horizontal scaling: add more machines and distribute load — via a load balancer for stateless components, or sharding/replication for stateful ones. No hard ceiling, but real coordination complexity.",
    "Statelessness is the key enabler for easy horizontal scaling — a stateless instance can be added or removed freely; a stateful one (a database) needs an explicit data-partitioning strategy first.",
    "The two aren't mutually exclusive: a system can vertically scale a database while horizontally scaling its stateless application tier — the right choice is per-component, not system-wide.",
    "The decision point for moving from vertical to horizontal is usually driven by either hitting a practical ceiling (biggest available machine still isn't enough) or needing redundancy that a single machine, however powerful, can't provide.",
  ],

  questions: [
    { id: "hv-q1", question: "What is vertical scaling?", answer: "Increasing capacity by making a single machine more powerful — more CPU, RAM, or faster storage.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "hv-q2", question: "What is horizontal scaling?", answer: "Increasing capacity by adding more machines and distributing work across them.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "hv-q3", question: "What's the main limitation of vertical scaling?", answer: "It has a hard ceiling — there's always a biggest available machine — and that single machine remains a single point of failure.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "hv-q4", question: "Why does horizontal scaling have no hard ceiling?", answer: "In principle, more machines can always be added, unlike a single machine's physically bounded capacity.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "hv-q5", question: "What property makes a component easy to scale horizontally?", answer: "Statelessness — a stateless instance holds no unique data, so instances can be added or removed freely behind a load balancer.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q6", question: "Why is horizontal scaling harder for a stateful component like a database?", answer: "Its data needs to be deliberately partitioned (sharding) or replicated across instances — you can't just add an identical, interchangeable instance the way you can for a stateless service.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q7", question: "Why might vertical scaling be the right first choice even for a system expected to grow large?", answer: "It's operationally simple and requires no architectural change, buying time before the real complexity of horizontal scaling (sharding, distributed coordination) becomes necessary.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q8", question: "Can horizontal scaling improve fault tolerance?", answer: "Yes, incidentally — having multiple machines means one failing doesn't necessarily take down the whole system, unlike vertical scaling's single powerful machine, which remains a single point of failure.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q9", question: "Do horizontal and vertical scaling have to be an either/or choice for a whole system?", answer: "No — different components of the same system often scale differently; a stateless API tier might scale horizontally while its database scales vertically for longer before sharding becomes necessary.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "hv-q10", question: "What operational complexity does horizontal scaling introduce that vertical scaling avoids?", answer: "Load balancing, service discovery, data partitioning/replication for stateful components, and reasoning about network calls between nodes that didn't exist within a single machine.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q11", question: "What's a typical trigger for moving from vertical to horizontal scaling?", answer: "Either hitting the practical ceiling of available machine size, or needing redundancy/fault tolerance that a single machine can't provide regardless of its power.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q12", question: "How does cost typically compare between the two as scale grows?", answer: "The biggest available machines carry a steep price premium relative to their capacity gain; horizontally, cost tends to scale more linearly with many commodity machines, though it adds operational overhead cost.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "hv-q13", question: "Why doesn't vertical scaling improve availability?", answer: "It concentrates capacity in a single machine — that machine is still a single point of failure regardless of how powerful it is; scaling up doesn't add redundancy.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q14", question: "What's an example of a component that's naturally easy to scale horizontally?", answer: "A stateless web/API server — any instance can handle any request, so a load balancer can distribute traffic across as many instances as needed.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "hv-q15", question: "What's an example of a component that's hard to scale horizontally?", answer: "A single primary relational database handling all writes — writes can't simply be split across instances without a deliberate sharding strategy, since each shard would need to own a distinct slice of the data.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q16", question: "How would you explain the choice between horizontal and vertical scaling to a non-technical stakeholder?", answer: "Vertical scaling is like hiring one much stronger worker; horizontal scaling is like hiring more workers and splitting the job — more workers has no real limit, but coordinating them takes more management overhead.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "hv-q17", question: "Why is downtime often a bigger concern with vertical scaling in practice?", answer: "Upgrading a single machine (more RAM, a bigger instance type) frequently requires a restart or migration window, whereas horizontal scaling can add capacity without touching existing running instances.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "hv-q18", question: "What's a common mistake when deciding between horizontal and vertical scaling in an interview?", answer: "Defaulting to \"just scale horizontally\" reflexively without checking whether the component in question is stateless (easy) or stateful (requires a real data-partitioning strategy first).", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "hv-q19", question: "How does horizontal scaling relate to sharding?", answer: "Sharding is how horizontal scaling is achieved for stateful components — splitting data across multiple database instances so each holds only a portion, rather than replicating the entire dataset everywhere.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-q20", question: "Summarize horizontal vs. vertical scaling in one sentence.", answer: "Vertical scaling makes one machine bigger (simple, hard ceiling, single point of failure); horizontal scaling adds more machines (no hard ceiling, better fault tolerance, more coordination complexity).", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Is this component stateless or stateful, and how does that change your answer?\"",
    "\"At what point would you switch from vertical to horizontal scaling here?\"",
    "\"What's the operational cost of the horizontal scaling approach you just proposed?\"",
  ],

  commonMistakes: [
    "Reflexively proposing horizontal scaling without checking whether the component is stateless or stateful.",
    "Treating the choice as system-wide and permanent, rather than per-component and revisited over time.",
    "Assuming vertical scaling improves fault tolerance (it doesn't — it's still a single point of failure).",
    "Underestimating the coordination complexity horizontal scaling adds for stateful components.",
  ],

  interviewTraps: [
    "\"Just scale it horizontally\" as a reflexive answer for a stateful bottleneck (like a single database) is a trap — the honest answer addresses how the data would actually be partitioned first.",
    "Being asked \"does making the machine bigger help with reliability\" is testing whether you know vertical scaling doesn't address single-point-of-failure risk at all.",
  ],

  tradeoffs: [
    "Vertical: simpler, no architecture change, but hard ceiling and remains a single point of failure.",
    "Horizontal: no hard ceiling, can improve fault tolerance, but adds load balancing, data partitioning, and distributed coordination complexity.",
    "Cost: vertical scaling has a steep price premium for the biggest machines; horizontal scaling trades that for higher operational/coordination overhead.",
  ],

  comparisonTable: {
    title: "Horizontal vs Vertical Scaling",
    columns: ["Vertical Scaling", "Horizontal Scaling"],
    rows: [
      { label: "How", values: ["Bigger machine", "More machines"] },
      { label: "Ceiling", values: ["Hard limit (biggest machine)", "No hard limit"] },
      { label: "Single point of failure?", values: ["Yes — still one machine", "No — multiple machines"] },
      { label: "Complexity", values: ["Low — no architecture change", "Higher — load balancing, data partitioning"] },
      { label: "Best for", values: ["Simple systems, buying time early", "Long-term scale, fault tolerance"] },
      { label: "Works easily for", values: ["Any component", "Stateless components (stateful needs sharding)"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "hv-root",
    question: "Is the component you're scaling stateless?",
    options: [
      {
        label: "Yes",
        next: {
          kind: "result",
          id: "hv-stateless-result",
          result: "Scale horizontally — add instances behind a load balancer.",
          rationale: "Stateless components are the easy case for horizontal scaling — no data-partitioning problem to solve.",
        },
      },
      {
        label: "No — it holds state",
        next: {
          kind: "question",
          id: "hv-stateful-q",
          question: "Have you already hit a practical vertical scaling ceiling, or need redundancy?",
          options: [
            {
              label: "Not yet — still room to grow vertically",
              next: {
                kind: "result",
                id: "hv-vertical-result",
                result: "Scale vertically for now — simpler, and defers the real complexity of sharding.",
                rationale: "Vertical scaling buys time without introducing distributed-systems complexity before it's actually needed.",
              },
            },
            {
              label: "Yes — hit the ceiling, or need fault tolerance",
              next: {
                kind: "result",
                id: "hv-shard-result",
                result: "Introduce sharding and/or read replicas — horizontal scaling for stateful data.",
                rationale: "This is the point where the real complexity of horizontal scaling for stateful components becomes justified by an actual, present constraint.",
              },
            },
          ],
        },
      },
    ],
  },

  memoryTrick:
    "\"Up vs. Out\" — Vertical = scale UP (bigger machine, one box, hard ceiling). Horizontal = scale OUT (more boxes, no hard ceiling, but coordination cost).",

  realWorldExamples: [
    "Many startups run comfortably on a single, powerful vertically-scaled database for years before any sharding is introduced — vertical-first is often the correct, not lazy, choice.",
    "Stateless web tiers at large companies routinely run hundreds or thousands of horizontally scaled instances behind load balancers, while their core transactional database might still be a single, very large vertically-scaled instance with read replicas.",
  ],

  mermaidDiagram: `flowchart LR
    subgraph Vertical["Vertical Scaling"]
    Small[Small Machine] --> Big[Bigger Machine]
    end
    subgraph Horizontal["Horizontal Scaling"]
    One[Machine] --> Many["Machine + Machine + Machine..."]
    end`,

  flashcards: [
    { id: "hv-fc1", front: "Vertical scaling", back: "Making a single machine more powerful (more CPU/RAM/storage).", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "hv-fc2", front: "Horizontal scaling", back: "Adding more machines and distributing work across them.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "hv-fc3", front: "Does vertical scaling improve fault tolerance?", back: "No — it's still a single point of failure, just a more powerful one.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-fc4", front: "What makes horizontal scaling easy vs. hard?", back: "Easy for stateless components; hard for stateful ones without explicit sharding/replication.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "hv-fc5", front: "Typical real-world pattern", back: "Vertical scale first (simple, buys time), horizontal scale later (once ceiling or redundancy need hits).", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Horizontal vs Vertical Scaling",
    sections: [
      { heading: "Vertical (up)", items: ["Bigger machine", "Simple, no arch change", "Hard ceiling", "Still single point of failure"] },
      { heading: "Horizontal (out)", items: ["More machines", "No hard ceiling", "Improves fault tolerance", "Needs LB / sharding / statelessness"] },
      { heading: "Decision cue", items: ["Stateless → horizontal is easy", "Stateful → shard/replicate first", "Different components can scale differently"] },
    ],
  },

  speedNotes: [
    "Vertical = bigger machine. Horizontal = more machines.",
    "Vertical: simple, hard ceiling, still a single point of failure.",
    "Horizontal: no hard ceiling, better fault tolerance, more complexity.",
    "Stateless → horizontal is easy. Stateful → needs sharding/replication.",
    "Not either/or system-wide — different components scale differently.",
  ],
};
