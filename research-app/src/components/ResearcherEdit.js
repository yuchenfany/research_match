/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function ResearcherEdit({ user, setUser }) {
  const navigate = useNavigate();

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

  async function postUserInfo() {
    await fetch(`http://localhost:5000/record/researcher-edit/${user.username}`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((e) => {
        window.alert(e);
      });

    return true;
  }

  async function handleSubmit(event) {
    if (await postUserInfo()) {
      navigate('/researcher-home');
    } else {
      event.preventDefault();
    }
  }

  async function handleCancel() {
    // retrieve stored state
    const stored = JSON.parse(localStorage.getItem(user.username));
    await setUser(stored);
    navigate('/researcher-home');
  }

  return (
    <div className="ResearcherEdit">
      <NavBar user={user} />
      <div className="profile-flex">
        <div className="header-left">Edit Researcher Profile</div>
        <div className="profile-row">
          <div className="input-label">Name</div>
          <input
            className="profile-input"
            type="text"
            id="researcher"
            value={user.name}
            onChange={updateResearcher}
          />
        </div>
        <div className="profile-row">
          <div className="input-label">Organization</div>
          <input
            className="profile-input"
            type="text"
            id="organization"
            value={user.organization}
            onChange={updateOrganization}
          />
        </div>
        <div className="profile-row">
          <div className="button-row">
            <input className="cancel-button" type="submit" value="CANCEL" onClick={handleCancel} />
            <input className="update-button" type="submit" value="UPDATE" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearcherEdit;
