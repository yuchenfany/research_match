/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import NavBar from './NavBar';

import { getResearcherNumStudies, getResearcherNumParticipants } from '../modules/user-api';
import { getNumMessagesSent } from '../modules/chat-api';

function ResearcherDashboard({ user }) {
  const [numStudies, setNumStudies] = useState(0);
  const [numParticipants, setNumParticipants] = useState(0);
  const [numMessages, setNumMessages] = useState(0);

  useEffect(() => {
    getResearcherNumStudies(user)
      .then(setNumStudies);
  }, []);

  useEffect(() => {
    getNumMessagesSent(user)
      .then(setNumMessages);
  }, []);

  useEffect(() => {
    getResearcherNumParticipants(user)
      .then(setNumParticipants);
  }, []);

  const cards = [
    ['TOTAL ?', `${0}`],
    ['TOTAL NUMBER OF PARTICIPANTS', `${numParticipants} ${numParticipants === 1 ? 'study' : 'studies'}`],
    ['TOTAL STUDIES', `${numStudies} ${numStudies === 1 ? 'study' : 'studies'}`],
    ['TOTAL MESSAGES SENT', `${numMessages} ${numMessages === 1 ? 'message' : 'messages'}`],
  ].map(([name, content]) => (
    <div key={name} className="dash-card">
      <h4>{name}</h4>
      <p>{content}</p>
    </div>
  ));

  if (!user.username) {
    return <div>forbidden</div>;
  }

  return (
    <div className="Dashboard">
      <NavBar user={user} />
      <div className="dashboard">
        <h1 className="header-left">Analytics</h1>
        <div className="dash-flex">{cards}</div>
      </div>
    </div>
  );
}

export default ResearcherDashboard;
