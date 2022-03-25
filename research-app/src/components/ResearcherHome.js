/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


function ResearcherHome({ user, setUser, setStudy }) {
  function testUser() {
    console.log(user.username);
    console.log(user.password);
    console.log(user.name);
    console.log(user.organization);
    console.log(user.type);
  }

  return (
    <div className="ResearcherProfile">
      <NavBar user={user} />
      <div className="header-left">Researcher Home</div>
      <button className="view-button" type="button" onClick={() => testUser()}>TEST</button>
    </div>
  );
}

export default ResearcherHome;
