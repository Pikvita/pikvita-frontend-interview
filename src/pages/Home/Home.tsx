import { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../../utils/helpers';
import Header from '../../Layout/Header';
import Button from '../../components/UI/Button';
import Footer from '../../Layout/Footer';
import ResultsChart from '../../components/UI/ResultsChart';

interface Question {
  question: string;
  answers: { [key: string]: string | null };
  correct_answers: { [key: string]: string };
}

const Home = () => {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const savedQuestions = localStorage.getItem('questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    return savedIndex ? JSON.parse(savedIndex) : 0;
  });

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>(() => {
    const savedAnswers = localStorage.getItem('selectedAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!questions.length) {  // Only fetch if questions are not already loaded
        try {
          const fetchedQuestions = await fetchQuizQuestions();
          setQuestions(fetchedQuestions);
          localStorage.setItem('questions', JSON.stringify(fetchedQuestions));
        } catch (error) {
          console.error('Failed to fetch questions:', error);
        }
      }
    };
    loadQuestions();
  }, [questions.length]);

  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex));
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
  }, [currentQuestionIndex, selectedAnswers]);

  const handleOptionSelect = (optionKey: string) => {
    setSelectedAnswers((prev) => {
      const currentSelections = prev[currentQuestionIndex] || [];
      if (currentSelections.includes(optionKey)) {
        return {
          ...prev,
          [currentQuestionIndex]: currentSelections.filter((key) => key !== optionKey),
        };
      } else {
        return {
          ...prev,
          [currentQuestionIndex]: [...currentSelections, optionKey],
        };
      }
    });
  };

  const handleNext = () => {
    const selectedAnswersForCurrentQuestion = selectedAnswers[currentQuestionIndex] || [];
    if (selectedAnswersForCurrentQuestion.length === 0) {
      alert('Please select at least one option before proceeding to the next question.');
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const handleSubmit = () => {
    calculateScore();
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('selectedAnswers');
    localStorage.removeItem('questions');
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      const selectedAnswersForQuestion = selectedAnswers[index] || [];
      const isCorrect = selectedAnswersForQuestion.every(
        (answer) => question.correct_answers[answer + '_correct'] === 'true'
      );
      if (isCorrect) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  if (!questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
        <div className="text-xl font-semibold text-gray-700 mb-4">Loading questions...</div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 justify-center">
      <Header progress={progress} />
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-lg font-bold">{currentQuestion.question}</h2>
        <div className="flex flex-col mt-4">
          {Object.entries(currentQuestion.answers)
            .filter(([, answer]) => answer)
            .map(([key, answer]) => (
              <button
                key={key}
                className={`p-2 mt-2 border rounded ${
                  selectedAnswers[currentQuestionIndex]?.includes(key)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => handleOptionSelect(key)}
              >
                {answer}
              </button>
            ))}
        </div>
        <div className="flex justify-between mt-6">
          {currentQuestionIndex > 0 && (
            <Button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              label="Previous"
            />
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={handleNext} label="Next" />
          ) : (
            <Button onClick={handleSubmit} label="Submit" />
          )}
        </div>
        {score !== null && (
          <div className="mt-6">
            <Footer score={score} totalQuestions={questions.length} />
            <ResultsChart correctAnswers={score} totalQuestions={questions.length} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
