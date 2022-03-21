/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Profile({ user, setUser }) {
  const navigate = useNavigate();

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
    { label: 'Adderall', value: 'adderla' },
    { label: 'Prozac', value: 'prozac' },
    { label: 'Lexapro', value: 'lexapro' },
  ];

  async function verify() {
    await fetch('http://localhost:5000/record/add', {
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
    });
  };

  const updateHeightFeet = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
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
    });
  };

  const updateHeightInches = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
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
    });
  };

  const updateWeight = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
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
    });
  };

  const updateBioSex = async (value) => {
    setUser({
      username: user.username,
      password: user.password,
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
    });
  };

  const updateGender = async (value) => {
    setUser({
      username: user.username,
      password: user.password,
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
    });
  };

  const updateAllergies = async (tags) => {
    const arr = await getTagsArr(tags);

    setUser({
      username: user.username,
      password: user.password,
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
    });
  };

  const updatePhys = async (tags) => {
    const arr = await getTagsArr(tags);

    setUser({
      username: user.username,
      password: user.password,
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
    });
  };

  const updatePsych = async (tags) => {
    const arr = await getTagsArr(tags);

    setUser({
      username: user.username,
      password: user.password,
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
    });
  };

  const updateMed = async (tags) => {
    const arr = await getTagsArr(tags);

    setUser({
      username: user.username,
      password: user.password,
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
        <div className="header-left"> Create Profile </div>
        <div className="profile-row">
          <div>Age</div>
          <input
            className="input-field"
            type="text"
            id="age"
            onChange={updateAge}
          />
          <div>Height</div>
          <input
            className="input-field"
            type="text"
            id="age"
            onChange={updateHeightFeet}
          />
          <div>ft</div>
          <input
            className="input-field"
            type="text"
            id="age"
            onChange={updateHeightInches}
          />
          <div>in</div>
          <div>Weight</div>
          <input
            className="input-field"
            type="text"
            id="age"
            onChange={updateWeight}
          />
          <div>lbs</div>
        </div>
        <div className="profile-row">
          <div>Biological Sex</div>
          <label htmlFor="form" className="radio-option">
            <input
              type="radio"
              id="male"
              value="male"
              name="option"
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
              onClick={() => updateBioSex('intersex')}
            />
            <div>Intersex</div>
          </label>
        </div>
        <div className="profile-row">
          <div>Gender</div>
          <div className="dropdown">
            <Select
              options={genderOptions}
              onChange={(option) => updateGender(option.value)}
              styles={customStyles}
            />
          </div>
        </div>
        <div className="profile-row">
          <div>Allergies</div>
        </div>
        <div className="profile-row">
          <Select
            options={allergyTags}
            isMulti
            onChange={(tags) => updateAllergies(tags)}
            styles={customStyles}
          />
        </div>
        <div className="profile-row">
          <div>Medical Conditions (Physical)</div>
        </div>
        <div className="profile-row">
          <Select
            options={physTags}
            isMulti
            onChange={(tags) => updatePhys(tags)}
            className="select-tags"
          />
        </div>
        <div className="profile-row">
          <div>Medical Conditions (Psychological)</div>
        </div>
        <div className="profile-row">
          <Select
            options={psychTags}
            isMulti
            onChange={(tags) => updatePsych(tags)}
            className="select-tags"
          />
        </div>
        <div className="profile-row">
          <div>Medications</div>
        </div>
        <div className="profile-row">
          <Select
            options={medTags}
            isMulti
            onChange={(tags) => updateMed(tags)}
            className="select-tags"
          />
        </div>
        <input className="signup-button" type="submit" value="SIGN UP" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Profile;
