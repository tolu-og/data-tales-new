"use client";
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  pageSize?: number;
  basePath?: string;
};

export default function Pagination({
  currentPage,
  totalCount,
  pageSize = 5,
  basePath = "/p",
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i += 1) pages.push(i);

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <Link
        href={`${basePath}/${prevPage}`}
        className={`px-3 py-1 rounded border ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
        aria-disabled={currentPage === 1}
      >
        Prev
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}/${p}`}
          className={`px-3 py-1 rounded border ${
            p === currentPage ? "bg-pink-600 text-white border-pink-600" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </Link>
      ))}

      <Link
        href={`${basePath}/${nextPage}`}
        className={`px-3 py-1 rounded border ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Link>
    </nav>
  );
}


