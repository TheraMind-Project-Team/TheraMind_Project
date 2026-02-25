// src/pages/SignLog/PatientAdditional.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdditionalForms.css';
import { Link } from 'react-router-dom';
const PatientAdditional = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const basicData = location.state; // البيانات من الخطوة الأولى

  const [medicalHistory, setMedicalHistory] = useState('');
  const [currentSymptoms, setCurrentSymptoms] = useState('');
  const [previousDiagnosis, setPreviousDiagnosis] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient Full Data:', {
      ...basicData,
      medicalHistory,
      currentSymptoms,
      previousDiagnosis,
      profilePhoto: profilePhoto?.name,
    });
    alert('Patient profile completed successfully!');
    navigate('/Home'); // أو أي صفحة بعد التسجيل
  };

  const handleSkip = () => {
    navigate('/Home');
  };

  return (
    <div className="patient-profile-wrapper">
      <div className="patient-profile-card">
        <div className="profile-header">
          <div className="heart-icon">❤️</div>
          <h2>Complete Your Patient Profile</h2>
          <p>Help us understand your health journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Medical Information Section */}
          <div className="section-card">
            <h3 className="section-title">
              <span className="icon">📋</span> Medical Information
            </h3>

            <div className="form-group">
              <label>Medical History</label>
              <textarea
                placeholder="Please describe any relevant medical history, past treatments, medications, or conditions..."
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                rows="4"
              />
              <p className="optional-note">Optional - This helps your therapist provide better care</p>
            </div>

            <div className="form-group">
              <label>Current Symptoms</label>
              <textarea
                placeholder="What symptoms or concerns are you experiencing? (e.g., anxiety, depression, stress, sleep issues...)"
                value={currentSymptoms}
                onChange={(e) => setCurrentSymptoms(e.target.value)}
                rows="4"
              />
              <p className="optional-note">Optional - Share what brings you here today</p>
            </div>

            <div className="form-group">
              <label>Previous Diagnosis (if any)</label>
              <textarea
                placeholder="Have you been previously diagnosed with any mental health conditions? Please share if comfortable..."
                value={previousDiagnosis}
                onChange={(e) => setPreviousDiagnosis(e.target.value)}
                rows="4"
              />
              <p className="optional-note">Optional - Only if you have been previously diagnosed</p>
            </div>
          </div>

          {/* Profile Photo Section */}
          <div className="section-card">
            <h3 className="section-title">
              <span className="icon">📷</span> Profile Photo
            </h3>

            <div className="file-upload-box">
              <input
                type="file"
                id="profilePhoto"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <label htmlFor="profilePhoto" className="upload-label">
                <span className="upload-icon">⬆</span>
                <p className="upload-text">
                  {profilePhoto ? profilePhoto.name : 'Upload Profile Photo'}
                </p>
                <p className="upload-subtext">PNG or JPG (MAX. 2MB)</p>
              </label>
              <p className="optional-note">Optional - Add a profile picture to personalize your account</p>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="privacy-note">
            <div className="privacy-icon">🔒</div>
            <div>
              <strong>Your Privacy Matters</strong>
              <p>
                All information you provide is confidential and will only be shared with your assigned therapist to provide you with the best possible care. You can update or remove this information at any time from your profile settings.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="action-buttons">
            <Link to="/Home"><button type="button" onClick={handleSkip} className="skip-btn">
              Skip for Now
            </button>
            </Link>
            <button type="submit" className="save-btn">
              <span className="save-icon">💾</span> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientAdditional;