// src/pages/NotificationsPage/NotificationsPage.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCheck,
  faVideo,
  faTrash,
  faFilter,
  faCheckDouble,
  faClock,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './NotificationsPage.css';

const initialNotifications = [
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
  {
    id: 4,
    type: 'session',
    title: 'Session Reminder',
    message: 'Your session with Dr. Emily Clarke is starting in 30 minutes',
    time: '3 days ago',
    read: true,
  },
  {
    id: 5,
    type: 'info',
    title: 'New Blog Post',
    message: 'Check out the latest article: "Managing Anxiety in Daily Life" by our experts',
    time: '5 days ago',
    read: true,
  },
  {
    id: 6,
    type: 'session',
    title: 'Session Completed',
    message: 'Your session with Dr. John Smith has been completed. Please leave a review.',
    time: '1 week ago',
    read: true,
  },
];

const FILTERS = ['All', 'Unread', 'Sessions', 'Info'];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('All');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === 'Unread') return !n.read;
    if (activeFilter === 'Sessions') return n.type === 'session';
    if (activeFilter === 'Info') return n.type === 'info';
    return true;
  });

  return (
    <div className="notif-page">
      {/* Page Header */}
      <div className="notif-page-header">
        <div className="notif-page-header-inner">
          <div className="notif-page-title-group">
            <div className="notif-page-icon">
              <FontAwesomeIcon icon={faBell} />
              {unreadCount > 0 && <span className="notif-page-badge">{unreadCount}</span>}
            </div>
            <div>
              <h1 className="notif-page-title">Notifications</h1>
              <p className="notif-page-subtitle">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : "You're all caught up. Check back later!"}
              </p>
            </div>
          </div>

          <div className="notif-page-actions">
            {unreadCount > 0 && (
              <button className="notif-action-btn secondary" onClick={markAllAsRead}>
                <FontAwesomeIcon icon={faCheckDouble} />
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button className="notif-action-btn danger" onClick={clearAll}>
                <FontAwesomeIcon icon={faTrash} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="notif-filters">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          {FILTERS.map(f => (
            <button
              key={f}
              className={`notif-filter-tab ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
              {f === 'Unread' && unreadCount > 0 && (
                <span className="filter-count">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="notif-page-body">
        {filtered.length === 0 ? (
          <div className="notif-page-empty">
            <div className="empty-illustration">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <h2>No notifications here</h2>
            <p>
              {activeFilter !== 'All'
                ? `No ${activeFilter.toLowerCase()} notifications found.`
                : "You're all caught up. Check back later!"}
            </p>
          </div>
        ) : (
          <div className="notif-page-list">
            {filtered.map((notif, i) => (
              <div
                key={notif.id}
                className={`notif-card ${notif.read ? 'read' : 'unread'}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* Left accent bar for unread */}
                {!notif.read && <div className="notif-card-accent" />}

                {/* Icon */}
                <div className={`notif-card-icon ${notif.type === 'session' ? 'success' : 'info'}`}>
                  <FontAwesomeIcon icon={notif.type === 'session' ? faCheck : faCircleInfo} />
                </div>

                {/* Content */}
                <div className="notif-card-content">
                  <div className="notif-card-top">
                    <h3 className="notif-card-title">{notif.title}</h3>
                    {!notif.read && <span className="unread-dot" />}
                  </div>
                  <p className="notif-card-message">{notif.message}</p>
                  <div className="notif-card-footer">
                    <span className="notif-card-time">
                      <FontAwesomeIcon icon={faClock} />
                      {notif.time}
                    </span>
                    <div className="notif-card-btns">
                      {notif.type === 'session' && (
                        <button
                          className="btn-join"
                          onClick={() => navigate('/session')}
                        >
                          <FontAwesomeIcon icon={faVideo} />
                          Join Session
                        </button>
                      )}
                      {!notif.read && (
                        <button className="btn-read" onClick={() => markAsRead(notif.id)}>
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dismiss */}
                <button className="notif-card-dismiss" onClick={() => dismiss(notif.id)} aria-label="Dismiss">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

