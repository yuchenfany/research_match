/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function NavBar({ user }) {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <button type="button" className="nav-btn" onClick={async () => { navigate('/home'); }}>HOME</button>
      <button type="button" className="nav-btn">MESSAGES</button>
      <button type="button" className="nav-btn" onClick={async () => { navigate('/dashboard', { user }); }}>ANALYTICS</button>
      <button type="button" className="account-btn">ACCOUNT</button>
    </div>
  );
}

export default NavBar;
