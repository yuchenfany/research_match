/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

import { getEnrolledStudyIds } from '../modules/user-api';
import { getStudyById } from '../modules/study-api';

function ParticipantStudies({
  user, setUser, setStudy, setStatus,
}) { // add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const navigate = useNavigate();

  // get all studies
  async function getAllStudyJson() {
    const studyIds = await getEnrolledStudyIds(user, setUser);
    return Promise.all(studyIds.map((studyId) => getStudyById(studyId)));
  }

  useEffect(() => {
    getAllStudyJson()
      .then(setEnrolledStudies);
  }, []);

  function goToStudy(studyId) {
    setStudy({ studyId });
    if (user.enrolled.indexOf(studyId) > -1) {
      setStatus({ isEnrolled: true });
    } else {
      setStatus({ isEnrolled: false });
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
    </div>
  );
}

export default ParticipantStudies;
