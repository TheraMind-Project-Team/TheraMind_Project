// src/pages/Login.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faMicrosoft,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle as faGoogleBrand, faMicrosoft as faMicrosoftBrand } from '@fortawesome/free-brands-svg-icons';

// استبدل المسار ده بالصورة الفعلية عندك
import loginImage from './c334bcc9-ad42-4b1c-af87-1f2975f0b9d4.png'; // أو ./assets/login-image.jpg

// نستخدم نفس الـ CSS اللي عملناه لـ Signup (مع بعض التعديلات البسيطة)
import './LoginForm.css'; // نفس الملف! (أو غيّر الاسم لو عملت ملف منفصل Auth.css)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(true);
      console.log({ email, password });
      alert('Login successful!'); // هنا هترسلي للـ API بعدين
      // يمكنك توجيه المستخدم: navigate('/dashboard')
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
      <div className="auth-form-card"> {/* نفس الكلاس signup-card بس من غير اسم signup */}
        <h2 className="auth-title">Welcome Back!</h2>
        <p className="auth-subtitle" style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Log in to continue your journey to better health.
        </p>

        {/* Social Login Buttons */}
        <div className="social-login-buttons">
          <button className="btn btn-social btn-google">
            <FontAwesomeIcon icon={faGoogleBrand} /> Continue with Google
          </button>
          <button className="btn btn-social btn-microsoft">
            <FontAwesomeIcon icon={faMicrosoftBrand} /> Continue with Microsoft
          </button>
        </div>

        <div className="divider">Or continue with email</div>

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

          {submitted && <p style={{ color: 'green', textAlign: 'center' }}>Login successful!</p>}

          <button type="submit" className="btn btn-primary signup-button"> {/* نفس الكلاس عشان نفس الستايل */}
            Login
          </button>
        </form>

        <p className="login-link"> {/* نفس الكلاس بس غيرنا النص */}
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;