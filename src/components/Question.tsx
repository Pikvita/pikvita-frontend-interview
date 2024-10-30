import { useQuiz } from '../hooks/useQuiz';

const Question: React.FC = () => {
  const { 
    questions, 
    currentQuestion, 
    userAnswers, 
    setUserAnswers 
  } = useQuiz();

  if (questions.length === 0) return <div>Loading...</div>;

  const question = questions[currentQuestion];
  const options = Object.entries(question.answers)
    .filter(([_, value]) => value !== null)
    .map(([key, value]) => ({
      id: key,
      text: value as string
    }));

  const handleOptionClick = (answerId: string) => {
    setUserAnswers(question.id, answerId);
  };

  return (
    <div className="bg-white w-full">
      <h2 className="text-lg font-semibold mb-2">
        Question {currentQuestion + 1} of {questions.length}
      </h2>
      <p className="text-gray-700 mb-4">{question.question}</p>
      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`flex items-center justify-center p-3 border rounded-lg font-semibold ${
              userAnswers[question.id] === option.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700'
            } hover:bg-blue-500 hover:text-white transition duration-150`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
