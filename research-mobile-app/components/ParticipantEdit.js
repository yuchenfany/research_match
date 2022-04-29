/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// import NavBar from './NavBar';

function ParticipantEdit({ route, navigation }) { // add props user
  let {user, setUser} = route.params;
  console.log('PARTICIPANT EDIT === = ====');
  console.log(user.phys);
  console.log(user.password);
  
  const[tempUser, setTempUser] = useState({
      username: user.username,
      password: user.password,
      age: user.age,
      enrolled: user.enrolled,
      age: user.age,
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
    }
  );
  const [ageErr, setAgeErr] = useState({ message: '' });
  const [feetErr, setFeetErr] = useState({ message: '' });
  const [inchErr, setInchErr] = useState({ message: '' });
  const [weightErr, setWeightErr] = useState({ message: '' });
  const [sexErr, setSexErr] = useState({ message: '' });
  const [genderErr, setGenderErr] = useState({ message: '' });
  const [allergErr, setAllergErr] = useState({ message: '' });
  const [physErr, setPhysErr] = useState({ message: '' });
  const [psychErr, setPsychErr] = useState({ message: '' });
  const [medErr, setMedErr] = useState({ message: '' });

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
    console.log('BIO SEx UPDATE');
    console.log(value);
    await setTempUser({
      username: tempUser.username,
      password: tempUser.password,
      age: tempUser.age,
      enrolled: tempUser.enrolled,
      heightFeet: tempUser.heightFeet,
      heightInches: tempUser.heightInches,
      weight:  tempUser.weight,
      sex: value,
      gender: tempUser.gender,
      allergies: tempUser.allergies,
      phys: tempUser.phys,
      psych: tempUser.psych,
      med: tempUser.med,
      type: tempUser.type,
    });
  };
  const isValidInput = (input) => !(input.length === 0 || !input.match(/^[0-9]+$/));

  async function handleUpdate(event) {
    console.log('=============HANDLE UPDATE REACHED=============');

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
        await setUser(tempUser);

        navigation.navigate('ParticipantHome', {
            user: tempUser,
            setUser,
          });    
    } else {
      event.preventDefault();
    }
  }

  async function postUserInfo() {
    console.log('TEMP USER LOG');
    // console.log(JSON.stringify(tempUser));
    await fetch(`http://localhost:5000/record/participant-edit/${tempUser.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempUser),
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
            defaultValue={user.age}
            onChange={updateAge}
          />
          <span className="error-message">{ageErr.message}</span>
          <div>Height</div>
          <input
            className="small-input"
            type="text"
            id="age"
            defaultValue={user.heightFeet}
            onChange={updateHeightFeet}
          />
          <div>ft</div>
          <span className="error-message">{feetErr.message}</span>
          <input
            className="small-input"
            type="text"
            id="age"
            defaultValue={user.heightInches}
            onChange={updateHeightInches}
          />
          <div>in</div>
          <span className="error-message">{inchErr.message}</span>
          <div>Weight</div>
          <input
            className="small-input"
            type="text"
            id="age"
            defaultValue={user.weight}
            onChange={updateWeight}
          />
          <div>lbs</div>
          <span className="error-message">{weightErr.message}</span>
          <div>Biological Sex</div>
          <label htmlFor="form" className="radio-option">
            <input
              type="radio"
              id="male"
              value="male"
              name="option"
              defaultChecked={(user.sex === 'male') ? 'checked' : ''}
              onClick={() => updateBioSex('male')}
            />
            <div>Male</div>
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
            <div>Female</div>
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
            <div>Intersex</div>
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
        <Button title="UPDATE" onPress={() => handleUpdate()}/>
    </View>
  );
}

export default ParticipantEdit;
