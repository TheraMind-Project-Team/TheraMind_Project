import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Book.css';

const Book = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    sessionType: 'online',
    notes: '',
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSessionTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      sessionType: type
    }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }
    
    // إرسال البيانات لصفحة Confirmation
    navigate('/Book/Confirmation', { 
      state: {
        patientName: formData.fullName,
        date: formData.date,
        time: formData.time,
        sessionType: formData.sessionType,
        sessionLink: 'https://theramind.meet/session/' + Math.random().toString(36).substr(2, 9)
      }
    });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="book-container">
      <button className="back-to-home-btn" onClick={handleBackToHome}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Home
      </button>

      <div className="book-card">
        <div className="book-header">
          <h1>Book Your Appointment</h1>
          <p>Fill in the details to schedule your session</p>
        </div>

        <div className="book-form">
          {/* Patient Information */}
          <section className="form-section">
            <div className="section-title">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Patient Information</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+20 123 456 7890"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Address <span className="required">*</span></label>
              <input
                type="text"
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* Appointment Details */}
          <section className="form-section">
            <div className="section-title">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Appointment Details</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Select Date <span className="required">*</span></label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Select Time <span className="required">*</span></label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                >
                  <option value="">Choose a time slot</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Session Type <span className="required">*</span></label>
              <div className="session-types">
                <div
                  className={`session-type-card ${formData.sessionType === 'online' ? 'active' : ''}`}
                  onClick={() => handleSessionTypeChange('online')}
                >
                  <input
                    type="radio"
                    name="sessionType"
                    value="online"
                    checked={formData.sessionType === 'online'}
                    readOnly
                  />
                  <div className="session-content">
                    <h4>Online Session</h4>
                    <p>Video call via TheraMind</p>
                  </div>
                </div>

                <div
                  className={`session-type-card ${formData.sessionType === 'clinic' ? 'active' : ''}`}
                  onClick={() => handleSessionTypeChange('clinic')}
                >
                  <input
                    type="radio"
                    name="sessionType"
                    value="clinic"
                    checked={formData.sessionType === 'clinic'}
                    readOnly
                  />
                  <div className="session-content">
                    <h4>In-Person Visit</h4>
                    <p>Visit clinic directly</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Additional Notes (Optional)</label>
              <textarea
                name="notes"
                placeholder="Any special requirements or notes for the therapist..."
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
              />
            </div>
          </section>

          {/* Payment Information */}
          <section className="form-section">
            <div className="section-title">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M1 10h22" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Payment Information</span>
            </div>

            <div className="session-fee">
              <span>Session Fee:</span>
              <strong>500 EGP</strong>
            </div>

            <div className="form-group full-width">
              <label>Card Number <span className="required">*</span></label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
              />
            </div>

            <div className="form-group full-width">
              <label>Cardholder Name <span className="required">*</span></label>
              <input
                type="text"
                name="cardholderName"
                placeholder="Name on card"
                value={formData.cardholderName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date <span className="required">*</span></label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  maxLength="5"
                />
              </div>

              <div className="form-group">
                <label>CVV <span className="required">*</span></label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                />
              </div>
            </div>
          </section>

          <button onClick={handleSubmit} className="submit-btn">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Confirm Booking & Pay
          </button>

          <p className="disclaimer">
            * Required fields. Your payment information is secure and encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;