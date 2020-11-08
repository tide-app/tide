import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SoundList from "./SoundList";

export default function Search({ searchValue, fetchSearchResults }) {
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearch = useDebouncedCallback(
    () => fetchSearchResults(searchValue),
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
    if (searchValue) {
      updateSearchResults();
    }
  }, [searchValue]);

  return <SoundList tracks={searchResults} />;
}
