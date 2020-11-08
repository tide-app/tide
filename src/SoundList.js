import React from "react";
import { Link } from "react-router-dom";
import { playCircleSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const SoundList = ({ tracks, header, onSoundClick }) => {
  return (
    <div className="text-left pb-16">
      {header && <h1 className="text-3xl m-auto py-4">{header}</h1>}
      <div className="list-item-container">
        {tracks.map((track) => (
          <Link
            key={track.id}
            to={`/sound/${track.id}`}
            onClick={() => (onSoundClick ? onSoundClick(track) : () => {})}
          >
            <div className="hover:bg-secondary hover:text-primary transition duration-200 ease-in-out border border-solid border-secondary p-3 space-x-2 flex items-center">
              <IonIcon icon={playCircleSharp} id="play-button" />
              <a>{track.name}</a>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SoundList;
