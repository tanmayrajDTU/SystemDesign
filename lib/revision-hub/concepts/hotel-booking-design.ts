import type { ConceptRevisionContent } from "./types";

export const hotelBookingDesign: ConceptRevisionContent = {
  slug: "hotel-booking-design",
  title: "Hotel Booking System Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Hotel Booking System", href: "/docs/case-studies/hotel-booking" },
  ],
  summary: [
    "A hotel booking system manages room inventory, reservations, pricing, and availability.",
    "The core challenge is preventing double-booking (concurrency control) in a highly concurrent environment.",
    "System needs high read scalability for searching and viewing hotels, but strong consistency for booking transactions.",
    "Commonly uses a relational database for transactions to ensure ACID properties during booking.",
    "Read-heavy components like search use Elasticsearch and caching layers to reduce latency.",
  ],
  whyAsked: [
    "Tests ability to handle concurrency and transaction isolation.",
    "Evaluates understanding of balancing read-heavy scale with write-heavy consistency.",
    "Assesses knowledge of microservices architecture in e-commerce contexts.",
  ],
  thirtySecondAnswer: "A hotel booking system is a read-heavy application requiring high availability for searches and strong consistency for bookings. The architecture typically involves microservices for Search, Booking, Inventory, and Payment. It uses Redis for caching hotel info, Elasticsearch for complex searches, and a Relational Database with row-level locking or optimistic concurrency control for booking transactions to prevent double booking. Asynchronous workflows using Kafka can handle post-booking tasks like notifications and analytics.",
  detailedAnswer: [
    "Use a CDN and API Gateway to route requests and cache static content.",
    "Search Service relies on Elasticsearch for geospatial and text queries, backed by a cache for frequent destinations.",
    "Booking Service uses a SQL database. To prevent double booking, it uses transaction isolation (e.g., Serializable or Repeatable Read) or optimistic locking (version numbers).",
    "Alternatively, a distributed lock (Redis/Zookeeper) can be used for room availability checking before starting a transaction.",
    "Inventory Service manages available rooms per day per hotel. Pre-aggregating availability can speed up searches.",
    "Saga pattern can be used for distributed transactions involving booking and external payment gateways.",
  ],
  questions: [
    { id: "hbd-q1", question: "How do you prevent double booking a room?", answer: "By using row-level locking (SELECT ... FOR UPDATE) in a relational database, or optimistic locking using a version column when updating room inventory.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q2", question: "Why use a SQL database for the booking service?", answer: "Because bookings require transactional integrity (ACID) to ensure inventory is atomically decremented and payments correlate with bookings.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "hbd-q3", question: "How would you handle high traffic during holiday seasons?", answer: "Scale read services horizontally, heavily cache hotel metadata, pre-compute availability, and use connection pooling for the database. Write traffic is lower and usually manageable with a beefy primary DB.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q4", question: "How do you implement search by location and dates?", answer: "Use Elasticsearch with geospatial indexing for location. Date availability can be queried via the Inventory service or periodically synced to the search index.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "hbd-q5", question: "What happens if the payment fails after the room is reserved?", answer: "The booking is marked as failed, and a rollback or compensation transaction frees up the reserved inventory using the Saga pattern.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "hbd-q6", question: "How do you handle a user holding a room while entering payment details?", answer: "Temporarily reserve the room with an expiration timestamp (e.g., 10 minutes) using a Redis TTL key or DB status. If it expires, a background job releases the room.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q7", question: "Should hotel images be stored in the database?", answer: "No, media should be stored in Blob Storage (like S3) and served via a CDN. The database only stores image URLs.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "hbd-q8", question: "How to ensure the search index is up-to-date with inventory?", answer: "Use Change Data Capture (CDC) or an event-driven approach where inventory updates publish events to Kafka, which then updates Elasticsearch.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "hbd-q9", question: "What is overbooking and how does the system handle it?", answer: "Overbooking is a business decision where hotels sell more rooms than they have. The system models this by setting inventory capacity > actual rooms (e.g., 110%).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q10", question: "How do you handle currency conversions?", answer: "Store prices in a base currency or integer cents. Perform conversion at the presentation layer or API gateway using cached exchange rates.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q11", question: "Why use microservices instead of a monolith?", answer: "Allows independent scaling of Search (read-heavy) and Booking (write-heavy), independent deployments, and fault isolation.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "hbd-q12", question: "How do you scale the booking database?", answer: "Read replicas can handle read queries. If write scaling is needed, shard the database by Hotel ID.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "hbd-q13", question: "What happens if a hotel updates its description?", answer: "The API updates the DB, invalidates the Redis cache for that hotel, and pushes the change to Elasticsearch asynchronously.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q14", question: "How do you handle third-party hotel aggregators scraping your site?", answer: "Implement rate limiting, API keys, CAPTCHAs, and anomaly detection in the WAF/API Gateway.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q15", question: "What is the CAP theorem implication for booking?", answer: "Booking prioritizes Consistency over Availability (CP). If a partition occurs, it's better to reject a booking than double-book.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "hbd-q16", question: "How do you model room inventory in the database?", answer: "A table with HotelID, RoomTypeID, Date, and AvailableCount. Bookings decrement AvailableCount for a range of dates.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q17", question: "How do you support dynamic pricing?", answer: "A Pricing Engine service subscribes to inventory events. As availability drops, it adjusts prices in real-time, caching them with a short TTL.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "hbd-q18", question: "What is the role of an API gateway here?", answer: "Routing requests, terminating SSL, rate limiting, authentication, and sometimes response aggregation.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "hbd-q19", question: "How do you handle booking cancellations?", answer: "Update the booking status, increment the available inventory in the DB, process the refund via Payment service, and notify the user.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-q20", question: "How to handle notifications?", answer: "Publish a 'BookingConfirmed' event to a message broker (Kafka/RabbitMQ). A Notification service consumes it and sends emails/SMS.", topic: "System Design Case Studies", difficulty: "Beginner" },
  ],
  commonFollowUps: [
    "How does the design change if we allow overbooking?",
    "How would you integrate with third-party payment gateways reliably?",
    "How would you handle a sudden surge in traffic for a specific city due to an event?",
  ],
  commonMistakes: [
    "Suggesting NoSQL for the core booking transaction logic.",
    "Forgetting to design a mechanism to release temporarily held rooms if booking isn't completed.",
    "Not addressing the separation between static hotel data (highly cacheable) and dynamic inventory data.",
  ],
  interviewTraps: [
    "Locking the entire hotel row instead of the specific room type and date, causing massive contention.",
    "Ignoring idempotency in the booking and payment API.",
  ],
  tradeoffs: [
    "Pessimistic vs. Optimistic Locking: Pessimistic prevents conflicts but reduces throughput. Optimistic increases throughput but requires handling retries on conflict.",
    "Microservices vs Monolith: Microservices add operational complexity and network latency but allow independent scaling of Search and Booking.",
  ],
  memoryTrick: "Search is Elastic, Booking is ACID.",
  realWorldExamples: [
    "Booking.com uses a massive MySQL cluster with sharding by destination for inventory management.",
    "Airbnb relies heavily on Redis and Elasticsearch for search speed, and MySQL for core transactional integrity.",
  ],
  mermaidDiagram: `flowchart TD
    User --> CDN
    CDN --> API[API Gateway]
    API --> SS[Search Service]
    API --> BS[Booking Service]
    SS --> ES[(Elasticsearch)]
    SS --> RC[(Redis Cache)]
    BS --> DB[(MySQL/PostgreSQL)]
    BS --> PS[Payment Service]
    BS --> IS[Inventory Service]
    IS --> DB
`,
  flashcards: [
    { id: "hbd-fc1", front: "What database is best for booking transactions?", back: "Relational DB (SQL) due to ACID requirements and transaction support.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "hbd-fc2", front: "How do you prevent double booking?", back: "Row-level locking (pessimistic) or versioning (optimistic locking).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-fc3", front: "How to handle temporary room holds?", back: "Reserve with an expiration timestamp or Redis TTL; release if payment not completed.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "hbd-fc4", front: "What is used to scale the search functionality?", back: "Elasticsearch for queries and Redis for caching frequent searches.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "hbd-fc5", front: "How should hotel descriptions and static data be served?", back: "Through a CDN, fetching from a distributed cache/Blob storage, minimizing DB hits.", topic: "System Design Case Studies", difficulty: "Beginner" },
  ],
  cheatSheet: {
    title: "Hotel Booking System",
    sections: [
      { heading: "Core Services", items: ["Search Service", "Booking Service", "Inventory Service", "Payment Service"] },
      { heading: "Data Stores", items: ["MySQL (Transactions)", "Elasticsearch (Search)", "Redis (Caching)", "S3 (Media)"] },
      { heading: "Key Challenges", items: ["Preventing double-booking", "Handling concurrency", "Eventual consistency for search index"] },
    ],
  },
  speedNotes: [
    "Read-heavy search, write-heavy booking",
    "SQL required for ACID transactions",
    "Elasticsearch handles complex search queries",
    "Optimistic locking prevents double bookings",
    "Temporary reservations expire via TTL",
  ],
};
