/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import NavBar from './NavBar';

function ParticipantDashboard({ user }) {
  const [totalCompensation, setTotalCompensation] = useState(0);
  const [numEnrolled, setNumEnrolled] = useState(0);
  const [numRecommended, setNumRecommended] = useState(0);
  const [numMessages, setNumMessages] = useState(0);

  async function getStudyIds() {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    const userTags = json.phys.concat(json.psych.concat(json.med));
    return userTags;
  }

  // gets individual study by id
  async function getStudy(studyId) {
    const data = await fetch(`http://localhost:5000/study/tag/${studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.json();
  }

  // get all studies
  async function getNumRecommended() {
    const studyIds = await getStudyIds();
    const studiesByTag = await Promise.all(studyIds.map((studyId) => getStudy(studyId)));
    const allStudies = studiesByTag.flat();
    return allStudies?.length ?? 0;
  }

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

  async function getUserInfo() {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    return json;
  }

  async function getNumStudies() {
    const data = await getUserInfo();
    return data?.enrolled?.length ?? 0;
  }

  async function getTotalCompensation() {
    const data = await getUserInfo();
    return data?.compensation?.length ?? 0;
  }

  useEffect(() => {
    getNumStudies()
      .then(setNumEnrolled);
  }, []);

  useEffect(() => {
    getTotalCompensation()
      .then(setTotalCompensation);
  }, []);

  useEffect(() => {
    getNumRecommended()
      .then(setNumRecommended);
  }, []);

  useEffect(() => {
    getNumMessagesSent()
      .then(setNumMessages);
  }, []);

  const cards = [
    ['TOTAL COMPENSATION EARNED', `$${totalCompensation}`],
    ['TOTAL ENROLLED STUDIES', `${numEnrolled} ${numEnrolled === 1 ? 'study' : 'studies'}`],
    ['TOTAL RECOMMENDED STUDIES', `${numRecommended} ${numRecommended === 1 ? 'study' : 'studies'}`],
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

export default ParticipantDashboard;
