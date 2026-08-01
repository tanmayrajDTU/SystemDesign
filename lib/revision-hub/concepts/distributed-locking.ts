import type { ConceptRevisionContent } from "./types";

export const distributedLocking: ConceptRevisionContent = {
  slug: "distributed-locking",
  title: "Distributed Locking",
  topic: "Distributed Systems",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Distributed Locking", href: "/docs/distributed-systems/distributed-locking" }
  ],
  summary: [
    "Distributed Locking restricts access to a shared resource across multiple processes in a distributed system.",
    "It prevents race conditions when concurrent nodes attempt to mutate the same data simultaneously.",
    "Locks must ensure mutual exclusion, avoid deadlocks, and handle node crashes gracefully.",
    "Common implementations use external stores like Redis (Redlock), ZooKeeper, or etcd.",
    "A lease or Time-To-Live (TTL) is heavily utilized to prevent permanent deadlocks if the lock holder dies.",
    "Fencing tokens are required to prevent a delayed process from overwriting data after its lock expires."
  ],
  whyAsked: [
    "To test if you understand concurrency issues across network boundaries.",
    "To see how you handle failure modes (network partitions, zombie processes).",
    "To evaluate your knowledge of consistency mechanisms and coordination services."
  ],
  thirtySecondAnswer: "A distributed lock ensures mutual exclusion across multiple servers. Instead of a local mutex, nodes request a lock from a central service (like Redis or ZooKeeper) with a unique ID and a TTL. If a node crashes, the TTL expires, releasing the lock. To prevent 'zombie' nodes from writing to a resource after their lock expires, distributed locks should be paired with fencing tokens—monotonically increasing numbers checked by the storage layer.",
  detailedAnswer: [
    "Local locks (mutex, semaphores) don't work when applications scale horizontally across multiple machines.",
    "A central lock manager is needed. Redis is fast but less strictly consistent (unless using Redlock, which is debated). ZooKeeper/etcd offer strong consistency via consensus protocols.",
    "When acquiring a lock, a node must specify a TTL. Without a TTL, a crashed node would hold the lock forever (deadlock).",
    "However, TTLs introduce a danger: if a node pauses (e.g., GC pause) and its TTL expires, another node grabs the lock. The paused node wakes up, thinks it still has the lock, and writes corrupted data.",
    "Fencing Tokens solve this: the lock manager gives an incrementing token. The resource storage rejects writes with a token lower than the highest it has seen.",
    "Releasing a lock must be atomic (e.g., Lua script in Redis) to ensure a client only deletes its own lock, not a lock newly acquired by someone else."
  ],
  questions: [
    { id: "dlk-q1", question: "What is a distributed lock?", answer: "A mechanism to ensure mutual exclusion for a shared resource across multiple machines in a distributed system.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dlk-q2", question: "Why can't we use standard OS mutexes?", answer: "Because processes run on different physical machines without shared memory.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dlk-q3", question: "What happens if a node holding a lock crashes?", answer: "Without safeguards, a deadlock occurs. This is solved by adding a TTL (Time-To-Live) to the lock.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dlk-q4", question: "What is a lock TTL?", answer: "An expiration time after which the lock manager automatically releases the lock.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dlk-q5", question: "How does Redis implement a simple distributed lock?", answer: "Using SETNX (Set if Not eXists) with a TTL.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q6", question: "Why must releasing a lock in Redis be atomic?", answer: "To ensure a client doesn't accidentally delete a lock that expired and was subsequently acquired by another client.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q7", question: "What is the Redlock algorithm?", answer: "A Redis-based distributed locking algorithm by Antirez that queries a majority of independent Redis nodes to tolerate single-node failures.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q8", question: "What is the primary criticism of Redlock?", answer: "It relies on system clocks being synchronized across nodes, which is not guaranteed in distributed systems.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q9", question: "How does ZooKeeper handle distributed locks?", answer: "Using ephemeral sequential nodes. If the client disconnects, the ephemeral node is deleted, releasing the lock.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q10", question: "What is a GC pause, and why is it dangerous for locks?", answer: "Garbage collection can freeze a process. If the pause outlasts the lock TTL, the process wakes up thinking it holds a lock it actually lost.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dlk-q11", question: "What is a Fencing Token?", answer: "A monotonically increasing number granted by the lock service. The storage layer rejects writes from older tokens.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dlk-q12", question: "Why is a fencing token required even with a TTL?", answer: "Because network delays or GC pauses can cause a client to send a write request after its lock has expired.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dlk-q13", question: "What is lock contention?", answer: "When many clients constantly try to acquire the same lock, wasting network and CPU resources.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q14", question: "How do you mitigate lock contention?", answer: "By using backoff strategies (exponential backoff) or having the lock service notify clients when the lock is free (e.g., ZK watchers).", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q15", question: "Is a distributed lock CP or AP in the CAP theorem?", answer: "Distributed locks generally require CP (Consistency and Partition Tolerance) systems like etcd or ZK to prevent split-brain.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dlk-q16", question: "What happens if the lock manager experiences a network partition?", answer: "In a CP system, the minority partition cannot grant locks. In an AP system, multiple clients might acquire the lock (split-brain).", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dlk-q17", question: "How does etcd implement locking?", answer: "Using its strongly consistent key-value store and leases. When the lease expires, keys attached to it are deleted.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dlk-q18", question: "What is 'lock extension' or 'heartbeating'?", answer: "A background thread in the client that periodically renews the lock TTL while the main thread is still working.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q19", question: "Can we use a relational DB for distributed locking?", answer: "Yes, using SELECT FOR UPDATE or a dedicated locks table, but it's typically slower and harder to manage TTLs efficiently.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-q20", question: "Why prefer ZK/etcd over Redis for critical locks?", answer: "ZK/etcd use consensus (Raft/ZAB) ensuring strict consistency, whereas Redis replication is asynchronous and can lose locks during failover.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you handle a client that takes longer to process than the lock TTL?",
    "Why does Martin Kleppmann say Redlock is not safe for absolute correctness?",
    "How does a fencing token integrate with the database?"
  ],
  commonMistakes: [
    "Thinking a simple Redis SETNX is fully safe for critical data (asynchronous replication can lose the lock on failover).",
    "Forgetting about GC pauses and network delays causing a lock to expire before the work is done.",
    "Not mentioning fencing tokens as the ultimate protection against zombie writes."
  ],
  interviewTraps: [
    "Releasing a lock unconditionally (you must check if you still own it before deleting, typically via a UUID check).",
    "Implementing a busy-wait loop to acquire a lock without any sleep or backoff, DDOSing the lock manager."
  ],
  tradeoffs: [
    "Redis is highly available and fast, but offers weaker consistency guarantees for locks.",
    "ZooKeeper/etcd offer strong consistency via consensus, but are heavier and slightly slower.",
    "TTLs prevent deadlocks but introduce the risk of premature expiration."
  ],
  memoryTrick: "Lock it, TTL it, Fence it.",
  realWorldExamples: [
    "Cron job execution in a clustered environment (ensuring a daily email is sent only once).",
    "Leader election in a microservices cluster by holding a master lock."
  ],
  mermaidDiagram: `sequenceDiagram
    participant C1 as Client 1
    participant LM as Lock Manager (etcd)
    participant DB as Storage
    C1->>LM: Acquire Lock
    LM-->>C1: OK, Token=33
    C1->>DB: Write Data (Token=33)
    DB-->>C1: Success
    C1->>LM: Release Lock`,
  flashcards: [
    { id: "dlk-fc1", front: "Why do distributed locks need a TTL?", back: "To prevent deadlocks if the lock holder crashes.", topic: "Distributed Systems", difficulty: "Beginner" },
    { id: "dlk-fc2", front: "What is a Fencing Token?", back: "An increasing number used by storage to reject delayed writes from expired lock holders.", topic: "Distributed Systems", difficulty: "Advanced" },
    { id: "dlk-fc3", front: "Why is a GC pause dangerous for locks?", back: "It can outlast the TTL, making the client think it still holds a lock it lost.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-fc4", front: "How does ZooKeeper release locks on crash?", back: "Using ephemeral nodes that auto-delete when the client disconnects.", topic: "Distributed Systems", difficulty: "Intermediate" },
    { id: "dlk-fc5", front: "What is a major flaw of Redlock?", back: "It relies on clock synchronization across servers to track TTLs.", topic: "Distributed Systems", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Distributed Locking Cheatsheet",
    sections: [
      {
        heading: "Core Requirements",
        items: [
          "Mutual Exclusion",
          "Deadlock Freedom (TTLs/Leases)",
          "Fault Tolerance (Consensus/Replication)"
        ]
      },
      {
        heading: "The Zombie Problem",
        items: [
          "Process pauses (GC/Network).",
          "Lock expires, Node 2 gets lock.",
          "Process 1 wakes up and overwrites Node 2's work.",
          "Solution: Fencing Tokens in the storage layer."
        ]
      },
      {
        heading: "Tools",
        items: [
          "Redis: Fast, AP-ish, use for efficiency (preventing duplicate work).",
          "Zookeeper/etcd: CP, use for absolute correctness (financial transactions)."
        ]
      }
    ]
  },
  speedNotes: [
    "Locks need a TTL.",
    "TTLs prevent node crash deadlocks.",
    "GC pauses cause premature expiration.",
    "Fencing tokens reject zombie writes.",
    "etcd/ZK > Redis for correctness."
  ]
};
