// src/components/Hero.jsx
import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// أيقونات الأقسام الثلاثة
import { faCloud, faBrain, faUserFriends, faClock } from '@fortawesome/free-solid-svg-icons'; 
import heroImage from './3abd0617-a6ce-4371-9816-923e3abe6ee3.png';

import './heroSection.css';
import './featuresSection.css';
import './ctaSection.css';
//import Login from '../SignLog/Login';



// مكون داخلي: بطاقة ميزة
const FeatureCard = ({ icon, title, description, colorClass }) => (
    <div className="feature-card">
        <div className={`icon-wrapper ${colorClass}`}>
            <FontAwesomeIcon icon={icon} className="feature-icon" />
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
    </div>
);

// ---------------------------------
// A. قسم الترحيب (HeroSection)
// ---------------------------------
const HeroSectionContent = () => {
    return (
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
                {/* تمثيل لحاوية الصورة الزرقاء الفنية */}
                <div className="hero-placeholder-image">
                   <img 
                    src={heroImage} // هنا نستخدم المتغير
                    alt="Doctor and AI shaking hands" 
                    className="hero-main-image"
                />
                    
                </div>
            </div>
        </section>
    );
};

// ---------------------------------
// B. قسم المميزات (FeaturesSection)
// ---------------------------------
const FeaturesSectionContent = () => {
    return (
        <section className="features-section">
            <div className="section-header">
                <h2 className="section-title">Why Choose TheraMind?</h2>
                <p className="section-subtitle">Revolutionary mental healthcare that adapts to your needs</p>
            </div>
            
            <div className="features-container">
                <FeatureCard 
                    icon={faBrain} 
                    title="AI-Powered Therapy"
                    description="Advanced AI technology that understands your emotions and provides personalized support 24/7."
                    colorClass="blue-icon"
                />
                <FeatureCard 
                    icon={faUserFriends} 
                    title="Expert Therapists"
                    description="Connect with licensed mental health professionals who truly care about your wellbeing."
                    colorClass="blue-icon" 
                />
                <FeatureCard 
                    icon={faClock} 
                    title="Available Anytime"
                    description="Access support whenever you need it. No appointments necessary for AI support."
                    colorClass="purple-icon" // لتغيير اللون في البطاقة الثالثة كما في التصميم
                />
            </div>
        </section>
    );
};

// ---------------------------------
// C. قسم الختام (CtaSection)
// ---------------------------------
const CtaSectionContent = () => {
    return (
        <section className="cta-section">
            <div className="cta-content">
                <h2 className="cta-title">Ready to Transform Your Mental Health?</h2>
                <p className="cta-text">
                    Take the first step towards a healthier, happier you. Join TheraMind today and experience the difference.
                </p>
            </div>
        </section>
    );
};

// ---------------------------------
// المكون المصدَّر
// ---------------------------------
const Hero = () => {
    return (
        <>
            <HeroSectionContent />
            <FeaturesSectionContent />
            <CtaSectionContent />
        </>
    );
};

export default Hero;