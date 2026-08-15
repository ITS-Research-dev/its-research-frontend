"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/common/DataTable";

import { BankQuestion } from "@/types/bank";

interface Props {
  data: BankQuestion[];
  onEdit: (item: BankQuestion) => void;
}

export default function QuestionTable({ data, onEdit }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.topic.title.toLowerCase().includes(keyword),
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    {
      header: "Soal",
      render: (item: BankQuestion) => (
        <div>
          <p className="font-semibold text-text">{item.title}</p>

          <div className="mt-2">
            <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {item.topic.title}
            </span>
          </div>
        </div>
      ),
    },

    {
      header: "Status",
      render: (item: BankQuestion) => (
        <Badge variant={item.status === "active" ? "success" : "secondary"}>
          {item.status === "active" ? "Aktif" : "Nonaktif"}
        </Badge>
      ),
    },

    {
      header: "Aksi",
      render: (item: BankQuestion) => (
        <div className="flex items-center gap-2">
          <Link href={`/teacher/bank/question/${item.id}`}>
            <Button variant="outline" size="sm" startIcon={<Eye size={16} />}>
              Lihat
            </Button>
          </Link>

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
      emptyTitle="Belum ada soal"
      emptyDescription="Soal yang tersedia akan muncul di sini."
    />
  );
}
