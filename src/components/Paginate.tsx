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

  const displayLastResultsNumberProperly = (): string => {
    if (totalResults === 0) return " 0 ";

    let lastResultsNumber: number = currentPage * limit;
    const firstResultsNumber: number = lastResultsNumber - (limit - 1);
    const leftoverResults: number = totalResults % limit;
    // If the results per page does not evenly divide totalResults...
    if (currentPage === numberOfPages && leftoverResults !== 0)
      lastResultsNumber = firstResultsNumber + leftoverResults - 1;

    return ` ${lastResultsNumber.toString()} `;
  };

  useEffect(() => {
    onPageClick(currentPage);
  }, [currentPage]);

  return (
    <>
      {children}
      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <div className="px-4 py-3 flex justify-between sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          {currentPage === 1 ? (
            <span></span>
          ) : (
            <button
              className="inline-flex px-4 py-2 border rounded-md"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {currentPage !== numberOfPages && (
            <button
              className="ml-3 inline-flex px-4 py-2 border rounded-md"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:justify-between">
          <p className="text-sm">
            Showing
            <span>
              {" "}
              {totalResults === 0
                ? "0"
                : currentPage * limit - (limit - 1)}{" "}
            </span>
            to
            <span>{displayLastResultsNumberProperly()}</span>
            of
            <span> {totalResults} </span>
            {totalResults === 1 ? "result" : "results"}
          </p>
          {numberOfPages > 1 && (
            <nav
              className="z-0 inline-flex shadow-sm -space-x-px text-sm"
              aria-label="Pagination"
            >
              {currentPage !== 1 && (
                <button // Only show the previous page button if we're not on the first page.
                  className="inline-flex px-2 py-2 rounded-l-md border hover:bg-secondary hover:border-secondary hover:text-primary transition duration-150 ease-in-out"
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
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === 1 && // If we're on the first page, make the lefthand side of
                  "bg-secondary border-secondary rounded-l-md text-primary" // the first page's button rounded.
                }`}
              >
                1
              </button>
              <button
                onClick={() => {
                  setCurrentPage(2);
                }}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === 2 &&
                  "bg-secondary border-secondary text-primary"
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === 3 &&
                  "bg-secondary border-secondary text-primary"
                }`}
              >
                3
              </button>
              <span className={"border inline-flex px-4 py-2"}>...</span>
              <button
                onClick={() => setCurrentPage(numberOfPages - 2)}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === numberOfPages - 2 &&
                  "bg-secondary border-secondary text-primary"
                }`}
              >
                {numberOfPages - 2}
              </button>
              <button
                onClick={() => setCurrentPage(numberOfPages - 1)}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === numberOfPages - 1 &&
                  "bg-secondary border-secondary text-primary"
                }`}
              >
                {numberOfPages - 1}
              </button>
              <button
                onClick={() => setCurrentPage(numberOfPages)}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === numberOfPages && // If we're on the last page, make the righthand side of
                  "bg-secondary border-secondary rounded-r-md text-primary" // the last page's button rounded.
                }`}
              >
                {numberOfPages}
              </button>
              {currentPage !== numberOfPages && (
                <button // Only show the next page button if we're not on the last page.
                  data-e2e-id="next-page-button"
                  className="inline-flex px-2 py-2 rounded-r-md border hover:bg-secondary hover:border-secondary hover:text-primary transition duration-150 ease-in-out"
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
          )}
        </div>
      </div>
    </>
  );
}
