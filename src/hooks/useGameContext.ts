import { useContext } from "react";
import GameContext from "context/GameContext";

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
