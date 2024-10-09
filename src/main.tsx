import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "components/app/App";
import GameContextProvider from "context/GameContexProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </StrictMode>
);
