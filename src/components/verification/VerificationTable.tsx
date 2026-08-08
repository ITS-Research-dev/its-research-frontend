"use client";

import { useMemo, useState } from "react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DataTable, { DropdownItem } from "@/components/common/DataTable";

import { Eye, Search } from "lucide-react";

import { VerificationDetail, VerificationItem } from "@/types/verification";

import ReviewModal from "./ReviewModal";
import VerificationDetailModal from "./VerificationDetailModal";

interface Props {
  data: VerificationItem[];
  details: VerificationDetail[];
}

const statusItems: DropdownItem[] = [
  {
    label: "Semua Status",
    value: "all",
  },
  {
    label: "Perlu Verifikasi",
    value: "Perlu Verifikasi",
  },
  {
    label: "Selesai",
    value: "Selesai",
  },
];

function statusVariant(status: string) {
  if (status === "Selesai") {
    return "success";
  }

  return "danger";
}

const PAGE_SIZE = 10;

export default function VerificationTable({ data, details }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const [selectedReview, setSelectedReview] = useState<VerificationItem>();

  const [selectedDetail, setSelectedDetail] = useState<VerificationDetail>();

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.studentName.toLowerCase().includes(keyword) ||
        item.questionTitle.toLowerCase().includes(keyword);

      const matchStatus = status === "all" || item.status === status;

      return matchSearch && matchStatus;
    });
  }, [data, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const columns = [
    {
      header: "Nama",
      render: (item: VerificationItem) => (
        <span className="font-medium text-text">{item.studentName}</span>
      ),
    },

    {
      header: "Soal",
      render: (item: VerificationItem) => item.questionTitle,
    },

    {
      header: "Skor AI",
      render: (item: VerificationItem) => item.aiScore,
    },

    {
      header: "Status",
      render: (item: VerificationItem) => (
        <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
      ),
    },

    {
      header: "Aksi",
      render: (item: VerificationItem) => {
        if (item.status === "Perlu Verifikasi") {
          return (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setSelectedReview(item)}
            >
              Review
            </Button>
          );
        }

        const detail = details.find((detail) => detail.id === item.id);

        return (
          <Button
            variant="outline"
            size="sm"
            startIcon={<Eye size={16} />}
            onClick={() => setSelectedDetail(detail)}
          >
            Lihat Detail
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={paginated}
        searchValue={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        dropdownValue={status}
        dropdownItems={statusItems}
        dropdownPlaceholder="Filter Status"
        onDropdownChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="Belum ada submission"
        emptyDescription="Data submission siswa akan muncul di sini."
      />

      {/* Review */}
      <ReviewModal
        open={Boolean(selectedReview)}
        data={selectedReview}
        onClose={() => {
          setSelectedReview(undefined);
        }}
        onSave={(id, scores, teacherNote) => {
          console.log("Save review:", {
            id,
            scores,
            teacherNote,
          });

          setSelectedReview(undefined);
        }}
      />

      {/* Detail */}
      <VerificationDetailModal
        open={Boolean(selectedDetail)}
        data={selectedDetail}
        onClose={() => {
          setSelectedDetail(undefined);
        }}
      />
    </>
  );
}
