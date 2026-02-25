// src/pages/SignLog/DoctorAdditional.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdditionalForms.css';
const DoctorAdditional = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const basicData = location.state;

  const [specialty, setSpecialty] = useState('');
  const [onlinePrice, setOnlinePrice] = useState('');
  const [offlinePrice, setOfflinePrice] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [medicalLicense, setMedicalLicense] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [timeSlots, setTimeSlots] = useState([
    { day: '', timeOfDay: 'Morning', startTime: '', endTime: '', sessionType: 'Online' }
  ]);

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: '', timeOfDay: 'Morning', startTime: '', endTime: '', sessionType: 'Online' }]);
  };

  const updateSlot = (index, field, value) => {
    const updated = [...timeSlots];
    updated[index][field] = value;
    setTimeSlots(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Doctor Full Data:', {
      ...basicData,
      specialty, onlinePrice, offlinePrice, education, experience,
      medicalLicense: medicalLicense?.name,
      profilePhoto: profilePhoto?.name,
      timeSlots
    });
    alert('Doctor profile submitted! Waiting for admin approval.');
    navigate('/dashboard');
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="doctor-profile-wrapper">
      <div className="doctor-profile-card">
        <div className="profile-header">
          <div className="doctor-icon">👨‍⚕️</div>
          <h2>Complete Your Doctor Profile</h2>
          <p>Please provide your professional information</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Professional Information */}
          <div className="section-card">
            <h3 className="section-title">
              <span className="icon">👨‍⚕️</span> Professional Information
            </h3>

            <div className="form-group">
              <label>Specialty *</label>
              <input
                type="text"
                placeholder="e.g., Psychiatrist, Clinical Psychologist"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              />
            </div>

            <div className="price-row">
              <div className="form-group half">
                <label>Online Session Price *</label>
                <input
                  type="number"
                  placeholder="e.g., 200"
                  value={onlinePrice}
                  onChange={(e) => setOnlinePrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group half">
                <label>Offline Session Price *</label>
                <input
                  type="number"
                  placeholder="e.g., 300"
                  value={offlinePrice}
                  onChange={(e) => setOfflinePrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Education *</label>
              <input
                type="text"
                placeholder="e.g., MD in Psychiatry, Harvard Medical School"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Years of Experience *</label>
              <input
                type="number"
                placeholder="e.g., 10"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Documents & Photos */}
          <div className="section-card">
            <h3 className="section-title">
              <span className="icon">⬆</span> Documents & Photos
            </h3>

            <div className="file-upload-group">
              <label>Medical License *</label>
              <div className="file-upload-box required">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) => setMedicalLicense(e.target.files[0])}
                  required
                />
                <span className="upload-icon">⬆</span>
                <p>{medicalLicense ? medicalLicense.name : 'Upload Medical License'}</p>
                <p className="upload-subtext">PNG, JPG or PDF (MAX. 5MB)</p>
              </div>
            </div>

            <div className="file-upload-group">
              <label>Profile Photo (Optional)</label>
              <div className="file-upload-box">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
                <span className="upload-icon">⬆</span>
                <p>{profilePhoto ? profilePhoto.name : 'Upload Profile Photo'}</p>
                <p className="upload-subtext">PNG or JPG (MAX. 2MB)</p>
              </div>
            </div>
          </div>

          {/* Available Schedule */}
          <div className="section-card">
            <h3 className="section-title">
              <span className="icon">📅</span> Available Schedule
            </h3>

            {timeSlots.map((slot, index) => (
              <div key={index} className="time-slot-row">
                <select value={slot.day} onChange={(e) => updateSlot(index, 'day', e.target.value)} required>
                  <option value="">Select day</option>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>

                <select value={slot.timeOfDay} onChange={(e) => updateSlot(index, 'timeOfDay', e.target.value)}>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>

                <input type="time" value={slot.startTime} onChange={(e) => updateSlot(index, 'startTime', e.target.value)} required />
                <input type="time" value={slot.endTime} onChange={(e) => updateSlot(index, 'endTime', e.target.value)} required />

                <select value={slot.sessionType} onChange={(e) => updateSlot(index, 'sessionType', e.target.value)}>
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </div>
            ))}

            <button type="button" className="add-slot-btn" onClick={addTimeSlot}>
              + Add Time Slot
            </button>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button type="button" onClick={handleSkip} className="skip-btn">
              Skip for Now
            </button>
            <button type="submit" className="save-btn">
              <span className="save-icon">💾</span> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorAdditional;