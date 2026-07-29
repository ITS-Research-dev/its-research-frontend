"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;

  onChange: (value: string) => void;

  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-description"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-border
          bg-surface
          pl-11
          pr-4
          text-text
          outline-none
          placeholder:text-description
          focus:border-primary
        "
      />
    </div>
  );
}
