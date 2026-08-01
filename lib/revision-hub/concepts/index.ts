import type { ConceptRevisionContent } from "./types";
import { systemDesignFundamentals } from "./system-design-fundamentals";
import { functionalVsNonFunctional } from "./functional-vs-non-functional-requirements";
import { scalability } from "./scalability";
import { availability } from "./availability";
import { reliability } from "./reliability";
import { throughput } from "./throughput";
import { latency } from "./latency";
import { faultTolerance } from "./fault-tolerance";
import { horizontalVsVerticalScaling } from "./horizontal-vs-vertical-scaling";
import { capTheorem } from "./cap-theorem";
import { pacelc } from "./pacelc";
import { highAvailability } from "./high-availability";
import { disasterRecovery } from "./disaster-recovery";
import { sloSlaSli } from "./slo-sla-sli";
import { performanceMetrics } from "./performance-metrics";
import { http } from "./http";
import { https } from "./https";
import { tcp } from "./tcp";
import { udp } from "./udp";
import { dns } from "./dns";
import { cdn } from "./cdn";
import { proxy } from "./proxy";
import { reverseProxy } from "./reverse-proxy";
import { longPolling } from "./long-polling";
import { rest } from "./rest";
import { graphql } from "./graphql";
import { grpc } from "./grpc";
import { sql } from "./sql";
import { nosql } from "./nosql";
import { acid } from "./acid";
import { base } from "./base";
import { transactions } from "./transactions";
import { indexing } from "./indexing";
import { normalization } from "./normalization";
import { denormalization } from "./denormalization";
import { replication } from "./replication";
import { readReplicas } from "./read-replicas";
import { sharding } from "./sharding";
import { partitioning } from "./partitioning";
import { leaderFollower } from "./leader-follower";
import { multiLeader } from "./multi-leader";
import { objectStorage } from "./object-storage";
import { blockStorage } from "./block-storage";
import { fileStorage } from "./file-storage";
import { distributedFileSystems } from "./distributed-file-systems";
import { cachingFundamentals } from "./caching-fundamentals";
import { cacheAsidePattern } from "./cache-aside-pattern";
import { readThroughCache } from "./read-through-cache";
import { writeThroughCache } from "./write-through-cache";
import { writeBackCache } from "./write-back-cache";
import { refreshAheadCache } from "./refresh-ahead-cache";
// Prompt 2 — Caching
import { cacheInvalidation } from "./cache-invalidation";
import { ttl } from "./ttl";
import { cacheEvictionPolicies } from "./cache-eviction-policies";
import { redis } from "./redis";
// Prompt 3 — Load Balancing
import { memcached } from "./memcached";
import { layer4LoadBalancer } from "./layer-4-load-balancer";
import { layer7LoadBalancer } from "./layer-7-load-balancer";
import { loadBalancingAlgorithms } from "./load-balancing-algorithms";
// Prompt 4 — Load Balancing / Messaging
import { healthChecks } from "./health-checks";
import { stickySessions } from "./sticky-sessions";
import { messageQueues } from "./message-queues";
import { publishSubscribe } from "./publish-subscribe";
// Prompt 5 — Messaging
import { kafka } from "./kafka";
import { rabbitmq } from "./rabbitmq";
import { amazonSqs } from "./amazon-sqs";
import { eventDrivenArchitecture } from "./event-driven-architecture";
// Prompt 6 — Distributed Systems: Consensus
import { consensus } from "./consensus";
import { raft } from "./raft";
import { paxos } from "./paxos";
import { quorum } from "./quorum";
// Prompt 7 — Distributed Systems: Coordination
import { consistentHashing } from "./consistent-hashing";
import { distributedLocking } from "./distributed-locking";
import { leaderElection } from "./leader-election";
import { serviceDiscovery } from "./service-discovery";
// Prompt 8 — Distributed Systems: Clocks & Consistency
import { gossipProtocol } from "./gossip-protocol";
import { vectorClocks } from "./vector-clocks";
import { lamportClocks } from "./lamport-clocks";
import { eventualConsistency } from "./eventual-consistency";
// Prompt 9 — Architecture: Monolith → Microservices
import { monolith } from "./monolith";
import { microservices } from "./microservices";
import { serviceMesh } from "./service-mesh";
import { circuitBreaker } from "./circuit-breaker";
// Prompt 10 — Architecture: Resilience Patterns
import { retryPattern } from "./retry-pattern";
import { bulkheadPattern } from "./bulkhead-pattern";
import { sagaPattern } from "./saga-pattern";
import { cqrs } from "./cqrs";
// Prompt 11 — Architecture: Data Patterns
import { eventSourcing } from "./event-sourcing";
import { apiComposition } from "./api-composition";
import { databasePerService } from "./database-per-service";
import { idempotency } from "./idempotency";
// Prompt 12 — Security: Identity
import { authentication } from "./authentication";
import { authorization } from "./authorization";
import { oauth2 } from "./oauth-2";
import { jwt } from "./jwt";
// Prompt 13 — Security: Web
import { sessions } from "./sessions";
import { cookies } from "./cookies";
import { csrf } from "./csrf";
import { cors } from "./cors";
// Prompt 14 — Security: Protection & Infra
import { rateLimiting } from "./rate-limiting";
import { encryption } from "./encryption";
import { secretsManagement } from "./secrets-management";
import { docker } from "./docker";
// Prompt 15 — Cloud & Infrastructure
import { containers } from "./containers";
import { kubernetes } from "./kubernetes";
import { autoscaling } from "./autoscaling";
import { serverless } from "./serverless";
// Prompt 16 — Cloud & Observability
import { edgeComputing } from "./edge-computing";
import { logging } from "./logging";
import { metrics } from "./metrics";
import { monitoring } from "./monitoring";
// Prompt 17 — Observability: Advanced
import { distributedTracing } from "./distributed-tracing";
import { alerting } from "./alerting";
import { observability } from "./observability";
import { distributedSystemsOverview } from "./distributed-systems-overview";
// Prompt 18 — Case Studies I
import { urlShortenerDesign } from "./url-shortener-design";
import { youtubeDesign } from "./youtube-design";
import { whatsappDesign } from "./whatsapp-design";
import { instagramDesign } from "./instagram-design";
// Prompt 19 — Case Studies II
import { netflixDesign } from "./netflix-design";
import { twitterTimelineDesign } from "./twitter-timeline-design";
import { uberDesign } from "./uber-design";
import { googleDriveDesign } from "./google-drive-design";
// Prompt 20 — Case Studies III
import { dropboxDesign } from "./dropbox-design";
import { spotifyDesign } from "./spotify-design";
import { discordDesign } from "./discord-design";
import { slackDesign } from "./slack-design";
// Prompt 21 — Case Studies IV
import { searchEngineDesign } from "./search-engine-design";
import { paymentGatewayDesign } from "./payment-gateway-design";
import { notificationServiceDesign } from "./notification-service-design";
import { chatApplicationDesign } from "./chat-application-design";
// Prompt 22 — Case Studies V
import { hotelBookingDesign } from "./hotel-booking-design";
import { airlineReservationDesign } from "./airline-reservation-design";
import { ecommercePlatformDesign } from "./ecommerce-platform-design";
import { amazonCartDesign } from "./amazon-cart-design";
// Prompt 23 — Advanced Topics
import { bloomFilters } from "./bloom-filters";
import { distributedTransactions } from "./distributed-transactions";
import { databaseConnectionPooling } from "./database-connection-pooling";
import { backpressureFlowControl } from "./backpressure-flow-control";

