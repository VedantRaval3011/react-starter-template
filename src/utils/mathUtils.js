const operators = ["+", "-", "x", "/"];

export const getRandomNumber = () => Math.floor(Math.random() * 10);

export const getRandomOperator = () =>
  operators[Math.floor(Math.random() * operators.length)];

export const calculateAnswer = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : num1; // avoid division by zero
    default:
      return num1; // unexpected operators
  }
};
