"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

import Button from "@/components/ui/Button";
import DataTable from "@/components/common/DataTable";

import { MonitoringStudent } from "@/types/monitoring";

interface Props {
  data: MonitoringStudent[];
}

export default function MonitoringTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) => item.name.toLowerCase().includes(keyword));
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    {
      header: "Nama",
      render: (item: MonitoringStudent) => (
        <span className="font-medium text-text">{item.name}</span>
      ),
    },

    {
      header: "Aksi",
      render: (item: MonitoringStudent) => (
        <Link href={`/teacher/monitoring/${item.id}`}>
          <Button variant="outline" size="sm" startIcon={<Eye size={16} />}>
            Lihat Detail
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-text">Daftar Siswa</h2>

        <p className="mt-1 text-description">
          Daftar siswa yang terdaftar pada kelas ini.
        </p>
      </div>

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
        emptyTitle="Belum ada siswa"
        emptyDescription="Data siswa pada kelas ini akan muncul di sini."
      />
    </section>
  );
}
