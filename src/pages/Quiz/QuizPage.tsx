// src/pages/Quiz/QuizPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';
import Button from '../../components/UI/Button';

const QuizPage = () => {
  const {
    currentQuestion,
    setCurrentQuestion,
    selectedAnswers,
    setUserAnswer,
    questions,
    loading,
    error,
    score,
    setScore
  } = useQuiz();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

//   const handleOptionChange = (questionId: number, answer: string) => {
//     setUserAnswer(questionId, answer);
//   };

const handleOptionChange = (questionId: number, answer: string) => {
    console.log('Handling option change for:', questionId, answer);
    setUserAnswer(questionId, answer);
};
  



  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);  // Directly incrementing currentQuestion
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);  // Directly decrementing currentQuestion
    }
  };
  

  const handleSubmit = () => {
    let calculatedScore = 0;

    questions.forEach((question, index) => {
        if (selectedAnswers[index]) {
            selectedAnswers[index].forEach((answer) => {
                if (answer === question.correct_answer) {
                    calculatedScore += 1;
                }
            });
        }
    });

    setScore(calculatedScore); // Update the score based on selected answers
    setSubmitted(true);
    navigate('/results'); // Navigate to results page
};

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Quiz Time!</h1>
      <div id="progress-bar-container" className="w-full max-w-lg mb-6 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-2 bg-blue-600" id="progress-bar" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
      </div>
      {submitted ? (
        <div className="text-center text-lg font-semibold text-green-600">Your quiz has been submitted. Final score: {score}</div>
      ) : (
        <div className="question w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{question.question}</h2>
          <div className="options space-y-3">
            {Object.entries(question.answers).map(([key, answer]) => (
              answer && (
                <div key={key}>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    id={`${question.id}-${key}`}
                    name={`question-${question.id}`}
                    checked={selectedAnswers[question.id]?.includes(answer) || false}
                    onChange={() => handleOptionChange(question.id, answer)}
                  />
                  <label htmlFor={`${question.id}-${key}`}  className="flex items-center bg-gray-50 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50">{answer}</label>
                </div>
              )
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between w-full max-w-lg mt-6">
        <Button variant="secondary" onClick={prevQuestion} disabled={currentQuestion === 0} className="mr-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </Button>
        {currentQuestion < questions.length - 1 ? (
          <Button variant="primary" onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Next
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
