import DOMPurify from "dompurify";
import { pauseCircleSharp, playCircleSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import localForage from "localforage";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import tinykeys from "tinykeys";
import Waveform from "react-wavesurfer.js";
import SoundList from "./SoundList";
// import Button from "./components/Button";
import Description from "./components/Description";
import { SOUND_LIST_QUERY_PARAMS } from "./constants";
import Tags from "./components/Tags";
import Dropdown from "./components/Dropdown";

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
          // eslint-disable-next-line
          const packsObj = await freeSound.getPack(packId);
          const packSoundsList = await packsObj.sounds(SOUND_LIST_QUERY_PARAMS);
          if (packSoundsList.results) {
            setPackSounds(packSoundsList.results);
          }
        }
        const { results: similarSoundsResults } = await soundResult.getSimilar(
          SOUND_LIST_QUERY_PARAMS
        );
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
      <h1 data-e2e-id="sound-title" className="text-5xl mb-4 text-left">
        {sound.name}
      </h1>
      <Tags tags={sound.tags} />
      {sound.previews && (
        <>
          <Waveform
            waveColor="#FBDC57"
            progressColor="transparent"
            backgroundColor="black"
            barWidth={1}
            cursorColor="white"
            cursorWidth={2}
            onFinish={() => setIsPlaying(false)}
            playing={isPlaying}
            src={sound.previews["preview-lq-mp3"]}
          />
          {loadingState === 2 && <h1>404</h1>}
          <div className="flex justfify-between py-3">
            {/* Download and edit buttons */}
            <div className="w-6/12 space-x-3">
              {/* <IonIcon size="large" icon={downloadSharp} /> */}
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
              {/* <Button>  // Removing on Tuesday, November 24, 2020, due to
                <IonIcon icon={cropSharp} />  // lack of functionality - Hamir
                <a>Edit</a>
              </Button> */}
              {isLoggedIn && loadingState === 1 && (
                <Dropdown onClick={() => downloadSound(sound)} />
              )}
            </div>
          </div>
          {/* Description */}
          <div className="pb-16">
            <Description
              content={{
                __html: DOMPurify.sanitize(sound.description),
              }}
            />
          </div>
        </>
      )}
      {packSounds[0] && (
        <SoundList
          tracks={packSounds}
          selectedTrack={sound?.id || packSounds[0]?.id || 0}
          setSelectedTrack={() => {}}
          onSoundClick={() => window.scrollTo(0, 0)}
          header="Pack"
          className="pb-16"
        />
      )}
      {similarSounds[0] && (
        <SoundList
          header="Similar"
          tracks={similarSounds}
          selectedTrack={sound?.id || similarSounds[0]?.id || 0}
          setSelectedTrack={() => {}}
          onSoundClick={() => window.scrollTo(0, 0)}
          className="pb-16"
        />
      )}
    </>
  );
}
