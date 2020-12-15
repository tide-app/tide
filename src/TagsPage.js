import React from "react";
import { withRouter } from "react-router-dom";
import SoundListContainer from "./SoundListContainer";

function TagsPage({ match }) {
  const { tag } = match.params;
  return (
    <SoundListContainer
      header={`#${tag} sounds`}
      tracks={[]}
      className="py-16"
    />
  );
}

export default withRouter(TagsPage);
