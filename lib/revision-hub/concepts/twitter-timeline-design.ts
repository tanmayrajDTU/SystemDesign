import type { ConceptRevisionContent } from "./types";

export const twitterTimelineDesign: ConceptRevisionContent = {
  slug: "twitter-timeline-design",
  title: "Twitter Timeline Architecture",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 25,
  docLinks: [
    { label: "Twitter Timeline", href: "/docs/case-studies/twitter-timeline" },
  ],
  summary: [
    "Twitter is a read-heavy system characterized by massive scale and celebrity 'fan-out' issues.",
    "The core challenge is generating and serving the home timeline quickly for hundreds of millions of users.",
    "Uses a mix of push (fan-out-on-write) and pull (fan-out-on-load) models.",
    "Redis is heavily utilized to store cached, pre-computed timelines for active users.",
    "Handling high-follower users (celebrities) requires hybrid strategies to avoid system overload.",
    "Eventual consistency is widely acceptable for tweets, prioritizing availability.",
    "Data partitioning and sharding are essential for managing the sheer volume of tweets."
  ],
  whyAsked: [
    "The quintessential 'fan-out' architectural problem.",
    "Tests understanding of push vs. pull data models.",
    "Evaluates caching strategies and memory management for hot data.",
    "Assesses ability to balance heavy read vs write workloads."
  ],
  thirtySecondAnswer: "Designing a Twitter timeline revolves around the fan-out problem. For most users, a 'push' model (fan-out-on-write) is used where a new tweet is inserted into the pre-computed Redis timeline caches of all followers. For celebrities with millions of followers, this push would take too long, so a 'pull' model is used instead; their tweets are pulled at read time and merged with the user's pre-computed timeline. This hybrid approach balances fast reads for users with manageable write loads on the system.",
  detailedAnswer: [
    "User generates a tweet -> Load balancer -> Write API -> Tweet Database.",
    "Fan-out Service triggers: It looks up followers of the user in a Graph Database.",
    "For normal users: Tweet ID is pushed into the Redis timeline lists of all followers.",
    "For celebrities: Tweet is not pushed. Instead, when a follower loads their timeline, the timeline service pulls recent celebrity tweets and merges them in memory.",
    "Timeline Read: User requests timeline -> Read API fetches from Redis cache -> Merges with celebrity tweets if necessary -> Hydrates tweet IDs with actual content -> Returns to user.",
    "Search integration: Tweets are ingested by a stream processing pipeline (Kafka) into search indexes (Elasticsearch/Lucene)."
  ],
  questions: Array.from({ length: 20 }).map((_, i) => ({
    id: `twtd-q${i + 1}`,
    question: `Twitter timeline question ${i + 1}`,
    answer: `Twitter timeline answer ${i + 1}.`,
    topic: "System Design Case Studies",
    difficulty: i < 7 ? "Beginner" : i < 14 ? "Intermediate" : "Advanced"
  })),
  commonFollowUps: [
    "How do you handle a trending topic causing a massive spike in searches?",
    "How does the system know who is a 'celebrity'?",
    "How are deleted tweets handled in pre-computed timelines?",
    "Explain how the social graph is stored and queried efficiently."
  ],
  commonMistakes: [
    "Suggesting purely SQL JOINs to generate timelines on the fly.",
    "Failing to address the celebrity fan-out problem.",
    "Pushing the entire tweet content into the Redis timeline instead of just the ID.",
    "Assuming strong consistency is needed for timelines."
  ],
  interviewTraps: [
    "Over-complicating the search functionality when the prompt is specifically about timelines.",
    "Designing a pure pull-based system which would melt databases on read."
  ],
  tradeoffs: [
    "Push vs Pull: Push offers O(1) reads but heavy writes. Pull offers O(1) writes but heavy reads. Hybrid optimizes for both.",
    "Redis vs Database for timelines: Redis provides blazing fast list operations necessary for timelines, but requires careful memory management and eviction policies."
  ],
  memoryTrick: "Push for the commoners, Pull for the celebrities. Hybrid fan-out.",
  realWorldExamples: [
    "Twitter's early shift from MySQL joins to Redis timelines.",
    "Instagram feed architecture uses similar push/pull principles."
  ],
  mermaidDiagram: `flowchart TD
    User -->|Write Tweet| Load_Balancer
    Load_Balancer --> Write_Service
    Write_Service --> Tweet_DB[(Tweet DB)]
    Write_Service --> Fanout_Service
    Fanout_Service -->|Push to Followers| Redis_Timelines[(Redis Cache)]
    Fanout_Service -.->|Ignore| Celebrity_Followers
    User2 -->|Read Timeline| Read_Service
    Read_Service --> Redis_Timelines
    Read_Service -->|Pull| Celebrity_Tweets[(Celebrity Cache)]
    Read_Service -->|Merge| User2`,
  flashcards: Array.from({ length: 5 }).map((_, i) => ({
    id: `twtd-fc${i + 1}`,
    front: `Twitter flashcard front ${i + 1}`,
    back: `Twitter flashcard back ${i + 1}`,
    topic: "System Design Case Studies",
    difficulty: "Advanced"
  })),
  cheatSheet: {
    title: "Twitter Timeline Architecture",
    sections: [
      { heading: "Data Models", items: ["Tweets (NoSQL/SQL)", "Social Graph (Graph DB)", "Timelines (Redis Lists)"] },
      { heading: "Fan-out Strategies", items: ["Push: Fan-out on write (normal users)", "Pull: Fan-out on load (celebrities)"] },
      { heading: "Scale Optimizations", items: ["Store IDs, not content in timelines", "LRU eviction for inactive users"] }
    ]
  },
  speedNotes: [
    "Read-heavy, massive fan-out.",
    "Pre-compute timelines in Redis.",
    "Push model for normal users.",
    "Pull model for celebrities.",
    "Eventual consistency is fine."
  ]
};
