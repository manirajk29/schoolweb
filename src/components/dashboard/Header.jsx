import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CareerCard from './CareerCard';
import {
  Code, Briefcase, Palette, Laptop,
  HeartPulse, Building, BookOpen, FlaskConical
} from 'lucide-react';
import './CareerExploration.css';

const CareerExploration = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    if (cardsRef.current && cardsRef.current.children.length > 0) {
      timeline.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }

    return () => timeline.kill();
  }, []);

  const careers = [
    {
      title: 'Software Development',
      description: 'Build applications and systems that power the digital world',
      icon: <Code size={24} className="icon-white" />,
      color: 'bg-blue'
    },
    {
      title: 'Business & Management',
      description: 'Lead organizations and teams to achieve business goals',
      icon: <Briefcase size={24} className="icon-white" />,
      color: 'bg-purple'
    },
    {
      title: 'Science & Research',
      description: 'Explore scientific discoveries and innovations',
      icon: <FlaskConical size={24} className="icon-white" />,
      color: 'bg-orange'
    },
    {
      title: 'Design & Creativity',
      description: 'Express creativity through visual and interactive design',
      icon: <Palette size={24} className="icon-white" />,
      color: 'bg-gray'
    },
    {
      title: 'Technology',
      description: 'Work with cutting-edge technologies and digital solutions',
      icon: <Laptop size={24} className="icon-white" />,
      color: 'bg-green'
    },
    {
      title: 'Healthcare',
      description: 'Make a difference in people\'s lives through healthcare',
      icon: <HeartPulse size={24} className="icon-white" />,
      color: 'bg-red'
    },
    {
      title: 'Architecture',
      description: 'Design and build the physical environments around us',
      icon: <Building size={24} className="icon-white" />,
      color: 'bg-yellow'
    },
    {
      title: 'Education',
      description: 'Share knowledge and help others learn and grow',
      icon: <BookOpen size={24} className="icon-white" />,
      color: 'bg-darkblue'
    },
  ];

  return (
    <div ref={sectionRef} className="career-section">
      <h2 ref={headingRef} className="career-title">Career Exploration</h2>
      <div ref={cardsRef} className="career-grid">
        {careers.map((career, index) => (
          <CareerCard
            key={index}
            title={career.title}
            description={career.description}
            icon={career.icon}
            color={career.color}
          />
        ))}
      </div>
    </div>
  );
};

export default CareerExploration;
