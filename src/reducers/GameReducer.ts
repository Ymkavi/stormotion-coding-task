import { Actions, ActionTypes } from "./GameReducerActions";
import { createGameInstanceFromSettings } from "types/GameInstance";
import GameState, { TurnStatus } from "types/GameState";
import GameStatus from "types/GameStatus";

const gameReducer = (state: GameState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_GAME_SETTINGS: {
      const { settings } = action.payload;

      return {
        gameSettings: settings,
        gameInstance: createGameInstanceFromSettings(settings),
        gameStatus: GameStatus.Game,
        matches: [],
        turnStatus: settings.isUserStarts
          ? TurnStatus.PLAYER_TURN
          : TurnStatus.WAIT_BOT_TO_CHOOSE,
      } satisfies GameState;
    }
    case ActionTypes.CREATE_MATCHES: {
      const newState = structuredClone(state);

      newState.matches = Array.from(
        { length: action.payload.count },
        (_, index) => ({
          id: index,
          isSelected: false,
        })
      );

      return newState;
    }
    case ActionTypes.SELECT_MATCH: {
      const newState = structuredClone(state);

      newState.matches = state.matches.map((info) => {
        if (info.id === action.payload.matchInfo.id) {
          return { id: info.id, isSelected: !info.isSelected };
        }
        return info;
      });

      return newState;
    }
    case ActionTypes.SET_TURN_STATUS: {
      const newState = structuredClone(state);

      newState.turnStatus = action.payload.turnStatus;

      return newState;
    }
    case ActionTypes.TAKE_MATCHES: {
      const newState = structuredClone(state);
      const { matchesCount, actorType } = action.payload;

      newState.gameInstance.matchesLeft -= matchesCount;

      if (actorType === "player") {
        newState.gameInstance.player.currentMatches += matchesCount;
      } else {
        newState.gameInstance.bot.currentMatches += matchesCount;
      }

      return newState;
    }
    case ActionTypes.SET_GAME_STATUS: {
      const newState = structuredClone(state);

      newState.gameStatus = action.payload.gameStatus;

      return newState;
    }
    case ActionTypes.CLEAR_SETTINGS: {
      return state;
    }
  }
};

export default gameReducer;
