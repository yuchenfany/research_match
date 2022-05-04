/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import {
  View, Button, Text, StyleSheet,
} from 'react-native';
import NavBar from './NavBar';

function ParticipantHome({ route, navigation }) { // add props user
  const { user, setUser, setStudy } = route.params;
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

    // return json.tags; (once tags are implemented in phys)
    // const userTags = user.phys.concat(user.psych.concat(user.med));
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
      user,
      setUser,
      studyId,
    });
  };

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
      padding: 20,
    },
    header: {
      fontSize: 20,
      lineHeight: 40,
      fontWeight: 500,
      marginTop: 30,
      marginBottom: 20,
      color: '#103143',
    },
    studyCard: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderRadius: 5,
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 18,
      paddingRight: 10,
      paddingLeft: 10,
      marginBottom: 10,
      width: 600,
    },
    rightFlex: {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'row',
    },
    button: {
      width: 275,
      height: 35,
      fontSize: 12,
      letterSpacing: 1,
      marginTop: 10,
    },
    viewButton: {
      right: 0,
      width: 100,
      height: 25,
      fontSize: 10,
      letterSpacing: 1,
      marginLeft: 'auto',
    },
    tag: {
      height: 30,
      borderColor: '#808A8F',
      borderRadius: 5,
      borderWidth: 1,
      padding: 5,
      marginRight: 10,
    },
  });

  return (
    <View style={styles.container}>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <View style={styles.button}>
        <Button title="EDIT PROFILE" color="#103143" onPress={() => editProfile()} />
      </View>
      <View style={styles.button}>
        <Button
          title="My Enrolled Studies"
          color="#103143"
          onPress={() => {
            navigation.navigate('ParticipantStudies', {
              user,
              setUser,
            });
          }}
        />
      </View>
      <Text style={styles.header}>Eligible Studies</Text>
      <View>
        {
            enrolledStudies.length === 0 ? []
              : enrolledStudies.map(
                (studyJson) => (
                  studyJson.map(
                    (singleStudy) => (
                      <View key={singleStudy.studyId} style={styles.studyCard}>
                        <Text color="#103143">{singleStudy.title}</Text>
                        <View style={styles.rightFlex}>
                          <Text style={styles.tag} color="#103143">{singleStudy.tags}</Text>
                          <Button style={styles.viewButton} type="button" title="VIEW" key={singleStudy.studyId} color="#103143" onPress={() => goToStudy(singleStudy.studyId)} />
                        </View>
                      </View>
                    ),
                  )
                ),
              )
            }
      </View>
    </View>
  );
}

export default ParticipantHome;
