import React, { useState, useEffect } from "react";

const professions = [
  { id: "fullstack", name: "Full-Stack Web Developer" },
  { id: "mbbs", name: "MBBS" },
  { id: "ias", name: "IAS" },
];

const CareerGuidance = () => {
  const [search, setSearch] = useState("");
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [careerRoadmap, setCareerRoadmap] = useState("");
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem("careerProgress")) || {}
  );

  useEffect(() => {
    localStorage.setItem("careerProgress", JSON.stringify(progress));
  }, [progress]);

  const fetchCareerRoadmap = async (profession) => {
    setSelectedProfession(profession);
    setCareerRoadmap("Generating roadmap...");

    // Simulating AI response
    setTimeout(() => {
      setCareerRoadmap(`Step 1: Learn basics of ${profession.name}\nStep 2: Get required degrees\nStep 3: Gain experience`);
    }, 1500);
  };

  const toggleProgress = (step) => {
    setProgress({
      ...progress,
      [selectedProfession.id]: {
        ...progress[selectedProfession.id],
        [step]: !progress[selectedProfession.id]?.[step],
      },
    });
  };

  return (
    <div className="career-container">
      <h1>Career Guidance</h1>
      <input
        type="text"
        placeholder="Search profession..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {professions
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .map((profession) => (
            <li key={profession.id} onClick={() => fetchCareerRoadmap(profession)}>
              {profession.name}
            </li>
          ))}
      </ul>
      {selectedProfession && (
        <div className="roadmap">
          <h2>{selectedProfession.name} Roadmap</h2>
          <pre>{careerRoadmap}</pre>
          <button onClick={() => toggleProgress("step1")}>Mark Step 1</button>
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;
