/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
import { deleteUser } from '../modules/user-api';

function DeleteAccount({ user, setUser }) {
  const [error, setError] = useState({ message: '' });
  const navigate = useNavigate();

  async function handleSubmit(event) {
    const res = await deleteUser(user);
    if (res === true) {
      setUser({});
      navigate('/');
    } else {
      event.preventDefault();
      setError(res);
    }
  }

  return (
    <div className="Create">
      <p className="header">Are you sure you want to delete your account?</p>

      <button
        type="button"
        className="goback-btn"
        onClick={async () => {
          navigate(`/${(user.type ?? 0) === 0 ? 'participant' : 'researcher'}-home`);
        }}
      >
        Go back
      </button>
      <button
        type="button"
        className="delete-btn"
        onClick={handleSubmit}
      >
        Delete account
      </button>
      <p>{error}</p>
    </div>
  );
}

export default DeleteAccount;
