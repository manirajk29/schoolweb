import React, { useState } from 'react';

const API_KEY = 'AIzaSyA0C3HemTdK3Gu36D8KpZxdigIiWAbh8iQ'; // Replace with your actual Gemini API key

const Pdfpage = () => {
  const [pdfText, setPdfText] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.text) {
        setPdfText(data.text);
        setError('');
      } else {
        setError('Could not extract text.');
      }
    } catch (err) {
      setError('Failed to upload PDF');
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) {
      setError('Please enter a message.');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    const prompt = pdfText
      ? `Here is the text from the PDF: ${pdfText}. Now answer my question: ${message}`
      : message;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response';
      setResponse(reply);
    } catch (err) {
      console.error(err);
      setError('Error getting response');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ backgroundColor: '#1a202c', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#9f7aea', fontWeight: 'bold' }}>Gemini AI Chat</h1>

      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ marginBottom: '1rem', color: 'white' }} />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          disabled={loading}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '1rem',
            backgroundColor: '#2d3748',
            border: '1px solid #4a5568',
            color: 'white',
            borderRadius: '8px',
            resize: 'vertical',
            marginBottom: '1rem',
          }}
        />

        {error && (
          <div style={{ backgroundColor: '#e53e3e', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#9f7aea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>

        {response && (
          <div style={{ backgroundColor: '#2d3748', padding: '1rem', borderRadius: '8px', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Response:</h2>
            <p style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pdfpage;
