import React, { useState } from "react";

const API_KEY = "AIzaSyA0C3HemTdK3Gu36D8KpZxdigIiWAbh8iQ"; // Replace with your actual API key

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }
    setLoading(true);
    setError(null);
    setResponse("");

    try {
      // Create form data to send both the file and the prompt
      const formData = new FormData();
      formData.append("prompt", message);
      if (file) {
        formData.append("pdf_file", file);
      }

      // Send to our backend endpoint
      const backendResponse = await fetch("/api/process-pdf", {
        method: "POST",
        body: formData,
      });

      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        throw new Error(`Server error! Status: ${backendResponse.status}, Message: ${errorText}`);
      }

      const data = await backendResponse.json();
      setResponse(data.response);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  return (
    <div style={{ backgroundColor: "#1a202c", color: "white", padding: "2rem", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", color: "#9f7aea", fontWeight: "bold" }}>
        Gemini AI Chat with PDF Support
      </h1>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="file-upload" style={{ display: "block", marginBottom: "0.5rem" }}>
            Upload PDF:
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: "block", width: "100%" }}
          />
          {fileName && (
            <div style={{ marginTop: "0.5rem", color: "#a0aec0" }}>
              Selected file: {fileName}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something about the PDF..."
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "1rem",
              backgroundColor: "#2d3748",
              borderColor: "#4a5568",
              color: "white",
              borderRadius: "8px",
              resize: "vertical",
              marginBottom: "1rem",
            }}
            disabled={loading}
          />
          {error && (
            <div
              style={{
                backgroundColor: "#e53e3e",
                color: "white",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              <strong>Error: </strong>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: "#9f7aea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Send"}
          </button>
        </form>
      </div>

      {response && (
        <div
          style={{
            backgroundColor: "#2d3748",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "2rem",
            maxWidth: "600px",
            margin: "2rem auto 0",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Response:</h2>
          <p style={{ whiteSpace: "pre-wrap", color: "#e2e8f0" }}>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;