// src/components/ProtectedLink/ProtectedLink.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedLink = ({ to, children, className }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/Signup');
    } else {
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default ProtectedLink;