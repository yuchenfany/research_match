/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
// import NavBar from './NavBar';

function ParticipantHome({ route, navigation }) { // add props user
  let {user} = route.params;
  const [enrolledStudies, setEnrolledStudies] = useState([]);

  console.log(user);

  // gets list of studies that match user's tags
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

//   function goToStudy(studyId) {
//     console.log(studyId);
//     setStudy({ studyId });
//     navigate(`/study/${studyId}`);
//   }

  return (
    <div className="Home">
      <h1>WELCOME {user.username}</h1>
      <h2>You've officially been hacked and I now know your username is: </h2>
      <h2>{user.username} </h2> 
      <h2>and your password is: </h2> 
      <h2>{user.password}</h2>
      {/* <NavBar user={user} /> */}
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
                      {/* <button className="view-button" type="button" key={singleStudy.studyId} onClick={() => goToStudy(singleStudy.studyId)}>VIEW</button> */}
                    </div>
                  ),
                )
              ),
            )
          }
        </div>
      </div>
    </div>
  );
}

export default ParticipantHome;
