import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./App";
import { register } from "./serviceWorker";
import "./build.css";

Sentry.init({
  dsn:
    "https://db77445a37ad4dcbaa33ca7f33dec571@o184269.ingest.sentry.io/5558822",
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.1,
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

register();
