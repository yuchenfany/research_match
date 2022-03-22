/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
// import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
// study, setStudy,
function AddStudy({ study, setStudy }) {
  // const updateStudy = async () => {
  //   setStudy({
  //     title: '',
  //     description: '',
  //     compensation: '',
  //     duration: '',
  //     tags: [],
  //     participants: [],
  //     studyId: 4,
  //     researchers: [],
  //   });
  // };

  useEffect(() => {
    setStudy({
      title: '',
      description: '',
      compensation: '',
      duration: '',
      tags: [],
      participants: [],
      studyId: 4,
      researchers: [],
    });
    console.log('useEFfect is being run');
    console.log(study.description);
  }, []);
  const navigate = useNavigate();

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

  // const allergyTags = [
  //   { label: 'Tree Nuts', value: 'treeNuts' },
  //   { label: 'Gluten', value: 'gluten' },
  //   { label: 'Penicillin', value: 'penicillin' },
  //   { label: 'Peanuts', value: 'peanuts' },
  //   { label: 'Aspirin', value: 'aspirin' },
  //   { label: 'Pollen', value: 'pollen' },
  // ];

  async function verify() {
    await fetch('http://localhost:5000/study/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(study),
    })
      .catch((e) => {
        window.alert(e);
      });

    return true;
  }

  // async function getTagsArr(tags) {
  //   const arr = [];

  //   for (let i = 0; i < tags.length; i += 1) {
  //     arr.push(tags[i].value);
  //   }

  //   return arr;
  // }

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

  async function handleSubmit(event) {
    if (await verify()) {
      navigate('/home');
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
            id="cpmpensation"
            onChange={updateCompensation}
          />
          <div>Duration</div>
          <input
            className="input-field"
            type="text"
            id="age"
            onChange={updateDuration}
          />
        </div>
        <input className="signup-button" type="submit" value="Add Study" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default AddStudy;
