import type { ConceptRevisionContent } from "./types";

export const functionalVsNonFunctional: ConceptRevisionContent = {
  slug: "functional-vs-non-functional-requirements",
  title: "Functional vs Non-functional Requirements",
  topic: "Fundamentals",
  difficulty: "Beginner",
  estimatedMinutes: 10,

  docLinks: [
    { label: "Functional Requirements", href: "/docs/fundamentals/functional-requirements" },
    { label: "Non-functional Requirements", href: "/docs/fundamentals/non-functional-requirements" },
  ],

  summary: [
    "Functional requirements describe what a system must do — specific features and behaviors (\"a user can upload a photo\", \"an admin can ban a user\").",
    "Non-functional requirements (NFRs) describe how well the system must do it — latency, uptime, throughput, durability, security, cost.",
    "NFRs are what actually drive architecture decisions: two systems with identical functional requirements can need completely different designs if their NFRs differ.",
    "NFRs should be concrete numbers where possible (\"p99 latency under 200ms\", \"99.9% uptime\") rather than vague adjectives (\"fast\", \"reliable\") — vague NFRs can't be designed against.",
    "In an interview, both need to be clarified before architecture starts; skipping NFRs is the more common and more damaging omission, since they're easy to assume rather than ask about.",
    "A requirement can quietly be both: \"the system must support search\" is functional, but \"search results must return in under 100ms\" is the non-functional constraint hiding inside it.",
  ],

  whyAsked: [
    "It's a fast, early check for whether a candidate separates 'what' from 'how well' before designing — conflating the two usually produces a vague, undirected design.",
    "NFRs are what make capacity estimation and architecture choices justifiable — an interviewer wants to see numbers driving decisions, not guesses.",
    "It surfaces whether a candidate proactively asks about scale, latency, and consistency needs, or waits to be told.",
  ],

  thirtySecondAnswer:
    "Functional requirements are what a system must do — specific features and behaviors, like 'users can post a comment.' Non-functional requirements are how well it must do that — latency, uptime, throughput, durability, cost — usually expressed as concrete numbers like '99.9% uptime' or 'p99 latency under 200ms.' Functional requirements shape what components exist; non-functional requirements shape how those components are built and scaled. Two systems with identical functional requirements can need entirely different architectures if their NFRs differ, which is why both need to be nailed down before any design work starts.",

  detailedAnswer: [
    "Functional requirements answer 'what does the system do' — they define features, not performance characteristics.",
    "Non-functional requirements answer 'how well does it do it' — availability, latency, throughput, scalability, security, durability, cost.",
    "NFRs should be quantified wherever possible: 'fast' isn't designable, 'p99 under 200ms' is.",
    "NFRs are the actual architecture drivers — a strict latency NFR might rule out a design that would otherwise satisfy the functional requirement perfectly well.",
    "In interviews, functional requirements are usually stated or quick to infer from the prompt; non-functional requirements are the ones candidates most often forget to ask about, and their absence is the most common reason a design goes in the wrong direction.",
  ],

  questions: [
    { id: "fnf-q1", question: "What's the difference between functional and non-functional requirements?", answer: "Functional requirements define what the system does (features, behaviors); non-functional requirements define how well it does it (latency, uptime, throughput, cost, security).", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "fnf-q2", question: "Give an example of a functional requirement.", answer: "\"A user can upload a photo\" or \"an admin can ban a user\" — specific features the system provides.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "fnf-q3", question: "Give an example of a non-functional requirement.", answer: "\"99.9% uptime\", \"p99 latency under 200ms\", or \"support 10 million daily active users\" — measurable qualities of how the system performs.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "fnf-q4", question: "Why should NFRs be expressed as numbers rather than adjectives?", answer: "Vague terms like 'fast' or 'reliable' can't be designed against or verified — a concrete number like 'p99 under 200ms' gives an actual target the architecture can be evaluated against.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-q5", question: "Why do NFRs matter more for architecture decisions than functional requirements?", answer: "Two systems can share identical functional requirements but need completely different architectures if their NFRs (scale, latency, consistency) differ — NFRs are what actually constrain the design space.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-q6", question: "Which type of requirement do candidates most commonly forget to clarify?", answer: "Non-functional requirements — functional requirements are usually explicit or easy to infer from the prompt, while scale/latency/consistency needs are easy to silently assume instead of asking about.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-q7", question: "Can a single requirement contain both a functional and non-functional element?", answer: "Yes — 'the system must support search' is functional, but 'search results must return in under 100ms' is the non-functional constraint hiding inside the same feature request.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "fnf-q8", question: "What NFR categories should you routinely ask about in an interview?", answer: "Scale (users, requests/sec), latency targets, availability/uptime target, consistency requirements, data durability, and cost/budget constraints.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-q9", question: "Why is 'the system should be reliable' not a usable non-functional requirement as stated?", answer: "It's not measurable or designable — it needs to be turned into something concrete, like an acceptable error rate or a specific uptime percentage, before it can drive any decision.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-q10", question: "How do NFRs affect technology choices, concretely?", answer: "A strict low-latency NFR might rule out a database that would otherwise be functionally sufficient; a strict durability NFR might require synchronous replication that a looser NFR wouldn't need.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "fnf-q11", question: "Should functional or non-functional requirements be clarified first in an interview?", answer: "Functional requirements first (to scope what's being built at all), immediately followed by non-functional requirements before any architecture is proposed — both need to land before designing.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "fnf-q12", question: "What's a security requirement an example of?", answer: "A non-functional requirement — security constraints describe a quality of how the system operates, not a specific user-facing feature.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "fnf-q13", question: "Why might an interviewer deliberately withhold NFRs unless asked?", answer: "To see whether the candidate proactively surfaces the missing information rather than assuming defaults — asking is itself part of what's being evaluated.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "fnf-q14", question: "How does cost function as a non-functional requirement?", answer: "It constrains the solution space just like latency or uptime does — an architecture that satisfies every other NFR but blows the budget isn't actually a valid answer to the stated problem.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-q15", question: "What's the risk of over-specifying NFRs that weren't actually asked for?", answer: "Designing for stricter guarantees than required (e.g. assuming 99.999% uptime when 99.9% was actually fine) adds unnecessary complexity and cost without a corresponding requirement to justify it.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "fnf-q16", question: "Is 'the system must scale to 1 million users' functional or non-functional?", answer: "Non-functional — it's a statement about scale/performance, not about a specific feature or behavior.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "fnf-q17", question: "How do functional requirements typically map to system components?", answer: "Each major functional requirement often corresponds to a service or module (e.g. 'upload a photo' implies an upload service and storage), giving an early skeleton for the high-level architecture.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-q18", question: "What's an example of conflicting non-functional requirements?", answer: "Very low latency and very strong consistency can conflict, since strong consistency often requires coordination that adds latency — this tension is exactly what CAP/PACELC formalize.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "fnf-q19", question: "Why can't you finalize capacity estimation without non-functional requirements?", answer: "Capacity estimates (servers needed, storage, bandwidth) are derived directly from NFRs like expected QPS and latency targets — without them there's no basis for the numbers.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-q20", question: "What's a good habit for stating an assumed NFR you weren't given?", answer: "State it explicitly and explain the reasoning (\"I'll assume 99.9% uptime is acceptable since this isn't a safety-critical system\") so the interviewer can correct it early if wrong.", topic: "Fundamentals", difficulty: "Intermediate" },
  ],

  commonFollowUps: [
    "\"What latency/uptime target are we designing for?\"",
    "\"Which of these requirements is actually the hard constraint, and which is a nice-to-have?\"",
    "\"What happens to the design if this NFR were 10x stricter?\"",
  ],

  commonMistakes: [
    "Only clarifying functional requirements and silently assuming NFRs.",
    "Stating NFRs as vague adjectives (\"fast\", \"scalable\") instead of numbers.",
    "Designing for stricter NFRs than actually stated, adding unjustified complexity.",
    "Treating a security or cost constraint as out of scope for requirements gathering.",
  ],

  interviewTraps: [
    "The interviewer gives only functional requirements up front deliberately — not asking about NFRs is itself a signal, not a neutral omission.",
    "Being asked \"what if this needed to handle 100x the load\" is testing whether your NFRs were ever concrete enough to stress-test in the first place.",
  ],

  tradeoffs: [
    "Precise, strict NFRs give a clearer design target but constrain the solution space and raise cost/complexity.",
    "Looser NFRs give more design freedom but risk under-delivering on what users or the business actually need.",
  ],

  comparisonTable: {
    title: "Functional vs Non-functional Requirements",
    columns: ["Functional Requirements", "Non-functional Requirements"],
    rows: [
      { label: "Answers", values: ["What the system does", "How well it does it"] },
      { label: "Example", values: ["\"User can upload a photo\"", "\"p99 latency under 200ms\""] },
      { label: "Drives", values: ["Feature list, component skeleton", "Architecture, technology choices"] },
      { label: "Typically stated as", values: ["Behaviors / user stories", "Numbers / SLAs"] },
      { label: "Most often forgotten in interviews", values: ["Rarely", "Frequently"] },
    ],
  },

  decisionGuide: undefined,

  memoryTrick:
    "\"What vs. How Well\" — Functional = WHAT the system does. Non-functional = HOW WELL it does it. If you can't turn it into a number, it's not a usable NFR yet.",

  realWorldExamples: [
    "A booking system and a chat app might share the functional requirement \"users can send a message,\" but a chat app's stricter latency NFR (near-instant delivery) forces a completely different transport/architecture than a booking system's confirmation message.",
    "Product teams often ship a feature (functional requirement met) that later needs a full re-architecture once real NFRs — actual traffic, actual latency complaints — surface in production.",
  ],

  mermaidDiagram: `flowchart TD
    R[Requirement] --> F{Functional or\nNon-functional?}
    F -->|What it does| FR[Functional Requirement\ne.g. upload a photo]
    F -->|How well it does it| NFR[Non-functional Requirement\ne.g. p99 < 200ms]
    FR --> C[Shapes: feature list, components]
    NFR --> D[Shapes: architecture, tech choices]`,

  flashcards: [
    { id: "fnf-fc1", front: "Functional requirement", back: "What the system must do — specific features and behaviors.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "fnf-fc2", front: "Non-functional requirement", back: "How well the system must do it — latency, uptime, throughput, cost, security.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "fnf-fc3", front: "Why express NFRs as numbers?", back: "Vague adjectives ('fast') aren't designable or verifiable — numbers ('p99 < 200ms') are.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-fc4", front: "Which requirement type most often gets forgotten in interviews?", back: "Non-functional requirements.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "fnf-fc5", front: "\"Search must return results in under 100ms\" — functional or non-functional?", back: "Non-functional (the 'search' feature itself is functional; the latency bound is the NFR).", topic: "Fundamentals", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "Functional vs Non-functional Requirements",
    sections: [
      { heading: "Functional = What", items: ["Features", "Behaviors", "User stories"] },
      { heading: "Non-functional = How well", items: ["Latency", "Uptime / availability", "Throughput", "Durability", "Cost", "Security"] },
      { heading: "Always ask", items: ["Expected scale (users, QPS)", "Latency target", "Uptime target", "Consistency needs", "Budget constraints"] },
    ],
  },

  speedNotes: [
    "Functional = what it does. Non-functional = how well.",
    "NFRs drive architecture; functional requirements drive the feature/component list.",
    "State NFRs as numbers, not adjectives.",
    "NFRs are the requirement type candidates forget to ask about — always ask.",
    "A single requirement can hide both types (search feature + its latency bound).",
  ],
};
