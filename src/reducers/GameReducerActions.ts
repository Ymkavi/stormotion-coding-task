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
}

type SetGameSettingsAction = {
  type: ActionTypes.SET_GAME_SETTINGS;
  payload: { settings: GameSettings };
};

type CreateMatchesAction = {
  type: ActionTypes.CREATE_MATCHES;
  payload: { count: number };
};

type ToggleSelectMatchAction = {
  type: ActionTypes.SELECT_MATCH;
  payload: { matchInfo: MatchInfo };
};

type SetTurnStatusAction = {
  type: ActionTypes.SET_TURN_STATUS;
  payload: { turnStatus: TurnStatus };
};

type TakeMatchesAction = {
  type: ActionTypes.TAKE_MATCHES;
  payload: { matchesCount: number; actorType: ActorType };
};

type SetGameStatusAction = {
  type: ActionTypes.SET_GAME_STATUS;
  payload: { gameStatus: GameStatus };
};

export type Actions =
  | SetGameSettingsAction
  | CreateMatchesAction
  | ToggleSelectMatchAction
  | SetTurnStatusAction
  | TakeMatchesAction
  | SetGameStatusAction;
