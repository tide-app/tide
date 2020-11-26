import React from "react";
import { Link } from "react-router-dom";
import { playCircleSharp, timeSharp, downloadSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import PlayButton from "./components/PlayButton";

function format(lengthInSeconds) {
  const addZeroToFrontOf = (number) => `${number < 10 ? "0" : ""}${number}`;
  if (lengthInSeconds < 60) return `00:${addZeroToFrontOf(lengthInSeconds)}`;
  let m = Math.floor(lengthInSeconds / 60);
  const s = lengthInSeconds - m * 60;
  if (m < 60) return `${addZeroToFrontOf(m)}:${addZeroToFrontOf(s)}`;
  const h = Math.floor(m / 60);
  m -= h * 60;
  return `${addZeroToFrontOf(h)}:${addZeroToFrontOf(m)}:${addZeroToFrontOf(s)}`;
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
    <div data-e2e-id="SoundList" className={`text-left ${className}`}>
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
                track.id === selectedTrackId ? "bg-secondary text-primary" : ""
              }`}
            >
              <div
                className={
                  track.id === selectedTrackId
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
                className={`group-hover:opacity-100 sm:hover:opacity-0 w-6/12 md:w-4/12 md:space-2 hidden sm:flex flex-row justify-end items-center ${
                  track.id !== selectedTrackId && "opacity-50"
                }`} // Displays the sound data icons at 50% opacity if they do not belong to the current sound
              >
                <div className="flex justify-start w-4/12 items-center">
                  <IonIcon
                    className="pl-12 pr-2"
                    icon={timeSharp}
                    size="large"
                  />
                  {format(Math.round(track.duration))}
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
