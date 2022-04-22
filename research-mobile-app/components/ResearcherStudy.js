/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
// import NavBar from './NavBar';

function ResearcherStudy({ route, navigation}) { // add props user
  let {user, study, setStudy } = route.params;
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  // const navigate = useNavigate();
  async function getStudy() {
    // console.log(studyId);
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

  return (
    <div className="Study Page">
      {/* <div className="nav">nav</div> */}
      {/* <NavBar user={user} /> */}
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
        <button className="button" type="button" onClick={() => navigation.navigate('/edit-study')}>Edit Study</button>
        <div className="header-small"> Description </div>
        <div className="paragraph">
          {study.description}
        </div>
      </div>
    </div>
  );
}


export default ResearcherStudy;
