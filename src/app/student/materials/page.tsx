import PageHeader from "@/components/common/PageHeader";
import ItemList from "@/components/common/ItemList";

export default function MaterialPage() {
  const materials = [
    {
      id: "1",
      title: "Variabel dan Tipe Data",
      status: "completed" as const,
      icon: "book" as const,
    },
    {
      id: "2",
      title: "Percabangan (If Else)",
      status: "learning" as const,
      icon: "code" as const,
    },
    {
      id: "3",
      title: "Perulangan",
      status: "locked" as const,
      icon: "brain" as const,
    },
    {
      id: "4",
      title: "Function",
      status: "locked" as const,
      icon: "file" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Pilih Topik Materi"
        description="Materi disusun berurutan dari dasar hingga tingkat lanjut. Selesaikan setiap topik untuk membuka materi berikutnya."
      />

      <ItemList items={materials} />
    </div>
  );
}
