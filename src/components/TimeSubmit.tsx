import { FaClock } from 'react-icons/fa';
import { useQuiz } from '../hooks/useQuiz';

const TimeSubmit: React.FC = () => {
  const { calculateScore, score, questions } = useQuiz();

  const handleSubmit = () => {
    calculateScore();
    // Add logic to show results modal/page
    alert(`Your score: ${score}/${questions.length}`);
  };

  return (
    <div className="container mx-auto p-4 pt-[3rem] max-w-screen-lg">
      <div className="flex items-center justify-between p-4 border w-full bg-white">
        <div className="flex items-center space-x-2">
          <FaClock className="text-gray-600 h-6 w-6" />
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Time remaining</span>
            <span className="font-semibold text-lg text-gray-900">14:44:00</span>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TimeSubmit;
