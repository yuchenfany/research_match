/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
// import NavBar from './NavBar';

function AddStudy({ route, navigation}) { // add props user
  let {user, setUser, setStudy } = route.params;
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  // const navigate = useNavigate();
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
      name: user.name,
      organization: user.organization,
      studies: json.studies,
      type: user.type,
    });
    // setUser({ username: user.username, password: user.password, enrolled: json.enrolled });
    return json?.studies ?? [];
  }

  // gets individual study by id
  async function getStudy(studyId) {
    const data = await fetch(`http://localhost:5000/study/${studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    return data.json();
  }

  // get all studies
  async function getAllStudyJson() {
    const studyIds = await getStudyIds();
    console.log(user.username);
    console.log(user.studies);
    console.log(studyIds);
    return Promise.all(studyIds.map((studyId) => getStudy(studyId)));
  }

  useEffect(() => {
    getAllStudyJson()
      .then(setEnrolledStudies);
  }, []);

  function goToStudy(studyId) {
    setStudy({ studyId });
    navigation.navigate(`/researcher-study/${studyId}`);
  }

  return (
    <div className="ResearcherProfile">
      <div className="header-left">Add Study Page</div>
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
      <div className="study-transfer">
        <div className="header-left">For Testing Purposes: Directs to Add Study Page</div>
        <div className="study">
          <div className="study-transfer">Go to Study Page</div>
          <button className="view-button" type="button" onClick={() => navigation.navigate('ResearcherHome', {user: user, setUser: setUser, setStudy: setStudy})}>Go back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default AddStudy;
