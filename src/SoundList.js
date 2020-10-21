import React from "react";
import { Link } from "react-router-dom";

const SoundList = ({ tracks, header, selectedTrack, onSoundClick }) => {
  return (
    <div className="text-left px-10 pt-16">
      {header && (
        <h1 className="text-3xl m-auto border-b border-black">{header}</h1>
      )}
      {tracks.map((track) => (
        <Link
          key={track.id}
          to={`/sound/${track.id}`}
          onClick={() => (onSoundClick ? onSoundClick(track) : () => {})}
        >
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
