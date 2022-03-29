/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


function ResearcherHome({ user, setUser, setStudy }) {
  const navigate = useNavigate();
  return (
    <div className="ResearcherProfile">
      <NavBar user={user} />
      <div className="header-left">Researcher Home</div>
      <div className="study-transfer">
        <div className="header-left">For Testing Purposes: Directs to Add Study Page</div>
        <div className="study">
          <div className="study-transfer">Go to Study Page</div>
          <button className="view-button" type="button" onClick={() => navigate('/add-study')}>Add Study</button>
        </div>
      </div>
    </div>
  );
}

export default ResearcherHome;
