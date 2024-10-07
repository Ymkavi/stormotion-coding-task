import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  InformationCircleIcon,
  UserIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";

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

type IGameSettings = z.infer<typeof FormSchema>;

interface PreGameScreenProps {
  gameSettings: IGameSettings;
  onGameStart: SubmitHandler<IGameSettings>;
}

const PreGameScreen = ({ gameSettings, onGameStart }: PreGameScreenProps) => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<IGameSettings>({
    mode: "onChange",
    reValidateMode: "onBlur",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      n: gameSettings.n,
      m: gameSettings.m,
      isUserStarts: gameSettings.isUserStarts,
    },
  });

  const watchedN = useWatch({ control, name: "n" });

  // Trigger re-validation of m field on n field change
  useEffect(() => {
    trigger("m");
  }, [trigger, watchedN]);

  const calculatePileSize = (n: number) => n * 2 + 1;

  return (
    <div className="card card-bordered flex justify-center items-center h-full bg-gray-900">
      <div className="card-body">
        <h2 className="card-title justify-center">Game Preferences</h2>
        <form onSubmit={handleSubmit(onGameStart)}>
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
            <input
              {...register("n")}
              className={`input input-bordered ${
                errors.n ? "input-error" : ""
              }`}
            />
            {errors.n && (
              <span className="text-xs text-error">{errors.n.message}</span>
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
            <input
              {...register("m")}
              className={`input input-bordered focus:outline-0 ${
                errors.m ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {errors.m && (
              <span className="text-xs text-red-600 font-semibold">
                {errors.m.message}
              </span>
            )}
          </div>
          <div className="form-control border rounded-lg input-bordered p-2 mb-2">
            <label className="label cursor-pointer flex-col gap-2">
              <span className="label-text self-start">First turn</span>
              <div className="flex items-center gap-2">
                <span className="flex">
                  <ComputerDesktopIcon className="size-6 mr-2 text-blue-300" />{" "}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export { PreGameScreen, type IGameSettings };
