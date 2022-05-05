/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { Button } from 'react-native'
import NavBar from './NavBar';

function Messages({ route, navigation }) {
  const { user, setUser } = route.params;
  const [chatsList, setChatsList] = useState([]);

  async function getChats() {
    const allChats = await fetch(
      `http://localhost:5000/chats?senderName=${user.username}&senderType=${user.type}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await allChats.json();
    return data;
  }

  useEffect(() => {
    getChats()
      .then(setChatsList);
  }, []);

  return (
    <div className="Messages">
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <div className="study-flex">
        <div className="header-left">My Messages</div>
        <div>
          {chatsList.length === 0 ? []
            : chatsList.map(
              (chat) => {
                const receiverName = user.type === 0 ? chat.researcher : chat.user;
                console.log(user);
                console.log(receiverName);
                return (
                  <div key={receiverName} className="study">
                    <div className="study-title">{receiverName}</div>
                    <Button
                      className="view-button"
                      type="button"
                      title="VIEW"
                      onPress={() => navigation.navigate('Chat', {
                        sender: user,
                        receiverName,
                      })}
                    />
                  </div>
                );
              },
            )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
