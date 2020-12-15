import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import SoundListContainer from "./SoundListContainer";
import { SOUND_LIST_QUERY_PARAMS } from "./constants";

function TagsPage({ freeSound, match }) {
  const { tag } = match.params;
  const [soundCollection, setSoundCollection] = useState([]);
  const searchOptions = {
    ...SOUND_LIST_QUERY_PARAMS,
    filter: `tag:${tag}`,
    target: "rhythm.bpm:120",
  };
  useEffect(() => {
    const updateSoundCollection = async () => {
      const soundCollectionResults = await freeSound.combinedSearch(
        searchOptions
      );
      setSoundCollection(soundCollectionResults);
    };
    updateSoundCollection();
  }, []);
  return (
    <SoundListContainer
      header={`#${tag} sounds`}
      tracks={soundCollection.results}
      className="py-16"
    />
  );
}

export default withRouter(TagsPage);
