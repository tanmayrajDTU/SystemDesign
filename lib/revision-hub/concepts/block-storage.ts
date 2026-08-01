import type { ConceptRevisionContent } from "./types";

export const blockStorage: ConceptRevisionContent = {
  slug: "block-storage",
  title: "Block Storage",
  topic: "Storage",
  difficulty: "Intermediate",
  estimatedMinutes: 8,

  docLinks: [
    { label: "Block Storage", href: "/docs/storage/block-storage" },
    { label: "Object Storage", href: "/docs/storage/object-storage" },
  ],

  summary: [
    "Block storage divides data into fixed-size, independently addressable blocks, with no built-in concept of files or metadata — that structure is imposed entirely by whatever sits on top (a file system or a database's own storage engine).",
    "It exists because applications like databases need extremely fine-grained, low-latency control over exactly how data is physically laid out and written, rather than working through a file system's or object store's extra abstraction.",
    "It behaves like a raw local disk from the attached instance's perspective, typically attached to a single compute instance at a time (e.g. an AWS EBS volume on an EC2 instance).",
    "It supports fine-grained, in-place modification at the byte/block level — the direct opposite of object storage's whole-object-replace model.",
    "The trade-off: no built-in structure, sharing, or the near-unlimited scalability of object storage — block volumes have defined size limits and are typically single-instance-attached.",
    "It's the foundation databases and virtual machine disks are built on, chosen specifically for latency-sensitive, single-instance workloads.",
  ],

  whyAsked: [
    "It's the natural counterpart to object storage, and interviewers check whether a candidate matches storage type to actual access pattern (fine-grained low-latency vs. massive-scale static data).",
    "It tests whether a candidate understands why databases specifically choose block storage rather than treating storage as an interchangeable commodity.",
    "It's a common, concrete way to probe understanding of the file-system-vs-raw-storage abstraction layers.",
  ],

  thirtySecondAnswer:
    "Block storage divides data into fixed-size, independently addressable blocks with no inherent concept of files or metadata — a file system or a database's own storage engine imposes whatever structure it needs on top. It exists because applications like databases need fine-grained, low-latency control over exactly how and where data is physically written, rather than working through the extra abstraction a file system or object store imposes. It behaves like a raw disk attached to a single compute instance, supporting in-place, byte-level modification — the opposite of object storage's whole-object-replace model — which is exactly what gives it the performance and flexibility databases need for write-ahead logs and custom on-disk data structures. The trade-off is that it doesn't scale to object storage's near-unlimited capacity or naturally shared, multi-client access model, and comes with real operational responsibility (snapshots, resizing, backups) that fully managed object storage largely avoids.",

  detailedAnswer: [
    "Fixed-size, independently addressable blocks with no inherent file/object structure — imposed entirely by the layer above (file system or database engine).",
    "Gives applications fine-grained, low-latency control over data layout, unlike object storage's whole-object-replace model.",
    "Behaves like a raw disk, typically attached to a single compute instance (e.g. AWS EBS on EC2).",
    "Supports in-place, byte-level modification — the direct opposite trade-off from object storage.",
    "Trades built-in structure and massive multi-client scalability (object storage's strengths) for raw performance and flexibility.",
    "Comes with real operational responsibility (snapshots, resizing, backups) that object storage's managed model largely absorbs instead.",
  ],

  questions: [
    { id: "blk-q1", question: "What is block storage, in one sentence?", answer: "Storage divided into fixed-size, independently addressable blocks, with no built-in concept of files or metadata.", topic: "Storage", difficulty: "Beginner" },
    { id: "blk-q2", question: "Why do databases typically use block storage rather than object storage?", answer: "Databases need fine-grained, low-latency control over exactly how data is laid out and modified in place (for write-ahead logs, indexes) — block storage's raw model supports that directly, while object storage's whole-object model doesn't.", topic: "Storage", difficulty: "Intermediate" },
    { id: "blk-q3", question: "What imposes file/directory structure on block storage?", answer: "Whatever sits on top of it — typically a file system (like ext4 or NTFS), or an application (like a database engine) managing raw blocks directly.", topic: "Storage", difficulty: "Beginner" },
    { id: "blk-q4", question: "Can block storage be modified in place at the byte level?", answer: "Yes — this is one of its key advantages over object storage, which generally requires replacing a whole object instead.", topic: "Storage", difficulty: "Intermediate" },
    { id: "blk-q5", question: "How is block storage typically attached in cloud environments?", answer: "To a single compute instance at a time (e.g. an AWS EBS volume attached to one EC2 instance), unlike object or file storage's more naturally shared access model.", topic: "Storage", difficulty: "Intermediate" },
    { id: "blk-q6", question: "What's the main scalability limitation of block storage compared to object storage?", answer: "Block storage volumes typically have defined size limits per volume and don't scale to the same near-limitless capacity object storage provides.", topic: "Storage", difficulty: "Intermediate" },
    { id: "blk-q7", question: "Why might a database engine manage raw blocks directly instead of using a general-purpose file system?", answer: "To implement a highly specialized, performance-tuned storage engine (custom on-disk data structures, specific write-ahead logging behavior) rather than being constrained by a general-purpose file system's assumptions.", topic: "Storage", difficulty: "Advanced" },
    { id: "blk-q8", question: "What operational responsibilities come with using block storage directly?", answer: "Snapshotting, resizing, and backups become the user's responsibility, unlike object storage's largely automatic, fully managed durability model.", topic: "Storage", difficulty: "Advanced" },
    { id: "blk-q9", question: "What's a common mistake with block storage?", answer: "Using it for large-scale, widely-shared unstructured data that would be far better served (more scalable, more cost-effective) by object storage instead.", topic: "Storage", difficulty: "Intermediate" },
    { id: "blk-q10", question: "What's a real production example of block storage?", answer: "AWS EBS (Elastic Block Store), the standard block storage service backing most EC2-hosted databases and virtual machines.", topic: "Storage", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Why do databases typically run on block storage rather than object storage?\"",
    "\"What's the fundamental difference between block storage and object storage in terms of structure?\"",
    "\"Why might a database engine manage raw blocks directly rather than through a file system?\"",
  ],

  commonMistakes: [
    "Using block storage for large-scale, widely-shared unstructured data better served by object storage.",
    "Underestimating the operational responsibility (snapshots, resizing, backups) of managing block volumes directly.",
    "Building a custom storage engine on raw blocks without it being genuinely justified by real performance needs.",
  ],

  interviewTraps: [
    "\"Just use block storage everywhere for performance\" ignores that it doesn't scale or share the way object storage does — a trap if used as a blanket answer.",
    "Being asked what happens to snapshotting/backups with block storage is testing whether you know it's the user's responsibility, unlike object storage's managed model.",
  ],

  tradeoffs: [
    "Fine-grained, low-latency in-place modification vs. no built-in structure, sharing, or near-unlimited scale.",
    "Maximum flexibility for custom storage engines vs. real operational responsibility (snapshots, resizing, backups).",
  ],

  comparisonTable: {
    title: "Block Storage vs Object Storage",
    columns: ["Block Storage", "Object Storage"],
    rows: [
      { label: "Structure", values: ["Raw, fixed-size addressable blocks", "Flat, keyed objects + metadata"] },
      { label: "In-place edits", values: ["Yes — fine-grained byte-level writes", "No — replace whole object"] },
      { label: "Attachment", values: ["Single compute instance, typically", "Shared, accessed via HTTP from anywhere"] },
      { label: "Best for", values: ["Databases, VM disks — latency-sensitive", "Large-scale static unstructured data"] },
    ],
  },

  decisionGuide: {
    kind: "question",
    id: "blk-root",
    question: "Does the workload need fine-grained, low-latency, in-place modification of the data?",
    options: [
      {
        label: "Yes — e.g. a database's write-ahead log or VM disk",
        next: {
          kind: "result",
          id: "blk-choose-block",
          result: "Use Block Storage.",
          rationale: "It gives applications raw, low-latency control over exactly how data is laid out and modified in place, which databases and VM disks need.",
        },
      },
      {
        label: "No — mostly large, static, whole-file data",
        next: {
          kind: "result",
          id: "blk-choose-object",
          result: "Use Object Storage.",
          rationale: "It scales to near-unlimited capacity with very high durability, and is a better structural and cost fit for large-scale unstructured data.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Block storage is an empty numbered plot of land.\" You (or your file system, or your database) decide entirely what structure to build on it.",

  realWorldExamples: [
    "AWS EBS backs most EC2-hosted databases and virtual machines specifically for its low latency and fine-grained control.",
    "A relational database server runs its write-ahead log and data files on an attached block volume, distinct from any user-uploaded content stored separately in object storage.",
  ],

  mermaidDiagram: `flowchart TD
    App["Application / Database Engine"] --> FS["File system (optional layer)"]
    FS --> Block["Block Storage\\n(raw, fixed-size blocks)"]
    Block --> Disk[(Physical disk / SSD)]`,

  flashcards: [
    { id: "blk-fc1", front: "Block storage — one-line definition", back: "Fixed-size, independently addressable blocks with no built-in file/object structure.", topic: "Storage", difficulty: "Beginner" },
    { id: "blk-fc2", front: "Why do databases prefer block storage?", back: "Fine-grained, low-latency control over data layout and in-place modification.", topic: "Storage", difficulty: "Intermediate" },
    { id: "blk-fc3", front: "Can block storage be edited in place?", back: "Yes — byte-level, unlike object storage's whole-object replace.", topic: "Storage", difficulty: "Intermediate" },
    { id: "blk-fc4", front: "Typical attachment model", back: "Single compute instance at a time (e.g. AWS EBS on one EC2 instance).", topic: "Storage", difficulty: "Intermediate" },
    { id: "blk-fc5", front: "Operational responsibility with block storage", back: "Snapshots, resizing, backups — the user's responsibility, unlike managed object storage.", topic: "Storage", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Block Storage",
    sections: [
      { heading: "Core idea", items: ["Fixed-size addressable blocks", "No inherent file/object structure"] },
      { heading: "Gains", items: ["Low latency", "Fine-grained in-place edits", "Max flexibility (custom storage engines)"] },
      { heading: "Gives up", items: ["Built-in structure/sharing", "Object storage's massive scale"] },
      { heading: "Use for", items: ["Databases", "VM disks"] },
    ],
  },

  speedNotes: [
    "Block storage = raw, fixed-size, addressable blocks.",
    "No inherent file/object structure — imposed by layer above.",
    "Supports in-place byte-level edits (opposite of object storage).",
    "Typically single-instance attached (e.g. AWS EBS on one EC2).",
    "Best for databases/VM disks — latency-sensitive workloads.",
  ],
};
