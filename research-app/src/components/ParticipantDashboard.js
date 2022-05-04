/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import NavBar from './NavBar';

import { getUserTags, getUserInfo } from '../modules/user-api';
import { getStudyByTag } from '../modules/study-api';
import { getNumMessagesSent } from '../modules/chat-api';

function ParticipantDashboard({ user }) {
  const [totalCompensation, setTotalCompensation] = useState(0);
  const [numEnrolled, setNumEnrolled] = useState(0);
  const [numRecommended, setNumRecommended] = useState(0);
  const [numMessages, setNumMessages] = useState(0);

  // get all studies
  async function getNumRecommended() {
    const tags = await getUserTags(user);
    const studiesByTag = await Promise.all(tags.map((tag) => getStudyByTag(tag)));
    const allStudies = studiesByTag.flat();
    return allStudies?.length ?? 0;
  }

  async function getNumStudies() {
    const data = await getUserInfo(user);
    return data?.enrolled?.length ?? 0;
  }

  async function getTotalCompensation() {
    const data = await getUserInfo(user);
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
    getNumMessagesSent(user)
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
