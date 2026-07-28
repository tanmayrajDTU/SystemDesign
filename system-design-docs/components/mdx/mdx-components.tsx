import { Callout } from "@/components/mdx/callout";
import { Mermaid } from "@/components/mdx/mermaid-diagram";
import { PreBlock } from "@/components/mdx/pre-block";
import { Quiz } from "@/components/mdx/quiz";
import { Flashcards } from "@/components/mdx/flashcard";

// Note: ```mermaid fences are converted to <Mermaid chart={`...`}/> JSX
// *before* the MDX source reaches the compiler (see lib/content.ts ->
// transformMermaidFences), so `pre` here only ever receives real code
// blocks that should go through Shiki syntax highlighting.
export const mdxComponents: Record<string, any> = {
  pre: PreBlock,
  Mermaid,
  Callout,
  Quiz,
  Flashcards,
};
