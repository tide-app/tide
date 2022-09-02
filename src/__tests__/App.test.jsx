import React from "react";
import { createRoot } from "react-dom/client";
import "web-audio-test-api";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import App from "../App";

global.IS_REACT_ACT_ENVIRONMENT = true;

describe("App", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("should render", () => {
    expect(() => {
      act(() => {
        createRoot(container).render(<App />);
      });
    }).not.toThrow();
  });
});
