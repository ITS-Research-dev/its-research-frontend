"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DataTable from "@/components/common/DataTable";

import { Eye } from "lucide-react";

import { useAssessmentHistory } from "@/hooks/useAssessment";
import { AssessmentHistoryItem } from "@/types/asessment";

function levelVariant(level: string) {
  switch (level) {
    case "Proficient":
      return "success";

    case "Competent":
      return "primary";

    case "Beginner":
      return "warning";

    default:
      return "danger";
  }
}

export default function AssessmentHistory() {
  const { histories, loading } = useAssessmentHistory();

  const [search, setSearch] = useState("");

  const [topic, setTopic] = useState("all");

  const [page, setPage] = useState(1);

  const pageSize = 5;

  const topicOptions = useMemo(() => {
    const uniqueTopics = Array.from(
      new Set(histories.map((item) => item.topic)),
    );

    return [
      {
        label: "Semua Topik",
        value: "all",
      },
      ...uniqueTopics.map((topicName) => ({
        label: topicName,
        value: topicName,
      })),
    ];
  }, [histories]);

  const filtered = useMemo(() => {
    return histories.filter((item) => {
      const keyword = search.toLowerCase();

      const matchKeyword =
        item.topic.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword);

      const matchTopic = topic === "all" || item.topic === topic;

      return matchKeyword && matchTopic;
    });
  }, [histories, search, topic]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    {
      header: "Topik",
      render: (item: AssessmentHistoryItem) => item.topic,
    },
    {
      header: "Soal",
      render: (item: AssessmentHistoryItem) => item.title,
    },
    {
      header: "Level",
      render: (item: AssessmentHistoryItem) => (
        <Badge variant={levelVariant(item.level)}>{item.level}</Badge>
      ),
    },
    {
      header: "Aksi",
      render: (item: AssessmentHistoryItem) => (
        <Link href={`/student/profile/history/${item.id}`}>
          <Button variant="outline" size="sm" startIcon={<Eye size={16} />}>
            Detail
          </Button>
        </Link>
      ),
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
        loading={loading}
        searchValue={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        dropdownValue={topic}
        dropdownItems={topicOptions}
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
