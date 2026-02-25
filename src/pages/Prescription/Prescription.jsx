import React, { useState } from 'react';
import './Prescription.css';
import { Link, useNavigate } from 'react-router-dom';

const Prescription = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    diagnosis: '',
    diagnosisDetails: '',
    medications: [
      {
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }
    ],
    followUpDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...formData.medications];
    newMedications[index][field] = value;
    setFormData(prev => ({
      ...prev,
      medications: newMedications
    }));
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, {
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }]
    }));
  };

  const handleSavePrescription = () => {
    console.log('Save prescription:', formData);
  };

  const handlePrintPDF = () => {
    console.log('Print as PDF');
  };

  const handleSendToPatient = () => {
    console.log('Send to patient:', formData);
  };

  const handleBackToProfile = () => {
    console.log('Back to profile');
    navigate('/Profile');
  };

  return (
    <div className="prescription-container">
      <div className="prescription-header-section">
        <div className="prescription-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" className="prescription-header-icon">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1>Digital Prescription</h1>
        <p>Create and manage psychiatric prescriptions</p>
      </div>

      <div className="prescription-card">
        <div className="prescription-card-header">
          <div className="clinic-info">
            <div className="clinic-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h3>TheraMind Clinic</h3>
              <p>Digital Prescription</p>
            </div>
          </div>
          <div className="prescription-meta">
            <p>Date: 12/23/2025</p>
            <p>Time: 9:30:12 PM</p>
            <p className="prescription-id">UNIQUE PRESCRIPTION ID: erxxqcekmaxk</p>
          </div>
        </div>

        {/* Doctor Information */}
        <section className="prescription-section">
          <h3>Doctor Information</h3>
          <div className="doctor-info-grid">
            <div>
              <p><strong>Dr. Rabie Hassan Ragab</strong></p>
              <p>Clinical Psychologist & Therapist</p>
            </div>
            <div>
              <p>123 Health Street, MediCity</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
        </section>

        {/* Patient Information */}
        <section className="prescription-section">
          <div className="section-title-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3>Patient Information</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input
                type="text"
                name="patientName"
                placeholder="John A. Smith"
                value={formData.patientName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="35"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input
                type="text"
                name="gender"
                placeholder="Male / Female"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Diagnosis <span className="required">*</span></label>
              <input
                type="text"
                name="diagnosis"
                placeholder="e.g., Major Depressive Disorder"
                value={formData.diagnosis}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Diagnosis & Treatment Plan */}
        <section className="prescription-section">
          <h3>Diagnosis & Treatment Plan</h3>
          <div className="form-group full-width">
            <textarea
              name="diagnosisDetails"
              placeholder="Enter clinical notes, diagnosis details, and treatment recommendations..."
              value={formData.diagnosisDetails}
              onChange={handleInputChange}
              rows="4"
            />
          </div>
          <p className="recommendation-text">
            Recommended: Ensure adequate rest, stay hydrated, and follow prescribed medication schedule. Follow up in 5-7 days if symptoms worsen.
          </p>
        </section>

        {/* Medication Details */}
        <section className="prescription-section">
          <div className="section-title-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3>Medication Details</h3>
          </div>

          {formData.medications.map((med, index) => (
            <div key={index} className="medication-block">
              <div className="form-grid">
                <div className="form-group">
                  <label>Medication Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Sertraline, Fluoxetine"
                    value={med.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g., 50mg, 100mg tablet"
                    value={med.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g., Once daily, twice daily"
                    value={med.frequency}
                    onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g., 7 days, 14 days, 30 days"
                    value={med.duration}
                    onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Special Instructions</label>
                <input
                  type="text"
                  placeholder="e.g., Take with food, Before bedtime, Avoid alcohol"
                  value={med.instructions}
                  onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                />
              </div>
            </div>
          ))}

          <button className="add-medication-btn" onClick={addMedication}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Medication
          </button>
        </section>

        {/* Follow-up Appointment */}
        <section className="prescription-section">
          <div className="section-title-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3>Follow-up Appointment</h3>
          </div>
          <div className="form-group">
            <label>Recommended Follow-up Date</label>
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Digital Signature */}
        <section className="prescription-section signature-section">
          <div className="signature-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <p className="signature-label">Digitally Signed by:</p>
            <p className="signature-name">Dr. Rabie Hassan Ragab</p>
            <p className="signature-disclaimer">
              This prescription is digitally signed and verified. It is valid for filling at any authorized pharmacy.
            </p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-save" onClick={handleSavePrescription}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2"/>
              <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Save Prescription
          </button>
          <button className="btn-print" onClick={handlePrintPDF}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 14h12v8H6z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Print as PDF
          </button>
          <button className="btn-send" onClick={handleSendToPatient}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Send to Patient
          </button>
        </div>
      </div>

      <button className="back-profile-btn" onClick={handleBackToProfile}>
        Back to Profile
      </button>
    </div>
  );
};

export default Prescription;