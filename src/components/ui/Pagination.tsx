import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;

  totalPages: number;

  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="rounded-lg border border-border p-2 disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const current = index + 1;

        return (
          <button
            key={current}
            onClick={() => onChange(current)}
            className={`
                h-10
                w-10
                rounded-lg

                ${
                  current === page
                    ? "bg-primary text-white"
                    : "border border-border hover:bg-gray-100"
                }
            `}
          >
            {current}
          </button>
        );
      })}

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
