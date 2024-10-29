// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import { QuizProvider } from './context/QuizContext';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

const App: React.FC = () => {
  return (
    <QuizProvider>
      <Header /> 
      <main>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
      <Footer />
    </QuizProvider>
  );
};

export default App;
