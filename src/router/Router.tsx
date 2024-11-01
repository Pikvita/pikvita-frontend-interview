// src/router/Router.tsx

import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from '../pages/Error/ErrorPage';
import Home from '../pages/Home/Home';
import QuizPage from '../pages/Quiz/QuizPage';
import ResultsPage from '../pages/Quiz/ResultsPage';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/quiz', element: <QuizPage /> },
      { path: '/results', element: <ResultsPage /> },
    ],
  },
]);

export default Router;
