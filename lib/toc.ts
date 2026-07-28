import { visit } from "unist-util-visit";

export type TocEntry = {
  id: string;
  text: string;
  depth: 2 | 3;
};

// Rehype plugin: walks the HAST tree after rehype-slug has assigned ids,
// collects h2/h3 nodes into `out`, and mutates it in place so the caller
// (which runs this synchronously during compileMDX) can read it afterwards.
export function rehypeExtractToc(out: TocEntry[]) {
  return () => (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "h2" || node.tagName === "h3") {
        const id = node.properties?.id;
        if (!id) return;
        const text = extractText(node);
        out.push({ id, text, depth: node.tagName === "h2" ? 2 : 3 });
      }
    });
  };
}

function extractText(node: any): string {
  if (node.type === "text") return node.value;
  if (!node.children) return "";
  return node.children.map(extractText).join("");
}
