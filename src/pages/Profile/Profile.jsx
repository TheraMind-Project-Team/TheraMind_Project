import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSession, setSelectedSession] = useState('online');
  const [selectedTime, setSelectedTime] = useState('');


  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM',
    '07:00 PM'
  ];

  const sessionPrices = {
    online: 80,
    clinic: 100
  };

  const sessionTypes = {
    online: 'Online',
    clinic: 'In-Clinic'
  };

  return (
    <div className="profile-container">
      {/* Doctor Header */}
      <section className="doctor-header">
        <div className="head_er">
          <div className="doctor-profile">
            <div className="profile-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop" 
                alt="Dr. Rabie Hassan Ragab" 
                className="profile-image"
              />
              <span className="online-indicator"></span>
            </div>
            <div className="doctor-info">
              <h1>Dr. Rabie Hassan Ragab</h1>
              <p className="doctor-specialty">Clinical Psychologist & Therapist</p>
              <div className="doctor-meta">
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Cairo, Egypt
                </span>
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  500+ Patients
                </span>
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  15 Years Experience
                </span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Settings
            </button>
            
            <Link to="/Prescription">
            <button className="btn-success">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Prescription
            </button></Link>
            
            <button className="btn-primary" onClick={() => setShowBooking(!showBooking)}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {showBooking ? 'Hide Booking' : 'Book Appointment'}
            </button>
          </div>
        </div>
      </section>

      <div className="profile-main">
        {/* Left Column */}
        <div className="left-column">
          {/* Booking Section - Only shows when showBooking is true */}
          {showBooking && (
            <section className="booking-section">
              <h2>Book Your Appointment</h2>
              
              <div className="session-type">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Session Type
                </h3>
                <div className="session-options">
                  <div 
                    className={`session-option ${selectedSession === 'online' ? 'active' : ''}`}
                    onClick={() => setSelectedSession('online')}
                  >
                    <div className="option-header">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M23 7l-7 5 7 5V7zM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>Online Session</span>
                    </div>
                    <p>Video consultation</p>
                    <span className="price">$80</span>
                  </div>
                  <div 
                    className={`session-option ${selectedSession === 'clinic' ? 'active' : ''}`}
                    onClick={() => setSelectedSession('clinic')}
                  >
                    <div className="option-header">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>In-Clinic Session</span>
                    </div>
                    <p>Face-to-face</p>
                    <span className="price">$100</span>
                  </div>
                </div>
              </div>

              <div className="datetime-selection">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Select Date & Time
                </h3>
                <div className="date-picker">
                  <label>Select Date</label>
                  <input type="date" />
                </div>
                <div className="time-picker">
                  <label>Select Time</label>
                  <div className="time-slots">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        className={`time-slot ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Rating Section */}
          <section className="rating-section">
            <h2>Overall Rating</h2>
            <div className="rating-summary">
              <div className="rating-score">
                <span className="score">4.9</span>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="star-icon">⭐</span>
                  ))}
                </div>
                <p>Based on 231 reviews</p>
              </div>
            </div>
            <div className="rating-bars">
              {[
                { stars: 5, percentage: 85, color: '#f39c12' },
                { stars: 4, percentage: 10, color: '#f39c12' },
                { stars: 3, percentage: 3, color: '#95a5a6' },
                { stars: 2, percentage: 1, color: '#95a5a6' },
                { stars: 1, percentage: 1, color: '#95a5a6' }
              ].map((item) => (
                <div key={item.stars} className="rating-bar">
                  <span>{item.stars} stars</span>
                  <div className="bar">
                    <div className="fill" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                  </div>
                  <span>{item.percentage}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Specializations */}
          <section className="specializations-section">
            <h2>Specializations</h2>
            <div className="tags">
              <span className="tag">Depression</span>
              <span className="tag">Anxiety Disorders</span>
              <span className="tag">PTSD</span>
              <span className="tag">Cognitive Therapy</span>
              <span className="tag">Family Counseling</span>
              <span className="tag">Stress Management</span>
            </div>
          </section>

          {/* Availability */}
          <section className="availability-section">
            <h2>Availability</h2>
            <div className="availability-list">
              <div className="availability-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Mon - Fri: 9:00 AM - 8:00 PM</span>
              </div>
              <div className="availability-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Sat: 10:00 AM - 4:00 PM</span>
              </div>
              <div className="availability-item closed">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Sun: Closed</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Summary - Only shows when showBooking is true */}
          {showBooking && (
            <section className="summary-section">
              <h2>Summary</h2>
              <div className="summary-content">
                <div className="summary-row">
                  <span>Type</span>
                  <span className="type-badge">{sessionTypes[selectedSession]}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="amount">${sessionPrices[selectedSession]}</span>
                </div>
                <button className="btn-join">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M15 10l-4 4 6 6 4-16-16 8 4 2 2 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Join Meeting
                </button>
                <p className="join-note">Click to start your video consultation</p>
              </div>
            </section>
          )}

          {/* About */}
          <section className="about-section">
            <h2>About Dr. Yahia Hassan</h2>
            <p>Dr. Yahia Hassan Ragab is a highly experienced Clinical Psychologist with over 15 years of experience in mental health care. He specializes in treating depression, anxiety disorders, PTSD, and provides cognitive behavioral therapy.</p>
            <p>Dr. Hassan graduated from Cairo University Faculty of Medicine and completed his specialization in Clinical Psychology at the American University in Cairo. He has helped over 500 patients overcome their mental health challenges through evidence-based therapeutic approaches.</p>
            <p>His patient-centered approach focuses on building trust, understanding individual needs, and creating personalized treatment plans that deliver real results.</p>
          </section>

          {/* Services */}
          <section className="services-section">
            <h2>Services Offered</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon blue">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M23 7l-7 5 7 5V7zM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="service-info">
                  <h3>Online Sessions</h3>
                  <p>Video consultations from anywhere</p>
                  <span className="service-price">$80/session</span>
                </div>
              </div>
              <div className="service-card">
                <div className="service-icon purple">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="service-info">
                  <h3>In-Clinic Sessions</h3>
                  <p>Face-to-face consultations</p>
                  <span className="service-price">$100/session</span>
                </div>
              </div>
              <div className="service-card">
                <div className="service-icon teal">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="service-info">
                  <h3>Chat Support</h3>
                  <p>Text-based therapy sessions</p>
                  <span className="service-price">$60/session</span>
                </div>
              </div>
              <div className="service-card">
                <div className="service-icon green">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="service-info">
                  <h3>Group Therapy</h3>
                  <p>Small group sessions</p>
                  <span className="service-price">$40/session</span>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="reviews-section">
            <h2>Recent Reviews</h2>
            <div className="reviews-list">
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-avatar">S</div>
                  <div className="reviewer-info">
                    <h4>Sarah M.</h4>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <span className="review-date">2 weeks ago</span>
                </div>
                <p className="review-text">Dr. Hassan is incredibly empathetic and professional. His sessions have truly changed my life.</p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-avatar">A</div>
                  <div className="reviewer-info">
                    <h4>Ahmed K.</h4>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <span className="review-date">1 month ago</span>
                </div>
                <p className="review-text">Best therapist I've ever worked with. Highly recommend his online sessions!</p>
              </div>

              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-avatar">F</div>
                  <div className="reviewer-info">
                    <h4>Fatima H.</h4>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <span className="review-date">1 month ago</span>
                </div>
                <p className="review-text">Very understanding and provides practical solutions. Worth every penny.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;