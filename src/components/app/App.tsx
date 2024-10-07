import { useCallback, useState } from "react";
import {
  IGameSettings,
  PreGameScreen,
} from "components/preGameScreen/PreGameScreen";
import GameState from "game/GameState";
import PostGameScreen from "components/postGameScreen/PostGameScreen";
import InvalidScreen from "components/invalidScreen/InvalidScreen";
import GameScreen from "components/gameScreen/GameScreen";
import { SubmitHandler } from "react-hook-form";

const App = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.PreGame);
  const [gameSettings, setGameSettings] = useState<IGameSettings>({
    n: 12,
    m: 3,
    isUserStarts: true,
  });

  const handleGameStart: SubmitHandler<IGameSettings> = (data) => {
    setGameSettings(data);
    setGameState(GameState.Game);
  };

  const getComponentByState = useCallback(
    (gameState: GameState) => {
      switch (gameState) {
        case GameState.PreGame:
          return (
            <PreGameScreen
              gameSettings={gameSettings}
              onGameStart={handleGameStart}
            />
          );
        case GameState.Game:
          return <GameScreen />;
        case GameState.PostGame:
          return <PostGameScreen />;
        default:
          return <InvalidScreen />;
      }
    },
    [gameSettings]
  );

  return (
    <main className="flex-grow text-white bg-gray-800 flex justify-center items-center">
      {getComponentByState(gameState)}
    </main>
  );
};

export default App;
