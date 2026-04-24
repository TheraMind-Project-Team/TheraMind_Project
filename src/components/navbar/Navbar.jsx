// src/components/navbar/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faBrain,
  faUser,
  faSignOutAlt,
  faRobot,
  faMagnifyingGlass,
  faBell,
  faVideo,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProtectedLink from '../ProtectedLink/ProtectedLink';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ===== Notifications State =====
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'session',
      title: 'Session Approved',
      message: 'Dr. John Smith has approved your session request for Jan 15, 2025 at 10:00 AM',
      time: '5 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'session',
      title: 'Session Approved',
      message: 'Dr. Sarah Wilson has approved your session request for Jan 16, 2025 at 2:00 PM',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'Welcome to TheraMind',
      message: 'Complete your profile to get personalized recommendations',
      time: '2 days ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // ===== End Notifications =====

  const dropdownItems = [
    { name: 'Depression', path: '/tests/depression' },
    { name: 'Generalized Anxiety Disorder', path: '/tests/anxiety' },
    { name: 'Panic Disorder', path: '/tests/panic' },
    { name: 'Stress Assessment', path: '/tests/stress' },
    { name: 'Eating Disorders', path: '/tests/eating' },
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout();
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
            <ProtectedLink to="/Home" className="nav-link">Home</ProtectedLink>
          </li>
          <li>
            <ProtectedLink to="/about" className="nav-link">About</ProtectedLink>
          </li>
          <li>
            <ProtectedLink to="/blogs" className="nav-link">Blogs</ProtectedLink>
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

        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              {/* حقل البحث */}
              <div className="search-bar">
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

              {/* ===== Notification Bell ===== */}
              <div className="notification-container" ref={notifRef}>
                <button
                  className="notification-bell-btn"
                  onClick={() => setShowNotifications(prev => !prev)}
                  aria-label="Notifications"
                >
                  <span className="bell-icon">
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <div className="notification-dropdown">

                    {/* Header */}
                    <div className="notification-header">
                      <h3>
                        <span className="header-bell">
                          <FontAwesomeIcon icon={faBell} />
                        </span>
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <button className="mark-all-btn" onClick={markAllAsRead}>
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {/* Unread summary */}
                    <p className="notification-unread-info">
                      You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                    </p>

                    {/* List */}
                    <div className="notification-list">
                      {notifications.length === 0 ? (
                        <div className="notification-empty">
                          <span className="empty-icon">🔔</span>
                          <p>No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div
                            key={notif.id}
                            className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                          >
                            {/* Icon */}
                            <div className={`notif-icon-wrapper ${notif.type === 'session' ? 'success' : 'info'}`}>
                              {notif.type === 'session' ? (
                                <FontAwesomeIcon icon={faCheck} />
                              ) : (
                                <FontAwesomeIcon icon={faBell} />
                              )}
                            </div>

                            {/* Content */}
                            <div className="notif-content">
                              <div className="notif-title">{notif.title}</div>
                              <p className="notif-desc">{notif.message}</p>
                              <div className="notif-meta">
                                <span className="notif-time">🕐 {notif.time}</span>
                                <div className="notif-actions">
                                  {notif.type === 'session' && (
                                    <button
                                      className="btn-join-session"
                                      onClick={() => navigate('/session')}
                                    >
                                      <FontAwesomeIcon icon={faVideo} />
                                      Join Session
                                    </button>
                                  )}
                                  {!notif.read && (
                                    <button
                                      className="btn-mark-read"
                                      onClick={() => markAsRead(notif.id)}
                                    >
                                      Mark as read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Close */}
                            <button
                              className="btn-close-notif"
                              onClick={() => dismissNotification(notif.id)}
                              aria-label="Dismiss"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <div className="notification-footer">
                        <Link to="/notifications" onClick={() => setShowNotifications(false)}>
                          View all notifications
                        </Link>
                      </div>
                    )}

                  </div>
                )}
              </div>
              {/* ===== End Notification Bell ===== */}

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
