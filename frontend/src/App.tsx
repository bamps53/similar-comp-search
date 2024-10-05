// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CompetitionDetail from './components/CompetitionDetail';
import SolutionDetail from './components/SolutionDetail';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/competitions/:id" element={<CompetitionDetail />} />
      <Route path="/solutions/:id" element={<SolutionDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
