/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import NavBar from './NavBar';

function DisplayStudies({
  user, setUser, setStudy,
}) { // add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const [notificationDS, setNotificationDS] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // gets list of studies that match user's tags
  // NOTE: remove hardcoding once users have tags

  async function getStudyIds() {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();

    setUser({
      username: user.username,
      password: user.password,
      enrolled: user.enrolled,
      age: user.age,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      weight: user.weight,
      sex: user.sex,
      gender: user.gender,
      allergies: user.allergies,
      type: user.type,
      phys: json.phys,
      psych: json.psych,
      med: json.med,
      messages: json.messages,
    });
    // return json.tags; (once tags are implemented in phys)
    // Hardcoded:
    const userTags = user.phys.concat(user.psych.concat(user.med));
    return userTags;
  }

  // gets individual study by id
  async function getStudy(studyId) {
    const data = await fetch(`http://localhost:5000/study/tag/${studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.json();
  }

  // get all studies
  async function getAllStudyJson() {
    const studyIds = await getStudyIds();
    // return Promise(getStudy(studyIds[0]));
    return Promise.all(studyIds.map((studyId) => getStudy(studyId)));
  }

  // gets number of messages that user has received
  async function getNumMessages() {
    const data = await fetch(`http://localhost:5000/chats/getNumMessages/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUser(user);
    const json = await data.json();
    const messageCounts = json ?? [0];
    return messageCounts[0]?.messages;
  }

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

  /*
  const renderNotification2 = () => (<div className="header-left">Real Notificaiton shown</div>
  ); */

  async function checkNotifications() {
    getNumMessages().then(
      (num) => {
        console.log(num);
        console.log(user.messages);
        setNotificationDS(num !== user.messages);
        console.log(notificationDS);
      },
    );
  }

  function refresh() {
    setInterval(checkNotifications, 1000);
  }

  useEffect(() => {
    refresh();
    getAllStudyJson()
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
      <div className="study-flex">
        <div className="header-left">For Testing Purposes: Delete Later</div>
        <div className="study">
          <div className="study-title">Sleep Research</div>
          <button className="view-button" type="button" key={2} onClick={() => goToStudy(2)}>VIEW</button>
        </div>
      </div>
    </div>
  );
}

export default DisplayStudies;