// The single registry every Revision Hub page reads from. Adding a new
// concept is: write lib/revision-hub/concepts/<slug>.ts, then add it to
// this array — every aggregating page (Top Interview Questions,
// Flashcards, Cheat Sheets, Comparison Tables, Common Interview Mistakes,
// Top 100 Concepts, Interview Speed Notes) picks it up automatically,
// nothing else needs to change.
export const ALL_CONCEPTS: ConceptRevisionContent[] = [
  systemDesignFundamentals,
  functionalVsNonFunctional,
  scalability,
  availability,
  reliability,
  throughput,
  latency,
  faultTolerance,
  horizontalVsVerticalScaling,
  capTheorem,
  pacelc,
  highAvailability,
  disasterRecovery,
  sloSlaSli,
  performanceMetrics,
  http,
  https,
  tcp,
  udp,
  dns,
  cdn,
  proxy,
  reverseProxy,
  longPolling,
  rest,
  graphql,
  grpc,
  sql,
  nosql,
  acid,
  base,
  transactions,
  indexing,
  normalization,
  denormalization,
  replication,
  readReplicas,
  sharding,
  partitioning,
  leaderFollower,
  multiLeader,
  objectStorage,
  blockStorage,
  fileStorage,
  distributedFileSystems,
  cachingFundamentals,
  cacheAsidePattern,
  readThroughCache,
  writeThroughCache,
  writeBackCache,
  refreshAheadCache,
  // Prompt 2
  cacheInvalidation,
  ttl,
  cacheEvictionPolicies,
  redis,
  // Prompt 3
  memcached,
  layer4LoadBalancer,
  layer7LoadBalancer,
  loadBalancingAlgorithms,
  // Prompt 4
  healthChecks,
  stickySessions,
  messageQueues,
  publishSubscribe,
  // Prompt 5
  kafka,
  rabbitmq,
  amazonSqs,
  eventDrivenArchitecture,
  // Prompt 6
  consensus,
  raft,
  paxos,
  quorum,
  // Prompt 7
  consistentHashing,
  distributedLocking,
  leaderElection,
  serviceDiscovery,
  // Prompt 8
  gossipProtocol,
  vectorClocks,
  lamportClocks,
  eventualConsistency,
  // Prompt 9
  monolith,
  microservices,
  serviceMesh,
  circuitBreaker,
  // Prompt 10
  retryPattern,
  bulkheadPattern,
  sagaPattern,
  cqrs,
  // Prompt 11
  eventSourcing,
  apiComposition,
  databasePerService,
  idempotency,
  // Prompt 12
  authentication,
  authorization,
  oauth2,
  jwt,
  // Prompt 13
  sessions,
  cookies,
  csrf,
  cors,
  // Prompt 14
  rateLimiting,
  encryption,
  secretsManagement,
  docker,
  // Prompt 15
  containers,
  kubernetes,
  autoscaling,
  serverless,
  // Prompt 16
  edgeComputing,
  logging,
  metrics,
  monitoring,
  // Prompt 17
  distributedTracing,
  alerting,
  observability,
  distributedSystemsOverview,
  // Prompt 18
  urlShortenerDesign,
  youtubeDesign,
  whatsappDesign,
  instagramDesign,
  // Prompt 19
  netflixDesign,
  twitterTimelineDesign,
  uberDesign,
  googleDriveDesign,
  // Prompt 20
  dropboxDesign,
  spotifyDesign,
  discordDesign,
  slackDesign,
  // Prompt 21
  searchEngineDesign,
  paymentGatewayDesign,
  notificationServiceDesign,
  chatApplicationDesign,
  // Prompt 22
  hotelBookingDesign,
  airlineReservationDesign,
  ecommercePlatformDesign,
  amazonCartDesign,
  // Prompt 23
  bloomFilters,
  distributedTransactions,
  databaseConnectionPooling,
  backpressureFlowControl,
];

