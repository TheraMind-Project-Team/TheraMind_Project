import React from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import HomeImage from './HomeImg.png';


const Home = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/Book');
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-sec">
        <div className="hero-contain">
          <div className="hero-imag">
            <img 
                    src={HomeImage} // هنا نستخدم المتغير
                    alt="Doctor and AI shaking hands" 
                    className="home_main"
                />
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blogs-section">
        <div className="section-header">
          <h2>Mental Health Blogs</h2>
          <p>Explore articles about mental health conditions and awareness</p>
        </div>
        
        <div className="blogs-grid">
          <div className="blog-card">
            <div className="blog-image">
              <img src="https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=400&h=250&fit=crop" alt="Depression" />
              <span className="blog-tag">20 min read</span>
            </div>
            <div className="blog-content">
              <span className="blog-date">Dec 12, 2024</span>
              <h3>Understanding Depression</h3>
              <p>Learn about the signs, symptoms, and treatment options for depression</p>
              <button className="read-more-btn">Read More →</button>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop" alt="Personality" />
              <span className="blog-tag">15 min read</span>
            </div>
            <div className="blog-content">
              <span className="blog-date">Dec 12, 2024</span>
              <h3>Personality Disorders Explained</h3>
              <p>A comprehensive guide to understanding different personality disorders</p>
              <button className="read-more-btn">Read More →</button>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image">
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop" alt="Anxiety" />
              <span className="blog-tag">7 min read</span>
            </div>
            <div className="blog-content">
              <span className="blog-date">Jan 10, 2024</span>
              <h3>Managing Anxiety Disorders</h3>
              <p>Effective strategies and coping mechanisms for anxiety disorders</p>
              <button className="read-more-btn">Read More →</button>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image">
              <img src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=250&fit=crop" alt="Awareness" />
              <span className="blog-tag">5 min read</span>
            </div>
            <div className="blog-content">
              <span className="blog-date">Dec 2, 2024</span>
              <h3>Mental Health Awareness</h3>
              <p>Breaking the stigma and promoting mental health awareness</p>
              <button className="read-more-btn">Read More →</button>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image">
              <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop" alt="Brain" />
              <span className="blog-tag">4 min read</span>
            </div>
            <div className="blog-content">
              <span className="blog-date">Dec 5, 2024</span>
              <h3>Bipolar Disorder Insights</h3>
              <p>Understanding mood swings, cycles, and treatment approaches</p>
              <button className="read-more-btn">Read More →</button>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image">
              <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=250&fit=crop" alt="Schizophrenia" />
              <span className="blog-tag">9 min read</span>
            </div>
            <div className="blog-content">
              <span className="blog-date">Jan 5, 2024</span>
              <h3>Schizophrenia Facts</h3>
              <p>What, causes, symptoms and effective treatment options for schizophrenia</p>
              <button className="read-more-btn">Read More →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section className="therapists-section">
        <div className="section-header">
          <h2>Top Rated Therapists</h2>
          <p>Connect with our most experienced professionals</p>
        </div>

        <div className="therapists-grid">
          <div className="therapist-card">
            <div className="therapist-image">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop" alt="Dr. Emily Parker" />
            </div>
            <div className="therapist-info">
              <h3>Dr. Emily Parker</h3>
              <p className="therapist-specialty">Clinical Psychologist</p>
              <div className="therapist-rating">
                <span className="star">⭐</span>
                <span>4.9 (156 reviews)</span>
              </div>
              <button className="appointment-btn" onClick={handleBookAppointment}>Book Appointment</button>
            </div>
          </div>

          <div className="therapist-card">
            <div className="therapist-image">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" alt="Dr. Jack Wilson" />
            </div>
            <div className="therapist-info">
              <h3>Dr. Jack Wilson</h3>
              <p className="therapist-specialty">Licensed Counselor</p>
              <div className="therapist-rating">
                <span className="star">⭐</span>
                <span>4.8 (221 reviews)</span>
              </div>
              <button className="appointment-btn" onClick={handleBookAppointment}>Book Appointment</button>
            </div>
          </div>

          <div className="therapist-card">
            <div className="therapist-image">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop" alt="Dr. Laura Kim" />
            </div>
            <div className="therapist-info">
              <h3>Dr. Laura Kim</h3>
              <p className="therapist-specialty">Clinical Therapist</p>
              <div className="therapist-rating">
                <span className="star">⭐</span>
                <span>5.0 (113 reviews)</span>
              </div>
              <button className="appointment-btn" onClick={handleBookAppointment}>Book Appointment</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>10000+</h3>
          <p>Happy Clients</p>
        </div>
        <div className="stat-item">
          <h3>500+</h3>
          <p>Therapists</p>
        </div>
        <div className="stat-item">
          <h3>50000+</h3>
          <p>Sessions</p>
        </div>
        <div className="stat-item">
          <h3>4.9/5</h3>
          <p>Rating</p>
        </div>
      </section>
    </div>
  );
};

export default Home;