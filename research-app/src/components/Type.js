/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';

function Type({ user, setUser }) {
  const navigate = useNavigate();

  function goToProfile() {
    if (user.type === 0) {
      navigate('/participant-profile');
    } else if (user.type === 1) {
      navigate('/researcher-profile');
    }
  }

  const updateType = async (value) => {
    let type = 0;
    if (value === 'researcher') {
      type = 1;
      setUser({
        username: user.username,
        password: user.password,
        messages: 0,
        type,
      });
    } else {
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
        med: user.med,
        messages: 0,
        type,
      });
    }
  };

  return (
    <div className="Type">
      <div className="header-left">Select account type</div>
      <label htmlFor="form" className="radio-option">
        <input
          type="radio"
          id="researcher"
          value="researcher"
          name="option"
          onClick={() => updateType('researcher')}
        />
        <div>Researcher</div>
      </label>
      <label htmlFor="form" className="radio-option">
        <input
          type="radio"
          id="participant"
          value="participant"
          name="option"
          onClick={() => updateType('participant')}
        />
        <div>Participant</div>
      </label>
      <input className="confirm-button" type="submit" value="CONFIRM" onClick={goToProfile} />
    </div>
  );
}

export default Type;
