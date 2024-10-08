import PreGameScreen from "components/preGameScreen/PreGameScreen";
import GameStatus from "game/GameStatus";
import PostGameScreen from "components/postGameScreen/PostGameScreen";
import InvalidScreen from "components/invalidScreen/InvalidScreen";
import GameScreen from "components/gameScreen/GameScreen";
import useGameContext from "hooks/useGameContext";

const App = () => {
  const { state } = useGameContext();

  const getComponentByState = (gameState: GameStatus) => {
    switch (gameState) {
      case GameStatus.PreGame:
        return <PreGameScreen />;
      case GameStatus.Game:
        return <GameScreen />;
      case GameStatus.PostGame:
        return <PostGameScreen />;
      default:
        return <InvalidScreen />;
    }
  };

  return (
    <main className="flex-grow min-h-full text-white bg-gray-800 flex justify-center items-center">
      {getComponentByState(state.gameStatus)}
    </main>
  );
};

export default App;
