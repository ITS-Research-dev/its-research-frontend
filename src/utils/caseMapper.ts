import { CaseCardData, CaseIcon, CaseItem, CaseProgress, CaseStatus } from "@/types/case";

const ICONS: CaseIcon[] = ["book", "code", "brain", "file"];

function getStatus(startDate: string): CaseStatus {
  const start = new Date(startDate);
  const now = new Date();

  const startDay = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (startDay < today) return "completed";
  if (startDay.getTime() === today.getTime()) return "learning";
  return "locked";
}

function getIconById(id: string): CaseIcon {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ICONS[hash % ICONS.length];
}

/**
 * Menghitung persentase progress dari array progresses.
 *
 * Berdasarkan response API /siswa/study-case/:id:
 * - progresses: []           → 0%
 * - progresses: [{ maxCount: 4, progresscount: 2 }] → 50%
 *
 * Jika terdapat lebih dari satu elemen, ambil elemen pertama
 * (sesuai pola data API yang saat ini digunakan backend).
 * Jika semantika berubah, update logika ini sesuai kontrak backend.
 */
function computeProgressFromProgresses(
  progresses: CaseProgress[] | undefined | null,
): { submittedCount: number; totalTest: number } {
  if (!Array.isArray(progresses) || progresses.length === 0) {
    return { submittedCount: 0, totalTest: 0 };
  }

  // Ambil elemen pertama — satu studi kasus satu kelompok progress
  const first = progresses[0];
  const maxCount = Number(first?.maxCount) || 0;
  // API returns camelCase 'progressCount' — lowercase 'progresscount' was a bug
  const progressCount = Number(first?.progressCount) || 0;

  return {
    submittedCount: Math.max(0, progressCount),
    totalTest: Math.max(0, maxCount),
  };
}

export function mapToCaseCardData(item: CaseItem): CaseCardData {
  // Tangani kemungkinan typo 'startoate' dari backend
  const startDate = item.startDate || item.startoate || "";

  const { submittedCount, totalTest } = computeProgressFromProgresses(
    item.progresses,
  );

  return {
    id: item.id,
    title: item.title,
    status: startDate ? getStatus(startDate) : "locked",
    icon: getIconById(item.id),
    href: `/student/case/${item.id}`,
    totalTest: item.totalTest ?? totalTest,
    submittedCount,
    progressMessage: item.progressMessage,
    showProgress: true,
  };
}