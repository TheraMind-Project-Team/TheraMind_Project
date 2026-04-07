import React, { useState, useEffect } from 'react';
import './MeetingRobot.css';
import { useNavigate } from 'react-router-dom';
import DoctorRobotAvatar from './DoctorRobotAvatar';

const MeetingRobot = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording]         = useState(true);
  const [recordingTime, setRecordingTime]     = useState(0);
  const [isMicOn, setIsMicOn]                 = useState(true);
  const [isCameraOn, setIsCameraOn]           = useState(true);
  const [isSpeakerOn, setIsSpeakerOn]         = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [viewMode, setViewMode]               = useState('grid');
  const [lastAiText, setLastAiText]           = useState('');

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsRecording(false);
    navigate('/RatingSession');
  };

  return (
    <div className="robot-meeting-container">
      {/* Header */}
      <div className="meeting-header">
        <div className="meeting-title">
          <h2>Therapy Session</h2>
          {isRecording && (
            <div className="recording-indicator">
              <span className="rec-dot"></span>
              <span className="rec-text">REC {formatTime(recordingTime)}</span>
            </div>
          )}
        </div>
        <div className="header-actions">
          <button
            className={`view-toggle ${viewMode === 'gallery' ? 'active' : ''}`}
            onClick={() => setViewMode(viewMode === 'grid' ? 'gallery' : 'grid')}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Gallery View</span>
          </button>
          <button className="menu-button">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="2" fill="currentColor"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
              <circle cx="12" cy="19" r="2" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="meeting-content">
        {/* Robot Video */}
        <div className="video-container robot-video">
          <div className="video-label">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2"/>
              <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Dr. TheraMind AI Robot</span>
          </div>
          <div className="robot-display">
            <DoctorRobotAvatar
              avatarUrl="/69530adc0ca398caeab557ae.glb"
              aiText={lastAiText}
            />
          </div>
        </div>

        {/* User Video */}
        <div className="video-container user-video">
          <div className="user-display">
            <div className="user-avatar">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <p className="user-label">You</p>
          </div>
          <div className="video-label-bottom">You</div>
        </div>
      </div>

      {/* Controls */}
      <div className="meeting-controls">
        <div className="controls-left">
          <div className="timer-display">
            <span className="timer-dot"></span>
            <span>{formatTime(recordingTime)}</span>
          </div>
        </div>

        <div className="controls-center">
          <button className={`control-button ${!isMicOn ? 'off' : ''}`} onClick={() => setIsMicOn(!isMicOn)}>
            {isMicOn ? (
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/></svg>
            )}
          </button>

          <button className={`control-button ${!isCameraOn ? 'off' : ''}`} onClick={() => setIsCameraOn(!isCameraOn)}>
            {isCameraOn ? (
              <svg viewBox="0 0 24 24" fill="none"><path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none"><path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/></svg>
            )}
          </button>

          <button className={`control-button ${!isSpeakerOn ? 'off' : ''}`} onClick={() => setIsSpeakerOn(!isSpeakerOn)}>
            {isSpeakerOn ? (
              <svg viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </button>

          <button className={`control-button ${isScreenSharing ? 'active' : ''}`} onClick={() => setIsScreenSharing(!isScreenSharing)}>
            <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          <button className="control-button">
            <svg viewBox="0 0 24 24" fill="none"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8c0 .796-.316 1.559-.879 2.121l-.707.708a1 1 0 0 0-.293.707V21a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5.5M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button className="control-button end-call-button" onClick={handleEndCall}>
            <svg viewBox="0 0 24 24" fill="none"><path d="M23 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 5.11 3h4.09a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 12.1a16 16 0 0 0 6 6l2.47-2.35a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2z" fill="currentColor"/></svg>
            <span>End Call</span>
          </button>
        </div>

        <div className="controls-right">
          <button className="control-button">
            <svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
          <button className="control-button">
            <svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="control-button whatsapp-button">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRobot;