/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';

function ParticipantHome({ route, navigation }) { // add props user
  let { user, setUser, setStudy } = route.params;
  const [enrolledStudies, setEnrolledStudies] = useState([]);

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
       username: json.username,
       password: json.password,
       phys: json.phys,
       psych: json.psych,
       med: json.med,
      //  age: json.age,
      //  enrolled: json.enrolled,
      //  heightFeet: json.heightFeet,
      //  heightInches: json.heightInches,
      //  weight: json.weight,
      //  sex: json.sex,
      //  gender: json.gender,
      //  allergies: json.allergies,
      //  type: json.type,
     });

  //   // return json.tags; (once tags are implemented in phys)
     //const userTags = user.phys.concat(user.psych.concat(user.med));
     return json.phys;
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
    //  setTimeout(5000);
     const studyIds = await getStudyIds();
     // return Promise(getStudy(studyIds[0]));
     return Promise.all(studyIds.map((studyId) => getStudy(studyId)));
   }

   useEffect(() => {
     getAllStudyJson()
       .then(setEnrolledStudies);
   }, []);

  const goToStudy = (studyId) => {
     setStudy({ studyId });
     navigation.navigate('Study', {
        user: user,
        setUser: setUser,
        studyId: studyId,
      });
  }

  async function editProfile() {
    navigation.navigate('ParticipantEdit', {
      user,
      setUser,
    });
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F3F8FA',
      flex: 1,
    },
    header: {
      fontSize: 20,
      lineHeight: 40,
      fontWeight: 500,
      marginTop: 30,
      marginBottom: 20,
      color: '#103143',
    },
    button: {
      width: 275,
      height: 35,
      fontSize: 12,
      letterSpacing: 1,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <View style={styles.button}>
        <Button title="EDIT PROFILE" color='#103143' onPress={() => editProfile()}/>
      </View>
      <View style={styles.button}>
        <Button
          title="My Enrolled Studies"
          color='#103143'
          onPress={() => {
            navigation.navigate('ParticipantStudies', {
              user: user,
              setUser: setUser,
            });
          }}
        />
      </View>
      <Text style={styles.header}>Eligible Studies</Text>
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
                        <Button style={styles.button} type="button" title="VIEW" key={singleStudy.studyId} onPress={() => goToStudy(singleStudy.studyId)} />
                      </div>
                    ),
                  )
                ),
              )
            }
          </div>

    </View>
  );
}

export default ParticipantHome;
