"use client";

import PageHeader from "@/components/common/PageHeader";
import ItemList from "@/components/common/ItemList";
import { useMaterials } from "@/hooks/useMaterial";
import Loading from "@/components/common/Loading";
import EmptyState from "@/components/common/EmptyState";

export default function MaterialPage() {
const { materials, loading } = useMaterials();

  if (loading) {
    return <Loading open={true} text="Memuat materi..." />;
  }
  return (
    <div className="space-y-8">
      <PageHeader
        title="Pilih Topik Materi"
        description="Materi disusun berurutan dari dasar hingga tingkat lanjut. Selesaikan setiap topik untuk membuka materi berikutnya."
      />

      { materials.length < 1 ? 
        <EmptyState title="NSAKNDA" description="dnand" /> :
        <ItemList items={materials} />
      }
    </div>
  );
}
