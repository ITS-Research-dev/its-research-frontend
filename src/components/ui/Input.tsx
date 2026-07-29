"use client";

import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  required?: boolean;

  error?: string;

  helperText?: string;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  fullWidth?: boolean;

  containerClassName?: string;

  inputClassName?: string;
}

export default function Input({
  label,
  required = false,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  containerClassName = "",
  inputClassName = "",
  className = "",
  ...props
}: InputProps) {
  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-text">
          {label}

          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      <div
        className={`
          flex
          h-14
          items-center

          rounded-xl

          border

          bg-surface

          px-4

          transition-all

          ${
            error
              ? "border-danger"
              : "border-border focus-within:border-primary"
          }

          ${containerClassName}
        `}
      >
        {leftIcon && (
          <div className="mr-3 flex items-center text-description">
            {leftIcon}
          </div>
        )}

        <input
          className={`
            h-full
            flex-1

            bg-transparent

            text-text

            outline-none

            placeholder:text-description

            disabled:cursor-not-allowed

            disabled:opacity-60

            ${inputClassName}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="ml-3 flex items-center text-description">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1 text-sm text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-description">{helperText}</p>
      ) : null}
    </div>
  );
}
