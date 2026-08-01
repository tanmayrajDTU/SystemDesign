import type { ConceptRevisionContent } from "./types";

export const distributedFileSystems: ConceptRevisionContent = {
  slug: "distributed-file-systems",
  title: "Distributed File Systems",
  topic: "Storage",
  difficulty: "Advanced",
  estimatedMinutes: 15,

  docLinks: [
    { label: "Distributed File Systems", href: "/docs/storage/distributed-file-systems" },
    { label: "File Storage", href: "/docs/storage/file-storage" },
  ],

  summary: [
    "A distributed file system (DFS) spreads a file system's data and metadata across many machines, presenting a unified interface to clients.",
    "It exists to remove the ceiling a single machine's disk capacity and I/O throughput would otherwise impose.",
    "HDFS is the classic example, built around Google's GFS design, with a two-role architecture: NameNode (metadata) and DataNodes (block data).",
    "Files are split into blocks, distributed and typically replicated (commonly 3x) across DataNodes for fault tolerance.",
    "The NameNode tells clients where blocks live; clients then read/write block data directly to/from DataNodes, keeping metadata coordination lightweight.",
    "It's optimized for large files and sequential/batch access — not the low-latency, small, random-access pattern a database handles better.",
    "The metadata layer (NameNode) is the classic single point of failure risk if it isn't itself made highly available.",
  ],

  whyAsked: [
    "Tests understanding of how systems scale storage past a single machine — a foundational big-data infrastructure question.",
    "The NameNode/DataNode split is a great lens for whether you understand separating metadata coordination from bulk data transfer.",
    "Interviewers want to see you recognize when a DFS is overkill versus genuinely necessary — this is an operationally heavy tool.",
    "It connects directly to replication and fault-tolerance reasoning: what happens when a DataNode, or the NameNode itself, fails.",
  ],

  thirtySecondAnswer:
    "A distributed file system spreads both a file system's data and its metadata across many machines, while still presenting clients with something that looks and behaves like a single, unified file system. The classic example is HDFS: files are split into blocks, each block is replicated across multiple DataNodes (commonly 3x) for fault tolerance, and a separate NameNode holds the metadata — which blocks make up which files, and where each block lives. Clients query the NameNode briefly for that location info, then read or write the actual block data directly to and from the relevant DataNodes, so the lightweight metadata layer never becomes a bottleneck for the much larger volume of actual data transfer. It's built for massive scale and large-file, sequential/batch access patterns — like big data analytics pipelines — not for low-latency, small, random-access workloads, and the NameNode itself needs to be made highly available or it becomes the single point of failure for the whole system.",

  detailedAnswer: [
    "Splits files into blocks, distributes and replicates them (commonly 3x in HDFS) across many DataNodes for fault tolerance.",
    "A NameNode holds metadata only — which blocks make up a file and where each lives — kept separate from bulk data transfer.",
    "Clients query the NameNode for block locations, then talk to DataNodes directly for the actual read/write — avoiding a metadata bottleneck.",
    "Optimized for large files and sequential/batch access (analytics pipelines); a poor fit for latency-sensitive, small, random I/O.",
    "The NameNode is a classic single point of failure risk unless made highly available itself — a common gap in naive deployments.",
    "Real operational complexity: capacity planning, replication factor tuning, and NameNode HA are ongoing responsibilities, not one-time setup.",
  ],

  questions: [
    { id: "dfs-q1", question: "What is a distributed file system, in one sentence?", answer: "A file system that stores and manages files across multiple machines, presenting a unified interface while transparently handling data distribution, replication, and fault tolerance.", topic: "Storage", difficulty: "Beginner" },
    { id: "dfs-q2", question: "Why do distributed file systems exist?", answer: "A single machine's disk capacity and I/O throughput are fundamentally limited — a DFS removes that ceiling by spreading data and metadata across many machines.", topic: "Storage", difficulty: "Beginner" },
    { id: "dfs-q3", question: "What are the two core roles in HDFS's architecture?", answer: "The NameNode, which stores metadata (which blocks make up which files, and where they live), and DataNodes, which store the actual block data.", topic: "Storage", difficulty: "Beginner" },
    { id: "dfs-q4", question: "Why does HDFS separate the NameNode from DataNodes architecturally?", answer: "So the lightweight metadata coordination layer doesn't become a bottleneck for the much larger volume of actual data transfer, which flows directly between clients and DataNodes.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q5", question: "How does a client read a file in HDFS?", answer: "It queries the NameNode for the block locations of that file, then reads the actual block data directly from the relevant DataNodes.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q6", question: "How many replicas does HDFS typically keep of each block, by default?", answer: "3, spread across different DataNodes, so a single DataNode failure doesn't lose the block.", topic: "Storage", difficulty: "Beginner" },
    { id: "dfs-q7", question: "What happens when a DataNode holding a block replica fails?", answer: "The block remains available from its other replicas; the NameNode detects the failure and orchestrates re-replicating the affected blocks to restore the desired replication factor.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q8", question: "Why is the NameNode a potential single point of failure?", answer: "It's the sole holder of file-to-block-location metadata; if it fails and isn't itself made highly available, the whole file system becomes unusable even though the data blocks are still intact.", topic: "Storage", difficulty: "Advanced" },
    { id: "dfs-q9", question: "What access pattern is a DFS like HDFS optimized for?", answer: "Large files with sequential or batch access, as in big data analytics pipelines — not low-latency, small, random reads/writes.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q10", question: "What kind of workload would be a poor fit for HDFS?", answer: "A latency-sensitive workload doing small, random reads/writes — a database or block storage would serve that pattern far better.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q11", question: "What research/design did HDFS originate from?", answer: "It was built at Yahoo based on Google's published GFS (Google File System) design.", topic: "Storage", difficulty: "Advanced" },
    { id: "dfs-q12", question: "What's a common mistake when adopting a distributed file system?", answer: "Reaching for a full DFS for storage needs that would be far simpler and equally effective with object storage or traditional file storage instead.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q13", question: "Why is DFS operational complexity considered significant?", answer: "Capacity planning, replication factor tuning, and ensuring the metadata layer's own high availability are all ongoing operational responsibilities, not one-time setup tasks.", topic: "Storage", difficulty: "Advanced" },
    { id: "dfs-q14", question: "How does a DFS avoid data loss when spreading data across many machines naively wouldn't?", answer: "It coordinates a way to know exactly where each block lives (via the metadata layer) and replicates blocks across multiple machines, so any single machine's failure doesn't lose data.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q15", question: "When would you choose a DFS over object storage for large-scale data?", answer: "When you specifically need large-scale batch/analytics processing infrastructure with tools (like Spark/MapReduce) built around a file-system interface — otherwise object storage is often simpler for pure storage needs.", topic: "Storage", difficulty: "Advanced" },
    { id: "dfs-q16", question: "What's the trade-off a distributed file system makes compared to a single-machine file system?", answer: "It trades the simplicity of a single machine's file system for massive scale and fault tolerance — worthwhile for very large-scale batch data needs, unnecessary complexity otherwise.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q17", question: "How do batch processing jobs like Spark or MapReduce achieve high throughput on a DFS?", answer: "They read data in parallel, directly from the DataNodes holding the relevant blocks, achieving high aggregate throughput across the whole cluster rather than funneling through one bottleneck.", topic: "Storage", difficulty: "Advanced" },
    { id: "dfs-q18", question: "What's the real-world analogy for a distributed file system?", answer: "A company's document archive spread across many warehouses because no single one is big enough, with a coordinated indexing/logistics system so anyone can request a document without knowing which warehouse actually holds it.", topic: "Storage", difficulty: "Beginner" },
    { id: "dfs-q19", question: "Why shouldn't a DFS be the default choice for smaller-scale storage needs?", answer: "The operational complexity (metadata HA, replication tuning, capacity planning) isn't justified when object, block, or traditional file storage would handle the load comfortably.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-q20", question: "Summarize distributed file systems in one sentence.", answer: "A DFS spreads a file system's data and metadata across many machines, using a coordinating metadata layer plus block replication, to achieve massive scale and fault tolerance for large-scale batch storage and processing.", topic: "Storage", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What happens if the NameNode itself goes down?\"",
    "\"Why not just use object storage for this instead of a full DFS?\"",
    "\"How would you tune the replication factor, and what's the trade-off?\"",
  ],

  commonMistakes: [
    "Adopting a full DFS for storage needs that object storage or traditional file storage would handle just as well, more simply.",
    "Not planning for the metadata layer's own high availability, leaving it as an unaddressed single point of failure.",
    "Using a DFS optimized for large sequential batch access for a workload that's actually latency-sensitive with small, random I/O.",
  ],

  interviewTraps: [
    "\"Isn't more replicas always better?\" is testing whether you weigh storage/network cost against fault tolerance rather than treating replication as free.",
    "\"So the NameNode does all the heavy lifting?\" is checking whether you know it only handles metadata — bulk data flows directly between clients and DataNodes.",
  ],

  tradeoffs: [
    "Massive scale and fault tolerance, at the cost of significant operational complexity (capacity planning, replication tuning, metadata HA).",
    "Optimized for large-file sequential/batch access, at the cost of being a poor fit for low-latency, small, random-access workloads.",
    "Separating metadata from data avoids a data-transfer bottleneck, but makes the metadata layer itself a critical dependency needing its own HA strategy.",
  ],

  memoryTrick:
    "\"NameNode knows where, DataNodes hold what.\" Metadata is small and centralized for lookups; data is huge and spread out for throughput and fault tolerance.",

  realWorldExamples: [
    "HDFS, built at Yahoo based on Google's GFS design, remains the foundational storage layer for large-scale batch analytics infrastructure in the Hadoop ecosystem.",
    "A big data pipeline processing terabytes of log data stores it in HDFS, with Spark or MapReduce jobs reading blocks in parallel directly from DataNodes for high aggregate throughput.",
  ],

  mermaidDiagram: `flowchart TD
    Client -->|"metadata query: where are file X's blocks?"| NameNode
    NameNode -->|"blocks on DataNode 1, 3, 5"| Client
    Client -->|"read/write block data directly"| DN1[DataNode 1]
    Client -->|"read/write block data directly"| DN3[DataNode 3]`,

  flashcards: [
    { id: "dfs-fc1", front: "Distributed file system — one-line definition", back: "A file system spreading data and metadata across many machines, presenting a unified interface while handling replication and fault tolerance transparently.", topic: "Storage", difficulty: "Beginner" },
    { id: "dfs-fc2", front: "HDFS's two core roles", back: "NameNode (metadata: which blocks, where) and DataNodes (actual block data storage).", topic: "Storage", difficulty: "Beginner" },
    { id: "dfs-fc3", front: "Why separate metadata from data?", back: "So the lightweight metadata layer doesn't bottleneck the much larger volume of actual data transfer, which flows directly client↔DataNode.", topic: "Storage", difficulty: "Intermediate" },
    { id: "dfs-fc4", front: "Default HDFS replication factor", back: "3 replicas per block, spread across different DataNodes.", topic: "Storage", difficulty: "Beginner" },
    { id: "dfs-fc5", front: "What access pattern is a DFS optimized for?", back: "Large files, sequential/batch access — not low-latency, small, random I/O.", topic: "Storage", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "Distributed File Systems",
    sections: [
      { heading: "Core idea", items: ["Split files into blocks", "Distribute + replicate blocks across machines", "Metadata layer (NameNode) tracks locations"] },
      { heading: "HDFS architecture", items: ["NameNode: metadata only", "DataNodes: actual block storage", "Client reads/writes block data directly to DataNodes"] },
      { heading: "Fault tolerance", items: ["Default 3x block replication", "NameNode re-replicates on DataNode failure", "NameNode itself needs its own HA"] },
      { heading: "Fit", items: ["Good: large files, batch/sequential access", "Bad: low-latency, small, random I/O", "Origin: based on Google's GFS paper"] },
    ],
  },

  speedNotes: [
    "DFS spreads data + metadata across many machines.",
    "HDFS: NameNode = metadata, DataNodes = actual blocks.",
    "Default 3x replication per block for fault tolerance.",
    "Optimized for large files, sequential/batch — not small random I/O.",
    "NameNode is a SPOF unless made highly available itself.",
  ],
};
