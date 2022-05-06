/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  View, Button, Text, TextInput, StyleSheet,
} from 'react-native';
import NavBar from './NavBar';

function ResearcherEdit({ route, navigation }) {
  const { user, setUser } = route.params;

  const [tempUser, setTempUser] = useState({
    username: user.username,
    password: user.password,
    name: user.name,
    organization: user.organization,
    studies: user.studies,
    type: user.type,
    title: user.title,
  });

  // const [nameErr, setNameErr] = useState({ message: '' });
  // const [orgErr, setOrgErr] = useState({ message: '' });

  // const isValidInput = (input) => !(input.length === 0);

  const updateResearcher = async (event) => {
    await setTempUser({
      username: tempUser.username,
      password: tempUser.password,
      name: event.target.value,
      organization: tempUser.organization,
      studies: tempUser.studies,
      type: tempUser.type,
      title: tempUser.title,
    });
  };

  const updateOrganization = async (event) => {
    await setTempUser({
      username: tempUser.username,
      password: tempUser.password,
      name: tempUser.name,
      organization: event.target.value,
      studies: tempUser.studies,
      type: tempUser.type,
      title: tempUser.title,
    });
  };

  async function postUserInfo() {
    await fetch(`http://localhost:5000/record/researcher-edit/${user.username}`, {
      method: 'POST',
      body: JSON.stringify(tempUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((e) => {
        throw new Error(e);
      });

    return true;
  }

  async function handleSubmit(event) {
    // if (!isValidInput(user.name) || !isValidInput(user.organization)) {
    //   if (!isValidInput(user.name)) {
    //     setNameErr({ message: 'Please enter your name' });
    //   } else {
    //     setNameErr({ message: '' });
    //   }

    //   if (!isValidInput(user.organization)) {
    //     setOrgErr({ message: 'Please enter your organization' });
    //   } else {
    //     setOrgErr({ message: '' });
    //   }

    //   event.preventDefault();

    //   return;
    // }

    if (await postUserInfo()) {
      await setUser(tempUser);

      navigation.navigate('ResearcherHome', {
        user: tempUser,
        setUser,
      });
    } else {
      event.preventDefault();
    }
  }

  // async function handleCancel() {
  //   // retrieve stored state
  //   const stored = JSON.parse(localStorage.getItem(user.username));
  //   await setUser(stored);
  //   // navigate('/researcher-home');
  // }

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
      width: 275,
      height: 27,
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderWidth: 1,
      marginRight: 5,
      marginBottom: 10,
      borderRadius: 3,
      color: '#103143',
    },
  });

  return (
    <View style={styles.container}>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <Text style={styles.header}>Edit Profile</Text>
      <Text color="#103143" marginTop="10">Name</Text>
      <TextInput
        style={styles.inputField}
        type="text"
        id="researcher"
        defaultValue={user.name}
        onChange={updateResearcher}
      />
      {/* <span className="error-message">{nameErr.message}</span> */}
      <Text color="#103143" marginTop="10">Organization</Text>
      <TextInput
        style={styles.inputField}
        type="text"
        id="organization"
        defaultValue={user.organization}
        onChange={updateOrganization}
      />
      {/* <span className="error-message">{orgErr.message}</span> */}
      {/* <input className="cancel-button" type="submit"
      value="CANCEL" onClick={handleCancel} /> */}
      <View style={styles.button}>
        <Button className="update-button" type="submit" title="UPDATE" color="#103143" onPress={(e) => handleSubmit(e)} />
      </View>
    </View>
  );
}

export default ResearcherEdit;
