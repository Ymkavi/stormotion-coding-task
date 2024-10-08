import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "components/app/App";
import "./index.css";
import GameContextProvider from "context/GameContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </StrictMode>
);
