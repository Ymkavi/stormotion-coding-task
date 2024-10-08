import { GameContext } from "context/GameContext";
import { useContext } from "react";

const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "The Game Context must be used within an GameContextProvider"
    );
  }
  return context;
};

export default useGameContext;
