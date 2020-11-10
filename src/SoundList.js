import React from "react";
import { Link } from "react-router-dom";
import { playCircleSharp, timeSharp, downloadSharp } from "ionicons/icons";
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
            <div className="hover:bg-secondary hover:text-primary transition duration-150 ease-in-out border border-solid border-secondary p-3 pr-24 space-x-2 flex items-center">
              <IonIcon
                className="opacity-0 hover:opacity-100"
                icon={playCircleSharp}
                size="large"
              />
              <span className="flex-grow">{track.name}</span>
              <div className="flex justify-end items-center space-x-24 mr-24 opacity-50 hover:opacity-100">
                <IonIcon icon={timeSharp} size="large" />
                <IonIcon icon={downloadSharp} size="large" />
                <IonIcon icon={playCircleSharp} size="large" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SoundList;
