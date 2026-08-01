import type { ConceptRevisionContent } from "./types";

export const scalability: ConceptRevisionContent = {
  slug: "scalability",
  title: "Scalability",
  topic: "Fundamentals",
  difficulty: "Beginner",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Scalability", href: "/docs/fundamentals/scalability" },
    { label: "Horizontal vs Vertical Scaling", href: "/docs/fundamentals/horizontal-vs-vertical-scaling" },
  ],

  summary: [
    "Scalability is a system's ability to handle growing load — more users, data, or requests — by adding resources, ideally without a redesign or a drop in performance.",
    "Scalability isn't a single property you either have or don't — it's really about removing bottlenecks one at a time as each becomes the limiting factor.",
    "The two scaling directions are vertical (bigger machine) and horizontal (more machines) — see the dedicated comparison for that trade-off.",
    "A system can be scalable in one dimension (read traffic) and not another (write throughput to a single database) — scalability is per-bottleneck, not a single system-wide score.",
    "Statelessness is what makes horizontal scaling practical — a stateless component can have instances added or removed freely, while a stateful one needs careful data partitioning or replication first.",
    "Premature scaling investment (designing for scale you don't have yet) is itself a common mistake — scalability work should target the bottleneck that's actually about to bind, not a hypothetical future one.",
  ],

  whyAsked: [
    "It's the most direct test of whether a candidate can reason about growth over time, not just correctness at a single point in time.",
    "It reveals whether someone understands that scaling is about identifying and removing the *current* bottleneck, not applying a generic 'scale everything' pattern.",
    "It's the natural follow-up after any high-level design: \"what breaks first as this grows 100x?\"",
  ],

  thirtySecondAnswer:
    "Scalability is a system's ability to handle growing load — more users, more data, more requests — by adding resources, ideally without needing a redesign. It's not one property; it's really about finding and removing whatever the current bottleneck is, one at a time, as scale increases. The two basic levers are vertical scaling (a bigger machine) and horizontal scaling (more machines), and horizontal scaling is what most large systems rely on long-term, because it has no hard ceiling — but it only works well for components that are stateless or have been deliberately designed to partition their state.",

  detailedAnswer: [
    "Scalability means adding resources to handle more load, ideally with near-linear improvement and no redesign — real systems rarely get perfectly linear scaling, but that's the ideal being approximated.",
    "Scaling is bottleneck-driven: at any given scale, one component (a database, a single-threaded service, a network link) is the limiting factor, and scaling work targets that specific bottleneck.",
    "Vertical scaling (bigger machine) is simpler but has a hard ceiling and a single point of failure; horizontal scaling (more machines) has no hard ceiling but requires the workload to be splittable across machines.",
    "Stateless components scale horizontally trivially — just add instances behind a load balancer; stateful components (databases) need explicit strategies like replication or sharding.",
    "Scaling prematurely — investing in horizontal scaling infrastructure before it's needed — is a real cost, not a free safety margin; the right amount of scalability work matches actual near-term growth, not a hypothetical ceiling.",
  ],

  questions: [
    { id: "sc-q1", question: "What is scalability?", answer: "A system's ability to handle growing load — more users, data, or requests — by adding resources, ideally without a redesign or a drop in performance.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sc-q2", question: "Is scalability a single property a system either has or doesn't have?", answer: "No — scalability is about removing bottlenecks one at a time; a system can scale well in one dimension (reads) and poorly in another (writes to a single database).", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q3", question: "What are the two basic directions of scaling?", answer: "Vertical scaling (a bigger, more powerful machine) and horizontal scaling (more machines working together).", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sc-q4", question: "Why does horizontal scaling have no hard ceiling while vertical scaling does?", answer: "A single machine's CPU, memory, and I/O capacity is physically bounded, while horizontal scaling can, in principle, keep adding machines indefinitely.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q5", question: "What property makes a component easy to scale horizontally?", answer: "Statelessness — a stateless component can have instances added or removed freely behind a load balancer, since no instance holds data another doesn't.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q6", question: "Why is scaling a stateful component (like a database) harder than scaling a stateless one?", answer: "Its data has to be partitioned or replicated deliberately (sharding, read replicas) rather than simply adding identical instances, since each instance can't just hold an independent, interchangeable copy of everything.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q7", question: "What does it mean for scaling to be 'bottleneck-driven'?", answer: "At any given scale, one specific component is the limiting factor; scaling work should target that current bottleneck, not apply a generic 'scale everything' approach.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q8", question: "Why can premature scaling investment be a mistake?", answer: "Building horizontal-scaling infrastructure before it's actually needed adds real complexity and cost without a corresponding current requirement — scalability work should match near-term growth, not a hypothetical future ceiling.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sc-q9", question: "What's an example of a system that scales well on reads but poorly on writes?", answer: "A system with many cached read replicas behind a single primary database — reads scale by adding replicas, but every write still funnels through the one primary, which becomes the write bottleneck.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sc-q10", question: "How does a load balancer enable horizontal scaling?", answer: "It distributes incoming requests across however many stateless instances currently exist, so adding or removing instances is simply a matter of registering/deregistering them — the load balancer handles the redistribution.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q11", question: "What is 'linear scalability' and why is it an idealized target rather than the norm?", answer: "Linear scalability means doubling resources doubles capacity — in practice, coordination overhead (shared locks, network chatter between nodes) usually means returns diminish somewhat as more nodes are added.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sc-q12", question: "Why might vertical scaling be the right first move even in a system expected to grow large?", answer: "It's operationally simpler and buys time without adding distributed-systems complexity — many systems vertically scale for a while before horizontal scaling becomes necessary.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q13", question: "What's the relationship between scalability and single points of failure?", answer: "Vertical scaling concentrates capacity (and risk) in one machine, so it doesn't reduce single-point-of-failure risk; horizontal scaling, by having multiple machines, incidentally can improve fault tolerance too if designed with redundancy.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sc-q14", question: "How does caching relate to scalability?", answer: "Caching reduces load on the underlying bottleneck (often a database) by serving repeat requests from a faster layer, effectively scaling read capacity without adding database instances.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q15", question: "What's the first step in reasoning about how to scale a given system?", answer: "Identify the current bottleneck (the component that will fail first as load grows) rather than assuming which part needs scaling.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q16", question: "Why is 'add more servers' not always a valid scaling strategy on its own?", answer: "If the bottleneck is a single stateful resource (a database, a shared lock), adding more stateless application servers in front of it doesn't relieve that bottleneck at all.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sc-q17", question: "What's an example of a non-obvious scaling bottleneck?", answer: "A single-threaded background job processor, or a shared rate-limited third-party API — scaling everything else in the system won't help if this specific serial choke point remains unaddressed.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sc-q18", question: "How would you explain scalability to someone non-technical?", answer: "It's whether a system can serve 10x more customers by adding more of the same kind of resource, rather than needing to be rebuilt from scratch to handle the extra demand.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sc-q19", question: "What role does capacity estimation play in a scalability discussion?", answer: "It quantifies where the bottleneck will actually bind (e.g. the database hits its QPS limit at X users), turning 'we should scale this' into a specific, justified design decision.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-q20", question: "Why does scalability discussion usually pair with availability and reliability in interviews?", answer: "Scaling decisions (adding replicas, partitioning data) directly affect failure modes and consistency, so the three are usually reasoned about together rather than in isolation.", topic: "Fundamentals", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"What's the first bottleneck that breaks as this scales 10x? 100x?\"",
    "\"Would you scale this component vertically or horizontally, and why?\"",
    "\"How would you know it's time to scale this, before it becomes an outage?\"",
  ],

  commonMistakes: [
    "Treating scalability as a single yes/no property of the whole system rather than per-bottleneck.",
    "Reflexively proposing horizontal scaling for a stateful component without addressing how its data would be partitioned or replicated.",
    "Scaling components that aren't actually the current bottleneck.",
    "Investing in scale infrastructure far beyond what stated requirements justify.",
  ],

  interviewTraps: [
    "Being asked \"how would you scale this\" without first identifying the bottleneck is a trap — the honest first move is figuring out *what* actually needs to scale, not proposing a generic fix.",
    "An interviewer asking \"what if writes were 10x higher\" while reads stay flat is testing whether you understand scaling is dimension-specific, not a single system-wide dial.",
  ],

  tradeoffs: [
    "Vertical scaling: simpler, no distributed-systems complexity, but hard ceiling and a single point of failure.",
    "Horizontal scaling: no hard ceiling, can improve fault tolerance, but adds coordination complexity and requires statelessness or explicit data partitioning.",
    "Scaling ahead of need: safety margin vs. wasted cost and complexity for load that may never arrive.",
  ],

  decisionGuide: {
    kind: "question",
    id: "scale-root",
    question: "Is the component you need to scale stateless?",
    options: [
      {
        label: "Yes — it holds no data of its own",
        next: {
          kind: "result",
          id: "scale-stateless",
          result: "Scale horizontally — add instances behind a load balancer.",
          rationale: "Stateless components are the easiest case: no data to partition, so more instances directly means more capacity.",
        },
      },
      {
        label: "No — it holds state (e.g. a database)",
        next: {
          kind: "question",
          id: "scale-stateful",
          question: "Is the bottleneck reads, writes, or both?",
          options: [
            {
              label: "Mostly reads",
              next: {
                kind: "result",
                id: "scale-reads",
                result: "Add read replicas (and/or a cache) in front of the primary.",
                rationale: "Read replicas and caching relieve read load without touching the harder write-scaling problem.",
              },
            },
            {
              label: "Writes are the bottleneck",
              next: {
                kind: "result",
                id: "scale-writes",
                result: "Consider vertical scaling first, then sharding if that ceiling is reached.",
                rationale: "Write scaling is the genuinely hard case — sharding adds real complexity, so it's usually the last resort after vertical scaling and query optimization are exhausted.",
              },
            },
          ],
        },
      },
    ],
  },

  memoryTrick:
    "\"Scale the bottleneck, not the system.\" Before proposing any fix, name the specific component that breaks first — scalability work is always about one bottleneck at a time, never the whole system at once.",

  realWorldExamples: [
    "Many companies scale a monolith vertically for years before any horizontal scaling or sharding is introduced — vertical scaling is often the correct early answer, not a stopgap to be embarrassed about.",
    "A viral traffic spike typically doesn't uniformly stress a whole system — it usually reveals one specific under-scaled component (a database, a rate-limited dependency) as the actual failure point.",
  ],

  mermaidDiagram: `flowchart TD
    Load[Growing Load] --> Bottleneck{Identify current\nbottleneck}
    Bottleneck -->|Stateless component| Horizontal[Scale horizontally:\nadd instances]
    Bottleneck -->|Stateful component, reads| Replicas[Add read replicas / cache]
    Bottleneck -->|Stateful component, writes| Vertical[Scale vertically,\nthen shard if needed]`,

  flashcards: [
    { id: "sc-fc1", front: "Scalability — one-line definition", back: "A system's ability to handle growing load by adding resources, ideally without a redesign.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sc-fc2", front: "Vertical scaling", back: "Adding capacity by upgrading to a bigger, more powerful machine.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sc-fc3", front: "Horizontal scaling", back: "Adding capacity by adding more machines working together.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sc-fc4", front: "What property makes horizontal scaling easy?", back: "Statelessness — instances can be added/removed freely with no data to partition.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sc-fc5", front: "First step before proposing how to scale something", back: "Identify the current bottleneck — scaling is bottleneck-driven, not system-wide.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Scalability",
    sections: [
      { heading: "Two directions", items: ["Vertical: bigger machine, hard ceiling", "Horizontal: more machines, no hard ceiling"] },
      { heading: "Easy to scale", items: ["Stateless services (add instances)", "Reads (replicas, caching)"] },
      { heading: "Hard to scale", items: ["Stateful writes (needs sharding)", "Single-threaded bottlenecks"] },
      { heading: "Golden rule", items: ["Scale the current bottleneck, not the whole system", "Match scale investment to actual near-term growth"] },
    ],
  },

  speedNotes: [
    "Scalability = handle more load by adding resources, no redesign.",
    "Vertical = bigger machine (ceiling exists). Horizontal = more machines (no hard ceiling).",
    "Stateless → scales horizontally trivially. Stateful → needs replication/sharding.",
    "Always scale-per-bottleneck, never the whole system generically.",
    "Reads scale easier than writes (replicas/cache vs. sharding).",
  ],
};
