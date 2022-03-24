/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';

function Dashboard({ user }) {
  const [totalCompensation, setTotalCompensation] = useState(0);
  const [numEnrolled, setNumEnrolled] = useState(0);
  const [numRecommended, setNumRecommended] = useState(0);
  const [numMessages] = useState(0);

  // Fake for now by getting all studies
  async function getStudiesLength() {
    const data = await fetch('http://localhost:5000/study', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    return json?.length ?? 0;
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
    getStudiesLength()
      .then(setNumRecommended);
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
      <div className="nav">nav</div>
      <div className="dashboard">
        <h1 className="header-left">Analytics</h1>
        {user.username}
        <div className="dash-flex">{cards}</div>
      </div>
    </div>
  );
}

export default Dashboard;
