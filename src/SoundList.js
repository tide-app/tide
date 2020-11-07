import React from "react";
import { Link } from "react-router-dom";
import { playCircleSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

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
              <div>
                <IonIcon icon={playCircleSharp} id="play-button" />
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
