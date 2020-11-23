import React from "react";

export default function Tags({ tags = [] }) {
  return (
    <>
      <div className="py-4 text-left mb-4 opacity-50">
        {tags.map((tag) => (
          <div
            key={tag}
            className="inline-block px-3 rounded mr-4 mb-4 border border-solid border-secondary"
          >
            {tag}
          </div>
        ))}
      </div>
    </>
  );
}
