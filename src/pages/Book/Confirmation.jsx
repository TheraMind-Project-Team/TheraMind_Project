import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // استقبال البيانات من Book component
  const data = location.state || {
    patientName: 'Patient Name',
    date: 'Date',
    time: 'Time',
    sessionType: 'online',
    sessionLink: 'https://theramind.meet/session/abc123def456'
  };

  const isOnlineSession = data.sessionType === 'online';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(data.sessionLink);
    alert('Link copied to clipboard!');
  };

  const handleBackToHome = () => {
    navigate('/Home');
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" className="success-checkmark">
            <circle cx="12" cy="12" r="10" fill="#27ae60" opacity="0.2"/>
            <circle cx="12" cy="12" r="10" stroke="#27ae60" strokeWidth="2" fill="none"/>
            <path d="M9 12l2 2 4-4" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="confirmation-title">Booking Confirmed!</h1>
        <p className="confirmation-subtitle">Your appointment has been successfully booked.</p>

        {/* Appointment Details */}
        <div className="details-box">
          <h3 className="details-title">Appointment Details</h3>
          
          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="none" className="detail-icon patient-icon">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="detail-content">
              <span className="detail-label">Patient:</span>
              <span className="detail-value">{data.patientName}</span>
            </div>
          </div>

          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="none" className="detail-icon calendar-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="detail-content">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{data.date}</span>
            </div>
          </div>

          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="none" className="detail-icon time-icon">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="detail-content">
              <span className="detail-label">Time:</span>
              <span className="detail-value">{data.time}</span>
            </div>
          </div>

          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="none" className="detail-icon type-icon">
              {isOnlineSession ? (
                <path d="M23 7l-7 5 7 5V7zM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
              ) : (
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
              )}
            </svg>
            <div className="detail-content">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{isOnlineSession ? 'Online Session' : 'In-Person Visit'}</span>
            </div>
          </div>
        </div>

        {/* Session Link (Only for Online Sessions) */}
        {isOnlineSession && (
          <div className="session-link-box">
            <div className="session-link-header">
              <svg viewBox="0 0 24 24" fill="none" className="link-icon">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Your Session Link</span>
            </div>
            
            <div className="link-input-wrapper">
              <input 
                type="text" 
                value={data.sessionLink} 
                readOnly 
                className="link-input"
              />
            </div>

            <button onClick={handleCopyLink} className="copy-link-btn">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Copy Link
            </button>
          </div>
        )}

        {/* Back to Home Button */}
        <button onClick={handleBackToHome} className="back-home-btn">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;