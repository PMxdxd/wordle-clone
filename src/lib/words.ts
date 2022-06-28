import { WORDS } from "../constants/wordlist";

export const isWinningWord = (word: string) => {
  return solution === word;
};

const getSolution = () => {
  const listLength = WORDS.length;
  const randomInt = getRandomInt(listLength);
  console.log( WORDS[randomInt].toUpperCase())
  return WORDS[randomInt].toUpperCase();
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const solution = getSolution();
