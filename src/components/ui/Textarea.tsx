"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-semibold text-text"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          className={`
            w-full
            min-h-30
            resize-y
            rounded-xl
            border
            bg-surface
            px-4
            py-3
            text-sm
            text-text
            outline-none
            transition
            placeholder:text-description/70

            ${
              error
                ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/10"
                : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
            }

            disabled:cursor-not-allowed
            disabled:bg-gray-100
            disabled:opacity-70

            ${className}
          `}
          {...props}
        />

        {error ? (
          <p className="mt-1.5 text-xs text-danger">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-description">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
