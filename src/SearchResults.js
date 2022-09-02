import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SOUND_LIST_QUERY_PARAMS } from "./constants";
import SoundListContainer from "./SoundListContainer";
import Paginate from "./components/Paginate.tsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search({
  searchValue,
  fetchSearchResults,
  showHeader = false,
}) {
  const limit = 10;
  const [searchOpts, setSearchOpts] = useState({
    ...SOUND_LIST_QUERY_PARAMS,
    page_size: limit,
  });
  const [numResults, setNumResults] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const queryParams = useQuery();
  const queryValue = queryParams.get("q");
  const searchQuery = typeof queryValue === "string" ? queryValue : undefined;

  const debouncedSearch = useDebouncedCallback(
    () => fetchSearchResults(searchQuery || searchValue, searchOpts),
    300,
    {
      leading: true,
    }
  );

  useEffect(() => {
    const updateSearchResults = async () => {
      // @hack: avoid requests to avoid async set states in react tests
      if (searchQuery === "" || process.env.NODE_ENV === "test") {
        setSearchResults([]);
      } else {
        const query = await debouncedSearch.callback();
        if (query?.results) {
          setNumResults(query.count);
          setSearchResults(query.results);
        }
      }
    };
    if (searchQuery || searchValue) {
      updateSearchResults();
    }
  }, [searchValue, searchOpts, searchQuery]);

  return (
    <>
      {showHeader && (
        <Helmet>
          <title>{`Search results for "${searchQuery || searchValue}"`}</title>
          <meta name="description" content="Search results from Tide" />
        </Helmet>
      )}
      <Paginate
        limit={limit}
        onPageClick={(page) =>
          setSearchOpts((previousSearchOptions) => {
            return {
              ...previousSearchOptions,
              page,
            };
          })
        }
        page={1}
        totalResults={numResults}
      >
        <SoundListContainer
          header={
            showHeader && `Search results for "${searchQuery || searchValue}"`
          }
          tracks={searchResults}
          className="pt-16"
        />
      </Paginate>
    </>
  );
}
