"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DataTable, { DropdownItem } from "@/components/common/DataTable";

import { Eye } from "lucide-react";

import { ProfileResponse } from "@/types/profile";

interface Props {
  data: ProfileResponse[];
  topics: string[];

  /**
   * Base URL untuk halaman detail asesmen.
   *
   * Student:
   * /student/profile/history
   *
   * Teacher:
   * /teacher/monitoring/1/assessment
   */
  detailBaseHref?: string;

  /**
   * Jika diberikan, tombol Detail akan memanggil callback ini
   * (modal) alih-alih navigasi ke halaman baru.
   * Digunakan di konteks monitoring guru.
   */
  onDetail?: (item: ProfileResponse) => void;
}

function levelVariant(level: string) {
  switch (level) {
    case "Competent":
      return "success";

    case "Expert":
      return "success";

    case "Advance":
      return "primary";

    case "Advance/Beginner":
      return "primary";

    case "Novice":
      return "warning";

    case "Beginner":
      return "warning";

    default:
      return "danger";
  }
}

function formatRawTopics(topics: string[]): DropdownItem[] {
  return [
    {
      label: "Semua Topik",
      value: "all",
    },

    ...topics.map((topicName) => ({
      label: topicName,
      value: topicName,
    })),
  ];
}

export default function AssessmentHistory({
  data,
  topics,
  detailBaseHref,
  onDetail,
}: Props) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("all");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const keyword = search.toLowerCase();

      const matchKeyword =
        item.test.title.toLowerCase().includes(keyword) ||
        item.test.topic.title.toLowerCase().includes(keyword);

      const matchTopic = topic === "all" || item.test.topic.title === topic;

      return matchKeyword && matchTopic;
    });
  }, [data, search, topic]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    {
      header: "Topik",

      render: (item: ProfileResponse) => item.test.topic.title,
    },

    {
      header: "Soal",

      render: (item: ProfileResponse) => item.test.title,
    },

    {
      header: "Level",

      render: (item: ProfileResponse) => (
        <Badge variant={levelVariant(item.level)}>{item.level}</Badge>
      ),
    },

    {
      header: "Aksi",

      render: (item: ProfileResponse) => {
        if (onDetail) {
          return (
            <Button
              variant="outline"
              size="sm"
              startIcon={<Eye size={16} />}
              onClick={() => onDetail(item)}
            >
              Detail
            </Button>
          );
        }

        const href = detailBaseHref
          ? `${detailBaseHref}/${item.id}`
          : `/student/profile/history/${item.id}`;

        return (
          <Link href={href}>
            <Button variant="outline" size="sm" startIcon={<Eye size={16} />}>
              Detail
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-text">Riwayat Asesmen</h2>

        <p className="mt-1 text-description">
          Seluruh asesmen yang pernah dikerjakan.
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
        dropdownValue={topic}
        dropdownItems={formatRawTopics(topics)}
        dropdownPlaceholder="Filter Topik"
        onDropdownChange={(value) => {
          setTopic(value);
          setPage(1);
        }}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="Belum ada asesmen"
        emptyDescription="Riwayat asesmen akan muncul di sini."
      />
    </section>
  );
}
