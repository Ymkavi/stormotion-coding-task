import Actor from "game/Actor";
import GameSettings from "./GameSettings";
import calculatePileSize from "utils/calculatePileSize";

interface GameInstance {
  pileSize: number;
  maxMatchesToSelect: number;
  isUserStarts: boolean;
  matchesLeft: number;
  player: Actor;
  bot: Actor;
  isPlayerTurn: boolean;
}

export const createGameInstanceFromSettings = (
  gameSettings: GameSettings
): GameInstance => {
  const pileSize = calculatePileSize(gameSettings.n);
  const player: Actor = { isBot: false, currentMatches: 0 };
  const bot: Actor = { isBot: true, currentMatches: 0 };

  return {
    pileSize: pileSize,
    maxMatchesToSelect: gameSettings.m,
    isUserStarts: gameSettings.isUserStarts,
    matchesLeft: pileSize,
    player,
    bot,
    isPlayerTurn: gameSettings.isUserStarts,
  };
};

export default GameInstance;
