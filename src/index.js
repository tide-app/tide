/* eslint-disable import/first, import/no-unresolved */
import {
  init,
  events,
  vitals,
  measure,
  network,
  profiler,
} from "@palette.dev/browser";

init({
  key: "cl7kr4bv9012309l2gfw6pvsq",
  // Collect click, web vitals, network, performance events, and profiles
  plugins: [events(), vitals(), network(), measure(), profiler()],
});

// Profile startup
profiler.start({
  sampleInterval: 10,
  maxBufferSize: 10_000,
});
window.addEventListener("load", () => {
  profiler.stop();
});

import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./App";
import { register } from "./serviceWorker";
import "./build.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://db77445a37ad4dcbaa33ca7f33dec571@o184269.ingest.sentry.io/5558822",
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.1,
  });
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

register();
