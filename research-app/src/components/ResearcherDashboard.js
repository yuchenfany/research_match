/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import NavBar from './NavBar';

function ResearcherDashboard({ user }) {
  const [numStudies, setNumStudies] = useState(0);
  const [numParticipants, setNumParticipants] = useState(0);
  const [numMessages, setNumMessages] = useState(0);

  async function getNumMessagesSent() {
    const data = await fetch(`http://localhost:5000/chats/getNumMessagesSent/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    const messageCounts = json ?? [{ messages: 0 }];
    return messageCounts[0]?.messages;
  }

  async function getNumStudies() {
    const data = await fetch(`http://localhost:5000/study/researcher/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    return json?.length ?? 0;
  }

  async function getNumParticipants() {
    const data = await fetch(`http://localhost:5000/study/researcher/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    if (!json) {
      return 0;
    }
    return json.reduce((acc, obj) => acc + (obj?.participants?.length ?? 0), 0);
  }

  useEffect(() => {
    getNumStudies()
      .then(setNumStudies);
  }, []);

  useEffect(() => {
    getNumMessagesSent()
      .then(setNumMessages);
  }, []);

  useEffect(() => {
    getNumParticipants()
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
