import type { ConceptRevisionContent } from "./types";

export const docker: ConceptRevisionContent = {
  slug: "docker",
  title: "Docker",
  topic: "Cloud & Infrastructure",
  difficulty: "Beginner",
  estimatedMinutes: 15,
  docLinks: [
    { label: "Docker", href: "/docs/cloud/docker" },
    { label: "Containers", href: "/docs/cloud/containers" }
  ],
  summary: [
    "Docker is a platform for developing, shipping, and running applications in containers.",
    "Containers package an application with all its dependencies, ensuring it runs consistently across environments.",
    "Unlike Virtual Machines (VMs), containers share the host OS kernel, making them lightweight and fast to start.",
    "Docker images are read-only templates used to create containers, defined by a Dockerfile.",
    "Docker revolutionized microservices architecture by simplifying deployment and scaling."
  ],
  whyAsked: [
    "To ensure you understand modern application deployment and containerization.",
    "To test your knowledge of how containers differ from traditional VMs.",
    "To see if you know how to package applications for cloud-native environments (like Kubernetes)."
  ],
  thirtySecondAnswer: "Docker is a containerization platform that packages applications and their dependencies into a single, standardized unit called a container. Because containers share the host operating system's kernel, they are much more lightweight, resource-efficient, and faster to start than traditional Virtual Machines, which require a full guest OS. Docker ensures the 'it works on my machine' problem is eliminated, providing consistent environments from development to production.",
  detailedAnswer: [
    "Images: Read-only templates built from a Dockerfile. They contain the application code, libraries, and tools.",
    "Containers: Runnable instances of images. They are isolated processes running on the host OS.",
    "Dockerfile: A script containing instructions to build a Docker image layer by layer.",
    "Registry: A storage system for Docker images (e.g., Docker Hub, Amazon ECR).",
    "Namespaces: Linux feature used by Docker to provide isolation (PID, NET, IPC).",
    "Cgroups: Linux feature used by Docker to limit and measure resource usage (CPU, Memory)."
  ],
  questions: [
    { id: "dkr-q1", question: "What is a container?", answer: "A standardized, executable package of software that includes everything needed to run an application: code, runtime, system tools, and libraries.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "dkr-q2", question: "What is the main difference between a container and a Virtual Machine (VM)?", answer: "VMs include a full guest operating system and virtualize hardware. Containers share the host OS kernel and virtualize the OS, making them much lighter and faster.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "dkr-q3", question: "What is a Docker image?", answer: "A read-only template with instructions for creating a Docker container.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "dkr-q4", question: "What is a Dockerfile?", answer: "A text document containing all the commands a user could call on the command line to assemble an image.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "dkr-q5", question: "What is Docker Hub?", answer: "A cloud-based registry service where developers can store and share Docker images.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "dkr-q6", question: "What underlying Linux features does Docker use?", answer: "Namespaces for isolation and Control Groups (cgroups) for resource allocation.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q7", question: "What do Linux Namespaces provide to Docker?", answer: "They provide isolation for processes, networking, mounts, and users, ensuring a container cannot see or affect other containers.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q8", question: "What do cgroups provide to Docker?", answer: "They limit and isolate the resource usage (CPU, memory, disk I/O) of a collection of processes (the container).", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q9", question: "What happens to data inside a container when the container stops?", answer: "By default, the data persists as long as the container exists. However, if the container is removed, the data inside its writable layer is lost.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q10", question: "How do you persist data in Docker?", answer: "Using Docker Volumes or Bind Mounts, which map a directory on the host machine to a directory inside the container.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q11", question: "What is the difference between an Image and a Container?", answer: "An Image is a static, read-only template (the class). A Container is a running instance of an Image (the object).", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "dkr-q12", question: "What is a multi-stage build in Docker?", answer: "A method in a Dockerfile to use multiple FROM statements, allowing you to compile code in one stage and copy only the final binary into a smaller, cleaner final image.", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "dkr-q13", question: "Why should you minimize the number of layers in an image?", answer: "To reduce the final image size and build time. Each layer adds overhead.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q14", question: "What is Docker Compose?", answer: "A tool for defining and running multi-container Docker applications using a YAML file.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q15", question: "Is Docker a hypervisor?", answer: "No. Hypervisors virtualize hardware to run VMs. Docker uses the host OS kernel to run isolated processes.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q16", question: "How do containers communicate with each other?", answer: "Through Docker networks. Containers on the same bridge network can communicate via internal IP or container name (DNS).", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q17", question: "What is the 'scratch' image?", answer: "An explicitly empty image used as a starting point for creating super-minimal images (often for statically compiled binaries like Go).", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "dkr-q18", question: "Can a Windows container run on a Linux host?", answer: "No, because containers share the host kernel. A Windows container requires a Windows kernel. (Though tools like WSL2 blur this line for local dev).", topic: "Cloud & Infrastructure", difficulty: "Advanced" },
    { id: "dkr-q19", question: "What is an entrypoint in a Dockerfile?", answer: "The command that will always be executed when the container starts. CMD can be passed as arguments to ENTRYPOINT.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-q20", question: "Why is it recommended to run one process per container?", answer: "It keeps containers lightweight, simplifies lifecycle management, scaling, and logging (microservices architecture).", topic: "Cloud & Infrastructure", difficulty: "Intermediate" }
  ],
  commonFollowUps: [
    "How does Docker differ from Kubernetes?",
    "Explain how Docker handles networking between containers.",
    "How do you optimize a Dockerfile to produce a smaller image?"
  ],
  commonMistakes: [
    "Treating containers like VMs by installing SSH or running multiple background services inside one container.",
    "Storing state/data directly in the container's writable layer instead of using volumes.",
    "Running containers as the 'root' user in production, which is a security risk."
  ],
  interviewTraps: [
    "Confusing Docker (the container runtime/packaging tool) with Kubernetes (the container orchestration tool).",
    "Failing to understand that containers on the same host share the same OS kernel."
  ],
  tradeoffs: [
    "Containers vs VMs: Containers are faster and lighter, but VMs offer stronger security isolation because they don't share a kernel.",
    "Alpine Linux vs Ubuntu Images: Alpine is much smaller and more secure, but uses musl libc which can cause compatibility issues with some software."
  ],
  comparisonTable: {
    title: "Docker vs Virtual Machines",
    columns: ["Feature", "Docker Containers", "Virtual Machines"],
    rows: [
      { label: "Architecture", values: ["Shares Host OS Kernel", "Requires full Guest OS"] },
      { label: "Startup Time", values: ["Milliseconds", "Minutes"] },
      { label: "Resource Usage", values: ["Lightweight (MBs)", "Heavy (GBs)"] },
      { label: "Isolation", values: ["Process level (Namespaces)", "Hardware level (Hypervisor)"] },
      { label: "Portability", values: ["High (Runs anywhere Docker is)", "Moderate (Tied to hypervisor/formats)"] }
    ]
  },
  memoryTrick: "VMs virtualize the hardware; Containers virtualize the OS.",
  realWorldExamples: [
    "Spotify uses Docker to package its hundreds of microservices, ensuring consistency from local dev to production.",
    "Netflix uses containers heavily for batch processing and continuous delivery pipelines."
  ],
  mermaidDiagram: "flowchart TD\\n  subgraph VM [Virtual Machine Architecture]\\n    Hardware1[Hardware] --> Hypervisor\\n    Hypervisor --> VM1[Guest OS 1] & VM2[Guest OS 2]\\n    VM1 --> App1[App + Bins/Libs]\\n    VM2 --> App2[App + Bins/Libs]\\n  end\\n  subgraph Docker [Docker Architecture]\\n    Hardware2[Hardware] --> HostOS[Host OS]\\n    HostOS --> DockerEngine[Docker Engine]\\n    DockerEngine --> Cont1[Container 1: App + Libs]\\n    DockerEngine --> Cont2[Container 2: App + Libs]\\n  end",
  flashcards: [
    { id: "dkr-fc1", front: "Container vs VM", back: "Containers share the host kernel and are lightweight. VMs run a full guest OS.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "dkr-fc2", front: "Dockerfile", back: "A script of instructions used to build a Docker image.", topic: "Cloud & Infrastructure", difficulty: "Beginner" },
    { id: "dkr-fc3", front: "Linux Namespaces", back: "The underlying Linux feature that provides isolation to Docker containers.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-fc4", front: "Docker Volume", back: "The preferred mechanism for persisting data generated by and used by Docker containers.", topic: "Cloud & Infrastructure", difficulty: "Intermediate" },
    { id: "dkr-fc5", front: "Multi-stage Build", back: "A pattern to use multiple FROM statements to separate build tools from the final runtime image, saving space.", topic: "Cloud & Infrastructure", difficulty: "Advanced" }
  ],
  cheatSheet: {
    title: "Docker Cheat Sheet",
    sections: [
      { heading: "Core Components", items: ["Image: Read-only template", "Container: Running instance", "Registry: Image storage"] },
      { heading: "Under the Hood", items: ["Namespaces: Isolation", "cgroups: Resource limits", "UnionFS: Layered file system"] },
      { heading: "Best Practices", items: ["One process per container", "Use Volumes for persistent data", "Use multi-stage builds"] }
    ]
  },
  speedNotes: [
    "Packages app + dependencies.",
    "Shares host OS kernel.",
    "Lighter and faster than VMs.",
    "Dockerfile builds Images.",
    "Volumes persist data."
  ]
};
