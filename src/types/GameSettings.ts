/** Inputs of game */
interface GameSettings {
  n: number;
  m: number;
  isUserStarts: boolean;
}

export const getDefaultGameSettings = (): GameSettings => {
  return {
    n: 12, // 2n+1: default pile size = 25
    m: 3,
    isUserStarts: true,
  };
};

export default GameSettings;
