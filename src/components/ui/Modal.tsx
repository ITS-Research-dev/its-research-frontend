"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          flex
          max-h-[90vh]
          w-full
          flex-col
          overflow-hidden
          rounded-2xl
          bg-surface
          shadow-xl
          ${sizes[size]}
        `}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border p-6">
          <h2 className="text-xl font-semibold text-text">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-description
              transition
              hover:bg-gray-100
              hover:text-text
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="
              flex
              shrink-0
              justify-end
              gap-3
              border-t
              border-border
              bg-surface
              p-6
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
