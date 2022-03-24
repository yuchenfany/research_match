/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function NavBar({ user, setUser }) {
  const [accountToggled, setAccountToggled] = useState(false);
  const navigate = useNavigate();

  const accountOptions = (
    <div
      className="acct-options"
      style={{ display: accountToggled ? 'flex' : 'none' }}
    >
      <button
        type="button"
        className="account-btn"
        onClick={async () => { navigate('/profile', { user, setUser }); }}
      >
        EDIT PROFILE
      </button>
      <button type="button" className="account-btn">DELETE ACCOUNT</button>
      <button
        type="button"
        className="logout-btn"
        onClick={async () => { navigate('/', { user, setUser }); }}
      >
        LOGOUT
      </button>
    </div>
  );

  const toggleAccountOptions = () => {
    setAccountToggled(!accountToggled);
  };

  return (
    <div className="nav">
      <button
        type="button"
        className="nav-btn"
        onClick={async () => {
          navigate(`/${(user.type ?? 0) === 0 ? 'participant' : 'researcher'}-home`);
        }}
      >
        HOME
      </button>
      <button type="button" className="nav-btn">MESSAGES</button>
      <button
        type="button"
        className="nav-btn"
        onClick={async () => { navigate('/dashboard', { user }); }}
      >
        ANALYTICS
      </button>
      <button type="button" className="account-btn" onClick={toggleAccountOptions}>ACCOUNT</button>
      {accountOptions}
    </div>
  );
}

export default NavBar;
