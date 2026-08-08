"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface DropdownProps {
  label?: string;

  value?: string;

  placeholder?: string;

  items: DropdownItem[];

  onChange: (value: string) => void;

  className?: string;
}

export default function Dropdown({
  label,
  value,
  placeholder = "Pilih",
  items,
  onChange,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = items.find((item) => item.value === value);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-text">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          h-11
          w-full
          items-center
          justify-between

          rounded-xl

          border
          border-border

          bg-surface

          px-4

          transition

          hover:border-primary
        "
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 text-text">
          {selected?.icon}

          <span className="truncate">{selected?.label ?? placeholder}</span>
        </span>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            z-50
            mt-2
            w-full

            overflow-hidden

            rounded-xl

            border
            border-border

            bg-surface

            shadow-lg
          "
        >
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onChange(item.value);

                setOpen(false);
              }}
              className="
                flex
                w-full
                items-center
                gap-2

                px-4
                py-3

                text-left

                text-text

                transition

                hover:bg-primary/10
              "
            >
              {item.icon}

              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
