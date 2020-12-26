import React from "react";

const propsObject: { __html: string } = {
  __html: "",
};

interface Props {
  content: typeof propsObject;
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
