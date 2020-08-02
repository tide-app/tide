import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import CursorPlugin from "wavesurfer.js/src/plugin/cursor";
import TimelinePlugin from "wavesurfer.js/src/plugin/timeline";
import SpectrogramPlugin from "wavesurfer.js/src/plugin/spectrogram";
import {
  createColorMap,
  createOpacityMap,
  createColorOpacityMap,
  linearScale
} from "@colormap/core";
import { plasma } from "@colormap/presets";

let opacities = [1, 1, 1];
let domain = [0, 100];
let range = [0, 1];
let scale = linearScale(domain, range);
let colorMap = createColorMap(plasma, scale);
let opacityMap = createOpacityMap(opacities, scale);
let colorOpacityMap = createColorOpacityMap(colorMap, opacityMap);

const colorsFoo = new Array(256).fill(0).map((_, i) => colorOpacityMap(i));

const formWaveSurferOptions = (ref, refSpec, waveTimeline) => ({
  container: ref,
  plugins: [
    CursorPlugin.create({
      color: "white",
      opacity: 1
    }),
    SpectrogramPlugin.create({
      container: refSpec,
      colorMap: colorsFoo
    }),
    TimelinePlugin.create({ container: waveTimeline })
  ],
  waveColor: "#F1FA22",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  // barRadius: 3,
  responsive: true,
  height: 150,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

export default function Waveform({ url }) {
  const waveformRef = useRef();
  const waveformSpec = useRef();
  const waveformTimeline = useRef();
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(1);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(
      waveformRef.current,
      waveformSpec.current,
      waveformTimeline.current
    );
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      wavesurfer.current.setVolume(volume);
      setVolume(volume);
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <label htmlFor="volume">Volume</label>
        <div id="wave-timeline" ref={waveformTimeline} />
        <div id="wave-spectrogram" ref={waveformSpec} />
        <div id="annotations" />
      </div>
    </div>
  );
}
