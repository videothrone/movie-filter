"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import type { MouseEvent } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";

type FilterLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  label: string;
  type: string;
  checked?: boolean;
  disabled: boolean;
  onClick?: () => void;
  groupName: string;
  onActivate: (groupName: string, label: string) => void;
};

export default function FilterLink({
  children,
  onClick,
  groupName,
  onActivate,
  checked,
  ...props
}: FilterLinkProps) {
  const isReset = props.label === "Zurücksetzen";
  const hasInput = props.type !== "sorting" && !isReset;

  const linkClassName = `filter-link ${checked ? "filter-link--active" : ""} ${
    isReset ? "filter-link--reset" : ""
  } ${hasInput ? "filter-link--with-input" : "filter-link--without-input"}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!props.disabled) {
      onClick && onClick();
    }
  };

  return (
    <Link className={linkClassName} {...props} onClick={handleClick}>
      {props.type === "sorting" || isReset ? (
        isReset ? (
          <>
            <FaArrowRotateLeft />
            {props.label}
          </>
        ) : (
          props.label
        )
      ) : (
        <>
          <input
            type="checkbox"
            className="filter-link__checkbox"
            checked={checked}
            readOnly
          />
          <span className="filter-link__label">{props.label}</span>
        </>
      )}
    </Link>
  );
}
