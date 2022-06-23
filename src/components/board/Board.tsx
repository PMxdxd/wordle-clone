import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";

type Props = {
  guesses: string[];
  currentGuess: string;
};

export const Board = ({ guesses, currentGuess }: Props) => {
  return (
    <div className="board">
      {guesses.map((guess,i) => (
         <CompletedRow key={i} guess={guess}/>
      ))}
      
      <CurrentRow guess={currentGuess} />

    </div>
  );
};
