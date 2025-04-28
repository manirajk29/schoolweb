import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="pdfpage">
        <Link to="/Pdfpage">Go to PDF Page</Link>
      </div>
      <div className="carrierpage">
        <Link to="/Carrierguide">Go to Career Guidance</Link>
      </div>
      <div className="pdflibrarypage">
        <Link to="/Pdflibrary">Go to PDF Library</Link>
      </div>
      <div className="continuelearningpage">
        <Link to="/ContinueLearning">Go to Profile</Link>
      </div>
    </div>
  );
}

export default Home;
