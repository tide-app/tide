import React, { useEffect, useState } from "react";
import SoundList from "./SoundList";

export default function Search({ freeSound, searchValue }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchValue) {
      const fetchSearchResults = async () => {
        const { results } = await freeSound.textSearch(searchValue);
        if (results) {
          setSearchResults(results);
        }
      };
      fetchSearchResults();
    }
  });

  return <SoundList tracks={searchResults} />;
}
