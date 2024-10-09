import React from "react";
import classNames from "classnames";
import { TurnStatus } from "types/GameState";

type TurnIndicatorProps = {
  turnStatus: TurnStatus;
};

const TurnIndicator = ({ turnStatus }: TurnIndicatorProps) => {
  return (
    <div
      className="flex justify-center items-center"
      data-tip={
        turnStatus === TurnStatus.PLAYER_TURN ? "Player's turn" : "Bot's turn"
      }
    >
      <div
        className=" tooltip tooltip-left"
        data-tip={
          turnStatus === TurnStatus.PLAYER_TURN ? "Player's turn" : "Bot's turn"
        }
      >
        <label
          className={classNames("swap swap-flip text-4xl", {
            "swap-active": turnStatus === TurnStatus.PLAYER_TURN,
          })}
        >
          <div className="swap-on">🧑</div>
          <div className="swap-off">🤖</div>
        </label>
      </div>
    </div>
  );
};

export default TurnIndicator;
