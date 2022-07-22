export const isWinningWord = (word: string) => {
  return solution === word;
};

const getSolution = () => {
  const name = getRandomInt(2) === 0 ? "kevin" : "tenga-";
  const number = ("0000" + getRandomInt(9999)).slice(-4);

  console.log(`${name}${number}${name == "kevin" ? "g" : ""}`);
  return `${name}${number}${name == "kevin" ? "g" : ""}`;
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const solution = getSolution();
