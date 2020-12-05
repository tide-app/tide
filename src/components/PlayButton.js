import React from "react";
import { IonIcon } from "@ionic/react";
import { pauseCircleSharp, playCircleSharp } from "ionicons/icons";

export default function PlayButton({ onClick, isPlaying }) {
  return (
    <div className="w-6/12 space-x-3">
      <button onClick={onClick} className="focus:outline-none">
        {isPlaying ? (
          <IonIcon size="large" icon={pauseCircleSharp} />
        ) : (
          <IonIcon size="large" icon={playCircleSharp} />
        )}
      </button>
    </div>
  );
}
