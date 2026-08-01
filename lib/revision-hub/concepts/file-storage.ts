import type { ConceptRevisionContent } from "./types";

export const fileStorage: ConceptRevisionContent = {
  slug: "file-storage",
  title: "File Storage",
  topic: "Storage",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "File Storage", href: "/docs/storage/file-storage" },
    { label: "Object Storage", href: "/docs/storage/object-storage" },
    { label: "Block Storage", href: "/docs/storage/block-storage" },
  ],

  summary: [
    "File storage organizes data in a familiar hierarchical structure of folders and files, accessed over the network via protocols like NFS or SMB.",
    "It preserves traditional file system semantics — open, read, write at a byte offset, seek, lock — the same way an app talks to a local disk.",
    "It exists so applications built directly around file system APIs can share networked storage across machines without being rewritten.",
    "POSIX compliance (or an approximation of it) is the defining feature: byte-range locking, in-place partial edits, and true nested directories.",
    "It trades object storage's massive scalability and low cost for those exact semantics — a deliberate trade, not a free upgrade.",
    "Managed examples: Amazon EFS, Azure Files — both purpose-built for multi-instance access to a traditional file system model.",
    "The hardest engineering problem in networked file storage is correct, performant file locking when many machines touch the same file concurrently.",
    "It's the right choice specifically for legacy or POSIX-dependent workloads, not a default for new cloud-native systems.",
  ],

  whyAsked: [
    "Tests whether you know the file vs. block vs. object storage distinction, and can justify each on real semantics rather than vibes.",
    "Interviewers want to hear you reach for object storage by default and justify file storage only when POSIX semantics are a genuine requirement.",
    "It's a quick way to check if you understand why 'shared storage' isn't a monolithic concept — the three storage models solve different problems.",
    "Follow-ups probe whether you understand the operational cost of correct distributed file locking, not just the happy path.",
  ],

  thirtySecondAnswer:
    "File storage provides a traditional, hierarchical file system — folders and files, opened and edited the same way an app would talk to a local disk — except the storage lives on shared network infrastructure (via protocols like NFS or SMB) instead of one machine's disk. It typically supports POSIX semantics: byte-range writes, in-place edits, and file locking, which is exactly what many legacy applications and databases are built assuming. The trade-off is that it doesn't scale as gracefully or cheaply as object storage, because maintaining correct locking and directory semantics across many concurrent networked clients is genuinely hard. So it's the right choice specifically when an application needs those exact traditional semantics — not a default for new, cloud-native systems, which are usually better served by object storage's simpler, more scalable model.",

  detailedAnswer: [
    "Accessed via standard file system protocols (NFS for Unix/Linux, SMB for Windows) that expose the usual open/read/write/seek/lock operations.",
    "Supports POSIX semantics — in-place partial edits and byte-range locking — which object storage deliberately gives up for scale.",
    "The hard engineering problem is correct file locking across multiple machines concurrently accessing the same file over the network.",
    "Costs more per unit of storage than object storage, and scales less gracefully at very large concurrency or size.",
    "Best fit: legacy apps, certain databases, and CMS platforms already built around file system APIs, migrated to run across multiple machines.",
    "Not the default for new cloud-native systems — prefer object storage unless POSIX semantics are a genuine, specific requirement.",
  ],

  questions: [
    { id: "fs-q1", question: "What is file storage, in one sentence?", answer: "Networked storage that presents a traditional hierarchical file system — folders and files accessed via familiar operations like open, read, write, seek, and lock.", topic: "Storage", difficulty: "Beginner" },
    { id: "fs-q2", question: "What protocols are commonly used to access file storage?", answer: "NFS (Network File System), common in Unix/Linux environments, and SMB (Server Message Block), common in Windows environments.", topic: "Storage", difficulty: "Beginner" },
    { id: "fs-q3", question: "What does POSIX compliance mean in this context?", answer: "Supporting standard file system operations — opening files, reading/writing at specific byte offsets, and locking for exclusive or shared access — the same semantics a local disk provides, now working correctly across a network.", topic: "Storage", difficulty: "Beginner" },
    { id: "fs-q4", question: "How does file storage differ from object storage at a semantic level?", answer: "File storage supports in-place partial edits, byte-range locking, and true nested directories; object storage treats each object as an immutable whole, replaced entirely on update, with a flat namespace simulating folders via key prefixes.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-q5", question: "Why do many legacy applications require file storage specifically?", answer: "They were built directly around file system APIs — opening files, editing in place, locking — and rewriting them around object storage's whole-object model would be a costly rearchitecture.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-q6", question: "What is the hardest engineering problem in networked file storage?", answer: "Correctly and efficiently implementing file locking and consistency guarantees when multiple machines access and modify the same file concurrently over the network.", topic: "Storage", difficulty: "Advanced" },
    { id: "fs-q7", question: "Why does file storage generally cost more per unit of storage than object storage?", answer: "It supports a richer, more complex set of semantics (locking, byte-range edits, directory hierarchies), which is more expensive to implement and operate correctly at scale than object storage's simpler model.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-q8", question: "Give a managed cloud example of file storage.", answer: "Amazon EFS (Elastic File System) and Azure Files — both provide managed, scalable network file storage with traditional file system semantics across multiple compute instances.", topic: "Storage", difficulty: "Beginner" },
    { id: "fs-q9", question: "Why doesn't file storage scale as gracefully as object storage?", answer: "Maintaining correct locking and consistent directory semantics becomes harder to do efficiently as concurrency and scale grow, unlike object storage's simpler flat, whole-object model.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-q10", question: "When would you choose file storage over object storage for a new application?", answer: "Only when the application genuinely needs POSIX semantics — in-place edits, byte-range locking, true directory hierarchies — that object storage doesn't provide; otherwise object storage is usually the better default.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-q11", question: "What's a common mistake teams make when choosing file storage?", answer: "Defaulting to it out of familiarity for a new application that could be built more scalably and cheaply around object storage instead.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-q12", question: "How would you migrate a legacy on-premises app that relies on local disk file access to a multi-server architecture?", answer: "Point it at shared network file storage (e.g. NFS-backed EFS) instead of local disk, preserving its existing file-based logic without a rewrite around a different storage model.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-q13", question: "What kind of access pattern is file storage well-suited for that object storage isn't?", answer: "Fine-grained, in-place partial edits and byte-range locking of the same file by multiple concurrent clients — object storage requires replacing the whole object on any update.", topic: "Storage", difficulty: "Advanced" },
    { id: "fs-q14", question: "Is setting up basic NFS/SMB file storage hard?", answer: "No — it's mature, well-understood technology; the real difficulty is ensuring correct, performant behavior under high concurrency and at large scale.", topic: "Storage", difficulty: "Advanced" },
    { id: "fs-q15", question: "What risk does file storage carry if locking isn't implemented correctly across machines?", answer: "Two machines could both believe they hold an exclusive write lock on the same file simultaneously, corrupting data through concurrent, uncoordinated writes.", topic: "Storage", difficulty: "Advanced" },
    { id: "fs-q16", question: "How does file storage relate to block storage?", answer: "Block storage exposes raw, low-level disk blocks to a single attached machine (as with an EBS volume); file storage adds a shared, networked, hierarchical file system layer on top, usable by multiple machines at once.", topic: "Storage", difficulty: "Advanced" },
    { id: "fs-q17", question: "Why might a database specifically require file storage rather than object storage?", answer: "Some databases are built assuming direct file system access with in-place writes and locking to manage their data files — semantics object storage's immutable whole-object model doesn't support.", topic: "Storage", difficulty: "Advanced" },
    { id: "fs-q18", question: "What's the real-world analogy for file storage versus object storage?", answer: "Object storage is a warehouse where you retrieve whole items by tracking number; file storage is a shared filing cabinet where multiple people open specific drawers and edit specific pages in place.", topic: "Storage", difficulty: "Beginner" },
    { id: "fs-q19", question: "What should you evaluate before choosing file storage for a new cloud-native system?", answer: "Whether the application genuinely needs traditional file system semantics — if not, object storage's superior scalability and lower cost usually make it the better choice.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-q20", question: "Summarize file storage in one sentence.", answer: "Shared, network-accessible storage that preserves traditional hierarchical file system semantics (locking, in-place edits, nested directories), at the cost of scaling less gracefully and more expensively than object storage.", topic: "Storage", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"How would this compare to just using object storage here?\"",
    "\"Walk me through what happens if two machines try to lock the same file at once.\"",
    "\"What's actually making this harder to scale than object storage?\"",
  ],

  commonMistakes: [
    "Defaulting to file storage out of familiarity for a new, cloud-native application that could use object storage instead.",
    "Confusing file storage with block storage — file storage is shared and hierarchical, block storage is raw disk blocks for a single attached machine.",
    "Assuming NFS/SMB setup difficulty is the hard part — the real difficulty is correctness and performance under concurrency at scale.",
  ],

  interviewTraps: [
    "\"So file storage and object storage are basically interchangeable?\" is testing whether you know they support genuinely different semantics, not just different APIs.",
    "\"Why not just use file storage everywhere for simplicity?\" is probing whether you understand the real cost/scale trade-off, not just repeating that it's 'more traditional'.",
  ],

  tradeoffs: [
    "File storage: familiar POSIX semantics and in-place edits, at the cost of scalability and cost-efficiency compared to object storage.",
    "Object storage: massive scale and low cost, at the cost of giving up in-place edits, locking, and true directory hierarchies.",
    "Choosing file storage for a new system without a legacy constraint trades away object storage's scalability for no real benefit.",
  ],

  comparisonTable: {
    title: "File Storage vs Object Storage",
    columns: ["File Storage", "Object Storage"],
    rows: [
      { label: "Access model", values: ["POSIX file system (NFS/SMB)", "HTTP API, whole-object get/put"] },
      { label: "In-place edits", values: ["Yes, byte-range", "No — replace whole object"] },
      { label: "Locking", values: ["Supported (byte-range)", "Not applicable"] },
      { label: "Scalability", values: ["Good, but harder at extreme scale", "Near-unlimited"] },
      { label: "Cost per GB", values: ["Higher", "Lower"] },
      { label: "Best fit", values: ["Legacy apps, POSIX-dependent workloads", "New cloud-native apps, media/backups"] },
    ],
  },

  memoryTrick:
    "\"File storage = your old filing cabinet, now shared.\" Same drawers, same folders, same in-place edits and locks — just reachable from every desk in the office now.",

  realWorldExamples: [
    "A legacy content management system originally built around direct file system access is moved to Amazon EFS so it keeps working unmodified across multiple servers.",
    "Amazon EFS and Azure Files are both managed network file storage offerings purpose-built for applications needing POSIX semantics across multiple compute instances.",
  ],

  mermaidDiagram: `flowchart TD
    App1[Application on Server 1] -->|NFS/SMB| FS[Shared File Storage]
    App2[Application on Server 2] -->|NFS/SMB| FS
    FS --> Disk[(Underlying storage)]`,

  flashcards: [
    { id: "fs-fc1", front: "File storage — one-line definition", back: "Networked storage presenting a traditional hierarchical file system, accessed via NFS/SMB with familiar open/read/write/lock operations.", topic: "Storage", difficulty: "Beginner" },
    { id: "fs-fc2", front: "What does POSIX compliance give you here?", back: "In-place byte-range edits and file locking — the same semantics a local disk provides, now working across a network.", topic: "Storage", difficulty: "Beginner" },
    { id: "fs-fc3", front: "File storage vs object storage — key semantic difference", back: "File storage supports in-place partial edits and locking; object storage replaces the whole object on any update.", topic: "Storage", difficulty: "Intermediate" },
    { id: "fs-fc4", front: "Hardest engineering problem in file storage", back: "Correct, performant file locking when many machines concurrently access the same file over the network.", topic: "Storage", difficulty: "Advanced" },
    { id: "fs-fc5", front: "Managed file storage examples", back: "Amazon EFS, Azure Files.", topic: "Storage", difficulty: "Beginner" },
  ],

  cheatSheet: {
    title: "File Storage",
    sections: [
      { heading: "What it is", items: ["Hierarchical folders/files over the network", "Protocols: NFS (Unix/Linux), SMB (Windows)", "POSIX semantics: byte-range writes, locking"] },
      { heading: "Strengths", items: ["Works unmodified with legacy/POSIX-dependent apps", "In-place partial edits", "Fine-grained locking"] },
      { heading: "Weaknesses", items: ["Costs more per GB than object storage", "Harder to scale at extreme concurrency", "Locking correctness across machines is genuinely hard"] },
      { heading: "When to use", items: ["Legacy apps built on file system APIs", "Shared dev/content environments needing file-level locking", "Avoid for new cloud-native apps — prefer object storage"] },
    ],
  },

  speedNotes: [
    "File storage = hierarchical folders/files over NFS or SMB.",
    "Supports POSIX: in-place edits, byte-range locking.",
    "Costs more, scales less gracefully than object storage.",
    "Right choice only when POSIX semantics are genuinely needed.",
    "Examples: Amazon EFS, Azure Files.",
  ],
};
