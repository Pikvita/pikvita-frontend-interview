import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Question = {
  id: number;
  question: string;
  correct_answers: {
    answer_a_correct: string;
    answer_b_correct: string;
    answer_c_correct: string;
    answer_d_correct: string;
  };
  answers: {
    answer_a: string | null;
    answer_b: string | null;
    answer_c: string | null;
    answer_d: string | null;
  };
};

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          'https://quizapi.io/api/v1/questions?apiKey=M7RT7dicTsTgRWHPM4LqiwuNuiHK9VmtPIuFZOnY&category=code&difficulty=Easy&limit=10&tags=JavaScript'
        );
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelection = (answer: string) => {
    if (!isSubmitted) {
      setSelectedAnswers((prevAnswers) => {
        const currentAnswers = prevAnswers[currentIndex] || [];
        const updatedAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter((a) => a !== answer)
          : [...currentAnswers, answer];
        return { ...prevAnswers, [currentIndex]: updatedAnswers };
      });
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;

    questions.forEach((question, index) => {
      const correctAnswers = Object.entries(question.correct_answers)
        .filter(([, value]) => value === 'true')
        .map(([key]) => key.replace('_correct', ''));
      const userAnswers = selectedAnswers[index] || [];

      if (JSON.stringify(correctAnswers.sort()) === JSON.stringify(userAnswers.sort())) {
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    setScore(correct);
    setIsSubmitted(true);
    setChartData({ correct, incorrect });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? questions.length - 1 : prevIndex - 1));
  };

  if (loading) return <p>Loading...</p>;
  if (questions.length === 0) return <p>No questions available</p>;

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Quiz</h1>
      </div>
      <div className="quiz-progress-container">
        <div className="quiz-progress" style={{ width: `${progress}%` }} />
      </div>
      <p>{`Question ${currentIndex + 1} of ${totalQuestions}`}</p>
      <div className="quiz-question-container">
        <p className="quiz-question">{currentQuestion.question}</p>
        <ul className="quiz-options">
          {Object.entries(currentQuestion.answers).map(
            ([key, answer]) =>
              answer && (
                <li
                  key={key}
                  className={selectedAnswers[currentIndex]?.includes(key) ? 'selected' : ''}
                  onClick={() => handleAnswerSelection(key)}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedAnswers[currentIndex]?.includes(key) || false}
                      onChange={() => handleAnswerSelection(key)}
                      disabled={isSubmitted}
                    />
                    {answer}
                  </label>
                </li>
              )
          )}
        </ul>
      </div>
      <div className="quiz-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isSubmitted}
          className="quiz-button"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === totalQuestions - 1 || isSubmitted}
          className="quiz-button"
        >
          Next
        </button>
      </div>
      {currentIndex === totalQuestions - 1 && !isSubmitted && (
        <button onClick={calculateScore} className="submit-button">
          Submit Quiz
        </button>
      )}
      {isSubmitted && (
        <div className="quiz-score">
          <h2>Your Score: {score}/{totalQuestions}</h2>
          <Bar
            data={{
              labels: ['Correct', 'Incorrect'],
              datasets: [
                {
                  label: 'Quiz Results',
                  data: [chartData.correct, chartData.incorrect],
                  backgroundColor: ['#4caf50', '#f44336'],
                  borderColor: ['#388e3c', '#d32f2f'],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Questions;
