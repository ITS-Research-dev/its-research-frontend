"use client";

import { ReactNode } from "react";

import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";

import SearchInput from "./SearchInput";
import Loading from "./Loading";
import EmptyState from "./EmptyState";

interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];

  data: T[];

  loading?: boolean;

  searchValue?: string;

  onSearch?: (value: string) => void;

  action?: ReactNode;

  page?: number;

  totalPages?: number;

  onPageChange?: (page: number) => void;

  emptyTitle?: string;

  emptyDescription?: string;
}

export default function DataTable<T>({
  columns,
  data,

  loading = false,

  searchValue,

  onSearch,

  action,

  page,

  totalPages,

  onPageChange,

  emptyTitle = "Belum ada data",

  emptyDescription = "Data masih kosong.",
}: DataTableProps<T>) {
  return (
    <div className="space-y-6">
      {/* Toolbar */}

      {(onSearch || action) && (
        <div className="flex items-center justify-between gap-4">
          {onSearch ? (
            <SearchInput value={searchValue ?? ""} onChange={onSearch} />
          ) : (
            <div />
          )}

          {action}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          <Table columns={columns} data={data} />

          {page && totalPages && onPageChange && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
