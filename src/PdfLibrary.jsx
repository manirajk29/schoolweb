// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    avatar:
      "https://public.readdy.ai/ai/img_res/dcc2929f2d2366e3fc536b13bb1247e3.jpg",
  };

  // Mock PDF categories
  const categories = [
    { id: 1, name: "Mathematics", icon: "fa-square-root-alt", count: 15 },
    { id: 2, name: "Science", icon: "fa-flask", count: 12 },
    { id: 3, name: "Literature", icon: "fa-book", count: 8 },
    { id: 4, name: "History", icon: "fa-landmark", count: 10 },
    { id: 5, name: "Computer Science", icon: "fa-laptop-code", count: 14 },
    { id: 6, name: "Languages", icon: "fa-language", count: 6 },
  ];

  // Mock PDF documents data
  const pdfDocuments = [
    {
      id: 1,
      title: "Calculus Fundamentals",
      description:
        "Introduction to differential and integral calculus with practical examples",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/2a4f9c6e0d8b7a3f1e5c2d9b8a7f6e3d.jpg",
      subject: "Mathematics",
      difficulty: "Intermediate",
      lastAccessed: "2025-03-25",
      pages: 45,
      favorite: true,
    },
    {
      id: 2,
      title: "Organic Chemistry Guide",
      description: "Comprehensive overview of organic compounds and reactions",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/3b5e8d7c9f2a1b6e4d7c8a9b2e5f3d1c.jpg",
      subject: "Science",
      difficulty: "Advanced",
      lastAccessed: "2025-03-28",
      pages: 72,
      favorite: false,
    },
    {
      id: 3,
      title: "World Literature Anthology",
      description: "Collection of classic literary works from around the world",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/7c9e2d5f8a3b6c1d4e7f9a2b5c8d3e6f.jpg",
      subject: "Literature",
      difficulty: "Intermediate",
      lastAccessed: "2025-03-20",
      pages: 120,
      favorite: true,
    },
    {
      id: 4,
      title: "Modern World History",
      description:
        "Comprehensive guide to major historical events from 1900 to present",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/1d4a7c2e5b8f3d6a9c2e5b8f3d6a9c2e.jpg",
      subject: "History",
      difficulty: "Beginner",
      lastAccessed: "2025-03-15",
      pages: 85,
      favorite: false,
    },
    {
      id: 5,
      title: "Python Programming",
      description: "Learn Python programming from basics to advanced concepts",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/9f3e2d1c8b7a6e5d4c3b2a1f9e8d7c6b.jpg",
      subject: "Computer Science",
      difficulty: "Intermediate",
      lastAccessed: "2025-03-30",
      pages: 64,
      favorite: true,
    },
    {
      id: 6,
      title: "Spanish Language Basics",
      description:
        "Beginner's guide to Spanish vocabulary, grammar, and conversation",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/5e8f2a7b3c9d1e6f4a2b7c9d5e8f2a3b.jpg",
      subject: "Languages",
      difficulty: "Beginner",
      lastAccessed: "2025-03-22",
      pages: 50,
      favorite: false,
    },
    {
      id: 7,
      title: "Advanced Physics Concepts",
      description: "Explore complex physics theories and their applications",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/2c4e6f8a1b3d5e7f9a2b4c6d8e1f3a5c.jpg",
      subject: "Science",
      difficulty: "Advanced",
      lastAccessed: "2025-03-18",
      pages: 92,
      favorite: true,
    },
    {
      id: 8,
      title: "Data Structures and Algorithms",
      description:
        "Comprehensive guide to fundamental computer science concepts",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/7a9c2e4f6b8d1a3c5e7f9b2d4a6c8e1f.jpg",
      subject: "Computer Science",
      difficulty: "Advanced",
      lastAccessed: "2025-03-27",
      pages: 78,
      favorite: false,
    },
  ];

  // Filter documents based on search query and filters
  const filteredDocuments = pdfDocuments.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      selectedSubject === "all" || doc.subject === selectedSubject;
    const matchesDifficulty =
      selectedDifficulty === "all" || doc.difficulty === selectedDifficulty;

    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  // Handle favorite toggle
  const toggleFavorite = (id: number) => {
    // In a real app, this would update the state and possibly send to a backend
    console.log(`Toggled favorite for document ID: ${id}`);
  };

  // Usage stats chart
  useEffect(() => {
    const usageChartElement = document.getElementById("usage-chart");
    if (usageChartElement) {
      const usageChart = echarts.init(usageChartElement);
      const usageOption = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            color: "#718096",
          },
          axisLine: {
            lineStyle: {
              color: "#E2E8F0",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#718096",
          },
          axisLine: {
            lineStyle: {
              color: "#E2E8F0",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#EDF2F7",
            },
          },
        },
        series: [
          {
            name: "Documents Viewed",
            type: "bar",
            data: [5, 8, 3, 7, 9, 4, 6],
            itemStyle: {
              color: "#4299E1",
            },
            emphasis: {
              itemStyle: {
                color: "#3182CE",
              },
            },
            barWidth: "60%",
          },
        ],
      };
      usageChart.setOption(usageOption);

      // Resize chart on window resize
      window.addEventListener("resize", () => {
        usageChart.resize();
      });

      return () => {
        window.removeEventListener("resize", () => {});
        usageChart.dispose();
      };
    }
  }, []);

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
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 cursor-pointer">
                <i className="fas fa-home text-xl"></i>
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
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="https://readdy.ai/home/72c50a9b-9aec-4bd1-bece-d59e6bd116b8/3a8d3c30-3fb3-46a3-a7a0-cc4b466d018a"
                  data-readdy="true"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  <i className="fas fa-home mr-2"></i>
                  Dashboard
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-gray-400 text-xs mx-1"></i>
                  <span className="ml-1 text-sm font-medium text-blue-600">
                    PDF Library
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="p-8 md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                PDF Library
              </h1>
              <p className="text-gray-600 mb-6">
                Access all your educational documents in one place. Search,
                filter, and organize your learning materials.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <i className="fas fa-file-pdf mr-2"></i>
                  <span>{pdfDocuments.length} Documents</span>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <i className="fas fa-folder mr-2"></i>
                  <span>{categories.length} Categories</span>
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <i className="fas fa-star mr-2"></i>
                  <span>
                    {pdfDocuments.filter((doc) => doc.favorite).length}{" "}
                    Favorites
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 bg-blue-50 p-8 flex flex-col justify-center">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Weekly Usage
                </h3>
                <p className="text-sm text-gray-600">
                  Track your document access patterns
                </p>
              </div>
              <div id="usage-chart" className="w-full h-48"></div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md mb-8 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search documents by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg flex items-center !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-filter mr-2"></i>
                Filters
              </button>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveView("grid")}
                  className={`py-2.5 px-4 ${activeView === "grid" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"} !rounded-button whitespace-nowrap cursor-pointer`}
                >
                  <i className="fas fa-th-large"></i>
                </button>
                <button
                  onClick={() => setActiveView("list")}
                  className={`py-2.5 px-4 ${activeView === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"} !rounded-button whitespace-nowrap cursor-pointer`}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="all">All Subjects</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <div className="relative">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none"
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <div className="relative">
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none">
                      <option value="recent">Recently Accessed</option>
                      <option value="title-asc">Title (A-Z)</option>
                      <option value="title-desc">Title (Z-A)</option>
                      <option value="pages">Number of Pages</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium mr-4 cursor-pointer">
                  Reset Filters
                </button>
                <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedSubject(category.name)}
              >
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${category.icon} text-2xl`}></i>
                </div>
                <h3 className="text-gray-800 font-medium mb-1">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {category.count} documents
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
            <div className="text-sm text-gray-600">
              Showing {filteredDocuments.length} of {pdfDocuments.length}{" "}
              documents
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-gray-400 text-5xl mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                No documents found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSubject("all");
                  setSelectedDifficulty("all");
                }}
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : activeView === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={doc.thumbnail}
                      alt={doc.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <button
                      className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-100 transition duration-200 cursor-pointer"
                      onClick={() => toggleFavorite(doc.id)}
                    >
                      <i
                        className={`${doc.favorite ? "fas text-yellow-500" : "far text-gray-600"} fa-star`}
                      ></i>
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-800">
                        {doc.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          doc.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : doc.difficulty === "Intermediate"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {doc.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                      <span className="flex items-center">
                        <i className="fas fa-book-open mr-1"></i> {doc.pages}{" "}
                        pages
                      </span>
                      <span className="flex items-center">
                        <i className="fas fa-clock mr-1"></i>{" "}
                        {new Date(doc.lastAccessed).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                        <i className="fas fa-eye mr-1"></i> View
                      </button>
                      <button className="bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-200 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                        <i className="fas fa-download"></i>
                      </button>
                      <button className="bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-200 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <li
                    key={doc.id}
                    className="p-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex flex-col sm:flex-row items-start">
                      <div className="relative sm:w-20 sm:h-28 mb-3 sm:mb-0 sm:mr-4">
                        <img
                          src={doc.thumbnail}
                          alt={doc.title}
                          className="w-full h-full object-cover object-top rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-800">
                            {doc.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${
                                doc.difficulty === "Beginner"
                                  ? "bg-green-100 text-green-800"
                                  : doc.difficulty === "Intermediate"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {doc.difficulty}
                            </span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {doc.subject}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {doc.description}
                        </p>
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <i className="fas fa-book-open mr-1"></i>{" "}
                              {doc.pages} pages
                            </span>
                            <span className="flex items-center">
                              <i className="fas fa-clock mr-1"></i>{" "}
                              {new Date(doc.lastAccessed).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex space-x-2 mt-2 sm:mt-0">
                            <button className="bg-blue-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-blue-700 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-eye mr-1"></i> View
                            </button>
                            <button className="bg-gray-100 text-gray-700 text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-gray-200 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer">
                              <i className="fas fa-download"></i>
                            </button>
                            <button
                              className="bg-gray-100 text-gray-700 text-sm font-medium py-1.5 px-3 rounded-lg hover:bg-gray-200 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                              onClick={() => toggleFavorite(doc.id)}
                            >
                              <i
                                className={`${doc.favorite ? "fas text-yellow-500" : "far"} fa-star`}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl shadow-md">
          <div className="flex flex-1 justify-between sm:hidden">
            <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer">
              Previous
            </button>
            <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer">
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">8</span> of{" "}
                <span className="font-medium">{pdfDocuments.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 !rounded-button whitespace-nowrap cursor-pointer">
                  <span className="sr-only">Previous</span>
                  <i className="fas fa-chevron-left h-5 w-5"></i>
                </button>
                <button className="relative inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus:outline-offset-0 !rounded-button whitespace-nowrap cursor-pointer">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 !rounded-button whitespace-nowrap cursor-pointer">
                  2
                </button>
                <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex !rounded-button whitespace-nowrap cursor-pointer">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
                <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 !rounded-button whitespace-nowrap cursor-pointer">
                  <span className="sr-only">Next</span>
                  <i className="fas fa-chevron-right h-5 w-5"></i>
                </button>
              </nav>
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
                    PDF Lessons
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Interactive Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Career Guidance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Learning Modules
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
