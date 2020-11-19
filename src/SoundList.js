import React from "react";
import { Link } from "react-router-dom";
import { playCircleSharp, timeSharp, downloadSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

function timeConvert(minutes) {
  const min = Math.floor(Math.abs(minutes));
  const secs = Math.floor((Math.abs(minutes) * 60) % 60);
  return `${(min < 10 ? "0" : "") + min}:${secs < 10 ? "0" : ""}${secs}`;
}

const SoundList = ({ tracks, header, onSoundClick, className = "" }) => {
  return (
    <div className={`text-left ${className}`}>
      {header && <h1 className="text-3xl m-auto py-4">{header}</h1>}
      <div className="list-item-container">
        {tracks.map((track) => (
          <Link
            key={track.id}
            to={`/sound/${track.id}`}
            onClick={() => (onSoundClick ? onSoundClick(track) : () => {})}
          >
            <div className="group hover:bg-secondary hover:text-primary transition duration-150 ease-in-out border border-solid border-secondary p-3 pr-10 space-x-2 flex items-center">
              <IonIcon
                className="opacity-0 group-hover:opacity-100"
                icon={playCircleSharp}
                size="large"
              />
              <div className="flex flex-col flex-grow">
                <span>{track.name}</span>
                <span className="text-left text-xs opacity-50">
                  {track.username}
                </span>
              </div>
              <div className="w-6/12 md:w-4/12 md:space-2 hidden sm:flex flex-row justify-end items-center opacity-50 group-hover:opacity-100 sm:hover:opacity-0">
                <div className="flex justify-end w-4/12 items-center">
                  <IonIcon className="p-2" icon={timeSharp} size="large" />
                  {timeConvert(track.duration)}
                </div>
                <div className="flex justify-end w-4/12 items-center">
                  <IonIcon className="p-2" icon={downloadSharp} size="large" />
                  {track.num_downloads}
                </div>
                <div className="flex justify-end w-4/12 items-center">
                  <IonIcon
                    className="p-2"
                    icon={playCircleSharp}
                    size="large"
                  />
                  <span className="m-1">{track.num_ratings}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SoundList;
