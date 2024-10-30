import { useQuiz } from '../hooks/useQuiz';

interface PaginationTabProps {
  totalPages?: number;
}

const PaginationTab: React.FC<PaginationTabProps> = ({ totalPages = 10 }) => {
  const { currentQuestion, setCurrentQuestion, questions } = useQuiz();
  const currentPage = currentQuestion + 1;

  const handleClick = (page: number) => {
    setCurrentQuestion(page - 1);
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>
      
      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            className={`px-4 py-2 border rounded-lg font-semibold ${
              currentPage === pageNumber ? 'bg-green-900 text-white' : 'bg-white text-gray-700'
            } hover:bg-gray-200`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === questions.length}
        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationTab;
