import React from "react";
import classNames from "classnames";
import { TurnStatus } from "types/GameState";

type MatchProps = {
  id: number;
  isSelected: boolean;
  turnStatus: TurnStatus;
  handleClick: (id: number) => void;
};

const Match = ({ id, isSelected, turnStatus, handleClick }: MatchProps) => {
  const isPlayerTurn = turnStatus === TurnStatus.PLAYER_TURN;

  return (
    <div
      onClick={() => handleClick(id)}
      className={classNames("flex flex-col items-center justify-center", {
        "-translate-y-5": isSelected,
      })}
    >
      <div className={classNames("cursor-pointer", { group: isPlayerTurn })}>
        <div
          className={classNames("w-2 h-3 rounded-t-lg group-hover:opacity-50", {
            "bg-red-600": !isSelected,
            "bg-red-500": isSelected,
          })}
        ></div>
        <div
          className={classNames("w-2 h-24 group-hover:opacity-50", {
            "bg-yellow-600": !isSelected,
            "bg-yellow-400": isSelected,
          })}
        ></div>
      </div>
    </div>
  );
};

export default Match;
