import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Waveform from "./Waveform";
import SoundList from "./SoundList";

const downloadSound = async (soundObject) => {
  const blob = await soundObject.download().then((res) => res.blob());
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
        const {
          results: similarSoundsResults,
        } = await soundResult.getSimilar();
        if (similarSoundsResults) {
          setSimilarSounds(similarSoundsResults);
        }
        setLoadingState(1);
      } catch {
        setLoadingState(2);
      }
    };
    fetchSound();
  }, [id, props]);

  return (
    <div>
      <br />
      <Link to="/freesound-player">Home</Link>
      <h1>{sound.name}</h1>
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
      {sound.previews && <Waveform url={sound.previews["preview-lq-mp3"]} />}
      <SoundList
        header="Similar"
        tracks={similarSounds}
        selectedTrack={sound?.id || similarSounds[0]?.id || 0}
        setSelectedTrack={() => {}}
      />
    </div>
  );
}
