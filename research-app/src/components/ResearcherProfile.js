/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';

function ResearcherProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [nameErr, setNameErr] = useState({ message: '' });
  const [orgErr, setOrgErr] = useState({ message: '' });

  const isValidInput = (input) => {
    if (input === undefined) {
      return false;
    }

    return !(input.length === 0);
  };

  async function verify() {
    await fetch('http://localhost:5000/record/add-researcher', {
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

  const updateResearcher = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
      name: event.target.value,
      organization: user.organization,
      type: user.type,
    });
  };

  const updateOrganization = async (event) => {
    setUser({
      username: user.username,
      password: user.password,
      name: user.name,
      organization: event.target.value,
      type: user.type,
    });
  };

  async function handleSubmit(event) {
    if (!isValidInput(user.name) || !isValidInput(user.organization)) {
      if (!isValidInput(user.name)) {
        setNameErr({ message: 'Please enter your name' });
      } else {
        setNameErr({ message: '' });
      }

      if (!isValidInput(user.organization)) {
        setOrgErr({ message: 'Please enter your organization' });
      } else {
        setOrgErr({ message: '' });
      }

      return;
    }

    if (await verify()) {
      navigate('/researcher-home');
    } else {
      event.preventDefault();
    }
  }

  return (
    <div className="ResearcherProfile">
      <div className="profile-flex">
        <div className="header-left">Create Researcher Profile</div>
        <div className="profile-row">
          <div className="input-label">Name</div>
          <input
            className="profile-input"
            type="text"
            id="researcher"
            onChange={updateResearcher}
          />
        </div>
        <div className="profile-row">
          <span className="error-message">{nameErr.message}</span>
        </div>
        <div className="profile-row">
          <div className="input-label">Organization</div>
          <input
            className="profile-input"
            type="text"
            id="organization"
            onChange={updateOrganization}
          />
        </div>
        <div className="profile-row">
          <span className="error-message">{orgErr.message}</span>
        </div>
        <div className="button-row">
          <input className="update-button" type="submit" value="SIGN UP" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ResearcherProfile;
