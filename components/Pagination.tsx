"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="pagination">
      {/* First Page Button */}
      {currentPage !== 1 && (
        <Link
          href={handlePageChange(1)}
          className="pagination__link pagination__link--first"
          aria-label="Erste Seite"
        >
          <HiChevronDoubleLeft />
        </Link>
      )}

      {/* Previous Page Button */}
      {currentPage !== 1 && (
        <Link
          href={handlePageChange(currentPage - 1)}
          className="pagination__link pagination__link--prev"
          aria-label="Vorherige Seite"
        >
          <HiChevronLeft />
        </Link>
      )}

      <span className="pagination__current-page">{`Seite ${currentPage} von ${totalPages}`}</span>

      {/* Next Page Button */}
      {currentPage !== totalPages && (
        <Link
          href={handlePageChange(currentPage + 1)}
          className="pagination__link pagination__link--next"
          aria-label="Nächste Seite"
        >
          <HiChevronRight />
        </Link>
      )}

      {/* Last Page Button */}
      {currentPage !== totalPages && (
        <Link
          href={handlePageChange(totalPages)}
          className="pagination__link pagination__link--last"
          aria-label="Letzte Seite"
        >
          <HiChevronDoubleRight />
        </Link>
      )}
    </div>
  );
}
