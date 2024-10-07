import { useCallback, useState } from "react";
import PreGameScreen from "components/preGameScreen/PreGameScreen";
import GameState from "game/GameState";
import PostGameScreen from "components/postGameScreen/PostGameScreen";
import InvalidScreen from "components/invalidScreen/InvalidScreen";
import GameScreen from "components/gameScreen/GameScreen";

const App = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.PreGame);

  const getComponentByState = useCallback((gameState: GameState) => {
    switch (gameState) {
      case GameState.PreGame:
        return <PreGameScreen />;
      case GameState.Game:
        return <GameScreen />;
      case GameState.PostGame:
        return <PostGameScreen />;
      default:
        return <InvalidScreen />;
    }
  }, []);

  return (
    <main className="flex-grow text-white bg-gray-800 flex justify-center items-center">
      {getComponentByState(gameState)}
    </main>
  );
};

export default App;
