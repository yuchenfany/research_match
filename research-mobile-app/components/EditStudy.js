/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  View, Text, Button, TextInput, StyleSheet,
} from 'react-native';
// import Select from 'react-select';

function EditStudy({ route, navigation }) {
  const {
    user, setUser, study, setStudy,
  } = route.params;

  const [temp, setTemp] = useState({
    // _id: study._id,
    title: study.title,
    description: study.description,
    compensation: study.compensation,
    duration: study.duration,
    tags: study.tags,
    participants: study.participants,
    studyId: study.studyId,
    researchers: study.researchers,
  });

  // async function getStudy() {
  //   const studyData = await fetch(`http://localhost:5000/study/${study.studyId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await studyData.json();

  //   return data;
  // }

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
    // const myobj = {
    //   title: temp.title,
    //   description: temp.description,
    //   compensation: temp.compensation,
    //   duration: temp.duration,
    //   tags: temp.tags,
    //   participants: temp.participants,
    //   studyId: temp.studyId,
    //   researchers: temp.researchers,
    // };
    // console.log(myobj.title);

    // edits the study
    await fetch('http://localhost:5000/study/edit-study', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp),
    })
      .catch((e) => {
        throw new Error(e);
      });
    return true;
  }

  const updateTitle = async (event) => {
    await setTemp({
      // _id: temp._id,
      title: event.target.value,
      description: temp.description,
      compensation: temp.compensation,
      duration: temp.duration,
      tags: temp.tags,
      participants: temp.participants,
      studyId: temp.studyId,
      researchers: temp.researchers,
    });
  };
  const updateDescription = async (event) => {
    await setTemp({
      // _id: temp._id,
      title: temp.title,
      description: event.target.value,
      compensation: temp.compensation,
      duration: temp.duration,
      tags: temp.tags,
      participants: temp.participants,
      studyId: temp.studyId,
      researchers: temp.researchers,
    });
  };
  const updateCompensation = async (event) => {
    await setTemp({
      // _id: temp._id,
      title: temp.title,
      description: temp.description,
      compensation: event.target.value,
      duration: temp.duration,
      tags: temp.tags,
      participants: temp.participants,
      studyId: temp.studyId,
      researchers: temp.researchers,
    });
  };
  const updateDuration = async (event) => {
    await setTemp({
      // _id: temp._id,
      title: temp.title,
      description: temp.description,
      compensation: temp.compensation,
      duration: event.target.value,
      tags: temp.tags,
      participants: temp.participants,
      studyId: temp.studyId,
      researchers: temp.researchers,
    });
  };
  // const updateResearcher = async (event) => {
  //   await setTemp({
  //     // _id: temp._id,
  //     title: temp.title,
  //     description: temp.description,
  //     compensation: temp.compensation,
  //     duration: temp.duration,
  //     tags: temp.tags,
  //     participants: temp.participants,
  //     studyId: temp.studyId,
  //     researchers: event.target.value,
  //   });
  // };

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
      await setStudy(temp);
      navigation.navigate('ResearcherHome', {
        user,
        setUser,
        setStudy,
      });
    } else {
      event.preventDefault();
    }
  }

  // deletes a study
  async function deleteStudy() {
    await fetch(`http://localhost:5000/study/${study.studyId}`, {
      method: 'DELETE',
      body: null,
    });
    navigation.navigate('ResearcherHome', {
      user,
      setUser,
      setStudy,
    });
  }

  // finding researcher's list of studies
  async function getStudyIds() {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    return json?.studies ?? [];
  }

  // for deleting a study: updates a researcher's study array
  async function updateResearcherStudies() {
    const currStudies = await getStudyIds();
    const updatedStudies = currStudies.filter((e) => e !== study.studyId);

    const bodyObj = {
      username: user.username,
      studies: updatedStudies,
    };

    await fetch(`http://localhost:5000/record/researcher-studies/${user.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObj),
    })
      .catch((e) => {
        throw new Error(e);
      });
    return true;
  }

  // calling delete study functions
  async function handleDelete() {
    deleteStudy().then(updateResearcherStudies());
  }

  // async function getParticipants() {
  //   const response = await fetch(`http://localhost:5000/study/${study.studyId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).catch((e) => { window.alert(e); });
  //   const json = await response.json();
  //   const participantIds = json?.participants ?? [];
  //   const participants = await Promise.all(
  //     participantIds.map(
  //       async (id) => {
  //         const participantData = await fetch(`http://localhost:5000/record/${id}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }).catch((e) => { window.alert(e); });
  //         const participant = await participantData.json();
  //         return participant;
  //       },
  //     ),
  //   );
  //   return participants ?? [];
  // }

  // async function removeStudyForParticipants(participants) {
  //   await Promise.all(
  //     participants.map(
  //       async (participant) => {
  //         if (!participant) {
  //           return;
  //         }
  //         const updatedStudies = participant.enrolled.filter((e) => e !== study.studyId) ?? [];
  //         const bodyObj = participant;
  //         bodyObj.enrolled = updatedStudies;
  //         await fetch(`http://localhost:5000/record/participant-edit/${participant.username}`, {
  //           method: 'POST',
  //           body: JSON.stringify(bodyObj),
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }).catch((e) => { window.alert(e); });
  //       },
  //     ),
  //   );
  // }

  // async function handleClose() {
  //   await getParticipants().then((participants) =>
  // { removeStudyForParticipants(participants); });
  //   const bodyObj = study;
  //   bodyObj.closed = '1';
  //   bodyObj.participants = [];
  //   await fetch('http://localhost:5000/add-study', {
  //     method: 'POST',
  //     body: JSON.stringify(bodyObj),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).catch((e) => { window.alert(e); });
  //   navigate('/researcher-home');
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
      marginBottom: 20,
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
    smallInput: {
      width: 40,
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
      <Text style={styles.header}>
        Edit Study:
        <Text>{' '}</Text>
        {study.title}
      </Text>
      <Text color="#103143" marginTop="10">Title: </Text>
      <TextInput
        style={styles.inputField}
        type="text"
        id="title"
        value={temp.title}
        onChange={updateTitle}
      />
      <Text color="#103143" marginTop="10">Description: </Text>
      <TextInput
        style={styles.inputField}
        type="text"
        id="description"
        value={temp.description}
        onChange={updateDescription}
      />
      <Text color="#103143" marginTop="10">Compensation: </Text>
      <TextInput
        style={styles.smallInput}
        type="text"
        id="compensation"
        value={temp.compensation}
        onChange={updateCompensation}
      />
      <Text color="#103143" marginTop="10">Duration: </Text>
      <TextInput
        style={styles.smallInput}
        type="text"
        id="duration"
        value={temp.duration}
        onChange={updateDuration}
      />
      <View style={styles.button}>
        <Button title="UPDATE" color="#103143" type="submit" onPress={() => handleSubmit()} />
      </View>
      <View style={styles.button}>
        <Button title="DELETE STUDY" color="#103143" type="button" onPress={() => handleDelete()} />
      </View>
    </View>
  );
}

export default EditStudy;
