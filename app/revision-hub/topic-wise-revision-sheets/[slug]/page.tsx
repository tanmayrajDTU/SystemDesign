import { notFound } from "next/navigation";
import { ConceptRevisionSheet } from "@/components/revision/concept-revision-sheet";
import { ALL_CONCEPTS, getConceptBySlug } from "@/lib/revision-hub/concepts";

export function generateStaticParams() {
  return ALL_CONCEPTS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const concept = getConceptBySlug(params.slug);
  return {
    title: concept ? `${concept.title} — Revision Sheet` : "Revision Sheet",
    description: concept?.thirtySecondAnswer,
  };
}

export default function ConceptPage({ params }: { params: { slug: string } }) {
  const concept = getConceptBySlug(params.slug);
  if (!concept) notFound();
  return <ConceptRevisionSheet concept={concept} />;
}
