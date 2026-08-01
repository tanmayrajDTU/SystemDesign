import type { ConceptRevisionContent } from "./types";

export const searchEngineDesign: ConceptRevisionContent = {
  slug: "search-engine-design",
  title: "Search Engine Design",
  topic: "System Design Case Studies",
  difficulty: "Advanced",
  estimatedMinutes: 30,
  docLinks: [
    { label: "Search Engine Case Study", href: "/docs/case-studies/search-engine" },
  ],
  summary: [
    "A search engine system typically consists of three main components: crawler, indexer, and search/query service.",
    "Crawlers traverse the web to discover content, downloading pages and extracting links to find new pages.",
    "Indexers process crawled pages, extracting keywords and building an inverted index (mapping terms to document IDs).",
    "The search service handles user queries, retrieves matching documents from the index, and ranks them based on relevance.",
    "Designing at Google scale requires massive distributed systems, aggressive caching, partitioning strategies, and high availability.",
    "Key challenges include handling an ever-growing web size, minimizing query latency, and combating spam."
  ],
  whyAsked: [
    "To test your ability to design a massive-scale distributed system from scratch.",
    "To evaluate understanding of web crawling, data processing, and search algorithms.",
    "To see how you handle large datasets, distributed storage, and low-latency read operations."
  ],
  thirtySecondAnswer: "A search engine relies on three pillars: crawling, indexing, and ranking. Crawlers fetch web pages using a frontier of URLs. Indexers parse the content, extract terms, and build a distributed inverted index mapping words to document IDs. The search service processes user queries by finding matching document IDs in the index, computing intersection for multi-term queries, and ranking results using algorithms like PageRank and machine learning models, ensuring sub-second response times through extensive caching.",
  detailedAnswer: [
    "Web Crawling: Start with seed URLs, download pages, parse links, and add to URL frontier. Handle robots.txt and rate limiting.",
    "Inverted Index: Core data structure mapping keywords to lists of document IDs. Needs to be sharded (usually by document ID) across many machines.",
    "Ranking Algorithm: Combines document-level signals (PageRank, domain authority) with query-level signals (TF-IDF, term proximity).",
    "Query Processing: Parse query (spell check, synonyms), scatter-gather to index shards, intersect results, rank, and return top K.",
    "Storage: Distributed file systems for raw HTML, NoSQL/BigTable for metadata, custom distributed index servers for search.",
    "Caching: Cache frequent query results and index lookups to meet stringent latency requirements."
  ],
  questions: [
    { id: "sed-q1", question: "What is an inverted index?", answer: "A data structure mapping content (words/terms) to its locations (document IDs) in a dataset.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "sed-q2", question: "What are the core components of a search engine?", answer: "Crawler, Indexer, Search/Query processing service.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "sed-q3", question: "How does a web crawler avoid infinite loops?", answer: "By maintaining a seen URL set/Bloom filter to track already visited URLs.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "sed-q4", question: "What is the role of robots.txt?", answer: "It dictates which pages or directories crawlers are allowed or forbidden to access on a domain.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "sed-q5", question: "Why do search engines cache query results?", answer: "To reduce load on indexing servers and provide ultra-fast responses for popular queries.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "sed-q6", question: "What is TF-IDF?", answer: "Term Frequency-Inverse Document Frequency, a metric evaluating a word's importance in a document relative to a corpus.", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "sed-q7", question: "How would you partition an inverted index?", answer: "Document-partitioned (sharded by DocID) or term-partitioned (sharded by word). Document-partitioning is most common for scalability.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-q8", question: "Explain the scatter-gather approach in search.", answer: "The aggregator sends the query to all index partitions (scatter), they return local top results, and the aggregator merges them (gather).", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-q9", question: "How does the URL frontier work?", answer: "It is a priority queue managing URLs to crawl, prioritizing by page importance, update frequency, and politeness policies.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-q10", question: "What is politeness in web crawling?", answer: "Respecting rate limits and adding delays to avoid overloading the target web servers during a crawl.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-q11", question: "How do you handle updating the index for changed pages?", answer: "Use incremental indexing where a small real-time index handles new content, periodically merged into the main static index.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-q12", question: "What is stemming?", answer: "Reducing words to their root form (e.g., 'running' to 'run') so different forms match the same query.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-q13", question: "How do you detect duplicate content across crawled pages?", answer: "Compute a hash or use Simhash (locality-sensitive hashing) to detect exact or near-duplicate documents.", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-q14", question: "What are the trade-offs of term-partitioning vs document-partitioning?", answer: "Term is better for single-term queries but requires complex cross-shard intersections for multi-term. Doc-partitioning is easier to balance and query.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "sed-q15", question: "How does PageRank work conceptually?", answer: "It calculates page importance based on the quantity and quality of incoming links from other pages, modeled as a Markov chain.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "sed-q16", question: "How do you compress an inverted index?", answer: "Store delta-encoded gaps between document IDs instead of absolute IDs, then use variable-byte or Elias-Fano encoding.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "sed-q17", question: "How do you serve autocomplete suggestions?", answer: "Use a Trie data structure cached in memory (like Redis) populated from top historical query logs.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "sed-q18", question: "Explain how a real-time index works alongside a batch index.", answer: "Queries search both. The real-time index is stored in memory for fast updates, while the batch index is optimized on disk. Results are merged.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "sed-q19", question: "How does the search engine evaluate query synonyms and spelling?", answer: "Query expansion adds synonyms before searching; spell check uses Levenshtein distance on an n-gram index of search terms.", topic: "System Design Case Studies", difficulty: "Advanced" },
    { id: "sed-q20", question: "How do you scale the URL frontier to billions of URLs?", answer: "Distribute it across multiple machines using consistent hashing by domain, ensuring polite crawling per domain.", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  commonFollowUps: [
    "How would you design the autocomplete/typeahead feature?",
    "How do you implement near-duplicate detection?",
    "How do you scale to index the entire internet while ensuring freshness?"
  ],
  commonMistakes: [
    "Not mentioning politeness or robots.txt when designing the crawler.",
    "Failing to explain how an inverted index is sharded (document vs term based).",
    "Ignoring the need to rank the results before returning them to the user."
  ],
  interviewTraps: [
    "Designing a monolithic database for the index instead of a custom distributed data structure.",
    "Overcomplicating the ranking algorithm initially; start simple before introducing ML models."
  ],
  tradeoffs: [
    "Freshness vs. Efficiency: Indexing in real-time is expensive; batch indexing is cheaper but content is delayed.",
    "Document Partitioning vs. Term Partitioning: Document partitioning scales better for multi-term queries and is standard.",
    "Crawling Depth vs. Breadth: Need to balance discovering new domains (breadth) vs indexing all pages of a known domain (depth)."
  ],
  memoryTrick: "Search Engine = Crawl (find), Index (organize), Rank (prioritize).",
  realWorldExamples: [
    "Google Search: Crawls the web, uses BigTable and Spanner, custom indexing, and complex ML for ranking.",
    "Elasticsearch: A distributed, RESTful search and analytics engine based on Apache Lucene, used for enterprise search."
  ],
  mermaidDiagram: `flowchart TD
    A[Web] -->|Download| B(Crawler Worker)
    B --> C{URL Frontier}
    C -->|Next URL| B
    B -->|Raw HTML| D[Document Store]
    D --> E(Indexer)
    E --> F[(Inverted Index Shards)]
    G[User Query] --> H(Search Gateway)
    H -->|Scatter| F
    F -->|Gather Top K| H
    H --> I(Ranker)
    I -->|Ranked Results| G
    H -.-> J[(Query Cache)]`,
  flashcards: [
    { id: "sed-fc1", front: "What maps words to document IDs?", back: "Inverted Index", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "sed-fc2", front: "How is an inverted index usually partitioned?", back: "By Document ID (Document Partitioning)", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-fc3", front: "What ensures crawlers don't overload a server?", back: "Politeness policy / rate limiting", topic: "System Design Case Studies", difficulty: "Intermediate" },
    { id: "sed-fc4", front: "What tracks URLs to be crawled?", back: "URL Frontier", topic: "System Design Case Studies", difficulty: "Beginner" },
    { id: "sed-fc5", front: "How do you compress inverted index posting lists?", back: "Delta encoding + Variable-length encoding", topic: "System Design Case Studies", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Search Engine Design",
    sections: [
      {
        heading: "Core Components",
        items: [
          "Crawler: URL Frontier, DNS Resolver, HTML Fetcher, Link Extractor.",
          "Indexer: Document Parser, Tokenizer, Inverted Index Builder.",
          "Searcher: Query Parser, Scatter-Gather Engine, Ranker."
        ]
      },
      {
        heading: "Data Structures",
        items: [
          "Inverted Index: Mapping of Terms -> [DocID1, DocID2, ...].",
          "Trie: For Autocomplete / Typeahead.",
          "Bloom Filter: To track visited URLs in the crawler."
        ]
      },
      {
        heading: "Key Concepts",
        items: [
          "TF-IDF: Term frequency inverse document frequency for relevance.",
          "PageRank: Link analysis algorithm for domain authority.",
          "Politeness: Crawl delay and adhering to robots.txt."
        ]
      }
    ]
  },
  speedNotes: [
    "Crawler discovers web pages.",
    "URL Frontier manages crawl queue.",
    "Indexer builds inverted index.",
    "Inverted index maps words->DocIDs.",
    "Scatter-gather for querying shards."
  ]
};
