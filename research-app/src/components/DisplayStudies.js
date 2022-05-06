/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import NavBar from './NavBar';
import { getAllStudyJsonByTag } from '../modules/study-api';
import { getNumMessages } from '../modules/chat-api';

function DisplayStudies({
  user, setUser, setStudy,
}) { // add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const [notificationDS, setNotificationDS] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setShowPopup(!showPopup);
  }, []);

  const renderNotification = () => (
    <Popup
      open={notificationDS}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button type="button" className="close" onClick={close}> &times; </button>
          <div className="header"> Notification </div>
          <div className="content">
            {' '}
            New message received
          </div>
        </div>
      )}
    </Popup>
  );

  async function checkNotifications() {
    getNumMessages(user).then(
      (num) => {
        if (user.messages !== undefined) {
          setNotificationDS(num !== user.messages);
        } else {
          setNotificationDS(false);
        }
      },
    );
  }

  function refresh() {
    setInterval(checkNotifications, 1000);
  }

  useEffect(() => {
    refresh();
    getAllStudyJsonByTag(user, setUser)
      .then(setEnrolledStudies);
  }, []);

  function goToStudy(studyId) {
    setStudy({ studyId });
    navigate(`/study/${studyId}`);
  }

  return (
    <div className="Home">
      <NavBar user={user} />
      <div>{notificationDS ? renderNotification() : ''}</div>
      {/* <div>{notificationDS ? renderNotification2() : ''}</div> */}
      <div className="study-flex">
        <div className="header-left">Eligible Studies</div>
        <div>
          {
          enrolledStudies.length === 0 ? []
            : enrolledStudies.map(
              (studyJson) => (
                studyJson.map(
                  (singleStudy) => (
                    <div key={singleStudy.studyId} className="study">
                      <div className="study-title">{singleStudy.title}</div>
                      <div className="study-tag">{singleStudy.tags}</div>
                      <button className="view-button" type="button" key={singleStudy.studyId} onClick={() => goToStudy(singleStudy.studyId)}>VIEW</button>
                    </div>
                  ),
                )
              ),
            )
          }
        </div>
      </div>
    </div>
  );
}

export default DisplayStudies;
