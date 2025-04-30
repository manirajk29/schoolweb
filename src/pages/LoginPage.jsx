import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { GraduationCap as Graduation } from 'lucide-react';
import './LoginPage.css'; // Make sure this CSS file exists

const LoginPage = () => {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.inOut' }
    );

    timeline.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    timeline.fromTo(
      [headingRef.current, subheadingRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    );

    return () => timeline.kill();
  }, []);

  const handleLogin = () => {
    // Just navigate without checking login info
    navigate('/dashboard');
  };

  return (
    <div ref={pageRef} className="auth-layout">
      <div className="auth-sidebar">
        <div className="sidebar-text">
          <div ref={logoRef} className="logo-wrapper">
            <div className="logo-circle">
              <Graduation size={40} className="icon-primary" />
            </div>
          </div>
          <h1 ref={headingRef} className="sidebar-heading">NEX</h1>
          <p ref={subheadingRef} className="sidebar-subheading">
            Discover your ideal career path through personalized learning and exploration
          </p>
        </div>
      </div>

      <div className="auth-content">
        <div className="form-wrapper">
          <div className="login-form">
            <h2 className="form-title">Login to NEX</h2>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button className="login-button" onClick={handleLogin}>Login</button>
            <div className="register-link">
              Don't have an account? <a href="/register">Register</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
