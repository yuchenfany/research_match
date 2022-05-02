/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';


function ResearcherHome({ user, setUser, setStudy }) {
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  const navigate = useNavigate();
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
      name: user.name,
      organization: user.organization,
      studies: json.studies,
      type: user.type,
    });
    // setUser({ username: user.username, password: user.password, enrolled: json.enrolled });
    return json?.studies ?? [];
  }

  // gets individual study by id
  async function getStudy(studyId) {
    const data = await fetch(`http://localhost:5000/study/${studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    return data.json();
  }

  // get all studies
  async function getAllStudyJson() {
    const studyIds = await getStudyIds();
    console.log(user.username);
    console.log(user.studies);
    console.log(studyIds);
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
  
  const renderNotification = () => <div>NOTIFICATION TESTING For Researcher :)</div>;
  
  async function checkNotifications() {
    getNumMessages().then(
      (num) => {
        // console.log(num);
        // console.log(user.messages);
        setNotification(num !== user.messages);
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
      <div>{notification ? renderNotification() : ''}</div>
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
      <div className="study-transfer">
        <div className="header-left">For Testing Purposes: Directs to Add Study Page</div>
        <div className="study">
          <div className="study-transfer">Go to Study Page</div>
          <button className="view-button" type="button" onClick={() => navigate('/add-study')}>Add Study</button>
        </div>
      </div>
    </div>
  );
}

export default ResearcherHome;
