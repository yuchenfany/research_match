/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
// study, setStudy,
function EditStudy({ user, study, setStudy }) {
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
  const navigate = useNavigate();
  const Tags = [
    { label: 'Diabetes', value: 'diabetes' },
    { label: 'Cancer', value: 'cancer' },
    { label: 'Social', value: 'social' },
    { label: 'placebo', value: 'placebo' },
    { label: 'Brain', value: 'brain' },
    { label: 'Physical', value: 'physical' },
  ];
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: 'state.selectProps.width,',
      color: state.selectProps.menuColor,
    }),
    control: (provided, state) => ({
      ...provided,
      background: '#F9FFFE',
      borderColor: '#808A8F',
      fontSize: '14px',
      boxShadow: state.isFocused ? null : null,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      backgroundColor: '#BBEFEB',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      backgroundColor: '#BBEFEB',
      ':hover': {
        color: '#4aa8a2',
      },
    }),
  };
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
    setStudy({
      title: study.title,
      description: study.description,
      compensation: study.compensation,
      duration: study.duration,
      tags: study.tags,
      participants: study.participants,
      studyId: study.studyId,
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
      studyId: study.studyId,
      researchers: study.researchers,
    };
    // edits the study
    await fetch('http://localhost:5000/study/edit-study', {
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
      navigate('/researcher-home');
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
    navigate('/researcher-home');
  }

  // for deleting a study: updates a researcher's study array
  async function updateResearcherStudies() {
    const updatedStudies = user.studies.filter((e) => e !== study.studyId);

    const bodyObj = {
      username: user.username,
      password: user.password,
      name: user.name,
      organization: user.organization,
      studies: updatedStudies,
      type: user.type,
      title: user.title,
    };

    await fetch(`http://localhost:5000/record/researcher-studies/${user.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObj),
    })
      .catch((e) => {
        window.alert(e);
      });
    return true;
  }

  // calling delete study functions
  async function handleDelete() {
    deleteStudy().then(updateResearcherStudies());
  }

  async function getParticipants() {
    const response = await fetch(`http://localhost:5000/study/${study.studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => { window.alert(e); });
    const json = await response.json();
    const participantIds = json?.participants ?? [];
    const participants = await Promise.all(
      participantIds.map(
        async (id) => {
          const participantData = await fetch(`http://localhost:5000/record/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).catch((e) => { window.alert(e); });
          const participant = await participantData.json();
          return participant;
        },
      ),
    );
    return participants ?? [];
  }

  async function removeStudyForParticipants(participants) {
    await Promise.all(
      participants.map(
        async (participant) => {
          if (!participant) {
            return;
          }
          const updatedStudies = participant.enrolled.filter((e) => e !== study.studyId) ?? [];
          const bodyObj = participant;
          bodyObj.enrolled = updatedStudies;
          await fetch(`http://localhost:5000/record/participant-edit/${participant.username}`, {
            method: 'POST',
            body: JSON.stringify(bodyObj),
            headers: {
              'Content-Type': 'application/json',
            },
          }).catch((e) => { window.alert(e); });
        },
      ),
    );
  }

  async function handleClose() {
    await getParticipants().then((participants) => { removeStudyForParticipants(participants); });
    const bodyObj = study;
    bodyObj.closed = '1';
    bodyObj.participants = [];
    await fetch('http://localhost:5000/add-study', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => { window.alert(e); });
    navigate('/researcher-home');
  }

  return (
    <div className="Profile">
      <div className="profile-flex">
        <div className="header-left"> Edit Study </div>
        <div className="title-row">
          <div>Title</div>
          <input
            className="input-field"
            type="text"
            id="title"
            value={study.title}
            onChange={updateTitle}
          />
        </div>
        <div className="description-row">
          <div>Description</div>
          <input
            className="input-field"
            type="text"
            id="description"
            value={study.description}
            onChange={updateDescription}
          />
          <div>Compensation</div>
          <input
            className="input-field"
            type="text"
            id="compensation"
            value={study.compensation}
            onChange={updateCompensation}
          />
          <div>Duration</div>
          <input
            className="input-field"
            type="text"
            id="duration"
            value={study.duration}
            onChange={updateDuration}
          />
          <div>Lead Researcher</div>
          <input
            className="input-field"
            type="text"
            id="researchers"
            value={study.researchers}
            onChange={updateResearcher}
          />
        </div>
        <div className="profile-row">
          <div>Tags</div>
        </div>
        <div className="profile-row">
          <Select
            options={Tags}
            isMulti
            onChange={(tags) => updateTags(tags)}
            value={study.tags}
            styles={customStyles}
          />
        </div>
        <input className="signup-button" type="submit" value="Update" onClick={handleSubmit} />
        <input className="signup-button" type="button" value="Delete Study" onClick={handleDelete} />
        <input className="signup-button" type="button" value="Close Study" onClick={handleClose} />
      </div>
    </div>
  );
}

export default EditStudy;
