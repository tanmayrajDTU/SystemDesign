import type { ConceptRevisionContent } from "./types";

export const containers: ConceptRevisionContent = {
  slug: "containers",
  title: "Containers",
  topic: "Cloud & Infrastructure",
  difficulty: "Intermediate",
  estimatedMinutes: 20,
  docLinks: [
    { label: "Containers Overview", href: "/docs/cloud/containers" },
    { label: "Docker", href: "/docs/cloud/docker" },
    { label: "Kubernetes", href: "/docs/cloud/kubernetes" },
  ],
  summary: [
    "Containers are lightweight, standalone, executable packages of software that include everything needed to run an application.",
    "They package application code, runtime, system tools, libraries, and settings into a single immutable artifact.",
    "Unlike VMs, containers share the host machine's OS kernel, making them much lighter and faster to start.",
    "Containers enable consistent execution across different environments, from development to production.",
    "They abstract away environment variations and are the foundation for microservices architectures.",
  ],
  whyAsked: [
    "To evaluate your understanding of modern deployment paradigms.",
    "To see if you know how to package applications for cloud-native architectures.",
    "To assess your grasp of isolation, resource sharing, and orchestration basics.",
  ],
  thirtySecondAnswer: "Containers isolate an application and its dependencies into a self-contained unit that can run anywhere. By sharing the host OS kernel instead of booting a full guest OS like VMs, containers are incredibly lightweight, start almost instantly, and provide environmental consistency from a developer's laptop to production servers.",
  detailedAnswer: [
    "Containers leverage Linux kernel features like Namespaces (for isolation) and cgroups (for resource limiting).",
    "They use a layered filesystem (like UnionFS) to maximize reuse and minimize storage overhead.",
    "Containers run as isolated processes in user space on the host operating system.",
    "They provide isolation without the overhead of virtualization, leading to higher density on physical hardware.",
    "Containers are typically stateless, meaning data must be persisted via external volumes.",
  ],
  questions: [
    { id: "ctr-q1", question: "What is a container?", answer: "A standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-q2", question: "How do containers differ from VMs?", answer: "VMs virtualize the hardware and include a full guest OS. Containers virtualize the OS, sharing the host kernel, making them smaller and faster.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-q3", question: "What are namespaces in Linux?", answer: "Kernel features that partition kernel resources such that one set of processes sees one set of resources while another set sees a different set, providing isolation.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-q4", question: "What are cgroups (control groups)?", answer: "A Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O) of a collection of processes.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-q5", question: "Why are containers considered ephemeral?", answer: "By default, any data written inside a container is lost when the container stops or is removed, unless external volumes are used.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-q6", question: "What is Docker?", answer: "A popular platform and toolset for developing, shipping, and running applications in containers.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-q7", question: "What is a Docker image?", answer: "A read-only template with instructions for creating a Docker container, built using a Dockerfile.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-q8", question: "Explain layered file systems in containers.", answer: "Container images are built in layers. Each layer represents an instruction. Layers are cached and reused, reducing build time and storage space.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-q9", question: "How do containers communicate with each other?", answer: "Via virtual networks created by the container engine, or by linking containers, exposing ports, and routing through a host's network interfaces.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-q10", question: "What is container orchestration?", answer: "The automated management, scaling, and deployment of containerized applications, typically handled by tools like Kubernetes.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-q11", question: "Can a container run a different OS kernel than its host?", answer: "No, Linux containers require a Linux kernel, Windows containers require a Windows kernel. However, tools like Docker Desktop run a lightweight VM to provide the right kernel.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-q12", question: "What are the security concerns with containers?", answer: "Because they share the host kernel, kernel exploits can compromise the host and other containers. Root access inside a container can sometimes lead to host compromise if not properly isolated.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "ctr-q13", question: "How do you persist data in containers?", answer: "By using volume mounts or bind mounts to attach host storage or network storage to the container's filesystem.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-q14", question: "What is a registry in the context of containers?", answer: "A storage and distribution system for named container images, such as Docker Hub or AWS ECR.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-q15", question: "What happens if a container uses all the host's memory?", answer: "Without limits (cgroups), it can crash the host or trigger the Out Of Memory (OOM) killer. It's best practice to set resource limits.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "ctr-q16", question: "What is rootless Docker?", answer: "Running the Docker daemon and containers as a non-root user to mitigate potential security vulnerabilities in the daemon and container runtime.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "ctr-q17", question: "How does container networking typically work?", answer: "Using bridge networks by default, where containers get internal IPs and communicate via NAT to the outside world.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-q18", question: "What is the role of the containerd runtime?", answer: "It manages the complete container lifecycle of its host system, from image transfer to execution and supervision, acting as a core runtime beneath tools like Docker.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "ctr-q19", question: "Why avoid running monolithic apps in containers?", answer: "Monoliths are large and slow to start, defeating the lightweight, agile purpose of containers, though it's technically possible.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-q20", question: "What is an init process in a container?", answer: "The first process (PID 1). If it dies, the container exits. It's responsible for reaping zombie processes.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
  ],
  commonFollowUps: [
    "How do you handle persistent storage for stateful apps in containers?",
    "How does container networking span across multiple physical hosts?",
    "What are the security differences between containers and VMs?",
  ],
  commonMistakes: [
    "Assuming containers provide the same hard security isolation as VMs.",
    "Treating containers like VMs by SSH-ing into them or storing persistent data directly in their filesystem.",
    "Creating massive, bloated container images by including unnecessary tools or not utilizing multi-stage builds.",
  ],
  interviewTraps: [
    "Using containers to solve architectural problems; bad code in a container is just portable bad code.",
    "Forgetting to mention that containers still depend on a host OS and kernel.",
  ],
  tradeoffs: [
    "Performance/Density vs. Security Isolation: Containers offer high density but weaker isolation compared to VMs.",
    "Portability vs. Complexity: High portability but requires adopting new tools, registries, and orchestration systems.",
  ],
  comparisonTable: {
    title: "Containers vs. Virtual Machines (VMs)",
    columns: ["Feature", "Containers", "Virtual Machines"],
    rows: [
      { label: "Architecture", values: ["Shares host OS kernel", "Has its own full guest OS"] },
      { label: "Startup Time", values: ["Milliseconds to seconds", "Minutes"] },
      { label: "Size", values: ["Megabytes", "Gigabytes"] },
      { label: "Isolation", values: ["Process-level (Namespaces/cgroups)", "Hardware-level (Hypervisor)"] },
      { label: "Density", values: ["High (thousands per host)", "Low (dozens per host)"] },
    ]
  },
  memoryTrick: "Containers are like standardized shipping boxes: they hold anything, fit on any ship, and share the ship's infrastructure, unlike a custom vehicle (VM) that brings its own engine.",
  realWorldExamples: [
    "Dockerizing a web application so developers can test it locally exactly as it will run on AWS.",
    "Using containers to run independent microservices for an e-commerce platform.",
  ],
  mermaidDiagram: `flowchart TD
    subgraph Host OS
        Kernel[Linux Kernel]
    end
    subgraph Container 1
        App1[App 1]
        Bins1[Bins/Libs]
    end
    subgraph Container 2
        App2[App 2]
        Bins2[Bins/Libs]
    end
    App1 --> Bins1 --> Kernel
    App2 --> Bins2 --> Kernel
  `,
  flashcards: [
    { id: "ctr-fc1", front: "What kernel feature provides isolation for containers?", back: "Namespaces.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-fc2", front: "What kernel feature controls resource limits for containers?", back: "cgroups (control groups).", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "ctr-fc3", front: "Do containers have their own OS kernel?", back: "No, they share the host OS kernel.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-fc4", front: "How is data persisted beyond the life of a container?", back: "Using volumes or bind mounts.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "ctr-fc5", front: "What is PID 1 in a container?", back: "The primary process; if it dies, the container terminates.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
  ],
  cheatSheet: {
    title: "Containers Cheat Sheet",
    sections: [
      {
        heading: "Core Concepts",
        items: [
          "Image: Read-only template to create containers.",
          "Container: Runnable instance of an image.",
          "Registry: Repository for storing images (e.g., Docker Hub).",
          "Dockerfile: Script containing instructions to build an image."
        ]
      },
      {
        heading: "Under the Hood",
        items: [
          "Namespaces: Isolate processes, networks, IPC, mounts.",
          "cgroups: Limit CPU, memory, and IO.",
          "UnionFS: Layered file system for lightweight images."
        ]
      },
      {
        heading: "Best Practices",
        items: [
          "One process per container.",
          "Keep images small (multi-stage builds).",
          "Don't run as root user inside the container.",
          "Use volumes for persistent data."
        ]
      }
    ]
  },
  speedNotes: [
    "Containers package code and dependencies.",
    "Share host kernel, unlike VMs.",
    "Fast startup, lightweight size.",
    "Isolated via namespaces and cgroups.",
    "Ephemeral by default; need volumes."
  ]
};
