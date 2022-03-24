/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';

function ResearcherProfile({ user, setUser }) {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    // TODO: ADD VERIFY
    navigate('/researcher-home');
  }

  return (
    <div className="ResearcherProfile">
      <div className="header-left">Create Researcher Profile</div>
      <input className="signup-button" type="submit" value="SIGN UP" onClick={handleSubmit} />
    </div>
  );
}

export default ResearcherProfile;
