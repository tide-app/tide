// @TODO: Use CursorPlugin plugin. Previously this had a bug where it would
//        overflow the container element
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import SpectrogramPlugin from "wavesurfer.js/dist/plugin/wavesurfer.spectrogram";
import {
  createColorMap,
  createOpacityMap,
  createColorOpacityMap,
  linearScale,
} from "@colormap/core";
import { plasma } from "@colormap/presets";

const opacities = [1, 1, 1];
const domain = [0, 100];
const range = [0, 1];
const scale = linearScale(domain, range);
const colorMap = createColorMap(plasma, scale);
const opacityMap = createOpacityMap(opacities, scale);
const colorOpacityMap = createColorOpacityMap(colorMap, opacityMap);

const formWaveSurferOptions = (ref, refSpec, waveTimeline) => ({
  container: ref,
  plugins: [
    SpectrogramPlugin.create({
      container: refSpec,
      colorMap: new Array(256).fill(0).map((_, i) => colorOpacityMap(i)),
    }),
    TimelinePlugin.create({ container: waveTimeline }),
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
  // Use the PeakCache to improve rendering speed of
  // large waveforms.
  partialRender: true,
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

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      wavesurfer.current.setVolume(volume);
      setVolume(volume);
    });
    // Removes events, elements and disconnects Web Audio
    // nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url, volume]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
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
          // so we need to set some zero-ish value for
          // silence
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
