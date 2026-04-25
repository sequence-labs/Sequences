import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App page={document.body.dataset.page || "home"} docId={document.body.dataset.docId} />
  </React.StrictMode>
);
