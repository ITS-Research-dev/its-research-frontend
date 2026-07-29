"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "success"
  | "ghost";

type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;

  size?: Size;

  loading?: boolean;

  fullWidth?: boolean;

  startIcon?: ReactNode;

  endIcon?: ReactNode;

  rounded?: "md" | "lg" | "xl" | "full";
}

export default function Button({
  children,

  variant = "primary",

  size = "md",

  loading = false,

  fullWidth = false,

  startIcon,

  endIcon,

  rounded = "xl",

  disabled,

  className = "",

  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",

    secondary: "bg-secondary text-white hover:bg-secondary-hover",

    outline: "border border-border bg-white text-text hover:bg-gray-50",

    danger: "bg-danger text-white hover:opacity-90",

    success: "bg-success text-white hover:opacity-90",

    ghost: "bg-transparent text-text hover:bg-gray-100",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",

    md: "h-11 px-5",

    lg: "h-14 px-6 text-base",

    icon: "h-11 w-11 p-0",
  };

  const radius = {
    md: "rounded-md",

    lg: "rounded-lg",

    xl: "rounded-xl",

    full: "rounded-full",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        font-semibold

        transition-all

        duration-200

        disabled:cursor-not-allowed

        disabled:opacity-60

        ${variants[variant]}

        ${sizes[size]}

        ${radius[rounded]}

        ${fullWidth ? "w-full" : ""}

        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {startIcon}

          {children}

          {endIcon}
        </>
      )}
    </button>
  );
}