export function getConceptBySlug(slug: string): ConceptRevisionContent | undefined {
  return ALL_CONCEPTS.find((c) => c.slug === slug);
}

export function getConceptPrevNext(slug: string) {
  const idx = ALL_CONCEPTS.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? ALL_CONCEPTS[idx - 1] : null,
    next: idx >= 0 && idx < ALL_CONCEPTS.length - 1 ? ALL_CONCEPTS[idx + 1] : null,
  };
}

// --- Aggregation helpers, each tagged with which concept it came from so
// the consuming page can still show provenance / link back. ---

export function allQuestions() {
  return ALL_CONCEPTS.flatMap((c) => c.questions.map((q) => ({ ...q, concept: c.slug, conceptTitle: c.title })));
}

export function allFlashcards() {
  return ALL_CONCEPTS.flatMap((c) => c.flashcards.map((f) => ({ ...f, concept: c.slug, conceptTitle: c.title })));
}

export function allCheatSheets() {
  return ALL_CONCEPTS.map((c) => ({ concept: c.slug, conceptTitle: c.title, ...c.cheatSheet }));
}

export function allComparisonTables() {
  return ALL_CONCEPTS.filter((c) => c.comparisonTable).map((c) => ({
    concept: c.slug,
    conceptTitle: c.title,
    ...c.comparisonTable!,
  }));
}

export function allDecisionGuides() {
  return ALL_CONCEPTS.filter((c) => c.decisionGuide).map((c) => ({
    concept: c.slug,
    conceptTitle: c.title,
    root: c.decisionGuide!,
  }));
}

// "Mistakes" hub aggregates both commonMistakes and interviewTraps per
// concept, turned into Q&A-shaped items so <QAAccordion> can render them
// alongside the "how to say it instead" framing.
export function allMistakesAndTraps() {
  return ALL_CONCEPTS.flatMap((c) => [
    ...c.commonMistakes.map((m, i) => ({
      id: `${c.slug}-mistake-${i}`,
      question: `Common mistake — ${c.title}`,
      answer: m,
      concept: c.slug,
      conceptTitle: c.title,
      topic: c.topic,
    })),
    ...c.interviewTraps.map((t, i) => ({
      id: `${c.slug}-trap-${i}`,
      question: `Interview trap — ${c.title}`,
      answer: t,
      concept: c.slug,
      conceptTitle: c.title,
      topic: c.topic,
    })),
  ]);
}

// "Nuggets" hub pulls real-world examples out as SummaryCard-shaped data.
export function allRealWorldNuggets() {
  return ALL_CONCEPTS.map((c) => ({
    id: `${c.slug}-nuggets`,
    title: c.title,
    points: c.realWorldExamples,
    topic: c.topic,
    difficulty: c.difficulty,
  }));
}

// "Top 100 Concepts" pulls the 30-second answer as the one-line
// definition — genuinely one line, unlike the fuller detailedAnswer.
export function allOneLineDefinitions() {
  return ALL_CONCEPTS.map((c) => ({
    id: `${c.slug}-oneliner`,
    title: c.title,
    points: [c.thirtySecondAnswer],
    topic: c.topic,
    difficulty: c.difficulty,
  }));
}

export function allTopics(): string[] {
  return Array.from(new Set(ALL_CONCEPTS.map((c) => c.topic)));
}
