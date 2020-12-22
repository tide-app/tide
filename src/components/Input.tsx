import React from "react";
import { IonIcon } from "@ionic/react";

interface Props {
  icon: string;
}

export default function Input({ icon, ...props }: Props) {
  return (
    <div className="relative">
      <input
        {...props} // appearance-none, block and leading-tight don't seem to do anything. Should we remove them?
        className="appearance-none block bg-primary border focus:outline-none leading-tight p-1 pl-4 placeholder-secondary rounded"
      />
      {icon && (
        <button
          type="submit"
          className="absolute flex h-full items-center mr-4 right-0 top-0"
        >
          <IonIcon icon={icon} />
        </button>
      )}
    </div>
  );
}
