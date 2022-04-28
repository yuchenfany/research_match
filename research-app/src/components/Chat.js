/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/index.css';

function Chat({ sender, receiver }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ message: '' });
  // update message as it's being entered
  const handleMessageChange = async (event) => {
    setMessage({ message: event.target.value });
    console.log(message);
  };

  // async function viewMessages(senderName, receiverName) {
  //   const data = await fetch(`http://localhost:5000/chats/${senderName}/${receiverName}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const json = await data.json();
  //   return json?.messages ?? []; // returns messages array
  // }

  // async function getMessages() {
  // }

  async function handleSubmit(event) {
    if (message.length === 0) {
      event.preventDefault();
      return;
    }
    const messageObject = {
      sender: sender.username,
      senderType: sender.type,
      receiver: receiver.username,
      text: message,
      // attachment:
    };

    await fetch('http://localhost:5000/chats/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageObject),
    });

    console.log(messageObject);
    navigate('/chat');
  }

  return (
    <div>
      <p>INDIVIDUAL CHAT</p>
      <input
        className="input-field"
        type="text"
        id="chat-message"
        onChange={handleMessageChange}
      />
      <button className="view-button" type="submit" onClick={handleSubmit}>SEND</button>
    </div>
  );
}

export default Chat;
