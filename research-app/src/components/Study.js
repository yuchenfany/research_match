/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';

// TO DO: add back in studyId prop
function Study({ study, setStudy, user, setUser }) {
  // Hardcoded:
  // const studyId = 0;
  // const [study, setStudy] = useState({});

  console.log('AT THE BEGINNING:');
  console.log(user.enrolled);

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

  async function enrollUpdateStudy() {
    const currStudy = await getStudy();
    const currParticipants = currStudy.participants;
    currParticipants.push(user.username);

    const updatedStudy = {
      title: currStudy.title,
      description: currStudy.description,
      compensation: currStudy.compensation,
      duration: currStudy.duration,
      tags: currStudy.tags,
      participants: currParticipants,
      studyId: currStudy.studyId,
      researchers: currStudy.researchers,
    }
    await fetch(`http://localhost:5000/study/${parseInt(study.studyId)}`, {
      method: 'POST',
      body: JSON.stringify(updatedStudy),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function enrollUpdateUser() {

    // console.log(user.username);
    // console.log(user.enrolled);

    // const userEnrolled = user.enrolled;

    // this function has been checked! concat works
    function updateArray(array, newElement) {
      return array.concat(newElement);
    }
    
    console.log('Before change');
    console.log(user.enrolled);
    // setUser({ username: user.username, password: user.password, enrolled: [...user.enrolled, [study.studId]] });
    const updatedArray = updateArray(user.enrolled, [study.studyId]);
    console.log('UPDATED ARRAY:')
    console.log(updatedArray);
    await setUser({ username: user.username, password: user.password, enrolled: updatedArray });
    console.log('After change');
    console.log(user.enrolled);

    // console.log('Before push');
    // console.log(userEnrolled);
    // await userEnrolled.push(study.studyId);
    // console.log('After push');
    // console.log(userEnrolled);

    const updatedUser = {
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
    }
    await fetch(`http://localhost:5000/record/enroll/${user.username}/${parseInt(study.studyId)}`, {
      method: 'POST',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function enroll() {
    enrollUpdateStudy().then(enrollUpdateUser());
  }

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
        <button className="button" type="button" onClick={() => enroll()}>ENROLL</button>
        <div className="header-small"> Description </div>
        <div className="paragraph"> { study.description } </div>
      </div>
    </div>
  );
}

export default Study;
