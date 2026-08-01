import type { ConceptRevisionContent } from "./types";

export const airlineReservationDesign: ConceptRevisionContent = {
  slug: "airline-reservation-design",
  title: "Airline Reservation System Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Airline Reservation System", href: "/docs/case-studies/airline-reservation" },
  ],
  summary: [
    "An airline reservation system manages flights, seat inventory, pricing, and ticketing.",
    "Unlike hotels, airline bookings often require exact seat selection and handle global distribution systems (GDS).",
    "High consistency is critical to avoid overbooking beyond the airline's set capacity strategies.",
    "Systems face extreme read-to-write ratios (e.g., 1000:1) as aggregators constantly scrape prices.",
    "Dynamic pricing engines play a crucial role in maximizing revenue per flight.",
  ],
  whyAsked: [
    "Assesses ability to handle complex concurrency issues like seat selection.",
    "Evaluates knowledge of integrating legacy systems (like GDS) with modern architectures.",
    "Tests understanding of transaction isolation levels.",
  ],
  thirtySecondAnswer: "Airline reservation systems handle extreme read-heavy traffic from users and aggregators. They require strict transactional consistency for booking to prevent double-booking seats. The architecture separates search (using caches and Elasticsearch) from booking (using relational databases). Flight data and pricing are synchronized with Global Distribution Systems (GDS). Concurrency is managed using row-level locking during booking, and saga patterns handle the distributed transaction across booking, payment, and ticketing services.",
  detailedAnswer: [
    "API Gateway handles routing, rate limiting (crucial against scraper bots), and auth.",
    "Flight Search Service queries cached routes and prices. It handles massive read traffic.",
    "Booking Service creates reservations. It uses a SQL database with ACID guarantees.",
    "Seat Allocation Service uses pessimistic locking (`SELECT FOR UPDATE`) on specific seat rows when a user is picking a seat.",
    "Dynamic Pricing Service recalculates prices based on demand, time to departure, and competitor prices, updating the cache.",
    "Integration with GDS (Amadeus, Sabre) via dedicated adapters, often dealing with eventual consistency and caching staleness issues.",
  ],
  questions: [
    { id: "ard-q1", question: "How do you prevent two users from booking the same seat?", answer: "Use a database transaction with a row-level lock (SELECT ... FOR UPDATE) on the seat record during the checkout process.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-q2", question: "How do you handle massive traffic from flight aggregators (Skyscanner, Kayak)?", answer: "Implement strict rate limiting, provide dedicated B2B APIs with batching, and serve most queries from heavily cached pre-computed routes.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ard-q3", question: "Why is an RDBMS preferred for the core booking engine?", answer: "Because booking a flight involves multiple operations (reserving seat, deducting inventory, creating PNR) that must succeed or fail together (ACID).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ard-q4", question: "What is a PNR?", answer: "Passenger Name Record. It's a unique identifier in the reservation system containing passenger and itinerary details.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ard-q5", question: "How do you handle seat locking timeout?", answer: "When a user selects a seat, record a 'locked' status with a timestamp. A background job (or TTL mechanism) releases locks older than 10 minutes.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-q6", question: "How do you update search caches with real-time seat availability?", answer: "Use Change Data Capture (CDC) on the booking DB to publish inventory change events to Kafka, which updates the search cache asynchronously.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ard-q7", question: "How do you implement dynamic pricing?", answer: "A pricing engine analyzes remaining seats, booking velocity, and historical data, periodically updating prices in the read cache.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-q8", question: "What happens if GDS integration fails during ticketing?", answer: "The system should queue the ticketing request for retry. If it ultimately fails, alert customer service or trigger a refund workflow.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ard-q9", question: "How do you shard the flight database?", answer: "Shard by Flight ID or Route ID. Since bookings are tied to specific flights, this keeps all related data on the same shard.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ard-q10", question: "How do you handle multi-city searches?", answer: "Graph databases or specialized search algorithms pre-compute and cache multi-leg route combinations.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ard-q11", question: "What is overbooking in airlines?", answer: "Airlines intentionally sell more tickets than seats, expecting cancellations. The system allows booking up to a defined overbooking limit.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-q12", question: "How to handle payment processing failures?", answer: "Release the seat lock, mark the PNR as cancelled, and notify the user to try again.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-q13", question: "Why might eventual consistency be acceptable for search?", answer: "Aggregators and users can tolerate slightly stale prices in search results, provided the final price is validated at checkout.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-q14", question: "How do you ensure idempotency in flight booking?", answer: "Include a unique idempotency key (like a UUID generated by the client) in the booking request to prevent duplicate charges on retries.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ard-q15", question: "How would you design the check-in system?", answer: "A separate service that issues boarding passes, assigns unallocated seats, and handles baggage data, scaling independently 24h before flights.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-q16", question: "How do you handle database replication lag?", answer: "For critical reads (like viewing the booked ticket), read from the primary DB. For general flight search, read from replicas.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "ard-q17", question: "How are notifications sent?", answer: "Via an async messaging queue. Booking service publishes an event, and the notification service handles SMS/email delivery.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ard-q18", question: "What caching strategies are used for flight search?", answer: "Write-through for pricing updates, and Cache-Aside for user queries. Memcached or Redis is commonly used.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-q19", question: "How to deal with timezone differences?", answer: "Store all timestamps in UTC in the database. Convert to local time zones at the presentation layer based on airport locations.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ard-q20", question: "How do you handle concurrent seat map views?", answer: "Serve seat maps from a fast cache (Redis), invalidating or updating specific seat status via pub/sub or WebSockets for live updates.", topic: "System Design Case Studies", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "How do you handle global distribution across multiple data centers?",
    "How do you deal with legacy GDS APIs that take seconds to respond?",
    "How would you implement live seat map updates for users?",
  ],
  commonMistakes: [
    "Using eventual consistency for seat booking.",
    "Not accounting for the massive read traffic from third-party aggregators.",
    "Failing to separate the ticketing process from the initial booking process.",
  ],
  interviewTraps: [
    "Designing a synchronous flow calling out to GDS during checkout, which can lead to timeouts and poor UX.",
    "Ignoring idempotency in payment and booking creation.",
  ],
  tradeoffs: [
    "Live Inventory vs Caching: Querying live DB for every search is accurate but unscalable. Heavy caching is scalable but results in 'price changed' errors at checkout.",
    "Sync vs Async Ticketing: Synchronous ticketing ensures immediate confirmation but is vulnerable to third-party outages. Async is robust but requires good UX to manage user expectations.",
  ],
  memoryTrick: "Lock the Seat, Delay the Ticket, Cache the Search.",
  realWorldExamples: [
    "Amadeus and Sabre handle the backend for many airlines globally.",
    "Modern airlines use event-driven architectures to decouple search from the legacy PNR mainframes.",
  ],
  mermaidDiagram: `flowchart TD
    Client --> AG[API Gateway]
    AG --> FS[Flight Search]
    AG --> BS[Booking Service]
    FS --> RC[(Redis Cache)]
    BS --> DB[(Relational DB)]
    BS --> PS[Payment Service]
    BS --> MQ[Message Queue]
    MQ --> TS[Ticketing Service]
    TS --> GDS[GDS API]
`,
  flashcards: [
    { id: "ard-fc1", front: "What database type handles airline reservations?", back: "Relational Database (SQL) for strict ACID properties.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ard-fc2", front: "What does GDS stand for?", back: "Global Distribution System (e.g., Amadeus, Sabre).", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "ard-fc3", front: "How do you prevent seat double-booking?", back: "Pessimistic locking (SELECT FOR UPDATE) on the seat row.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-fc4", front: "How to handle aggregator read traffic?", back: "Aggressive caching, rate limiting, and dedicated B2B batch APIs.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "ard-fc5", front: "How to update search caches efficiently?", back: "Use Change Data Capture (CDC) to stream inventory changes to the cache.", topic: "System Design Case Studies", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "Airline Reservation System",
    sections: [
      { heading: "Components", items: ["Search Engine", "Booking Engine", "Pricing Engine", "GDS Gateway"] },
      { heading: "Scaling Reads", items: ["Redis Caching", "Pre-computed routes", "Read Replicas"] },
      { heading: "Data Consistency", items: ["ACID for Bookings", "Pessimistic Locking for Seats", "Sagas for Distributed Transactions"] },
    ],
  },
  speedNotes: [
    "Extreme read-to-write ratio",
    "SQL for PNRs and seat locks",
    "GDS integration is crucial",
    "Async ticketing via queues",
    "CDC keeps caches updated",
  ],
};
