/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect, useState } from 'react';
import {
  View, Button, Text, StyleSheet,
} from 'react-native';
import NavBar from './NavBar';

function Study({ route, navigation }) {
  const { user, setUser, studyId } = route.params;
  const [study, setStudy] = useState({ studyId });
  const [status, setStatus] = useState({ isEnrolled: false });

  async function getUserStudies() {
    const studyData = await fetch(`http://localhost:5000/record/studies/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    return data;
  }

  async function checkEnrollment() {
    const userStudies = await getUserStudies();
    const arr = userStudies.enrolled;
    if (arr.includes(study.studyId)) {
      await setStatus({ isEnrolled: true });
    }
  }

  async function getStudy() {
    const studyData = await fetch(`http://localhost:5000/study/${studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    return data;
  }

  useEffect(() => {
    checkEnrollment();
    getStudy()
      .then(setStudy);
  }, []);

  async function enrollUpdateStudy() {
    const currStudy = await getStudy();
    const currParticipants = currStudy.participants;
    currParticipants.push(user.username);

    const updatedStudy = {
      title: currStudy.title,
      description: currStudy.description,
      compensation: currStudy.compensation,
      duration: currStudy.duration,
      tags: currStudy.tags,
      participants: currParticipants,
      studyId: currStudy.studyId,
      researchers: currStudy.researchers,
    };
    await fetch(`http://localhost:5000/study/${parseInt(study.studyId, 10)}/enroll`, {
      method: 'POST',
      body: JSON.stringify(updatedStudy),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function enrollUpdateUser() {
    function updateArray(array, newElement) {
      return array.concat(newElement);
    }

    const updatedArray = updateArray(user.enrolled ?? [], [study.studyId]);
    await setUser({ username: user.username, enrolled: updatedArray });

    const updatedUser = {
      username: user.username,
      enrolled: updatedArray,
    };
    await fetch(`http://localhost:5000/record/enroll/${user.username}/${parseInt(study.studyId, 10)}`, {
      method: 'POST',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function dropUpdateStudy() {
    const currStudy = await getStudy();
    const currParticipants = currStudy.participants;
    const index = currParticipants.indexOf(user.username);

    currParticipants.splice(index, 1);

    const updatedStudy = {
      title: currStudy.title,
      description: currStudy.description,
      compensation: currStudy.compensation,
      duration: currStudy.duration,
      tags: currStudy.tags,
      participants: currParticipants,
      studyId: currStudy.studyId,
      researchers: currStudy.researchers,
    };
    await fetch(`http://localhost:5000/study/${parseInt(study.studyId, 10)}/enroll`, {
      method: 'POST',
      body: JSON.stringify(updatedStudy),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function dropUpdateUser() {
    const index = user.enrolled.indexOf(study.studyId);
    const updatedArray = user.enrolled;
    updatedArray.splice(index, 1);
    await setUser({ username: user.username, enrolled: updatedArray });

    const updatedUser = {
      username: user.username,
      enrolled: updatedArray,
    };
    await fetch(`http://localhost:5000/record/enroll/${user.username}/${parseInt(study.studyId, 10)}`, {
      method: 'POST',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function enroll() {
    setStatus({ isEnrolled: true });
    enrollUpdateStudy().then(enrollUpdateUser());
  }

  async function drop() {
    setStatus({ isEnrolled: false });
    dropUpdateStudy().then(dropUpdateUser());
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
    subheader: {
      fontSize: 16,
      lineHeight: 40,
      fontWeight: 500,
      color: '#103143',
      marginLeft: 0,
      marginTop: 20,
    },
    button: {
      width: 275,
      height: 35,
      fontSize: 12,
      letterSpacing: 1,
      marginTop: 10,
    },
    studyDescription: {
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <View>
        <View style={styles.studyDescription}>
          <Text style={styles.header}>
            {study?.title ?? ''}
          </Text>
          <Text color="#103143">
            Duration:
            <Text>{' '}</Text>
            {study?.duration ?? ''}
          </Text>
          <Text color="#103143">
            Compensation:
            <Text>{' '}</Text>
            {study?.compensation ?? ''}
          </Text>
          <Text color="#103143">
            Researcher names:
            <Text>{' '}</Text>
            {study?.researchers ?? ''}
          </Text>
        </View>
        <View style={styles.button}>
          {status.isEnrolled
            ? <Button title="DROP" type="button" color="#103143" onPress={() => drop()} />
            : <Button title="ENROLL" type="button" color="#103143" onPress={() => enroll()} />}
        </View>
        <Text style={styles.subheader}>Description</Text>
        <Text style={styles.studyDescription}>
          {study?.description}
        </Text>
        <View style={styles.button}>
          <Button
            title="MESSAGE RESEARCHER"
            color="#103143"
            type="button"
            key={2}
            onPress={() => navigation.navigate('Chat', {
              sender: user,
              receiverName: study?.researchers ?? 'receiverUsername',
            })}
          />
        </View>
      </View>
    </View>
  );
}

export default Study;
