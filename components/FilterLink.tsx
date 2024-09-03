import Link from "next/link";
import type { ReactNode } from "react";

type FilterLinkProps = {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  ariaLabel?: string;
};

export default function FilterLink({
  href,
  children,
  isActive,
  ariaLabel,
}: FilterLinkProps) {
  return (
    <Link
      href={href}
      className={`filter-link ${isActive ? "filter-link--active" : ""}`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
