import Match from "components/match/Match";
import { BotDecisionDelay, chooseMatchesWithDelay } from "game/Bot";
import MatchInfo from "types/MatchInfo";
import useGameContext from "hooks/useGameContext";
import { useEffect, useMemo } from "react";
import { ActionTypes } from "reducers/GameReducerActions";
import { TurnStatus } from "types/GameState";
import getRandomIntegerInclusive from "utils/getRandomIntegerInclusive";
import getRandomObjects from "utils/getRandomObjects";
import GameStatus from "types/GameStatus";

const GameField = () => {
  const { state, dispatch } = useGameContext();

  const selectedMatches = useMemo(() => {
    return state.matches.filter((info) => info.isSelected);
  }, [state.matches]);

  const handleMatchClick = (matchInfo: MatchInfo) => {
    if (state.turnStatus !== TurnStatus.PLAYER_TURN) {
      return;
    }

    if (
      !matchInfo.isSelected &&
      selectedMatches.length === state.gameInstance.maxMatchesToSelect
    ) {
      return;
    }

    dispatch({ type: ActionTypes.SELECT_MATCH, payload: { matchInfo } });
  };

  const handlePlayerAction = () => {
    if (state.turnStatus !== TurnStatus.PLAYER_TURN) {
      return;
    }

    dispatch({
      type: ActionTypes.TAKE_MATCHES,
      payload: {
        matchesCount: selectedMatches.length,
        actorType: "player",
      },
    });

    dispatch({
      type: ActionTypes.SET_TURN_STATUS,
      payload: { turnStatus: TurnStatus.WAIT_BOT_TO_CHOOSE },
    });
  };

  // bot choose matches
  useEffect(() => {
    if (
      state.turnStatus !== TurnStatus.WAIT_BOT_TO_CHOOSE ||
      selectedMatches.length !== 0 ||
      state.matches.length === 0
    ) {
      return;
    }

    const handleBotAction = async () => {
      // TODO: Make AI smarter
      const randomCount = getRandomIntegerInclusive(
        1,
        state.gameInstance.maxMatchesToSelect
      );
      const randomMatches = getRandomObjects(state.matches, randomCount);

      await chooseMatchesWithDelay((matchInfo: MatchInfo) => {
        dispatch({ type: ActionTypes.SELECT_MATCH, payload: { matchInfo } });
      }, randomMatches);

      setTimeout(() => {
        dispatch({
          type: ActionTypes.SET_TURN_STATUS,
          payload: { turnStatus: TurnStatus.BOT_TURN },
        });
      }, BotDecisionDelay);
    };

    handleBotAction();
  }, [
    dispatch,
    selectedMatches.length,
    state.gameInstance.maxMatchesToSelect,
    state.matches,
    state.turnStatus,
  ]);

  // bot takes matches
  useEffect(() => {
    if (
      state.turnStatus !== TurnStatus.BOT_TURN ||
      selectedMatches.length === 0 ||
      state.matches.length === 0
    ) {
      return;
    }

    dispatch({
      type: ActionTypes.TAKE_MATCHES,
      payload: {
        matchesCount: selectedMatches.length,
        actorType: "bot",
      },
    });

    dispatch({
      type: ActionTypes.SET_TURN_STATUS,
      payload: { turnStatus: TurnStatus.PLAYER_TURN },
    });
  }, [
    dispatch,
    selectedMatches.length,
    state.matches.length,
    state.turnStatus,
  ]);

  // check if game is ended
  useEffect(() => {
    if (state.gameInstance.matchesLeft <= 0) {
      dispatch({
        type: ActionTypes.SET_GAME_STATUS,
        payload: { gameStatus: GameStatus.PostGame },
      });
    }
  }, [dispatch, state.gameInstance.matchesLeft]);

  const confirmButtonContent = (): JSX.Element => {
    const loadingDots = (
      <span className="loading loading-dots loading-xs"></span>
    );

    if (state.turnStatus === TurnStatus.PLAYER_TURN) {
      if (selectedMatches.length === 0) {
        return <>Please select a match</>;
      }
      return <>Take</>;
    }

    return <>Waiting for bot's turn {loadingDots}</>;
  };

  return (
    <div className="flex flex-col w-full gap-2 border-2 border-slate-700 p-2">
      <h2 className="text-lg text-center text-info">
        Matches:
        <span className="text-white pl-2">
          {state.gameInstance.matchesLeft}/{state.gameInstance.pileSize}
        </span>
      </h2>
      <div className="divider divider-accent"></div>
      <div className="grid grid-flow-row place-content-center gap-y-10 grid-cols-[repeat(auto-fit,_15px)] py-6">
        {state.matches.map((info) => (
          <Match
            key={info.id}
            id={info.id}
            isSelected={info.isSelected}
            turnStatus={state.turnStatus}
            handleClick={() => handleMatchClick(info)}
          />
        ))}
      </div>
      <div className="divider divider-accent"></div>
      <h2 className="text-lg text-center text-info">
        Selected:
        <span className="text-white pl-2">
          {selectedMatches.length} / {state.gameInstance.maxMatchesToSelect}
        </span>
      </h2>
      <button
        onClick={handlePlayerAction}
        disabled={
          state.turnStatus != TurnStatus.PLAYER_TURN ||
          selectedMatches.length === 0
        }
        className="btn btn-primary"
      >
        {confirmButtonContent()}
      </button>
    </div>
  );
};

export default GameField;
