/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
// import NavBar from './NavBar';

function DeleteAccount({ route, navigation }) { // add props user
  let {user, setUser} = route.params;
  const[tempUser, setTempUser] = useState({
      username: user.username,
      password: user.password, // NOTE: unhashes password
      age: 0,
      // enrolled: user.enrolled,
      // age: user.age,
      // heightFeet: user.heightFeet,
      // heightInches: user.heightInches,
      // weight: user.weight,
      // sex: user.sex,
      // gender: user.gender,
      // allergies: user.allergies,
      // phys: user.phys,
      // psych: user.psych,
      // med: user.med,
      // type: user.type,
    }
  );

  async function verify() {
    console.log(JSON.stringify(user));
    // console.log(JSON.stringify(getNextStudyID()));
    // setStudy({
    //   studyId: getNextStudyID(),
    // });
    const data = await fetch(`http://localhost:5000/record/delete/${user.username}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('delete is being called');
    return true;
  }

  async function handleSubmit(event) {
    if (await verify()) {
        navigation.navigate('Research Application', { user, setUser });
    } else {
      event.preventDefault();
    }
}

  
//   useEffect(() => {
//     getAllStudyJson()
//       .then(setEnrolledStudies);
//   }, []);

//   function goToStudy(studyId) {
//     console.log(studyId);
//     setStudy({ studyId });
//     navigate(`/study/${studyId}`);
//   }

  return (
    <View>
        <Text>Are you sure you want to delete your account ? </Text>
        <Button title="Delete" onPress={() => handleSubmit()}/>
        <Button title="Go back" onPress={() => navigation.push('ParticipantHome', { user, setUser })}/>
    </View>
  );
}

export default DeleteAccount;
