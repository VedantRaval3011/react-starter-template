import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { state } = location;
  const { answers, score } = state;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Quiz Results</h1>
      <p className="text-lg mb-4">Your score: {score} / 10</p>
      <div className="w-full max-w-md">
        {answers.map((answer, index) => (
          <div key={index} className="bg-white p-4 mb-2 shadow-lg rounded-lg">
            <p className="font-semibold">{answer.question.num1} {answer.question.operator} {answer.question.num2}</p>
            <p>Your answer: <span className={answer.isCorrect ? 'text-green-500' : 'text-red-500'}>{answer.selectedAnswer}</span></p>
            <p>Status: {answer.isCorrect ? 'Correct' : 'Incorrect'}</p>
          </div>
        ))}
      </div>
      <Link to="/game">
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mt-4">
          Start a new Quix
        </button>
      </Link>
    </div>
  );
};

export default Result;