import type { ConceptRevisionContent } from "./types";

export const bloomFilters: ConceptRevisionContent = {
  slug: "bloom-filters",
  title: "Bloom Filters",
  topic: "Advanced Topics",
  difficulty: "Advanced",
  estimatedMinutes: 20,
  docLinks: [
    { label: "NoSQL", href: "/docs/databases/nosql" },
    { label: "Consistent Hashing", href: "/docs/distributed-systems/consistent-hashing" },
  ],
  summary: [
    "A Bloom filter is a space-efficient probabilistic data structure.",
    "It is used to test whether an element is a member of a set.",
    "False positive matches are possible, but false negatives are not.",
    "Elements can be added to the set, but not removed (in standard implementations).",
    "It uses a bit array and multiple hash functions.",
    "Highly useful for reducing expensive disk lookups or network calls."
  ],
  whyAsked: [
    "To test your knowledge of probabilistic data structures.",
    "To see if you can optimize systems for read-heavy workloads.",
    "To evaluate understanding of space vs. accuracy tradeoffs."
  ],
  thirtySecondAnswer: "A Bloom filter is a probabilistic data structure that quickly tells you if an item is definitely not in a set, or possibly in a set. It uses an array of bits and multiple hash functions to map items to bits. While it may return false positives, it never returns false negatives, making it ideal as an initial fast check before performing an expensive database or disk lookup.",
  detailedAnswer: [
    "Uses a bit array of size m, initially all set to 0.",
    "Uses k different hash functions, each mapping an item to one of the m array positions.",
    "To add an item, hash it k times and set all k positions to 1.",
    "To query an item, hash it k times and check if all k positions are 1. If yes, it's 'probably' in the set. If any is 0, it's 'definitely not' in the set.",
    "The probability of false positives depends on the size of the bit array (m) and the number of hash functions (k).",
    "Standard Bloom filters do not support deletion, as clearing a bit might affect other items sharing that bit."
  ],
  questions: [
    { id: "bf-q1", question: "What is a Bloom filter?", answer: "A probabilistic data structure used to test set membership with possible false positives but no false negatives.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bf-q2", question: "Can a Bloom filter yield a false negative?", answer: "No, a Bloom filter guarantees no false negatives.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bf-q3", question: "Can you remove an item from a standard Bloom filter?", answer: "No, removing an item by unsetting bits could unintentionally remove other items.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bf-q4", question: "What operations does a Bloom filter support?", answer: "Insertion and query (membership check).", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bf-q5", question: "Why use a Bloom filter instead of a hash table?", answer: "A Bloom filter is vastly more space-efficient, though it trades off exactness for probabilistic results.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bf-q6", question: "What happens when the bit array becomes mostly 1s?", answer: "The false positive rate increases significantly.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bf-q7", question: "How does a Bloom filter reduce database load?", answer: "By acting as a fast memory-based filter that blocks queries for non-existent keys from reaching the database.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-q8", question: "What is a Counting Bloom filter?", answer: "A variant that uses an array of counters instead of bits, allowing element deletion.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-q9", question: "How is the number of hash functions (k) determined?", answer: "It is optimized based on the bit array size (m) and the expected number of elements (n) to minimize the false positive rate.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-q10", question: "What is a typical use case for a Bloom filter in web browsers?", answer: "Checking URLs against a list of known malicious sites without storing the entire list.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-q11", question: "How do CDNs use Bloom filters?", answer: "To avoid caching one-hit wonders by only caching an object if it has been requested before (tracked by the Bloom filter).", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-q12", question: "What are the core parameters of a Bloom filter?", answer: "The bit array size (m), the number of expected elements (n), and the number of hash functions (k).", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-q13", question: "What happens if a Bloom filter's false positive rate is too high?", answer: "It becomes ineffective, as it will frequently trigger the expensive fallback lookup it was meant to prevent.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-q14", question: "How does Cassandra use Bloom filters?", answer: "Cassandra uses them to check if an SSTable contains data for a specific row key before reading from disk.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-q15", question: "What is a Scalable Bloom filter?", answer: "A variant that dynamically adapts its size as more elements are added to maintain a target false positive rate.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bf-q16", question: "How does the choice of hash function affect a Bloom filter?", answer: "Hash functions must be independent and uniformly distributed. Non-cryptographic hashes like MurmurHash are preferred for speed.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bf-q17", question: "Explain the mathematical relationship between m, n, k, and the false positive rate.", answer: "The optimal number of hash functions is k = (m/n) * ln(2). The false positive rate is approximately (1 - e^(-kn/m))^k.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bf-q18", question: "What is a Cuckoo filter, and how does it compare to a Bloom filter?", answer: "A Cuckoo filter is an alternative that supports deletion dynamically and can have better lookup performance and space efficiency for low false positive rates.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bf-q19", question: "Can a Bloom filter be used in distributed systems?", answer: "Yes, they can be shared across nodes (e.g., via gossip protocol) to quickly exchange information about what data each node holds.", topic: "Advanced Topics", difficulty: "Advanced" },
    { id: "bf-q20", question: "How would you implement a Bloom filter in Redis?", answer: "Redis offers a RedisBloom module that provides native Bloom filter commands like BF.ADD and BF.EXISTS.", topic: "Advanced Topics", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you resize a Bloom filter when it gets full?",
    "How does a Counting Bloom filter work?",
    "When would you choose a Cuckoo filter over a Bloom filter?"
  ],
  commonMistakes: [
    "Thinking Bloom filters can give false negatives.",
    "Assuming standard Bloom filters support deletion.",
    "Using cryptographic hash functions (like SHA-256) instead of faster ones (like MurmurHash)."
  ],
  interviewTraps: [
    "Forgetting to mention the false positive rate when proposing a Bloom filter.",
    "Proposing a Bloom filter when absolute certainty of non-membership is not sufficient."
  ],
  tradeoffs: [
    "Space efficiency vs. accuracy (false positive rate).",
    "Query speed vs. memory overhead.",
    "No deletion capability vs. simplicity."
  ],
  memoryTrick: "Bloom filters are like a bouncer: they confidently say 'NO, you are not on the list' but sometimes say 'YES, you might be on the list, let me check your ID'.",
  realWorldExamples: [
    "Cassandra and HBase use Bloom filters to avoid reading unnecessary SSTables from disk.",
    "Google Chrome used Bloom filters for its safe browsing mechanism to identify malicious URLs."
  ],
  mermaidDiagram: `flowchart LR\n    A[Query Key] --> B{Hash Functions}\n    B -->|h1| C1[Bit 0]\n    B -->|h2| C2[Bit 4]\n    B -->|h3| C3[Bit 9]\n    C1 --> D{All 1s?}\n    C2 --> D\n    C3 --> D\n    D -->|Yes| E[Probably Exists]\n    D -->|No| F[Definitely Not]`,
  flashcards: [
    { id: "bf-fc1", front: "What is the primary guarantee of a Bloom filter?", back: "It never returns a false negative (if it says an item isn't there, it definitely isn't).", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bf-fc2", front: "Can you delete elements from a standard Bloom filter?", back: "No, because unsetting a bit might remove other elements that share that bit.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-fc3", front: "What variant allows deletion?", back: "Counting Bloom filter.", topic: "Advanced Topics", difficulty: "Intermediate" },
    { id: "bf-fc4", front: "What happens as you add more elements?", back: "The array fills with 1s, and the false positive rate increases.", topic: "Advanced Topics", difficulty: "Beginner" },
    { id: "bf-fc5", front: "What is the optimal number of hash functions (k)?", back: "k = (m/n) * ln(2), where m is bits and n is expected elements.", topic: "Advanced Topics", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Bloom Filters",
    sections: [
      { heading: "Core Concept", items: ["Probabilistic data structure", "Used for fast set membership testing", "Space-efficient bit array"] },
      { heading: "Guarantees", items: ["No false negatives", "Possible false positives"] },
      { heading: "Operations", items: ["Insert (set k bits)", "Query (check k bits)"] },
      { heading: "Common Use Cases", items: ["Database disk lookup avoidance", "Malicious URL checking", "CDN one-hit wonder avoidance"] }
    ]
  },
  speedNotes: [
    "Space-efficient probabilistic data structure.",
    "Tests set membership quickly.",
    "Zero false negatives guaranteed.",
    "False positives are possible.",
    "Standard version lacks deletion."
  ]
};
