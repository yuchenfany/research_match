/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Login({ user, setUser }) {
  const [error, setError] = useState({ message: '' });
  const navigate = useNavigate();
  const [samePassword, setSamePassword] = useState(0);

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
    console.log(user.username);
    console.log(user.password);
    fetch(`http://localhost:5000/record/${user.username}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .then(json => {
      console.log(json.password);
      if (json.password == user.password) {
        console.log("Same Password, logged in");
        setSamePassword(1);
        return 1;
      }
      else {
        console.log("Incorrect Password");
        setSamePassword(0);
        return 0;
      }

    })
    // const records = await response.json();
    // console.log(response);
    // console.log(await response.json());
    // return 0;
  }

  async function handleSubmit(event) {
    console.log(samePassword);
    // const variable = await verify();
    // console.log(await verify().then());
    if (await verify().then()) {
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
        </label>
      </form>
    </div>
  );
}

export default Login;
