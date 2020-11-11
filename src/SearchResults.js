import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLocation } from "react-router-dom";
// import { search } from "ionicons/icons";
import SoundList from "./SoundList";

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
    () => fetchSearchResults(searchQuery || searchValue),
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
    />
  );
}
