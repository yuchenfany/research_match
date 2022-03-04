/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Login({ user, setUser }) {
  const [error, setError] = useState({ message: '' });
  const navigate = useNavigate();
  const [samePassword, setSamePassword] = useState(0);

  async function handleSubmit(event) {
    console.log(samePassword);
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await data.json();

    // const variable = await verify();
    // console.log(variable);
    if (json.password === user.password) {
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

  const handleAsync = (event) => {
    event.preventDefault();
    handleNameChange(event).then(handleSubmit(event));
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
            <p>USERNAME</p>
            <input
              className="input-field"
              type="text"
              id="username"
              onChange={handleNameChange}
            />
            <p>Password</p>
            <input
              className="input-field"
              type="text"
              id="password"
              onChange={handleNameChangePassword}
            />
            <span className="error-message">{error.message}</span>
          </div>
          <input className="button" type="submit" />
          <button className="button" type="button" onClick={goToCreate}>New user sign-up</button>
        </label>
      </form>
    </div>
  );
}

export default Login;
