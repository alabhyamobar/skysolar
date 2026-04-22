import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollContext from "./Context/ScrollContext.jsx";

createRoot(document.getElementById("root")).render(
  <ScrollContext>
    <BrowserRouter basename="/skysolar">
      <App />
    </BrowserRouter>
  </ScrollContext>,
);
