/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
// import NavBar from './NavBar';

function AddStudy({ route, navigation}) { // add props user
  let {user, setUser} = route.params;
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
        window.alert(e);
      });
    return true;
  }

  const updateTitle = async (event) => {
    console.log(event.target.value);
    console.log(study);

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
    console.log(event.target.value);
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
  async function getTagsArr(tags) {
    const arr = [];

    for (let i = 0; i < tags.length; i += 1) {
      arr.push(tags[i].value);
    }

    return arr;
  }

  const updateTags = async (tags) => {
    const arr = await getTagsArr(tags);
    setStudy({
      title: study.title,
      description: study.description,
      compensation: study.compensation,
      duration: study.duration,
      tags: arr,
      participants: study.participants,
      studyId: study.studyId,
      researchers: study.researchers,
    });
  };
  async function handleSubmit(event) {
    if (await verify()) {
      navigation.navigate('ResearcherHome', {
        user: user, 
        setUser: setUser,
        setStudy: setStudy
      });
    } else {
      event.preventDefault();
    }
  }

  return (
    <div className="Profile">
      <div className="profile-flex">
        <div className="header-left"> Create Study </div>
        <div className="title-row">
          <div>Title</div>
          <input
            className="input-field"
            type="text"
            id="title"
            onChange={updateTitle}
          />
        </div>
        <div className="description-row">
          <div>Description</div>
          <input
            className="input-field"
            type="text"
            id="description"
            onChange={updateDescription}
          />
          <div>Compensation</div>
          <input
            className="input-field"
            type="text"
            id="compensation"
            onChange={updateCompensation}
          />
          <div>Duration</div>
          <input
            className="input-field"
            type="text"
            id="duration"
            onChange={updateDuration}
          />
          <div>Lead Researcher</div>
          <input
            className="input-field"
            type="text"
            id="researchers"
            onChange={updateResearcher}
          />
        </div>
        <div className="profile-row">
          <div>Tags</div>
        </div>
        <div className="profile-row">
        </div>
        <input className="signup-button" type="submit" value="Add Study" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default AddStudy;