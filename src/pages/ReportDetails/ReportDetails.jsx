import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReportDetails.css';

const reportsDatabase = [
  {
    id: 1,
    date: '23 Apr 2026',
    time: '10:30 AM',
    score: 68,
    degree: 'Moderate',
    totalScore: '18 / 27',
    fullName: 'Ahmed Ali',
    age: '24 Years',
    gender: 'Male',
    email: 'ahmed.ali@email.com',
    phone: '+20 123 456 7890',
    sessionDate: '23 April 2026',
    advice: [
      'It is recommended to seek support from a mental health professional.',
      'Try to maintain a regular sleep schedule and engage in activities you enjoy.',
      'You are not alone, and help is always available.'
    ]
  },
  {
    id: 2,
    date: '20 Apr 2026',
    time: '09:15 AM',
    score: 40,
    degree: 'Mild',
    totalScore: '10 / 27',
    fullName: 'Ahmed Ali',
    age: '24 Years',
    gender: 'Male',
    email: 'ahmed.ali@email.com',
    phone: '+20 123 456 7890',
    sessionDate: '20 April 2026',
    advice: [
      'Your results indicate mild depression symptoms. Consider lifestyle changes.',
      'Engage in regular physical activity and maintain social connections.',
      'Monitor your mood and reach out if symptoms worsen.'
    ]
  },
  {
    id: 3,
    date: '15 Apr 2026',
    time: '08:45 AM',
    score: 85,
    degree: 'Severe',
    totalScore: '23 / 27',
    fullName: 'Ahmed Ali',
    age: '24 Years',
    gender: 'Male',
    email: 'ahmed.ali@email.com',
    phone: '+20 123 456 7890',
    sessionDate: '15 April 2026',
    advice: [
      'Your assessment indicates severe depression symptoms. Professional intervention is strongly recommended.',
      'Please contact a mental health professional as soon as possible.',
      'Crisis support is available 24/7. You are not alone in this.'
    ]
  }
];

const degreeConfig = {
  Mild:     { color: '#22c55e', bg: '#dcfce7', border: '#bbf7d0', light: '#f0fdf4' },
  Moderate: { color: '#f59e0b', bg: '#fef3c7', border: '#fde68a', light: '#fffbeb' },
  Severe:   { color: '#ef4444', bg: '#fee2e2', border: '#fecaca', light: '#fef2f2' },
};

const CircleScore = ({ score, degree }) => {
  const { color } = degreeConfig[degree];
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (score / 100) * circumference);
    }, 200);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  return (
    <div className="circle-wrap">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle
          cx="45" cy="45" r={radius}
          fill="none"
          stroke="#e8eef4"
          strokeWidth="8"
        />
        <circle
          cx="45" cy="45" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 45 45)"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <span className="circle-label" style={{ color }}>{score}%</span>
    </div>
  );
};

const ReportDetails = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const report = reportsDatabase.find(r => r.id === parseInt(reportId));

  if (!report) {
    return (
      <div className="rd-page">
        <div className="rd-not-found">
          <h2>Report not found</h2>
          <button onClick={() => navigate('/reports')} className="rd-back-btn">
            ← Back to History
          </button>
        </div>
      </div>
    );
  }

  const { color, bg, border, light } = degreeConfig[report.degree];

  return (
    <div className="rd-page">
      
      {/* ── BACK BUTTON ── */}
      <button
        onClick={() => navigate('/report-history')}
        className="rd-back-btn"
      >
        ← Back to History
      </button>

      {/* ── PATIENT INFORMATION ── */}
      <div className="rd-card">
        <div className="rd-card-header">
          <div className="rd-header-icon">👤</div>
          <h2 className="rd-card-title">Patient Information</h2>
        </div>

        <div className="rd-patient-grid">
          <div className="rd-patient-item">
            <div className="rd-patient-label">👤 Full Name</div>
            <div className="rd-patient-value">{report.fullName}</div>
          </div>

          <div className="rd-patient-item">
            <div className="rd-patient-label">🎂 Age</div>
            <div className="rd-patient-value">{report.age}</div>
          </div>

          <div className="rd-patient-item">
            <div className="rd-patient-label">♂ Gender</div>
            <div className="rd-patient-value">{report.gender}</div>
          </div>

          <div className="rd-patient-item">
            <div className="rd-patient-label">✉️ Email</div>
            <div className="rd-patient-value">{report.email}</div>
          </div>

          <div className="rd-patient-item">
            <div className="rd-patient-label">📱 Phone</div>
            <div className="rd-patient-value">{report.phone}</div>
          </div>

          <div className="rd-patient-item">
            <div className="rd-patient-label">📅 Session Date</div>
            <div className="rd-patient-value">{report.sessionDate}</div>
          </div>
        </div>
      </div>

      {/* ── DEPRESSION ASSESSMENT REPORT ── */}
      <div className="rd-card">
        <div className="rd-card-header">
          <div className="rd-header-icon">📋</div>
          <div>
            <h2 className="rd-card-title">Depression Assessment Report</h2>
            <p className="rd-card-subtitle">Here is your summary based on your recent session.</p>
          </div>
        </div>

        {/* Score Section */}
        <div className="rd-score-section" style={{ background: light }}>
          <div className="rd-score-circle">
            <CircleScore score={report.score} degree={report.degree} />
          </div>

          <div className="rd-score-info">
            <div className="rd-score-label">Total Score</div>
            <div className="rd-score-value">
              {report.totalScore.split(' / ')[0]}
            </div>
            <div className="rd-score-denominator">
              / {report.totalScore.split(' / ')[1]}
            </div>
            <p className="rd-score-description">
              Higher score indicates<br/>more severe symptoms.
            </p>
          </div>
        </div>

        {/* Degree Section */}
        <div className="rd-degree-section" style={{ borderLeftColor: color, background: light }}>
          <div className="rd-degree-header">
            <div className="rd-degree-icon">⭐</div>
            <span className="rd-degree-label">Degree</span>
          </div>
          <h3 className="rd-degree-title" style={{ color }}>
            {report.degree} Depression
          </h3>
          <p className="rd-degree-description">
            Your results indicate a {report.degree.toLowerCase()} level of depression symptoms.
          </p>
        </div>

        {/* Advice Section */}
        <div className="rd-advice-section">
          <div className="rd-advice-header">
            <div className="rd-advice-icon">💡</div>
            <span className="rd-advice-label">Advice</span>
          </div>
          <ul className="rd-advice-list">
            {report.advice.map((advice, idx) => (
              <li key={idx}>{advice}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── FOOTER MESSAGE ── */}
      <div className="rd-footer-message">
        <div className="rd-footer-icon">💚</div>
        <p className="rd-footer-title">Remember, small steps can lead to big changes.</p>
        <p className="rd-footer-text">Take care of your mind, you matter.</p>
      </div>
    </div>
  );
};

export default ReportDetails;