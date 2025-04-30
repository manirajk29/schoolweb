import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { HelpCircle, ArrowRight, PieChart } from 'lucide-react';
import './QuizContainer.css';

const QuizContainer = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const timeline = gsap.timeline();
    
    timeline.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
    
    timeline.fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
      "-=0.3"
    );
    
    gsap.to(buttonRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut"
    });
    
    return () => {
      timeline.kill();
      gsap.killTweensOf(buttonRef.current);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="quiz-container">
      <div ref={contentRef}>
        <div className="quiz-header">
          <HelpCircle size={24} className="icon" />
          <h2 className="quiz-title">Career Assessment Quiz</h2>
        </div>
        
        <p className="quiz-description">
          Discover your ideal career path through our comprehensive assessment.
          Answer a few questions and get personalized recommendations.
        </p>
        
        <div className="quiz-footer">
          <div className="quiz-duration">
            <PieChart size={20} className="icon" />
            <span className="duration-text">Takes about 10 minutes</span>
          </div>
          
          <button ref={buttonRef} className="quiz-button">
            Take Quiz
            <ArrowRight size={16} className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
