import React from "react";

export default function Description({ content: sanitizedHTMLFromFreesound }) {
  return (
    <>
      <h1 className="text-left text-3xl pt-24 py-4">Description</h1>
      <div className="Description bg-secondary-static text-primary-static overflow-scroll border border-primary-static text-lg p-10">
        <p dangerouslySetInnerHTML={sanitizedHTMLFromFreesound} />
      </div>
    </>
  );
}
