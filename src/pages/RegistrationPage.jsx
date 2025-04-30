import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { GraduationCap as Graduation } from 'lucide-react';
import './RegistrationPage.css'; // Import your CSS file

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const pageRef = useRef(null);
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
      return;
    }

    const timeline = gsap.timeline();

    timeline.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.inOut" }
    );

    timeline.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );

    timeline.fromTo(
      [headingRef.current, subheadingRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" },
      "-=0.2"
    );

    return () => {
      timeline.kill();
    };
  }, [user, navigate]);

  return (
    <div ref={pageRef} className="registration-container">
      <div className="registration-sidebar">
        <div className="sidebar-content">
          <div ref={logoRef} className="logo-wrapper">
            <div className="logo-background">
              <Graduation size={48} className="icon-primary" />
            </div>
          </div>
          <h1 ref={headingRef} className="registration-title">Join EduFlow</h1>
          <p ref={subheadingRef} className="registration-subtitle">
            Create your account to unlock personalized career guidance and educational resources
          </p>
        </div>
      </div>

      <div className="registration-main">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
