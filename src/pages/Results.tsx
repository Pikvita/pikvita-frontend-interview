
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import {AuroraBackground} from '../components/ui/aurora-background'; // Update this path to your AuroraBackground component

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Question {
  question: string;
  answers: Record<string, string | null>;
  correctAnswers: string[]; // Array of correct answer keys
}

interface LocationState {
  questions: Question[];
  answers: { [key: number]: string[] }; // User-selected answers for each question
  score: number;
}

const Results: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state) {
      console.log("State is null or undefined");
      return;
    }

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      alert("Can't go back after submitting!");
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [state]);

  if (!state) {
    return <div>Loading...</div>;
  }

  const { questions, answers, score } = state;

  const chartData = {
    labels: ["Your Score", "Total Questions"],
    datasets: [
      {
        label: "Quiz Results",
        data: [score, questions.length],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Quiz Results",
      },
    },
  };

  return (
    // <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative flex flex-col gap-6 items-center justify-center px-4 py-8"
      >
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Quiz Results</h1>
          <p className="text-xl text-center mb-4">Your Score: <span className="font-semibold">{score}</span> out of <span className="font-semibold">{questions.length}</span></p>
          
          {/* Bar chart for results */}
          <div className="mt-4">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <ul className="mt-6">
            {questions.map((question, index) => (
              <li key={index} className="mb-4 p-4 border-b border-gray-300">
                <strong>{question.question}</strong><br />
                <span>Your Answer(s): {answers[index]?.join(", ") || "No answer selected"}</span><br />
                <span className="text-green-500">
                  Correct Answer(s): {question.correctAnswers && question.correctAnswers.length > 0 
                    ? question.correctAnswers.join(", ")
                    : "No correct answer available"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    // </AuroraBackground>
  );
};

export default Results;
