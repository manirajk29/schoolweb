import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import "./ContinueLearning.css"; 

const ContinueLearning = () => {
  const [activeTab, setActiveTab] = useState("continue");

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    avatar:
      "https://public.readdy.ai/ai/img_res/dcc2929f2d2366e3fc536b13bb1247e3.jpg",
    progress: 68,
  };

  // Mock current course data
  const currentCourse = {
    id: 1,
    title: "Introduction to Physics",
    module: "Mechanics and Motion",
    lastLesson: "Newton's Laws of Motion",
    progress: 75,
    lastAccessed: "Yesterday at 3:45 PM",
    timeRemaining: "2h 15m",
    description:
      "Learn the fundamental principles of mechanics and understand how objects move and interact with each other.",
    image:
      "https://public.readdy.ai/ai/img_res/f925c521f98f0d63b3f83dbe35b35a85.jpg",
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "quiz",
      title: "Physics Quiz: Forces and Motion",
      date: "Yesterday",
      time: "4:30 PM",
      score: 85,
      icon: "fa-clipboard-check",
      color: "blue",
    },
    {
      id: 2,
      type: "video",
      title: "Understanding Gravitational Forces",
      date: "Yesterday",
      time: "3:15 PM",
      duration: "15:20",
      progress: 100,
      icon: "fa-play-circle",
      color: "green",
    },
    {
      id: 3,
      type: "reading",
      title: "Introduction to Newton's Laws",
      date: "Yesterday",
      time: "2:45 PM",
      pages: "12-18",
      progress: 100,
      icon: "fa-book-open",
      color: "purple",
    },
    {
      id: 4,
      type: "assignment",
      title: "Problem Set: Kinematics",
      date: "2 days ago",
      time: "5:20 PM",
      status: "Submitted",
      grade: "A-",
      icon: "fa-file-alt",
      color: "yellow",
    },
  ];

  // Mock next lessons
  const nextLessons = [
    {
      id: 1,
      title: "Conservation of Momentum",
      type: "Video Lesson",
      duration: "18 min",
      difficulty: "Intermediate",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/04c6f7789fc80f9c3f91e908d3d815fe.jpg",
    },
    {
      id: 2,
      title: "Work and Energy",
      type: "Interactive Lesson",
      duration: "25 min",
      difficulty: "Intermediate",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/51bc5d1500d3ce53c1435fa5a0d74062.jpg",
    },
    {
      id: 3,
      title: "Circular Motion",
      type: "Reading + Quiz",
      duration: "30 min",
      difficulty: "Advanced",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/804cf340a0c8f182cfa5be92647d9c69.jpg",
    },
  ];

  // Mock learning materials
  const learningMaterials = [
    {
      id: 1,
      title: "Physics Textbook Chapter 3",
      type: "PDF",
      size: "2.4 MB",
      icon: "fa-file-pdf",
      color: "red",
    },
    {
      id: 2,
      title: "Forces and Motion Formula Sheet",
      type: "PDF",
      size: "0.8 MB",
      icon: "fa-file-pdf",
      color: "red",
    },
    {
      id: 3,
      title: "Interactive Physics Simulator",
      type: "Web App",
      icon: "fa-laptop-code",
      color: "blue",
    },
    {
      id: 4,
      title: "Newton's Laws Flashcards",
      type: "Interactive",
      icon: "fa-clone",
      color: "green",
    },
  ];

  useEffect(() => {
    // Initialize progress chart
    const progressChartElement = document.getElementById(
      "course-progress-chart"
    );
    if (progressChartElement) {
      const progressChart = echarts.init(progressChartElement);
      const progressOption = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Course Progress",
            type: "pie",
            radius: ["70%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: currentCourse.progress,
                name: "Completed",
                itemStyle: { color: "#4299e1" },
              },
              {
                value: 100 - currentCourse.progress,
                name: "Remaining",
                itemStyle: { color: "#e2e8f0" },
              },
            ],
          },
        ],
      };
      progressChart.setOption(progressOption);

      // Resize chart on window resize
      window.addEventListener("resize", () => {
        progressChart.resize();
      });
    }

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [currentCourse.progress]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-text">EduLearn</span>
            </div>
            <nav className="main-nav">
              <a
                href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
                data-readdy="true"
                className="nav-link"
              >
                Dashboard
              </a>
              <button
                className={`nav-link ${activeTab === "continue" ? "active" : ""}`}
                onClick={() => setActiveTab("continue")}
              >
                Continue Learning
              </button>
              <button className="nav-link">My Courses</button>
              <button className="nav-link">Resources</button>
            </nav>
          </div>
          <div className="header-right">
            <button className="icon-button">
              <i className="fas fa-search"></i>
            </button>
            <button className="icon-button">
              <i className="fas fa-bell"></i>
            </button>
            <button className="icon-button">
              <i className="fas fa-cog"></i>
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
      <main className="main-content">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a
            href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
            data-readdy="true"
            className="breadcrumb-link"
          >
            Dashboard
          </a>
          <i className="fas fa-chevron-right breadcrumb-separator"></i>
          <span className="breadcrumb-current">Continue Learning</span>
        </div>

        {/* Current Course Banner */}
        <div className="course-banner">
          <div className="course-banner-content">
            <div className="course-info">
              <div className="course-header">
                <div className="course-icon">
                  <i className="fas fa-atom"></i>
                </div>
                <div>
                  <h1 className="course-title">{currentCourse.title}</h1>
                  <p className="course-module">Module: {currentCourse.module}</p>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Current Progress</span>
                  <span className="progress-percent">{currentCourse.progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${currentCourse.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="continue-section">
                <h2 className="section-title">Continue from where you left off</h2>
                <p className="last-lesson">{currentCourse.lastLesson}</p>
                <div className="course-meta">
                  <div className="meta-item">
                    <i className="fas fa-clock"></i>
                    <span>Last accessed: {currentCourse.lastAccessed}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-hourglass-half"></i>
                    <span>Time remaining: {currentCourse.timeRemaining}</span>
                  </div>
                </div>
                <a
                  href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
                  data-readdy="true"
                  className="continue-button"
                >
                  Continue <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="course-image-container">
              <img
                className="course-image"
                src={currentCourse.image}
                alt={currentCourse.title}
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Left Column */}
          <div className="left-column">
            {/* Recent Activity */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Recent Activity</h2>
                <div className="activity-list">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="activity-item"
                    >
                      <div className={`activity-icon ${activity.color}`}>
                        <i className={`fas ${activity.icon}`}></i>
                      </div>
                      <div className="activity-details">
                        <div className="activity-header">
                          <h3 className="activity-title">{activity.title}</h3>
                          <span className="activity-time">{activity.date}, {activity.time}</span>
                        </div>
                        <div className="activity-meta">
                          {activity.type === "quiz" && (
                            <div className="quiz-meta">
                              <span className="quiz-score">
                                Score: <span className="score-value">{activity.score}%</span>
                              </span>
                              <div className="quiz-progress-container">
                                <div
                                  className="quiz-progress"
                                  style={{ width: `${activity.score}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {activity.type === "video" && (
                            <div className="video-meta">
                              <span className="video-duration">Duration: {activity.duration}</span>
                              <span className="completion-badge">Completed</span>
                            </div>
                          )}
                          {activity.type === "reading" && (
                            <div className="reading-meta">
                              <span className="reading-pages">Pages: {activity.pages}</span>
                              <span className="completion-badge">Completed</span>
                            </div>
                          )}
                          {activity.type === "assignment" && (
                            <div className="assignment-meta">
                              <span className="assignment-status">Status: {activity.status}</span>
                              <span className="grade-badge">Grade: {activity.grade}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button className="activity-more">
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="view-all">
                  <button className="view-all-button">
                    View All Activity <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Next Up */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Next Up</h2>
                <div className="next-lessons-grid">
                  {nextLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="next-lesson-card"
                    >
                      <div className="lesson-thumbnail">
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.title}
                          className="thumbnail-image"
                        />
                        <div className="thumbnail-overlay">
                          <button className="play-button">
                            <i className="fas fa-play"></i>
                          </button>
                        </div>
                      </div>
                      <div className="lesson-info">
                        <h3 className="lesson-title">{lesson.title}</h3>
                        <div className="lesson-meta">
                          <span>{lesson.type}</span>
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="difficulty-badge">
                          <span className={`badge ${lesson.difficulty.toLowerCase()}`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="view-outline">
                  <button className="outline-button">
                    View Full Course Outline
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Course Progress */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Course Progress</h2>
                <div className="progress-chart-container">
                  <div
                    id="course-progress-chart"
                    className="progress-chart"
                  ></div>
                </div>
                <div className="progress-percentage">
                  <div className="percentage-value">{currentCourse.progress}%</div>
                  <div className="percentage-label">Course Completion</div>
                </div>
                <div className="progress-stats">
                  <div className="stat-item">
                    <span className="stat-label">Lessons Completed</span>
                    <span className="stat-value">9/12</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Quizzes Completed</span>
                    <span className="stat-value">3/4</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Assignments Submitted</span>
                    <span className="stat-value">2/3</span>
                  </div>
                </div>
              </div>
              <div className="streak-section">
                <div className="streak-content">
                  <div>
                    <div className="streak-label">Current Streak</div>
                    <div className="streak-subtext">Keep it going!</div>
                  </div>
                  <div className="streak-count">
                    <span className="count-value">5</span>
                    <span className="count-unit">days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Materials */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Learning Materials</h2>
                <div className="materials-list">
                  {learningMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="material-item"
                    >
                      <div className={`material-icon ${material.color}`}>
                        <i className={`fas ${material.icon}`}></i>
                      </div>
                      <div className="material-details">
                        <h3 className="material-title">{material.title}</h3>
                        <div className="material-meta">
                          <span>{material.type}</span>
                          {material.size && (
                            <>
                              <span className="meta-separator">•</span>
                              <span>{material.size}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <button className="download-button">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button className="view-materials-button">
                  View All Materials
                </button>
              </div>
            </div>

            {/* Need Help */}
            <div className="card">
              <div className="card-content">
                <h2 className="card-title">Need Help?</h2>
                <p className="help-text">
                  Having trouble with this course? Reach out for assistance.
                </p>
                <div className="help-options">
                  <button className="help-option">
                    <div className="option-content">
                      <div className="option-icon blue">
                        <i className="fas fa-comment-alt"></i>
                      </div>
                      <span className="option-text">Message Instructor</span>
                    </div>
                    <i className="fas fa-chevron-right option-arrow"></i>
                  </button>
                  <button className="help-option">
                    <div className="option-content">
                      <div className="option-icon green">
                        <i className="fas fa-users"></i>
                      </div>
                      <span className="option-text">Discussion Forum</span>
                    </div>
                    <i className="fas fa-chevron-right option-arrow"></i>
                  </button>
                  <button className="help-option">
                    <div className="option-content">
                      <div className="option-icon purple">
                        <i className="fas fa-question-circle"></i>
                      </div>
                      <span className="option-text">FAQs</span>
                    </div>
                    <i className="fas fa-chevron-right option-arrow"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-heading">EduLearn</h3>
              <p className="footer-text">
                Empowering students with interactive learning experiences and
                personalized education paths.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-subheading">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a
                    href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
                    data-readdy="true"
                    className="footer-link"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">My Courses</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Resources</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Calendar</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Help Center</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-subheading">Support</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">Help Center</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="footer-link">FAQs</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-subheading">Connect With Us</h4>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="newsletter">
                <p className="newsletter-text">Subscribe to our newsletter</p>
                <div className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="newsletter-input"
                  />
                  <button className="newsletter-button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">
              © 2025 EduLearn. All rights reserved.
            </div>
            <div className="payment-methods">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContinueLearning;