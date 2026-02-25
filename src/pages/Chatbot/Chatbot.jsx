import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { useNavigate } from 'react-router-dom';
import ChatbotImg from './ChatbotImg.jpg';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm TheraMind AI, your mental health companion. How are you feeling today?",
      sender: 'bot',
      time: '09:30 PM'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      title: 'Anxiety Support',
      preview: 'Thank you for sharing...',
      date: '12/22/2025'
    },
    {
      id: 2,
      title: 'Depression Chat',
      preview: "I'm here to listen...",
      date: '12/21/2025'
    },
    {
      id: 3,
      title: 'Stress Management',
      preview: "Let's work on some techniques...",
      date: '12/20/2025'
    }
  ]);
  
  const [selectedChat, setSelectedChat] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = [
    "I understand how you're feeling. Would you like to talk more about it?",
    "That's completely valid. Your feelings matter. Can you tell me what's been on your mind?",
    "I'm here to listen. Take your time and share what you're comfortable with.",
    "It sounds like you're going through a challenging time. How can I support you today?",
    "Thank you for sharing that with me. Let's explore this together.",
    "I hear you. Sometimes just talking about it can help. What would make you feel better?",
    "That must be difficult. Remember, it's okay to not be okay. How long have you been feeling this way?",
    "I appreciate you opening up. Would you like some coping strategies or just someone to listen?"
  ];

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm TheraMind AI, your mental health companion. How are you feeling today?",
        sender: 'bot',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleBackToHome = () => {
    navigate('/Home');
  };

  // الوظيفة المسؤولة عن الانتقال لصفحة الجلسة
  const handleStartMeeting = () => {
    navigate('/MeetingRobot'); 
  };

  return (
    <div className="chatbot-container">
      {/* Left Sidebar */}
      <div className="chatbot-sidebar">
        <button className="back-home-button" onClick={handleBackToHome}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Home
        </button>

        <button className="new-chat-button" onClick={handleNewChat}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New Chat
        </button>

        {/* الكارت المعدل لإضافة خاصية الضغط */}
        <div className="ai-card" onClick={handleStartMeeting} style={{ cursor: 'pointer' }}>
          <img 
            src={ChatbotImg}
            alt="AI Doctor" 
            className="ai-image"
          />
          <p className="ai-description">اضغط للبدء في جلسة تقييم نفسية</p>
        </div>

        <div className="chat-history">
          {chatHistory.map((chat) => (
            <div 
              key={chat.id} 
              className={`chat-history-item ${selectedChat === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <svg viewBox="0 0 24 24" fill="none" className="chat-icon">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div className="chat-history-content">
                <h4>{chat.title}</h4>
                <p>{chat.preview}</p>
                <span className="chat-date">{chat.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chatbot-main">
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-avatar">
            <img 
              src={ChatbotImg} 
              alt="TheraMind AI" 
            />
          </div>
          <div className="header-info">
            <h2>TheraMind AI Chatbot</h2>
            <p>Your 24/7 Mental Health Companion</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-area">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === 'bot' && (
                <div className="message-avatar">
                  <img 
                    src={ChatbotImg}
                    alt="Bot" 
                  />
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.text}
                </div>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send)"
              className="message-input"
            />
            <button className="attach-button">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="send-button" onClick={handleSendMessage}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="disclaimer-text">
            TheraMind AI is here to support you. Remember, this is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;