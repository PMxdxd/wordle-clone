import { useState } from "react";
import { Keyboard } from "./components/keyboard/Keyboard";
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from "./constants/settings";
import "./App.css";
import { Board } from "./components/board/board";

function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);

  const onChar = (value: String) => {
    if (`${currentGuess}${value}`.length <= MAX_WORD_LENGTH) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onEnter = () => {
    //答えをセット
    if (currentGuess.length === MAX_WORD_LENGTH) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
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
    </div>
  );
}

export default App;
