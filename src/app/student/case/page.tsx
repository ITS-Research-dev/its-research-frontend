"use client";

import Loading from "@/components/common/Loading";
import ItemList from "@/components/common/ItemList";
import PageHeader from "@/components/common/PageHeader";

import { useCases } from "@/hooks/useCase";

export default function CasePage() {
  const { cases, loading } = useCases();

  if (loading) {
    return <Loading open={true} text="Memuat studi kasus..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Pilih Topik Studi Kasus"
        description="Kerjakan studi kasus secara berurutan untuk mengukur kemampuanmu dalam menerapkan materi yang telah dipelajari."
      />

      <ItemList items={cases} />
    </div>
  );
}
