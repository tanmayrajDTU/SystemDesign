import type { ConceptRevisionContent } from "./types";

export const youtubeDesign: ConceptRevisionContent = {
  slug: "youtube-design",
  title: "YouTube Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 45,
  docLinks: [
    { label: "YouTube Design", href: "/docs/case-studies/youtube" }
  ],
  summary: [
    "Designing YouTube involves handling massive video uploads, processing, and streaming.",
    "The system needs a clear separation between the read path (streaming) and write path (upload).",
    "Video transcoding is a massive async task that requires breaking videos into chunks and processing them in parallel.",
    "CDNs are critical for delivering video content with low latency globally.",
    "Metadata is stored in a structured database, while video files are stored in object storage (e.g., S3)."
  ],
  whyAsked: [
    "It tests your ability to handle large-scale binary data (videos).",
    "It evaluates your knowledge of asynchronous processing and distributed task queues.",
    "It requires deep understanding of CDNs, caching, and network bandwidth optimization."
  ],
  thirtySecondAnswer: "YouTube separates video uploading and streaming. Uploads go to object storage, triggering an async video processing pipeline that chunks the video, transcodes it into multiple formats and resolutions, and pushes the results to CDNs. Metadata is stored in a scalable database (e.g., Vitess or sharded MySQL). Streaming relies heavily on CDNs serving adaptive bitrate chunks (e.g., DASH or HLS) to ensure smooth playback under varying network conditions.",
  detailedAnswer: [
    "Read vs Write: The read path (viewing) is much larger than the write path (uploading), but writes are extremely resource-intensive (transcoding).",
    "Upload Process: Upload videos directly to object storage via presigned URLs, resuming interrupted uploads if necessary.",
    "Processing Pipeline: Use a message queue (Kafka) to trigger workers that split the video into chunks (e.g., GOP chunks) and transcode them in parallel.",
    "Formats: Transcode into multiple resolutions (1080p, 720p, etc.) and formats (H.264, VP9) for different devices.",
    "Storage: Object storage (S3) for raw and processed videos. Sharded relational DB (MySQL/Vitess) or NoSQL for metadata (titles, likes, comments).",
    "Delivery: Use Content Delivery Networks (CDNs) to cache and serve video chunks close to the user.",
    "Streaming Protocol: Use DASH (Dynamic Adaptive Streaming over HTTP) or HLS to adapt video quality in real-time based on the user's bandwidth."
  ],
  questions: [
    { id: "ytd-q1", question: "What is the primary storage mechanism for video files?", answer: "Object storage like Amazon S3 or Google Cloud Storage.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ytd-q2", question: "Why separate metadata from video storage?", answer: "Metadata is small, structured, and queried frequently; videos are large binary blobs. They have completely different scaling profiles.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ytd-q3", question: "What is a CDN and why is it essential for YouTube?", answer: "A Content Delivery Network caches static content near users, drastically reducing latency and backbone network bandwidth.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ytd-q4", question: "How do you handle massive video uploads without failure?", answer: "Use chunked, resumable uploads directly to object storage using presigned URLs.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ytd-q5", question: "What is video transcoding?", answer: "Converting a video file from one format/resolution to another (e.g., 4K to 720p) to support various devices and network speeds.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ytd-q6", question: "How do you parallelize video transcoding?", answer: "Split the video into small chunks (e.g., based on keyframes/GOP) and have multiple worker nodes process them simultaneously.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ytd-q7", question: "What is Adaptive Bitrate Streaming?", answer: "A technique that adjusts the quality of a video stream in real-time based on the user's current network bandwidth.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ytd-q8", question: "Which protocols are used for modern video streaming?", answer: "HLS (HTTP Live Streaming) and DASH (Dynamic Adaptive Streaming over HTTP).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ytd-q9", question: "How do you design the view count system?", answer: "Batch view events in memory or Kafka, then periodically flush them to the database to prevent write contention.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ytd-q10", question: "How do you handle generating thumbnails?", answer: "During the transcoding phase, workers extract specific frames (e.g., every 5 seconds) and save them to object storage.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ytd-q11", question: "What database architecture does YouTube use for metadata?", answer: "They traditionally use heavily sharded MySQL (often via Vitess) to handle the massive scale of metadata and relational queries.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q12", question: "How do you minimize CDN costs for unpopular videos?", answer: "Only cache popular (hot) videos in the CDN. Serve long-tail (cold) videos directly from centralized object storage.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q13", question: "How do you ensure strong consistency for video uploads before making them public?", answer: "Use a state machine in the metadata DB. Only mark the video 'published' once the async transcoding pipeline fully completes.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q14", question: "What is a DAG (Directed Acyclic Graph) in the context of YouTube?", answer: "A DAG models the video processing pipeline tasks (e.g., extract audio, generate thumbnails, transcode to 720p) and their dependencies.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q15", question: "How do you protect videos from unauthorized downloading?", answer: "Use DRM (Digital Rights Management) encryption and secure signed URLs for video chunks.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q16", question: "How do you handle global metadata replication?", answer: "Use a multi-region database setup with asynchronous replication, allowing local reads with slight eventual consistency.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q17", question: "How would you design the search feature for YouTube?", answer: "Ingest metadata and transcripts into an inverted index engine like Elasticsearch.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q18", question: "How do you handle live streaming?", answer: "Live streaming requires low-latency ingestion via RTMP/WebRTC, rapid on-the-fly transcoding, and distribution via specialized low-latency CDNs.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q19", question: "What happens if a transcode worker fails mid-process?", answer: "The task queue (e.g., Kafka/RabbitMQ) relies on acknowledgments. Unacknowledged tasks are re-queued to healthy workers.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-q20", question: "How do you optimize storage for multiple video resolutions?", answer: "Keep only the highest resolution as a master copy for long-tail videos and transcode on-the-fly, while pre-transcoding popular videos.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How do you design the recommendation system?",
    "How do you handle view count manipulation?",
    "How does the system change for live streaming (Twitch/YouTube Live)?",
    "How do you optimize CDN costs?"
  ],
  commonMistakes: [
    "Transcoding the video synchronously on the API server.",
    "Forgetting to split the video into chunks for parallel processing.",
    "Not using a CDN for video delivery.",
    "Updating the view count database synchronously on every view."
  ],
  interviewTraps: [
    "Assuming all videos need to be pushed to every edge CDN node (too expensive; only push popular ones).",
    "Using a monolithic relational database for everything without discussing sharding or NoSQL for scale."
  ],
  tradeoffs: [
    "Pre-transcoding all resolutions (high storage cost, fast playback) vs Transcoding on-the-fly (high compute cost, slow startup).",
    "Strong consistency (slower) vs Eventual consistency (faster) for view counts and likes.",
    "Storing metadata in SQL (relational, transactions) vs NoSQL (easier scaling)."
  ],
  memoryTrick: "Chunks + DAG Workers + S3 + CDN + DASH.",
  realWorldExamples: [
    "YouTube uses Vitess to horizontally scale MySQL.",
    "Netflix and YouTube both use adaptive bitrate streaming to adjust quality dynamically."
  ],
  mermaidDiagram: "flowchart LR\n    Client --> API[API Gateway]\n    Client -.-> CDN[CDN - Video Chunks]\n    API --> DB[(Metadata DB)]\n    API --> Queue[Kafka/Queue]\n    Queue --> Workers[Transcoding DAG]\n    Workers --> S3[(Object Storage)]\n    S3 -.-> CDN",
  flashcards: [
    { id: "ytd-fc1", front: "Where are video files stored?", back: "Object Storage (e.g., Amazon S3).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ytd-fc2", front: "What handles video delivery to end users?", back: "Content Delivery Networks (CDNs).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ytd-fc3", front: "How is video transcoding parallelized?", back: "By splitting the video into smaller chunks and processing them concurrently.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ytd-fc4", front: "What protocols enable adaptive quality streaming?", back: "DASH and HLS.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ytd-fc5", front: "How are view counts updated efficiently?", back: "Batched in memory or via stream processing before writing to the database.", topic: "System Design Case Studies", difficulty: "Intermediate" }
  ],
  cheatSheet: {
    title: "YouTube Design Cheat Sheet",
    sections: [
      { heading: "Storage", items: ["Videos: S3 / Object Storage", "Metadata: Sharded RDBMS / NoSQL"] },
      { heading: "Processing", items: ["Async Pipeline", "Parallel Chunk Processing", "DAG Task Management"] },
      { heading: "Delivery", items: ["CDN caching", "Adaptive Bitrate (HLS/DASH)"] }
    ]
  },
  speedNotes: [
    "Object storage for videos.",
    "Async parallel transcoding.",
    "CDN for low latency.",
    "Adaptive bitrate streaming.",
    "Batch view count updates."
  ]
};
