import { RouterProvider } from 'react-router-dom';
import Router from './router/Router';
import { QuizProvider } from './context/QuizContext';

const App = () => {
  return (
    <QuizProvider>
      <RouterProvider router={Router} />
    </QuizProvider>
  );
};

export default App;