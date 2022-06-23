import { useState } from "react";
import { Keyboard } from "./components/keyboard/Keyboard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [currentGuess,setCurrentGuess] = useState('')

  const onChar = (value: String) => {
    setCurrentGuess(`${currentGuess}${value}`)
  }
  return (
    <div className="App">
      <header className="App-header"></header>

      <div id="game">
        <Keyboard onChar={onChar}/>
      </div>
    </div>
  );
}

export default App;
