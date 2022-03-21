/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Profile({ user, setUser }) {
  const navigate = useNavigate();

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
    console.log(JSON.stringify(user));

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

  async function goToHome(event) {
    if (await verify()) {
      navigate('/home');
    } else {
      event.preventDefault();
    }
  }

  const updateAge = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
      age: event.target.value,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
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
    });
  };

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
              name="bio-sex"
            />
            <div>Male</div>
          </label>
          <label htmlFor="form" className="radio-option">
            <input
              type="radio"
              id="female"
              value="female"
              name="bio-sex"
            />
            <div>Female</div>
          </label>
          <label htmlFor="form" className="radio-option">
            <input
              type="radio"
              id="intersex"
              value="intersex"
              name="bio-sex"
            />
            <div>Intersex</div>
          </label>
        </div>
        <div className="profile-row">
          <div>Gender</div>
          <div className="dropdown">
            <Select
              options={genderOptions}
              onChange={(opt) => console.log(opt.label, opt.value)}
            />
          </div>
        </div>
        <div className="profile-row">
          <div>Allergies</div>
          <Select
            options={allergyTags}
            isMulti
            onChange={(opt) => console.log(opt.label, opt.value)}
            className="select-tags"
          />
        </div>
        <div className="profile-row">
          <div>Medical Conditions (Physical)</div>
          <Select
            options={physTags}
            isMulti
            onChange={(opt) => console.log(opt.label, opt.value)}
            className="select-tags"
          />
        </div>
        <div className="profile-row">
          <div>Medical Conditions (Psychological)</div>
          <Select
            options={psychTags}
            isMulti
            onChange={(opt) => console.log(opt.label, opt.value)}
            className="select-tags"
          />
        </div>
        <div className="profile-row">
          <div>Medications</div>
          <Select
            options={medTags}
            isMulti
            onChange={(opt) => console.log(opt.label, opt.value)}
            className="select-tags"
          />
        </div>
        <input className="signup-button" type="submit" value="SIGN UP" onClick={goToHome} />
      </div>
    </div>
  );
}

export default Profile;
