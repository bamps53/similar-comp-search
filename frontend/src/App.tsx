// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompetitionDetail from "./pages/CompetitionDetail";
import SolutionDetail from "./pages/SolutionDetail";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <Box>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competitions/:id" element={<CompetitionDetail />} />
        <Route path="/solutions/:id" element={<SolutionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
