import { FC } from "react";

import { clsx } from "clsx";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  showEllipsis?: boolean;
  disabled?: boolean;
}

export const PaginationBlock: FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
  showEllipsis = true,
  disabled = false,
}) => {
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxPagesToShow = 5;
    const boundaryPages = 1;

    if (totalPages > 0) {
      pages.push(1);
    }

    if (totalPages <= maxPagesToShow + boundaryPages) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const numMiddlePages = maxPagesToShow - 2 * boundaryPages;
      let startMiddle = Math.max(2, currentPage - Math.floor(numMiddlePages / 2));
      let endMiddle = Math.min(totalPages - 1, currentPage + Math.ceil(numMiddlePages / 2) - 1);

      if (startMiddle <= boundaryPages + 1) {
        startMiddle = 2;
        endMiddle = maxPagesToShow;
      } else if (endMiddle >= totalPages - boundaryPages) {
        endMiddle = totalPages - 1;
        startMiddle = totalPages - maxPagesToShow + 1;
      }

      startMiddle = Math.max(2, startMiddle);
      endMiddle = Math.min(totalPages - 1, endMiddle);

      if (showEllipsis && startMiddle > 2) {
        pages.push("ellipsis");
      }

      for (let i = startMiddle; i <= endMiddle; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (showEllipsis && endMiddle < totalPages - 1) {
        pages.push("ellipsis");
      }

      if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    const uniqueSortedPages = Array.from(new Set(pages)).sort((a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }
      return 0;
    });

    const finalResult: (number | "ellipsis")[] = [];
    uniqueSortedPages.forEach((page, index) => {
      if (index > 0) {
        const prevPage = uniqueSortedPages[index - 1];
        if (typeof page === "number" && typeof prevPage === "number" && page - prevPage > 1) {
          finalResult.push("ellipsis");
        }
      }
      finalResult.push(page);
    });

    return finalResult;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number) => {
    if (!disabled && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (!disabled && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!disabled && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const SPRITE_PATH = "/icons/sprite.svg";

  return (
    <Pagination className={clsx(disabled && "opacity-50 pointer-events-none")}>
      <PaginationContent className="flex items-center">
        {!isFirstPage && (
          <PaginationItem className="mr-6">
            {" "}
            <PaginationPrevious
              onClick={handlePrevClick}
              className={clsx(
                "w-[50px] h-[50px] rounded-[8px]",
                "bg-secondary-50 text-secondary-500",
                "flex items-center justify-center p-0",
                "transition-colors duration-200",
                disabled || currentPage === 1
                  ? "pointer-events-none text-gray-400"
                  : "cursor-pointer hover:bg-secondary-100"
              )}
            >
              <span className="sr-only">Previous</span>
              <svg className="w-[30px] h-[30px] rotate-[-90deg]" fill="currentColor" aria-hidden="true">
                <use href={`${SPRITE_PATH}#icon-arrow-right`} />
              </svg>
            </PaginationPrevious>
          </PaginationItem>
        )}

        {pageNumbers.map((page, index) => (
          <PaginationItem
            key={index}
            className={clsx(
              typeof page === "number" &&
                index < pageNumbers.length - 1 &&
                pageNumbers[index + 1] !== "ellipsis" &&
                "mr-4",
              typeof page === "number" && pageNumbers[index + 1] === "ellipsis" && "mr-8",
              page === "ellipsis" &&
                index < pageNumbers.length - 1 &&
                typeof pageNumbers[index + 1] === "number" &&
                "mr-8"
            )}
          >
            {page === "ellipsis" ? (
              <PaginationEllipsis
                className={clsx("w-[26px] h-[30px] flex items-center justify-center", "text-secondary-500")}
              >
                <svg className="w-[26px] h-[30px]" fill="currentColor" aria-hidden="true">
                  <use href={`${SPRITE_PATH}#icon-dots`} />
                </svg>
              </PaginationEllipsis>
            ) : (
              <PaginationLink
                onClick={() => handlePageClick(page)}
                isActive={page === currentPage}
                className={clsx(
                  "w-[60px] h-[60px] rounded-[8px]",
                  "flex items-center justify-center font-btn",
                  "p-[10px_20px]",
                  "border-none",
                  "transition-colors duration-200",
                  disabled
                    ? "pointer-events-none text-gray-400 bg-gray-100"
                    : page === currentPage
                      ? "bg-secondary-500 text-secondary-50"
                      : "bg-secondary-50 text-secondary-500 hover:bg-secondary-100"
                )}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {!isLastPage && (
          <PaginationItem className="ml-6">
            {" "}
            <PaginationNext
              onClick={handleNextClick}
              className={clsx(
                "w-[50px] h-[50px] rounded-[8px]",
                "bg-secondary-50 text-secondary-500",
                "flex items-center justify-center p-0",
                "transition-colors duration-200",
                disabled || currentPage === totalPages
                  ? "pointer-events-none text-gray-400"
                  : "cursor-pointer hover:bg-secondary-100"
              )}
            >
              <span className="sr-only">Next</span>
              <svg className="w-[30px] h-[30px] rotate-90" fill="currentColor" aria-hidden="true">
                <use href={`${SPRITE_PATH}#icon-arrow-right`} />
              </svg>
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
