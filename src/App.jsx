import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carrierguide from "./Carrierguide";
import Home from "./Home.jsx";
import Pdfpage from "./Pdfpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pdfpage" element={<Pdfpage />} />
        <Route path="/Carrierguide" element={<Carrierguide />} />
      </Routes>
    </Router>
  );
}

export default App;
