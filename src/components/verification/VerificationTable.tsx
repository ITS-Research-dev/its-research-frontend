"use client";

import { useMemo, useState } from "react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DataTable, { DropdownItem } from "@/components/common/DataTable";

import { Eye, RefreshCcw, Search } from "lucide-react";

import { VerificationDetail, VerificationItem } from "@/types/verification";

import { ReviewPayload } from "@/services/verification.service";
import ReviewModal from "./ReviewModal";
import VerificationDetailModal from "./VerificationDetailModal";
import RetryModal from "./RetryModal";
import AlertModal from "@/components/common/AlertModal";

interface Props {
  data: VerificationItem[];
  details: VerificationDetail[];
  onReviewSubmit?: (id: string, payload: ReviewPayload) => Promise<void>;
  onApproveRetry?: (id: string, deadline: string) => Promise<void>;
}

const statusItems: DropdownItem[] = [
  {
    label: "Semua Status",
    value: "all",
  },
  {
    label: "Perlu di verifikasi",
    value: "Perlu di verifikasi",
  },
  {
    label: "Sedang dikerjakan ulang",
    value: "Sedang dikerjakan ulang",
  },
  {
    label: "Selesai dikerjakan Ulang",
    value: "Selesai dikerjakan Ulang",
  },
  {
    label: "Sudah di Verifikasi",
    value: "Sudah di Verifikasi",
  },
];

function statusVariant(status: string) {
  if (status === "Selesai" || status === "Selesai Dikerjakan Ulang")
    return "success";
  if (status === "Sedang dikerjakan ulang") return "warning";
  return "danger";
}

const PAGE_SIZE = 10;

export default function VerificationTable({
  data,
  details,
  onReviewSubmit,
  onApproveRetry,
}: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const [selectedReview, setSelectedReview] = useState<VerificationItem>();
  const [selectedDetail, setSelectedDetail] = useState<VerificationDetail>();
  const [selectedRetry, setSelectedRetry] = useState<VerificationItem>();

  const [alertModal, setAlertModal] = useState<{
    open: boolean;
    type: "success" | "error";
    title: string;
    description: string;
  }>({
    open: false,
    type: "success",
    title: "",
    description: "",
  });

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
        const detail = details.find((d) => d.id === item.id);

        // ── Perlu Verifikasi: Review + opsi Beri Akses Coba Ulang ──
        if (
          item.status === "Perlu di verifikasi" ||
          item.status === "Selesai dikerjakan ulang"
        ) {
          return (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedReview(item)}
              >
                Review
              </Button>
              {/* Guru bisa langsung beri akses coba ulang setelah review */}
              {onApproveRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  startIcon={<RefreshCcw size={14} />}
                  onClick={() => setSelectedRetry(item)}
                >
                  Beri Akses Coba Ulang
                </Button>
              )}
            </div>
          );
        }

        // ── Sedang dikerjakan ulang: hanya Lihat Detail ──
        if (item.status === "Sedang dikerjakan ulang") {
          return (
            <div className="flex items-center gap-2">
              {detail && (
                <Button
                  variant="outline"
                  size="sm"
                  startIcon={<Eye size={16} />}
                  onClick={() => setSelectedDetail(detail)}
                >
                  Lihat Detail
                </Button>
              )}
            </div>
          );
        }

        // ── Selesai / Selesai Dikerjakan Ulang: hanya Lihat Detail ──
        return (
          <div className="flex items-center gap-2">
            {detail && (
              <Button
                variant="outline"
                size="sm"
                startIcon={<Eye size={16} />}
                onClick={() => setSelectedDetail(detail)}
              >
                Lihat Detail
              </Button>
            )}
          </div>
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
        onSave={async (id, scores, teacherNote, decision) => {
          try {
            if (onReviewSubmit) {
              await onReviewSubmit(id, {
                decision,
                scores,
                teacherNote,
              });
            }
            setSelectedReview(undefined);
            setAlertModal({
              open: true,
              type: "success",
              title: "Verifikasi Nilai Berhasil",
              description:
                decision === "terima"
                  ? "Skor AI untuk asesmen ini berhasil diverifikasi dan disimpan."
                  : "Koreksi skor dan catatan untuk asesmen ini berhasil disimpan.",
            });
          } catch (err: unknown) {
            const message =
              (
                err as {
                  response?: { data?: { message?: string } };
                  message?: string;
                }
              )?.response?.data?.message ||
              (err as { message?: string })?.message ||
              "Terjadi kesalahan saat menyimpan verifikasi nilai.";
            setAlertModal({
              open: true,
              type: "error",
              title: "Verifikasi Nilai Gagal",
              description: message,
            });
          }
        }}
      />

      {/* Approve Retry */}
      <RetryModal
        open={Boolean(selectedRetry)}
        data={selectedRetry}
        onClose={() => setSelectedRetry(undefined)}
        onConfirm={async (id, deadline) => {
          if (!onApproveRetry) return;
          await onApproveRetry(id, deadline);
          setAlertModal({
            open: true,
            type: "success",
            title: "Coba Ulang Disetujui",
            description:
              "Siswa kini dapat mengerjakan ulang studi kasus sesuai deadline yang ditetapkan.",
          });
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

      {/* Alert Modal */}
      <AlertModal
        open={alertModal.open}
        title={alertModal.title}
        description={alertModal.description}
        type={alertModal.type}
        buttonText="OK"
        onClose={() =>
          setAlertModal({
            open: false,
            type: "success",
            title: "",
            description: "",
          })
        }
      />
    </>
  );
}
