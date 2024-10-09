import GameSettings from "types/GameSettings";
import MatchInfo from "types/MatchInfo";
import { TurnStatus } from "types/GameState";
import { ActorType } from "types/Actor";
import GameStatus from "types/GameStatus";

export enum ActionTypes {
  SET_GAME_SETTINGS = "SET_GAME_SETTINGS",
  CREATE_MATCHES = "CREATE_MATCHES",
  SELECT_MATCH = "SELECT_MATCH",
  SET_TURN_STATUS = "SET_TURN_STATUS",
  TAKE_MATCHES = "TAKE_MATCHES",
  SET_GAME_STATUS = "SET_GAME_STATUS",
  CLEAR_SETTINGS = "CLEAR_SETTINGS",
}

export type SetGameSettingsAction = {
  type: ActionTypes.SET_GAME_SETTINGS;
  payload: { settings: GameSettings };
};

export type CreateMatchesAction = {
  type: ActionTypes.CREATE_MATCHES;
  payload: { count: number };
};

export type ToggleSelectMatchAction = {
  type: ActionTypes.SELECT_MATCH;
  payload: { matchInfo: MatchInfo };
};

export type SetTurnStatusAction = {
  type: ActionTypes.SET_TURN_STATUS;
  payload: { turnStatus: TurnStatus };
};

export type TakeMatchesAction = {
  type: ActionTypes.TAKE_MATCHES;
  payload: { matchesCount: number; actorType: ActorType };
};

export type SetGameStatusAction = {
  type: ActionTypes.SET_GAME_STATUS;
  payload: { gameStatus: GameStatus };
};

export type ClearSettingsAction = {
  type: ActionTypes.CLEAR_SETTINGS;
};

export type Actions =
  | SetGameSettingsAction
  | CreateMatchesAction
  | ToggleSelectMatchAction
  | SetTurnStatusAction
  | TakeMatchesAction
  | SetGameStatusAction
  | ClearSettingsAction;
