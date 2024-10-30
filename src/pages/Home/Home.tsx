import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to QuizApp</h1>
      <p className="text-lg text-gray-700 mb-6">
        Test your knowledge on various topics with our interactive quizzes. 
        Challenge yourself and see how much you know!
      </p>
      <button
        onClick={() => navigate('/quiz')}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;

