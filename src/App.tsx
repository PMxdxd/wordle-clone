import { useState } from "react";
import { Keyboard } from "./components/keyboard/Keyboard";
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from "./constants/settings";
import "./App.css";

function App() {
  const [currentGuess, setCurrentGuess] = useState("");

  const onChar = (value: String) => {
    if (`${currentGuess}${value}`.length <= MAX_WORD_LENGTH) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onEnter = () => {
    
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }
  return (
    <div className="App">
      <header className="App-header"></header>

      <div id="game">
        <Keyboard onChar={onChar} onDelete={onDelete} onEnter={onEnter} />
      </div>
    </div>
  );
}

export default App;
