import DOMPurify from "dompurify";
import { Helmet } from "react-helmet";
import tinykeys from "tinykeys";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Waveform from "react-wavesurfer.js";
import SoundList from "./SoundList";
import Description from "./components/Description";
import Tags from "./components/Tags";
import Dropdown from "./components/Dropdown";
import PlayButtton from "./components/PlayButton";
import useSound from "./hooks/useSound";
import { SOUND_LIST_QUERY_PARAMS } from "./constants";

export default function Sound(props) {
  const { isLoggedIn, freeSound, setModalIsOpen } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [packSounds, setPackSounds] = useState([]);
  const [similarSounds, setSimilarSounds] = useState([]);
  // 0 => loading
  // 1 => loading succeeded
  // 2 => loading failed
  const { id } = useParams();
  const { download, loadingState, sound } = useSound({
    id,
    freeSound,
  });

  const handlePlayingAndPausing = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const fetchSound = async () => {
      if (sound.pack) {
        // @TODO @HACK: Remove this, extract this logic to the freesound-client library
        const packId = new URL(sound.pack).pathname.split("/").find(Number);
        // eslint-disable-next-line
          const packsObj = await freeSound.getPack(packId);
        const packSoundsList = await packsObj.sounds(SOUND_LIST_QUERY_PARAMS);
        if (packSoundsList.results) {
          setPackSounds(packSoundsList.results);
        }
      }
      const { results: similarSoundsResults } = await sound.getSimilar(
        SOUND_LIST_QUERY_PARAMS
      );
      if (similarSoundsResults) {
        setSimilarSounds(similarSoundsResults);
      }
    };
    fetchSound();
  }, [id, freeSound]);
  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      Space: (event) => {
        // Shortcuts should only work
        if (document.activeElement === document.body) {
          event.preventDefault(); // if we're on the main
          setIsPlaying((i) => !i); // section of the app,
        } // and not if, say, we are searching for a sound.
      },
      d: () => {
        // As stated above, shortcuts should only work
        if (isLoggedIn && document.activeElement === document.body) download(); // when on the main section of the
      }, // app, and not, for example, while searching.
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <>
      <Helmet>
        <title>{`${sound.name || "Sound Page"} - Tide`}</title>
        <meta name="description" content="A sound from Tide" />
      </Helmet>
      <h1
        data-e2e-id="sound-title"
        className="text-4xl md:text-5xl mb-4 text-left truncate"
      >
        {sound.name}
      </h1>
      <Tags tags={sound.tags} />
      {sound.previews && (
        <>
          <Waveform
            waveColor="#FBDC57"
            progressColor="transparent"
            backgroundColor="black"
            barWidth={1}
            cursorColor="white"
            cursorWidth={2}
            onFinish={() => setIsPlaying(false)}
            playing={isPlaying}
            src={sound.previews["preview-lq-mp3"]}
          />
          {loadingState === 2 && <h1>404</h1>}
          <div className="flex justfify-between py-3">
            {/* Download and edit buttons */}
            <div className="w-6/12 space-x-3">
              <PlayButtton
                onClick={handlePlayingAndPausing}
                isPlaying={isPlaying}
              />
            </div>
            {/* Download stats and Play */}
            <div className="w-6/12 text-right space-x-3 flex justify-end items-center">
              {loadingState !== 2 && (
                <Dropdown
                  disabled={loadingState !== 1}
                  onClick={() => {
                    if (!isLoggedIn) setModalIsOpen(true);
                    else download();
                  }}
                />
              )}
            </div>
          </div>
          {/* Description */}
          <div className="pb-16">
            <Description
              content={{
                __html: DOMPurify.sanitize(sound.description),
              }}
            />
          </div>
        </>
      )}
      {packSounds[0] && (
        <SoundList
          tracks={packSounds}
          selectedTrack={sound?.id || packSounds[0]?.id || 0}
          setSelectedTrack={() => {}}
          onSoundClick={() => window.scrollTo(0, 0)}
          header="Pack"
          className="pb-16"
        />
      )}
      {similarSounds[0] && (
        <SoundList
          header="Similar"
          tracks={similarSounds}
          selectedTrack={sound?.id || similarSounds[0]?.id || 0}
          setSelectedTrack={() => {}}
          onSoundClick={() => window.scrollTo(0, 0)}
          className="pb-16"
        />
      )}
    </>
  );
}
