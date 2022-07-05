/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "./components/keyboard/Keyboard";
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
} from "./constants/settings";
import "./App.css";
import { Board } from "./components/board/Board";
import { isWinningWord, solution } from "./lib/words";
import { Result } from "./components/modal/Result";
import { Snackbar } from "@mui/material";
import { WORDS } from "./constants/wordlist";

function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
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
    if (isGameWon || isGameLost) {
      return;
    }

    //文字数が足らない
    if (currentGuess.length !== MAX_WORD_LENGTH) {
      return handleToastOpen(NOT_ENOUGH_LETTERS_MESSAGE);
    }

    //存在しないワード
    if (!WORDS.includes(currentGuess.toLowerCase())) {
      return handleToastOpen(WORD_NOT_FOUND_MESSAGE);
    }

    //答えをセット
    if (currentGuess.length === MAX_WORD_LENGTH) {
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess("");
    }

    // setIsGameWon(isWinningWord(currentGuess));
    const winningWord = isWinningWord(currentGuess);
    if (winningWord) {
      setIsGameWon(true);
    }

    //負け
    if (guesses.length >= MAX_CHALLENGES - 1) {
      return handleToastOpen(solution,5000);
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

  const [toastInfo, setToastInfo] = useState({
    open: false,
    toastMessage: "",
    autoHideDuration: 1500,
  });
  const { open, toastMessage, autoHideDuration } = toastInfo;

  const handleToastOpen = (
    message: string,
    autoHideDuration: number = 1500
  ) => {
    setToastInfo({
      open: true,
      toastMessage: message,
      autoHideDuration: autoHideDuration,
    });
  };

  const handleToastClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToastInfo({ ...toastInfo, open: false });
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleToastClose}
        message={toastMessage}
      />
    </div>
  );
}

export default App;
