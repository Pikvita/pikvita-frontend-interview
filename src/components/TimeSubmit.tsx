import { FaClock } from 'react-icons/fa';
import { useQuiz } from '../hooks/useQuiz';
import { useNavigate } from 'react-router-dom';

const TimeSubmit: React.FC = () => {
  const { calculateScore, setIsSubmitted, score, questions } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = () => {
    calculateScore();
    setIsSubmitted(true);
    navigate('/results');
  };

  const handleViewResult = () => {
    navigate('/results');
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
        <div className="flex space-x-4">
          <button 
            onClick={handleSubmit}
            className="bg-green-900 text-white py-2 px-4 rounded-lg hover:bg-green-800"
          >
            Submit
          </button>
          <button 
            onClick={handleViewResult}
            className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
          >
            View Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSubmit;
