/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Select from 'react-select';
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

  // useEffect(() => {
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
  //   console.log('useEFfect is being run');
  //   console.log(study.description);
  // }, []);
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
  //   console.log(data);
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

  //   console.log('fetch is being called');
  // }
  async function verify() {
    const studyData = await fetch('http://localhost:5000/findMax', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    const Id = data[0].studyId + 1;
    console.log(Id);
    // console.log(study.studyId);
    // console.log(nextId);
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
    console.log(Id);
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

    console.log('fetch is being called');
    return true;
  }

  const updateTitle = async (event) => {
    console.log('UPDATE TITLE');
    console.log(event.target.value);
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
    console.log('UPDATE description');
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
    console.log(arr);
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
          <Select
            options={Tags}
            isMulti
            onChange={(tags) => updateTags(tags)}
            styles={customStyles}
          />
        </div>
        <input className="signup-button" type="submit" value="Add Study" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default AddStudy;
