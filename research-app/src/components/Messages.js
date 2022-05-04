/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../assets/index.css';

import { getChats } from '../modules/chat-api';

function Messages({ user }) {
  const navigate = useNavigate();
  const [chatsList, setChatsList] = useState([]);

  useEffect(() => {
    getChats(user)
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
                        { state: { receiverName } },
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
