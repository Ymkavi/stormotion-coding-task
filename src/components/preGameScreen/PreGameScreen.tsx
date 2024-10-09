import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldError, useForm, useWatch } from "react-hook-form";
import {
  InformationCircleIcon,
  UserIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import calculatePileSize from "utils/calculatePileSize";
import GameSettings from "types/GameSettings";
import useGameContext from "hooks/useGameContext";
import { ActionTypes } from "reducers/GameReducerActions";
import classNames from "classnames";

const FormSchema = z
  .object({
    n: z.coerce
      .number({
        required_error: "n is required",
        invalid_type_error: "n must be a number",
      })
      .min(1, { message: "n value must be greater than 1" })
      .max(100, { message: "n value must be less than 100" }),
    m: z.coerce
      .number({
        required_error: "m is required",
        invalid_type_error: "m must be a number",
      })
      .min(1, { message: "m value must be greater than 1" }),
    isUserStarts: z.boolean(),
  })
  .required()
  .refine((input) => input.m < input.n, {
    path: ["m"],
    message: "m must be less than n",
  });

const PreGameScreen = () => {
  const { state, dispatch } = useGameContext();
  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GameSettings>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      n: state.gameSettings.n,
      m: state.gameSettings.m,
      isUserStarts: state.gameSettings.isUserStarts,
    },
  });

  const watchedN = useWatch({ control, name: "n" });

  // Trigger re-validation of m field on n field change
  useEffect(() => {
    trigger("m");
  }, [trigger, watchedN]);

  const handleGameStart = (settings: GameSettings) => {
    dispatch({ type: ActionTypes.SET_GAME_SETTINGS, payload: { settings } });
  };

  const inputStyles = (fieldError?: FieldError) =>
    classNames("input inputBordered", { "input-error": fieldError });

  return (
    <div className="card card-bordered flex justify-center items-center h-full bg-gray-900">
      <div className="card-body">
        <h2 className="card-title justify-center">Game Preferences</h2>
        <form onSubmit={handleSubmit(handleGameStart)}>
          <div className="form-control border rounded-lg input-bordered p-2 mb-2">
            <label className="label">
              <span className="label-text">n</span>
              {!errors.n && (
                <div className="label-text-alt flex flex-row gap-1 items-center">
                  <div className="tooltip" data-tip="Pile Size = 2n+1">
                    <InformationCircleIcon className="size-6 text-blue-500" />
                  </div>
                  <span className="badge badge-accent text-black">
                    Pile Size: {calculatePileSize(watchedN)}
                  </span>
                </div>
              )}
            </label>
            <input {...register("n")} className={inputStyles(errors.n)} />
            {errors.n && (
              <span className="text-xs text-error mt-2">
                {errors.n.message}
              </span>
            )}
          </div>
          <div className="form-control border rounded-lg input-bordered p-2 mb-2">
            <label className="label">
              <span className="label-text">m</span>
              <div className="label-text-alt flex flex-row gap-1 items-center">
                <div
                  className="tooltip"
                  data-tip="Max matches to take on each turn"
                >
                  <InformationCircleIcon className="size-6 text-blue-500" />
                </div>
              </div>
            </label>
            <input {...register("m")} className={inputStyles(errors.m)} />
            {errors.m && (
              <span className="text-xs text-error mt-2">
                {errors.m.message}
              </span>
            )}
          </div>
          <div className="form-control border rounded-lg input-bordered p-2 mb-2">
            <label className="label cursor-pointer flex-col gap-2">
              <span className="label-text self-start">First turn</span>
              <div className="flex items-center gap-2">
                <span className="flex">
                  <ComputerDesktopIcon className="size-6 mr-2 text-blue-300" />
                  Bot
                </span>
                <input
                  type="checkbox"
                  {...register("isUserStarts")}
                  className="toggle"
                />
                <span className="flex">
                  <UserIcon className="size-6 mr-2 text-yellow-300" /> Player
                </span>
              </div>
            </label>
          </div>
          <div className="card-actions justify-center">
            <button type="submit" className="btn btn-primary w-full">
              {isSubmitting ? "Starting..." : "Start"}
            </button>
            <button
              onClick={() => reset()}
              type="button"
              className="btn btn-xs btn-link text-slate-700"
            >
              Reset to default
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreGameScreen;
