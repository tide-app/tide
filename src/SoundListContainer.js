import React, { useState, useEffect } from "react";
import SoundList from "./SoundList";

export default function SoundListContainer(props) {
  const [previewSound, setPreviewSound] = useState({});
  const [previewIsPlaying, setPreviewIsPlaying] = useState(false);
  const [context, setContext] = useState();

  const AudioContext = window.AudioContext || window.webkitAudioContext;

  function playSound(buffer) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    if (previewIsPlaying) source.stop();
    setPreviewIsPlaying(true);
    source.start(0);
    source.stop(context.currentTime + buffer.duration);
    source.onended = () => {
      setPreviewIsPlaying(false);
      setPreviewSound(undefined);
    };
  }

  useEffect(() => {
    setContext(new AudioContext());
    return () => {
      if (context) context.close();
    };
  }, []);

  const fetchAndPlay = async () => {
    if (previewSound.id && previewSound.previews?.["preview-lq-mp3"]) {
      const soundBuffer = await fetch(
        previewSound.previews["preview-lq-mp3"]
      ).then((res) => res.arrayBuffer());
      const buffer = await context.decodeAudioData(soundBuffer);
      playSound(buffer);
    }
  };

  useEffect(() => {
    if (previewSound) {
      fetchAndPlay();
    }
  }, [previewSound]);

  return (
    <SoundList
      onPlayClick={(preview) => {
        setPreviewSound(preview);
      }}
      isPlaying={previewIsPlaying}
      playingTrackId={previewSound?.id}
      {...props}
    />
  );
}
