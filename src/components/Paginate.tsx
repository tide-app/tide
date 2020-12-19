import React, { FunctionComponent, useEffect, useState } from "react";

const getPageCount = (
  numberOfResults: number,
  numberOfResultsPerPage: number
): number => Math.ceil(numberOfResults / numberOfResultsPerPage);

interface PaginateProps {
  children: FunctionComponent;
  limit: number;
  onPageClick: (page: number) => void;
  page: number;
  totalResults: number;
}

export default function Paginate({
  children,
  limit,
  onPageClick,
  page,
  totalResults,
}: PaginateProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const numberOfPages: number = getPageCount(totalResults, limit);

  useEffect(() => {
    onPageClick(currentPage);
  }, [currentPage]);

  return (
    <>
      {children}
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          {currentPage !== 1 && (
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-primary hover:text-gray-500"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {currentPage !== numberOfPages && (
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-primary hover:text-gray-500"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium">
                {" "}
                {currentPage * limit - (limit - 1)}{" "}
              </span>
              to
              <span className="font-medium">
                {" " /* Are we on the last page, and... */}
                {currentPage === numberOfPages && totalResults % limit !== 0
                  ? (totalResults % limit) - // does the number of results
                    1 + // per page divide the total number of results evenly?
                    currentPage * limit -
                    (limit - 1)
                  : currentPage * limit}{" "}
              </span>
              of
              <span className="font-medium"> {totalResults} </span>
              results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {currentPage !== 1 && (
                <button // Only show the previous page button if we're not on the first page.
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-primary text-sm font-medium text-gray-500 hover:bg-secondary hover:border-secondary hover:text-primary transition duration-150 ease-in-out"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  {/* <!-- Heroicon name: chevron-left --> */}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setCurrentPage(1)}
                data-e2e-id="first-page-button"
                className={`border duration-150 ease-in-out font-medium hover:bg-secondary hover:border-secondary hover:text-primary inline-flex items-center px-4 py-2 relative text-sm transition ${
                  currentPage === 1 // Are we on the first page? If so, make the lefthand size of
                    ? "bg-secondary border-secondary rounded-l-md text-primary" // the first page's button rounded.
                    : "bg-primary text-secondary"
                }`}
              >
                1
              </button>
              <button
                onClick={() => {
                  setCurrentPage(2);
                }}
                className={`border duration-150 ease-in-out font-medium hover:bg-secondary hover:border-secondary hover:text-primary inline-flex items-center px-4 py-2 relative text-sm transition ${
                  currentPage === 2
                    ? "bg-secondary border-secondary text-primary"
                    : "bg-primary text-secondary"
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`border duration-150 ease-in-out font-medium hover:bg-secondary hover:border-secondary hover:text-primary inline-flex items-center px-4 py-2 relative text-sm transition ${
                  currentPage === 3
                    ? "bg-secondary border-secondary text-primary"
                    : "bg-primary text-secondary"
                }`}
              >
                3
              </button>
              <span
                className={
                  "border duration-150 ease-in-out font-medium hover:bg-secondary hover:border-secondary hover:text-primary inline-flex items-center px-4 py-2 relative text-sm transition bg-primary text-secondary"
                }
              >
                ...
              </span>
              <button
                onClick={() => setCurrentPage(numberOfPages - 2)}
                className={`border duration-150 ease-in-out font-medium hover:bg-secondary hover:border-secondary hover:text-primary inline-flex items-center px-4 py-2 relative text-sm transition ${
                  currentPage === numberOfPages - 2
                    ? "bg-secondary border-secondary text-primary"
                    : "bg-primary text-secondary"
                }`}
              >
                {numberOfPages - 2}
              </button>
              <button
                onClick={() => setCurrentPage(numberOfPages - 1)}
                className={`border duration-150 ease-in-out font-medium hover:bg-secondary hover:border-secondary hover:text-primary inline-flex items-center px-4 py-2 relative text-sm transition ${
                  currentPage === numberOfPages - 1
                    ? "bg-secondary border-secondary text-primary"
                    : "bg-primary text-secondary"
                }`}
              >
                {numberOfPages - 1}
              </button>
              <button
                onClick={() => setCurrentPage(numberOfPages)}
                className={`border duration-150 ease-in-out font-medium hover:bg-secondary hover:border-secondary hover:text-primary inline-flex items-center px-4 py-2 relative text-sm transition ${
                  currentPage === numberOfPages // Are we on the first page? If so, make the righthand size of
                    ? "bg-secondary border-secondary rounded-r-md text-primary" // the last page's button rounded.
                    : "bg-primary text-secondary"
                }`}
              >
                {numberOfPages}
              </button>
              {currentPage !== numberOfPages && (
                <button // Only show the next page button if we're not on the last page.
                  data-e2e-id="next-page-button"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-primary text-sm font-medium text-gray-500 hover:bg-secondary hover:border-secondary hover:text-primary transition duration-150 ease-in-out"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  {/* <!-- Heroicon name: chevron-right --> */}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
