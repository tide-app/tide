import { chevronBackSharp, chevronForwardSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import React, { FunctionComponent, useEffect, useState } from "react";

const getPageCount = (
  numberOfResults: number,
  resultsPerPage: number
): number => Math.ceil(numberOfResults / resultsPerPage);

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

  const displayLastResultsNumber = (): string => {
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
              Previous <span className="sr-only">page</span>
            </button>
          )}
          {currentPage !== numberOfPages && (
            <button
              className="ml-3 inline-flex px-4 py-2 border rounded-md"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next <span className="sr-only">page</span>
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
            <span>{displayLastResultsNumber()}</span>
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
                  <span className="sr-only">Previous page</span>
                  <IonIcon className="h-5 w-5" icon={chevronBackSharp} />
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
                {currentPage === 1 ? (
                  <span className="sr-only">You are on page</span>
                ) : (
                  <span className="sr-only">Jump to page</span>
                )}
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
                {currentPage === 2 ? (
                  <span className="sr-only">You are on page</span>
                ) : (
                  <span className="sr-only">Jump to page</span>
                )}
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === 3 &&
                  "bg-secondary border-secondary text-primary"
                }`}
              >
                {currentPage === 3 ? (
                  <span className="sr-only">You are on page</span>
                ) : (
                  <span className="sr-only">Jump to page</span>
                )}
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
                {currentPage === numberOfPages - 2 ? (
                  <span className="sr-only">
                    You are on the third-to-last page, page
                  </span>
                ) : (
                  <span className="sr-only">
                    Jump to the third-to-last page, page
                  </span>
                )}
                {numberOfPages - 2}
              </button>
              <button
                onClick={() => setCurrentPage(numberOfPages - 1)}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === numberOfPages - 1 &&
                  "bg-secondary border-secondary text-primary"
                }`}
              >
                {currentPage === numberOfPages - 1 ? (
                  <span className="sr-only">
                    You are on the second-to-last page, page
                  </span>
                ) : (
                  <span className="sr-only">
                    Jump to the second-to-last page, page
                  </span>
                )}
                {numberOfPages - 1}
              </button>
              <button
                onClick={() => setCurrentPage(numberOfPages)}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === numberOfPages && // If we're on the last page, make the righthand side of
                  "bg-secondary border-secondary rounded-r-md text-primary" // the last page's button rounded.
                }`}
              >
                {currentPage === numberOfPages ? (
                  <span className="sr-only">
                    You are on the last page, page
                  </span>
                ) : (
                  <span className="sr-only">Jump to the last page, page</span>
                )}
                {numberOfPages}
              </button>
              {currentPage !== numberOfPages && (
                <button // Only show the next page button if we're not on the last page.
                  data-e2e-id="next-page-button"
                  className="inline-flex px-2 py-2 rounded-r-md border hover:bg-secondary hover:border-secondary hover:text-primary transition duration-150 ease-in-out"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <span className="sr-only">Next page</span>
                  <IonIcon className="h-5 w-5" icon={chevronForwardSharp} />
                </button>
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
