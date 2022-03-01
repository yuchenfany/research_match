/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Login({ user, setUser }) {
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

  const handleSubmit = (event) => {
    if (!isValid()) {
      event.preventDefault();
    } else {
      navigate('/home');
    }

    // if new user, store in local storage
    if (localStorage.getItem(user.name) == null) {
      localStorage.setItem(user.name, user.highScore);
      setUser({ name: user.name, highScore: 0, returning: false });
    } else {
      setUser(
        {
          name: user.name,
          highScore: localStorage.getItem(user.name),
          returning: true,
        },
      );
    }
  };

  // update username as it's being entered
  const handleNameChange = async (event) => {
    setUser(
      {
        name: event.target.value,
        highScore: 0,
        returning: true,
      },
    );
  };

  const handleAsync = (event) => {
    event.preventDefault();
    handleNameChange().then(handleSubmit());
  };

  return (
    <div className="Login">
      <p className="header">Research Match</p>
      <form onSubmit={handleAsync}>
        <label className="login-label" htmlFor="username">
          <div className="username-wrapper">
            <p>USERNAME</p>
            <input
              className="input-field"
              type="text"
              id="username"
              onChange={handleNameChange}
            />
            <span className="error-message">{error.message}</span>
          </div>
          <input className="button" type="submit" />
        </label>
      </form>
    </div>
  );
}

export default Login;
