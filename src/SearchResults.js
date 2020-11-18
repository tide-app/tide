import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLocation } from "react-router-dom";
import SoundList from "./SoundList";
import { SOUND_LIST_QUERY_PARAMS } from "./constants";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search({
  searchValue,
  fetchSearchResults,
  showHeader = false,
}) {
  const [searchResults, setSearchResults] = useState([]);
  const queryParams = useQuery();
  const queryValue = queryParams.get("q");
  const searchQuery = typeof queryValue === "string" ? queryValue : undefined;

  const debouncedSearch = useDebouncedCallback(
    () =>
      fetchSearchResults(searchQuery || searchValue, SOUND_LIST_QUERY_PARAMS),
    300,
    {
      leading: true,
    }
  );

  useEffect(() => {
    const updateSearchResults = async () => {
      if (searchQuery === "") {
        setSearchResults([]);
      } else {
        const query = await debouncedSearch.callback();
        if (query?.results) {
          setSearchResults(query.results);
        }
      }
    };
    if (searchQuery || searchValue) {
      updateSearchResults();
    }
  }, [searchValue, searchQuery]);

  return (
    <SoundList
      header={
        showHeader
          ? `Search results for "${searchQuery || searchValue}"`
          : undefined
      }
      tracks={searchResults}
      className="py-16"
    />
  );
}
