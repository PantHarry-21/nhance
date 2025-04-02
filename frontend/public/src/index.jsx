import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';

console.log("Rendering React App"); // Add log here

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
