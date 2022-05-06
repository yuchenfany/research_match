/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import NavBar from './NavBar';
import { getResearcherStudies } from '../modules/user-api';
import { getStudyById} from '../modules/study-api';
import { getNumMessages } from '../modules/chat-api';

function ResearcherHome({ user, setUser, setStudy, notification, setNotification }) {
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const [notificationRH, setNotificationRH] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // get all studies
  async function getAllStudyJson() {
    const studyIds = await getResearcherStudies(user, setUser);
    // console.log(user.username);
    // console.log(user.studies);
    // console.log(studyIds);
    return Promise.all(studyIds.map((studyId) => getStudyById(studyId)));
  }

  useEffect(() => {
    if (notificationRH) {
      setShowPopup(!showPopup);
    }
  }, []);
  const bg = {
    overlay: {
      background: "#339933"
    }
  };
  const renderNotification = () => (
    <Popup
      styles = {bg}
      open={notificationRH}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}> &times; </button>
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
          setNotificationRH(num !== user.messages);
        }
        else {
          setNotificationRH(false);
        }
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
    navigate(`/researcher-study/${studyId}`);
  }

  return (
    <div className="ResearcherProfile">
      <NavBar user={user} />
      <div>{notificationRH ? renderNotification() : ''}</div>
      <div className="header-left">Researcher Home</div>
      <div className="study-flex">
        <div className="header-left">My Studies</div>
        <div>
          {
          enrolledStudies.length === 0 ? []
            : enrolledStudies.map(
              (studyJson) => (
                <div key={studyJson.studyId} className="study">
                  <div className="study-title">{studyJson.title}</div>
                  <button className="view-button" type="button" key={studyJson.studyId} onClick={() => goToStudy(studyJson.studyId)}>VIEW</button>
                </div>
              ),
            )
          }
        </div>
      </div>
      <div className="study-flex">
        <div className="header-left">Add a Study</div>
        <div>
          <button className="button" type="button" onClick={() => navigate('/add-study')}>Add Study</button>
        </div>
      </div>
    </div>
  );
}

export default ResearcherHome;
