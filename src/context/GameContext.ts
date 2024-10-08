import { createContext, Dispatch } from "react";
import GameState from "types/GameState";
import { Actions } from "reducers/GameReducerActions";

type GameContextType = {
  state: GameState;
  dispatch: Dispatch<Actions>;
};

const GameContext = createContext<GameContextType | null>(null);

export default GameContext;
