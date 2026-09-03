"use client";

import EmptyState from "@/components/common/EmptyState";
import ItemList from "@/components/common/ItemList";
import PageHeader from "@/components/common/PageHeader";

import { useCases } from "@/hooks/useCase";

export default function CasePage() {
  const { cases, loading } = useCases();

  if (loading) {
    return (
      <EmptyState
        title="Studi Kasus"
        description="Memuat daftar studi kasus..."
      />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Pilih Topik Studi Kasus"
        description="Kerjakan studi kasus secara berurutan untuk mengukur kemampuanmu dalam menerapkan materi yang telah dipelajari."
      />

      {cases.length === 0 ? (
        <EmptyState
          title="Studi Kasus"
          description="Belum ada studi kasus yang tersedia."
        />
      ) : (
        <ItemList items={cases} />
      )}
    </div>
  );
}
