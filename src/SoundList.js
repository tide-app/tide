import React from "react";
import { Link } from "react-router-dom";

const SoundList = ({ tracks, header, selectedTrack, onSoundClick }) => {
  return (
    <div className="text-left px-10 pt-16">
      {header && <h1 className="text-3xl m-auto">{header}</h1>}
      <div className="list-item-container">
        {tracks.map((track) => (
          <Link
            key={track.id}
            to={`/sound/${track.id}`}
            onClick={() => (onSoundClick ? onSoundClick(track) : () => {})}
          >
            <div
              className={
                track.id === selectedTrack?.id
                  ? "list-item selected"
                  : "list-item"
              }
            >
              <div className="">
                <ion-icon
                  className="inline-flex"
                  id="play-button"
                  name="play-circle-sharp"
                />
                {track.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SoundList;
