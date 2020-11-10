import React from "react";

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      type="button"
      className="rounded bg-secondary text-primary p-1 px-2 flex items-center space-x-2"
    >
      {children}
    </button>
  );
}
