import type { ConceptRevisionContent } from "./types";

export const objectStorage: ConceptRevisionContent = {
  slug: "object-storage",
  title: "Object Storage",
  topic: "Storage",
  difficulty: "Beginner",
  estimatedMinutes: 8,

  docLinks: [
    { label: "Object Storage", href: "/docs/storage/object-storage" },
    { label: "Block Storage", href: "/docs/storage/block-storage" },
  ],

  summary: [
    "Object storage manages data as discrete objects — data plus a unique key plus metadata — in a flat namespace, accessed via a simple HTTP API rather than a traditional file system interface.",
    "It exists because hierarchical file systems don't scale gracefully to billions of files across globally distributed, concurrently-accessed infrastructure.",
    "It gives up traditional file system semantics (true nested directories, partial in-place edits, POSIX locking) in exchange for near-unlimited scalability and very high durability.",
    "Updating an object generally means replacing it entirely — there's no partial in-place modification the way a file system allows writing to a specific byte offset.",
    "Built-in redundancy is automatic: object storage services typically replicate data across multiple machines (often multiple physical locations) without the user managing replication.",
    "It's the right fit for large, relatively static unstructured data (images, videos, backups) and a poor fit for workloads needing fine-grained, low-latency, in-place modification.",
  ],

  whyAsked: [
    "It checks whether a candidate can name the specific trade-off (giving up file system semantics for scale/durability), not just 'it's cloud storage'.",
    "The comparison against block storage is a common, concrete way to test whether a candidate matches storage type to actual access pattern.",
    "It's frequently a natural follow-up in any design involving user uploads, media, or backups.",
  ],

  thirtySecondAnswer:
    "Object storage manages data as discrete objects — each with a unique key and metadata — in a flat namespace, accessed through a simple HTTP API rather than a traditional file system. It exists because hierarchical file systems don't scale gracefully to billions of files across globally distributed, concurrently-accessed infrastructure, so object storage gives up file system semantics like true nested directories, partial in-place edits, and POSIX locking, in exchange for near-unlimited scalability and very high durability — typically achieved through automatic replication across multiple machines and physical locations. Updating an object generally means replacing it entirely rather than modifying a byte range in place, which is exactly why it's an excellent fit for large, relatively static unstructured data like images, videos, and backups, and a poor fit for workloads needing fine-grained, low-latency, in-place modification — that's what block storage is for instead.",

  detailedAnswer: [
    "Stores data as objects (data + key + metadata) in a flat namespace, accessed via simple HTTP PUT/GET/DELETE operations.",
    "Trades traditional file system semantics (nested directories, partial edits, POSIX locking) for massive scalability and durability.",
    "Updates generally replace the whole object — no partial in-place byte-range modification.",
    "Achieves high durability through automatic replication across multiple machines/locations, managed transparently by the provider.",
    "Best fit: large-scale, relatively static unstructured data (images, video, backups, data lakes) — poor fit for fine-grained, low-latency access patterns.",
  ],

  questions: [
    { id: "obj-q1", question: "What is object storage, in one sentence?", answer: "A storage architecture managing data as discrete objects (data + key + metadata) in a flat namespace, accessed via a simple HTTP API.", topic: "Storage", difficulty: "Beginner" },
    { id: "obj-q2", question: "Why doesn't object storage have true nested directories?", answer: "Its namespace is actually flat — keys that look like file paths (e.g. photos/2026/vacation.jpg) are just single string identifiers, not a real hierarchical directory structure.", topic: "Storage", difficulty: "Beginner" },
    { id: "obj-q3", question: "Can you modify part of an object in place?", answer: "Generally no — updating an object typically means replacing it entirely, unlike a file system that allows writing to a specific byte offset.", topic: "Storage", difficulty: "Intermediate" },
    { id: "obj-q4", question: "How does object storage typically achieve high durability?", answer: "By automatically replicating data across multiple machines, and often multiple physical locations, transparently — without the user managing replication themselves.", topic: "Storage", difficulty: "Intermediate" },
    { id: "obj-q5", question: "What kind of data is object storage best suited for?", answer: "Large, relatively static unstructured data — user-uploaded images/videos, backups, static website assets, data lake storage.", topic: "Storage", difficulty: "Beginner" },
    { id: "obj-q6", question: "When is object storage a poor fit?", answer: "Use cases genuinely needing traditional file system semantics — direct control over byte offsets, POSIX file locking, or extremely low-latency, small, frequent read/write patterns.", topic: "Storage", difficulty: "Intermediate" },
    { id: "obj-q7", question: "What's a common mistake when adopting object storage?", answer: "Trying to use it as a drop-in replacement for a traditional file system in an application that genuinely depends on partial writes or file-locking semantics it doesn't provide.", topic: "Storage", difficulty: "Intermediate" },
    { id: "obj-q8", question: "What's a lifecycle policy in object storage, and why does it matter?", answer: "A rule that automatically moves infrequently accessed objects to cheaper storage tiers over time — skipping this leaves all data in the most expensive tier indefinitely.", topic: "Storage", difficulty: "Advanced" },
    { id: "obj-q9", question: "Why is object storage often paired with a CDN?", answer: "For frequently accessed, publicly served content, a CDN reduces latency and load on the object storage service itself by serving cached copies from edge locations.", topic: "Storage", difficulty: "Intermediate" },
    { id: "obj-q10", question: "What's the leading real-world example of object storage?", answer: "Amazon S3 — the original and most widely used object storage service, underpinning a huge fraction of the internet's static content and backup storage.", topic: "Storage", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"Why might you choose object storage over a traditional file system for user-uploaded images?\"",
    "\"What's a use case where object storage's lack of file-locking semantics would actually be a problem?\"",
    "\"How does object storage typically achieve very high durability?\"",
  ],

  commonMistakes: [
    "Using object storage as a drop-in file system replacement for applications that need partial writes or locking.",
    "Not using lifecycle policies, leaving data in the most expensive storage tier indefinitely.",
    "Underestimating per-request latency for workloads with many small, frequent object accesses.",
  ],

  interviewTraps: [
    "\"Just use object storage for everything\" is a trap when the workload actually needs fine-grained, low-latency in-place edits (that's block storage's job).",
    "Being asked how updates work is testing whether you know it's whole-object replacement, not byte-range editing.",
  ],

  tradeoffs: [
    "Massive scalability and durability vs. no partial in-place edits or POSIX file-locking semantics.",
    "Simple, uniform HTTP access vs. higher per-request latency than a local disk read.",
  ],

  comparisonTable: {
    title: "Object Storage vs Block Storage",
    columns: ["Object Storage", "Block Storage"],
    rows: [
      { label: "Structure", values: ["Flat, keyed objects + metadata", "Raw, fixed-size addressable blocks"] },
      { label: "Access", values: ["HTTP API (PUT/GET/DELETE)", "Attached as a raw disk volume"] },
      { label: "In-place edits", values: ["No — replace whole object", "Yes — fine-grained byte-level writes"] },
      { label: "Best for", values: ["Large-scale static unstructured data", "Databases, VM disks — latency-sensitive"] },
    ],
  },

  memoryTrick:
    "\"Object storage is a warehouse with tracking numbers.\" You get a unique key for each item and retrieve it instantly by that key — no navigating an internal hierarchy yourself.",

  realWorldExamples: [
    "Amazon S3 underpins a huge fraction of the internet's static content and backup storage, used by Netflix, Airbnb, and countless others.",
    "A photo-sharing app stores every uploaded photo as an object keyed by a unique ID, served via a CDN in front of the storage service.",
  ],

  mermaidDiagram: `flowchart LR
    Client -->|"PUT /bucket/photos/vacation.jpg"| OS[Object Storage Service]
    OS --> R1[Replica 1]
    OS --> R2[Replica 2]
    OS --> R3[Replica 3]`,

  flashcards: [
    { id: "obj-fc1", front: "Object storage — one-line definition", back: "Flat, keyed objects with metadata, accessed via a simple HTTP API.", topic: "Storage", difficulty: "Beginner" },
    { id: "obj-fc2", front: "Can you edit part of an object in place?", back: "No — updates generally replace the whole object.", topic: "Storage", difficulty: "Intermediate" },
    { id: "obj-fc3", front: "How does it achieve high durability?", back: "Automatic replication across multiple machines/locations, managed by the provider.", topic: "Storage", difficulty: "Intermediate" },
    { id: "obj-fc4", front: "Best fit for object storage", back: "Large-scale, relatively static unstructured data: images, video, backups.", topic: "Storage", difficulty: "Beginner" },
    { id: "obj-fc5", front: "Leading example", back: "Amazon S3.", topic: "Storage", difficulty: "Beginner" },
  ],

  cheatSheet: {
    title: "Object Storage",
    sections: [
      { heading: "Core idea", items: ["Data + unique key + metadata", "Flat namespace, HTTP API"] },
      { heading: "Gives up", items: ["True nested directories", "Partial in-place edits", "POSIX locking"] },
      { heading: "Gains", items: ["Near-unlimited scale", "Very high durability (auto-replication)"] },
      { heading: "Use for", items: ["Images, video, backups, data lakes"] },
    ],
  },

  speedNotes: [
    "Object storage = flat, keyed objects + metadata, HTTP API.",
    "No true directories, no partial in-place edits.",
    "Durability via automatic multi-machine replication.",
    "Best for large, static unstructured data (images, backups).",
    "Poor fit for fine-grained, low-latency, in-place workloads.",
  ],
};
