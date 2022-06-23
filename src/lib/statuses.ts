import { solution } from "./words";

export type CharStatus = "absent" | "present" | "correct";

export const getKeyStatuses = (
  gusses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {};
  const splitSolution = solution.split("");

  gusses.forEach((word) => {
    word.split("").forEach((letter, i) => {
      if (!splitSolution.includes(letter)) {
        return (charObj[letter] = "absent");
      }

      if (letter === splitSolution[i]) {
        return (charObj[letter] = "correct");
      }

      if (charObj[letter] !== "correct") {
        //make status present
        return (charObj[letter] = "present");
      }
    });
  });
  return charObj;
};
