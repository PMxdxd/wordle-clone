import { MAX_WORD_LENGTH } from "../../constants/settings";
import { Tile } from "./Tile";

type Props = {
  guess: string;
};
export const CurrentRow = ({ guess }: Props) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length));

  return (
    <div className="row">
      {splitGuess.map((letter, i) => (
        <Tile key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Tile key={i} />
      ))}
    </div>
  );
};
