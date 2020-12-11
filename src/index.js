import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { register } from "./serviceWorker";
import "./build.css";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
}

register();
