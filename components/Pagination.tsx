"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
      {currentPage !== 1 && (
        <Link href={handlePageChange(currentPage - 1)}>Zurück</Link>
      )}
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      {currentPage !== totalPages && (
        <Link href={handlePageChange(currentPage + 1)}>Vorwärts</Link>
      )}
    </div>
  );
}
