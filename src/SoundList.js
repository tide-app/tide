import React from "react";
import { Link } from "react-router-dom";
import { playCircleSharp, timeSharp, downloadSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

function timeConvert(minutes) {
  const min = Math.floor(Math.abs(minutes));
  const secs = Math.floor((Math.abs(minutes) * 60) % 60);
  return `${(min < 10 ? "0" : "") + min}:${secs < 10 ? "0" : ""}${secs}`;
}

// Psuedo code:
// function highlightSound(track, sound) {
//   let packSoundArr = pack sounds array;
//   let similarSoundArr = similar array;
//   for (i = 0; i<=packSoundArr.length; i++) {
//     for (j=0; j <= similarSoundArr; j++) {
//       if (track.name === sound.name) {
//         keep background color set to secondary color regardless of hover class
//       }
//     }
//   }
// }

const SoundList = ({
  tracks,
  header,
  onSoundClick,
  currentTrackId,
  className = "",
}) => {
  const selectedTrackClassName =
    "group bg-secondary text-primary transition duration-150 ease-in-out border border-solid border-secondary p-2 space-x-2 flex items-center";
  const unSelectedTrackClassName =
    "group hover:bg-secondary hover:text-primary transition duration-150 ease-in-out border border-solid border-secondary p-2 space-x-2 flex items-center";
  const selectedSoundDataClassName =
    "w-6/12 md:w-4/12 md:space-2 hidden sm:flex flex-row justify-end items-center group-hover:opacity-100 sm:hover:opacity-0";
  const unselectedSoundDataClassName =
    "w-6/12 md:w-4/12 md:space-2 hidden sm:flex flex-row justify-end items-center opacity-50 group-hover:opacity-100 sm:hover:opacity-0";

  return (
    <div data-e2e-id="SoundList" className={`text-left ${className}`}>
      {header && <h1 className="text-3xl m-auto py-4">{header}</h1>}
      <div className="list-item-container">
        {tracks.map((track) => (
          <Link
            data-e2e-id="SoundList-track-url"
            key={track.id}
            to={`/sound/${track.id}`}
            onClick={() => (onSoundClick ? onSoundClick(track) : () => {})}
          >
            <div
              className={
                track.id === currentTrackId
                  ? selectedTrackClassName
                  : unSelectedTrackClassName
              }
            >
              <IonIcon
                className={
                  track.id !== currentTrackId &&
                  "opacity-0 group-hover:opacity-100"
                }
                icon={playCircleSharp}
                size="large"
              />
              <div className="flex flex-col flex-grow">
                <span
                  className="overflow-clip"
                  data-e2e-id="SoundList-track-name"
                >
                  {track.name}
                </span>
                <span className="text-left text-xs opacity-50">
                  {track.username}
                </span>
              </div>
              <div
                className={
                  track.id === currentTrackId
                    ? selectedSoundDataClassName
                    : unselectedSoundDataClassName
                }
              >
                <div className="flex justify-start w-4/12 items-center">
                  <IonIcon
                    className="pl-12 pr-2"
                    icon={timeSharp}
                    size="large"
                  />
                  {timeConvert(track.duration)}
                </div>
                <div className="flex justify-start w-4/12 items-center">
                  <IonIcon
                    className="pl-12 pr-2"
                    icon={downloadSharp}
                    size="large"
                  />
                  {track.num_downloads}
                </div>
                <div className="flex justify-start w-4/12 items-center">
                  <IonIcon
                    className="pl-8 pr-2"
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
