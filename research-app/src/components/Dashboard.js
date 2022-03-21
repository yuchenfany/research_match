/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../assets/index.css';

function Dashboard({ user }) {
//   async function getNumStudies() {
//     const data = await fetch(`http://localhost:5000/record/${user.username}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const json = await data.json();
//     return json.enrolled.length;
//   }
  const totalCompensation = 0;
  const numEnrolled = 0;
  const numRecommended = 0;
  const numMessages = 0;

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
