import MatchInfo from "types/MatchInfo";

/**
 * Retrieves a specified number of random MatchInfo objects from the provided array.
 * @param matchInfos An array of MatchInfo objects to choose from.
 * @param count The number of random MatchInfo objects to return.
 * @returns An array containing 'count' random MatchInfo objects.
 */
const getRandomObjects = (matchInfos: MatchInfo[], count: number) => {
  const shuffled = matchInfos
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled.slice(0, count);
};

export default getRandomObjects;
