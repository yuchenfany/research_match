/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Profile() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  const handleAgeChange = async () => {
    // console.log(event.target.value);
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
            onChange={handleAgeChange}
          />
          <div>Height</div>
          <input
            className="input-field"
            type="text"
            id="age"
            onChange={handleAgeChange}
          />
          <div>ft</div>
          <input
            className="input-field"
            type="text"
            id="age"
            onChange={handleAgeChange}
          />
          <div>in</div>
          <div>Weight</div>
          <input
            className="input-field"
            type="text"
            id="age"
            onChange={handleAgeChange}
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
            <select>
              <option>Female</option>
              <option>Male</option>
              <option>Transgender</option>
              <option>Non-binary</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </div>
        </div>
        <div className="profile-row">
          <div>Allergies</div>
        </div>
        <input className="signup-button" type="submit" value="SIGN UP" onClick={goToHome} />
      </div>
    </div>
  );
}

export default Profile;
