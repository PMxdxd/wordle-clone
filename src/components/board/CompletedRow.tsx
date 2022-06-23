import { getGuessStatuses } from "../../lib/statuses";
import { Tile } from "./Tile";

type Props = {
  guess: string;
  isRevealing?: boolean;
};

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess);
  const splitGuess = guess.split("");
  return (
    <div className="row">
      {splitGuess.map((letter, i) => (
        <Tile key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  );
};
