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
    case ActionTypes.NEXT_TURN: {
      const newState = structuredClone(state);

      newState.gameInstance.isPlayerTurn = !newState.gameInstance.isPlayerTurn;

      return newState;
    }
    case ActionTypes.TAKE_MATCHES: {
      const newState = structuredClone(state);
      const { matchesCount, isPlayer } = action.payload;

      newState.gameInstance.matchesLeft -= matchesCount;

      if (isPlayer) {
        newState.gameInstance.player.currentMatches += matchesCount;
      } else {
        newState.gameInstance.bot.currentMatches += matchesCount;
      }

      return newState;
    }
    case ActionTypes.CLEAR_SETTINGS: {
      return state;
    }
  }
};

export default gameReducer;
