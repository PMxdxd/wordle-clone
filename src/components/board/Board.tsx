import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from "../../constants/settings";
import { EmptyRow } from "./EmptyRow";

type Props = {
  guesses: string[];
  currentGuess: string;
};

export const Board = ({ guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : [];
  return (
    <div className="board">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < MAX_CHALLENGES  && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};
