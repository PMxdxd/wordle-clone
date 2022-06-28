import { MAX_WORD_LENGTH } from "../../constants/settings";
import { Tile } from "./Tile";

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH));

  return (
    <div className="row">
      {emptyCells.map((_,i) => (
        <Tile key={i} />
      ))}
    </div>
  );
};
