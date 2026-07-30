import { notFound } from "next/navigation";

import { materials } from "@/data/materials";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MaterialHeader from "@/components/material/MaterialHeader";
import MaterialContent from "@/components/material/MaterialContent";
import MaterialFooter from "@/components/material/MaterialFooter";
import SummaryCard from "@/components/material/SummaryCard";
import CodeBlock from "@/components/material/CodeBlock";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MaterialDetailPage({ params }: Props) {
  const { id } = await params;

  const material = materials.find((item) => item.id === id);

  if (!material) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href="/student/materials"
        className="
    mb-6
    inline-flex
    items-center
    gap-2
    text-sm
    font-medium
    text-primary
    transition-colors
    hover:text-primary/80
  "
      >
        <ArrowLeft size={18} />
        Kembali ke Materi
      </Link>

      <MaterialHeader
        title={material.title}
        description={material.description}
      />

      <MaterialContent>
        {material.content.map((item, index) => {
          switch (item.type) {
            case "heading":
              return (
                <h2 key={index} className="text-2xl font-bold text-text">
                  {item.value as string}
                </h2>
              );

            case "paragraph":
              return (
                <p key={index} className="mb-5 leading-8 text-description">
                  {item.value}
                </p>
              );

            case "code":
              return <CodeBlock key={index}>{item.value as string}</CodeBlock>;

            case "list":
              return (
                <ul
                  key={index}
                  className="mb-6 list-disc space-y-2 pl-6 text-description"
                >
                  {(item.value as string[]).map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              );

            case "summary":
              return (
                <SummaryCard key={index}>
                  <ul className="list-disc space-y-2 pl-6">
                    {(item.value as string[]).map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </SummaryCard>
              );

            default:
              return null;
          }
        })}

        <MaterialFooter />
      </MaterialContent>
    </div>
  );
}
