/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { addStudy } from '../modules/researcher-api';
import '../assets/index.css';

function AddStudy({ user, study, setStudy }) {
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

  const updateTitle = async (event) => {
    setStudy({
      title: event.target.value,
      description: study.description,
      compensation: study.compensation,
      duration: study.duration,
      tags: study.tags,
      participants: study.participants,
      studyId: study.studyId,
      researchers: user.name,
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
      researchers: user.name,
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
      researchers: user.name,
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
      researchers: user.name,
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
    if (await addStudy(user, study, setStudy)) {
      navigate('/researcher-home');
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
