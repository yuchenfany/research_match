/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/index.css';

function Chat({ sender, receiver }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ message: '' });
  // use below for displaying chat history
  const [chats, setChats] = useState([]);

  // update message as it's being entered
  const handleMessageChange = async (event) => {
    setMessage({ message: event.target.value });
    console.log(message);
  };

  async function getMessages() {
    const user = sender.type === 0 ? sender.username : receiver.username;
    const researcher = sender.type === 1 ? sender.username : receiver.username;
    console.log(user);
    console.log(researcher);
    const data = await fetch(`http://localhost:5000/chats/get/${user}/${researcher}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    console.log('AFTER GET');
    console.log(json);
    console.log(json.user);
    console.log(json?.messages ?? ' oof ');
    return json?.messages ?? []; // returns messages array
  }

  useEffect(() => {
    getMessages()
      .then(setChats);
  }, []);

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
    setMessage('');
    navigate('/chat');
  }

  const chatsDisplay = (
    <div>
      <p>CHAT HISTORY BEGINS HERE</p>
      <div>
        {
        chats.length === 0 ? []
          : chats.map(
            (entry) => (
              <div key={entry.timestamp} className="study">{entry.text.message}</div>
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
        defaultValue=""
        onChange={handleMessageChange}
      />
      <button className="view-button" type="submit" onClick={handleSubmit}>SEND</button>
    </div>
  );
}

export default Chat;
