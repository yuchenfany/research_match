/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState } from 'react';
import {
  View, Button, Text, TextInput, StyleSheet,
} from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
import NavBar from './NavBar';

function ParticipantEdit({ route, navigation }) { // add props user
  const { user, setUser } = route.params;

  const [tempUser, setTempUser] = useState({
    username: user.username,
    password: user.password,
    age: user.age,
    enrolled: user.enrolled,
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

  // const [ageErr, setAgeErr] = useState({ message: '' });
  // const [feetErr, setFeetErr] = useState({ message: '' });
  // const [inchErr, setInchErr] = useState({ message: '' });
  // const [weightErr, setWeightErr] = useState({ message: '' });
  // const [sexErr, setSexErr] = useState({ message: '' });
  // const [genderErr, setGenderErr] = useState({ message: '' });
  // const [allergErr, setAllergErr] = useState({ message: '' });
  // const [physErr, setPhysErr] = useState({ message: '' });
  // const [psychErr, setPsychErr] = useState({ message: '' });
  // const [medErr, setMedErr] = useState({ message: '' });

  const updateAge = async (event) => {
    await setTempUser({
      username: tempUser.username,
      password: tempUser.password,
      age: event.target.value,
      enrolled: tempUser.enrolled,
      heightFeet: tempUser.heightFeet,
      heightInches: tempUser.heightInches,
      weight: tempUser.weight,
      sex: tempUser.sex,
      gender: tempUser.gender,
      allergies: tempUser.allergies,
      phys: tempUser.phys,
      psych: tempUser.psych,
      med: tempUser.med,
      type: tempUser.type,
    });
  };

  const updateHeightFeet = async (event) => {
    await setTempUser({
      username: tempUser.username,
      password: tempUser.password,
      age: tempUser.age,
      enrolled: tempUser.enrolled,
      heightFeet: event.target.value,
      heightInches: tempUser.heightInches,
      weight: tempUser.weight,
      sex: tempUser.sex,
      gender: tempUser.gender,
      allergies: tempUser.allergies,
      phys: tempUser.phys,
      psych: tempUser.psych,
      med: tempUser.med,
      type: tempUser.type,
    });
  };

  const updateHeightInches = async (event) => {
    await setTempUser({
      username: tempUser.username,
      password: tempUser.password,
      age: tempUser.age,
      enrolled: tempUser.enrolled,
      heightFeet: tempUser.heightFeet,
      heightInches: event.target.value,
      weight: tempUser.weight,
      sex: tempUser.sex,
      gender: tempUser.gender,
      allergies: tempUser.allergies,
      phys: tempUser.phys,
      psych: tempUser.psych,
      med: tempUser.med,
      type: tempUser.type,
    });
  };

  const updateWeight = async (event) => {
    await setTempUser({
      username: tempUser.username,
      password: tempUser.password,
      age: tempUser.age,
      enrolled: tempUser.enrolled,
      heightFeet: tempUser.heightFeet,
      heightInches: tempUser.heightInches,
      weight: event.target.value,
      sex: tempUser.sex,
      gender: tempUser.gender,
      allergies: tempUser.allergies,
      phys: tempUser.phys,
      psych: tempUser.psych,
      med: tempUser.med,
      type: tempUser.type,
    });
  };

  const updateBioSex = async (value) => {
    await setTempUser({
      username: tempUser.username,
      password: tempUser.password,
      age: tempUser.age,
      enrolled: tempUser.enrolled,
      heightFeet: tempUser.heightFeet,
      heightInches: tempUser.heightInches,
      weight: tempUser.weight,
      sex: value,
      gender: tempUser.gender,
      allergies: tempUser.allergies,
      phys: tempUser.phys,
      psych: tempUser.psych,
      med: tempUser.med,
      type: tempUser.type,
    });
  };
  // const isValidInput = (input) => !(input.length === 0 || !input.match(/^[0-9]+$/));

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

    async function postUserInfo() {
      // console.log(JSON.stringify(tempUser));
      await fetch(`http://localhost:5000/record/participant-edit/${tempUser.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempUser),
      })
        .catch((e) => {
          throw new Error(e);
        });
      return true;
    }

    if (await postUserInfo()) {
      await setUser(tempUser);
      navigation.navigate('ParticipantHome', {
        user: tempUser,
        setUser,
      });
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
      color: '#103143',
    },
    button: {
      width: 275,
      height: 35,
      fontSize: 12,
      letterSpacing: 1,
      marginTop: 20,
    },
    inputField: {
      width: 40,
      height: 27,
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderWidth: 1,
      marginRight: 5,
      marginBottom: 10,
      borderRadius: 3,
      color: '#103143',
    },
    heightInput: {
      width: 40,
      height: 27,
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderWidth: 1,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 10,
      borderRadius: 3,
      color: '#103143',
    },
    inputView: {
      display: 'flex',
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.container}>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <Text style={styles.header}>Edit Profile</Text>
      <View>
        <Text style={styles.subheader}>Age</Text>
        <TextInput
          style={styles.inputField}
          type="text"
          id="age"
          defaultValue={user.age}
          onChange={updateAge}
        />
        {/* <span className="error-message">{ageErr.message}</span> */}
        <Text style={styles.subheader}>Height</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputField}
            type="text"
            id="age"
            defaultValue={user.heightFeet}
            onChange={updateHeightFeet}
          />
          <Text color="#103143">ft</Text>
          {/* <span className="error-message">{feetErr.message}</span> */}
          <TextInput
            style={styles.heightInput}
            type="text"
            id="age"
            defaultValue={user.heightInches}
            onChange={updateHeightInches}
          />
          <Text color="#103143" marginLeft="10">in</Text>
        </View>
        {/* <span className="error-message">{inchErr.message}</span> */}
        <Text style={styles.subheader}>Weight</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputField}
            type="text"
            id="age"
            defaultValue={user.weight}
            onChange={updateWeight}
          />
          <Text color="#103143" marginLeft="10">lbs</Text>
        </View>
        {/* <span className="error-message">{weightErr.message}</span> */}
        <Text style={styles.subheader}>Biological Sex</Text>
        <label htmlFor="form" className="radio-option">
          <input
            type="radio"
            id="male"
            value="male"
            name="option"
            defaultChecked={(user.sex === 'male') ? 'checked' : ''}
            onClick={() => updateBioSex('male')}
          />
          <Text color="#103143">Male</Text>
        </label>
        <label htmlFor="form" className="radio-option">
          <input
            type="radio"
            id="female"
            value="female"
            name="option"
            defaultChecked={(user.sex === 'female') ? 'checked' : ''}
            onClick={() => updateBioSex('female')}
          />
          <Text color="#103143">Female</Text>
        </label>
        <label htmlFor="form" className="radio-option">
          <input
            type="radio"
            id="intersex"
            value="intersex"
            name="option"
            defaultChecked={(user.sex === 'intersex') ? 'checked' : ''}
            onClick={() => updateBioSex('intersex')}
          />
          <Text color="#103143">Intersex</Text>
        </label>
        {/* <DropDownPicker
            items={[{label: 'Apple', value: 'apple'}, {label: 'Banana', value: 'banana'}]}
            defaultValue="item1"
            containerStyle={{height: 40}}
            style={{backgroundColor: '#BBEFEB'}}
            dropDownStyle={{backgroundColor: '#BBEFEB'}}
          /> */}
      </View>
      {/* <div className="spacer"></div> */}
      <View style={styles.button}>
        <Button title="UPDATE" color="#103143" onPress={() => handleUpdate()} />
      </View>
    </View>
  );
}

export default ParticipantEdit;
