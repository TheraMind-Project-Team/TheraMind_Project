// src/pages/SignLog/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle as faGoogleBrand, faMicrosoft as faMicrosoftBrand } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../../context/AuthContext';
import loginImage from './c334bcc9-ad42-4b1c-af87-1f2975f0b9d4.png';
import './LoginForm.css';

const Login = () => {
  const { login } = useAuth(); // ← من الـ Context
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login();           // ← الـ Navbar يتغير فوراً أوتوماتيك
      navigate('/Home'); // ← توجيه للهوم بدون refresh
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* القسم الأيسر: الصورة */}
      <div className="auth-image-section">
        <div className="image-placeholder login-image-bg">
          <img src={loginImage} alt="Doctor and patient" />
        </div>
      </div>

      {/* القسم الأيمن: الفورم */}
      <div className="auth-form-card">
        <h2 className="auth-title">Welcome Back!</h2>
        <p className="auth-subtitle" style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Log in to continue your journey to better health.
        </p>

        

        <div className="divider">Continue With Email</div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>

          <button type="submit" className="btn btn-primary signup-button">
            Login
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;