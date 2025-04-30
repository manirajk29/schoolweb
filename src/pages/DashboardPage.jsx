import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import Header from "../components/dashboard/Header";
import CareerExploration from "../components/dashboard/CareerExploration";
import QuizContainer from "../components/dashboard/QuizContainer";
import "./DashboardPage.css";

const DashboardPage = () => {
  const pageRef = useRef(null);
  const welcomeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    gsap.fromTo(welcomeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
  }, []);

  const userName = "User"; // Replace with dynamic data if needed

  return (
    <div ref={pageRef} className="dashboard-wrapper">
      <nav className="top-navbar">
        <div className="nav-title">EduLearn</div>
        <div className="nav-links">
          <NavLink to="/dashboard" className="nav-link-a" activeclassname="active">Dashboard</NavLink>
          <NavLink to="/Pdfpage" className="nav-link-a" activeclassname="active">PDF Page</NavLink>
          <NavLink to="/Carrierguide" className="nav-link-a" activeclassname="active">Career Guidance</NavLink>
          <NavLink to="/Pdflibrary" className="nav-link-a" activeclassname="active">PDF Library</NavLink>
          <NavLink to="/ContinueLearning" className="nav-link-a" activeclassname="active">Profile</NavLink>
        </div>
      </nav>

      <div className="dashboard-content">
        <Header />

        <main className="dashboard-main">
          <div ref={welcomeRef} className="welcome-box">
            <h1 className="welcome-heading">Welcome back, {userName}!</h1>
            <p className="welcome-subtext">
              Continue exploring career options and educational resources
            </p>
          </div>

          <CareerExploration />
          <QuizContainer />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
