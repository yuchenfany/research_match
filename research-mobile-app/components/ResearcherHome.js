/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';

function ResearcherHome({ route, navigation }) { // add props user
  let { user, setUser, setStudy } = route.params;
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

  console.log(user);
  return (
    <View className="ResearcherProfile">
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <Button title="EDIT PROFILE" onPress={() => editProfile()}/>
      <Text className="header-left">Researcher Home</Text>
      <div className="study-flex">
        <Text className="header-left">Enrolled Studies</Text>
        <div>
          {
          enrolledStudies.length === 0 ? []
            : enrolledStudies.map(
              (studyJson) => (
                <div key={studyJson.studyId} className="study">
                  <Text className="study-title">{studyJson.title}</Text>
                  <Button
                    className="view-button"
                    type="button"
                    key={studyJson.studyId}
                    onPress={() => goToStudy(studyJson.studyId)}
                  />
                </div>
              ),
            )
          }
        </div>
      </div>
      <div className="study-transfer">
        <div className="header-left">For Testing Purposes: Directs to Add Study Page</div>
        <div className="study">
          <Text className="study-transfer">Go to Study Page</Text>
          <Button
            className="view-button"
            onPress={() => navigation.navigate('AddStudy', { user, setUser })}
            title="ADD STUDY"
          />
        </div>
      </div>
    </View>
  );
}

export default ResearcherHome;
