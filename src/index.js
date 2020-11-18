import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { register } from "./serviceWorker";
import "./build.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

register();
