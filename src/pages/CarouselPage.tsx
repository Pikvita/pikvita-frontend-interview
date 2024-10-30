
// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import React, { useEffect, useState } from "react";
// import { AuroraBackground } from "../components/ui/aurora-background"; // Adjust the import path if necessary
// import { fetchQuestions } from "../api/api"; // Adjust the import path as needed

// interface Question {
//   id: number;
//   question: string;
//   answers: Record<string, string | null>;
//   correctAnswers: string[]; // Add correct answers to check user responses
// }

// const CarouselPage = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(new Set());
//   const [loading, setLoading] = useState(true);
//   const [score, setScore] = useState(0);
//   const totalQuestions = questions.length;

//   useEffect(() => {
//     const loadQuestions = async () => {
//       setLoading(true);
//       const data = await fetchQuestions();
//       console.log("Fetched Questions:", data); // Debug: Log fetched questions
//       if (data.length > 0) {
//         setQuestions(data);
//       } else {
//         console.error("No questions fetched."); // Handle case with no questions
//       }
//       setLoading(false);
//     };

//     // Load questions from local storage if available
//     const savedProgress = localStorage.getItem("quizProgress");
//     if (savedProgress) {
//       const { index, answers } = JSON.parse(savedProgress);
//       setCurrentIndex(index);
//       setSelectedAnswers(new Set(answers));
//     }

//     loadQuestions();
//   }, []);

//   const handleAnswerSelection = (answer: string) => {
//     setSelectedAnswers((prev) => {
//       const updatedAnswers = new Set(prev);
//       if (updatedAnswers.has(answer)) {
//         updatedAnswers.delete(answer);
//       } else {
//         updatedAnswers.add(answer);
//       }
//       return updatedAnswers;
//     });
//   };

//   const handleNext = () => {
//     // Ensure the current question is valid before proceeding
//     const currentQuestion = questions[currentIndex];
//     if (!currentQuestion) {
//       console.error("Current question is undefined"); // Debug: Log when current question is undefined
//       return;
//     }

//     // Check if the current question is correctly answered
//     const isCorrect = currentQuestion.correctAnswers.every((ans) => selectedAnswers.has(ans));
//     console.log("Current Question:", currentQuestion); // Debug: Log current question
//     console.log("Selected Answers:", Array.from(selectedAnswers)); // Debug: Log selected answers

//     if (isCorrect) {
//       setScore((prev) => prev + 1);
//     }

//     // Save progress to local storage
//     localStorage.setItem(
//       "quizProgress",
//       JSON.stringify({ index: currentIndex + 1, answers: Array.from(selectedAnswers) })
//     );

//     // Move to the next question
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//     setSelectedAnswers(new Set()); // Clear selected answers for the next question
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//       const previousQuestion = questions[currentIndex - 1];
//       setSelectedAnswers(new Set(previousQuestion.correctAnswers)); // Optionally keep correct answers
//     }
//   };

//   const handleSubmit = () => {
//     const finalScore = score + (selectedAnswers.size ? (selectedAnswers.has(questions[currentIndex].correctAnswers[0]) ? 1 : 0) : 0);
//     alert(`Your final score is: ${finalScore} / ${totalQuestions}`);
//     localStorage.removeItem("quizProgress"); // Clear progress after completion
//     setCurrentIndex(0);
//     setScore(0);
//     setSelectedAnswers(new Set());
//   };

//   const progressBarWidth = ((currentIndex + 1) / totalQuestions) * 100; // Calculate progress

//   return (
//     <AuroraBackground>
//       <motion.div
//         initial={{ opacity: 0.0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{
//           delay: 0.3,
//           duration: 0.8,
//           ease: "easeInOut",
//         }}
//         className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
//       >
//         <div className="text-4xl md:text-6xl dark:text-white text-center font-extrabold">
//           Test Your Skills
//           <br />
//           <span className="bg-gradient-to-r from-pink-500 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
//             Challenge Yourself
//           </span>
//         </div>

//         {loading ? (
//           <div className="text-xl text-white">Loading questions...</div>
//         ) : (
//           <div className="flex flex-col items-center">
//             <div className="w-full bg-gray-300 rounded-full">
//               <div
//                 className="bg-blue-500 h-2 rounded-full"
//                 style={{ width: `${progressBarWidth}%` }}
//               />
//             </div>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentIndex}
//                 initial={{ x: 100, opacity: 0 }} // Start from the right
//                 animate={{ x: 0, opacity: 1 }} // Slide in from right
//                 exit={{ x: -100, opacity: 0 }} // Slide out to the left
//                 transition={{ duration: 0.5 }} // Adjust the duration for smoothness
//                 className="p-6"
//               >
//                 {questions[currentIndex] && ( // Check if current question exists
//                   <>
//                     <div className="text-2xl md:text-3xl dark:text-white font-semibold text-center">
//                       {questions[currentIndex].question}
//                     </div>
//                     <div className="mt-4 flex flex-col gap-2">
//                       {Object.entries(questions[currentIndex].answers).map(
//                         ([key, answer]) =>
//                           answer && (
//                             <button
//                               key={key}
//                               onClick={() => handleAnswerSelection(answer)}
//                               className={`bg-neutral-800 dark:bg-white dark:text-black text-white px-4 py-2 rounded-full ${
//                                 selectedAnswers.has(answer) ? "ring-2 ring-blue-500" : ""
//                               }`}
//                             >
//                               {answer}
//                             </button>
//                           )
//                       )}
//                     </div>
//                   </>
//                 )}
//               </motion.div>
//             </AnimatePresence>

