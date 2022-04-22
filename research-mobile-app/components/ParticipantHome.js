/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
// import NavBar from './NavBar';

function ParticipantHome({ route, navigation }) { // add props user
  let {user, setUser} = route.params;
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
    console.log('JSON');
    console.log(json.phys);
    console.log('FIELD');
    console.log(user.phys);

    await setUser({
      username: user.username,
      password: user.password,
      phys: json.phys,
      psych: json.psych,
      med: json.med,
    });

    // return json.tags; (once tags are implemented in phys)
    // NOTE: changed from user.phys to json.phys etc
    const userTags = json.phys.concat(json.psych.concat(json.med));
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

  async function editProfile() {
    console.log('EDIT NAVIGATING');
    navigation.navigate('ParticipantEdit', {
      user: user,
      setUser,
    });
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
    <View>
      <Text>AGE {user.age}</Text>
      <Text>WELCOME {user.username}</Text>
      <Text>You've officially been hacked and I now know your username is: </Text>
      <Text>{user.username} </Text> 
      <Text>and your password is: </Text> 
      <Text>{user.password}</Text>
      {/* <NavBar user={user} /> */}
      <View>
        <Button title="EDIT PROFILE" onPress={() => editProfile()}/>
        <Text className="header-left">Eligible Studies</Text>
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
      </View>
    </View>
  );
}

export default ParticipantHome;
