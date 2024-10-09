import calculatePileSize from "utils/calculatePileSize";
import Actor from "types/Actor";
import GameSettings from "types/GameSettings";

/** Info about the current game. */
interface GameInstance {
  pileSize: number;
  maxMatchesToSelect: number;
  matchesLeft: number;
  player: Actor;
  bot: Actor;
}

export const createGameInstanceFromSettings = (
  gameSettings: GameSettings
): GameInstance => {
  const pileSize = calculatePileSize(gameSettings.n);

  return {
    pileSize: pileSize,
    maxMatchesToSelect: gameSettings.m,
    matchesLeft: pileSize,
    player: { currentMatches: 0 },
    bot: { currentMatches: 0 },
  };
};

export default GameInstance;
