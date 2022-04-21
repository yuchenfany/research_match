/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect, useState } from 'react';

function Study({ route, navigation }) {
  let { user } = route.params;
  // Hardcoded:
  // const studyId = 2;
  const [study, setStudy] = useState({ studyId: 2 });

  async function getStudy() {
    const studyData = await fetch(`http://localhost:5000/study/${study.studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    console.log(data);
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
    };
    await fetch(`http://localhost:5000/study/${parseInt(study.studyId, 10)}/enroll`, {
      method: 'POST',
      body: JSON.stringify(updatedStudy),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function enrollUpdateUser() {
    function updateArray(array, newElement) {
      return array.concat(newElement);
    }

    const updatedArray = updateArray(user.enrolled ?? [], [study.studyId]);
    await setUser({ username: user.username, password: user.password, enrolled: updatedArray });

    const updatedUser = {
      username: user.username,
      password: user.password,
      enrolled: updatedArray,
    };
    await fetch(`http://localhost:5000/record/enroll/${user.username}/${parseInt(study.studyId, 10)}`, {
      method: 'POST',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function dropUpdateStudy() {
    const currStudy = await getStudy();
    const currParticipants = currStudy.participants;
    const index = currParticipants.indexOf(user.username);

    currParticipants.splice(index, 1);

    const updatedStudy = {
      title: currStudy.title,
      description: currStudy.description,
      compensation: currStudy.compensation,
      duration: currStudy.duration,
      tags: currStudy.tags,
      participants: currParticipants,
      studyId: currStudy.studyId,
      researchers: currStudy.researchers,
    };
    await fetch(`http://localhost:5000/study/${parseInt(study.studyId, 10)}/enroll`, {
      method: 'POST',
      body: JSON.stringify(updatedStudy),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function dropUpdateUser() {
    const index = user.enrolled.indexOf(study.studyId);
    const updatedArray = user.enrolled;
    updatedArray.splice(index, 1);
    await setUser({ username: user.username, password: user.password, enrolled: updatedArray });

    const updatedUser = {
      username: user.username,
      password: user.password,
      enrolled: updatedArray,
    };
    await fetch(`http://localhost:5000/record/enroll/${user.username}/${parseInt(study.studyId, 10)}`, {
      method: 'POST',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function enroll() {
    await setStatus({ isEnrolled: true });
    enrollUpdateStudy().then(enrollUpdateUser());
  }

  async function drop() {
    await setStatus({ isEnrolled: false });
    dropUpdateStudy().then(dropUpdateUser());
  }

  return (
    <div className="Study Page">
      <div className="nav">nav</div>
      <div className="study-flex">
        <div className="header-left">
          {study.title}
        </div>
        <div>
          Duration:
          {study.duration}
        </div>
        <div>
          Compensation:
          {study.compensation}
        </div>
        <div> Researcher names: [ADD IN] </div>
        {status.isEnrolled
          ? <button className="button" type="button" onClick={() => drop()}>DROP</button>
          : <button className="button" type="button" onClick={() => enroll()}>ENROLL</button>}
        <div className="header-small"> Description </div>
        <div className="paragraph">
          {study.description}
        </div>
      </div>
    </div>
  );
}

export default Study;
