import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("should render", () => {
    expect(render(<App />)).toBeTruthy();
  });
});
