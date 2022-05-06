/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function NavBar({ user, setUser }) {
  const [accountToggled, setAccountToggled] = useState(false);
  const navigate = useNavigate();
  const editProfile = () => {
    let arr = {};

    if (user.type === 0) { // participant
      arr = {
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
        type: user.type,
      };
    } else if (user.type === 1) { // researcher
      arr = {
        username: user.username,
        password: user.password,
        name: user.name,
        organization: user.organization,
        type: user.type,
      };
    }

    // store current state in case of 'Cancel'
    localStorage.setItem(user.username, JSON.stringify(arr));
    navigate(`/${(user.type ?? 0) === 0 ? 'participant' : 'researcher'}-edit`);
  };

  const accountOptions = (
    <div
      className="acct-options"
      style={{ display: accountToggled ? 'flex' : 'none' }}
    >
      <button
        type="button"
        className="account-btn"
        onClick={editProfile}
      >
        EDIT PROFILE
      </button>
      <button
        type="button"
        className="account-btn"
        onClick={async () => { console.log('go to delete account'); navigate('/delete-account', { user, setUser }); }}
      >
        DELETE ACCOUNT
      </button>
      <button
        type="button"
        className="logout-btn"
        onClick={async () => { navigate('/', { user, setUser }); }}
      >
        LOGOUT
      </button>
    </div>
  );

  const toggleAccountOptions = () => {
    setAccountToggled(!accountToggled);
  };

  return (
    <div className="nav">
      <button
        type="button"
        className="nav-btn"
        onClick={async () => {
          navigate(`/${(user.type ?? 0) === 0 ? 'participant' : 'researcher'}-home`);
        }}
      >
        HOME
      </button>
      {
        (user.type ?? 0) === 1
          ? null
          : (
            <button
              type="button"
              className="nav-btn"
              onClick={async () => {
                navigate('/participant-studies');
              }}
            >
              MY STUDIES
            </button>
          )
      }
      <button
        type="button"
        className="nav-btn"
        onClick={async () => { navigate('/messages', { user }); }}
      >
        MESSAGES
      </button>
      <button
        type="button"
        className="nav-btn"
        onClick={async () => {
          navigate(`/${(user.type ?? 0) === 0 ? 'participant' : 'researcher'}-dashboard`, { user });
        }}
      >
        ANALYTICS
      </button>
      <button type="button" className="account-btn" onClick={toggleAccountOptions}>ACCOUNT</button>
      {accountOptions}
    </div>
  );
}

export default NavBar;
