import { useState, useEffect } from "react";
import localForage from "localforage";

// key examples: sound.<soundId>.full
// key examples: sound.<soundId>.preview
// key examples: api.search
// key examples: api.sound.similar
const memoizedDownload = async (sound, cacheKey) => {
  const soundBuffer = await localForage.getItem(cacheKey);
  if (soundBuffer) return soundBuffer;
  const newSoundBuffer = await sound.download().then((res) => res.blob());
  await localForage.setItem(cacheKey, newSoundBuffer);
  return newSoundBuffer;
};

const downloadToClient = async (soundObject) => {
  const cacheKey = `sound.${soundObject.id}.full`;
  const blob = await memoizedDownload(soundObject, cacheKey);
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
  const download = () => {
    downloadToClient(sound);
  };
  const play = () => {};

  useEffect(() => {
    const fetchSound = async () => {
      try {
        setLoadingState(0);
        const soundResult = await freeSound.getSound(id);
        if (soundResult.detail) throw new Error(soundResult.detail);
        setSound(soundResult);
        setLoadingState(1);
      } catch (e) {
        // eslint-disable-next-line no-console
        setLoadingState(2);
      }
    };
    fetchSound();
  }, [id, freeSound]);

  return {
    download,
    loadingState,
    play,
    sound,
  };
}
