import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useLocation } from "react-router-dom";
import SoundList from "./SoundList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search({ searchValue, fetchSearchResults }) {
  const [searchResults, setSearchResults] = useState([]);
  const queryParams = useQuery();
  const searchQuery = queryParams.get("q");

  const debouncedSearch = useDebouncedCallback(
    () => fetchSearchResults(searchQuery || searchValue),
    300,
    {
      leading: true,
    }
  );

  useEffect(() => {
    const updateSearchResults = async () => {
      const query = await debouncedSearch.callback();
      if (query?.results) {
        setSearchResults(query.results);
      }
    };
    if (searchValue || searchValue) {
      updateSearchResults();
    }
  }, [searchValue]);

  return <SoundList tracks={searchResults} />;
}
