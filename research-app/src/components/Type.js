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
    }

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
      type,
    });
  };

  return (
    <div className="Type">
      <div className="header-left">Select account type</div>
      <label htmlFor="form" className="radio-option"> 
        <input
          type="radio"
          key="researcher"
          id="researcher"
          data-testid = "researcher"
          value="researcher"
          name="researcher"
          onClick={() => updateType('researcher')}
        />
        <div>Researcher</div>
      </label>
      <label htmlFor="form" className="radio-option">
        <input
          type="radio"
          key="participant"
          id="participant"
          data-testid = "participant"
          value="participant"
          name="participant"
          onClick={() => updateType('participant')}
        />
        <div>Participant</div>
      </label>
      <button className="confirm-button" type="submit" value="CONFIRM" onClick={goToProfile}> CONFIRM</button>
    </div>
  );
}

export default Type;
