// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

const App: React.FC = () => {
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
      "course-progress-chart",
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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">
                  EduLearn
                </span>
              </div>
              <nav className="ml-10 flex space-x-8">
                <a
                  href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
                  data-readdy="true"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium cursor-pointer"
                >
                  Dashboard
                </a>
                <button
                  className={`${activeTab === "continue" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium cursor-pointer`}
                  onClick={() => setActiveTab("continue")}
                >
                  Continue Learning
                </button>
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium cursor-pointer">
                  My Courses
                </button>
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium cursor-pointer">
                  Resources
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 cursor-pointer">
                <i className="fas fa-search text-xl"></i>
              </button>
              <button className="p-2 rounded-full text-gray-500 cursor-pointer">
                <i className="fas fa-bell text-xl"></i>
              </button>
              <button className="p-2 rounded-full text-gray-500 cursor-pointer">
                <i className="fas fa-cog text-xl"></i>
              </button>
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-gray-700">
                      {userData.name}
                    </div>
                    <div className="text-xs text-gray-500">Student</div>
                  </div>
                  <img
                    className="h-8 w-8 rounded-full object-cover cursor-pointer"
                    src={userData.avatar}
                    alt="User avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <a
            href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
            data-readdy="true"
            className="hover:text-blue-600 cursor-pointer"
          >
            Dashboard
          </a>
          <i className="fas fa-chevron-right mx-2 text-xs"></i>
          <span className="text-gray-700 font-medium">Continue Learning</span>
        </div>

        {/* Current Course Banner */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-3/5 p-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <i className="fas fa-atom"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {currentCourse.title}
                  </h1>
                  <p className="text-gray-500">
                    Module: {currentCourse.module}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Current Progress
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {currentCourse.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${currentCourse.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Continue from where you left off
                </h2>
                <p className="text-gray-600 mb-4">{currentCourse.lastLesson}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="fas fa-clock mr-2"></i>
                    <span>Last accessed: {currentCourse.lastAccessed}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="fas fa-hourglass-half mr-2"></i>
                    <span>Time remaining: {currentCourse.timeRemaining}</span>
                  </div>
                </div>
                <a
                  href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
                  data-readdy="true"
                  className="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Continue <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
            <div className="md:w-2/5 relative">
              <img
                className="h-full w-full object-cover object-top"
                src={currentCourse.image}
                alt={currentCourse.title}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent md:bg-none"></div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start p-4 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`bg-${activity.color}-100 text-${activity.color}-600 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0`}
                      >
                        <i className={`fas ${activity.icon}`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-gray-800">
                            {activity.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {activity.date}, {activity.time}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          {activity.type === "quiz" && (
                            <div className="flex items-center">
                              <span className="mr-2">
                                Score:{" "}
                                <span className="font-medium">
                                  {activity.score}%
                                </span>
                              </span>
                              <div className="w-24 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${activity.score}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {activity.type === "video" && (
                            <div className="flex items-center">
                              <span className="mr-2">
                                Duration: {activity.duration}
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                                Completed
                              </span>
                            </div>
                          )}
                          {activity.type === "reading" && (
                            <div className="flex items-center">
                              <span className="mr-2">
                                Pages: {activity.pages}
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                                Completed
                              </span>
                            </div>
                          )}
                          {activity.type === "assignment" && (
                            <div className="flex items-center">
                              <span className="mr-2">
                                Status: {activity.status}
                              </span>
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                                Grade: {activity.grade}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 ml-2 cursor-pointer">
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer">
                    View All Activity{" "}
                    <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Next Up */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Next Up
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {nextLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-gray-50 rounded-lg overflow-hidden"
                    >
                      <div className="relative h-32">
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.title}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <button className="bg-white bg-opacity-90 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-100 transition duration-200 cursor-pointer">
                            <i className="fas fa-play text-blue-600"></i>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-800 mb-1">
                          {lesson.title}
                        </h3>
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                          <span>{lesson.type}</span>
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <span
                            className={`bg-${lesson.difficulty === "Beginner" ? "green" : lesson.difficulty === "Intermediate" ? "blue" : "purple"}-100 text-${lesson.difficulty === "Beginner" ? "green" : lesson.difficulty === "Intermediate" ? "blue" : "purple"}-800 px-2 py-0.5 rounded`}
                          >
                            {lesson.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                    View Full Course Outline
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Course Progress */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Course Progress
                </h2>
                <div className="flex items-center justify-center mb-4">
                  <div id="course-progress-chart" className="w-32 h-32"></div>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-800">
                    {currentCourse.progress}%
                  </div>
                  <div className="text-sm text-gray-500">Course Completion</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Lessons Completed
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      9/12
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Quizzes Completed
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      3/4
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Assignments Submitted
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      2/3
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Current Streak
                    </div>
                    <div className="text-xs text-gray-500">Keep it going!</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-blue-600 mr-1">
                      5
                    </span>
                    <span className="text-sm text-gray-600">days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Materials */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Learning Materials
                </h2>
                <div className="space-y-3 mb-4">
                  {learningMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`bg-${material.color}-100 text-${material.color}-600 rounded-lg p-2 mr-3`}
                      >
                        <i className={`fas ${material.icon}`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          {material.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{material.type}</span>
                          {material.size && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{material.size}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                  View All Materials
                </button>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Need Help?
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Having trouble with this course? Reach out for assistance.
                </p>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between bg-gray-50 p-3 rounded-lg text-left hover:bg-gray-100 transition duration-200 cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-600 rounded-lg p-2 mr-3">
                        <i className="fas fa-comment-alt"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Message Instructor
                      </span>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </button>
                  <button className="w-full flex items-center justify-between bg-gray-50 p-3 rounded-lg text-left hover:bg-gray-100 transition duration-200 cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-600 rounded-lg p-2 mr-3">
                        <i className="fas fa-users"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        Discussion Forum
                      </span>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </button>
                  <button className="w-full flex items-center justify-between bg-gray-50 p-3 rounded-lg text-left hover:bg-gray-100 transition duration-200 cursor-pointer">
                    <div className="flex items-center">
                      <div className="bg-purple-100 text-purple-600 rounded-lg p-2 mr-3">
                        <i className="fas fa-question-circle"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        FAQs
                      </span>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EduLearn</h3>
              <p className="text-gray-400 text-sm">
                Empowering students with interactive learning experiences and
                personalized education paths.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
                    data-readdy="true"
                    className="hover:text-white cursor-pointer"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    My Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Calendar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="text-sm text-gray-400">
                <p>Subscribe to our newsletter</p>
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
              <i className="fab fa-cc-visa text-gray-400 text-2xl"></i>
              <i className="fab fa-cc-mastercard text-gray-400 text-2xl"></i>
              <i className="fab fa-cc-paypal text-gray-400 text-2xl"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
