"use client";

import { Info, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface InfoTooltipProps {
  content: React.ReactNode;
  title?: string;
  size?: number;
  position?: "top" | "bottom" | "left" | "right";
}

export default function InfoTooltip({
  content,
  title,
  size = 16,
  position = "bottom",
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setMounted(false);
    setTimeout(() => setOpen(false), 150); // wait for exit animation
  }, []);

  const toggle = () => {
    if (open) {
      close();
    } else {
      setOpen(true);
      setTimeout(() => setMounted(true), 10); // trigger enter animation
    }
  };

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, close]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  // Caret (arrow) pointing from popup toward trigger
  const caretClasses: Record<string, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-border",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-border",
    left: "left-full top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-border",
    right:
      "right-full top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-border",
  };

  const animationBase = "transition-all duration-150 ease-out";
  const animationEnter = mounted
    ? "opacity-100 scale-100 translate-y-0"
    : "opacity-0 scale-95 translate-y-1";

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={toggle}
        className={`rounded-full p-0.5 text-description transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
          open ? "text-primary" : ""
        }`}
        aria-label="Informasi cara membaca grafik"
        aria-expanded={open}
        aria-haspopup="dialog"
        type="button"
      >
        <Info size={size} />
      </button>

      {/* Popup Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={title ?? "Informasi grafik"}
          className={`absolute z-50 w-72 max-w-[calc(100vw-2rem)] rounded-2xl bg-white border border-border bg-card shadow-xl ${positionClasses[position]} ${animationBase} ${animationEnter}`}
        >
          {/* Caret */}
          <span
            className={`pointer-events-none absolute h-0 w-0 ${caretClasses[position]}`}
          />

          {/* Header */}
          {title && (
            <>
              <div className="flex items-center justify-between px-4 pt-4">
                <div className="flex items-center gap-1.5">
                  <Info size={14} className="shrink-0 text-primary" />
                  <p className="text-sm font-semibold text-text">{title}</p>
                </div>
                <button
                  onClick={close}
                  className="rounded-md p-0.5 text-description transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Tutup"
                  type="button"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="mx-4 my-3 border-t border-border" />
            </>
          )}

          {/* Content */}
          <div
            className={`text-sm leading-relaxed text-description ${title ? "px-4 pb-4" : "p-4"}`}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
