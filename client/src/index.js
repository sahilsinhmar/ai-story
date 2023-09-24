import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="main">
      <div className="gradient" />
    </div>
    <main className="app">
      <App />
    </main>
  </React.StrictMode>
);
