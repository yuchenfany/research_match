/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
import bcrypt from 'bcryptjs';

function Login({ user, setUser }) {
  const [error, setError] = useState({ message: '' });
  const navigate = useNavigate();
  // const [samePassword, setSamePassword] = useState(0);

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

    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await data.json();

    // verification checks of username & password
    if (json === null) {
      setError({ message: 'User does not exist' });
      event.preventDefault();
    // } else if (user.password === json.password) {
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
        });
        navigate('/researcher-home');
      }
    } else {
      setError({ message: 'Incorrect password' });
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
