/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
import bcrypt from 'bcryptjs';

import { getUserInfo } from '../modules/user-api';

function Login({ user, setUser }) {
  const [error, setError] = useState({ message: '' });
  const [lockoutUser, setLockoutUser] = useState('');
  const navigate = useNavigate();
  // const [samePassword, setSamePassword] = useState(0);
  async function refresh() {
    setLockoutUser('');
    console.log('refreshing our locked out user');
  }
  async function lockout(username) {
    console.log('Reaching lockout');
    setInterval(() => {
      refresh();
    }, 100000);
    setLockoutUser(username);
  }
  async function handleSubmit(event) {
    if (user.username.length === 0 && user.password.length === 0) {
      setError({ message: 'Please enter your login credentials' });
      event.preventDefault();
      return;
    }
    if (user.username.length === 0) {
      setError({ message: 'Please enter your username' });
      event.preventDefault();
      return;
    }
    if (user.password.length === 0) {
      setError({ message: 'Please enter your password' });
      event.preventDefault();
      return;
    }

    const json = await getUserInfo(user);

    // verification checks of username & password
    if (json === null) {
      setError({ message: 'User does not exist' });
      event.preventDefault();
    // } else if (user.password === json.password) {
    } else if (user.username === lockoutUser) {
      setError({ message: 'You are currently locked out' });
      event.preventDefault();
    } else if (bcrypt.compareSync(user.password, json.password)) {
      if (json.type === 0) {
        // makes sure all fields are available in home
        setUser({
          username: json.username,
          password: json.password,
          enrolled: json.enrolled,
          age: json.age,
          heightFeet: json.heightFeet,
          heightInches: json.heightInches,
          weight: json.weight,
          sex: json.sex,
          gender: json.gender,
          allergies: json.allergies,
          phys: json.phys,
          psych: json.psych,
          med: json.med,
          type: json.type,
          messages: json.messages,
        });

        navigate('/participant-home');
      } else if (json.type === 1) {
        // makes sure all fields are available in home
        setUser({
          username: json.username,
          password: json.password,
          name: json.name,
          organization: json.organization,
          type: json.type,
          messages: json.messages,
        });
        navigate('/researcher-home');
      }
    } else {
      setError({ message: 'Incorrect password' });
      console.log('reached incorrect password stage');
      await lockout(user.username);
      event.preventDefault();
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

  const handleAsync = (event) => {
    event.preventDefault();
    // handleNameChangePassword(event).then(handleNameChange(event)).then(handleSubmit(event));
    handleSubmit(event);
  };

  const goToCreate = () => {
    navigate('/create');
  };

  return (
    <div className="Login">
      <p className="header">Research Match</p>
      <form onSubmit={handleAsync}>
        <label className="login-label" htmlFor="username">
          <div className="username-wrapper">
            <p className="field-label">USERNAME</p>
            <input
              className="input-field"
              type="text"
              id="username"
              onChange={handleNameChange}
            />
            <p className="field-label">PASSWORD</p>
            <input
              className="input-field"
              type="text"
              id="password"
              onChange={handleNameChangePassword}
            />
            <span className="error-message">{error.message}</span>
          </div>
          <input className="button" type="submit" value="SUBMIT" />
          <div className="spacer" />
          <button className="link" type="button" onClick={goToCreate}>New user sign-up</button>
        </label>
      </form>
    </div>
  );
}

export default Login;
