/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


function ResearcherHome({ user, setUser, setStudy }) {
  return (
    <div className="ResearcherProfile">
      <NavBar user={user} />
      <div className="header-left">Researcher Home</div>
    </div>
  );
}

export default ResearcherHome;
