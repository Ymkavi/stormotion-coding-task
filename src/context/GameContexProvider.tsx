import React, { ReactNode, useReducer } from "react";
import gameReducer from "reducers/GameReducer";
import GameContext from "./GameContext";
import { initialGameState } from "types/GameState";

type ContextProviderProps = {
  children: ReactNode;
};

const GameContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
