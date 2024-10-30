// import LandingPage from "./pages/LandingPage"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Questions from "./pages/Questions";
import Results from "./pages/Results";


const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/questions",
        element: (
        
            <Questions />
        
        ),
       },
      {
        path: "/results",
        element: (
        
            <Results />
      
        ),
      },
      // {
      //   path: "/CarouselPage",
      //   element: (
          
      //       <CarouselPage />
        
      //   ),
      // },
      // {
      //   path: "/my-jobs",
      //   element: (
      //     <ProtectedRoute>
      //       <MyJobs />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/saved-jobs",
      //   element: (
      //     <ProtectedRoute>
      //       <SavedJobs />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/job/:id",
      //   element: (
      //     <ProtectedRoute>
      //       <JobPage />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/extractDetails",
      //   element: (
      //     <ProtectedRoute>
      //       <ExtractDetailsPage />
      //     </ProtectedRoute>
      //   ),
      // }
    ],
  },
]);

function App() {
  return (

      <RouterProvider router={router} />
   
  );
}

export default App;
