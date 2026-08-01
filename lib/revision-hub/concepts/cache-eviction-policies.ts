import type { ConceptRevisionContent } from "./types";

export const cacheEvictionPolicies: ConceptRevisionContent = {
  slug: "cache-eviction-policies",
  title: "Cache Eviction Policies",
  topic: "Caching",
  difficulty: "Intermediate",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Eviction Policies Docs", href: "/docs/caching/eviction-policies" },
    { label: "Caching Strategies", href: "/docs/caching/caching-strategies" },
  ],
  summary: [
    "Cache eviction policies determine which items to remove when a cache reaches its capacity limit.",
    "Since caches have limited memory, algorithms are needed to maximize the cache hit ratio.",
    "LRU (Least Recently Used) is the most common default policy in systems like Redis and Memcached.",
    "Other policies include LFU (Least Frequently Used), FIFO (First In First Out), and Random.",
    "The choice of policy depends entirely on the access patterns of the application."
  ],
  whyAsked: [
    "To test your understanding of data structures (like how to implement LRU using Hash Map + Doubly Linked List).",
    "To see if you can match a specific algorithm to a specific real-world access pattern.",
    "To evaluate your knowledge of cache optimization and performance tuning."
  ],
  thirtySecondAnswer: "Cache eviction policies decide what data to throw away when the cache is full. LRU (Least Recently Used) discards the oldest accessed item and is great for temporal locality. LFU (Least Frequently Used) discards the item accessed the fewest times, good for stable popularity but harder to implement. FIFO discards the oldest inserted item. Random just picks any item, which is fast with zero overhead. You choose a policy based on whether your data access is recency-biased, frequency-biased, or unpredictable.",
  detailedAnswer: [
    "LRU assumes that data accessed recently will likely be accessed again soon. Implemented via Hash Map + Doubly Linked List for O(1) operations.",
    "LFU assumes that data accessed often will continue to be accessed often. Requires tracking access counts, which adds memory and computational overhead.",
    "FIFO ignores access patterns and just evicts the oldest item inserted. Simple, but can evict popular items.",
    "Random eviction has low overhead and works surprisingly well when access patterns are completely unpredictable.",
    "Modern caches often use variants like W-TinyLFU to combine the benefits of recency and frequency without massive overhead."
  ],
  questions: [
    { id: "cevp-q1", question: "What is a cache eviction policy?", answer: "A rule deciding which data to remove when the cache is full.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-q2", question: "What does LRU stand for?", answer: "Least Recently Used.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-q3", question: "What does LFU stand for?", answer: "Least Frequently Used.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-q4", question: "How does LRU work?", answer: "It evicts the item that hasn't been accessed for the longest time.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-q5", question: "What data structures are used to implement an O(1) LRU cache?", answer: "A Hash Map and a Doubly Linked List.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cevp-q6", question: "Why use a Doubly Linked List for LRU instead of an Array?", answer: "To allow O(1) removal of nodes from the middle when they are accessed.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cevp-q7", question: "How does LFU work?", answer: "It evicts the item with the lowest access count.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-q8", question: "What is a major problem with LFU?", answer: "Historical heavy hitters might never be evicted even if they are no longer used.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cevp-q9", question: "How do you fix LFU's historical bias?", answer: "By periodically decaying or halving the access counts.", topic: "Caching", difficulty: "Advanced" },
    { id: "cevp-q10", question: "What is FIFO eviction?", answer: "First In, First Out. Evicts the oldest inserted item.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-q11", question: "When might Random eviction be a good choice?", answer: "When access patterns are completely random or overhead must be absolutely minimized.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cevp-q12", question: "What is Belady's Anomaly?", answer: "In FIFO, increasing cache size can sometimes cause more cache misses.", topic: "Caching", difficulty: "Advanced" },
    { id: "cevp-q13", question: "Does LRU suffer from Belady's Anomaly?", answer: "No, LRU is a stack algorithm and does not suffer from it.", topic: "Caching", difficulty: "Advanced" },
    { id: "cevp-q14", question: "What is LIFO eviction?", answer: "Last In, First Out. Rarely used in caching as it discards the newest data.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-q15", question: "How does Redis implement LRU?", answer: "It uses an approximated LRU by sampling a few keys and evicting the oldest among them to save memory.", topic: "Caching", difficulty: "Advanced" },
    { id: "cevp-q16", question: "What is W-TinyLFU?", answer: "A modern policy used by Caffeine (Java) combining LFU for the main cache and LRU for an admission window.", topic: "Caching", difficulty: "Advanced" },
    { id: "cevp-q17", question: "If your app shows a 'Trending Now' feed, which policy is better: LRU or LFU?", answer: "LRU, as trends change rapidly and LFU might hold onto yesterday's trend too long.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cevp-q18", question: "If caching static global config data, what policy might be best?", answer: "LFU, because the same config keys are read heavily and constantly.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cevp-q19", question: "How does TTL interact with eviction policies?", answer: "TTLs passively remove items over time; eviction policies actively remove items when space runs out.", topic: "Caching", difficulty: "Intermediate" },
    { id: "cevp-q20", question: "What happens if a cache has no eviction policy and gets full?", answer: "It either rejects new writes or crashes.", topic: "Caching", difficulty: "Beginner" }
  ],
  commonFollowUps: [
    "Code an LRU Cache on the whiteboard right now.",
    "How does Redis approximate LRU without a massive linked list?",
    "How would you implement an O(1) LFU cache?"
  ],
  commonMistakes: [
    "Confusing TTL (time-based expiration) with Eviction (capacity-based removal).",
    "Assuming LFU is always better than LRU because it tracks 'popularity'."
  ],
  interviewTraps: [
    "Forgetting that maintaining pointers in LRU requires extra memory, which reduces the actual cache capacity."
  ],
  tradeoffs: [
    "LRU vs LFU: LRU handles changing trends better; LFU handles stable popularity better but uses more memory.",
    "Accuracy vs Performance: Exact LRU requires locks and pointers; approximated LRU is faster and uses less memory."
  ],
  comparisonTable: {
    title: "LRU vs LFU vs FIFO vs Random",
    columns: ["Policy", "Evicts", "Best For", "Overhead"],
    rows: [
      { label: "LRU", values: ["Oldest access", "Recency-biased data (News feed)", "Medium (Pointers)"] },
      { label: "LFU", values: ["Lowest frequency", "Stable popularity (Static assets)", "High (Counters)"] },
      { label: "FIFO", values: ["Oldest insertion", "Queues, rigid lifespans", "Low"] },
      { label: "Random", values: ["Any random key", "Unpredictable access", "Zero"] }
    ]
  },
  memoryTrick: "LRU = Forget the Past. LFU = Forget the Unpopular. FIFO = First to Arrive, First to Die.",
  realWorldExamples: [
    "Web browsers use LRU to manage cached images and scripts.",
    "CDNs often use variants of LFU or hybrid policies to cache globally popular media."
  ],
  mermaidDiagram: `flowchart LR
    A[Cache Full] --> B{Policy}
    B -->|LRU| C[Evict Least Recently Used]
    B -->|LFU| D[Evict Least Frequently Used]
    B -->|FIFO| E[Evict Oldest Inserted]
    B -->|Random| F[Evict Random Key]`,
  flashcards: [
    { id: "cevp-fc1", front: "LRU", back: "Least Recently Used. Evicts oldest accessed item.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-fc2", front: "LFU", back: "Least Frequently Used. Evicts lowest count item.", topic: "Caching", difficulty: "Beginner" },
    { id: "cevp-fc3", front: "LRU Data Structures", back: "Hash Map + Doubly Linked List for O(1).", topic: "Caching", difficulty: "Intermediate" },
    { id: "cevp-fc4", front: "Belady's Anomaly", back: "In FIFO, more cache size can mean more misses.", topic: "Caching", difficulty: "Advanced" },
    { id: "cevp-fc5", front: "Redis LRU", back: "Uses approximated LRU by sampling to save memory.", topic: "Caching", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Eviction Policies Matrix",
    sections: [
      { heading: "LRU", items: ["Recency based", "Hash Map + DLL", "Good default"] },
      { heading: "LFU", items: ["Frequency based", "Needs counters", "Prone to stale heavy-hitters"] },
      { heading: "FIFO / Random", items: ["Insertion based / No logic", "Low overhead", "Poor hit rates"] }
    ]
  },
  speedNotes: [
    "LRU is the industry default.",
    "LFU is for stable popularity.",
    "LRU uses Hash Map + DLL.",
    "Redis approximates LRU.",
    "Eviction kicks in when full."
  ]
};
