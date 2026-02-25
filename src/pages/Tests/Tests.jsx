import React from 'react';
import './Tests.css';
import { useNavigate } from 'react-router-dom';

const Tests = ({ testType = "Depression" }) => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    // الانتقال لصفحة الأسئلة
    navigate('/Tests/Question');
  };

  const handleBackToHome = () => {
    // العودة للصفحة الرئيسية
    navigate('/');
  };

  return (
    <div className="tests-container">
      <button className="back-to-home-btn" onClick={handleBackToHome}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Home
      </button>

      <div className="tests-card">
        <div className="brain-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" className="brain-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
            <circle cx="9" cy="11" r="1.5" fill="currentColor"/>
            <circle cx="15" cy="11" r="1.5" fill="currentColor"/>
            <path d="M12 14.5c-1.38 0-2.5.84-2.5 2h5c0-1.16-1.12-2-2.5-2z" fill="currentColor"/>
          </svg>
        </div>

        <h1 className="tests-title">{testType} Assessment</h1>
        
        <p className="tests-description">
          This assessment consists of {testType === "Depression" ? "5" : "5"} questions and will take approximately 5 minutes 
          to complete. Please answer honestly based on how you've been feeling recently.
        </p>

        <div className="instructions-box">
          <h3>Instructions:</h3>
          <ul>
            <li>• Read each question carefully</li>
            <li>• Select the answer that best describes your experience</li>
            <li>• There are no right or wrong answers</li>
            <li>• Your responses are confidential</li>
          </ul>
        </div>

        <button className="start-assessment-btn" onClick={handleStartAssessment}>
          Start Assessment
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Tests;