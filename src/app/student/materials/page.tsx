"use client";

import PageHeader from "@/components/common/PageHeader";
import ItemList from "@/components/common/ItemList";
import { useMaterials } from "@/hooks/useMaterial";
import EmptyState from "@/components/common/EmptyState";

export default function MaterialPage() {
  const { materials, loading } = useMaterials();

  if (loading) {
    return (
      <EmptyState
        title="Materi Pembelajaran"
        description="Memuat materi..."
      />
    );
  }
  return (
    <div className="space-y-8">
      <PageHeader
        title="Pilih Topik Materi"
        description="Materi disusun berurutan dari dasar hingga tingkat lanjut. Selesaikan setiap topik untuk membuka materi berikutnya."
      />

      {materials.length < 1 ? (
        <EmptyState
          title="Materi Pembelajaran"
          description="Belum ada materi pembelajaran yang tersedia."
        />
      ) : (
        <ItemList items={materials} />
      )}
    </div>
  );
}
