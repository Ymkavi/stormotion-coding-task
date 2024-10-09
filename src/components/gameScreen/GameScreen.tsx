import { ComputerDesktopIcon, UserIcon } from "@heroicons/react/24/outline";
import GameField from "components/gameField/GameField";
import Hand from "components/hand/Hand";
import TurnIndicator from "components/turnIndicator/TurnIndicator";
import useGameContext from "hooks/useGameContext";
import { useEffect } from "react";
import { ActionTypes } from "reducers/GameReducerActions";
import { ActorType } from "types/Actor";

const GameScreen = () => {
  const { state, dispatch } = useGameContext();

  useEffect(() => {
    dispatch({
      type: ActionTypes.CREATE_MATCHES,
      payload: { count: state.gameInstance.matchesLeft },
    });
  }, [dispatch, state.gameInstance.matchesLeft]);

  const getHandTitle = (actorType: ActorType) => {
    return (
      <div className="flex items-center justify-center-center">
        {actorType === "player" && (
          <>
            <UserIcon className="size-5 mr-2 text-yellow-300" />
            <p className="text-center">Player's matches</p>
          </>
        )}
        {actorType === "bot" && (
          <>
            <ComputerDesktopIcon className="size-5 mr-2 text-blue-300" />
            <p className="text-center">Bot's matches</p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="card card-bordered flex justify-center items-center h-full w-4/5 bg-gray-900">
      <div className="card-body w-full">
        <h2 className="card-title justify-center font-bold">Matches Game</h2>
        <TurnIndicator turnStatus={state.turnStatus} />
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <div className="order-1 md:order-1 w-full md:w-1/4">
            <Hand
              title={getHandTitle("player")}
              actor={state.gameInstance.player}
            />
          </div>
          <div className="order-2 md:order-3 w-full md:w-1/4">
            <Hand title={getHandTitle("bot")} actor={state.gameInstance.bot} />
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
