// Carrierguide.jsx
import "./Carrierguide.css"; 

import React, { useState, useEffect } from 'react'; 
import * as echarts from 'echarts';
const Carrierguide = () => {
  const [activeTab, setActiveTab] = useState('career');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [educationLevel, setEducationLevel] = useState('all');
  const [location, setLocation] = useState('all');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedCareers, setSelectedCareers] = useState([]);

  // Mock user data
  const userData = {
    name: 'Alex Johnson',
    avatar: 'https://public.readdy.ai/ai/img_res/dcc2929f2d2366e3fc536b13bb1247e3.jpg',
    progress: 68,
    skills: ['Data Analysis', 'Python', 'Communication', 'Problem Solving', 'Critical Thinking'],
    interests: ['Technology', 'Data Science', 'Education'],
  };

  // Mock industries data
  const industries = [
    { id: 'tech', name: 'Technology', icon: 'fa-microchip' },
    { id: 'health', name: 'Healthcare', icon: 'fa-heartbeat' },
    { id: 'finance', name: 'Finance', icon: 'fa-chart-line' },
    { id: 'education', name: 'Education', icon: 'fa-graduation-cap' },
    { id: 'creative', name: 'Creative Arts', icon: 'fa-paint-brush' },
    { id: 'engineering', name: 'Engineering', icon: 'fa-cogs' }
  ];

  // Mock education levels
  const educationLevels = [
    { id: 'high-school', name: 'High School' },
    { id: 'associate', name: 'Associate Degree' },
    { id: 'bachelor', name: 'Bachelor\'s Degree' },
    { id: 'master', name: 'Master\'s Degree' },
    { id: 'phd', name: 'PhD' }
  ];

  // Mock locations
  const locations = [
    { id: 'us-west', name: 'US West Coast' },
    { id: 'us-east', name: 'US East Coast' },
    { id: 'us-central', name: 'US Central' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' }
  ];

  // Mock career paths data
  const careerPaths = [
    {
      id: 1,
      title: 'Data Scientist',
      industry: 'tech',
      description: 'Analyze complex data to help organizations make better decisions',
      salary: '$95,000 - $150,000',
      growth: 'High (22% over 10 years)',
      education: 'Bachelor\'s or Master\'s in Computer Science, Statistics, or related field',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
      match: 85,
      demand: 'high',
      image: 'https://public.readdy.ai/ai/img_res/9a4b8c7d6e5f3a2b1c0d9e8f7a6b5c4d.jpg'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      industry: 'creative',
      description: 'Design user-friendly interfaces for websites and applications',
      salary: '$75,000 - $120,000',
      growth: 'Above Average (15% over 10 years)',
      education: 'Bachelor\'s in Design, HCI, or related field',
      skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Figma', 'Adobe XD'],
      match: 72,
      demand: 'medium',
      image: 'https://public.readdy.ai/ai/img_res/1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f.jpg'
    },
    {
      id: 3,
      title: 'Biomedical Engineer',
      industry: 'health',
      description: 'Develop medical equipment and devices to improve patient care',
      salary: '$85,000 - $140,000',
      growth: 'High (20% over 10 years)',
      education: 'Bachelor\'s or Master\'s in Biomedical Engineering',
      skills: ['CAD Software', 'Medical Device Design', 'Clinical Evaluation', 'Problem Solving'],
      match: 65,
      demand: 'high',
      image: 'https://public.readdy.ai/ai/img_res/5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b.jpg'
    },
    {
      id: 4,
      title: 'Financial Analyst',
      industry: 'finance',
      description: 'Analyze financial data and market trends to guide investment decisions',
      salary: '$70,000 - $125,000',
      growth: 'Average (11% over 10 years)',
      education: 'Bachelor\'s in Finance, Economics, or related field',
      skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Forecasting', 'Accounting'],
      match: 78,
      demand: 'medium',
      image: 'https://public.readdy.ai/ai/img_res/9c8b7a6d5e4f3c2b1a0d9e8f7a6b5c4d.jpg'
    },
    {
      id: 5,
      title: 'Mechanical Engineer',
      industry: 'engineering',
      description: 'Design and develop mechanical systems and products',
      salary: '$80,000 - $130,000',
      growth: 'Average (10% over 10 years)',
      education: 'Bachelor\'s in Mechanical Engineering',
      skills: ['CAD Software', 'Thermal Analysis', 'Product Design', 'Problem Solving'],
      match: 70,
      demand: 'medium',
      image: 'https://public.readdy.ai/ai/img_res/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg'
    },
    {
      id: 6,
      title: 'Curriculum Developer',
      industry: 'education',
      description: 'Design educational content and learning experiences',
      salary: '$65,000 - $95,000',
      growth: 'Average (10% over 10 years)',
      education: 'Bachelor\'s or Master\'s in Education or related field',
      skills: ['Instructional Design', 'Content Creation', 'Educational Technology', 'Assessment Design'],
      match: 82,
      demand: 'medium',
      image: 'https://public.readdy.ai/ai/img_res/7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d.jpg'
    }
  ];

  // Mock job market trends data
  const jobMarketTrends = [
    { year: 2020, technology: 120, healthcare: 110, finance: 100, education: 90, creative: 85, engineering: 105 },
    { year: 2021, technology: 130, healthcare: 115, finance: 102, education: 92, creative: 88, engineering: 108 },
    { year: 2022, technology: 145, healthcare: 125, finance: 105, education: 95, creative: 92, engineering: 112 },
    { year: 2023, technology: 160, healthcare: 140, finance: 110, education: 98, creative: 95, engineering: 118 },
    { year: 2024, technology: 180, healthcare: 155, finance: 115, education: 100, creative: 100, engineering: 125 },
    { year: 2025, technology: 200, healthcare: 170, finance: 120, education: 105, creative: 105, engineering: 130 }
  ];

  // Mock recommended courses data
  const recommendedCourses = [
    {
      id: 1,
      title: 'Introduction to Python Programming',
      provider: 'CodeAcademy',
      duration: '8 weeks',
      level: 'Beginner',
      relevance: 'High match for Data Scientist'
    },
    {
      id: 2,
      title: 'Data Analysis with R',
      provider: 'DataCamp',
      duration: '6 weeks',
      level: 'Intermediate',
      relevance: 'High match for Data Scientist'
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      provider: 'Coursera',
      duration: '12 weeks',
      level: 'Intermediate',
      relevance: 'Medium match for multiple careers'
    }
  ];

  useEffect(() => {
    // Initialize career path visualization chart
    const careerChartElement = document.getElementById('career-path-chart');
    if (careerChartElement) {
      const careerChart = echarts.init(careerChartElement);
      const careerOption = {
        animation: false,
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        series: [
          {
            type: 'sankey',
            layout: 'none',
            emphasis: {
              focus: 'adjacency'
            },
            data: [
              { name: 'Entry Level' },
              { name: 'Junior Data Analyst' },
              { name: 'Data Analyst' },
              { name: 'Senior Data Analyst' },
              { name: 'Data Scientist' },
              { name: 'Senior Data Scientist' },
              { name: 'Lead Data Scientist' },
              { name: 'Data Science Manager' },
              { name: 'Director of Data Science' }
            ],
            links: [
              { source: 'Entry Level', target: 'Junior Data Analyst', value: 1 },
              { source: 'Junior Data Analyst', target: 'Data Analyst', value: 1 },
              { source: 'Data Analyst', target: 'Senior Data Analyst', value: 1 },
              { source: 'Senior Data Analyst', target: 'Data Scientist', value: 1 },
              { source: 'Data Scientist', target: 'Senior Data Scientist', value: 1 },
              { source: 'Senior Data Scientist', target: 'Lead Data Scientist', value: 1 },
              { source: 'Lead Data Scientist', target: 'Data Science Manager', value: 1 },
              { source: 'Data Science Manager', target: 'Director of Data Science', value: 1 }
            ]
          }
        ]
      };
      careerChart.setOption(careerOption);

      // Resize chart on window resize
      window.addEventListener('resize', () => {
        careerChart.resize();
      });
    }

    // Initialize job market trends chart
    const trendsChartElement = document.getElementById('job-market-trends-chart');
    if (trendsChartElement) {
      const trendsChart = echarts.init(trendsChartElement);
      const trendsOption = {
        animation: false,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Technology', 'Healthcare', 'Finance', 'Education', 'Creative Arts', 'Engineering'],
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: jobMarketTrends.map(item => item.year)
        },
        yAxis: {
          type: 'value',
          name: 'Job Index (Base 100)',
          nameLocation: 'middle',
          nameGap: 50
        },
        series: [
          {
            name: 'Technology',
            type: 'line',
            data: jobMarketTrends.map(item => item.technology),
            smooth: true,
            lineStyle: { width: 3 },
            itemStyle: { color: '#4299e1' }
          },
          {
            name: 'Healthcare',
            type: 'line',
            data: jobMarketTrends.map(item => item.healthcare),
            smooth: true,
            lineStyle: { width: 3 },
            itemStyle: { color: '#48bb78' }
          },
          {
            name: 'Finance',
            type: 'line',
            data: jobMarketTrends.map(item => item.finance),
            smooth: true,
            lineStyle: { width: 3 },
            itemStyle: { color: '#f6ad55' }
          },
          {
            name: 'Education',
            type: 'line',
            data: jobMarketTrends.map(item => item.education),
            smooth: true,
            lineStyle: { width: 3 },
            itemStyle: { color: '#9f7aea' }
          },
          {
            name: 'Creative Arts',
            type: 'line',
            data: jobMarketTrends.map(item => item.creative),
            smooth: true,
            lineStyle: { width: 3 },
            itemStyle: { color: '#ed64a6' }
          },
          {
            name: 'Engineering',
            type: 'line',
            data: jobMarketTrends.map(item => item.engineering),
            smooth: true,
            lineStyle: { width: 3 },
            itemStyle: { color: '#718096' }
          }
        ]
      };
      trendsChart.setOption(trendsOption);

      // Resize chart on window resize
      window.addEventListener('resize', () => {
        trendsChart.resize();
      });
    }

    // Initialize skills radar chart
    const skillsChartElement = document.getElementById('skills-radar-chart');
    if (skillsChartElement) {
      const skillsChart = echarts.init(skillsChartElement);
      const skillsOption = {
        animation: false,
        tooltip: {},
        radar: {
          indicator: [
            { name: 'Technical Skills', max: 100 },
            { name: 'Communication', max: 100 },
            { name: 'Problem Solving', max: 100 },
            { name: 'Leadership', max: 100 },
            { name: 'Creativity', max: 100 }
          ]
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: [85, 70, 80, 65, 75],
              name: 'Your Skills',
              areaStyle: {
                color: 'rgba(66, 153, 225, 0.6)'
              },
              lineStyle: {
                color: '#4299e1'
              }
            },
            {
              value: [95, 80, 90, 85, 70],
              name: 'Data Scientist Requirements',
              areaStyle: {
                color: 'rgba(72, 187, 120, 0.4)'
              },
              lineStyle: {
                color: '#48bb78'
              }
            }
          ]
        }]
      };
      skillsChart.setOption(skillsOption);

      // Resize chart on window resize
      window.addEventListener('resize', () => {
        skillsChart.resize();
      });
    }

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  // Filter career paths based on selected filters
  const filteredCareerPaths = careerPaths.filter(career => {
    if (selectedIndustry !== 'all' && career.industry !== selectedIndustry) return false;
    return true;
  });

  // Toggle career selection for comparison
  const toggleCareerSelection = (careerId) => {
    const careerTitle = careerPaths.find(c => c.id === careerId)?.title || '';
    if (selectedCareers.includes(careerTitle)) {
      setSelectedCareers(selectedCareers.filter(c => c !== careerTitle));
    } else {
      if (selectedCareers.length < 3) {
        setSelectedCareers([...selectedCareers, careerTitle]);
      }
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-main">
            <div className="header-logo">
              <span className="logo-text">EduLearn</span>
            </div>
            <nav className="header-nav">
              <a href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a" data-readdy="true" className="nav-link">
                Dashboard
              </a>
              <a href="#" className="nav-link active-link">
                Career Guidance
              </a>
              <a href="#" className="nav-link">
                Learning Modules
              </a>
              <a href="#" className="nav-link">
                Quizzes
              </a>
            </nav>
          </div>
          <div className="header-user-actions">
            <button className="icon-button">
              <i className="fas fa-bell icon-bell"></i>
            </button>
            <button className="icon-button">
              <i className="fas fa-cog icon-cog"></i>
            </button>
            <div className="user-profile">
              <div className="user-info">
                <div className="user-name">{userData.name}</div>
                <div className="user-role">Student</div>
              </div>
              <img
                className="user-avatar"
                src={userData.avatar}
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="page-header-section">
          <div className="page-header-content">
            <div>
              <h1 className="page-title">Career Paths Explorer</h1>
              <p className="page-subtitle">Discover and explore career paths that match your skills, interests, and goals</p>
            </div>
            <div className="page-header-actions">
              <button
                onClick={() => setShowCompareModal(true)}
                disabled={selectedCareers.length < 2}
                className={`compare-button ${selectedCareers.length < 2 ? 'disabled-button' : 'primary-button'
                }`}
              >
                <i className="fas fa-balance-scale icon-margin"></i>
                Compare Careers ({selectedCareers.length}/3)
              </button>
              <a
                href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
                data-readdy="true"
                className="back-button"
              >
                <i className="fas fa-arrow-left icon-margin"></i>
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-container">
          <div className="filters-header">
            <h2 className="filters-title">Filter Career Paths</h2>
            <div className="filters-reset">
              <button className="reset-button">
                Reset Filters <i className="fas fa-redo-alt icon-margin"></i>
              </button>
            </div>
          </div>
          <div className="filters-grid">
            {/* Industry Filter */}
            <div>
              <label className="filter-label">Industry</label>
              <div className="select-wrapper">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry.id} value={industry.id}>{industry.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-chevron-down select-icon"></i>
                </div>
              </div>
            </div>

            {/* Education Level Filter */}
            <div>
              <label className="filter-label">Education Level</label>
              <div className="select-wrapper">
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Education Levels</option>
                  {educationLevels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-chevron-down select-icon"></i>
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="filter-label">Location</label>
              <div className="select-wrapper">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-chevron-down select-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Paths */}
        <div className="careers-grid-section">
          <h2 className="careers-grid-title">Explore Career Paths</h2>
          <div className="careers-grid">
            {filteredCareerPaths.map(career => (
              <div key={career.id} className="career-card">
                <div className="career-image-container">
                  <img
                    src={career.image}
                    alt={career.title}
                    className="career-image"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{career.title}</h3>
                    <div className="flex items-center">
                      <span 
                        className={`demand-tag ${career.demand}`}
                      >
                        {career.demand === 'high' ? 'High Demand' : career.demand === 'medium' ? 'Medium Demand' : 'Low Demand'}
                      </span>
                    </div>
                  </div>
                  <p className="career-description">{career.description}</p>
                  
                  <div className="career-match-bar">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Match with your profile</span>
                      <span className="font-medium text-blue-600">{career.match}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          career.match >= 80 ? 'bg-green-500' : career.match >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${career.match}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="career-details">
                    <div>
                      <span className="block text-gray-500">Salary Range</span>
                      <span className="font-medium text-gray-900">{career.salary}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Growth Outlook</span>
                      <span className="font-medium text-gray-900">{career.growth}</span>
                    </div>
                  </div>
                  <div className="career-skills">
                    {career.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                    {career.skills.length > 3 && (
                      <span className="skill-tag more-skills-tag">
                        +{career.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="career-actions">
                    <button className="view-details-button">
                      View Details
                    </button>
                    <button
                      onClick={() => toggleCareerSelection(career.id)}
                      className={`select-career-button ${selectedCareers.includes(career.title)
                        ? 'selected-career'
                        : ''
                        }`}
                    >
                      <i className={`fa-check-square ${selectedCareers.includes(career.title) ? 'fas' : 'far'}`}></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Path Visualization */}
        <div className="career-path-visualization">
          <div className="career-chart-content">
            <h2 className="chart-title">Career Path Progression</h2>
            <p className="chart-description">Visualize the typical career progression for a Data Scientist role</p>
            <div id="career-path-chart" className="chart-container"></div>
          </div>
        </div>

        {/* Job Market Trends */}
        <div className="job-market-trends-section">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Market Trends</h2>
            <p className="text-gray-600 mb-6">Industry growth trends over the past 5 years with projections</p>
            <div id="job-market-trends-chart" className="w-full h-80"></div>
          </div>
        </div>

        {/* Skills Analysis and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Skills Analysis */}
          <div className="skills-analysis">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills Analysis</h2>
              <p className="text-gray-600 mb-6">Compare your skills with career requirements</p>
              <div id="skills-radar-chart" className="w-full h-80"></div>
            </div>
            <div className="user-skills-section">
              <h3 className="skills-section-title">Your Top Skills</h3>
              <div className="space-y-2">
                {userData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Learning Courses */}
          <div className="recommended-learning-section">
            <div className="p-6">
              <h2 className="learning-section-title">Recommended Learning</h2>
              <p className="learning-section-description">Courses and certifications to help you reach your career goals</p>

              <div className="learning-courses">
                {recommendedCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-header">
                      <h3 className="text-lg font-medium text-gray-800">{course.title}</h3>
                      <span className="course-provider">{course.provider}</span>
                    </div>
                    <div className="course-details">
                      <div>
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{course.duration}</span>
                      </div>
                      <div>
                        <span className="detail-label">Level</span>
                        <span className="detail-value">{course.level}</span>
                      </div>
                      <div>
                        <span className="detail-label">Relevance</span>
                        <span className="detail-value relevance">{course.relevance}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800 cursor-pointer">
                      View Course <i className="fas fa-arrow-right ml-1"></i>
                    </button>
                  </div>
                ))}
              </div>
              <div className="learning-footer">
                <span className="learning-footer-text">Based on your profile and career interests</span>
                <button className="learning-all-button">
                View All Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Career Assessment CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="px-8 py-10 md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-2">Take a Career Assessment</h2>
              <p className="career-assessment-text">Complete our comprehensive career assessment to get personalized career recommendations based on your personality, skills, and interests.</p>
              <button className="bg-white text-blue-600 font-medium py-2 px-6 rounded-lg shadow hover:bg-blue-50 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                Start Assessment <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
            <div className="md:w-1/3 relative">
              <img
                className="h-full w-full object-cover"
                src="https://public.readdy.ai/ai/img_res/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg"
                alt="Career assessment concept"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div>
              <h3 className="footer-heading">EduLearn</h3>
              <p className="footer-description">Empowering students with interactive learning experiences and personalized education paths.</p>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a" data-readdy="true" className="hover:text-white cursor-pointer">Dashboard</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Career Guidance</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Learning Modules</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Quizzes</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">Help Center</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">FAQs</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="text-sm text-gray-400">
                <p className="newsletter-text">Subscribe to our newsletter</p>
                <div className="mt-2 flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-700 border-none text-white text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <button className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 !rounded-button whitespace-nowrap cursor-pointer">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2025 EduLearn. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <i className="fab fa-cc-visa  text-2xl"></i>
              <i className="fab fa-cc-mastercard text-gray-400 text-2xl"></i>
              <i className="fab fa-cc-paypal text-gray-400 text-2xl"></i>
            </div>
          </div>
        </div>
      </footer>

      {/* Career Comparison Modal */}
      {showCompareModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="header-content">
                <h2 className="text-xl font-semibold text-gray-800">Compare Career Paths</h2>
                <button 
                onClick={() => setShowCompareModal(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="modal-careers-grid">
                  {selectedCareers.map((careerTitle, index) => {
                  const career = careerPaths.find(c => c.title === careerTitle);
                  if (!career) return null;
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">{career.title}</h3>
                      
                      <div className="space-y-4 text-sm">
                        <div className="modal-career-detail">
                          <span className="modal-detail-label">Salary Range</span>
                          <span className="modal-detail-value">{career.salary}</span>
                        </div>
                        <div className="modal-career-detail">
                          <span className="modal-detail-label">Growth Outlook</span>
                          <span className="modal-detail-value">{career.growth}</span>
                        </div>
                        <div className="modal-career-detail">
                          <span className="modal-detail-label">Education Required</span>
                          <span className="modal-detail-value">{career.education}</span>
                        </div>
                        <div className="modal-career-detail">
                          <span className="modal-detail-label">Key Skills</span>
                          <div className="modal-skills-tags">
                            {career.skills.map((skill, idx) => (
                              <span key={idx} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowCompareModal(false)}
                  className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer mr-3"
                >
                  Close
                </button>
                <button 
                  className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                   Generate Detailed Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrierguide;