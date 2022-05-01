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
    if (user.type === 0) {
      setSender({ username: user.username, type: 0 });
      setReceiver({ username: 'receiverUsername', type: 1 });
    }
    else {
      setSender({ username: receiver.username, type: 0 });
      setReceiver({ username: user.username, type: 1 });
    }
  }, []);

  // TODO: unhardcode this later
  function goToChatHardcode() {
    console.log(sender);
    console.log(receiver);
    navigate('/chat');
  }

  return (
    <div className="Messages">
      <div className="header">MESSAGE</div>
      <div>{user.username}</div>
      <div>{sender.username}</div>
      <div>{receiver.username}</div>
      <button className="link" type="button" onClick={goToChatHardcode}>HARDCODED CHAT with current user and recieverUsername</button>
    </div>
  );
}

export default Messages;
