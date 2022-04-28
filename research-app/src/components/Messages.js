/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

// TODO: add { useState }
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

// TODO: add setSender and setReceiver props
function Messages({ user, sender, receiver }) {
  const navigate = useNavigate();

  // REMEMBER TO SET SENDER AND RECEIVER HERE -> (remember to set sender type)

  // TODO: unhardcode this later
  function goToChatHardcode() {
    navigate('/chat');
  }

  return (
    <div className="Messages">
      <div className="header">MESSAGE</div>
      <div>{user.username}</div>
      <div>{sender.username}</div>
      <div>{receiver.username}</div>
      <button className="link" type="button" onClick={goToChatHardcode}>HARDCODED CHAT</button>
    </div>
  );
}

export default Messages;
