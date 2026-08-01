import type { ConceptRevisionContent } from "./types";

export const systemDesignFundamentals: ConceptRevisionContent = {
  slug: "system-design-fundamentals",
  title: "System Design Fundamentals",
  topic: "Fundamentals",
  difficulty: "Beginner",
  estimatedMinutes: 12,

  docLinks: [{ label: "What is System Design?", href: "/docs/fundamentals/what-is-system-design" }],

  summary: [
    "System design is deciding how a system's components fit together to satisfy both functional requirements (what it must do) and non-functional requirements (how well it must do it — scale, speed, reliability, cost).",
    "It operates one level above code: not \"how do I implement this function\" but \"how do these services talk, what happens when one dies at 3am, does this survive 100x traffic.\"",
    "Every design is a trade-off exercise, not a search for a single correct answer — the same problem has different right answers depending on scale, budget, and team size.",
    "The standard interview shape is: clarify requirements, estimate scale, sketch a high-level architecture, go deep on 1-2 components, then discuss bottlenecks and failure modes.",
    "Interviewers are grading judgment and communication, not memorized architecture diagrams — a mediocre design explained with clear reasoning beats a great one presented without justification.",
    "Common failure mode: jumping straight to a detailed architecture before establishing scale and requirements, producing a design that's either overbuilt or missing the actual constraint.",
  ],

  whyAsked: [
    "It's usually the opening question, used to see whether a candidate can structure ambiguity before being told exactly what to build.",
    "It reveals whether someone reaches for requirements and scale first, or jumps straight to a solution — a strong signal about real-world design maturity.",
    "It sets the frame for the rest of the interview: everything that follows (deep dives, trade-offs) builds on how well this opening was scoped.",
  ],

  thirtySecondAnswer:
    "System design is the process of deciding how a software system's components, interfaces, and data flow fit together so it satisfies both what it needs to do and how well it needs to do it — things like scale, latency, and reliability. It's distinct from coding: instead of implementing one function correctly, you're deciding how many services exist, how they communicate, and what happens when any one of them fails. There's rarely one correct design — the right answer depends on scale, budget, and constraints, so a good system design answer is really a trade-off analysis, not a diagram.",

  detailedAnswer: [
    "Functional requirements describe what the system does (e.g. \"users can upload a photo\"); non-functional requirements describe how well it does it (uptime, latency, throughput, cost) — both need to be stated before designing anything.",
    "The standard interview flow: clarify requirements → estimate scale (users, QPS, storage) → sketch high-level architecture → deep-dive 1-2 components the interviewer probes → discuss bottlenecks, failure modes, and trade-offs.",
    "Scale changes the correct answer: a design for 1,000 users and a design for 1 billion users are different systems, even for the identical functional requirement.",
    "There is no universally \"best\" architecture — only the best architecture for a specific set of constraints (team size, budget, latency requirements, consistency needs).",
    "Communication matters as much as the design itself: narrating assumptions, trade-offs, and reasoning out loud is what actually gets evaluated.",
  ],

  questions: [
    { id: "sdf-q1", question: "What is system design, in your own words?", answer: "Deciding how a system's components fit together — architecture, interfaces, data flow — to meet both functional requirements (what it does) and non-functional requirements (how well it does it: scale, latency, reliability, cost).", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-q2", question: "How is system design different from software engineering / coding?", answer: "Coding asks 'how do I correctly implement this one function'; system design asks 'how do these services communicate, what happens when one fails, does this hold up at 100x scale' — one level above individual code correctness.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-q3", question: "Why doesn't a simple, single-machine app need 'system design'?", answer: "System design exists to solve problems that emerge from scale, distribution, and change over time — a program that fits on one machine, serves one user, and never changes doesn't hit any of those limits.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-q4", question: "Walk me through how you'd start a system design interview.", answer: "Clarify functional and non-functional requirements first, then estimate scale (users, requests/sec, data volume), then sketch a high-level architecture before going deep on any one component.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-q5", question: "Why do you estimate scale (capacity estimation) before designing?", answer: "Because the correct architecture depends on scale — a design for thousands of users and one for billions solve the same functional requirement completely differently; estimating early prevents over- or under-building.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sdf-q6", question: "Is there a single 'correct' system design for a given problem?", answer: "No — the right design depends on constraints (scale, budget, team size, latency needs). A good answer is a trade-off analysis justified against stated constraints, not a memorized diagram.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-q7", question: "What's the difference between functional and non-functional requirements, briefly?", answer: "Functional requirements are what the system must do (e.g. 'users can post a comment'); non-functional requirements are how well it must do it (uptime, latency, throughput, cost, security).", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-q8", question: "Why might jumping straight into a detailed architecture be a mistake?", answer: "Without first establishing requirements and scale, the design risks being overbuilt for a small system or missing the actual bottleneck for a large one — it optimizes for an unstated, possibly wrong, assumption.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sdf-q9", question: "What is an interviewer actually evaluating in a system design round?", answer: "Judgment and communication under ambiguity — how you scope a vague problem, justify trade-offs, and reason about failure — far more than whether you reproduce a specific well-known architecture.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sdf-q10", question: "How deep should a first-pass high-level design go before diving into details?", answer: "Just deep enough to show the major components and how data flows between them — save deep technical detail for the 1-2 areas the interviewer signals interest in, rather than over-engineering every box upfront.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sdf-q11", question: "Give an example of how team size or budget might change a 'correct' design.", answer: "A two-person startup might correctly choose a managed, monolithic backend for speed of delivery, while a large company at massive scale might correctly choose a microservices architecture — the same functional problem, different right answers.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sdf-q12", question: "What happens if you skip clarifying requirements at the start of an interview?", answer: "You risk designing for assumptions the interviewer didn't intend (wrong scale, wrong consistency needs), which can derail the rest of the session even if the technical execution is otherwise strong.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-q13", question: "How should you handle a requirement you're unsure about?", answer: "State the assumption explicitly and explain why you're making it, rather than silently picking one — this keeps the interviewer able to redirect you early rather than after significant design work.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sdf-q14", question: "Why is 'it depends' often a legitimate part of a system design answer?", answer: "Because trade-offs are genuinely conditional on constraints — saying 'it depends on read/write ratio' and then reasoning through both cases shows more understanding than committing to one answer with no justification.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sdf-q15", question: "What's a common structural mistake candidates make in system design interviews?", answer: "Designing the entire system in exhaustive detail rather than pacing themselves — spending 90% of the time on requirements/high-level design and leaving no time for deep dives or failure analysis.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sdf-q16", question: "How do you decide which component to deep-dive into during an interview?", answer: "Follow the interviewer's signal (what they ask more questions about), or pick the component with the most interesting trade-off for the stated scale — not necessarily the one you personally find easiest.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sdf-q17", question: "Why does system design treat failure as a first-class concern rather than an edge case?", answer: "At scale, failures (of a server, a disk, a network link) become statistically routine rather than rare — a design that only works when nothing fails isn't a complete design for a real, large system.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "sdf-q18", question: "What's the risk of over-engineering a design for a stated small scale?", answer: "It signals a lack of judgment about matching solution complexity to actual requirements — introducing distributed-systems complexity (sharding, multi-region) for a problem that doesn't need it is itself a design mistake.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sdf-q19", question: "How does system design differ across a startup vs. a large tech company interview?", answer: "The underlying skill (requirements → scale → architecture → trade-offs) is the same; what changes is the expected scale and depth of follow-up — large companies often push harder on extreme-scale bottlenecks and failure scenarios.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "sdf-q20", question: "What's the single most important habit for a strong system design answer?", answer: "Narrating your reasoning out loud — stating assumptions, trade-offs, and why you're choosing one option over another — since the evaluation is on judgment and communication, not just the final diagram.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What assumptions are you making right now?\"",
    "\"How would this design change if scale were 100x smaller / larger?\"",
    "\"What would you cut if you only had half the time to design this?\"",
    "\"Why did you choose to go deep on that component instead of another?\"",
  ],

  commonMistakes: [
    "Diving into a detailed architecture before stating any requirements or scale.",
    "Treating the exercise as \"reproduce a known architecture\" rather than reasoning from the specific stated constraints.",
    "Spending so long on the high-level design that there's no time left for trade-offs or failure discussion.",
    "Presenting a design with no narration — the interviewer can't grade reasoning they never heard.",
  ],

  interviewTraps: [
    "The interviewer deliberately gives a vague prompt (\"design a chat app\") to see if you ask clarifying questions before designing — silence here is itself a signal, and not a good one.",
    "Being asked to justify a design decision that has no clean answer (\"why this and not the alternative\") is testing whether you can articulate a trade-off, not whether you picked the 'right' one.",
    "A follow-up changing the scale by orders of magnitude is testing whether your design was actually scale-aware or just a generic template.",
  ],

  tradeoffs: [
    "More time on requirements/scoping vs. more time on deep technical detail — both matter, but time is finite and needs deliberate allocation.",
    "A simpler design that's easy to explain and reason about vs. a more sophisticated one that better fits extreme scale but is harder to justify quickly.",
    "Committing to one design early for momentum vs. holding options open longer to avoid designing for the wrong assumption.",
  ],

  decisionGuide: undefined,

  memoryTrick:
    "\"R-E-A-D\": Requirements → Estimate scale → Architecture (high-level) → Deep-dive & discuss trade-offs/failures. Say it in that order and you've structured almost any system design answer.",

  realWorldExamples: [
    "A URL shortener and a global video platform have wildly different \"correct\" architectures despite both being conceptually simple 'store and retrieve' systems — scale is the entire difference.",
    "Real engineering orgs revisit system design decisions as scale changes: an architecture chosen at 10,000 users is routinely replaced, not because it was wrong, but because it was right for a scale the system has since outgrown.",
  ],

  mermaidDiagram: `flowchart LR
    A[Clarify Requirements] --> B[Estimate Scale]
    B --> C[High-Level Architecture]
    C --> D[Deep Dive 1-2 Components]
    D --> E[Bottlenecks & Trade-offs]`,

  flashcards: [
    { id: "sdf-fc1", front: "What is system design?", back: "Deciding how a system's components fit together to meet functional and non-functional requirements.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-fc2", front: "Functional requirement — one-line definition", back: "What the system must do (e.g. 'users can upload a photo').", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-fc3", front: "Non-functional requirement — one-line definition", back: "How well the system must do it (uptime, latency, throughput, cost).", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-fc4", front: "Standard system design interview flow", back: "Requirements → Estimate scale → High-level architecture → Deep dive → Trade-offs/failure modes.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "sdf-fc5", front: "What's actually being graded in a system design interview?", back: "Judgment and communication under ambiguity, not a memorized 'correct' architecture.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  cheatSheet: {
    title: "System Design Fundamentals",
    sections: [
      { heading: "Interview flow", items: ["Clarify requirements", "Estimate scale", "High-level architecture", "Deep dive", "Trade-offs & failures"] },
      { heading: "Two requirement types", items: ["Functional = what it does", "Non-functional = how well (scale, latency, cost, uptime)"] },
      { heading: "Golden rule", items: ["No universal 'best' design — only best-for-these-constraints", "Narrate reasoning out loud"] },
    ],
  },

  speedNotes: [
    "System design = architecture + interfaces + data flow, for functional + non-functional requirements.",
    "One level above code: services talking, failure handling, scale over time.",
    "Flow: requirements → scale → high-level → deep dive → trade-offs.",
    "No single correct answer — grade is on judgment + communication.",
    "Always state assumptions out loud.",
  ],
};
