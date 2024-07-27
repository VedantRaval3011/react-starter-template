import { getRandomNumber, getRandomOperator, calculateAnswer } from './mathUtils';

export const generateQuestion = () => {
  const num1 = getRandomNumber();
  const num2 = getRandomNumber();
  const operator = getRandomOperator();
  const correctAnswer = calculateAnswer(num1, num2, operator);

  return { num1, num2, operator, correctAnswer: correctAnswer.toFixed(2) };
};

export const generateOptions = (correctAnswer, currentQuestion, questions) => {
  if (questions.length === 0) return [];

  const options = [correctAnswer];
  while (options.length < 4) {
    const wrongAnswer = (getRandomNumber() * getRandomNumber()).toFixed(2);
    if (!options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};
