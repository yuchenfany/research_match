/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  View, Button, Text, StyleSheet,
} from 'react-native';
import NavBar from './NavBar';

function ParticipantStudies({ route, navigation }) { // add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const { user, setUser } = route.params;

  // gets list of all enrolled studies for user

  async function getStudyIds() {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    user.enrolled = json.enrolled;
    setUser(user);
    console.log(json?.enrolled ?? []);
    return json?.enrolled ?? [];
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
    console.log(studyIds);
    // await setEnrolledStudies();
    return Promise.all(studyIds.map((studyId) => getStudy(studyId)));
  }

  useEffect(() => {
    getAllStudyJson()
      .then(setEnrolledStudies);
  }, []);

  function goToStudy(studyId) {
    navigation.navigate('Study', {
      user,
      setUser,
      studyId,
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
    <View className="Home">
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <View className="study-flex">
        <Text className="header-left">Enrolled Studies</Text>
        <View>
          {
              enrolledStudies.length === 0 ? []
                : enrolledStudies.map(
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
              }
        </View>
      </View>

      <View className="study-flex">
        <Text className="header-left">For Testing Purposes: Delete Later</Text>
        <View className="study">
          <Text className="study-title">Sleep Research</Text>
          <Button className="view-button" title="VIEW" key={2} onPress={() => goToStudy(2)}></Button>
        </View>
      </View>
      <View className="study-transfer">
        <Text className="header-left">For Testing Purposes: Directs to Add Study Page</Text>
        <View className="study">
          <Text className="study-transfer">Go to Study Page</Text>
          <Button
		  	className="view-button"
			title="Add Study"
			onPress={() => navigation.push('AddStudy', route.params)}
			>
		  </Button>
        </View>
      </View>
    </View>
  );
}

export default ParticipantStudies;
