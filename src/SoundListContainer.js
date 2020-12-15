import React, { useState, useEffect } from "react";
import SoundList from "./SoundList";

export default function SoundListContainer(props) {
  const [previewSound, setPreviewSound] = useState({});
  const [previewIsPlaying, setPreviewIsPlaying] = useState(false);
  const [context, setContext] = useState();
  const [source, setSource] = useState();

  const AudioContext = window.AudioContext || window.webkitAudioContext;

  function play(buffer) {
    const newSource = context.createBufferSource();
    setSource(newSource);
    newSource.buffer = buffer;
    newSource.connect(context.destination);
    if (previewIsPlaying) newSource.stop();
    setPreviewIsPlaying(true);
    newSource.start(0);
    newSource.stop(context.currentTime + buffer.duration);
    newSource.onended = () => {
      setPreviewIsPlaying(false);
      setPreviewSound(undefined);
    };
  }

  function onPauseClick() {
    if (!previewIsPlaying) return;
    source.stop(context.currentTime);
    setPreviewSound({});
    setSource(undefined);
    setPreviewIsPlaying(false);
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
      play(buffer);
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
      onPauseClick={onPauseClick}
      isPlaying={previewIsPlaying}
      playingTrackId={previewSound?.id}
      {...props}
    />
  );
}
