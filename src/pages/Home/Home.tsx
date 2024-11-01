import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Home = () => {
  const [currentQuestion] = useLocalStorage<number>('quiz-current-question', 0);

  return (
    <div className="text-center">
      <h1>Welcome to the Quiz App</h1>
      <Link to="/quiz">
        <Button variant="primary" className='m-5 p-5'>Start Quiz</Button>
      </Link>
      {currentQuestion > 0 && (
        <Link to="/quiz">
          <Button variant="secondary" className="ml-2">Resume Quiz</Button>
        </Link>
      )}
    </div>
  );
};

export default Home;
