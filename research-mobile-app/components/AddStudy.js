/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  View, Button, Text, TextInput, StyleSheet,
} from 'react-native';
// import NavBar from './NavBar';

function AddStudy({ route, navigation }) { // add props user
  const { user, setUser } = route.params;
  const [study, setStudy] = useState([]);
  // const Tags = [
  //   { label: 'Diabetes', value: 'diabetes' },
  //   { label: 'Cancer', value: 'cancer' },
  //   { label: 'Social', value: 'social' },
  //   { label: 'placebo', value: 'placebo' },
  //   { label: 'Brain', value: 'brain' },
  //   { label: 'Physical', value: 'physical' },
  // ];
  // const customStyles = {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     width: 'state.selectProps.width,',
  //     color: state.selectProps.menuColor,
  //   }),
  //   control: (provided, state) => ({
  //     ...provided,
  //     background: '#F9FFFE',
  //     borderColor: '#808A8F',
  //     fontSize: '14px',
  //     boxShadow: state.isFocused ? null : null,
  //   }),
  //   multiValueLabel: (styles) => ({
  //     ...styles,
  //     backgroundColor: '#BBEFEB',
  //   }),
  //   multiValueRemove: (styles) => ({
  //     ...styles,
  //     backgroundColor: '#BBEFEB',
  //     ':hover': {
  //       color: '#4aa8a2',
  //     },
  //   }),
  // };
  // async function getNextStudyID() {
  //   const studyData = await fetch('http://localhost:5000/findMax', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await studyData.json();
  //   return data;
  // }

  // async function addStudy() {
  //   await fetch('http://localhost:5000/add-study', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(study),
  //   })
  //     .catch((e) => {
  //       window.alert(e);
  //     });

  // }
  async function verify() {
    // finds maximum studyID in our collections
    const studyData = await fetch('http://localhost:5000/findMax', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    // sets next ID
    const Id = data[0].studyId + 1;
    // gets the userData
    const userData = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const currUser = await userData.json();
    const currStudies = currUser.studies;
    currStudies.push(Id);
    const updatedUser = {
      username: currUser.username,
      password: currUser.password,
      name: currUser.name,
      organization: currUser.organization,
      studies: currUser.studies,
      type: currUser.type,
    };
    // Adds the new created study into the user's studies field
    await fetch('http://localhost:5000/record/add-to-user-array', {
      method: 'POST',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setStudy({
      title: study.title,
      description: study.description,
      compensation: study.compensation,
      duration: study.duration,
      tags: study.tags,
      participants: study.participants,
      studyId: Id,
      researchers: study.researchers,
    // }, () => {
    //   addStudy();
    });
    const myobj = {
      title: study.title,
      description: study.description,
      compensation: study.compensation,
      duration: study.duration,
      tags: study.tags,
      participants: study.participants,
      studyId: Id,
      researchers: study.researchers,
    };
    // creates a new study in the study collection
    await fetch('http://localhost:5000/add-study', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myobj),
    })
      .catch((e) => {
        throw new Error(e);
      });
    return true;
  }

  const updateTitle = async (event) => {
    setStudy({
      title: event.target.value,
      description: study.description,
      compensation: study.compensation,
      duration: study.duration,
      tags: study.tags,
      participants: study.participants,
      studyId: study.studyId,
      researchers: study.researchers,
    });
  };
  const updateDescription = async (event) => {
    setStudy({
      title: study.title,
      description: event.target.value,
      compensation: study.compensation,
      duration: study.duration,
      tags: study.tags,
      participants: study.participants,
      studyId: study.studyId,
      researchers: study.researchers,
    });
  };
  const updateCompensation = async (event) => {
    setStudy({
      title: study.title,
      description: study.description,
      compensation: event.target.value,
      duration: study.duration,
      tags: study.tags,
      participants: study.participants,
      studyId: study.studyId,
      researchers: study.researchers,
    });
  };
  const updateDuration = async (event) => {
    setStudy({
      title: study.title,
      description: study.description,
      compensation: study.compensation,
      duration: event.target.value,
      tags: study.tags,
      participants: study.participants,
      studyId: study.studyId,
      researchers: study.researchers,
    });
  };
  const updateResearcher = async (event) => {
    setStudy({
      title: study.title,
      description: study.description,
      compensation: study.compensation,
      duration: study.duration,
      tags: study.tags,
      participants: study.participants,
      studyId: study.studyId,
      researchers: event.target.value,
    });
  };
  // async function getTagsArr(tags) {
  //   const arr = [];

  //   for (let i = 0; i < tags.length; i += 1) {
  //     arr.push(tags[i].value);
  //   }

  //   return arr;
  // }

  // const updateTags = async (tags) => {
  //   const arr = await getTagsArr(tags);
  //   setStudy({
  //     title: study.title,
  //     description: study.description,
  //     compensation: study.compensation,
  //     duration: study.duration,
  //     tags: arr,
  //     participants: study.participants,
  //     studyId: study.studyId,
  //     researchers: study.researchers,
  //   });
  // };

  async function handleSubmit(event) {
    if (await verify()) {
      navigation.navigate('ResearcherHome', {
        user,
        setUser,
        setStudy,
      });
    } else {
      event.preventDefault();
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F3F8FA',
      flex: 1,
      padding: 20,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
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
      marginBottom: 20,
      marginRight: 10,
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
      width: 500,
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
    inputField: {
      width: 275,
      height: 27,
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderWidth: 1,
      marginBottom: 10,
      borderRadius: 3,
      color: '#103143',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Study</Text>
      <View style={styles.row}>
        <Text style={styles.subheader}>Title:</Text>
        <TextInput
          style={styles.inputField}
          type="text"
          id="title"
          onChange={updateTitle}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.subheader}>Description:</Text>
        <TextInput
          style={styles.inputField}
          type="text"
          id="description"
          onChange={updateDescription}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.subheader}>Compensation:</Text>
        <TextInput
          style={styles.inputField}
          type="text"
          id="compensation"
          onChange={updateCompensation}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.subheader}>Duration:</Text>
        <TextInput
          style={styles.inputField}
          type="text"
          id="duration"
          onChange={updateDuration}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.subheader}>Lead Researcher:</Text>
        <TextInput
          style={styles.inputField}
          type="text"
          id="researchers"
          onChange={updateResearcher}
        />
      </View>
      <View style={styles.button}>
        <Button className="signup-button" color="#103143" type="submit" title="ADD STUDY" onPress={(e) => handleSubmit(e)} />
      </View>
    </View>
  );
}

export default AddStudy;
