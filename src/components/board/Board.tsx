import { CurrentRow } from "./CurrentRow";

type Props = {
  guesses: string[];
  currentGuess: string;
};

export const Board = ({ guesses, currentGuess }: Props) => {
  return (
    <div className="board">
      <CurrentRow guess={currentGuess} />
    </div>
  );
};
