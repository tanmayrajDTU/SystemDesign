import type { ConceptRevisionContent } from "./types";

export const leaderElection: ConceptRevisionContent = {
  slug: "leader-election",
  title: "Leader Election",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Leader Election", href: "/docs/distributed-systems/leader-election" },
    { label: "Consensus", href: "/docs/distributed-systems/consensus" }
  ],
  summary: [
    "Leader election is the process of designating a single node as the organizer or coordinator in a distributed cluster.",
    "It simplifies concurrency by routing all writes or critical decisions through one node.",
    "When the leader fails, the remaining nodes detect the failure and elect a new leader.",
    "Consensus algorithms like Raft and Paxos natively include leader election mechanisms.",
    "External coordination services like ZooKeeper or etcd can be used to elect leaders for applications.",
    "A split-brain scenario must be avoided, ensuring two nodes don't simultaneously act as leaders."
  ],
  whyAsked: [
    "To test your understanding of fault tolerance and coordination in distributed clusters.",
    "To evaluate your knowledge of consistency mechanisms and consensus protocols.",
    "To see if you understand the edge cases of network partitions (split-brain)."
  ],
  thirtySecondAnswer: "Leader election assigns one node the authority to coordinate tasks or manage writes in a cluster, simplifying state consistency. If the leader fails (detected via missing heartbeats), remaining nodes vote for a new leader using a consensus protocol like Raft, or via an external lock manager like ZooKeeper. To prevent 'split-brain'—where a network partition causes two nodes to think they are the leader—the system must require a strict majority (quorum) to elect a leader.",
  detailedAnswer: [
    "In a multi-node system, having all nodes accept writes simultaneously leads to massive conflicts (multi-leader replication).",
    "A single leader simplifies this: all writes go to the leader, which serializes them and replicates them to followers.",
    "Leaders maintain authority by constantly broadcasting heartbeats. If followers don't hear a heartbeat within a timeout, they trigger an election.",
    "In Raft, a follower transitions to a Candidate, increments its term number, and requests votes. The first to get a majority becomes the leader.",
    "Alternatively, applications can use ZooKeeper for leader election by trying to create an Ephemeral Sequential node. The node with the lowest sequence number becomes the leader.",
    "Split-brain is the biggest risk. Fencing tokens and strict majority quorums are used so a partitioned minority cannot elect its own leader."
  ],
  questions: [
    { id: "le-q1", question: "What is the main purpose of leader election?", answer: "To designate one node to coordinate tasks or handle writes, avoiding conflicts and simplifying state management.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "le-q2", question: "How do followers know if the leader has failed?", answer: "The leader sends periodic heartbeats. If a heartbeat is missed for a timeout period, the leader is presumed dead.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "le-q3", question: "What is split-brain?", answer: "A scenario where a network partition causes a cluster to split, and multiple nodes independently act as the leader.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "le-q4", question: "How does a quorum prevent split-brain?", answer: "By requiring a majority of nodes (N/2 + 1) to elect a leader, ensuring only one partition can ever form a majority.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "le-q5", question: "What is Raft?", answer: "A popular consensus algorithm that relies heavily on a strong leader to manage the replicated log.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-q6", question: "In Raft, what are the three node states?", answer: "Leader, Follower, and Candidate.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-q7", question: "How does ZooKeeper facilitate leader election?", answer: "Clients create ephemeral sequential nodes. The client owning the node with the smallest sequence number acts as the leader.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-q8", question: "What is a 'Term' or 'Epoch'?", answer: "A monotonically increasing logical clock value used to identify stale leaders and out-of-date messages.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-q9", question: "Why use randomized election timeouts in Raft?", answer: "To prevent split votes. If nodes time out at the same time, they all become candidates and nobody gets a majority.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-q10", question: "What happens if a leader experiences a temporary GC pause?", answer: "Followers might declare it dead and elect a new leader. When the old leader wakes up, it must be demoted upon seeing a higher Term.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "le-q11", question: "Why do systems like Cassandra avoid leader election?", answer: "They prioritize high availability (AP) over strict consistency, using a leaderless multi-master approach instead.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "le-q12", question: "Can a node with stale data become a leader in Raft?", answer: "No. Raft's RequestVote RPC ensures a candidate is only elected if its log is at least as up-to-date as the voter's.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "le-q13", question: "How does a cluster handle an even number of nodes?", answer: "It's discouraged. Even numbers make 50/50 split votes possible. Clusters usually run 3, 5, or 7 nodes.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-q14", question: "What is the Bully Algorithm?", answer: "An older election algorithm where nodes communicate their IDs. The node with the highest ID bullies the rest to become leader.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "le-q15", question: "Why is the Bully Algorithm rarely used in modern systems?", answer: "It generates a lot of network traffic and is highly susceptible to instability if the highest ID node is flapping (failing and recovering repeatedly).", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "le-q16", question: "How does Kafka handle leader election?", answer: "Kafka relies on ZooKeeper (or historically KRaft recently) to maintain a Controller, which elects partition leaders from the In-Sync Replicas (ISR).", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "le-q17", question: "What is an Ephemeral node in Zookeeper?", answer: "A node that exists as long as the session of the client that created it is active. If the client disconnects, ZK deletes the node.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-q18", question: "How do you handle client requests during a leader election?", answer: "Requests typically block or fail with an error until the new leader is elected and ready.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-q19", question: "What is a 'fencing token' in the context of leaders?", answer: "A token including the leader's Term number. External storage systems use it to reject writes from a 'zombie' leader with an older Term.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "le-q20", question: "Is leader election a bottleneck for scalability?", answer: "Yes, since all writes funnel through one node. To scale, data is often sharded, with a different leader for each shard.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "What happens when the network partition heals and two leaders encounter each other?",
    "How does the system ensure a newly elected leader has all the committed data?",
    "Why prefer a 5-node cluster over a 4-node cluster?"
  ],
  commonMistakes: [
    "Thinking a 4-node cluster is better than 3. (It has the same fault tolerance—1 node—but is more susceptible to deadlocks).",
    "Forgetting that leader election requires a strict majority (quorum).",
    "Not handling the 'zombie leader' problem where a disconnected leader still thinks it's in charge."
  ],
  interviewTraps: [
    "Suggesting a multi-master setup when strong consistency is strictly required by the prompt.",
    "Assuming leader election is instant. It takes time, meaning the system is briefly unavailable for writes."
  ],
  tradeoffs: [
    "Leader-based systems are simpler to reason about but introduce a single point of failure and bottleneck for writes.",
    "Elections cause brief periods of unavailability (usually seconds).",
    "Requires managing a consensus ensemble (like ZooKeeper/etcd) which adds operational complexity."
  ],
  memoryTrick: "Heartbeats keep the leader alive; quorums kill split-brain.",
  realWorldExamples: [
    "Kafka Partition Leaders: Ensuring ordered message writes to a specific partition.",
    "Kubernetes Controller Manager: Uses leases to ensure only one manager actively manipulates the cluster state."
  ],
  mermaidDiagram: `flowchart TD
    Follower1 -- Heartbeat Timeout --> Candidate
    Follower2 -- Heartbeat Timeout --> Candidate
    Candidate -- Requests Votes --> Quorum{Gets Majority?}
    Quorum -- Yes --> Leader
    Quorum -- No --> Follower1
    Leader -- Sends Heartbeats --> Follower1
    Leader -- Sends Heartbeats --> Follower2`,
  flashcards: [
    { id: "le-fc1", front: "What triggers a leader election?", back: "Followers stop receiving heartbeats from the leader.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "le-fc2", front: "What is Split-Brain?", back: "A network partition causing multiple nodes to think they are the leader.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "le-fc3", front: "How is Split-Brain prevented?", back: "By requiring a Quorum (majority) of votes to become a leader.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-fc4", front: "Why use randomized timeouts in Raft?", back: "To prevent all nodes from becoming candidates simultaneously and splitting the vote.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "le-fc5", front: "How does a zombie leader realize it is deposed?", back: "It sees a message or write rejection containing a higher Term/Epoch number.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Leader Election Cheatsheet",
    sections: [
      {
        heading: "Mechanisms",
        items: [
          "Heartbeats to maintain authority.",
          "Timeouts to detect failure.",
          "Quorum to prevent split-brain."
        ]
      },
      {
        heading: "Consensus Algorithms",
        items: [
          "Raft: Highly focused on a strong leader, randomized timeouts.",
          "Paxos: Complex, older, multi-leader capable but usually constrained.",
          "Zookeeper ZAB: Zookeeper Atomic Broadcast."
        ]
      },
      {
        heading: "Quorum Math",
        items: [
          "N nodes require (N/2) + 1 to form a majority.",
          "3 nodes tolerate 1 failure.",
          "5 nodes tolerate 2 failures."
        ]
      }
    ]
  },
  speedNotes: [
    "Simplifies state consistency.",
    "Leader handles all writes.",
    "Heartbeats prove leader is alive.",
    "Quorum prevents split-brain.",
    "Zombie leaders stopped by Terms."
  ]
};
