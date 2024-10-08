type MatchProps = {
  id: number;
  isSelected: boolean;
  handleClick: (id: number) => void;
};

const Match = ({ id, isSelected, handleClick }: MatchProps) => {
  return (
    <div
      onClick={() => handleClick(id)}
      className={`flex flex-col items-center justify-center ${
        isSelected ? "-translate-y-5" : ""
      }`}
    >
      <div className="group">
        <div
          className={`w-2 h-3 rounded-t-lg group-hover:opacity-50 ${
            isSelected ? "bg-red-500" : "bg-red-600"
          }`}
        ></div>
        <div
          className={`w-2 h-24 group-hover:opacity-50 ${
            isSelected ? "bg-yellow-400" : "bg-yellow-600"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Match;
