/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

// TODO: add { useState }
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';

// TODO: add setSender and setReceiver props
function Messages({
  user, sender, receiver, setSender, setReceiver,
}) {
  const navigate = useNavigate();

  // REMEMBER TO SET SENDER AND RECEIVER HERE -> (remember to set sender type)
  // HARDCODING SENDER / RECEIVER -> replace this later
  useEffect(() => {
    setSender({ username: 'senderUsername', type: 0 });
    setReceiver({ username: 'receiverUsername', type: 1 });
  }, []);

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
