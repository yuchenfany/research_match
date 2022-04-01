/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function DisplayStudies({ user, setUser, setStudy }) { // add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const navigate = useNavigate();

  // gets list of studies that match user's tags
  // NOTE: remove hardcoding once users have tags

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
      phys: json.phys,
      psych: json.psych,
      med: json.med,
    });
    // return json.tags; (once tags are implemented in phys)
    // Hardcoded:
    const userTags = user.phys.concat(user.psych.concat(user.med));
    console.log(userTags);
    console.log(user.phys);
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
  async function getAllStudyJson() {
    const studyIds = await getStudyIds();
    console.log(user.username);
    console.log(user.tags);
    console.log(studyIds);
    // return Promise(getStudy(studyIds[0]));
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
      <NavBar user={user} />
      <div className="study-flex">
        <div className="header-left">Eligible Studies</div>
        <div>
          {
          enrolledStudies.length === 0 ? []
            : enrolledStudies.map(
              (studyJson) => (
                studyJson.map(
                  (singleStudy) => (
                    <div key={singleStudy.studyId} className="study">
                      <div className="study-title">{singleStudy.title}</div>
                      <div className="study-tag">{singleStudy.tags}</div>
                      <button className="view-button" type="button" key={singleStudy.studyId} onClick={() => goToStudy(singleStudy.studyId)}>VIEW</button>
                    </div>
                  ),
                )
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

export default DisplayStudies;
