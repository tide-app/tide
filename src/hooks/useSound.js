import { useState, useEffect } from "react";
import localForage from "localforage";
import { SOUND_LIST_QUERY_PARAMS } from "../constants";

// key examples: sound.<soundId>.full
// key examples: sound.<soundId>.preview
// key examples: api.search
// key examples: api.sound.similar
const downloadAndMemo = async (sound, cacheKey) => {
  const soundBuffer = await localForage.getItem(cacheKey);
  if (soundBuffer) return soundBuffer;
  const newSoundBuffer = await sound.download().then((res) => res.blob());
  await localForage.setItem(cacheKey, newSoundBuffer);
  return newSoundBuffer;
};

const downloadToClient = async (soundObject) => {
  const cacheKey = `sound.${soundObject.id}.full`;
  const blob = await downloadAndMemo(soundObject, cacheKey);
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

/**
 * This function is responsible for downloading and playing sounds,
 * and changing their playing, pausing and loading states.
 */
export default function useSound({ id, freeSound }) {
  // 0 => loading
  // 1 => loading succeeded
  // 2 => loading failed
  const [loadingState, setLoadingState] = useState(0);
  const [sound, setSound] = useState({});
  const [pack, setPack] = useState([]);
  const [similar, setSimilarSounds] = useState([]);

  const download = async () => {
    if (loadingState !== 1)
      throw new Error("Currently loading or loading failed");
    await downloadToClient(sound);
  };

  const play = async () => {
    if (loadingState !== 1)
      throw new Error("Currently loading or loading failed");
  };

  useEffect(() => {
    const fetchSound = async () => {
      if (!id) return;
      try {
        setLoadingState(0);
        const soundResult = await freeSound.getSound(id);
        if (soundResult.detail) throw new Error(soundResult.detail);
        setSound(soundResult);
        if (sound.pack) {
          // @TODO @HACK: Remove this, extract this logic to the freesound-client library
          const packId = new URL(sound.pack).pathname.split("/").find(Number);
          // eslint-disable-next-line
            const packsObj = await freeSound.getPack(packId);
          const packSoundsList = await packsObj.sounds(SOUND_LIST_QUERY_PARAMS);
          if (packSoundsList.results) {
            setPack(packSoundsList.results);
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
        setLoadingState(2);
      }
    };
    fetchSound();
  }, [id, freeSound]);

  return {
    download,
    loadingState,
    pack,
    play,
    similar,
    sound,
  };
}
