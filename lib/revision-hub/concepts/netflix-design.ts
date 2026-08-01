import type { ConceptRevisionContent } from "./types";

export const netflixDesign: ConceptRevisionContent = {
  slug: "netflix-design",
  title: "Netflix Architecture",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 30,
  docLinks: [
    { label: "Netflix System Design", href: "/docs/case-studies/netflix" },
  ],
  summary: [
    "Netflix is a global streaming service that accounts for a massive chunk of internet traffic.",
    "The system fundamentally divides into the Control Plane (AWS) and Data Plane (Open Connect).",
    "Key challenges include streaming video seamlessly on various devices at varying network speeds.",
    "Data replication across regions ensures high availability and disaster recovery.",
    "Content distribution uses specialized CDN nodes (Open Connect Appliances) placed directly inside ISPs.",
    "Focuses heavily on personalized recommendations using big data pipelines.",
    "Microservices architecture enables independent scaling and deployment of features."
  ],
  whyAsked: [
    "Tests understanding of global-scale content delivery (CDN).",
    "Evaluates knowledge of microservices and circuit breaker patterns.",
    "Requires balancing user personalization with heavy static asset delivery.",
    "Focuses on high availability and fault tolerance (Chaos Engineering)."
  ],
  thirtySecondAnswer: "Designing Netflix involves splitting the architecture into the Control Plane and Data Plane. The Control Plane runs on AWS, handling microservices for authentication, recommendations, user profiles, and device management. The Data Plane uses Netflix's custom CDN, Open Connect (OCA), to serve heavy video files from nodes directly embedded within ISPs to minimize latency and backbone traffic. Critical aspects include adaptive bitrate streaming, globally replicated databases (Cassandra) for state, and chaos engineering for resilience.",
  detailedAnswer: [
    "Control Plane (AWS): Handles signups, login, billing, metadata, and the recommendation engine.",
    "Data Plane (Open Connect): A custom CDN that proactively pushes daily content to ISPs globally during off-peak hours.",
    "Storage: Uses Cassandra for high write-availability (user view history) and EVCache for heavy caching.",
    "Transcoding: Video files are transcoded into multiple formats and bitrates in AWS to support adaptive streaming.",
    "Playback flow: Client requests video -> Control plane checks auth/license -> Returns closest Open Connect Appliace URL -> Client streams from OCA.",
    "Resilience: Built on microservices using tools like Hystrix (circuit breakers) and Chaos Monkey to ensure the system survives individual component failures."
  ],
  questions: Array.from({ length: 20 }).map((_, i) => ({
    id: `nfd-q${i + 1}`,
    question: `Netflix question ${i + 1}`,
    answer: `Netflix answer ${i + 1}.`,
    topic: "System Design Case Studies",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "How do you handle a thundering herd when a new popular show drops?",
    "How does Netflix decide which video quality to stream?",
    "Explain how Open Connect Appliances are populated with content.",
    "How does Netflix handle active-active region failovers?"
  ],
  commonMistakes: [
    "Designing the CDN to pull videos on-demand rather than pre-pushing.",
    "Trying to serve video traffic directly from standard AWS instances.",
    "Ignoring the difference in traffic between the control plane and data plane.",
    "Forgetting adaptive bitrate streaming as a requirement for mobile users."
  ],
  interviewTraps: [
    "Getting bogged down in the video transcoding logic instead of the overall architecture.",
    "Suggesting a purely relational database for global, highly-available user metadata."
  ],
  tradeoffs: [
    "Custom CDN (Open Connect) vs Commercial CDN (Akamai/Cloudflare): Custom CDN is cheaper at Netflix's massive scale and allows direct ISP integration.",
    "Cassandra vs MySQL: Cassandra provides active-active multi-region writes but sacrifices strong consistency, which is acceptable for view histories."
  ],
  memoryTrick: "Control the chaos in the Cloud, serve the stream from the Edge (Open Connect).",
  realWorldExamples: [
    "Netflix's Open Connect Appliance (OCA) architecture.",
    "Netflix Zuul for API Gateway and Hystrix for circuit breaking."
  ],
  mermaidDiagram: `flowchart TD
    Client -->|API Requests| API_Gateway
    Client -->|Video Stream| OCA
    API_Gateway --> Auth_Service
    API_Gateway --> Playback_Service
    Playback_Service --> DB[(Cassandra)]
    Playback_Service --> OCA_Registry
    OCA_Registry -.->|Selects best| OCA`,
  flashcards: Array.from({ length: 5 }).map((_, i) => ({
    id: `nfd-fc${i + 1}`,
    front: `Netflix flashcard front ${i + 1}`,
    back: `Netflix flashcard back ${i + 1}`,
    topic: "System Design Case Studies",
    difficulty: "Advanced"
  })),
  cheatSheet: {
    title: "Netflix Architecture",
    sections: [
      { heading: "Core Components", items: ["Control Plane (AWS)", "Data Plane (Open Connect)", "Transcoding Pipeline"] },
      { heading: "Databases", items: ["Cassandra (user history, state)", "EVCache (fast lookups)", "MySQL (billing)"] },
      { heading: "Resilience", items: ["Chaos Monkey", "Circuit Breakers (Hystrix)", "Active-Active Multi-Region"] }
    ]
  },
  speedNotes: [
    "Split into Control (AWS) & Data (CDN) planes.",
    "Open Connect embeds in ISPs.",
    "Cassandra for high-write viewing history.",
    "Adaptive bitrate streaming for variable networks.",
    "Chaos engineering ensures high resilience."
  ]
};
