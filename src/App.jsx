import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carrierguide from "./Carrierguide";
import Home from "./Home.jsx";
import Pdfpage from "./Pdfpage.jsx";
import PdfLibrary from "./PdfLibrary.jsx";
import ContinueLearning from "./ContinueLearning.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pdfpage" element={<Pdfpage />} />
        <Route path="/Carrierguide" element={<Carrierguide />} />
        <Route path="/Pdflibrary" element={<PdfLibrary />} />
        <Route path="/ContinueLearning" element={<ContinueLearning />} />
      </Routes>
    </Router>
  );
}

export default App;
