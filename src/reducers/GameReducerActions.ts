import GameSettings from "game/GameSettings";

export enum ActionTypes {
  SET_GAME_SETTINGS = "SET_GAME_SETTINGS",
  NEXT_TURN = "NEXT_TURN",
  TAKE_MATCHES = "TAKE_MATCHES",
  CLEAR_SETTINGS = "CLEAR_SETTINGS",
}

export type SetGameSettingsAction = {
  type: ActionTypes.SET_GAME_SETTINGS;
  payload: GameSettings;
};

export type NextTurnAction = {
  type: ActionTypes.NEXT_TURN;
};

export type TakeMatchesAction = {
  type: ActionTypes.TAKE_MATCHES;
  payload: { matchesCount: number; isPlayer: boolean };
};

export type ClearSettingsAction = {
  type: ActionTypes.CLEAR_SETTINGS;
};

export type Actions =
  | SetGameSettingsAction
  | NextTurnAction
  | TakeMatchesAction
  | ClearSettingsAction;
