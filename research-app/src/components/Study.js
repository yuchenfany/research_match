/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';

// TO DO: add back in studyId prop
function Study({ study, setStudy }) {
  // Hardcoded:
  // const studyId = 0;
  // const [study, setStudy] = useState({});

  async function getStudy() {
    console.log('IN GETSTUDY');
    const studyData = await fetch(`http://localhost:5000/study/${study.studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();

    return data;
  }

  useEffect(() => {
    getStudy()
      .then(setStudy);
   }, []);

  // const study = getStudy();
//   async function renderStudy() {
//     const data = await getStudy();

//     return (<div> HELLO </div>);
//   }

//   const handleAsync = (event) => {
//     getStudy().then(renderStudy());
//   };

//   console.log('STUDY TITLE:');
//   console.log(study);

  return (
    <div className="Study Page">
      <div className="nav">nav</div>
      <div className="study-flex">
        <div className="header-left"> { study.title } </div>
        <div> Duration: { study.duration } </div>
        <div> Compensation: { study.compensation } </div>
        <div> Researcher names: [ADD IN] </div>
        <div className="header-small"> Description </div>
        <div className="paragraph"> { study.description } </div>
      </div>
    </div>
  );
}

export default Study;
