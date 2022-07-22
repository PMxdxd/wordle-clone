import { GAME_TITLE, MAX_CHALLENGES } from "../constants/settings";
import { getGuessStatuses } from "./statuses";

export const shareStatus = (guesses: string[], win: boolean) => {
  const textToShare =
    `${GAME_TITLE}  ${win ? guesses.length : "X"}/${MAX_CHALLENGES}\n\n` +
    generateEmojiGrid(guesses);

  return textToShare;
};

const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const statuses = getGuessStatuses(guess);

      return statuses
        .map((status, i) => {
          switch (status) {
            case "correct":
              return "🟩";
            case "present":
              return "🟨";
            default:
              return "⬜";
          }
        })
        .join("");
    })
    .join("\n");
};
