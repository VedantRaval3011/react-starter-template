import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const operators = ['+', '-', 'x', '/'];

const getRandomNumber = () => Math.floor(Math.random() * 10);
const getRandomOperator = () => operators[Math.floor(Math.random() * operators.length)];

const generateQuestion = () => {
  const num1 = getRandomNumber();
  const num2 = getRandomNumber();
  const operator = getRandomOperator();
  let correctAnswer;

  switch (operator) {
    case '+':
      correctAnswer = num1 + num2;
      break;
    case '-':
      correctAnswer = num1 - num2;
      break;
    case 'x':
      correctAnswer = num1 * num2;
      break;
    case '/':
      correctAnswer = num2 !== 0 ? num1 / num2 : num1; // for avoidiing divison by zero
      break;
    default:
      correctAnswer = num1;// for some other unexpected operaters
      break;
  }

  return { num1, num2, operator, correctAnswer: correctAnswer.toFixed(2) };
};

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generatedQuestions = Array.from({ length: 10 }, generateQuestion);
    setQuestions(generatedQuestions);
    setTimer(30);
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;

    const newOptions = generateOptions();
    setOptions(newOptions);
  }, [currentQuestion, questions]);

  const handleNextQuestion = useCallback(() => {
    if (questions.length === 0) return;

    const isCorrect = selectedAnswer === questions[currentQuestion]?.correctAnswer;
    setAnswers([...answers, {
      question: questions[currentQuestion],
      selectedAnswer,
      isCorrect: !!isCorrect,
    }]);

    setSelectedAnswer(null);
    setTimer(30);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/result', { state: { answers, score: score + (isCorrect ? 1 : 0) } });
    }
  }, [questions, currentQuestion, selectedAnswer, answers, score, navigate]);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, handleNextQuestion]);

  const generateOptions = useCallback(() => {
    if (questions.length === 0) return []; 

    const correctAnswer = questions[currentQuestion]?.correctAnswer;
    const options = [correctAnswer];
    while (options.length < 4) {
      const wrongAnswer = (getRandomNumber() * getRandomNumber()).toFixed(2);
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }, [currentQuestion, questions]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Question {currentQuestion + 1} / 10</h1>
      {questions.length > 0 && (
        <>
          <p className="text-xl mb-4">{questions[currentQuestion]?.num1} {questions[currentQuestion]?.operator} {questions[currentQuestion]?.num2}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {options.map((answer, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(answer)}
                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ${selectedAnswer === answer ? 'bg-blue-700' : ''}`}
              >
                {answer}
              </button>
            ))}
          </div>
          <p className="text-lg mb-4">Time left: {timer}s</p>
          <button
            onClick={handleNextQuestion}
            disabled={timer === 0 || selectedAnswer === null}
            className={`px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ${timer === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default GamePage;