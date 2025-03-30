import React, { useState } from "react";
import { pdfjs } from "react-pdf";

const API_KEY = "AIzaSyA0C3HemTdK3Gu36D8KpZxdigIiWAbh8iQ"; // Replace with your actual API key

async function fetchResponse(prompt, pdfContent = "") {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please configure your API key.");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: pdfContent + "\n\n" + prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";
  } catch (error) {
    console.error("Error fetching or processing response:", error);
    throw error;
  }
}

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfContent, setPdfContent] = useState("");

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
      const reply = await fetchResponse(message, pdfContent);
      setResponse(reply);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        if (data.text) {
          setPdfContent(data.text);
        } else {
          setError("Failed to extract text from PDF.");
        }
      } catch (err) {
        setError("Error uploading file: " + err.message);
      }
    }
  };
  

  return (
    <div style={{ backgroundColor: "#1a202c", color: "white", padding: "2rem", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", color: "#9f7aea", fontWeight: "bold" }}>
        Gemini AI Chat with PDF Support
      </h1>

      <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: "block", margin: "1rem auto" }} />

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
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
          {loading ? "Loading..." : "Send"}
        </button>
      </form>

      {response && (
        <div
          style={{
            backgroundColor: "#2d3748",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "2rem",
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