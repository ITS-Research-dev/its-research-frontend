import { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";

  children: ReactNode;
}

export default function Badge({
  variant = "primary",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const variants = {
    primary: "bg-primary/10 text-primary",

    secondary: "bg-secondary/10 text-secondary",

    success: "bg-success-bg text-success-text",

    warning: "bg-warning-bg text-warning-text",

    danger: "bg-danger-bg text-danger-text",

    info: "bg-info-bg text-info-text",
  };

  return (
    <span
      className={`
        inline-flex
        items-center

        rounded-full

        px-3

        py-1

        text-xs

        font-semibold

        ${variants[variant]}

        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}
