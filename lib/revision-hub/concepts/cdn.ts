import type { ConceptRevisionContent } from "./types";

export const cdn: ConceptRevisionContent = {
  slug: "cdn",
  title: "CDN",
  topic: "Networking",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "CDN", href: "/docs/networking/cdn" },
    { label: "DNS", href: "/docs/networking/dns" },
  ],

  summary: [
    "A CDN is a geographically distributed network of servers (points of presence, or PoPs) that caches and serves content physically close to end users.",
    "Its reason for existing is physics, not software: latency is bounded by the speed of light, so the real fix for a distant server isn't a faster server, it's a closer one.",
    "It works best for static, cacheable content identical for every user — images, videos, JS/CSS bundles — and is less directly useful for highly personalized, dynamic responses.",
    "Cache behavior is driven by HTTP caching headers (Cache-Control, ETag) set by the origin, telling the CDN how long to cache and how to validate content.",
    "Beyond latency, a CDN absorbs a large share of total traffic at the edge, improving resilience against spikes and even DDoS attacks by not letting them reach the origin directly.",
    "Cache invalidation across many distributed edge locations is a genuinely hard problem — updates don't propagate instantly, which is the main real trade-off of using one.",
  ],

  whyAsked: [
    "It checks whether a candidate connects a physical constraint (speed of light / distance) to an architectural solution, rather than treating latency as a purely software problem.",
    "Cache-header and invalidation questions test whether a candidate understands the CDN isn't magic — it depends on correct origin configuration.",
    "It's a common follow-up after discussing scalability or global user bases, to see if a candidate reaches for it appropriately (and knows its limits).",
  ],

  thirtySecondAnswer:
    "A CDN is a geographically distributed network of edge servers that caches and serves content physically close to end users, because network latency is fundamentally bounded by distance — a closer server, not a faster one, is the real fix. It works best for static, cacheable content that's identical for every user, like images and JS/CSS bundles, driven by Cache-Control and ETag headers the origin sets; highly personalized or dynamic responses still have to reach the origin, though the CDN can still help there with TLS termination and DDoS absorption. Beyond latency, a CDN absorbs a large share of total traffic at the edge, which meaningfully improves resilience against traffic spikes and attacks. Its main real trade-off is cache invalidation: updates to cached content don't propagate to every edge location instantly, so freshness has to be deliberately managed, not assumed.",

  detailedAnswer: [
    "A CDN reduces latency by serving content from edge locations (PoPs) close to users instead of one distant origin.",
    "It's driven by origin-set caching headers (Cache-Control, ETag) — the CDN doesn't decide freshness on its own.",
    "Best fit: static, cacheable content identical for every user; weak fit: highly personalized per-request dynamic content.",
    "It also absorbs traffic spikes and DDoS load at the edge, and is commonly used for TLS termination even for otherwise dynamic APIs.",
    "Cache invalidation across many distributed edges is genuinely hard and not instantaneous — this is the real trade-off, not a minor detail.",
  ],

  questions: [
    { id: "cdn-q1", question: "What is a CDN, in one sentence?", answer: "A geographically distributed network of servers (points of presence) that caches and serves content from locations physically close to end users.", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-q2", question: "Why does physical distance matter for latency, fundamentally?", answer: "Network latency is bounded by the speed of light — a request to a distant server will always take longer than one to a nearby server, no matter how fast that distant server itself is.", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-q3", question: "What kind of content does a CDN help with most directly?", answer: "Static, cacheable content that's identical for every user — images, videos, JS/CSS bundles — anything with a URL returning the same content regardless of who requests it.", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-q4", question: "Why is a CDN less directly useful for highly personalized content?", answer: "Personalized responses differ per request/user, so there's little to usefully cache at a shared edge location — though the CDN can still help with TLS termination and DDoS protection.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q5", question: "What determines how a CDN caches a given piece of content?", answer: "HTTP caching headers set by the origin — Cache-Control (how long, whether it's cacheable at all) and ETag (how to validate whether cached content is still current).", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q6", question: "What happens on a CDN cache miss?", answer: "The edge PoP fetches the content from the origin, caches the response, and serves it to the user — subsequent nearby requests then get a cache hit.", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-q7", question: "How does a CDN improve resilience beyond just latency?", answer: "It absorbs a large fraction of total traffic (including spikes or DDoS attacks) at distributed edge locations, rather than all of it hitting the origin directly.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q8", question: "What's the main real trade-off of using a CDN?", answer: "Cache invalidation across many distributed edge locations is genuinely hard — updates to content don't propagate instantly, so stale content can persist for a while after an update.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q9", question: "What's the trade-off between long and short cache durations?", answer: "Longer durations reduce origin load and improve hit rates but let stale content persist longer after an update; shorter durations keep content fresher but reduce cache effectiveness and increase origin load.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q10", question: "Why might a CDN be useful even for a mostly-dynamic API?", answer: "It can still provide TLS termination and DDoS absorption as a general infrastructure layer, even if most responses themselves aren't cacheable.", topic: "Networking", difficulty: "Advanced" },
    { id: "cdn-q11", question: "How does a CDN route a user to their nearest edge location?", answer: "Typically via anycast networking or geo-DNS, directing the request to the physically closest available point of presence.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q12", question: "What's a common mistake with CDN cache-control configuration?", answer: "Not setting proper cache-control headers, either caching things that shouldn't be shared (serving stale personalized data to the wrong user) or failing to cache things that should be, losing the performance benefit.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q13", question: "Why does cache-key design matter for content that varies by locale or device?", answer: "If the cache key doesn't account for the variation, the CDN could serve the wrong variant (e.g. the wrong language) to a different user than the one who originally triggered that cached response.", topic: "Networking", difficulty: "Advanced" },
    { id: "cdn-q14", question: "What's an example of a CDN purpose-built for a specific content type at scale?", answer: "Netflix's Open Connect — a CDN specifically for video delivery, placing cache servers deep inside ISP networks so most video traffic never traverses the broader internet backbone.", topic: "Networking", difficulty: "Advanced" },
    { id: "cdn-q15", question: "When might a CDN provide minimal benefit?", answer: "For a very small, single-region user base, where the latency benefit of distributing content across global edge locations is minimal.", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-q16", question: "Is deploying a CDN for static assets a simple decision?", answer: "Yes — it's mostly configuration. Using a CDN effectively for more dynamic content (via edge compute or careful cache-key design) requires more deliberate design.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q17", question: "What should you keep off the CDN's cache entirely?", answer: "Per-user data like cart contents or personalized recommendations — content that's unique per request and not meaningfully cacheable should bypass the cache and go straight to origin.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q18", question: "Why is 'the CDN update is instant' a mistaken assumption?", answer: "Invalidating or updating cached content across a global edge network takes real time to propagate — it's not instantaneous just because it's a CDN.", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-q19", question: "How does serving static assets via CDN affect origin server load?", answer: "It absorbs a large fraction of requests at the edge, meaning the origin only has to serve cache misses rather than every request from every user worldwide.", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-q20", question: "What's the relationship between a CDN and DDoS protection?", answer: "Because traffic is distributed across many edge locations rather than concentrated at one origin, a CDN can absorb a large-scale attack across that distributed footprint instead of it overwhelming a single origin server.", topic: "Networking", difficulty: "Advanced" },
  ],

  commonFollowUps: [
    "\"How would a CDN help — or not help — with this specific type of content?\"",
    "\"What cache-control strategy would you use for content that updates rarely but must be accurate when it does?\"",
    "\"How does a CDN help with resilience against traffic spikes, beyond just latency?\"",
  ],

  commonMistakes: [
    "Not setting proper cache-control headers, causing stale or wrongly-shared content, or missed caching opportunities.",
    "Assuming a CDN update or invalidation is instantaneous across all edge locations.",
    "Using a CDN only for static assets while ignoring its value for TLS termination and DDoS absorption on dynamic APIs too.",
  ],

  interviewTraps: [
    "\"Just put a CDN in front of it\" for genuinely personalized, per-user data is a trap — the honest answer is that a CDN offers little direct caching benefit there.",
    "Being asked about a content update not showing up everywhere immediately is testing whether you understand cache invalidation is real, distributed work, not instant.",
  ],

  tradeoffs: [
    "Longer cache durations: less origin load, more stale-content risk after updates.",
    "Shorter cache durations: fresher content, less cache effectiveness and more origin load.",
  ],

  comparisonTable: {
    title: "Origin-only vs CDN-fronted",
    columns: ["Serving from origin only", "Serving via CDN"],
    rows: [
      { label: "Latency for distant users", values: ["High (bounded by distance)", "Low (served from nearby edge)"] },
      { label: "Origin load", values: ["100% of all traffic", "Only cache misses"] },
      { label: "Resilience to spikes/DDoS", values: ["Origin absorbs it directly", "Absorbed across distributed edges"] },
      { label: "Freshness", values: ["Always current", "Subject to cache invalidation lag"] },
    ],
  },

  memoryTrick:
    "\"Closer, not faster.\" A CDN doesn't make your origin server faster — it moves a copy of the answer physically nearer to the question.",

  realWorldExamples: [
    "An e-commerce site serves product images and JS/CSS bundles via CDN with long cache lifetimes, while cart and recommendation API calls bypass the cache and go straight to origin.",
    "Netflix's Open Connect places cache servers deep inside ISP networks specifically for video delivery, so most video traffic never crosses the broader internet backbone.",
  ],

  mermaidDiagram: `sequenceDiagram
    participant User as User (Tokyo)
    participant Edge as CDN Edge (Tokyo PoP)
    participant Origin as Origin Server (Virginia)
    User->>Edge: GET /logo.png
    alt cached at edge
        Edge-->>User: logo.png (fast, local)
    else not cached
        Edge->>Origin: GET /logo.png
        Origin-->>Edge: logo.png
        Edge-->>User: logo.png
    end`,

  flashcards: [
    { id: "cdn-fc1", front: "CDN — one-line definition", back: "A geographically distributed network of edge servers caching content close to end users.", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-fc2", front: "Why does a CDN reduce latency?", back: "Latency is bounded by distance (speed of light) — a nearby edge server beats a fast but distant origin.", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-fc3", front: "Best fit for CDN caching", back: "Static, cacheable content identical for every user (images, JS/CSS, video).", topic: "Networking", difficulty: "Beginner" },
    { id: "cdn-fc4", front: "What controls CDN caching behavior?", back: "Origin-set HTTP headers: Cache-Control (duration/cacheability) and ETag (validation).", topic: "Networking", difficulty: "Intermediate" },
    { id: "cdn-fc5", front: "Main real trade-off of a CDN", back: "Cache invalidation across distributed edges is hard and not instant — updates can lag.", topic: "Networking", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "CDN",
    sections: [
      { heading: "Core idea", items: ["Distance = latency (speed of light)", "Cache at edge PoPs near users"] },
      { heading: "Best for", items: ["Static assets: images, video, JS/CSS", "Content identical for every user"] },
      { heading: "Controlled by", items: ["Cache-Control header", "ETag validation"] },
      { heading: "Also provides", items: ["Origin load absorption", "DDoS absorption at the edge", "TLS termination"] },
    ],
  },

  speedNotes: [
    "CDN = edge servers near users, caching cacheable content.",
    "Fixes distance-bound latency, not server processing speed.",
    "Best for static/identical-for-everyone content, not per-user data.",
    "Cache behavior driven by Cache-Control/ETag from origin.",
    "Cache invalidation across edges is hard — not instant.",
  ],
};
