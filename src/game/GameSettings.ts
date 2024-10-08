interface GameSettings {
  n: number;
  m: number;
  isUserStarts: boolean;
}

export const getDefaultGameSettings = (): GameSettings => {
  return { n: 12, m: 3, isUserStarts: true };
};

export default GameSettings;
