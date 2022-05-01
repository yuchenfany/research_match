/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/index.css';

function Chat({ sender, receiver }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  // use below for displaying chat history
  const [chats, setChats] = useState([]);
  let nIntervId; // TODO

  // update message as it's being entered
  const handleMessageChange = async (event) => {
    setMessage(event.target.value);
  };

  async function getMessages() {
    const user = sender.type === 0 ? sender.username : receiver.username;
    const researcher = sender.type === 1 ? sender.username : receiver.username;
    const data = await fetch(`http://localhost:5000/chats/get/${user}/${researcher}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    return json?.messages ?? []; // returns messages array
  }

  async function messageRetrieval() {
    getMessages()
      .then(setChats);
  }

  async function reloadMessages() {
    if (!nIntervId) {
      nIntervId = setInterval(messageRetrieval, 1000);
    }
  }

  useEffect(() => {
    reloadMessages();
  }, []);

  // useEffect(() => {
  //   reloadMessages()
  //     .then(setChats);
  // }, []);

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
    console.log(messageObject);

    await fetch('http://localhost:5000/chats/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageObject),
    });
    setMessage('');
    navigate('/participant-home');
  }

  const chatsDisplay = (
    <div>
      <p>CHAT HISTORY BEGINS HERE</p>
      <div>
        {
        chats.length === 0 ? []
          : chats.map(
            (entry) => (
              <div key={entry.timestamp} className="study">{entry.text}</div>
            ),
          )
        }
      </div>
    </div>
  );

  return (
    <div>
      <p>INDIVIDUAL CHAT</p>
      { chatsDisplay }
      <input
        className="input-field"
        type="text"
        id="chat-message"
        // value={message !== '' ? message : ''}
        value={message}
        onChange={handleMessageChange}
      />
      <button className="view-button" type="submit" onClick={handleSubmit}>SEND</button>
    </div>
  );
}

export default Chat;
