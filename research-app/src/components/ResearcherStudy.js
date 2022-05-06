/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
import NavBar from './NavBar';
import { getStudyById } from '../modules/study-api';

// TO DO: add back in studyId prop
function ResearcherStudy({
  study, setStudy, user,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    getStudyById(study.studyId)
      .then(setStudy);
  }, []);

  return (
    <div className="Study Page">
      <NavBar user={user} />
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
        <div>
          Researcher names: &nbsp;
          {study?.researchers}
        </div>
        <button className="button" type="button" onClick={() => navigate('/edit-study')}>Edit Study</button>
        <div className="header-small"> Description </div>
        <div className="paragraph">
          {study.description}
        </div>
      </div>
    </div>
  );
}

export default ResearcherStudy;
