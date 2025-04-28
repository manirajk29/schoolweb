import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import "./PdfLibrary.css";

const PdfLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [activeView, setActiveView] = useState("grid");
  const [pdfDocuments, setPdfDocuments] = useState([]);

  useEffect(() => {
    fetch("/data/documents.json")
      .then((res) => res.json())
      .then((data) => setPdfDocuments(data));
  }, []);

  const toggleFavorite = (id) => {
    const updatedDocs = pdfDocuments.map((doc) =>
      doc.id === id ? { ...doc, favorite: !doc.favorite } : doc
    );
    setPdfDocuments(updatedDocs);
  };

  const filteredDocuments = pdfDocuments.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "all" || doc.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === "all" || doc.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const categories = [
    { id: 1, name: "Math", count: 12, icon: "fa-square-root-alt" },
    { id: 2, name: "Science", count: 8, icon: "fa-atom" },
    { id: 3, name: "History", count: 5, icon: "fa-landmark" },
    { id: 4, name: "English", count: 10, icon: "fa-book" },
    { id: 5, name: "Computer", count: 7, icon: "fa-laptop-code" },
    { id: 6, name: "Economics", count: 4, icon: "fa-chart-line" }
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">EduLearn Library</h1>
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Subjects</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <div className="view-toggle">
              <button
                className={`toggle-btn ${activeView === "grid" ? "active" : ""}`}
                onClick={() => setActiveView("grid")}
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                className={`toggle-btn ${activeView === "list" ? "active" : ""}`}
                onClick={() => setActiveView("list")}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {/* Categories Section */}
        <section className="categories">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => setSelectedSubject(category.name)}
              >
                <div className="category-icon">
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-count">{category.count} documents</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents Section */}
        <section className="documents">
          <div className="section-header">
            <h2 className="section-title">Documents</h2>
            <span className="document-count">
              Showing {filteredDocuments.length} of {pdfDocuments.length} documents
            </span>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-search empty-icon"></i>
              <h3 className="empty-title">No documents found</h3>
              <p className="empty-subtitle">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSubject("all");
                  setSelectedDifficulty("all");
                }}
                className="clear-filters-btn"
              >
                Clear All Filters
              </button>
            </div>
          ) : activeView === "grid" ? (
            <div className="grid-view">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="document-card">
                  <div className="thumbnail-wrapper">
                    <img src={doc.thumbnail} alt={doc.title} className="thumbnail" />
                    <button className="favorite-btn" onClick={() => toggleFavorite(doc.id)}>
                      <i className={`${doc.favorite ? "fas text-yellow" : "far"} fa-star`}></i>
                    </button>
                  </div>
                  <div className="document-content">
                    <div className="document-header">
                      <h3 className="document-title">{doc.title}</h3>
                      <span className={`badge ${doc.difficulty.toLowerCase()}`}>{doc.difficulty}</span>
                    </div>
                    <p className="document-description">{doc.description}</p>
                    <div className="document-meta">
                      <span><i className="fas fa-book-open"></i> {doc.pages} pages</span>
                      <span><i className="fas fa-clock"></i> {new Date(doc.lastAccessed).toLocaleDateString()}</span>
                    </div>
                    <div className="document-actions">
                      <button className="view-btn"><i className="fas fa-eye"></i> View</button>
                      <button className="download-btn"><i className="fas fa-download"></i></button>
                      <button className="options-btn"><i className="fas fa-ellipsis-v"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="list-view">
              <ul>
                {filteredDocuments.map((doc) => (
                  <li key={doc.id} className="list-item">
                    <div className="list-thumbnail">
                      <img src={doc.thumbnail} alt={doc.title} className="thumbnail" />
                    </div>
                    <div className="list-content">
                      <div className="list-header">
                        <h3 className="document-title">{doc.title}</h3>
                        <div className="badges">
                          <span className={`badge ${doc.difficulty.toLowerCase()}`}>{doc.difficulty}</span>
                          <span className="badge subject">{doc.subject}</span>
                        </div>
                      </div>
                      <p className="document-description">{doc.description}</p>
                      <div className="list-meta">
                        <span><i className="fas fa-book-open"></i> {doc.pages} pages</span>
                        <span><i className="fas fa-clock"></i> {new Date(doc.lastAccessed).toLocaleDateString()}</span>
                      </div>
                      <div className="document-actions">
                        <button className="view-btn"><i className="fas fa-eye"></i> View</button>
                        <button className="download-btn"><i className="fas fa-download"></i></button>
                        <button className="favorite-btn" onClick={() => toggleFavorite(doc.id)}>
                          <i className={`${doc.favorite ? "fas text-yellow" : "far"} fa-star`}></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            <p>Showing <span>1</span> to <span>8</span> of <span>{pdfDocuments.length}</span> results</p>
          </div>
          <div className="pagination-nav">
            <button className="pagination-btn"><i className="fas fa-chevron-left"></i></button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span className="pagination-ellipsis">...</span>
            <button className="pagination-btn"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3 className="footer-title">EduLearn</h3>
              <p className="footer-text">Empowering students with interactive learning experiences and personalized education paths.</p>
            </div>
            <div className="footer-col">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">PDF Lessons</a></li>
                <li><a href="#">Interactive Videos</a></li>
                <li><a href="#">Career Guidance</a></li>
                <li><a href="#">Learning Modules</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-subtitle">Support</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-subtitle">Connect With Us</h4>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <p className="footer-text">Subscribe to our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Your email" className="newsletter-input" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-text">© 2025 EduLearn. All rights reserved.</div>
            <div className="payment-icons">
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

export default PdfLibrary;
