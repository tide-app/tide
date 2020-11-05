import tinykeys from "tinykeys";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import localForage from "localforage";
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
        event.preventDefault();
        setIsPlaying((i) => !i);
      },
      d: () => {
        if (isLoggedIn) downloadSound(sound);
      },
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <div>
      <br />
      <Link to="/">Home</Link>
      <h1 className="text-5xl">{sound.name}</h1>
      {sound.tags?.map((e) => (
        <div key={e} className="Tag">
          {e}
        </div>
      ))}
      {sound.previews && (
        <>
          <Waveform
            waveColor="#FBDC57"
            backgroundColor="black"
            barWidth={1}
            cursorColor="white"
            cursorWidth={1}
            onFinish={() => setIsPlaying(false)}
            playing={isPlaying}
            src={sound.previews["preview-lq-mp3"]}
          />
          {loadingState === 2 && <h1>404</h1>}
          {isLoggedIn && loadingState === 1 && (
            <div className="download-container">
              <button onClick={() => downloadSound(sound)} type="button">
                <ion-icon id="download-icon" name="download-sharp"></ion-icon>
                Download
                <ion-icon
                  id="download-dropdown"
                  name="caret-down-sharp"
                ></ion-icon>
              </button>
            </div>
          )}
          <div>
            <button className="edit-container">
              <ion-icon id="edit-icon" name="crop-sharp"></ion-icon>
              Edit
            </button>
          </div>
          <div className="stats-container">
            <ion-icon name="download-sharp"></ion-icon>
            <button onClick={handlePlayingAndPausing}>
              {isPlaying ? (
                <ion-icon
                  id="pause-button"
                  name="pause-circle-sharp"
                ></ion-icon>
              ) : (
                <ion-icon id="play-button" name="play-circle-sharp" />
              )}
            </button>
          </div>
          <h1 className="text-left text-3xl mx-10 pt-24 py-4">Description</h1>
          <p className="bg-default text-left text-lg mx-10 p-16">
            {sound.description}
          </p>
        </>
      )}
      <SoundList
        id="pack"
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
    </div>
  );
}
