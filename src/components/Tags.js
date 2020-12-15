import React from "react";
import { Link } from "react-router-dom";

export default function Tags({ tags = [] }) {
  return (
    <>
      <div className="py-4 text-left mb-4">
        {tags.map((tag) => (
          <Link data-e2e-id="SoundList-track-url" key={tag} to={`/tag/${tag}`}>
            <div
              key={tag}
              className="hover:bg-secondary hover:text-primary hover:opacity-100 opacity-50 transition duration-150 ease-in-out inline-block px-3 rounded mr-4 mb-4 border border-solid border-secondary"
            >
              {tag}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
