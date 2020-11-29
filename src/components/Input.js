import React from "react";

export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className="appearance-none block placeholder-secondary text-secondary bg-primary border rounded p-1 leading-tight focus:outline-none pl-4"
    />
  );
}
