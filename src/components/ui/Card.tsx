import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerRight?: ReactNode;
  footer?: ReactNode;

  children: ReactNode;
}

export default function Card({
  title,
  subtitle,
  headerRight,
  footer,
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-border
        bg-surface
        shadow-sm
        transition-all
        hover:shadow-md

        ${className}
      `}
      {...props}
    >
      {(title || subtitle || headerRight) && (
        <div className="flex items-start justify-between border-b border-border p-6">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-text">{title}</h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-description">{subtitle}</p>
            )}
          </div>

          {headerRight}
        </div>
      )}

      <div className="p-6">{children}</div>

      {footer && <div className="border-t border-border p-6">{footer}</div>}
    </div>
  );
}
