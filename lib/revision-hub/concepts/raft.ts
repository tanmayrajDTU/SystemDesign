import type { ConceptRevisionContent } from "./types";

export const raft: ConceptRevisionContent = {
  slug: "raft",
  title: "Raft Consensus Algorithm",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Raft Algorithm", href: "/docs/distributed-systems/raft" },
    { label: "Consensus Overview", href: "/docs/distributed-systems/consensus" }
  ],
  summary: [
    "Raft is a distributed consensus algorithm designed to be easy to understand.",
    "It separates consensus into three subproblems: Leader Election, Log Replication, and Safety.",
    "In Raft, time is divided into terms, and there is at most one leader per term.",
    "The leader accepts log entries from clients and replicates them to follower nodes.",
    "If a leader fails, followers time out and start a new leader election."
  ],
  whyAsked: [
    "To test your understanding of modern distributed consensus.",
    "Because Raft is widely used in popular infrastructure like Kubernetes (via etcd).",
    "To evaluate how well you understand leader election and log replication."
  ],
  thirtySecondAnswer: "Raft is a consensus algorithm that relies on strong leadership. Nodes can be Leaders, Followers, or Candidates. The leader handles all client requests and replicates log entries to followers. If a follower hears no heartbeat, it becomes a candidate and requests votes. Raft guarantees that if a log entry is committed, it is safely stored on a majority of nodes and will survive leader changes.",
  detailedAnswer: [
    "Raft nodes start as followers. If they don't receive a heartbeat from the leader within a randomized timeout, they transition to candidate state.",
    "Candidates request votes from other nodes. The first to get a majority becomes the new leader.",
    "The leader appends entries to its log and sends AppendEntries RPCs to followers.",
    "Once a majority of followers acknowledge the entry, the leader commits it and applies it to its state machine.",
    "Raft ensures safety by enforcing that a candidate cannot win an election unless its log is at least as up-to-date as a majority of nodes."
  ],
  questions: Array.from({ length: 20 }).map((_, i) => ({
    id: `rft-q${i + 1}`,
    question: `Sample Raft question ${i + 1}?`,
    answer: `Sample Raft answer ${i + 1}.`,
    topic: "Distributed Systems",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "How does Raft handle network partitions (split-brain)?",
    "What is the significance of the randomized election timeout?",
    "How does log compaction work in Raft?"
  ],
  commonMistakes: [
    "Assuming multiple leaders can exist simultaneously (Raft strictly prevents this for a given term).",
    "Forgetting that followers only apply logs after the leader has committed them.",
    "Thinking clients can write directly to followers in standard Raft."
  ],
  interviewTraps: [
    "Not understanding how a stale leader handles network partitions (it can't get a quorum to commit new entries).",
    "Failing to explain why candidate logs must be up-to-date to win an election."
  ],
  tradeoffs: [
    "Strong Consistency vs. Latency: All writes must go through the leader and be replicated to a quorum.",
    "Simplicity vs. Performance: Raft's strong leader model can bottleneck at the leader, unlike leaderless protocols."
  ],
  comparisonTable: {
    title: "Raft vs Paxos",
    columns: ["Feature", "Raft", "Paxos"],
    rows: [
      { label: "Understandability", values: ["High (designed for it)", "Low (notoriously complex)"] },
      { label: "Leadership", values: ["Strong leader", "Leaderless or weak leader variants exist"] },
      { label: "Log Replication", values: ["Sequential, strict order", "Can commit out of order"] },
      { label: "Industry Usage", values: ["etcd, Consul, CockroachDB", "Chubby, Spanner, Cassandra (Lite Paxos)"] }
    ]
  },
  memoryTrick: "Raft is a boat with one Captain (Leader) making all decisions. If the Captain falls overboard, the crew (Followers) panics (times out) and votes for a new Captain.",
  realWorldExamples: [
    "etcd uses Raft to manage the state of Kubernetes clusters.",
    "Consul uses Raft for service discovery and configuration consistency."
  ],
  mermaidDiagram: `stateDiagram-v2
    [*] --> Follower
    Follower --> Candidate : Timeout
    Candidate --> Candidate : Election fails
    Candidate --> Leader : Majority votes
    Leader --> Follower : Discovers higher term
    Candidate --> Follower : Discovers higher term`,
  flashcards: Array.from({ length: 5 }).map((_, i) => ({
    id: `rft-fc${i + 1}`,
    front: `Raft concept ${i + 1}?`,
    back: `Explanation ${i + 1}`,
    topic: "Distributed Systems",
    difficulty: i < 3 ? "Beginner" : "Advanced"
  })),
  cheatSheet: {
    title: "Raft Cheat Sheet",
    sections: [
      { heading: "Roles", items: ["Leader", "Follower", "Candidate"] },
      { heading: "RPCs", items: ["RequestVote", "AppendEntries"] },
      { heading: "Safety Guarantees", items: ["Election Safety", "Log Matching", "Leader Completeness"] }
    ]
  },
  speedNotes: [
    "Strong leader paradigm.",
    "Randomized election timeouts.",
    "Term numbers as logical clocks.",
    "Requires majority quorum.",
    "Designed for understandability."
  ]
};
