"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/common/DataTable";

import { BankMaterial } from "@/types/bank";

interface Props {
  data: BankMaterial[];
  onEdit: (item: BankMaterial) => void;
}

export default function MaterialTable({ data, onEdit }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword),
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    {
      header: "Materi",

      render: (item: BankMaterial) => (
        <div>
          <p className="font-semibold text-text">{item.title}</p>

          <p className="mt-1 text-sm text-description">{item.description}</p>
        </div>
      ),
    },

    {
      header: "Status",

      render: (item: BankMaterial) => (
        <Badge variant={item.status === "active" ? "success" : "secondary"}>
          {item.status === "active" ? "Aktif" : "Nonaktif"}
        </Badge>
      ),
    },

    {
      header: "Aksi",

      render: (item: BankMaterial) => (
        <div className="flex items-center gap-2">
          {/* LIHAT */}
          <Link href={`/teacher/bank/material/${item.id}`}>
            <Button variant="outline" size="sm" startIcon={<Eye size={16} />}>
              Lihat
            </Button>
          </Link>

          {/* EDIT */}
          <Button
            variant="outline"
            size="sm"
            startIcon={<Pencil size={16} />}
            onClick={() => onEdit(item)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={paginated}
      searchValue={search}
      onSearch={(value) => {
        setSearch(value);
        setPage(1);
      }}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      emptyTitle="Belum ada materi"
      emptyDescription="Materi yang tersedia akan muncul di sini."
    />
  );
}
