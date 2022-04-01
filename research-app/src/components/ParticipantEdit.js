/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function ParticipantEdit({ user, setUser }) {
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

  async function handleSubmit(event) {
    if (await postUserInfo()) {
      navigate('/participant-home');
    } else {
      event.preventDefault();
    }
  }

  return (
    <div className="ParticipantEdit">
      <div className="profile-flex">
        <div className="header-left"> Edit User Profile </div>
        <div className="profile-row">
          <div>Age</div>
          <input
            className="input-field"
            type="text"
            id="age"
            value={user.age}
            onChange={updateAge}
          />
          <div>Height</div>
          <input
            className="input-field"
            type="text"
            id="age"
            value={user.heightFeet}
            onChange={updateHeightFeet}
          />
          <div>ft</div>
          <input
            className="input-field"
            type="text"
            id="age"
            value={user.heightInches}
            onChange={updateHeightInches}
          />
          <div>in</div>
          <div>Weight</div>
          <input
            className="input-field"
            type="text"
            id="age"
            value={user.weight}
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
          <div>Allergies</div>
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
        </div>
        <div className="profile-row">
          <Select
            options={physTags}
            isMulti
            onChange={(tags) => updatePhys(tags)}
            defaultValue={createObjectArr(user.phys)}
            styles={customStyles}
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
            defaultValue={createObjectArr(user.psych)}
            styles={customStyles}
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
            defaultValue={createObjectArr(user.med)}
            className="select-tags"
            styles={customStyles}
          />
        </div>
        <input className="signup-button" type="submit" value="UPDATE" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default ParticipantEdit;
