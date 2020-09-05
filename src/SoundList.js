import React from "react";
import { Link } from "react-router-dom";

const SoundList = ({ tracks, header, selectedTrack }) => {
  return (
    <div className="playlist">
      {header && <h1>{header}</h1>}
      {tracks.map((track) => (
        <Link key={track.id} to={`/sound/${track.id}`}>
          <div
            className={
              track.id === selectedTrack?.id
                ? "playlist-item selected"
                : "playlist-item"
            }
          >
            {track.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SoundList;
