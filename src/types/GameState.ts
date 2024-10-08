import GameInstance, {
  createGameInstanceFromSettings,
} from "types/GameInstance";
import GameSettings, { getDefaultGameSettings } from "types/GameSettings";
import GameStatus from "types/GameStatus";
import MatchInfo from "types/MatchInfo";

export enum TurnStatus {
  PLAYER_TURN = "PLAYER_TURN",
  WAIT_BOT_TO_CHOOSE = "WAIT_BOT_TO_CHOOSE",
  BOT_TURN = "BOT_TURN",
}

interface GameState {
  gameSettings: GameSettings;
  gameInstance: GameInstance;
  gameStatus: GameStatus;
  matches: MatchInfo[];
  turnStatus: TurnStatus;
}
const defaultSettings = getDefaultGameSettings();
export const initialGameState: GameState = {
  gameSettings: defaultSettings,
  gameInstance: createGameInstanceFromSettings(defaultSettings),
  gameStatus: GameStatus.PreGame,
  matches: [],
  turnStatus: defaultSettings.isUserStarts
    ? TurnStatus.PLAYER_TURN
    : TurnStatus.WAIT_BOT_TO_CHOOSE,
};

export default GameState;
