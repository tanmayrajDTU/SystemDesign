import type { ConceptRevisionContent } from "./types";

export const dropboxDesign: ConceptRevisionContent = {
  slug: "dropbox-design",
  title: "Dropbox Design (File Sync Service)",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 45,
  docLinks: [
    { label: "Dropbox System Design", href: "/docs/case-studies/dropbox" }
  ],
  summary: [
    "Dropbox is a cloud-based file storage and synchronization service.",
    "The core challenge is efficiently syncing large files across multiple devices with low latency.",
    "It uses a block-based architecture where files are divided into smaller chunks (e.g., 4MB).",
    "Only modified chunks are synced to save bandwidth, using delta sync.",
    "Metadata (file structure, permissions) is handled separately from actual file content (block storage).",
    "Clients use long-polling or WebSockets for real-time updates of file changes."
  ],
  whyAsked: [
    "Tests understanding of efficient data transfer and synchronization.",
    "Assesses knowledge of separating metadata from raw data storage.",
    "Evaluates handling of concurrency, conflicts, and eventual consistency."
  ],
  thirtySecondAnswer: "Designing Dropbox requires splitting files into smaller chunks (e.g., 4MB blocks) to enable deduplication and delta sync, drastically saving bandwidth and storage. A Metadata Server manages directory structures and user permissions in a relational DB, while a Block Server handles chunk uploads/downloads to Object Storage (like Amazon S3). Clients maintain local state and use long-polling/WebSockets to receive synchronization events efficiently.",
  detailedAnswer: [
    "Divide files into fixed-size chunks (e.g., 4MB) for delta syncing.",
    "Maintain a Metadata Server backed by a relational database to guarantee ACID properties for file hierarchies.",
    "Use Block Servers to handle the uploading, downloading, and deduplication of chunks.",
    "Store chunks in a scalable Object Storage system (e.g., Amazon S3).",
    "Implement long-polling or WebSockets in the Notification Server to inform clients of changes.",
    "Use a message queue (e.g., Kafka or RabbitMQ) to decouple asynchronous tasks like notifications and file processing."
  ],
  questions: [
    { id: "dbxd-q1", question: "What are the core functional requirements of a Dropbox clone?", answer: "Users should be able to upload/download files, sync files across devices, and share files. The system must support large files and offline edits.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dbxd-q2", question: "Why divide files into chunks?", answer: "Chunking allows delta sync (uploading only modified parts), deduplication across different files, and resuming failed uploads easily.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dbxd-q3", question: "What is a good chunk size?", answer: "4MB is a common standard. Too small increases metadata overhead; too large wastes bandwidth during minor modifications.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q4", question: "How do you handle file deduplication?", answer: "Generate a hash (e.g., SHA-256) for each chunk. If the hash already exists in storage, just point the metadata to it instead of uploading.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q5", question: "Why separate metadata from block data?", answer: "Metadata is small, frequently accessed, and requires transactional guarantees (ACID), while block data is large, immutable, and suited for object storage.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q6", question: "Which database is best for metadata?", answer: "A relational database (RDBMS) like PostgreSQL/MySQL is ideal because file systems are inherently hierarchical and require ACID compliance for renaming/moving files.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q7", question: "How do clients know when a file changes?", answer: "Clients maintain a long-polling or WebSocket connection with a Notification Server, which pushes update events when changes occur.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q8", question: "What happens if a client goes offline?", answer: "The client queues changes locally. Upon reconnecting, it compares its local state with the server's state and syncs the differences.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q9", question: "How are concurrent modifications handled?", answer: "Use optimistic concurrency control. The first upload succeeds, and subsequent uploads of the same version create a 'conflicted copy'.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dbxd-q10", question: "How can you optimize bandwidth for mobile clients?", answer: "Allow selective sync, compress data before sending, and prioritize syncing metadata over actual file content until explicitly requested.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q11", question: "What is the role of a message queue in this system?", answer: "It decouples the Metadata Server from the Notification Server. When metadata updates, it publishes an event to the queue, which the Notification Server consumes to alert clients.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q12", question: "How do you ensure data durability?", answer: "Replicate chunks across multiple availability zones and regions in the object storage layer, and back up the metadata database.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dbxd-q13", question: "How do you handle cold data?", answer: "Move chunks that haven't been accessed in a long time to cheaper, slower storage tiers like Amazon Glacier.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dbxd-q14", question: "How does the client upload process work?", answer: "Client chunks file, hashes chunks, queries metadata server if hashes exist. Uploads missing chunks to block server, then commits new metadata.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dbxd-q15", question: "How can you scale the Notification Server?", answer: "Deploy multiple notification server instances and use a pub-sub model (e.g., Redis Pub/Sub) to route messages to the specific server holding the user's connection.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dbxd-q16", question: "How do you enforce storage limits?", answer: "The Metadata Server tracks the total size of all chunks associated with a user's account and rejects uploads that exceed the quota.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q17", question: "What happens if the Block Server fails during an upload?", answer: "The client will time out and retry uploading the failed chunks. Object storage handles the final persistence securely.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q18", question: "How is file sharing implemented?", answer: "A 'share' table in the metadata DB maps shared folders/files to other user IDs, granting them access to the same metadata and chunks.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-q19", question: "How do you handle end-to-end encryption?", answer: "Clients encrypt chunks locally before uploading. The server stores encrypted chunks and cannot read the contents. Keys are managed by the user.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "dbxd-q20", question: "Why not just use FTP/SFTP?", answer: "FTP doesn't natively support delta sync, real-time push notifications, deduplication, or efficient scaling for millions of users.", topic: "System Design Case Studies", difficulty: "Beginner" }
  ],
  commonFollowUps: [
    "How would you handle a user uploading a 100GB file?",
    "How does the system resolve conflicts when two users edit a file offline?",
    "How can you minimize latency for users globally distributed?"
  ],
  commonMistakes: [
    "Designing the system to upload whole files instead of chunks.",
    "Using a NoSQL database for the file hierarchy (metadata) without addressing ACID needs.",
    "Forgetting about deduplication, which is critical for saving storage costs."
  ],
  interviewTraps: [
    "Ignoring the client-side architecture. In Dropbox, the smart client is just as important as the backend.",
    "Polling for updates instead of using long-polling or WebSockets."
  ],
  tradeoffs: [
    "Chunk Size: Small chunks mean better delta sync but higher metadata overhead; large chunks mean less metadata but inefficient delta sync.",
    "Consistency vs. Availability: Dropbox prioritizes consistency for file metadata to prevent corruption, leading to potential unavailability during partitions.",
    "Client Memory vs. Sync Speed: Storing local metadata indices consumes RAM but speeds up change detection."
  ],
  memoryTrick: "Think 'Blocks & Meta'. Split the data into Blocks (S3) and the structure into Meta (RDBMS), tied together by push Notifications.",
  realWorldExamples: [
    "Dropbox uses a custom block storage system called Magic Pocket.",
    "Google Drive uses a similar chunking approach but deeply integrates with Google Docs for collaborative editing."
  ],
  mermaidDiagram: `flowchart TD
    Client -->|1. Request/Update Meta| MetaAPI[Metadata Server]
    Client -->|2. Upload/Download| BlockAPI[Block Server]
    Client <-->|3. Watch for Changes| Notify[Notification Server]
    
    MetaAPI <--> MetaDB[(Metadata DB)]
    BlockAPI --> S3[(Object Storage)]
    MetaAPI -->|Publish Events| MQ[Message Queue]
    MQ --> Notify`,
  flashcards: [
    { id: "dbxd-fc1", front: "Why chunk files in a sync service?", back: "To enable delta sync (uploading only changes), deduplication, and easy resumability of failed uploads.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "dbxd-fc2", front: "What database type is best for file metadata?", back: "Relational DB (SQL) due to the need for ACID guarantees on complex hierarchical file operations (move, rename).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-fc3", front: "How is real-time syncing achieved efficiently?", back: "Via long-polling or WebSockets connecting clients to a Notification Server.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-fc4", front: "What is deduplication?", back: "Hashing chunks to check if they already exist in storage, avoiding redundant uploads.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "dbxd-fc5", front: "How are conflicting concurrent edits resolved?", back: "Using optimistic concurrency control; the system saves both versions, labeling the second as a 'conflicted copy'.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Dropbox Design Cheat Sheet",
    sections: [
      { heading: "Core Components", items: ["Smart Client", "Metadata Server (SQL)", "Block Server", "Notification Server"] },
      { heading: "Key Mechanisms", items: ["4MB Chunks", "Delta Sync", "SHA-256 Deduplication", "Long-polling for events"] },
      { heading: "Storage", items: ["Amazon S3 for block data", "PostgreSQL/MySQL for metadata", "Redis for caching user data"] }
    ]
  },
  speedNotes: [
    "Files split into 4MB chunks.",
    "Only modified chunks are synced.",
    "Hash chunks for global deduplication.",
    "Metadata needs ACID (SQL DB).",
    "Clients use long-polling for updates."
  ]
};
