import { useState } from 'react';

interface PaginationTabProps {
  totalPages?: number;
}

const PaginationTab: React.FC<PaginationTabProps> = ({ totalPages = 10 }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePrev}
        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {[...Array(Math.min(10, totalPages)).keys()].map((_, index) => {
        const pageNumber = index + 1;
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
      {totalPages > 10 && (
        <>
          <span className="px-4 py-2">...</span>
          <button
            onClick={() => handleClick(totalPages)}
            className={`px-4 py-2 border rounded-lg font-semibold ${
              currentPage === totalPages ? 'bg-green-900 text-white' : 'bg-white text-gray-700'
            } hover:bg-gray-200`}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={handleNext}
        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationTab;
