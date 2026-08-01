import type { ConceptRevisionContent } from "./types";

export const readReplicas: ConceptRevisionContent = {
  slug: "read-replicas",
  title: "Read Replicas",
  topic: "Databases",
  difficulty: "Beginner",
  estimatedMinutes: 8,

  docLinks: [
    { label: "Read Replicas", href: "/docs/databases/read-replicas" },
    { label: "Replication", href: "/docs/databases/replication" },
  ],

  summary: [
    "A read replica is a copy of a database, kept in sync via replication, used specifically to serve read queries and offload read traffic from the primary.",
    "It exploits the fact that most applications are read-heavy: since reads don't modify data, many independent copies can serve reads in parallel with no coordination needed between them.",
    "Writes always go to the primary; reads can go to the primary or to any read replica — usually via a load balancer or simple application-level routing logic.",
    "It's close to a 'free win' for read-heavy workloads — little downside beyond handling replication lag — but it does nothing for write-throughput scaling.",
    "It introduces the read-your-writes problem: a user's read immediately following their own write can hit a replica that hasn't caught up, appearing to show stale or reverted data.",
    "It also usefully isolates expensive analytics/reporting queries onto a dedicated replica, so they don't compete with the primary's transactional workload.",
  ],

  whyAsked: [
    "It's one of the lowest-friction, highest-value scaling patterns, so interviewers check candidates reach for it before something heavier like sharding.",
    "The read-your-writes bug is a very concrete, realistic follow-up that tests whether a candidate has actually reasoned through the consequence of replication lag.",
    "It checks whether a candidate correctly separates 'read scaling' from 'write scaling' — a common point of confusion.",
  ],

  thirtySecondAnswer:
    "A read replica is a copy of a database, kept in sync via replication, used specifically to handle read traffic — writes always go to the primary, while reads can be spread across the primary and any number of read replicas. It works because most applications are read-heavy, and unlike writes, reads don't need to coordinate with each other, so adding more replicas straightforwardly adds more read capacity. It's close to a free win for read-heavy workloads, well-supported by every major managed database with one-click provisioning, but it does nothing for write throughput — that's what sharding is for. The real practical cost is the read-your-writes problem: since replicas are usually updated asynchronously, a user who writes and then immediately reads can hit a replica that hasn't caught up yet, making their own successful update look like it silently reverted.",

  detailedAnswer: [
    "Writes go to the primary; reads can be routed to the primary or any read replica, spreading read load horizontally.",
    "Exploits the read-heavy nature of most applications — reads don't need coordination, so more replicas straightforwardly means more read capacity.",
    "Well-supported, low-friction pattern: most managed databases (RDS, Cloud SQL) offer one-click read replica provisioning.",
    "Introduces the read-your-writes problem via asynchronous replication lag — fixed by routing a user's own immediate post-write reads back to the primary.",
    "Does nothing for write-throughput scaling — that requires a different technique (sharding), regardless of how many read replicas exist.",
    "Also useful for isolating expensive analytics/reporting queries onto a dedicated replica, protecting the primary's transactional performance.",
  ],

  questions: [
    { id: "rr-q1", question: "What is a read replica, in one sentence?", answer: "A copy of a database, kept in sync via replication, used specifically to serve read queries and offload read traffic from the primary.", topic: "Databases", difficulty: "Beginner" },
    { id: "rr-q2", question: "Why do read replicas work so well for scaling reads specifically?", answer: "Reads don't modify data, so many independent copies can each serve reads in parallel without needing to coordinate with each other, unlike writes.", topic: "Databases", difficulty: "Beginner" },
    { id: "rr-q3", question: "Where do writes go in a read-replica setup?", answer: "Always to the primary — read replicas never accept writes directly in a standard leader-follower setup.", topic: "Databases", difficulty: "Beginner" },
    { id: "rr-q4", question: "Do read replicas help scale write throughput?", answer: "No — write throughput is still bottlenecked by the single primary; read replicas only add read capacity. Sharding is the relevant technique for write scaling.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q5", question: "What is the read-your-writes problem?", answer: "A user writes data, immediately reads it back, and that read is routed to a replica that hasn't caught up yet — making the update appear to have silently failed or reverted.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q6", question: "How is the read-your-writes problem commonly fixed?", answer: "Route a user's own immediate post-write reads back to the primary (or a replica confirmed to be caught up) for a short window, or track a version/timestamp token to ensure a replica has caught up before serving that read.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q7", question: "Why are read replicas usually kept up to date asynchronously?", answer: "Asynchronous replication is faster and doesn't block the primary's writes waiting for replica confirmation — the trade-off is the resulting replication lag.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q8", question: "What's a good use case for a dedicated read replica beyond general read scaling?", answer: "Isolating expensive analytics or reporting queries onto their own replica, so they don't compete with the primary's regular transactional workload.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q9", question: "How does an application decide whether to route a specific read to a replica or the primary?", answer: "Based on freshness requirements — reads that must reflect the very latest write (especially the user's own) go to the primary; reads that can tolerate slight staleness go to a replica.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q10", question: "What's a common mistake with read replica routing?", answer: "Routing every read to a replica by default without considering the read-your-writes problem for reads that need to reflect a very recent write.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q11", question: "What operational metric should be actively monitored with read replicas?", answer: "Replication lag — if a replica falls significantly behind (slow disk, high write volume), reads routed to it could be surprisingly stale.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q12", question: "Are read replicas a side benefit for availability too?", answer: "Yes — since data exists on multiple machines, losing the primary doesn't necessarily lose the data, and a replica can potentially be promoted to primary.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q13", question: "How does adding read replicas compare in complexity to sharding?", answer: "Adding read replicas is usually a modest, well-supported configuration change on most managed platforms; sharding requires a routing layer, careful shard-key choice, and much harder cross-node query logic.", topic: "Databases", difficulty: "Advanced" },
    { id: "rr-q14", question: "What's the real complexity in adopting read replicas, if the infrastructure setup itself is simple?", answer: "The application-layer decision of which specific reads can tolerate potential staleness (route to a replica) versus which need the absolute latest data (route to the primary).", topic: "Databases", difficulty: "Advanced" },
    { id: "rr-q15", question: "If write load — not read load — is the actual bottleneck, do read replicas help?", answer: "No — they do nothing for write throughput; that scenario calls for sharding or a different write architecture entirely.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q16", question: "What's a real production example of read replicas?", answer: "Nearly every major managed database service (AWS RDS, Google Cloud SQL, Azure Database) offers one-click read replica provisioning, reflecting how broadly applicable this pattern is.", topic: "Databases", difficulty: "Beginner" },
    { id: "rr-q17", question: "In a URL shortener design, what role would read replicas play?", answer: "They'd absorb the portion of redirect (read) traffic that misses the cache, freeing the primary database to handle new-link-creation writes without competing read load.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q18", question: "Is adding a read replica ever the wrong move?", answer: "It's rarely harmful for a read-heavy workload, but it's the wrong tool if the actual problem is write throughput — adding replicas there just adds infrastructure cost without addressing the bottleneck.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-q19", question: "How would you explain read replicas with a library analogy?", answer: "Like a library keeping several photocopies of a popular book so many patrons can read simultaneously — only the original (primary) can be written in, but any copy can be read without waiting.", topic: "Databases", difficulty: "Beginner" },
    { id: "rr-q20", question: "Why might a system need both read replicas and sharding eventually?", answer: "Because they solve different bottlenecks — read replicas scale read throughput, sharding scales write throughput and total data volume — a system that outgrows both dimensions may need both techniques simultaneously.", topic: "Databases", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"How would you decide which reads should go to a replica vs. the primary?\"",
    "\"A user updates their profile and immediately doesn't see the change — what's likely happening?\"",
    "\"Do read replicas help scale write throughput? Why or why not?\"",
  ],

  commonMistakes: [
    "Routing every read to a replica by default without considering the read-your-writes problem.",
    "Expecting read replicas to help with write scaling — a different problem entirely, solved by sharding.",
    "Not monitoring replication lag as a first-class operational metric.",
  ],

  interviewTraps: [
    "\"Just add more read replicas\" for a write-throughput problem is a trap — the honest answer is that they don't help there at all.",
    "Being asked about the 'my update disappeared' bug is testing whether you connect it to replication lag, not a generic 'the database is broken' answer.",
  ],

  tradeoffs: [
    "Close to a 'free win' for read scaling, but does nothing for write-throughput or total-storage scaling.",
    "Simple to provision, but the application-layer decision of which reads can tolerate staleness is the real remaining complexity.",
  ],

  comparisonTable: {
    title: "Read Replicas vs Sharding",
    columns: ["Read Replicas", "Sharding"],
    rows: [
      { label: "Scales", values: ["Read throughput", "Write throughput and total data volume"] },
      { label: "Data per node", values: ["Full copy of all data", "A subset (shard) of the data"] },
      { label: "Setup complexity", values: ["Low — often one-click on managed DBs", "High — routing layer, shard key design"] },
      { label: "Key risk", values: ["Read-your-writes staleness", "Hot shards, cross-shard queries, rebalancing"] },
    ],
  },

  memoryTrick:
    "\"Read replicas are library photocopies.\" Only the original gets written in, but any photocopy can be read by anyone, simultaneously, with no waiting.",

  realWorldExamples: [
    "AWS RDS and Google Cloud SQL offer one-click read replica provisioning, reflecting how standard and low-friction this pattern has become.",
    "A URL shortener's read replicas absorb cache-miss redirect traffic, leaving the primary free to handle link-creation writes.",
  ],

  mermaidDiagram: `flowchart TD
    App[Application] -->|writes| Primary[(Primary)]
    App -->|reads| RR1[(Read Replica 1)]
    App -->|reads| RR2[(Read Replica 2)]
    Primary -.replicates.-> RR1
    Primary -.replicates.-> RR2`,

  flashcards: [
    { id: "rr-fc1", front: "Read replica — one-line definition", back: "A synced copy of a database used specifically to serve read queries.", topic: "Databases", difficulty: "Beginner" },
    { id: "rr-fc2", front: "Do read replicas scale writes?", back: "No — writes still go to the primary; replicas only add read capacity.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-fc3", front: "Read-your-writes problem", back: "A user's post-write read hits a lagging replica, appearing to show reverted data.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-fc4", front: "Fix for read-your-writes", back: "Route the user's own immediate post-write reads back to the primary.", topic: "Databases", difficulty: "Intermediate" },
    { id: "rr-fc5", front: "Extra use for a dedicated replica", back: "Isolating expensive analytics/reporting queries from the primary's transactional load.", topic: "Databases", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Read Replicas",
    sections: [
      { heading: "Core idea", items: ["Copy of DB, synced via replication", "Writes → primary, reads → primary or replicas"] },
      { heading: "Benefits", items: ["Scales read throughput", "Side benefit: durability/availability", "Isolate analytics queries"] },
      { heading: "Watch for", items: ["Read-your-writes staleness", "Monitor replication lag"] },
      { heading: "Doesn't solve", items: ["Write-throughput scaling (→ sharding)"] },
    ],
  },

  speedNotes: [
    "Read replica = synced DB copy, serves reads only.",
    "Writes always go to the primary.",
    "Scales reads, not writes — sharding handles writes.",
    "Read-your-writes bug: post-write read hits a lagging replica.",
    "Monitor replication lag; route freshness-critical reads to primary.",
  ],
};
