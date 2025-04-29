import React, { useState, useEffect, useRef } from 'react';
import './PdfPage.css'; 

const API_KEY = 'AIzaSyA0C3HemTdK3Gu36D8KpZxdigIiWAbh8iQ'; 

const Pdfpage = () => {
  const [pdfText, setPdfText] = useState('');
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]); // to store multiple messages
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const chatBoxRef = useRef(null);

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
      } else {
        alert('Could not extract text.');
      }
    } catch (err) {
      alert('Failed to upload PDF.');
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setChats(prev => [...prev, userMessage]);
    setLoading(true);

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
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response.';
      const botMessage = { role: 'bot', content: replyText };
      setChats(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setChats(prev => [...prev, { role: 'system', content: 'Error getting response.' }]);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [chats]);

  return (
    <div className="app-container-pdf">
      <h1 className="header">NEX ChatBot</h1>

      <div className="upload-form">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          ref={fileInputRef}
        />
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {chats.map((chat, idx) => (
          <div key={idx} className={`message ${chat.role}`}>
            {chat.content}
          </div>
        ))}
        {loading && (
          <div className="message bot">Typing...</div>
        )}
      </div>

      <div className="input-area">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask NEX ChatBot..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Pdfpage;
