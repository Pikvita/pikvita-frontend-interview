import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Questions from "./pages/Questions";
import Results from "./pages/Results";

//createBrowserRouter: Sets up the router configuration with an array of route objects. 
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
    ],
  },
]);

function App() {
  return (

      <RouterProvider router={router} />
   
  );
}

export default App;
