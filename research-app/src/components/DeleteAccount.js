/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function DeleteAccount({ user, setUser }) {
  const [error, setError] = useState({ message: '' });
  const navigate = useNavigate();

  async function verify() {
    console.log(JSON.stringify(user));
    // console.log(JSON.stringify(getNextStudyID()));
    // setStudy({
    //   studyId: getNextStudyID(),
    // });
    const data = await fetch(`http://localhost:5000/record/delete/${user.username}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('delete is being called');
    return true;
  }

  async function handleSubmit(event) {
    if (await verify()) {
      navigate('/');
    } else {
      event.preventDefault();
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
      <div> </div>
      <button
        type="button"
        className="delete-btn"
        onClick={handleSubmit}
      >
        Delete account
      </button>
    </div>
  );
}

export default DeleteAccount;
