import Match from "components/match/Match";
import MatchInfo from "game/MatchInfo";
import useGameContext from "hooks/useGameContext";
import { useMemo } from "react";
import { ActionTypes } from "reducers/GameReducerActions";

export type GameFieldProps = {
  matchInfoes: MatchInfo[];
  onMatchSelect: (id: number) => void;
};

const GameField = ({ matchInfoes, onMatchSelect }: GameFieldProps) => {
  const { state, dispatch } = useGameContext();

  const selectedMatches = useMemo(() => {
    return matchInfoes.filter((info) => info.isSelected);
  }, [matchInfoes]);

  const handleMatchClick = (matchInfo: MatchInfo) => {
    if (!state.gameInstance.isPlayerTurn) {
      return;
    }

    if (
      !matchInfo.isSelected &&
      selectedMatches.length === state.gameInstance.maxMatchesToSelect
    ) {
      return;
    }
    onMatchSelect(matchInfo.id);
  };

  const handlePlayerAction = () => {
    if (!state.gameInstance.isPlayerTurn) {
      return;
    }

    dispatch({
      type: ActionTypes.TAKE_MATCHES,
      payload: {
        matchesCount: selectedMatches.length,
        isPlayer: state.gameInstance.isPlayerTurn,
      },
    });

    dispatch({ type: ActionTypes.NEXT_TURN });
  };

  return (
    <div className="flex flex-col w-full gap-2 divide-y-2 divide-slate-700 p-2">
      <h2 className="text-lg text-center text-info">
        Matches:
        <span className="text-white pl-2">
          {state.gameInstance.matchesLeft}/{state.gameInstance.pileSize}
        </span>
      </h2>
      <div className="grid grid-flow-row gap-y-10 grid-cols-[repeat(auto-fit,_15px)] py-6">
        {matchInfoes.map((info) => (
          <Match
            key={info.id}
            id={info.id}
            isSelected={info.isSelected}
            handleClick={() => handleMatchClick(info)}
          />
        ))}
      </div>
      <h2 className="text-lg text-center text-info">
        Selected:
        <span className="text-white pl-2">
          {selectedMatches.length} / {state.gameInstance.maxMatchesToSelect}
        </span>
      </h2>
      <button
        onClick={handlePlayerAction}
        disabled={
          !state.gameInstance.isPlayerTurn || selectedMatches.length === 0
        }
        className="btn btn-primary"
      >
        {state.gameInstance.isPlayerTurn
          ? selectedMatches.length === 0
            ? "Please select a match"
            : "Take"
          : "Waiting for bot's turn..."}
      </button>
    </div>
  );
};

export default GameField;
