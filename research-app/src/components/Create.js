/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Create({ user, setUser }) {
  const [error, setError] = useState({ message: '' });
  const navigate = useNavigate();

  const isValidUsername = () => {
    if (user.username.length === 0) {
      setError({ message: 'Please create a username' });
    } else if (!user.username.match(/^[0-9a-zA-Z]+$/)) {
      setError({ message: 'Your username must be an alphanumeric string' });
    }
    return !(user.username.length === 0 || !user.username.match(/^[0-9a-zA-Z]+$/));
  };

  const isValidPassword = () => {
    if (user.password.length < 6 || !user.password.match(/^[0-9a-zA-Z]+$/)) {
      setError({ message: 'Your password must be at least 6 alphanumeric characters' });
    }
    return !(user.password.length < 6 || !user.password.match(/^[0-9a-zA-Z]+$/));
  };

  async function userExists() {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => {});
    
    return await data.json() != null;
  }

  async function handleSubmit(event) {
    if (user.username.length === 0 && user.password.length === 0) {
      setError({ message: 'Please create a username and password' });
      event.preventDefault();
      return;
    }
    if (user.password.length === 0) {
      setError({ message: 'Please create your password' });
      event.preventDefault();
      return;
    }
    if (!isValidUsername()) {
      event.preventDefault();
      return;
    }
    if (!isValidPassword()) {
      event.preventDefault();
      return;
    }

    // all information is valid, continue
    if (await userExists()) {
      setError({ message: 'Username is already taken' });
    } else {
      navigate('/type');
    }
  }

  // update username as it's being entered
  const handleNameChange = async (event) => {
    setUser(
      {
        username: event.target.value,
        password: user.password,
        enrolled: user.enrolled,
      },
    );
  };

  const handleNameChangePassword = async (event) => {
    setUser(
      {
        username: user.username,
        password: event.target.value,
        enrolled: user.enrolled,
      },
    );
  };

  const backToLogin = () => {
    setUser({ username: '', password: '', enrolled: [] });
    navigate('/');
  };

  const handleAsync = (event) => {
    event.preventDefault();
    handleSubmit(event);
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
