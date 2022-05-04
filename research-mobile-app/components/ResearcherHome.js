/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import {
  View, Button, Text, StyleSheet,
} from 'react-native';
import NavBar from './NavBar';

function ResearcherHome({ route, navigation }) { // add props user
  const { user, setUser, setStudy } = route.params;
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  // const [study2, setStudy2] = useState();
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
      user,
      setUser,
      study: await getStudy(studyId),
      setStudy,
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
    navigation.navigate('ResearcherEdit', {
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
      color: '#103143',
    },
    subheader: {
      fontSize: 16,
      lineHeight: 40,
      fontWeight: 500,
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
      width: 500,
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
  });

  return (
    <View style={styles.container}>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <View style={styles.button}>
        <Button title="EDIT PROFILE" color="#103143" onPress={() => editProfile()} />
      </View>
      <Text style={styles.header}>Researcher Home</Text>
      <div className="study-flex">
        <Text style={styles.subheader}>My Studies</Text>
        <div>
          {
          enrolledStudies.length === 0 ? []
            : enrolledStudies.map(
              (studyJson) => (
                <View key={studyJson.studyId} style={styles.studyCard}>
                  <Text color="#103143">{studyJson.title}</Text>
                  <View style={styles.viewButton}>
                    <Button
                      color="#103143"
                      title="VIEW"
                      type="button"
                      key={studyJson.studyId}
                      onPress={() => goToStudy(studyJson.studyId)}
                    />
                  </View>
                </View>
              ),
            )
          }
        </div>
      </div>
      <View style={styles.button}>
        <Button
          color="#103143"
          onPress={() => navigation.navigate('AddStudy', { user, setUser })}
          title="ADD STUDY"
        />
      </View>
    </View>
  );
}

export default ResearcherHome;
