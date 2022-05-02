/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
import NavBar from './NavBar';

// TO DO: add back in studyId prop
function ResearcherStudy({
  study, setStudy, user,
}) {
  const navigate = useNavigate();
  async function getStudy() {
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

  return (
    <div className="Study Page">
      {/* <div className="nav">nav</div> */}
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
        <div> Researcher names: [this is the researcherStudy page] </div>
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
