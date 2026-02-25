import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-badge">
            <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>About TheraMind AI Platform</span>
          </div>
          <h1 className="about-title">About Us</h1>
          <p className="about-description">
            We are <strong>TheraMind AI Platform</strong>, the first fully integrated AI-powered digital mental health platform, 
            designed to provide intelligent, safe, and compassionate psychological support.
          </p>
          <p className="about-mission">
            Our mission is to make mental health care accessible, effective, and human-centered — anytime, 
            anywhere.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision-section">
        <div className="mission-vision-grid">
          <div className="mv-card mission-card">
            <div className="mv-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" className="mv-icon">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2>Our Mission</h2>
            <p>
              To deliver fast, reliable, and empathetic mental health support powered by artificial intelligence — while 
              ensuring privacy, safety, and professionalism in every interaction.
            </p>
          </div>

          <div className="mv-card vision-card">
            <div className="mv-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" className="mv-icon">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h2>Our Vision</h2>
            <p>
              To become the leading digital mental health destination in the Arab world, where science, 
              technology, and empathy come together to improve lives.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-sec">
        <div className="features-head">
          <div className="features-badge">
            <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Our Platform Features</span>
          </div>
          <h2>What Makes Us Different</h2>
          <p>Nine powerful features designed to revolutionize mental health care</p>
        </div>

        <div className="features-gred">
          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>AI-Interactive AI Robot</h3>
            <p>A realistic 3D AI therapist that communicates via a real therapy session with empathy and expertise, ensuring continuous support.</p>
          </div>

          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Intelligent Mental Health Chatbot</h3>
            <p>An AI-powered text-based chatbot that understands your needs, gives instant, useful and compassionate responses.</p>
          </div>

          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 8v6M23 11h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Easy Appointment Booking</h3>
            <p>Book an appointment instantly with your chosen doctor — at your favorite time — through a simple, user-friendly interface.</p>
          </div>

          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Secure Online Payment</h3>
            <p>Make payments safely through email USDIs, cards, or digital wallets with instant booking confirmation.</p>
          </div>

          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Prescription Management System</h3>
            <p>Automatically receive your medical records and prescriptions in your private, secure account for follow-up tracking.</p>
          </div>

          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Anonymous Feedback</h3>
            <p>Users can leave anonymous reviews about their experience, helping improve trust, transparency, and quality across the platform.</p>
          </div>

          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Smart Medical Record</h3>
            <p>All chat history, AI-generated reports, and prescriptions are automatically saved in your personal medical record, allowing continuity in tracking and progress tracking.</p>
          </div>

          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Appointment Reminders (Push)</h3>
            <p>When each session draws closer, doctors can issue a secure digital prescriptions (PDF) that's instantly available for download within your account.</p>
          </div>

          <div className="feature-cerd">
            <div className="feature-iconic">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Doctor Profile Page</h3>
            <p>Each doctor has a personalized profile page showcasing their years, bio, specializations, patient reviews and availability — making it easier to choose the right match.</p>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="commitment-section">
        <div className="commitment-content">
          <div className="commitment-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Our Commitment</h2>
          <p>
            We are committed to maintaining the highest standards of security and confidentiality.
          </p>
          <div className="commitment-details">
            <p>
              All sessions are <strong>fully encrypted</strong>, and your personal data is protected with <strong>advanced privacy technologies</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2>Contact Us</h2>
        <p>Have a question or suggestion?</p>
        <div className="contact-email">
          <span>📧 Email us at</span>
          <a href="mailto:contact@theramind.com">contact@theramind.com</a>
        </div>
        <p className="contact-footer">
          Or reach out via our <strong>Contact Us</strong> page — we'd love to hear from you.
        </p>
      </section>
    </div>
  );
};

export default About;