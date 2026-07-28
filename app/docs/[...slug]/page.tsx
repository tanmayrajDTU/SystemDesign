import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { Clock, BarChart3 } from "lucide-react";

import { getDocBySlug, getDocSlugs, transformMermaidFences } from "@/lib/content";
import { rehypeExtractToc, type TocEntry } from "@/lib/toc";
import { NAVIGATION, getPrevNext } from "@/data/navigation";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { RightToc } from "@/components/layout/right-toc";
import { PrevNext } from "@/components/layout/prev-next";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const doc = getDocBySlug(params.slug.join("/"));
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function DocPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const toc: TocEntry[] = [];

  const { content } = await compileMDX({
    source: transformMermaidFences(doc.content),
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
          rehypeExtractToc(toc),
        ],
      },
    },
  });

  const { prev, next } = getPrevNext(slug);
  const section = NAVIGATION.find((s) => s.items.some((i) => i.slug === slug));

  return (
    <div className="grid grid-cols-1 gap-10 px-6 py-10 xl:grid-cols-[minmax(0,1fr)_220px] xl:px-10">
      <article className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-ink-muted dark:text-ink-muted-dark">
          {section && <span>{section.title}</span>}
          <span>/</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {doc.readingTimeMinutes} min read
          </span>
          {doc.frontmatter.difficulty && (
            <span className="flex items-center gap-1">
              <BarChart3 size={12} /> <Badge>{doc.frontmatter.difficulty}</Badge>
            </span>
          )}
        </div>
        <h1 className="mb-3 font-display text-3xl font-semibold text-ink dark:text-ink-dark">
          {doc.frontmatter.title}
        </h1>
        {doc.frontmatter.description && (
          <p className="mb-8 text-lg text-ink-muted dark:text-ink-muted-dark">
            {doc.frontmatter.description}
          </p>
        )}
        <div className="prose-docs">{content}</div>
        <PrevNext prev={prev} next={next} />
      </article>
      <div className="hidden xl:block">
        <RightToc entries={toc} />
      </div>
    </div>
  );
}
