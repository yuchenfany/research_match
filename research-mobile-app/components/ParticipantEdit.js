/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
// import NavBar from './NavBar';

function ParticipantHome({ route, navigation }) { // add props user
  let {user, setUser} = route.params;

  const [ageErr, setAgeErr] = useState({ message: '' });
//   const [feetErr, setFeetErr] = useState({ message: '' });
//   const [inchErr, setInchErr] = useState({ message: '' });
//   const [weightErr, setWeightErr] = useState({ message: '' });

  const updateAge = async (event) => {
    console.log('EVENT: AGE');
    console.log(event.target.value);

    await setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: event.target.value,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: user.sex,
      gender: user.gender,
      allergies: user.allergies,
      phys: user.phys,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });

    console.log('EVENT: AGE 2');
    console.log(user.age);
  };

  const isValidInput = (input) => !(input.length === 0 || !input.match(/^[0-9]+$/));

  async function handleUpdate(event) {
    // if (!isValidInput(user.age) || !isValidInput(user.weight) || !isValidInput(user.heightFeet)
    // || !isValidInput(user.heightInches)) {
    //   if (!isValidInput(user.age)) {
    //     setAgeErr({ message: 'Age: Enter a number' });
    //   } else {
    //     setAgeErr({ message: '' });
    //   }

    // //   if (!isValidInput(user.weight)) {
    // //     setWeightErr({ message: 'Weight: Enter a number' });
    // //   } else {
    // //     setWeightErr({ message: '' });
    // //   }

    // //   if (!isValidInput(user.heightFeet)) {
    // //     setFeetErr({ message: 'Feet: Enter a number' });
    // //   } else {
    // //     setFeetErr({ message: '' });
    // //   }

    // //   if (!isValidInput(user.heightInches)) {
    // //     setInchErr({ message: 'Inches: Enter a number' });
    // //   } else {
    // //     setInchErr({ message: '' });
    // //   }

    //   event.preventDefault();

    //   return;
    // }

    if (await postUserInfo()) {
        navigation.navigate('ParticipantHome', {
            user,
            setUser,
          });    
    } else {
      event.preventDefault();
    }
  }

  async function postUserInfo() {
    await fetch(`http://localhost:5000/record/participant-edit/${user.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .catch((e) => {
        window.alert(e);
      });

    return true;
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
        <Text>EDIT PROFILE</Text>
        <View>
          <div>Age</div>
          <input
            className="small-input"
            type="text"
            id="age"
            value={user.age}
            onChange={updateAge}
          />
          <span className="error-message">{ageErr.message}</span>
        </View>
        <Button title="UPDATE" onPress={() => handleUpdate()}/>
    </View>
  );
}

export default ParticipantHome;
