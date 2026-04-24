import React, { useState, useEffect } from 'react';
import './ReportHistory.css';
import { useNavigate } from 'react-router-dom';

const reports = [
  { id: 1, date: '23 Apr 2026', time: '10:30 AM', score: 68, degree: 'Moderate' },
  { id: 2, date: '20 Apr 2026', time: '09:15 AM', score: 40, degree: 'Mild' },
  { id: 3, date: '15 Apr 2026', time: '08:45 AM', score: 85, degree: 'Severe' },
];

const degreeConfig = {
  Mild:     { color: '#22c55e', bg: '#dcfce7', border: '#bbf7d0' },
  Moderate: { color: '#f59e0b', bg: '#fef3c7', border: '#fde68a' },
  Severe:   { color: '#ef4444', bg: '#fee2e2', border: '#fecaca' },
};

/* Animated circular progress */
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
        {/* Track */}
        <circle
          cx="45" cy="45" r={radius}
          fill="none"
          stroke="#e8eef4"
          strokeWidth="8"
        />
        {/* Progress */}
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

const DegreeBadge = ({ degree }) => {
  const { color, bg, border } = degreeConfig[degree];
  return (
    <span
      className="degree-badge"
      style={{ color, background: bg, borderColor: border }}
    >
      <span className="degree-dot" style={{ background: color }} />
      {degree}
    </span>
  );
};

const FILTERS = ['All', 'Mild', 'Moderate', 'Severe'];
const SORTS = ['Latest First', 'Oldest First', 'Highest Score', 'Lowest Score'];

const ReportHistory = () => {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Latest First');
  const navigate = useNavigate();

  const filtered = reports
    .filter(r => filter === 'All' || r.degree === filter)
    .sort((a, b) => {
      if (sort === 'Highest Score') return b.score - a.score;
      if (sort === 'Lowest Score')  return a.score - b.score;
      if (sort === 'Oldest First')  return a.id - b.id;
      return b.id - a.id; // Latest First
    });

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  return (
    <div className="rh-page">

      {/* ── Header ── */}
      <div className="rh-header">
        <div className="rh-header-left">
          <div className="rh-header-icon">📋</div>
          <div>
            <h1 className="rh-title">Report History</h1>
            <p className="rh-subtitle">View all your depression assessment reports</p>
          </div>
        </div>
        <div className="rh-header-illustration" aria-hidden="true">
          <svg width="110" height="100" viewBox="0 0 110 100" fill="none">
            <rect x="10" y="5" width="68" height="82" rx="10" fill="#dbeafe" opacity="0.6"/>
            <rect x="22" y="22" width="44" height="6" rx="3" fill="#93c5fd"/>
            <rect x="22" y="34" width="36" height="6" rx="3" fill="#93c5fd"/>
            <rect x="22" y="46" width="40" height="6" rx="3" fill="#93c5fd"/>
            <circle cx="82" cy="68" r="26" fill="#bfdbfe" opacity="0.7"/>
            <circle cx="82" cy="68" r="18" fill="white" opacity="0.5"/>
            <path d="M74 68 L80 74 L92 62" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── User Card ── */}
      <div className="rh-user-card">
        <div className="rh-avatar">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="22" r="12" fill="#93c5fd"/>
            <ellipse cx="30" cy="50" rx="18" ry="10" fill="#93c5fd"/>
          </svg>
        </div>
        <div className="rh-user-info">
          <h2 className="rh-user-name">Ahmed Ali</h2>
          <div className="rh-user-meta">
            <div className="rh-meta-item">
              <span className="rh-meta-label">Age</span>
              <span className="rh-meta-value">24 Years</span>
            </div>
            <div className="rh-meta-divider" />
            <div className="rh-meta-item">
              <span className="rh-meta-label">Gender</span>
              <span className="rh-meta-value">Male</span>
            </div>
            <div className="rh-meta-divider" />
            <div className="rh-meta-item">
              <span className="rh-meta-label">Email</span>
              <span className="rh-meta-value">ahmed.ali@email.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter & Sort ── */}
      <div className="rh-controls">
        <div className="rh-filter-group">
          <span className="rh-control-label">Filter by Degree</span>
          <div className="rh-filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`rh-filter-btn ${filter === f ? 'active' : ''} ${f !== 'All' ? f.toLowerCase() : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="rh-sort-group">
          <span className="rh-control-label">Sort by</span>
          <select
            className="rh-sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rh-table-wrap">
        <div className="rh-table-head">
          <span className="rh-col-date">Date ↓</span>
          <span className="rh-col-score">Score</span>
          <span className="rh-col-degree">Degree</span>
          <span className="rh-col-action">Action</span>
        </div>

        {filtered.length === 0 ? (
          <div className="rh-empty">No reports match the selected filter.</div>
        ) : (
          filtered.map((r, i) => (
            <div
              key={r.id}
              className="rh-row"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="rh-col-date rh-date-cell">
                <div className="rh-date-icon">📅</div>
                <div>
                  <div className="rh-date-main">{r.date}</div>
                  <div className="rh-date-time">{r.time}</div>
                </div>
              </div>

              <div className="rh-col-score">
                <CircleScore score={r.score} degree={r.degree} />
              </div>

              <div className="rh-col-degree">
                <DegreeBadge degree={r.degree} />
              </div>

              <div className="rh-col-action">
                <button 
                  className="rh-view-btn"
                  onClick={() => handleViewReport(r.id)}
                >
                  View
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer Note ── */}
      <div className="rh-footer-note">
        <div className="rh-info-icon">ℹ️</div>
        <span>Click on &quot;View&quot; to see full report details and recommendations.</span>
      </div>

    </div>
  );
};

export default ReportHistory;