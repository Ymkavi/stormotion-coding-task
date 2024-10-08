import { createContext, Dispatch, ReactNode, useReducer } from "react";
import GameState, { initialGameState } from "reducers/GameState";
import { Actions } from "reducers/GameReducerActions";
import gameReducer from "reducers/GameReducer";

type GameContextType = {
  state: GameState;
  dispatch: Dispatch<Actions>;
};

export const GameContext = createContext<GameContextType | null>(null);

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
