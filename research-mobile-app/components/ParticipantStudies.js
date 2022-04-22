/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

function ParticipantStudies({ route, navigation }) { // add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const { user, setUser, setStudy, setStatus } = route.params;

  // gets list of all enrolled studies for user
  // NOTE: remove hardcoding once users are enrolled in studies

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
    return json?.enrolled ?? [];
  }

  // gets inViewidual study by id
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

  function goToStudy(studyId) {
    setStudy({ studyId });
    if (user.enrolled.indexOf(studyId) > -1) {
      setStatus({ isEnrolled: true });
    } else {
      setStatus({ isEnrolled: false });
    }
	navigation.navigate('Study', route.params);
  }

  return (
    <View className="Home">
      <View className="study-flex">
        <Text className="header-left">Enrolled Studies</Text>
        <View>
          {
          enrolledStudies.length === 0 ? []
            : enrolledStudies.map(
              (studyJson) => (
                <View key={studyJson.studyId} className="study">
                  <Text className="study-title">{studyJson.title}</Text>
                  <Button
				  	className="view-button"
					title="VIEW"
					key={studyJson.studyId}
					onClick={() => goToStudy(2)}
				  >
				  </Button>
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
          <Button className="view-button" title="VIEW" key={2} onClick={() => goToStudy(2)}></Button>
        </View>
      </View>
      <View className="study-transfer">
        <Text className="header-left">For Testing Purposes: Directs to Add Study Page</Text>
        <View className="study">
          <Text className="study-transfer">Go to Study Page</Text>
          <Button
		  	className="view-button"
			title="Add Study"
			onClick={() => navigation.push('AddStudy', route.params)}
			>
		  </Button>
        </View>
      </View>
    </View>
  );
}

export default ParticipantStudies;
