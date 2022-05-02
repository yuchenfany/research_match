/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import NavBar from './NavBar';

function Study({ route, navigation }) {
  let { user, setUser } = route.params;

  // Hardcoded:
  const [study, setStudy] = useState({ studyId: 2 });
  const [status, setStatus] = useState({ isEnrolled: false });

  async function getUserStudies() {
    console.log('GOING TO FETCH USER STUDIES');
    const studyData = await fetch(`http://localhost:5000/record/studies/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    console.log(data);
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
    const studyData = await fetch(`http://localhost:5000/study/${study.studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    checkEnrollment();
    console.log(status.isEnrolled);
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
    await setStatus({ isEnrolled: true });
    enrollUpdateStudy().then(enrollUpdateUser());
    console.log('should set isEnrolled to true');
    console.log(status.isEnrolled);
  }

  async function drop() {
    await setStatus({ isEnrolled: false });
    dropUpdateStudy().then(dropUpdateUser());
    console.log('should set isEnrolled to false');
    console.log(status.isEnrolled);
  }

  return (
    <View>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <View>
        <Text>
          {study.title}
        </Text>
        <Text>
          Duration:
          {study.duration}
        </Text>
        <Text>
          Compensation:
          {study.compensation}
        </Text>
        <Text> Researcher names: [ADD IN] </Text>
        {status.isEnrolled
          ? <Button title="DROP" type="button" onPress={() => drop()} />
          : <Button title="ENROLL" type="button" onPress={() => enroll()} />}
        <Text> Description </Text>
        <Text>
          {study.description}
        </Text>
      </View>
    </View>
  );
}

export default Study;