//             <div className="flex gap-4">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentIndex === 0} // Disable if at the first question
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={selectedAnswers.size === 0} // Disable if no answer is selected
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>

//             {currentIndex === totalQuestions - 1 && (
//               <div className="mt-6">
//                 <button
//                   onClick={handleSubmit}
//                   className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                   Submit Quiz
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </motion.div>
//     </AuroraBackground>
//   );
// };

// export default CarouselPage;




"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "../components/ui/aurora-background"; // Adjust the import path if necessary
import { fetchQuestions } from "../api/api"; // Adjust the import path as needed
import { Bar } from "react-chartjs-2";

interface Question {
  id: number;
  question: string;
  answers: Record<string, string | null>;
  correctAnswers: string[];
}

const CarouselPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const totalQuestions = questions.length;

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const data = await fetchQuestions();
      console.log("Fetched Questions:", data);
      if (data.length > 0) {
        setQuestions(data);
      } else {
        console.error("No questions fetched.");
      }
      setLoading(false);
    };

    const savedProgress = localStorage.getItem("quizProgress");
    if (savedProgress) {
      const { index, answers } = JSON.parse(savedProgress);
      setCurrentIndex(index);
      setSelectedAnswers(new Set(answers));
    }

    loadQuestions();
  }, []);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = new Set(prev);
      if (updatedAnswers.has(answer)) {
        updatedAnswers.delete(answer);
      } else {
        updatedAnswers.add(answer);
      }
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    // Check if the current question is correctly answered
    const isCorrect = currentQuestion.correctAnswers.every((ans) => selectedAnswers.has(ans));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    localStorage.setItem(
      "quizProgress",
      JSON.stringify({ index: currentIndex + 1, answers: Array.from(selectedAnswers) })
    );

    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswers(new Set());
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      const previousQuestion = questions[currentIndex - 1];
      setSelectedAnswers(new Set(previousQuestion.correctAnswers)); // Optionally keep correct answers
    }
  };

  const handleSubmit = () => {
    const finalScore = score + (selectedAnswers.size ? (selectedAnswers.has(questions[currentIndex].correctAnswers[0]) ? 1 : 0) : 0);
    alert(`Your final score is: ${finalScore} / ${totalQuestions}`);
    localStorage.removeItem("quizProgress"); // Clear progress after completion
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswers(new Set());
    setQuizCompleted(true);
  };

  const progressBarWidth = ((currentIndex + 1) / totalQuestions) * 100;

  // Chart data for results display
  const chartData = {
    labels: questions.map(q => q.question),
    datasets: [
      {
        label: 'Your Score',
        data: questions.map((q, index) => (q.correctAnswers.every(ans => selectedAnswers.has(ans)) ? 1 : 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      >
        <div className="text-4xl md:text-6xl dark:text-white text-center font-extrabold">
          Test Your Skills
          <br />
          <span className="bg-gradient-to-r from-pink-500 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Challenge Yourself
          </span>
        </div>

        {loading ? (
          <div className="text-xl text-white">Loading questions...</div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full bg-gray-300 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progressBarWidth}%` }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6"
              >
                {questions[currentIndex] && (
                  <>
                    <div className="text-2xl md:text-3xl dark:text-white font-semibold text-center">
                      {questions[currentIndex].question}
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      {Object.entries(questions[currentIndex].answers).map(
                        ([key, answer]) =>
                          answer && (
                            <button
                              key={key}
                              onClick={() => handleAnswerSelection(answer)}
                              className={`bg-neutral-800 dark:bg-white dark:text-black text-white px-4 py-2 rounded-full ${
                                selectedAnswers.has(answer) ? "ring-2 ring-blue-500" : ""
                              }`}
                            >
                              {answer}
                            </button>
                          )
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={selectedAnswers.size === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {currentIndex === totalQuestions - 1 && (
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Submit Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {quizCompleted && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-white">Results</h2>
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        )}
      </motion.div>
    </AuroraBackground>
  );
};

export default CarouselPage;
