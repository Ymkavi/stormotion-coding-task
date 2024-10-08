import GameInstance, {
  createGameInstanceFromSettings,
} from "game/GameInstance";
import GameSettings, { getDefaultGameSettings } from "game/GameSettings";
import GameStatus from "game/GameStatus";

interface GameState {
  gameSettings: GameSettings;
  gameInstance: GameInstance;
  gameStatus: GameStatus;
}

export const initialGameState: GameState = {
  gameSettings: getDefaultGameSettings(),
  gameInstance: createGameInstanceFromSettings(getDefaultGameSettings()),
  gameStatus: GameStatus.PreGame,
};

export default GameState;
