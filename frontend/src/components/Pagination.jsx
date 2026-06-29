import { memo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = memo(
  ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    loading = false,
    className = "",
  }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      const halfVisible = Math.floor(maxVisible / 2);

      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }

      return pages;
    };

    const handlePageClick = (page) => {
      if (!loading && page !== "..." && page !== currentPage) {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const pages = getPageNumbers();

    return (
      <div
        className={`mb-12 mt-12 flex flex-wrap items-center justify-center gap-2 ${className}`}
      >
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-zinc-400 transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          <FaChevronLeft size={14} />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <div
                  key={`dots-${index}`}
                  className="flex h-10 w-10 items-center justify-center text-zinc-500"
                >
                  ...
                </div>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageClick(page)}
                disabled={loading}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-yellow-500 bg-yellow-500 text-black hover:bg-yellow-400"
                    : "border-white/10 bg-zinc-950 text-zinc-400 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-500"
                } disabled:cursor-not-allowed disabled:opacity-50`}
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-zinc-400 transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
        >
          <FaChevronRight size={14} />
        </button>

        <div className="ml-2 text-sm text-zinc-500 sm:ml-4">
          Page{" "}
          <span className="font-semibold text-yellow-500">{currentPage}</span> of{" "}
          <span className="font-semibold text-yellow-500">{totalPages}</span>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
