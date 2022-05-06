/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import config from '../config.json';

import '../assets/index.css';
import { getMessages, updateNumberOfMessages } from '../modules/chat-api';

function Chat({
  sender, setSender, setNotification, user, setUser,
}) {
  const { state } = useLocation();
  const {
    receiverName,
    // setNotification
  } = state;

  const [message, setMessage] = useState('');
  const [file, setFile] = useState();
  // use below for displaying chat history
  const [chats, setChats] = useState([]);
  let nIntervId; // TODO

  // update message as it's being entered
  const handleMessageChange = async (event) => {
    setMessage(event.target.value);
  };

  async function messageRetrieval() {
    getMessages(sender, receiverName)
      .then(setChats);
    updateNumberOfMessages(sender, setSender, setNotification, user, setUser);
  }

  async function reloadMessages() {
    if (!nIntervId) {
      nIntervId = setInterval(messageRetrieval, 1000);
    }
  }

  useEffect(() => {
    reloadMessages();
  }, []);

  async function handleFile(event) {
    if (!event.target.files) {
      return;
    }
    const attachment = event.target.files[0];

    console.log(attachment);

    const reader = new FileReader();
    reader.onload = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(attachment);
  }

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
      attachment: file,
    };
    setMessage('');
    await fetch(`http://${config.server_host}/chats/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageObject),
    });
  }

  const getMedia = (entry) => {
    if (!entry.attachment) {
      return null;
    }
    const type = entry.attachment.split(':')[1].split('/')[0];
    if (type === 'image') {
      return (<img src={entry.attachment} alt="attachment" />);
    }
    if (type === 'audio') {
      return (
        <audio className="chat-media" controls>
          <source src={entry.attachment} />
          <track src="" kind="captions" srcLang="en" label="English" />
        </audio>
      );
    }
    if (type === 'video') {
      return (
        <video className="chat-media" controls autoPlay>
          <source src={entry.attachment} type={entry.attachment.split(':')[1].split(';')[0]} />
          <track src="" kind="captions" srcLang="en" label="English" />
        </video>
      );
    }
    return null;
  };

  const chatsDisplay = (
    <div>
      <div className="chat-history">
        {
        chats.length === 0 ? []
          : chats.map(
            (entry) => (
              <div key={entry.timestamp}>
                <p className="chat-timestamp">
                  {
                    `${(new Date(entry.timestamp)).getMonth()}/${(new Date(entry.timestamp)).getDate()}/22 ${(new Date(entry.timestamp)).toLocaleTimeString('en-US')}`
                  }
                </p>
                <div
                  className={entry.sender === sender.username ? 'sender-chat' : 'receiver-chat'}
                >
                  {entry.text}
                  {getMedia(entry)}
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
        <input
          type="file"
          id="chat-attachment"
          accept="image/png, image/jpeg, audio/*, video/*"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}

export default Chat;
