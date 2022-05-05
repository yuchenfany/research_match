/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TextInput, Button,
} from 'react-native';

function Chat({ route }) {
  const {
    sender, receiverName,
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
      nIntervId = setInterval(messageRetrieval, 1000);
    }
  }

  useEffect(() => {
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
    container: {
      backgroundColor: '#F3F8FA',
      flex: 1,
    },
    headerContainer: {
      position: 'sticky',
      top: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#808A8F',
      height: 100,
      backgroundColor: '#F3F8FA',
      zIndex: 1,
    },
    innerContainer: {
      padding: 20,
    },
    chatContainer: {
      position: 'sticky',
      zIndex: 1,
      backgroundColor: '#F3F8FA',
      height: 100,
      bottom: 0,
      paddingTop: 20,
      paddingLeft: 20,
      borderTopWidth: 1,
      borderTopColor: '#808A8F',
      display: 'flex',
      flexDirection: 'row',
    },
    header: {
      fontSize: 20,
      lineHeight: 40,
      fontWeight: 500,
      marginTop: 30,
      marginLeft: 20,
      color: '#103143',
    },
    subheader: {
      fontSize: 16,
      lineHeight: 40,
      fontWeight: 500,
      marginBottom: 20,
      color: '#103143',
    },
    studyCard: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderRadius: 5,
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 18,
      paddingRight: 10,
      paddingLeft: 10,
      marginBottom: 10,
      width: 500,
    },
    button: {
      width: 275,
      height: 35,
      fontSize: 12,
      letterSpacing: 1,
      marginTop: 10,
    },
    viewButton: {
      right: 0,
      width: 100,
      height: -10,
      fontSize: 10,
      letterSpacing: 1,
      marginLeft: 'auto',
    },
    senderChat: {
      color: 'blue',
    },
    receiverChat: {
      color: 'red',
    },
    inputField: {
      width: 500,
      height: 27,
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderWidth: 1,
      marginBottom: 10,
      marginRight: 10,
      borderRadius: 3,
      color: '#103143',
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
                <Text color="#103143">
                  {
                    `${(new Date(entry.timestamp)).getMonth()}/${(new Date(entry.timestamp)).getDate()}/22 ${(new Date(entry.timestamp)).toLocaleTimeString('en-US')}`
                  }
                </Text>
                <Text>{': '}</Text>
                <Text
                  color="#103143"
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
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{receiverName}</Text>
      </View>
      <View style={styles.innerContainer}>
        { chatsDisplay }
      </View>
      <View style={styles.chatContainer}>
        <TextInput
          style={styles.inputField}
          type="text"
          id="chat-message"
          value={message}
          onChange={handleMessageChange}
        />
        <input
          type="file"
          id="chat-attachment"
          accept="image/png, image/jpeg, audio/*, video/*"
          onChange={handleFile}
        />
        <Button style={styles.viewButton} type="submit" title="SEND" color="#103143" onPress={(e) => handleSubmit(e)} />
      </View>
    </ScrollView>
  );
}

export default Chat;
