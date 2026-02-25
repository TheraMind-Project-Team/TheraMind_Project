import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TestResult.css';

const TestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // استقبال النتيجة من الـ state (لو مفيش نتيجة بنخليها 0)
  const score = location.state?.score || 0;

  // دالة لتحديد الحالة بناءً على النتيجة
  const getSeverity = (s) => {
    if (s <= 25) return { label: 'Minimal', color: '#4CAF50', text: 'Your responses suggest minimal symptoms. Keep maintaining your mental wellbeing.' };
    if (s <= 50) return { label: 'Mild', color: '#FFC107', text: 'Your responses suggest mild symptoms. Consider speaking with a professional if symptoms persist.' };
    if (s <= 75) return { label: 'Moderate', color: '#FF9800', text: 'Your responses suggest moderate symptoms. It is recommended to consult a therapist soon.' };
    return { label: 'Severe', color: '#F44336', text: 'Your responses suggest severe symptoms. Please reach out to a mental health professional as soon as possible.' };
  };

  const resultInfo = getSeverity(score);

  const handleBookSession = () => navigate('/Profile'); // عدلي المسار حسب صفحة الحجز عندك
  const handleBackToHome = () => navigate('/');

  return (
    <div className="test-result-container">
      <div className="result-card">
        <div className="success-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" className="success-icon">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="result-title">Assessment Complete</h1>
        <p className="result-subtitle">Here are your results</p>

        <div className="result-box">
          <h2 className="assessment-name">Depression Assessment</h2>
          
          <div className="score-section">
            <span className="score-value">{Math.round(score)}%</span>
            <span className="severity-badge" style={{ backgroundColor: resultInfo.color }}>
              {resultInfo.label}
            </span>
          </div>

          <div className="score-bar-container">
            <div className="score-bar" style={{ width: `${score}%`, backgroundColor: resultInfo.color }}></div>
          </div>

          <div className="interpretation-box">
            <div className="interpretation-header">
              <svg viewBox="0 0 24 24" fill="none" className="info-icon">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Interpretation</span>
            </div>
            <p className="interpretation-text">{resultInfo.text}</p>
          </div>
        </div>

        <button className="book-session-btn" onClick={handleBookSession}>
          Book a Session with a Therapist
        </button>

        <button className="back-home-btn" onClick={handleBackToHome}>
          Back to Home
        </button>

        <p className="disclaimer">
          * This is a screening tool only and not a diagnostic instrument. Please consult with a licensed mental health 
          professional for an accurate diagnosis.
        </p>
      </div>
    </div>
  );
};

export default TestResult;