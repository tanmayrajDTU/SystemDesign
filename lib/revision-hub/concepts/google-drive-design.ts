import type { ConceptRevisionContent } from "./types";

export const googleDriveDesign: ConceptRevisionContent = {
  slug: "google-drive-design",
  title: "Google Drive / Dropbox Architecture",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 25,
  docLinks: [
    { label: "Google Drive System Design", href: "/docs/case-studies/google-drive" },
  ],
  summary: [
    "Google Drive is a cloud file storage and synchronization service.",
    "Focuses heavily on high availability, massive storage scale, and efficient network bandwidth usage.",
    "Files are divided into 'blocks' or 'chunks' for efficient upload/download and deduplication.",
    "Requires maintaining strong consistency for metadata (file names, permissions).",
    "Uses message queues to handle asynchronous synchronization across client devices.",
    "Client apps use local watchers to detect changes and sync deltas.",
    "Cold storage is used for rarely accessed files to reduce costs."
  ],
  whyAsked: [
    "Tests knowledge of block storage vs object storage.",
    "Evaluates strategies for bandwidth optimization and network efficiency.",
    "Involves complex synchronization protocols across multiple devices.",
    "Requires understanding of metadata management and consistency."
  ],
  thirtySecondAnswer: "Designing Google Drive requires separating metadata from actual file storage. Files are broken into chunks (e.g., 4MB) to optimize network transfers, allow resuming broken uploads, and enable deduplication. Actual chunks are stored in an Object Store (S3/GCS), while metadata (namespaces, permissions, chunk hashes) is stored in a relational database for ACID guarantees. When a file changes, the client computes the hash of chunks, uploads only modified chunks, and the metadata server publishes a notification via a message queue (Kafka/RabbitMQ) to trigger syncs on other connected devices.",
  detailedAnswer: [
    "Block Chunking: Files are split into blocks. A hash (SHA-256) is generated for each block.",
    "Deduplication: Before uploading, the client sends block hashes. The server checks if the block exists globally. If yes, it skips upload, saving massive bandwidth and storage.",
    "Storage Separation: Block servers handle binary data to Object Storage. Metadata servers handle relational data (SQL DB).",
    "Synchronization: Client device edits file -> Client chunks and hashes -> Uploads only new blocks -> Updates Metadata DB -> Notification service pushes changes to other clients.",
    "Offline Operations: Local clients queue changes in a local SQLite DB and sync when the network returns, using vector clocks or timestamps for conflict resolution.",
    "Cold Storage: Unused files migrate to cheaper storage (e.g., Glacier) over time."
  ],
  questions: Array.from({ length: 20 }).map((_, i) => ({
    id: `gdd-q${i + 1}`,
    question: `Google Drive question ${i + 1}`,
    answer: `Google Drive answer ${i + 1}.`,
    topic: "System Design Case Studies",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "How do you resolve conflicts if two users edit the same file offline?",
    "How does end-to-end encryption affect deduplication?",
    "How can you optimize for very large files (e.g., 10GB video)?",
    "How is the metadata database sharded?"
  ],
  commonMistakes: [
    "Uploading the entire file for a single byte change.",
    "Storing file binary data in a relational database.",
    "Ignoring the need for long polling or WebSockets for real-time sync notifications.",
    "Failing to separate the metadata scaling from the block storage scaling."
  ],
  interviewTraps: [
    "Assuming Google Drive works like Google Docs (real-time collaborative editing) rather than block storage sync.",
    "Overlooking the security/privacy implications of global deduplication."
  ],
  tradeoffs: [
    "Chunk Size: Smaller chunks mean better deduplication and faster delta syncs, but larger metadata overhead. Larger chunks mean less metadata but more wasted bandwidth on small edits.",
    "Global vs User Deduplication: Global deduplication saves more storage but introduces privacy risks (probing attacks) and breaks with client-side encryption."
  ],
  memoryTrick: "Chunk it, hash it, dedup it, sync the deltas.",
  realWorldExamples: [
    "Dropbox's architecture (they pioneered this chunking sync model).",
    "Rsync utility algorithms."
  ],
  mermaidDiagram: `flowchart TD
    Client -->|Metadata & Hashes| Meta_Server
    Client -->|File Chunks| Block_Server
    Meta_Server --> DB[(Metadata SQL)]
    Meta_Server --> Queue[Message Queue]
    Block_Server --> S3[(Object Storage)]
    Queue -->|Push Notification| Client2
    Client2 -->|Fetch Metadata| Meta_Server
    Client2 -->|Download Chunks| Block_Server`,
  flashcards: Array.from({ length: 5 }).map((_, i) => ({
    id: `gdd-fc${i + 1}`,
    front: `Google Drive flashcard front ${i + 1}`,
    back: `Google Drive flashcard back ${i + 1}`,
    topic: "System Design Case Studies",
    difficulty: "Advanced"
  })),
  cheatSheet: {
    title: "Google Drive Architecture",
    sections: [
      { heading: "Core Concepts", items: ["Block Chunking", "Delta Sync", "Data Deduplication"] },
      { heading: "Components", items: ["Metadata Service (SQL)", "Block Service (S3)", "Notification Service (Queue)"] },
      { heading: "Optimizations", items: ["Resume broken uploads", "Bandwidth savings via hashes", "Cold storage tiering"] }
    ]
  },
  speedNotes: [
    "Split files into blocks.",
    "Hash blocks for deduplication.",
    "Separate metadata and binary data.",
    "Sync only changed deltas.",
    "Use queues for cross-device sync."
  ]
};
