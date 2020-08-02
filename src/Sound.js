import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Waveform from "./Waveform";
import SoundList from "./SoundList";

export default function Sound(props) {
  const [sound, setSound] = useState({});
  const [similarSounds, setSimilarSounds] = useState([]);
  const { id } = useParams();

  // @TODO: Handle 404 case
  useEffect(() => {
    const { freeSound } = props;
    const fetchSound = async () => {
      const sound = await freeSound.getSound(id);
      setSound(sound);
      const { results: similarSounds } = await sound.getSimilar();
      console.log(similarSounds);
      if (similarSounds) {
        setSimilarSounds(similarSounds);
      }
    };
    fetchSound();
  }, [id, props]);

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>{sound.name}</h1>
      <p>{sound.description}</p>
      {sound.tags?.map(e => (
        <div key={e} className="Tag">
          {e}
        </div>
      ))}
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
