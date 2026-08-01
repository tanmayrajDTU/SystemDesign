import type { ConceptRevisionContent } from "./types";

export const replication: ConceptRevisionContent = {
  slug: "replication",
  title: "Replication",
  topic: "Databases",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Replication", href: "/docs/databases/replication" },
    { label: "Leader-Follower", href: "/docs/databases/leader-follower" },
    { label: "Multi-leader", href: "/docs/databases/multi-leader" },
  ],

  summary: [
    "Replication keeps copies of the same data on multiple machines (replicas), so reads can be served from any of them and the data survives the failure of any single machine.",
    "It solves two problems at once: read-throughput scaling (many machines can each serve reads) and durability/availability (losing one machine doesn't lose the data or all uptime).",
    "The core trade-off is synchronous vs. asynchronous: synchronous waits for a replica to confirm before acknowledging a write (consistent, slower, less available); asynchronous acknowledges immediately and propagates in the background (fast, but a replica can briefly lag and an unpropagated write can be lost on primary failure).",
    "Replication lag — the gap between a write landing on the primary and becoming visible on a replica — is the direct, everyday manifestation of the PACELC trade-off in production systems.",
    "The classic bug it creates: a user writes, immediately reads, and that read hits a lagging replica — looking like their update silently reverted.",
    "Failover (promoting a replica when the primary dies) needs careful, tested automation — done manually under pressure, it risks data loss or two nodes both believing they're primary ('split brain').",
  ],

  whyAsked: [
    "It's close to a default expectation for any production database, so interviewers check candidates reach for it and can explain the sync/async trade-off concretely.",
    "The read-your-writes bug is a very common, realistic follow-up to see if a candidate has actually hit this in practice, not just memorized the term.",
    "It's the natural entry point into read replicas, leader-follower vs multi-leader topologies, and eventually sharding.",
  ],

  thirtySecondAnswer:
    "Replication keeps copies of the same data on multiple machines, so reads can be spread across many of them and the data survives any single machine's failure. Typically one primary (leader) accepts writes, and those writes propagate to one or more replicas (followers), which can serve reads and be promoted if the primary fails. The central trade-off is synchronous replication, which waits for a replica to confirm before acknowledging the write — safer but slower and less available if that replica is slow — versus asynchronous replication, which acknowledges immediately and replicates in the background — faster, but replicas can briefly lag, and an acknowledged write can be lost entirely if the primary fails before it propagates. That lag is the direct, everyday version of the PACELC trade-off, and it's exactly what causes the classic bug where a user updates something, immediately reloads, and briefly sees stale data because their read hit a replica that hadn't caught up yet.",

  detailedAnswer: [
    "One primary accepts writes; replicas receive propagated changes and can serve reads (and be promoted on primary failure).",
    "Synchronous replication: consistent, but adds write latency and can reduce availability if a required replica is slow/down.",
    "Asynchronous replication: fast writes, but introduces replication lag and risks losing an acknowledged write if the primary fails before it propagates.",
    "Replication lag directly causes the 'read-your-writes' bug — commonly fixed by routing a user's own immediate post-write reads back to the primary.",
    "Failover must be automated and tested in advance — manual, improvised failover during a real incident risks data loss or split-brain.",
    "Solves read scaling and availability/durability; for write-throughput or total-data-volume scaling, sharding is the relevant technique instead.",
  ],

  questions: [
    { id: "repl-q1", question: "What is replication, in one sentence?", answer: "Keeping copies of the same data on multiple machines, so reads can be served from any of them and the data survives a single machine's failure.", topic: "Databases", difficulty: "Beginner" },
    { id: "repl-q2", question: "What two problems does replication solve simultaneously?", answer: "Read-throughput scaling (multiple machines can each serve reads) and durability/availability (data survives, and service continues, if one machine fails).", topic: "Databases", difficulty: "Beginner" },
    { id: "repl-q3", question: "What's the difference between synchronous and asynchronous replication?", answer: "Synchronous waits for a replica to confirm the write before acknowledging success to the client; asynchronous acknowledges immediately and propagates to replicas in the background.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-q4", question: "What's the risk of asynchronous replication specifically?", answer: "If the primary fails immediately after acknowledging a write but before it propagates to any replica, that write can be lost entirely.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-q5", question: "What's the cost of synchronous replication?", answer: "Added write latency (waiting for replica confirmation), and potential unavailability if the required replica is slow or unreachable.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-q6", question: "What is replication lag?", answer: "The delay between a write completing on the primary and that write becoming visible on a given replica — inherent to asynchronous replication.", topic: "Databases", difficulty: "Beginner" },
    { id: "repl-q7", question: "Describe the classic replication-lag bug.", answer: "A user writes data, immediately reads it back, and that read is routed to a replica that hasn't caught up yet — making a successful write look like it silently reverted.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-q8", question: "How is the read-your-writes problem commonly fixed?", answer: "Route a user's own immediate post-write reads back to the primary (or a replica known to be caught up) for a short window after their write.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-q9", question: "How does replication lag relate to the PACELC trade-off?", answer: "It's a direct, everyday manifestation of it: favoring lower write latency (async replication) means occasionally reading stale data from a lagging replica.", topic: "Databases", difficulty: "Advanced" },
    { id: "repl-q10", question: "What is failover, in the context of replication?", answer: "Promoting a replica to become the new primary when the original primary fails, so writes can resume.", topic: "Databases", difficulty: "Beginner" },
    { id: "repl-q11", question: "Why is untested, manual failover risky?", answer: "Doing it under pressure during a real outage increases the risk of data loss, or of two nodes both believing they're the primary at once ('split brain').", topic: "Databases", difficulty: "Advanced" },
    { id: "repl-q12", question: "What's the difference between leader-follower and multi-leader replication?", answer: "Leader-follower has a single node accepting writes with others following; multi-leader allows more than one node to accept writes, introducing genuinely hard conflict-resolution problems when the same data is written differently on two leaders.", topic: "Databases", difficulty: "Advanced" },
    { id: "repl-q13", question: "When might multi-leader replication actually be needed?", answer: "When writes genuinely need to be accepted in multiple geographic regions simultaneously — a real, measured requirement, not a default choice, given the conflict-resolution complexity it introduces.", topic: "Databases", difficulty: "Advanced" },
    { id: "repl-q14", question: "Does replication help scale write throughput?", answer: "No — all writes still go through the primary (in leader-follower setups); replication scales reads and improves durability/availability, not write throughput. Sharding is the relevant technique for that.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-q15", question: "What's a common mistake with replication in application logic?", answer: "Not accounting for replication lag, causing user-visible bugs like data appearing to revert right after being saved.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-q16", question: "Is an acknowledged asynchronous write guaranteed to be durable?", answer: "Not necessarily — it's only truly durable once it has propagated to at least one replica; a primary failure before that point can lose it despite the client having received a success response.", topic: "Databases", difficulty: "Advanced" },
    { id: "repl-q17", question: "When is a single, unreplicated database instance acceptable?", answer: "Early-stage systems with very low traffic and low availability requirements, where regular backups may be sufficient temporarily — though this isn't a long-term production posture.", topic: "Databases", difficulty: "Beginner" },
    { id: "repl-q18", question: "How would you decide whether to use synchronous or asynchronous replication for a given piece of data?", answer: "Based on how costly staleness is versus how costly added write latency is for that specific data — e.g. financial balances may justify sync replication's latency cost, while a social feed's like count may not.", topic: "Databases", difficulty: "Advanced" },
    { id: "repl-q19", question: "What's a real production example of replication's ubiquity?", answer: "Most managed database services (AWS RDS, Google Cloud SQL) offer built-in read replica support and automated failover specifically because replication is a standard, expected requirement, not a specialized feature.", topic: "Databases", difficulty: "Beginner" },
    { id: "repl-q20", question: "Why should failover be tested regularly, not just configured once?", answer: "An untested failover process can fail exactly when it's needed most — regular testing (not just configuration) ensures promoting a replica during a real incident is a well-rehearsed, automated process.", topic: "Databases", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"What happens to an in-flight write if the primary fails right after acknowledging it, under asynchronous replication?\"",
    "\"How would you fix a user seeing stale data immediately after their own write?\"",
    "\"Walk me through your failover process if the primary database goes down.\"",
  ],

  commonMistakes: [
    "Not accounting for replication lag in application logic, causing user-visible 'my update reverted' bugs.",
    "Treating asynchronous replication as equivalent to synchronous for durability — an acknowledged async write can still be lost.",
    "Not having a tested, automated failover process, relying on risky manual promotion during a real incident.",
  ],

  interviewTraps: [
    "\"Just use asynchronous replication, it's faster\" without mentioning the durability risk is a trap — the honest answer names the trade-off explicitly.",
    "Being asked if replication scales writes is testing whether you know it doesn't — that's sharding's job.",
  ],

  tradeoffs: [
    "Synchronous replication: stronger consistency, higher write latency, lower availability if a replica is slow.",
    "Asynchronous replication: lower write latency, higher availability, but replication lag and risk of losing an acknowledged write.",
  ],

  decisionGuide: {
    kind: "question",
    id: "repl-root",
    question: "What problem are you actually trying to solve?",
    options: [
      {
        label: "Scaling read throughput",
        next: {
          kind: "result",
          id: "repl-choose-rr",
          result: "Use Read Replicas.",
          rationale: "Read replicas are built specifically to offload read traffic from the primary — a low-friction, high-value pattern for read-heavy workloads.",
        },
      },
      {
        label: "Improving availability/durability (surviving a machine failure)",
        next: {
          kind: "result",
          id: "repl-choose-lf",
          result: "Use Leader-Follower replication with automated, tested failover.",
          rationale: "A well-supported, standard setup in most databases — replicas can be promoted if the primary fails, minimizing downtime and data loss.",
        },
      },
      {
        label: "Scaling write throughput or total data volume",
        next: {
          kind: "result",
          id: "repl-choose-shard",
          result: "Replication alone won't help — you need Sharding.",
          rationale: "Every replica in a leader-follower setup still funnels writes through one primary; only splitting the data itself across machines (sharding) scales write throughput and storage past a single machine's limits.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Sync trades speed for certainty, async trades certainty for speed.\" One waits for confirmation before saying 'done'; the other says 'done' and hopes the confirmation catches up.",

  realWorldExamples: [
    "In a URL shortener design, read replicas absorb the cache-miss portion of redirect read traffic, leaving the primary free to handle link-creation writes.",
    "Most managed database services (AWS RDS, Google Cloud SQL) offer built-in read replica support and automated failover as a standard, one-click feature.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant Client
    participant Primary
    participant Replica
    Client->>Primary: WRITE x=5
    alt synchronous
        Primary->>Replica: replicate x=5
        Replica-->>Primary: ack
        Primary-->>Client: success
    else asynchronous
        Primary-->>Client: success (immediately)
        Primary->>Replica: replicate x=5 (in background)
    end`,

  flashcards: [
    { id: "repl-fc1", front: "Replication — one-line definition", back: "Keeping copies of the same data on multiple machines for read scaling and durability/availability.", topic: "Databases", difficulty: "Beginner" },
    { id: "repl-fc2", front: "Sync vs async replication", back: "Sync: waits for replica confirmation (consistent, slower). Async: acknowledges immediately (fast, replicas can lag).", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-fc3", front: "Read-your-writes problem", back: "A user's read hits a lagging replica right after their own write, briefly seeing stale data.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-fc4", front: "Does replication scale writes?", back: "No — writes still go through one primary; sharding is needed for write-throughput scaling.", topic: "Databases", difficulty: "Intermediate" },
    { id: "repl-fc5", front: "Why must failover be tested, not just configured?", back: "Untested manual failover under pressure risks data loss or split-brain during a real incident.", topic: "Databases", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Replication",
    sections: [
      { heading: "Core idea", items: ["Copies of data on multiple machines", "Primary/leader accepts writes", "Replicas/followers serve reads, can be promoted"] },
      { heading: "Sync vs Async", items: ["Sync: consistent, slower, less available", "Async: fast, replication lag, risk of lost writes"] },
      { heading: "Watch for", items: ["Read-your-writes bug", "Untested failover / split-brain risk"] },
      { heading: "Solves / doesn't solve", items: ["Solves: read scaling, availability, durability", "Doesn't solve: write-throughput scaling (→ sharding)"] },
    ],
  },

  speedNotes: [
    "Replication = copies of data on multiple machines.",
    "Sync = consistent but slower; async = fast but can lag/lose writes.",
    "Replication lag → classic read-your-writes bug.",
    "Doesn't scale writes — that's sharding's job.",
    "Automate and test failover — don't improvise during an outage.",
  ],
};
