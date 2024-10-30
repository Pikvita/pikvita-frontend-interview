// import LandingPage from "./pages/LandingPage"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

// const App = () => {
//    return (
//       <>
//          <LandingPage />
//       </>
//    )
// }

// export default App



const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      // {
      //   path: "/onboarding",
      //   element: (
      //     <ProtectedRoute>
      //       <Onboarding />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/jobs",
      //   element: (
      //     <ProtectedRoute>
      //       <JobListing />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/post-job",
      //   element: (
      //     <ProtectedRoute>
      //       <PostJob />
      //     </ProtectedRoute>
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
