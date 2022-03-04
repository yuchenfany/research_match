/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Create({ user, setUser }) {
  const [error, setError] = useState({ message: '' });
  const navigate = useNavigate();

  // combined alphanumeric and empty check
  const isValid = () => {
    if (user.name.length === 0) {
      setError({ message: 'Please enter a username' });
    } else if (!user.name.match(/^[0-9a-zA-Z]+$/)) {
      setError({ message: 'Username must be an alphanumeric string' });
    }
    return !(user.name.length === 0 || !user.name.match(/^[0-9a-zA-Z]+$/));
  };

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
  }

  async function handleSubmit(event) {
    if (await verify()) {
      console.log('verified');
      navigate('/home');
    } else {
      event.preventDefault();
    }
  }

  // update username as it's being entered
  const handleNameChange = async (event) => {
    setUser(
      {
        username: event.target.value,
        password: user.password,
      },
    );
  };

  const handleNameChangePassword = async (event) => {
    setUser(
      {
        username: user.username,
        password: event.target.value,
      },
    );
  };

  const backToLogin = () => {
    navigate('/');
  };

  const handleAsync = (event) => {
    event.preventDefault();
    handleNameChange(event).then(handleSubmit(event));
  };

  return (
    <div className="Create">
      <p className="header">Sign Up</p>
      <form onSubmit={handleAsync}>
        <label className="login-label" htmlFor="username">
          <div className="username-wrapper">
            <p className="field-label">CREATE USERNAME</p>
            <input
              className="input-field"
              type="text"
              id="username"
              onChange={handleNameChange}
            />
            <p className="field-label">CREATE PASSWORD</p>
            <input
              className="input-field"
              type="text"
              id="password"
              onChange={handleNameChangePassword}
            />
            <span className="error-message">{error.message}</span>
          </div>
          <input className="button" type="submit" value="CREATE ACCOUNT" />
        </label>
        <div className="spacer" />
        <button className="link" type="button" onClick={backToLogin}>Back to login</button>
      </form>
    </div>
  );
}

export default Create;
