import { createGameInstanceFromSettings } from "game/GameInstance";
import { Actions, ActionTypes } from "./GameReducerActions";
import GameState from "./GameState";
import GameStatus from "game/GameStatus";

const gameReducer = (state: GameState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_GAME_SETTINGS: {
      return {
        gameSettings: action.payload,
        gameInstance: createGameInstanceFromSettings(action.payload),
        gameStatus: GameStatus.Game,
      };
    }
    case ActionTypes.SELECT_MATCH: {
      return state;
    }
    case ActionTypes.TAKE_MATCHES: {
      return state;
    }
    case ActionTypes.CLEAR_SETTINGS: {
      return state;
    }
  }
};

export default gameReducer;
