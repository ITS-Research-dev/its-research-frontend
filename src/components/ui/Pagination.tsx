import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  page: number;

  totalPages: number;

  onChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Window 5 halaman di sekitar current
  let windowStart = Math.max(1, current - 2);
  let windowEnd = Math.min(total, current + 2);

  // Geser window agar selalu ada 5 halaman jika memungkinkan
  if (windowEnd - windowStart < 4) {
    if (windowStart === 1) windowEnd = Math.min(total, windowStart + 4);
    else windowStart = Math.max(1, windowEnd - 4);
  }

  // Halaman 1
  if (windowStart > 1) {
    pages.push(1);
    // Hanya tambah "..." jika ada celah lebih dari 1 halaman setelah angka 1
    if (windowStart > 2) pages.push("...");
  }

  // Window utama
  for (let i = windowStart; i <= windowEnd; i++) {
    pages.push(i);
  }

  // Halaman terakhir
  if (windowEnd < total) {
    // Hanya tambah "..." jika ada celah lebih dari 1 halaman sebelum angka terakhir
    if (windowEnd < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="rounded-lg border border-border p-2 disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>

      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-10 w-10 items-center justify-center text-text/50"
          >
            <MoreHorizontal size={18} />
          </span>
        ) : (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`
                h-10
                w-10
                rounded-lg

                ${
                  num === page
                    ? "bg-primary text-white"
                    : "border border-border hover:bg-gray-100"
                }
            `}
          >
            {num}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="rounded-lg border border-border p-2 disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
