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
  a.download = soundObject.name;
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
  const [similarSounds, setSimilarSounds] = useState([]);
  // 0 => loading
  // 1 => loading succeeded
  // 2 => loading failed
  const [loadingState, setLoadingState] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchSound = async () => {
      try {
        setLoadingState(0);
        const soundResult = await freeSound.getSound(id);
        if (!soundResult.id) throw new Error("Sound not found");
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
        console.log(e);
        setLoadingState(2);
      }
    };
    fetchSound();
  }, [id, props, freeSound]);

  return (
    <div>
      <br />
      <Link to="/">Home</Link>
      <h1 className="text-5xl">{sound.name}</h1>
      <p>{sound.description}</p>
      {sound.tags?.map((e) => (
        <div key={e} className="Tag">
          {e}
        </div>
      ))}
      {loadingState === 2 && <h1>404</h1>}
      {isLoggedIn && loadingState === 1 && (
        <button onClick={() => downloadSound(sound)} type="button">
          download
        </button>
      )}
      {sound.previews && (
        <Waveform
          backgroundColor="black"
          cursorColor="white"
          waveColor="#FBDC57"
          cursorWidth={1}
          src={sound.previews["preview-lq-mp3"]}
          barWidth={1}
        />
      )}
      <SoundList
        header="Pack"
        tracks={packSounds}
        selectedTrack={sound?.id || packSounds[0]?.id || 0}
        setSelectedTrack={() => {}}
      />
      <SoundList
        header="Similar"
        tracks={similarSounds}
        selectedTrack={sound?.id || similarSounds[0]?.id || 0}
        setSelectedTrack={() => {}}
      />
    </div>
  );
}
