/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

import '../assets/index.css';

function Chat({ sender, setSender, setNotification }) {
  const { state } = useLocation();
  const {
    receiverName,
    // setNotification
  } = state;

  const [message, setMessage] = useState('');
  // use below for displaying chat history
  const [chats, setChats] = useState([]);
  let nIntervId; // TODO

  // update message as it's being entered
  const handleMessageChange = async (event) => {
    setMessage(event.target.value);
  };

  async function getMessages() {
    const user = sender.type === 0 ? sender.username : receiverName;
    const researcher = sender.type === 1 ? sender.username : receiverName;
    const data = await fetch(`http://localhost:5000/chats/get/${user}/${researcher}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    return json?.messages ?? []; // returns messages array
  }

  // gets number of messages that user has received
  async function getNumMessages() {
    const data = await fetch(`http://localhost:5000/chats/getNumMessages/${sender.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    const messageCounts = json ?? [0];
    return messageCounts[0]?.messages;
  }

  async function updateNumberOfMessages() {
    const newNumMessages = await getNumMessages();
    if (sender.messages === newNumMessages) {
      setNotification(false);
      return;
    }
    const updatedUser = JSON.parse(JSON.stringify(sender));
    updatedUser.messages = newNumMessages;
    console.log(sender);
    setSender(updatedUser);
    setNotification(false);
    await fetch('http://localhost:5000/record/updateMessages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
  }

  async function messageRetrieval() {
    getMessages()
      .then(setChats);
    updateNumberOfMessages();
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

  // Handle notification things

  async function handleSubmit(event) {
    event.preventDefault();
    if (message.length === 0) {
      return;
    }
    const messageObject = {
      sender: sender.username,
      senderType: sender.type,
      receiver: receiverName,
      text: message,
      // attachment:
    };
    setMessage('');
    await fetch('http://localhost:5000/chats/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageObject),
    });
  }

  const chatsDisplay = (
    <div>
      <div className="chat-history">
        {
        chats.length === 0 ? []
          : chats.map(
            (entry) => (
              <div>
                <p className="chat-timestamp">
                  {
                    `${(new Date(entry.timestamp)).getMonth()}/${(new Date(entry.timestamp)).getDate()}/22 ${(new Date(entry.timestamp)).toLocaleTimeString('en-US')}`
                  }
                </p>
                <div
                  key={entry.timestamp}
                  className={
                    entry.text?.includes('ello') ?? false ? 'receiver-chat' : 'sender-chat'
                  }
                >
                  {entry.text}
                </div>
              </div>
            ),
          )
        }
      </div>
    </div>
  );

  return (
    <div>
      <NavBar user={sender} />
      <p className="subheader">{receiverName}</p>
      { chatsDisplay }
      <div className="chat-input-container">
        <input
          className="chat-input-field"
          type="text"
          id="chat-message"
          value={message}
          onChange={handleMessageChange}
        />
        <button className="view-button" type="submit" onClick={handleSubmit}>SEND</button>
      </div>
    </div>
  );
}

export default Chat;
