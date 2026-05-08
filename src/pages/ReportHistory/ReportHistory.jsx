import React, { useState, useEffect } from 'react';
import './ReportHistory.css';
import { useNavigate } from 'react-router-dom';
import { getReports } from '../ReportDetails/reportService'; 

const degreeConfig = {
  '1': { label: 'Mild',     color: '#22c55e', bg: '#dcfce7' },
  '2': { label: 'Moderate', color: '#f59e0b', bg: '#fef3c7' },
  '3': { label: 'Severe',   color: '#ef4444', bg: '#fee2e2' },
  'Mild': { label: 'Mild',     color: '#22c55e', bg: '#dcfce7' },
  'Moderate': { label: 'Moderate', color: '#f59e0b', bg: '#fef3c7' },
  'Severe': { label: 'Severe',   color: '#ef4444', bg: '#fee2e2' }
};

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // مريم: مثبتين 5 عشان دي اللي فيها داتا في SQL عندك حالياً
    const currentPatientId = 5; 

    getReports(currentPatientId)
      .then(data => {
        if (data && Array.isArray(data)) {
          const mapped = data.map(r => ({
            id: r.id || r.Id,
            date: new Date(r.createdAt || r.CreatedAt).toLocaleDateString('en-GB'),
            score: Math.round(r.riskScore || r.RiskScore || 0),
            // لو الـ severity جاية 2 أو "2" أو "Moderate" الكود هيعرف يتعامل معاها
            severityKey: String(r.severity || r.Severity || '1')
          }));
          setReports(mapped);
        }
      })
      .catch(err => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="rh-page">Loading...</div>;

  return (
    <div className="rh-page">
      <h1 className="rh-title">Report History</h1>
      <div className="rh-table-wrap">
        <div className="rh-table-head">
          <span>Date</span>
          <span>Score</span>
          <span>Degree</span>
          <span>Action</span>
        </div>
        
        {reports.length === 0 ? (
          <div className="rh-no-data">No reports found for this patient.</div>
        ) : (
          reports.map((r) => {
            // التعديل هنا: لو مش لاقي severityKey معين، هياخد '1' كافتراضي عشان ميعملش Error
            const config = degreeConfig[r.severityKey] || degreeConfig['1'];
            
            return (
              <div key={r.id} className="rh-row">
                <div>{r.date}</div>
                <div>{r.score}%</div>
                <div>
                  <span style={{ 
                    color: config.color, 
                    backgroundColor: config.bg,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    {config.label}
                  </span>
                </div>
                <button onClick={() => navigate(`/report/${r.id}`)}>View</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReportHistory;