import React from "react";

interface Props {
  children: Element;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      className="disabled:opacity-50 transition-opacity duration-150 ease-in-out rounded bg-secondary text-primary p-1 px-2 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
    >
      {children}
    </button>
  );
}
