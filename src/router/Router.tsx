import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Home from '../pages/Home/Home'
import Quiz from '../pages/Quiz/Quiz'
import ErrorPage from '../pages/Error/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
    ],
  },
])

export default router
