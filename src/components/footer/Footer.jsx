// src/components/Shared/Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-container">
                <div className="footer-col footer-about">
                    <h3>TheraMind AI</h3>
                    <p>Where healing journeys are never faced alone. Professional mental health support accessible to everyone.</p>
                    <div className="contact-info">
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Sohag, Egypt</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> support@theramind.ai</p>
                        <p><FontAwesomeIcon icon={faPhone} /> 1-800-THERAPY</p>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Our Team</li>
                        <li>Careers</li>
                        <li>News & Blog</li>
                    </ul>
                </div>
                
                <div className="footer-col">
                    <h4>Services</h4>
                    <ul>
                        <li>Find Therapists</li>
                        <li>Book Sessions</li>
                        <li>Support Groups</li>
                        <li>Resources</li>
                    </ul>
                </div>
                
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li>Help Center</li>
                        <li>FAQs</li>
                        <li>Contact Us</li>
                        <li>Feedback</li>
                    </ul>
                </div>
                
                <div className="footer-col">
                    <h4>Legal</h4>
                    <ul>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Cookie Policy</li>
                        <li>Disclaimer</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 TheraMind AI. All rights reserved.</p>
                <div className="social-icons">
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;