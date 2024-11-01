// src/pages/Quiz/ResultsPage.tsx

import { useQuiz } from '../../context/QuizContext';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    // Add more controllers/elements if needed
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarController,
    BarElement
  );
  
const ResultsPage = () => {
  const { questions, score, selectedAnswers } = useQuiz();

  const data = {
    labels: questions.map((q) => q.question),
    datasets: [
      {
        label: 'Score',
        data: questions.map((q) => (selectedAnswers[q.id]?.includes(q.correct_answer) ? 1 : 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Quiz Results',
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Questions',
        },
        ticks: {
          callback: (_: string | number, index: number) => `Q${index + 1}`, // Label as Q1, Q2, etc.
          // Use `callback: () => ""` if you want no labels on the x-axis.
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Score',
        },
      },
    },
  };
  
  
  return (
    <div>
      <h2>Your Score: {score}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ResultsPage;
