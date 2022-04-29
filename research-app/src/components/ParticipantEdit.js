/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
import NavBar from './NavBar';

function ParticipantEdit({ user, setUser }) {
  const navigate = useNavigate();
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

  const isValidInput = (input) => !(input.length === 0 || !input.match(/^[0-9]+$/));

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

  const genderOptions = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
    { label: 'Transgender', value: 'transgender' },
    { label: 'Non-binary', value: 'nonbinary' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to answer', value: 'prefer not to answer' },
  ];

  const allergyTags = [
    { label: 'Tree Nuts', value: 'treeNuts' },
    { label: 'Gluten', value: 'gluten' },
    { label: 'Penicillin', value: 'penicillin' },
    { label: 'Peanuts', value: 'peanuts' },
    { label: 'Aspirin', value: 'aspirin' },
    { label: 'Pollen', value: 'pollen' },
  ];

  const physTags = [
    { label: 'Arthritis', value: 'arthritis' },
    { label: 'Asthma', value: 'asthma' },
    { label: 'Diabetes', value: 'diabetes' },
    { label: 'Epilepsy', value: 'epilepsy' },
    { label: 'High Blood Pressure', value: 'highBloodPressure' },
    { label: 'Anemia', value: 'anemia' },
  ];

  const psychTags = [
    { label: 'Generalized Anxiety Disorder', value: 'anxiety' },
    { label: 'Bipolar Disorder', value: 'bipolar' },
    { label: 'Depression', value: 'depression' },
    { label: 'ADHD', value: 'adhd' },
    { label: 'Borderline Personality Disorder', value: 'borderline' },
    { label: 'Insomnia', value: 'insomnia' },
  ];

  const medTags = [
    { label: 'Adderall', value: 'adderall' },
    { label: 'Prozac', value: 'prozac' },
    { label: 'Lexapro', value: 'lexapro' },
  ];

  const createObjectArr = (tags) => {
    const arr = [];

    for (let i = 0; i < tags.length; i += 1) {
      arr.push({ label: (tags[i])[0].toUpperCase() + (tags[i]).substring(1), value: tags[i] });
    }

    return arr;
  };

  async function postUserInfo() {
    await fetch(`http://localhost:5000/record/participant-edit/${user.username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .catch((e) => {
        window.alert(e);
      });

    return true;
  }

  async function getTagsArr(tags) {
    const arr = [];

    for (let i = 0; i < tags.length; i += 1) {
      arr.push(tags[i].value);
    }

    return arr;
  }

  const updateAge = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: event.target.value,
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
    });
  };

  const updateHeightFeet = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: event.target.value,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: user.sex,
      gender: user.gender,
      allergies: user.allergies,
      phys: user.phys,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });
  };

  const updateHeightInches = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: event.target.value,
      weight: user.weight,
      sex: user.sex,
      gender: user.gender,
      allergies: user.allergies,
      phys: user.phys,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });
  };

  const updateWeight = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: event.target.value,
      sex: user.sex,
      gender: user.gender,
      allergies: user.allergies,
      phys: user.phys,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });
  };

  const updateBioSex = async (value) => {
    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: value,
      gender: user.gender,
      allergies: user.allergies,
      phys: user.phys,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });
  };

  const updateGender = async (value) => {
    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: user.sex,
      gender: value,
      allergies: user.allergies,
      phys: user.phys,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });
  };

  const updateAllergies = async (tags) => {
    const arr = await getTagsArr(tags);

    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: user.sex,
      gender: user.gender,
      allergies: arr,
      phys: user.phys,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });
  };

  const updatePhys = async (tags) => {
    const arr = await getTagsArr(tags);

    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: user.sex,
      gender: user.gender,
      allergies: user.allergies,
      phys: arr,
      psych: user.psych,
      med: user.med,
      type: user.type,
    });
  };

  const updatePsych = async (tags) => {
    const arr = await getTagsArr(tags);

    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: user.sex,
      gender: user.gender,
      allergies: user.allergies,
      phys: user.phys,
      psych: arr,
      med: user.med,
      type: user.type,
    });
  };

  const updateMed = async (tags) => {
    const arr = await getTagsArr(tags);

    setUser({
      username: user.username,
      password: user.password,
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
      med: arr,
      type: user.type,
    });
  };

  // // preserve original state in case of cancel
  // let originalUser = {};

  // useEffect(() => {
  //   localStorage.setItem(user.username, user);
  // }, []);

  async function handleUpdate(event) {
    if (!isValidInput(user.age) || !isValidInput(user.weight) || !isValidInput(user.heightFeet)
    || !isValidInput(user.heightInches) || user.gender === undefined || user.sex === undefined
    || user.allergies === undefined || user.allergies.length === 0 || user.phys === undefined
    || user.phys.length === 0 || user.psych === undefined || user.psych.length === 0
    || user.med === undefined || user.med.length === 0) {
      if (!isValidInput(user.age)) {
        setAgeErr({ message: 'Age: Enter a number' });
      } else {
        setAgeErr({ message: '' });
      }

      if (!isValidInput(user.weight)) {
        setWeightErr({ message: 'Weight: Enter a number' });
      } else {
        setWeightErr({ message: '' });
      }

      if (!isValidInput(user.heightFeet)) {
        setFeetErr({ message: 'Feet: Enter a number' });
      } else {
        setFeetErr({ message: '' });
      }

      if (!isValidInput(user.heightInches)) {
        setInchErr({ message: 'Inches: Enter a number' });
      } else {
        setInchErr({ message: '' });
      }

      if (user.gender === undefined) {
        setGenderErr({ message: 'Please make a selection' });
      } else {
        setGenderErr({ message: '' });
      }

      if (user.sex === undefined) {
        setSexErr({ message: 'Please make a selection' });
      } else {
        setSexErr({ message: '' });
      }

      if (user.allergies === undefined || user.allergies.length === 0) {
        setAllergErr({ message: 'Please make a selection or select "None"' });
      } else {
        setAllergErr({ message: '' });
      }

      if (user.phys === undefined || user.phys.length === 0) {
        setPhysErr({ message: 'Please make a selection or select "None"' });
      } else {
        setPhysErr({ message: '' });
      }

      if (user.psych === undefined || user.psych.length === 0) {
        setPsychErr({ message: 'Please make a selection or select "None"' });
      } else {
        setPsychErr({ message: '' });
      }

      if (user.med === undefined || user.med.length === 0) {
        setMedErr({ message: 'Please make a selection or select "None"' });
      } else {
        setMedErr({ message: '' });
      }

      event.preventDefault();

      return;
    }

    if (await postUserInfo()) {
      navigate('/participant-home');
    } else {
      event.preventDefault();
    }
  }

  async function handleCancel() {
    // retrieve stored state
    const stored = JSON.parse(localStorage.getItem(user.username));
    await setUser(stored);
    navigate('/participant-home');
  }

  return (
    <div className="ParticipantEdit">
      <NavBar user={user} />
      <div className="profile-flex">
        <div className="header-left"> Edit User Profile </div>
        <div className="profile-row">
          <div>Age</div>
          <input
            className="small-input"
            type="text"
            id="age"
            value={user.age}
            onChange={updateAge}
          />
          <span className="error-message">{ageErr.message}</span>
          <div>Height</div>
          <input
            className="small-input"
            type="text"
            id="age"
            value={user.heightFeet}
            onChange={updateHeightFeet}
          />
          <div>ft</div>
          <span className="error-message">{feetErr.message}</span>
          <input
            className="small-input"
            type="text"
            id="age"
            value={user.heightInches}
            onChange={updateHeightInches}
          />
          <div>in</div>
          <span className="error-message">{inchErr.message}</span>
          <div>Weight</div>
          <input
            className="small-input"
            type="text"
            id="age"
            value={user.weight}
            onChange={updateWeight}
          />
          <div>lbs</div>
          <span className="error-message">{weightErr.message}</span>
        </div>
        <div className="profile-row">
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
        </div>
        <div className="profile-row">
          <span className="error-message">{sexErr.message}</span>
        </div>
        <div className="profile-row">
          <div>Gender</div>
          <div className="dropdown">
            <Select
              options={genderOptions}
              onChange={(option) => updateGender(option.value)}
              defaultValue={{
                label: user.gender[0].toUpperCase() + user.gender.substring(1),
                value: user.gender,
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className="profile-row">
          <span className="error-message">{genderErr.message}</span>
        </div>
        <div className="profile-row">
          <div>Allergies</div>
          <span className="error-message">{allergErr.message}</span>
        </div>
        <div className="profile-row">
          <Select
            options={allergyTags}
            isMulti
            onChange={(tags) => updateAllergies(tags)}
            defaultValue={createObjectArr(user.allergies)}
            styles={customStyles}
          />
        </div>
        <div className="profile-row">
          <div>Medical Conditions (Physical)</div>
          <span className="error-message">{physErr.message}</span>
        </div>
        <div className="profile-row">
          <Select
            options={physTags}
            isMulti
            onChange={(tags) => updatePhys(tags)}
            defaultValue={createObjectArr(user.phys)}
            className="select-tags"
            styles={customStyles}
          />
        </div>
        <div className="profile-row">
          <div>Medical Conditions (Psychological)</div>
          <span className="error-message">{psychErr.message}</span>
        </div>
        <div className="profile-row">
          <Select
            options={psychTags}
            isMulti
            onChange={(tags) => updatePsych(tags)}
            defaultValue={createObjectArr(user.psych)}
            className="select-tags"
            styles={customStyles}
          />
        </div>
        <div className="profile-row">
          <div>Medications</div>
          <span className="error-message">{medErr.message}</span>
        </div>
        <div className="profile-row">
          <Select
            options={medTags}
            isMulti
            onChange={(tags) => updateMed(tags)}
            defaultValue={createObjectArr(user.med)}
            className="select-tags"
            styles={customStyles}
          />
        </div>
        <div className="button-row">
          <input className="cancel-button" type="submit" value="CANCEL" onClick={handleCancel} />
          <input className="update-button" type="submit" value="UPDATE" onClick={handleUpdate} />
        </div>
      </div>
    </div>
  );
}

export default ParticipantEdit;
