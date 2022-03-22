/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';

function Home({ user, setUser, setStudy }) { // add props user
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
    setUser({ username: user.username, password: user.password, enrolled: json.enrolled });
    return json.enrolled;
    // Hardcoded:
    // return [0, 1, 2, 3];
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
    console.log(user.username);
    console.log(user.enrolled);
    console.log(studyIds);
    return Promise.all(studyIds.map((studyId) => getStudy(studyId)));
  }

  useEffect(() => {
    getAllStudyJson()
      .then(setEnrolledStudies);
  }, []);

  function goToStudy(studyId) {
    console.log(studyId);
    setStudy({ studyId });
    navigate(`/study/${studyId}`);
  }

  return (
    <div className="Home">
      <div className="nav">nav</div>
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
          <div className="study-title">Organ Transplant Research</div>
          <button className="view-button" type="button" key={3} onClick={() => goToStudy(3)}>VIEW</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
