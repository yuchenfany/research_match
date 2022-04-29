/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
// import NavBar from './NavBar';

function ResearcherHome({ route, navigation}) { // add props user
  let {user, setUser, setStudy } = route.params;
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  // const [study2, setStudy2] = useState();
  // const navigate = useNavigate();
  console.log('RESEARCHER HOME: ORG');
  console.log(user.organization);
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
    // setStudy2(data.json());
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

  async function goToStudy(studyId) {
    setStudy({ studyId });
    navigation.navigate('ResearcherStudy', {
      user: user, 
      setUser,
      study: await getStudy(studyId), 
      setStudy: setStudy
    });
  }

    // async function editProfile() {
    //   console.log('EDIT NAVIGATING');
    //   navigation.navigate('ResearcherEdit', {
    //     user,
    //     setUser,
    //   });
    // }

    async function editProfile() {
      console.log('EDIT NAVIGATING');
      navigation.navigate('ResearcherEdit', {
        user: user,
        setUser: setUser,
      });
    }

  return (
    <div className="ResearcherProfile">
      <div className="header-left">Researcher Home</div>
      <Button title="EDIT PROFILE" onPress={() => editProfile()}/>
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
          <button className="view-button" type="button" onClick={() => navigation.navigate('AddStudy', {user: user, setUser: setUser})}>Add Study</button>
        </div>
      </div>
    </div>
  );
}

export default ResearcherHome;
