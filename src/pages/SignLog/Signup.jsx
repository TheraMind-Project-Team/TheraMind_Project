import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faPhone, 
  faMapMarkerAlt, 
  faCalendarAlt 
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import signupImage from './c334bcc9-ad42-4b1c-af87-1f2975f0b9d4.png';

import './SignupForm.css'; // نفس الـ CSS اللي كنتي بتستخدميه

const Signup = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState('patient');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('male');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!country) newErrors.country = 'Country is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!birthDate.trim()) newErrors.birthDate = 'Birth date is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validate()) {
      // جمع البيانات الأساسية
      const basicData = {
        userType,
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        gender,
        birthDate,
        password
      };

      // التنقل للصفحة الثانية حسب نوع المستخدم
      if (userType === 'patient') {
        navigate('/signup/patient', { state: basicData });
      } else {
        navigate('/signup/doctor', { state: basicData });
      }
    }
  };

  return (
    <div className="auth-page-wrepper"> {/* صححنا wrepper → wrapper */}
      {/* القسم الأيسر: الصورة */}
      <div className="auth-image-sec"> {/* صححنا sec → section */}
        <div className="image-place signup-image-bg"> {/* صححنا place → placeholder */}
          <img src={signupImage} alt="Doctor and patient" />
        </div>
      </div>

      {/* القسم الأيمن: الفورم */}
      <div className="auth-form-card signup-card">
        <h2 className="auth-title">
          Begin your journey to peace of mind with your doctor and AI.
        </h2>

        {/* أزرار Social Login */}
        <div className="social-login-buttons">
          <button className="btn btn-social btn-google">
            <FontAwesomeIcon icon={faGoogle} /> Sign up with Google
          </button>
          <button className="btn btn-social btn-microsoft">
            <FontAwesomeIcon icon={faMicrosoft} /> Sign up with Microsoft
          </button>
        </div>

        <div className="divider">Or sign up with email</div>

        <form className="signup-form" onSubmit={handleContinue}>
          {/* اختيار النوع */}
          <div className="radio-group-row">
            <span className="radio-label">I am a:</span>
            <div className="radio-option">
              <input
                type="radio"
                id="patient"
                name="userType"
                value="patient"
                checked={userType === 'patient'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <label htmlFor="patient">Patient</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="doctor"
                name="userType"
                value="doctor"
                checked={userType === 'doctor'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <label htmlFor="doctor">Doctor</label>
            </div>
          </div>

          {/* الاسم الأول والأخير */}
          <div className="input-group-row">
            <div className="input-group">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FontAwesomeIcon icon={faPhone} className="input-icon" />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          {/* الدولة والمدينة */}
          <div className="input-group-row">
            <div className="input-group select-group">
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select Country</option>
                <option value="Egypt">Egypt</option>
                <option value="USA">USA</option>
                {/* أضيفي دول أكتر */}
              </select>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
              {errors.country && <p className="error">{errors.country}</p>}
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
          </div>

          {/* الجنس وتاريخ الميلاد */}
          <div className="gender-birth-row">
            <div className="radio-group-row">
              <span className="radio-label">Gender:</span>
              <div className="radio-option">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div className="input-group date-input">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
              {errors.birthDate && <p className="error">{errors.birthDate}</p>}
            </div>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn btn-primary signup-button">
            Continue
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;