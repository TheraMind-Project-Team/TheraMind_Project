import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReportDetails.css';
import { getReportById } from './reportService'; // ← إضافة

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
        <circle cx="45" cy="45" r={radius} fill="none" stroke="#e8eef4" strokeWidth="8"/>
        <circle cx="45" cy="45" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
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

  const [report, setReport]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // ── جيب بيانات التقرير بالـ ID لما الصفحة تفتح ──
  useEffect(() => {
    getReportById(reportId)
      .then(data => {
        // map الداتا اللي جت من الباك لنفس شكل اللي الكومبوننت بتستخدمه
        setReport({
          id:          data.id,
          degree:      data.severity,           // severity → degree
          score:       Math.round(data.riskScore),
          totalScore:  `${data.score} / 27`,    // لو الباك بعت score raw غيّره
          notes:       data.notes,

          // ── بيانات المريض ──
          // لو الباك بيبعتهم جوه object زي data.patient غيّر السطور دي
          fullName:    data.patientName   ?? 'N/A',
          age:         data.patientAge    ?? 'N/A',
          gender:      data.patientGender ?? 'N/A',
          email:       data.patientEmail  ?? 'N/A',
          phone:       data.patientPhone  ?? 'N/A',

          sessionDate: new Date(data.createdAt).toLocaleDateString('en-US', {
            day: 'numeric', month: 'long', year: 'numeric'
          }),

          // ── الـ advice ──
          // لو الباك بعت advice كـ string واحدة حولناها لـ array
          // لو بعتها array خليها زي ما هي
          advice: Array.isArray(data.advice)
            ? data.advice
            : data.notes
              ? [data.notes]
              : ['Please consult a mental health professional.'],
        });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [reportId]);

  if (loading) return <div className="rd-page"><p>Loading...</p></div>;
  if (error)   return (
    <div className="rd-page">
      <div className="rd-not-found">
        <h2>Report not found</h2>
        <button onClick={() => navigate('/report-history')} className="rd-back-btn">
          ← Back to History
        </button>
      </div>
    </div>
  );

  const { color, bg, border, light } = degreeConfig[report.degree] ?? degreeConfig['Moderate'];

  return (
    <div className="rd-page">

      <button onClick={() => navigate('/report-history')} className="rd-back-btn">
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

        <div className="rd-score-section" style={{ background: light }}>
          <div className="rd-score-circle">
            <CircleScore score={report.score} degree={report.degree} />
          </div>
          <div className="rd-score-info">
            <div className="rd-score-label">Total Score</div>
            <div className="rd-score-value">{report.totalScore.split(' / ')[0]}</div>
            <div className="rd-score-denominator">/ {report.totalScore.split(' / ')[1]}</div>
            <p className="rd-score-description">
              Higher score indicates<br/>more severe symptoms.
            </p>
          </div>
        </div>

        <div className="rd-degree-section" style={{ borderLeftColor: color, background: light }}>
          <div className="rd-degree-header">
            <div className="rd-degree-icon">⭐</div>
            <span className="rd-degree-label">Degree</span>
          </div>
          <h3 className="rd-degree-title" style={{ color }}>{report.degree} Depression</h3>
          <p className="rd-degree-description">
            Your results indicate a {report.degree.toLowerCase()} level of depression symptoms.
          </p>
        </div>

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

      <div className="rd-footer-message">
        <div className="rd-footer-icon">💚</div>
        <p className="rd-footer-title">Remember, small steps can lead to big changes.</p>
        <p className="rd-footer-text">Take care of your mind, you matter.</p>
      </div>
    </div>
  );
};

export default ReportDetails;