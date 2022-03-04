/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

function Profile() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="Profile">
      <div className="header"> Edit Profile </div>
      <input className="button" type="submit" value="SIGN UP" onClick={goToHome} />
    </div>
  );
}

export default Profile;
