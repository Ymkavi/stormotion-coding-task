import MatchInfo from "types/MatchInfo";
import GameInstance from "types/GameInstance";

/** Bot decision delay in ms*/
const BotDecisionDelay = 700;

/**
 * Executes a callback function for each MatchInfo one by one.
 * @param callback A function to be called for each MatchInfo.
 * @param matchInfos An array of MatchInfo objects to process.
 * @returns A promise that resolves when all match information has been processed.
 */
const chooseMatchesWithDelay = (
  callback: (MatchInfo: MatchInfo) => void,
  matchInfos: MatchInfo[]
) => {
  const promises = matchInfos.map((value, index) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        callback(value);
        resolve();
      }, BotDecisionDelay + index * BotDecisionDelay);
    });
  });

  return Promise.all(promises);
};

/**
 * If the bot already has an odd number of matches, it will try to take an odd number of matches to reach an even total.
 * @param gameInstance Instance of the game
 * @returns Amount of matches to select
 */
const tryKeepEven = (gameInstance: GameInstance): number => {
  const { bot, matchesLeft, maxMatchesToSelect } = gameInstance;

  const botHasOddMatches = bot.currentMatches % 2 !== 0;

  // If the bot has an odd number of matches, take an odd number of matches
  if (botHasOddMatches) {
    for (let i = 0; i <= maxMatchesToSelect; i += 2) {
      if (i <= matchesLeft) return i;
    }
  }

  // Otherwise, take an even number of matches (or the maximum allowed)
  for (let i = 2; i <= maxMatchesToSelect; i += 2) {
    if (i <= matchesLeft) return i;
  }

  // If no better option is available, take the maximum possible matches
  return Math.min(matchesLeft, maxMatchesToSelect);
};

export { chooseMatchesWithDelay, tryKeepEven, BotDecisionDelay };
