import React from "react";
import { Link } from "react-router-dom";

const SoundList = ({ tracks, header, selectedTrack }) => {
  return (
    <div className="playlist">
<<<<<<< Updated upstream
      {header && <h1 id="header">{header}</h1>}
      {tracks.map((track) => (
        <Link key={track.id} to={`/sound/${track.id}`}>
=======
      {header && (
        <h1 className="text-left text-3xl m-auto pt-16 pb-4">{header}</h1>
      )}
      {tracks.map((track) => (
        <Link
          key={track.id}
          to={`/sound/${track.id}`}
          onClick={() => (onSoundClick ? onSoundClick(track) : () => {})}
        >
>>>>>>> Stashed changes
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
