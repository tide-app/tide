import React from "react";
import { IonIcon } from "@ionic/react";

export default function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <input
        {...props} // appearance-none, block and leading-tight don't seem to do anything. Should we remove them?
        className="appearance-none block bg-primary border focus:outline-none h-10 leading-tight p-1 pl-4 placeholder-secondary rounded"
      />
      {icon && (
        <button type="submit" className="absolute mr-4 mt-3 right-0 top-0">
          <IonIcon icon={icon} />
        </button>
      )}
    </div>
  );
}
