import MatchInfo from "types/MatchInfo";

const getRandomObjects = (matchInfos: MatchInfo[], count: number) => {
  const shuffled = matchInfos
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled.slice(0, count);
};

export default getRandomObjects;
