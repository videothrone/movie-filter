"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";

type FilterLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  label: string;
};

export default function FilterLink({ children, ...props }: FilterLinkProps) {
  const isReset = props.label === "Zurücksetzen";

  const searchParams = useSearchParams();
  const linkParams = new URLSearchParams(props.href.split("?")[1] || "");

  // Check whether all link parameters are present in the current search params, maybe too convoluted?
  const isActive =
    Array.from(linkParams.entries()).every(([key, value]) => {
      return searchParams.get(key) === value;
    }) &&
    Array.from(searchParams.entries()).every(([key]) => {
      return linkParams.has(key);
    });

  return (
    <Link
      className={`filter-link ${isActive ? "filter-link--active" : ""} ${
        isReset ? "filter-link--reset" : ""
      }`}
      {...props}
    >
      {isReset ? (
        <>
          <FaArrowRotateLeft /> {props.label}
        </>
      ) : (
        props.label
      )}
    </Link>
  );
}
