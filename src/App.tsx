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
  WIN_MESSAGES,
  LOSS_MESSAGES,
  WIN_SUB_MESSAGES,
  LOSS_SUB_MESSAGES,
} from "./constants/settings";
import "./App.css";
import { Board } from "./components/board/Board";
import { isWinningWord, solution } from "./lib/words";
import { Button, Modal, Snackbar } from "@mui/material";
import { WORDS } from "./constants/wordlist";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { shareStatus } from "./lib/share";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [shareResultText, setShareResultText] = useState("");
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

    //答えをセット
    if (currentGuess.length === MAX_WORD_LENGTH) {
      setGuesses((prev) => [...prev, currentGuess]);
      setCurrentGuess("");
    }

    // setIsGameWon(isWinningWord(currentGuess));
    const winningWord = isWinningWord(currentGuess);
    if (winningWord) {
      setIsGameWon(true);
      handleModalOpen();
      return;
    }

    //負け
    if (guesses.length >= MAX_CHALLENGES - 1) {
      setIsGameLost(true);
      handleModalOpen();
      handleToastOpen(solution, 5000);
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

      const lowerkey = key.toLowerCase();
      const canTypeKey =
        (key.length === 1 && lowerkey >= "a" && lowerkey <= "z") ||
        ("0" <= key && "9" >= key) ||
        key === "-";
      if (canTypeKey) onChar(lowerkey);
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

  const resultCopy = () => {
    const resultText = shareStatus(guesses, isGameWon);
    navigator.clipboard.writeText(resultText);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {isGameWon ? WIN_MESSAGES : LOSS_MESSAGES}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {isGameWon ? WIN_SUB_MESSAGES : LOSS_SUB_MESSAGES}
            </Typography>
            <div
              css={css`
                display: flex;
                justify-content: right;
              `}
            >
              <Button variant="contained" onClick={() => resultCopy()}>
                Share
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default App;
