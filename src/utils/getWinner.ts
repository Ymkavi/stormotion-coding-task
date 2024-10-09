import { ActorType } from "types/Actor";

const getWinner = (playerMatches: number, botMatches: number): ActorType => {
  if (playerMatches % 2 === 0) return "player";
  if (botMatches % 2 === 0) return "bot";

  throw new Error(
    "The winner is unknown: both actors have an odd amount of matches."
  );
};

export default getWinner;
