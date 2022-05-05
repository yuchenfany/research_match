/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function ParticipantStudies({
  user, setUser, setStudy, setStatus,
}) { // add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const navigate = useNavigate();

  // gets list of all enrolled studies for user
  // NOTE: remove hardcoding once users are enrolled in studies

  async function getStudyIds() {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    setUser({
      username: user.username,
      password: user.password,
      enrolled: json.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: user.sex,
      gender: user.gender,
      allergies: user.allergies,
      phys: user.phys,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });
    return json?.enrolled ?? [];
  }

  // gets individual study by id
  async function getStudy(studyId) {
    const data = await fetch(`http://localhost:5000/study/${studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.json();
  }

  // get all studies
  async function getAllStudyJson() {
    const studyIds = await getStudyIds();
    return Promise.all(studyIds.map((studyId) => getStudy(studyId)));
  }

  useEffect(() => {
    getAllStudyJson()
      .then(setEnrolledStudies);
  }, []);

  function goToStudy(studyId) {
    setStudy({ studyId });
    if (!studyId) {
      if (user.enrolled.indexOf(studyId) > -1) {
        setStatus({ isEnrolled: true });
      } else {
        setStatus({ isEnrolled: false });
      }
    }
    navigate(`/study/${studyId}`);
  }

  return (
    <div className="Home">
      <NavBar user={user} />
      <div className="study-flex">
        <div className="header-left">Enrolled Studies</div>
        <div>
          {
          enrolledStudies.length === 0 ? []
            : enrolledStudies.map(
              (studyJson) => (
                <div key={studyJson.studyId} className="study">
                  <div className="study-title">{studyJson.title}</div>
                  <button className="view-button" type="button" key={studyJson.studyId} onClick={() => goToStudy(studyJson.studyId)}>VIEW</button>
                </div>
              ),
            )
          }
        </div>
      </div>

      <div className="study-flex">
        <div className="header-left">For Testing Purposes: Delete Later</div>
        <div className="study">
          <div className="study-title">Sleep Research</div>
          <button className="view-button" type="button" key={2} onClick={() => goToStudy(2)}>VIEW</button>
        </div>
      </div>
    </div>
  );
}

export default ParticipantStudies;
