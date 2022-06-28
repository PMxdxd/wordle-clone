import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "./components/keyboard/Keyboard";
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from "./constants/settings";
import "./App.css";
import { Board } from "./components/board/Board";
import { isWinningWord, solution } from "./lib/words";
import { Result } from "./components/modal/Result";

function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onChar = (value: String) => {
    setCurrentGuess((prev) => {
      if (
        `${prev}${value}`.length <= MAX_WORD_LENGTH &&
        guesses.length < MAX_CHALLENGES &&
        !isGameWon
      ) {
        return `${prev}${value}`;
      } else {
        return prev;
      }
    });
  };

  const onEnter = () => {
    if (isGameWon) {
      return;
    }

    //答えをセット
    if (currentGuess.length === MAX_WORD_LENGTH) {
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess("");
    }

    // setIsGameWon(isWinningWord(currentGuess));
    const winningWord = isWinningWord(currentGuess);
    if (winningWord) {
    }
  };

  const onDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const keydownFunc = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "Backspace") onDelete();
      if (key === "Enter") onEnter();

      const upperkey = key.toUpperCase();
      const canTypeKey =
        (key.length === 1 && upperkey >= "A" && upperkey <= "Z") ||
        ("0" <= key && "9" >= key) ||
        key === "-";
      if (canTypeKey) onChar(upperkey);
    },
    [currentGuess]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownFunc);
    return () => {
      window.removeEventListener("keydown", keydownFunc);
    };
  }, [keydownFunc]);

  
  const handleModal = () => {
    setShowModal(prev => !prev);
  };
  
  return (
    <div className="App">
      <header className="App-header"></header>

      <div className="game">
        <Board guesses={guesses} currentGuess={currentGuess} />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          gusses={guesses}
        />
      </div>
      <Result showModal={showModal} closeModal={handleModal}></Result>
    </div>
  );
}

export default App;
