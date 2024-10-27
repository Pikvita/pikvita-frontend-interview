import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { navigateQuestion, submitQuiz, setQuestions } from './store/quizSlice';
import Question from './components/Question';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { currentQuestionIndex, questions, isSubmitted, score } = useSelector((state) => state.quiz);

  React.useEffect(() => {
    dispatch(setQuestions());
  }, [dispatch]);

  const handlePrevious = () => {
    console.log(handlePrevious)
    if (currentQuestionIndex > 0) dispatch(navigateQuestion(currentQuestionIndex - 1));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) dispatch(navigateQuestion(currentQuestionIndex + 1));
  };

  const handleSubmit = () => {
    dispatch(submitQuiz());
  };

  return (
    <div className=" bg-gradient-to-b to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Your Score</h2>
            <p className="text-5xl font-extrabold text-green-600">{score}</p>
          </div>
        ) : (
          <>
            <Question />
            <div className="flex justify-between mt-8 space-x-4">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
              >
                Next
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-gray-300"
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
