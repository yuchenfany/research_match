/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import NavBar from './NavBar';

function Chat({ route, navigation }) {
  let {
    sender, receiverName
  } = route.params;
  const [message, setMessage] = useState('');
  const [file, setFile] = useState();
  // use below for displaying chat history
  const [chats, setChats] = useState([]);
  let nIntervId; // todo

  // update message as it's being entered
  const handleMessageChange = async (event) => {
    setMessage(event.target.value);
  };

  async function getMessages() {
    const userField = sender.type === 0 ? sender.username : receiverName;
    const researcher = sender.type === 1 ? sender.username : receiverName;
    const data = await fetch(`http://localhost:5000/chats/get/${userField}/${researcher}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    return json?.messages ?? []; // returns messages array
  }

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

  async function messageRetrieval() {
    getMessages()
      .then(setChats);
  }

  async function reloadMessages() {
    if (!nIntervId) {
      console.log('reloadMessages is called!');
      nIntervId = setInterval(messageRetrieval, 1000);
    }
  }

  useEffect(() => {
    console.log('===== USE EFFECT IS CALLED =====');
    reloadMessages();
  }, []);

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
    await fetch('http://localhost:5000/chats/send', {
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

  const styles = StyleSheet.create({
    senderChat: {
      color: 'blue',
    },
    receiverChat: {
      color: 'red',
    },
  });

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
                <Text
                  key={entry.timestamp}
                  style={entry.sender === sender.username ? styles.senderChat : styles.receiverChat}
                >
                  {entry.text}
                  {getMedia(entry)}
                </Text>
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
      <header>
        <h1>{receiverName}</h1> 
      </header>
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
