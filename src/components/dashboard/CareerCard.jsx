import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './CareerCard.css'; // Import the CSS file

const CareerCard = ({ title, description, icon, color }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current && iconRef.current) {
      gsap.to(cardRef.current, {
        y: -10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 0.3,
      });

      gsap.to(iconRef.current, {
        scale: 1.1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && iconRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
      });

      gsap.to(iconRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="career-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="career-card-content">
        <div ref={iconRef} className={`career-card-icon ${color}`}>
          {icon}
        </div>
        <h3 className="career-card-title">{title}</h3>
        <p className="career-card-description">{description}</p>
        <div className="career-card-explore">
          <span>Explore</span>
          <ArrowUpRight size={16} className="arrow-icon" />
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
