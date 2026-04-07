// src/components/navbar/Navbar.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faBrain,
  faUser,
  faSignOutAlt,
  faRobot,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProtectedLink from '../ProtectedLink/ProtectedLink';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // ← من الـ Context مش useState
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownItems = [
    { name: 'Depression', path: '/tests/depression' },
    { name: 'Generalized Anxiety Disorder', path: '/tests/anxiety' },
    { name: 'Panic Disorder', path: '/tests/panic' },
    { name: 'Stress Assessment', path: '/tests/stress' },
    { name: 'Eating Disorders', path: '/tests/eating' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();         // ← يحدّث الـ Context فوراً
    navigate('/login');
  };

  const Logo = (
    <div className="navbar-logo">
      <Link to="/">
        <span className="logo-text">
          <FontAwesomeIcon icon={faBrain} className="logo-icon" />
          TheraMind
        </span>
      </Link>
    </div>
  );

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        {Logo}

        <ul className="navbar-links">
          <li>
            {/* Home محمي: لو مش logged in → Signup */}
            <ProtectedLink to="/Home" className="nav-link">Home</ProtectedLink>
          </li>
          <li>
            <ProtectedLink to="/about" className="nav-link">About</ProtectedLink>
          </li>

          {/* Tests Dropdown */}
          <li
            className="dropdown-link"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="nav-link" onClick={toggleDropdown}>
              Tests
              <FontAwesomeIcon icon={faChevronDown} size="xs" className="dropdown-arrow" />
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  {dropdownItems.map((item, index) => (
                    <li key={index} className="dropdown-item">
                      <ProtectedLink to={item.path}>{item.name}</ProtectedLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </ul>

        {/* القسم الأيمن: يتغير أوتوماتيك حسب الـ Context */}
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              {/* حقل البحث */}
              <div className="search-bar">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for doctors..."
                  className="search-input"
                />
              </div>

              {/* Robot Sessions */}
              <Link to="/Chatbot" className="nav-link robot-link">
                <FontAwesomeIcon icon={faRobot} /> Robot Sessions
              </Link>

              {/* Profile */}
              <Link to="/profile" className="profile-btn">
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </Link>

              {/* Logout */}
              <button onClick={handleLogout} className="logout-btn">
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/Login">
                <button className="btn btn-login">Log in</button>
              </Link>
              <Link to="/Signup">
                <button className="btn btn-signup">Sign up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;