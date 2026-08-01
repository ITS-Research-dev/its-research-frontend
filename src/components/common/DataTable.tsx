"use client";

import { ReactNode } from "react";

import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Dropdown from "@/components/ui/DropDown";

import SearchInput from "./SearchInput";
import EmptyState from "./EmptyState";
import TableLoading from "./TableLoading";

interface Column<T> {
  header: string;

  render: (row: T) => ReactNode;
}

interface DropdownItem {
  label: string;

  value: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];

  data: T[];

  loading?: boolean;

  searchValue?: string;

  onSearch?: (value: string) => void;

  dropdownValue?: string;

  dropdownItems?: DropdownItem[];

  dropdownPlaceholder?: string;

  onDropdownChange?: (value: string) => void;

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

  dropdownValue,
  dropdownItems,
  dropdownPlaceholder,
  onDropdownChange,

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
      {(onSearch || dropdownItems || action) && (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {onSearch && (
              <SearchInput value={searchValue ?? ""} onChange={onSearch} />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {dropdownItems && onDropdownChange && (
              <div className="w-full md:w-60">
                <Dropdown
                  value={dropdownValue}
                  items={dropdownItems}
                  placeholder={dropdownPlaceholder ?? "Pilih"}
                  onChange={onDropdownChange}
                />
              </div>
            )}

            {action && <div className="flex justify-end">{action}</div>}
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <TableLoading />
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
