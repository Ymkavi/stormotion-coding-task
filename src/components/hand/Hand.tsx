import Actor from "types/Actor";

type HandProps = {
  title: JSX.Element | string;
  actor: Actor;
};

const Hand = ({ title, actor }: HandProps) => {
  return (
    <div className="grid grid-flow-row grid-rows-1 md:grid-rows-[auto_0.75fr_auto_1fr] grid-cols-[auto_1fr_auto] md:grid-cols-1 gap-2 items-center h-full md:px-2">
      <h2 className="flex justify-center text-lg md:text-sm font-semibold">
        {title}
      </h2>
      <div className="md:flex md:justify-center md:h-full">
        <div className="divider divider-accent md:divider-horizontal"></div>
      </div>
      <div className="flex justify-center">
        <span className="countdown font-mono text-xl md:text-6xl p-2 bg-neutral rounded-full md:rounded-box text-neutral-content">
          <span
            style={{ "--value": actor.currentMatches } as React.CSSProperties}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default Hand;
