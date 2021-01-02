/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* global JSX */ // Recommended fix for eslint `'JSX' is not defined.
import { chevronBackSharp, chevronForwardSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import React, { FunctionComponent, useEffect, useState } from "react";

const getNumPages = (numResults: number, resultsPerPage: number): number =>
  Math.ceil(numResults / resultsPerPage);

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
  const numberOfPages: number = getNumPages(totalResults, limit);

  const displayLastResultsNumber = (): string => {
    if (totalResults === 0) return " 0 ";

    let lastResultsNumber: number = currentPage * limit;
    const firstResultsNumber: number = lastResultsNumber - (limit - 1);
    const leftoverResults: number = totalResults % limit;
    // If the results per page does not evenly divide # results
    if (currentPage === numberOfPages && leftoverResults !== 0)
      lastResultsNumber = firstResultsNumber + leftoverResults - 1;

    return ` ${lastResultsNumber.toString()} `;
  };

  const displayRemainingPageButtons = (): Array<JSX.Element> => {
    if (numberOfPages < 3) return [];
    // First, last pages always present, so only continue if # pgs > 2
    const buttonForPageNumber = (pageNumber: number): JSX.Element => (
      <button
        className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
          currentPage === pageNumber &&
          "bg-secondary border-secondary text-primary"
        }`}
        onClick={() => setCurrentPage(pageNumber)}
      >
        {currentPage === pageNumber ? (
          <span className="sr-only">You are on page</span>
        ) : (
          <span className="sr-only">Jump to page</span>
        )}
        {pageNumber}
      </button>
    );

    const ELLIPSIS: JSX.Element = (
      <span className={"border inline-flex px-4 py-2"}>...</span>
    );
    // First, ..., prev, current, next, ..., last
    const MAX_NUMBER_OF_PAGE_BUTTONS: number = 7;
    const NUMBER_OF_ALWAYS_PRESENT_PAGE_BUTTONS: number = 3;
    const remainingPageButtons: Array<JSX.Element> = [];

    if (numberOfPages <= MAX_NUMBER_OF_PAGE_BUTTONS) {
      for (let index = 2; index < numberOfPages; index++)
        remainingPageButtons.push(buttonForPageNumber(index));
      // If we're in this case, we can fit every page's button
      return remainingPageButtons;
    }
    // If we can't fit every button and are on the first few pages, then
    if (
      currentPage <=
      MAX_NUMBER_OF_PAGE_BUTTONS - NUMBER_OF_ALWAYS_PRESENT_PAGE_BUTTONS
    ) {
      for (let index = 2; index < MAX_NUMBER_OF_PAGE_BUTTONS - 1; index++)
        remainingPageButtons.push(buttonForPageNumber(index));

      remainingPageButtons.push(ELLIPSIS);
      return remainingPageButtons;
    }
    // If we can't fit every page button and are somewhere in the middle, then
    if (currentPage < numberOfPages - NUMBER_OF_ALWAYS_PRESENT_PAGE_BUTTONS) {
      remainingPageButtons.push(ELLIPSIS);
      remainingPageButtons.push(buttonForPageNumber(currentPage - 1));
      remainingPageButtons.push(buttonForPageNumber(currentPage));
      remainingPageButtons.push(buttonForPageNumber(currentPage + 1));
      remainingPageButtons.push(ELLIPSIS);
      // Then, we can exit because we always show first and last pages
      return remainingPageButtons;
    }
    // If here, we're on last few pages.
    remainingPageButtons.push(ELLIPSIS);
    for (
      let index = numberOfPages - NUMBER_OF_ALWAYS_PRESENT_PAGE_BUTTONS - 1;
      index < numberOfPages;
      index++
    )
      remainingPageButtons.push(buttonForPageNumber(index));
    // Stop before last page, because that is always present
    return remainingPageButtons;
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
              {/* Only show previous page button if not on first page */}
              {currentPage !== 1 && (
                <button
                  className="inline-flex px-2 py-2 rounded-l-md border hover:bg-secondary hover:border-secondary hover:text-primary transition duration-150 ease-in-out"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <span className="sr-only">Previous page</span>
                  <IonIcon className="h-5 w-5" icon={chevronBackSharp} />
                </button>
              )}
              {/* If on first page, give first page button special styling */}
              <button
                onClick={() => setCurrentPage(1)}
                data-e2e-id="first-page-button"
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === 1 &&
                  "bg-secondary border-secondary rounded-l-md text-primary"
                }`}
              >
                {currentPage === 1 ? (
                  <span className="sr-only">You are on page</span>
                ) : (
                  <span className="sr-only">Jump to page</span>
                )}
                1
              </button>
              {displayRemainingPageButtons()}
              {/* If on last page, give last page button special styling */}
              <button
                onClick={() => setCurrentPage(numberOfPages)}
                className={`border duration-150 ease-in-out hover:bg-secondary hover:border-secondary hover:text-primary inline-flex px-4 py-2 transition ${
                  currentPage === numberOfPages &&
                  "bg-secondary border-secondary rounded-r-md text-primary"
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
              {/* Only show next page button if not on last page */}
              {currentPage !== numberOfPages && (
                <button
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
