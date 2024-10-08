import GameField from "components/gameField/GameField";
import useGameContext from "hooks/useGameContext";
import { useEffect } from "react";
import { ActionTypes } from "reducers/GameReducerActions";

const GameScreen = () => {
  const { state, dispatch } = useGameContext();

  useEffect(() => {
    dispatch({
      type: ActionTypes.CREATE_MATCHES,
      payload: { count: state.gameInstance.matchesLeft },
    });
  }, [dispatch, state.gameInstance.matchesLeft]);

  return (
    <div className="card card-bordered flex justify-center items-center h-full w-4/5 bg-gray-900">
      <div className="card-body w-full">
        <h2 className="card-title justify-center">Matches Game</h2>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <div className="order-1 md:order-1 w-full md:w-1/4">
            <p>Hand player</p>
          </div>
          <div className="order-2 md:order-3 w-full md:w-1/4">
            <p>Hand bot</p>
          </div>
          <div className="order-3 md:order-2 w-full md:grow">
            <GameField />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
