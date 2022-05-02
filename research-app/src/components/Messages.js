/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../assets/index.css';

function Messages({ user }) {
  const navigate = useNavigate();
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
      <NavBar user={user} />
      <div className="study-flex">
        <div className="header-left">My Messages</div>
        <div>
          {chatsList.length === 0 ? []
            : chatsList.map(
              (chat) => {
                const receiverName = user.type === 0 ? chat.researcher : chat.user;
                return (
                  <div key={receiverName} className="study">
                    <div className="study-title">{receiverName}</div>
                    <button
                      className="view-button"
                      type="button"
                      onClick={() => navigate(
                        '/chat',
                        { state: { sender: user, receiverName } },
                      )}
                    >
                      VIEW
                    </button>
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
