import MatchInfo from "types/MatchInfo";

/** Bot decision delay in ms*/
const BotDecisionDelay = 1000;

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

export { chooseMatchesWithDelay, BotDecisionDelay };
