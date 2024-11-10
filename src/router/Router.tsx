import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import ErrorPage from '../pages/Error/ErrorPage'
import Home from '../pages/Home/Home'
import Results from '../pages/Results/Results'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/results',
        element: <Results />
      }
    ],
  },
])

export default Router
