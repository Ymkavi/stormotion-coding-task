import GameSettings from "game/GameSettings";
import MatchInfo from "game/MatchInfo";

export enum ActionTypes {
  SET_GAME_SETTINGS = "SET_GAME_SETTINGS",
  SELECT_MATCH = "SELECT_MATCH",
  TAKE_MATCHES = "TAKE_MATCHES",
  CLEAR_SETTINGS = "CLEAR_SETTINGS",
}

export type SetGameSettingsAction = {
  type: ActionTypes.SET_GAME_SETTINGS;
  payload: GameSettings;
};

export type SelectMatchAction = {
  type: ActionTypes.SELECT_MATCH;
  payload: MatchInfo;
};

export type TakeMatchesAction = {
  type: ActionTypes.TAKE_MATCHES;
  payload: any;
};

export type ClearSettingsAction = {
  type: ActionTypes.CLEAR_SETTINGS;
};

export type Actions =
  | SetGameSettingsAction
  | SelectMatchAction
  | TakeMatchesAction
  | ClearSettingsAction;
