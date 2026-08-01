import type { ConceptRevisionContent } from "./types";

export const highAvailability: ConceptRevisionContent = {
  slug: "high-availability",
  title: "High Availability",
  topic: "Fundamentals",
  difficulty: "Intermediate",
  estimatedMinutes: 12,

  docLinks: [
    { label: "Availability", href: "/docs/fundamentals/availability" },
    { label: "Fault Tolerance", href: "/docs/fundamentals/fault-tolerance" },
  ],

  summary: [
    "High availability (HA) is the design goal and set of practices aimed at keeping a system's availability at a very high nines target (typically 99.9%+) by systematically removing single points of failure.",
    "It's the applied, architectural side of the Availability concept — availability is the metric; high availability is the engineering discipline of hitting an ambitious target for it.",
    "The core building blocks: redundancy (multiple instances), health checking/detection, automatic failover, and eliminating shared failure domains (not just duplicating a component, but duplicating it somewhere genuinely independent).",
    "HA is usually implemented in layers: redundant instances within a zone, redundant zones within a region, and sometimes redundant regions — each layer protects against a progressively larger blast radius of failure.",
    "HA architecture and cost scale together non-linearly — each additional nine of target availability requires addressing progressively rarer and subtler failure modes.",
    "HA is necessary but not sufficient for a good user experience: an HA system that's up but slow, or up but returning wrong data, hasn't actually solved the underlying reliability problem.",
  ],

  whyAsked: [
    "It checks whether a candidate can translate an availability target (\"99.99% uptime\") into concrete architectural decisions, not just recite the number.",
    "It's the natural place to probe redundancy design across failure domains — zone-level, region-level — beyond just \"add another server.\"",
    "It surfaces whether someone understands HA has a real, escalating cost curve rather than being a free architectural upgrade.",
  ],

  thirtySecondAnswer:
    "High availability is the engineering discipline of designing a system to hit a very high availability target — typically 99.9% or higher — by systematically removing single points of failure. The core building blocks are redundancy, health checking to detect failures, and automatic failover to route around them without human intervention. HA is usually layered: redundant instances within a zone protect against a single server dying, redundant zones within a region protect against a zone-wide outage, and redundant regions protect against an entire region going down. Each layer protects against a progressively bigger blast radius, and each layer also costs progressively more — which is why the right amount of HA investment matches the actual stated availability requirement, not an arbitrarily high target chosen for its own sake.",

  detailedAnswer: [
    "High availability = the architectural practice of hitting a demanding availability target (commonly 99.9%+) through deliberate redundancy design.",
    "Building blocks: redundant instances, automated health checks/monitoring, automatic failover, and load balancing to distribute traffic across healthy instances.",
    "HA is layered by failure-domain size: instance-level redundancy (a server dies), zone-level redundancy (an availability zone has an outage), region-level redundancy (an entire region fails) — each layer requires progressively more infrastructure investment.",
    "A common mistake is duplicating a component without duplicating its failure domain — two instances in the same rack, same zone, or sharing the same underlying dependency aren't truly independent, and a shared-cause failure takes both down together.",
    "HA cost and complexity rise steeply with each additional nine of target — matching the HA investment to the actual required availability (not the highest theoretically achievable number) is itself part of good system design judgment.",
  ],

  questions: [
    { id: "ha-q1", question: "What is high availability?", answer: "The engineering discipline and set of practices for designing a system to hit a very high availability target (typically 99.9%+) by systematically removing single points of failure.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ha-q2", question: "How does high availability relate to the general concept of availability?", answer: "Availability is the metric (percentage of uptime); high availability is the applied engineering practice of architecting a system to hit an ambitious target for that metric.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ha-q3", question: "What are the core building blocks of an HA architecture?", answer: "Redundancy (multiple instances), health checks/detection, automatic failover, and load balancing across healthy instances.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ha-q4", question: "Why is HA usually implemented in layers (instance, zone, region)?", answer: "Each layer protects against a progressively larger blast radius of failure — instance redundancy handles a single server dying, zone redundancy handles a whole zone outage, region redundancy handles an entire region going down.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ha-q5", question: "What's a common mistake when implementing redundancy for HA?", answer: "Duplicating a component without duplicating its failure domain — e.g. two instances in the same rack or zone, or sharing an underlying dependency, aren't genuinely independent and can fail together.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-q6", question: "Why does HA cost rise steeply with each additional nine of target availability?", answer: "The easiest, most obvious single points of failure get addressed first; each further nine requires handling progressively rarer and subtler failure modes, which costs disproportionately more to cover.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ha-q7", question: "What's the difference between zone-level and region-level redundancy?", answer: "Zone-level redundancy protects against a single availability zone (a physically distinct data center within a region) failing; region-level redundancy protects against an entire geographic region failing.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ha-q8", question: "Is high availability the same as fault tolerance?", answer: "They're closely related — fault tolerance is largely the mechanism (redundancy, detection, failover) that HA relies on to achieve its availability target; HA is the goal, fault tolerance is much of how it's achieved.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ha-q9", question: "Why should HA investment match the actual stated availability requirement rather than maximizing availability unconditionally?", answer: "Because HA cost and complexity rise steeply with each nine — over-investing in availability beyond what's actually required wastes resources without a corresponding requirement to justify it.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-q10", question: "What role does a load balancer play in high availability?", answer: "It distributes traffic across healthy instances and detects/routes around unhealthy ones, so a single instance failure doesn't interrupt service.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ha-q11", question: "Why is automatic failover preferred over manual failover for HA?", answer: "Manual intervention adds delay (someone has to notice and act), directly increasing downtime — automatic failover minimizes the window between failure and recovery.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ha-q12", question: "What's an example of a shared failure domain that undermines apparent redundancy?", answer: "Two 'redundant' database replicas that both depend on the same power supply, network switch, or upstream service — a failure there takes both down simultaneously despite the redundancy.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-q13", question: "How does data replication factor into a highly available system?", answer: "For stateful components, redundancy isn't just about running multiple instances — the data itself needs to be replicated across those instances so a failover target actually has the data to serve.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ha-q14", question: "Why is a health check design choice important for HA?", answer: "A shallow health check (just 'is the process running') can miss a gray failure where the process is up but not actually able to serve correctly, delaying failover past when it should have triggered.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-q15", question: "What's the relationship between HA and disaster recovery?", answer: "HA is about continuous, automated resilience to routine failures; disaster recovery is the broader plan (often involving some acceptable recovery time) for catastrophic events that HA's automated mechanisms might not fully absorb.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-q16", question: "Why might a startup deliberately choose not to build multi-region HA?", answer: "The cost and complexity of multi-region redundancy is only justified once the availability requirement and business impact of downtime actually demand it — many systems are correctly single-region for a long time.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-q17", question: "How would you explain HA to a non-technical stakeholder?", answer: "It's building the system with enough backup capacity and automatic detection that if one part breaks, something else takes over immediately, without customers noticing.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ha-q18", question: "What's a common mistake candidates make when asked to design for high availability?", answer: "Jumping straight to multi-region architecture without first justifying that the stated availability target actually requires it, or without addressing simpler instance/zone-level redundancy first.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-q19", question: "How does session/state management complicate HA for stateful services?", answer: "If a user's session lives only on the instance that first served them, failing over to another instance can lose that state — HA for stateful services often requires externalizing session state to a shared store.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-q20", question: "Summarize high availability in one sentence.", answer: "The architectural practice of hitting a demanding availability target by layering redundancy, detection, and automatic failover across progressively larger failure domains.", topic: "Fundamentals", difficulty: "Beginner" },
  ],

  commonFollowUps: [
    "\"What specific availability target are we designing for, and what does that mean in downtime per year?\"",
    "\"Are these redundant instances actually in independent failure domains?\"",
    "\"What's the cost/complexity trade-off of going from zone-level to region-level HA here?\"",
  ],

  commonMistakes: [
    "Adding redundant instances without checking they're in genuinely independent failure domains.",
    "Reflexively proposing multi-region architecture without justifying it against the actual stated requirement.",
    "Using only shallow liveness health checks that miss gray/partial failures.",
    "Forgetting that stateful components need data replication, not just more running instances.",
  ],

  interviewTraps: [
    "\"Just add more servers for HA\" without checking failure-domain independence is a trap — the honest answer addresses whether those servers actually fail independently.",
    "Being asked to justify a chosen availability target's cost is testing whether you understand the steep, non-linear cost curve of additional nines, not just that \"more availability is always better.\"",
  ],

  tradeoffs: [
    "More redundancy layers (instance → zone → region) improve resilience but add cost and architectural complexity at each step.",
    "Automatic failover reduces downtime but risks flapping if failure detection is too sensitive or too coarse.",
    "Externalizing state for HA (shared session stores, replicated data) adds infrastructure but removes a class of failover data-loss risk.",
  ],

  decisionGuide: {
    kind: "question",
    id: "ha-root",
    question: "What's the largest failure blast radius you actually need to survive?",
    options: [
      {
        label: "A single server/instance dying",
        next: {
          kind: "result",
          id: "ha-instance",
          result: "Multiple instances behind a load balancer with health checks.",
          rationale: "The baseline HA setup — sufficient for the most common, smallest-blast-radius failure.",
        },
      },
      {
        label: "An entire availability zone failing",
        next: {
          kind: "result",
          id: "ha-zone",
          result: "Multi-AZ deployment with data replicated across zones.",
          rationale: "Instance redundancy within one zone doesn't survive a zone-wide event — the redundancy needs to span zones, not just servers.",
        },
      },
      {
        label: "An entire region failing",
        next: {
          kind: "result",
          id: "ha-region",
          result: "Multi-region deployment — justify this against actual cost/complexity vs. the real business impact of a region-wide outage.",
          rationale: "This is the most expensive layer — only justified when the stated availability target and business impact genuinely demand surviving a whole-region failure.",
        },
      },
    ],
  },

  memoryTrick:
    "\"Redundancy without independence isn't redundancy.\" Two copies of anything sharing the same rack, zone, or dependency will fail together — HA means duplicating across a genuinely independent failure domain, not just duplicating the component.",

  realWorldExamples: [
    "Cloud providers structure regions into multiple availability zones specifically so customers can build HA architectures that survive a single zone's power or networking failure without needing full multi-region complexity.",
    "A payment processor running active-active across multiple regions is a real-world example of region-level HA, justified by the severe business cost of a payment outage — a level of investment most non-critical services wouldn't need.",
  ],

  mermaidDiagram: `flowchart TD
    subgraph ZoneA["Zone A"]
    I1[Instance] 
    I2[Instance]
    end
    subgraph ZoneB["Zone B"]
    I3[Instance]
    I4[Instance]
    end
    LB[Load Balancer] --> ZoneA
    LB --> ZoneB
    ZoneA -.zone fails.-> LB
    LB -->|routes to healthy zone| ZoneB`,

  flashcards: [
    { id: "ha-fc1", front: "High availability — one-line definition", back: "Engineering practice of hitting a demanding availability target by removing single points of failure.", topic: "Fundamentals", difficulty: "Beginner" },
    { id: "ha-fc2", front: "Core HA building blocks", back: "Redundancy, health checks/detection, automatic failover, load balancing.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ha-fc3", front: "Why does HA layer by instance/zone/region?", back: "Each layer protects against a progressively larger blast radius of failure.", topic: "Fundamentals", difficulty: "Intermediate" },
    { id: "ha-fc4", front: "What undermines apparent redundancy?", back: "Shared failure domains — 'redundant' components that share a rack, zone, or dependency aren't truly independent.", topic: "Fundamentals", difficulty: "Advanced" },
    { id: "ha-fc5", front: "Why doesn't HA investment scale linearly with target availability?", back: "Each additional nine requires addressing progressively rarer, subtler failure modes — cost rises steeply, not linearly.", topic: "Fundamentals", difficulty: "Advanced" },
  ],

  cheatSheet: {
    title: "High Availability",
    sections: [
      { heading: "Building blocks", items: ["Redundancy", "Health checks", "Automatic failover", "Load balancing"] },
      { heading: "Layers (by blast radius)", items: ["Instance-level (server dies)", "Zone-level (AZ outage)", "Region-level (region outage)"] },
      { heading: "Watch out for", items: ["Shared failure domains", "Shallow health checks (miss gray failures)", "Stateful failover without data replication"] },
      { heading: "Remember", items: ["Cost rises steeply per nine", "Match investment to actual requirement"] },
    ],
  },

  speedNotes: [
    "High availability = engineering practice for hitting a high uptime target.",
    "Building blocks: redundancy + detection + automatic failover + load balancing.",
    "Layered by blast radius: instance → zone → region.",
    "Redundancy without independent failure domains isn't real redundancy.",
    "Cost rises steeply per nine — match investment to actual requirement.",
  ],
};
