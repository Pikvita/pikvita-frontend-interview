import { useQuiz } from '../../hooks/useQuiz';
import { Pie } from '@ant-design/plots';
import { useNavigate } from 'react-router-dom';

const Results: React.FC = () => {
  const { questions, userAnswers, score } = useQuiz();
  const navigate = useNavigate();

  const percentage = Math.round((score / questions.length) * 100);

  const chartData = [
    { type: 'Correct', value: score },
    { type: 'Incorrect', value: questions.length - score }
  ];

  const config = {
    appendPadding: 10,
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    colors: ['#4CAF50', '#f44336'], // Green for correct, Red for incorrect
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto py-12 max-w-screen-lg">
      <div className="bg-white border p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Quiz Results</h1>
        
        <div className="text-center mb-8">
          <p className="text-6xl font-bold text-primary-600">{percentage}%</p>
          <p className="text-xl mt-2">Score: {score} out of {questions.length}</p>
        </div>

        <div className="flex justify-center mb-8">
          <Pie {...config} />
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswerIds = userAnswers[question.id] || [];
            const correctAnswers = Object.keys(question.correct_answers).filter(
              (key) => question.correct_answers[key] === "true"
            );

            return (
              <div key={question.id} className="border-b pb-4">
                <p className="font-semibold mb-2">
                  Question {index + 1}: {question.question}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(question.answers)
                    .filter(([_, value]) => value !== null)
                    .map(([key, value]) => {
                      const isSelected = userAnswerIds.includes(key);
                      const isCorrect = correctAnswers.includes(`${key}_correct`);

                      return (
                        <div
                          key={key}
                          className={`p-3 rounded-lg ${
                            isSelected && isCorrect ? 'bg-green-100 border-green-500' :
                            isSelected && !isCorrect ? 'bg-red-100 border-red-500' :
                            !isSelected && isCorrect ? 'bg-green-50 border-green-200' :
                            'bg-gray-50 border-gray-200'
                          } border`}
                        >
                          <p>{value}</p>
                          {isSelected && (
                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {isCorrect ? '✓' : '✗'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleReturnHome}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;