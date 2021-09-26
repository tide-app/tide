import React from "react";
import { Link } from "react-router-dom";
import { starHalfSharp, timeSharp, downloadSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import PlayButton from "./components/PlayButton";

export function formatTime(secs) {
  const hrs = Math.floor(secs / 3600);
  let remainingSecs = secs - 3600 * hrs;
  const mins = Math.floor(remainingSecs / 60);
  remainingSecs -= 60 * mins;
  // Pads a zero in front of a number if it's less than 10
  const padLeft = (num) => `${num < 10 ? "0" : ""}${num}`;
  // e.g., 1 => 01, 9 => 09, 10 => 10, 59 => 59
  return hrs === 0
    ? `${padLeft(mins)}:${padLeft(remainingSecs)}`
    : `${padLeft(hrs)}:${padLeft(mins)}:${padLeft(remainingSecs)}`;
}

const SoundList = ({
  tracks = [],
  header = "",
  onSoundClick = () => {},
  onPlayClick = () => {},
  onPauseClick = () => {},
  selectedTrackId,
  playingTrackId,
  isPlaying,
  className = "",
}) => {
  return (
    <div
      data-e2e-id={header === "Pack" ? "Pack-SoundList" : "SoundList"}
      className={`text-left ${className}`}
    >
      {header && <h1 className="text-3xl m-auto py-4">{header}</h1>}
      <div className="list-item-container">
        {tracks.map((track) => (
          <Link
            data-e2e-id="SoundList-track-url"
            key={track.id}
            to={`/sound/${track.id}`}
            onClick={() => onSoundClick(track)}
          >
            <div
              className={`group transition duration-150 ease-in-out border border-solid border-secondary p-2 space-x-2 flex items-center hover:bg-secondary hover:text-primary ${
                track.id === selectedTrackId || track.id === playingTrackId
                  ? "bg-secondary text-primary"
                  : ""
              }`}
            >
              <div
                className={
                  track.id === selectedTrackId || track.id === playingTrackId
                    ? ""
                    : "opacity-0 group-hover:opacity-100"
                }
              >
                <PlayButton
                  onClick={(e) => {
                    e.preventDefault();
                    if (isPlaying) {
                      onPauseClick(track);
                    } else {
                      onPlayClick(track);
                    }
                  }}
                  isPlaying={track.id === playingTrackId && isPlaying}
                />
              </div>
              <div className="flex flex-col justify-start w-9/12">
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
                className={`group-hover:opacity-100 sm:hover:opacity-0 w-6/12 md:w-5/12 md:space-2 hidden sm:flex flex-row justify-end items-center ${
                  track.id !== selectedTrackId && "opacity-50"
                }`} // Displays the sound data icons at 50% opacity if they do not belong to the current sound
              >
                <div className="flex justify-start w-5/12 lg:w-4/12 items-center">
                  <IonIcon icon={timeSharp} size="large" />
                  <span className="m-1">
                    {formatTime(Math.round(track.duration))}
                  </span>
                </div>
                <div className="flex justify-start w-5/12 lg:w-4/12 items-center">
                  <IonIcon icon={downloadSharp} size="large" />
                  <span className="m-1">{track.num_downloads}</span>
                </div>
                <div className="flex justify-start w-4/12 lg:w-3/12 items-center">
                  <IonIcon icon={starHalfSharp} size="large" />
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
