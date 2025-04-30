import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Pdfpage from './Pdfpage';
import CareerGuide from './Carrierguide';
import PdfLibrary from './Pdflibrary';
import ContinueLearning from './ContinueLearning';

const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <Navigate to="/DashboardPage" />} />
        <Route path="/Pdfpage" element={isLoggedIn ? <Pdfpage /> : <Navigate to="/Pdfpage" />} />
        <Route path="/Carrierguide" element={isLoggedIn ? <CareerGuide /> : <Navigate to="/Carrierguide" />} />
        <Route path="/Pdflibrary" element={isLoggedIn ? <PdfLibrary /> : <Navigate to="/Pdflibrary" />} />
        <Route path="/ContinueLearning" element={isLoggedIn ? <ContinueLearning /> : <Navigate to="/ContinueLearning" />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
