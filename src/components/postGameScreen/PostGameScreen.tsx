import React from "react";
import classNames from "classnames";
import useGameContext from "hooks/useGameContext";
import { ActionTypes } from "reducers/GameReducerActions";
import GameStatus from "types/GameStatus";
import getWinner from "utils/getWinner";

const PostGameScreen = () => {
  const { state, dispatch } = useGameContext();

  const winner = getWinner(
    state.gameInstance.player.currentMatches,
    state.gameInstance.bot.currentMatches
  );

  const playerWinnerTitle = (
    <>
      🎉 Congratulations!
      <span className="ml-1 font-normal">The player has won!</span>
    </>
  );

  const botWinnerTitle = (
    <>
      🤖 Bot has won!
      <span className="ml-1 font-normal">Better luck next time</span>
    </>
  );

  const handlePlayAgainClick = () => {
    dispatch({
      type: ActionTypes.SET_GAME_STATUS,
      payload: { gameStatus: GameStatus.PreGame },
    });
  };

  return (
    <div className="card card-bordered flex justify-center items-center h-full bg-gray-900">
      <div className="card-body">
        <h2 className="card-title justify-center font-bold">End of Game</h2>
        <p className="text-lg font-semibold text-center">
          {winner === "player" && playerWinnerTitle}
          {winner === "bot" && botWinnerTitle}
        </p>
        <div className="border border-1 rounded border-slate-700 p-2">
          <p
            className={classNames({
              "font-semibold text-success": winner === "player",
            })}
          >
            Player has {state.gameInstance.player.currentMatches} matches.
          </p>
          <p
            className={classNames({
              "font-semibold text-success": winner === "bot",
            })}
          >
            Bot has {state.gameInstance.bot.currentMatches} matches.
          </p>
        </div>
        <div className="card-actions justify-center">
          <button
            onClick={handlePlayAgainClick}
            className="btn btn-primary w-full"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostGameScreen;
