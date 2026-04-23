import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faBrain, faUserFriends, faClock } from '@fortawesome/free-solid-svg-icons'; 
import heroImage from './3abd0617-a6ce-4371-9816-923e3abe6ee3.png';

import './heroSection.css';
import './featuresSection.css';
import './ctaSection.css';

// ---------------------------------
// المكونات الداخلية (Sub-components)
// ---------------------------------

const FeatureCard = ({ icon, title, description, colorClass }) => (
    <div className="feature-card">
        <div className={`icon-wrapper ${colorClass}`}>
            <FontAwesomeIcon icon={icon} className="feature-icon" />
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
    </div>
);

const HeroSectionContent = () => (
    <section className="hero-section">
        <div className="hero-content">
            <p className="tagline">
                <FontAwesomeIcon icon={faCloud} className="tagline-icon" />
                Your Digital Mental Health Companion
            </p>
            <h1 className="hero-title">Welcome to <span className="highlight">TheraMind</span></h1>
            <p className="hero-description">
                Start your mental wellness journey smartly — where advanced medicine meets modern technology.
            </p>
            <Link to="/Login"><button className="btn btn-get-started">Get Started →</button></Link>
            <p className="hero-note">Join thousands of people to their journey to better mental health</p>
        </div>
        <div className="hero-image-container">
            <div className="hero-placeholder-image">
                <img src={heroImage} alt="Therapy and AI" className="hero-main-image" />
            </div>
        </div>
    </section>
);

const FeaturesSectionContent = () => (
    <section className="features-section">
        <div className="section-header">
            <h2 className="section-title">Why Choose TheraMind?</h2>
            <p className="section-subtitle">Revolutionary mental healthcare that adapts to your needs</p>
        </div>
        <div className="features-container">
            <FeatureCard 
                icon={faBrain} title="AI-Powered Therapy" colorClass="purple-icon"
                description="Advanced AI technology that understands your emotions and provides personalized support 24/7."
            />
            <FeatureCard 
                icon={faUserFriends} title="Expert Therapists" colorClass="blue-icon"
                description="Connect with licensed mental health professionals who truly care about your wellbeing."
            />
            <FeatureCard 
                icon={faClock} title="Available Anytime" colorClass="purple-icon"
                description="Access support whenever you need it. No appointments necessary for AI support."
            />
        </div>
    </section>
);

const CtaSectionContent = () => (
    <section className="cta-section">
        <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Mental Health?</h2>
            <p className="cta-text">
                Take the first step towards a healthier, happier you. Join TheraMind today and experience the difference.
            </p>
        </div>
    </section>
);

// ---------------------------------
// المكون الرئيسي مع صفحة التحميل
// ---------------------------------
const Hero = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // مدة التحميل ثانية ونصف
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader-content">
                    <div className="brain-icon-wrapper">
                        <FontAwesomeIcon icon={faBrain} className="loader-brain" />
                        <div className="pulse-ring"></div>
                    </div>
                    <h2 className="loader-text">Thera<span>Mind</span></h2>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in-page">
            <HeroSectionContent />
            <FeaturesSectionContent />
            <CtaSectionContent />
        </div>
    );
};

export default Hero;