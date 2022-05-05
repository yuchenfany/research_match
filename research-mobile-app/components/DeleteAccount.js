/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {
  View, Button, Text, StyleSheet,
} from 'react-native';
// import NavBar from './NavBar';

function DeleteAccount({ route, navigation }) { // add props user
  const { user, setUser } = route.params;
  // const [tempUser, setTempUser] = useState({
  //     username: user.username,
  //     password: user.password,
  //     age: 0,
  //     enrolled: user.enrolled,
  //     age: user.age,
  //     heightFeet: user.heightFeet,
  //     heightInches: user.heightInches,
  //     weight: user.weight,
  //     sex: user.sex,
  //     gender: user.gender,
  //     allergies: user.allergies,
  //     phys: user.phys,
  //     psych: user.psych,
  //     med: user.med,
  //     type: user.type,
  //   }
  // );

  async function verify() {
    // console.log(JSON.stringify(getNextStudyID()));
    // setStudy({
    //   studyId: getNextStudyID(),
    // });
    await fetch(`http://localhost:5000/record/delete/${user.username}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F3F8FA',
      flex: 1,
      padding: 20,
    },
    subheader: {
      fontSize: 16,
      lineHeight: 40,
      fontWeight: 500,
      marginBottom: 20,
      color: '#103143',
    },
    button: {
      width: 275,
      height: 35,
      fontSize: 12,
      letterSpacing: 1,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.subheader}>Are you sure you want to delete your account?</Text>
      <View style={styles.button}>
        <Button title="DELETE" color="#103143" onPress={() => handleSubmit()} />
      </View>
      <View style={styles.button}>
        <Button title="GO BACK" color="#103143" onPress={() => navigation.push('ParticipantHome', { user, setUser })} />
      </View>
    </View>
  );
}

export default DeleteAccount;
