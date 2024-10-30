import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './router/Router';

const App = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <RouterProvider router={Router} />
    </Suspense>
  );
};

export default App;

