import React from "react";

interface Props {
  content: { __html: string };
}

export default function Description({
  content: sanitizedHTMLFromFreesound,
}: Props) {
  return (
    <>
      <h1 className="text-left text-3xl pt-24 py-4">Description</h1>
      <div className="Description bg-secondary-static text-primary-static overflow-scroll border border-primary-static text-lg p-10">
        <p dangerouslySetInnerHTML={sanitizedHTMLFromFreesound} />
      </div>
    </>
  );
}
