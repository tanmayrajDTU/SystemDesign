import type { ConceptRevisionContent } from "./types";

export const uberDesign: ConceptRevisionContent = {
  slug: "uber-design",
  title: "Uber Architecture",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 30,
  docLinks: [
    { label: "Uber System Design", href: "/docs/case-studies/uber" },
  ],
  summary: [
    "Uber is a highly dynamic dispatch system matching riders with drivers in real-time.",
    "Requires high availability, low latency, and robust handling of geospatial data.",
    "Drivers constantly broadcast their location via WebSockets or Long Polling.",
    "Geospatial indexing (like S2 or H3 geometry) is critical for efficient nearby-driver lookups.",
    "The core dispatch system acts as a real-time state machine.",
    "Services are heavily decoupled, dealing with maps, routing, payments, and notifications.",
    "Relies on stream processing (Kafka) for analytics, pricing, and ETA calculation."
  ],
  whyAsked: [
    "Complex real-time interaction between multiple client types (rider, driver).",
    "Deep dive into geospatial data structures and algorithms.",
    "Evaluates handling of high-frequency location updates.",
    "Tests distributed transactions and consistency (e.g., payment, booking)."
  ],
  thirtySecondAnswer: "Designing Uber requires managing continuous streams of location data and complex state transitions. Drivers send location updates every few seconds via WebSockets to a Location Service, which stores them in a memory-optimized geospatial index (like Redis with GeoHash, or Uber's H3). When a rider requests a car, the Dispatch Service queries the index for nearby drivers, filters them by ETA (via a Routing Service), and proposes the trip. State is managed carefully as the trip moves from accepted, to in-progress, to completed, handling edge cases like network drops or simultaneous requests.",
  detailedAnswer: [
    "Driver Location Updates: WebSockets push lat/lng every 4s. Location service updates the geospatial index and an in-memory datastore.",
    "Geospatial Indexing: Maps the earth into grids (Uber uses H3 hexagonal grids) allowing O(1) or O(log N) lookups for drivers in a specific area.",
    "Trip Request: Rider app sends request -> API Gateway -> Dispatch Service.",
    "Dispatch Logic: Finds top drivers in nearby grids -> calls Routing Service (maps) for actual ETAs -> ranks drivers -> sends offer via notification/WebSocket.",
    "Trip State Machine: Manages transitions (Requested -> Driver found -> Arriving -> In Transit -> Completed) stored in a persistent DB (Cassandra).",
    "Analytics/Surge Pricing: Kafka consumes all events (requests, locations) to power real-time surge pricing and ETAs."
  ],
  questions: Array.from({ length: 20 }).map((_, i) => ({
    id: `ubrd-q${i + 1}`,
    question: `Uber design question ${i + 1}`,
    answer: `Uber design answer ${i + 1}.`,
    topic: "System Design Case Studies",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "How does the system handle driver network disconnection during a ride?",
    "Explain how surge pricing would be calculated in real-time.",
    "How do you prevent multiple riders from being assigned to the same driver?",
    "How does geospatial sharding work if a city has millions of drivers?"
  ],
  commonMistakes: [
    "Using a standard SQL database for storing real-time driver locations.",
    "Calculating ETAs based on straight-line distance instead of road networks.",
    "Failing to account for concurrent dispatch conflicts (race conditions).",
    "Not mentioning WebSockets for bi-directional real-time communication."
  ],
  interviewTraps: [
    "Getting stuck on the traveling salesperson problem instead of focusing on system components.",
    "Over-engineering the payment flow when the core problem is dispatch."
  ],
  tradeoffs: [
    "WebSockets vs Long Polling: WebSockets maintain persistent connections for lower latency, but require more complex load balancing than stateless HTTP.",
    "In-memory Geo-Index vs Persistent DB: In-memory (Redis) allows handling high-frequency writes, while a DB provides durability. A hybrid is often used (memory for real-time, DB for historical tracking)."
  ],
  memoryTrick: "Grid the globe, stream the spots, match the ride.",
  realWorldExamples: [
    "Uber's use of H3 hex grids.",
    "Lyft's similar envoy-based microservice architecture."
  ],
  mermaidDiagram: `flowchart TD
    Driver((Driver)) <-->|WebSockets| API_Gateway
    Rider((Rider)) -->|HTTP| API_Gateway
    API_Gateway --> Location_Service
    Location_Service --> Geo_Index[(Memory Geo-Index)]
    API_Gateway --> Dispatch_Service
    Dispatch_Service --> Geo_Index
    Dispatch_Service --> Routing_Service
    Routing_Service --> Map_Data[(Maps)]
    Dispatch_Service --> Trip_DB[(Cassandra)]`,
  flashcards: Array.from({ length: 5 }).map((_, i) => ({
    id: `ubrd-fc${i + 1}`,
    front: `Uber flashcard front ${i + 1}`,
    back: `Uber flashcard back ${i + 1}`,
    topic: "System Design Case Studies",
    difficulty: "Advanced"
  })),
  cheatSheet: {
    title: "Uber Architecture",
    sections: [
      { heading: "Core Services", items: ["Location Service", "Dispatch Service", "Routing/ETA Service"] },
      { heading: "Technologies", items: ["WebSockets (real-time)", "H3/GeoHash (spatial index)", "Kafka (event stream)"] },
      { heading: "Key Challenges", items: ["Concurrent dispatch matching", "High-frequency location writes", "Handling network drops"] }
    ]
  },
  speedNotes: [
    "Real-time location tracking.",
    "WebSockets for continuous updates.",
    "Geospatial indexing (H3/GeoHash).",
    "Dispatch state machine.",
    "Event streams for surge pricing."
  ]
};
