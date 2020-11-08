import {
  caretDownOutline,
  cropSharp,
  downloadSharp,
  pauseCircleSharp,
  playCircleSharp,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useParams } from "react-router-dom";
import localForage from "localforage";
import React, { useEffect, useState } from "react";
import tinykeys from "tinykeys";
import Waveform from "react-wavesurfer.js";
import SoundList from "./SoundList";

// key examples: sound.<soundId>.full
// key examples: sound.<soundId>.preview
// key examples: api.search
// key examples: api.sound.similar
const memoizeGetSound = async (sound, cacheKey) => {
  const soundBuffer = await localForage.getItem(cacheKey);
  if (soundBuffer) return soundBuffer;
  const newSoundBuffer = await sound.download().then((res) => res.blob());
  await localForage.setItem(cacheKey, newSoundBuffer);
  return newSoundBuffer;
};

const downloadSound = async (soundObject) => {
  const cacheKey = `sound.${soundObject.id}.full`;
  const blob = await memoizeGetSound(soundObject, cacheKey);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${soundObject.name}.${soundObject.type}`;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke the url to free up memory
  URL.revokeObjectURL(url);
};

export default function Sound(props) {
  const { isLoggedIn, freeSound } = props;
  const [sound, setSound] = useState({});
  const [packSounds, setPackSounds] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [similarSounds, setSimilarSounds] = useState([]);
  // 0 => loading
  // 1 => loading succeeded
  // 2 => loading failed
  const [loadingState, setLoadingState] = useState(0);
  const { id } = useParams();

  const handlePlayingAndPausing = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const fetchSound = async () => {
      try {
        setLoadingState(0);
        const soundResult = await freeSound.getSound(id);
        if (soundResult.detail) throw new Error(soundResult.detail);
        setSound(soundResult);
        if (soundResult.pack) {
          // @TODO @HACK: Remove this, extract this logic to the freesound-client library
          const packId = new URL(soundResult.pack).pathname
            .split("/")
            .find(Number);
          const packsObj = await freeSound.getPack(packId);
          const packSoundsList = await packsObj.sounds();
          if (packSoundsList.results) {
            setPackSounds(packSoundsList.results);
          }
        }
        const {
          results: similarSoundsResults,
        } = await soundResult.getSimilar();
        if (similarSoundsResults) {
          setSimilarSounds(similarSoundsResults);
        }
        setLoadingState(1);
      } catch (e) {
        // eslint-disable-next-line no-console
        setLoadingState(2);
      }
    };
    fetchSound();
  }, [id, freeSound]);
  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      Space: (event) => {
        // Shortcuts should only work
        if (document.activeElement === document.body) {
          event.preventDefault(); // if we're on the main
          setIsPlaying((i) => !i); // section of the app,
        } // and not if, say, we are searching for a sound.
      },
      d: () => {
        // As stated above, shortcuts should only work
        if (isLoggedIn && document.activeElement === document.body)
          downloadSound(sound); // when on the main section of the
      }, // app, and not, for example, while searching.
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <>
      <h1 className="text-5xl mb-4 text-left">{sound.name}</h1>
      <div className="py-4 text-left mb-4 opacity-50">
        {sound.tags?.map((e) => (
          <div
            key={e}
            className="inline-block px-3 rounded mr-4 mb-4 border border-solid border-secondary"
          >
            {e}
          </div>
        ))}
      </div>
      {sound.previews && (
        <>
          <Waveform
            waveColor="#FBDC57"
            progressColor="transparent"
            backgroundColor="black"
            barWidth={1}
            cursorColor="var(--secondary-color)"
            cursorWidth={2}
            onFinish={() => setIsPlaying(false)}
            playing={isPlaying}
            src={sound.previews["preview-lq-mp3"]}
          />
          {loadingState === 2 && <h1>404</h1>}
          <div className="flex justfify-between py-3">
            {/* Download and edit buttons */}
            <div className="w-6/12 space-x-3">
              <IonIcon size="large" icon={downloadSharp} />
              <button
                onClick={handlePlayingAndPausing}
                className="focus:outline-none"
              >
                {isPlaying ? (
                  <IonIcon size="large" icon={pauseCircleSharp} />
                ) : (
                  <IonIcon size="large" icon={playCircleSharp} />
                )}
              </button>
            </div>
            {/* Download stats and Play */}
            <div className="w-6/12 text-right space-x-3 flex justify-end items-center">
              <button className="rounded bg-secondary text-primary p-1 px-2 flex items-center space-x-2">
                <IonIcon icon={cropSharp} />
                <a>Edit</a>
              </button>
              {isLoggedIn && loadingState === 1 && (
                <button
                  onClick={() => downloadSound(sound)}
                  type="button"
                  className="rounded bg-secondary text-primary p-1 px-2 flex items-center space-x-2"
                >
                  <IonIcon icon={downloadSharp} />
                  <a>Download</a>
                  <IonIcon icon={caretDownOutline} />
                </button>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="pb-16">
            <h1 className="text-left text-3xl pt-24 py-4">Description</h1>
            <p className="bg-secondary-static text-primary-static border border-primary-static text-lg p-10">
              {sound.description}
            </p>
          </div>
        </>
      )}
      <SoundList
        header="Pack"
        tracks={packSounds}
        selectedTrack={sound?.id || packSounds[0]?.id || 0}
        setSelectedTrack={() => {}}
        onSoundClick={() => window.scrollTo(0, 0)}
      />
      <SoundList
        header="Similar"
        tracks={similarSounds}
        selectedTrack={sound?.id || similarSounds[0]?.id || 0}
        setSelectedTrack={() => {}}
        onSoundClick={() => window.scrollTo(0, 0)}
      />
    </>
  );
}
