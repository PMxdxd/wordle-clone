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
        return (charObj[letter] = "present");
      }
    });
  });
  return charObj;
};

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      statuses[i] = 'absent'
      return
    }

    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
