/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

// TO DO: add back in studyId prop
function Study({
  study, setStudy, user, setUser, status, setStatus,
}) {
  // Hardcoded:
  // const studyId = 0;
  // const [study, setStudy] = useState({});
  const navigate = useNavigate();

  async function getStudy() {
    const studyData = await fetch(`http://localhost:5000/study/${study.studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    return data;
  }

  useEffect(() => {
    getStudy()
      .then(setStudy);
  }, []);

  async function enrollUpdateStudy() {
    const currStudy = await getStudy();
    const currParticipants = currStudy.participants;
    currParticipants.push(user.username);
    const updatedStudy = {
      title: currStudy.title,
      description: currStudy.description,
      compensation: currStudy.compensation,
      duration: currStudy.duration,
      tags: currStudy.tags,
      participants: currParticipants,
      studyId: currStudy.studyId,
      researchers: currStudy.researchers,
    };
    await fetch(`http://localhost:5000/study/${parseInt(study.studyId, 10)}/enroll`, {
      method: 'POST',
      body: JSON.stringify(updatedStudy),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function enrollUpdateUser() {
    function updateArray(array, newElement) {
      return array.concat(newElement);
    }

    const updatedArray = updateArray(user.enrolled ?? [], [study.studyId]);
    await setUser({ username: user.username, password: user.password, enrolled: updatedArray });

    const updatedUser = {
      username: user.username,
      password: user.password,
      enrolled: updatedArray,
    };
    await fetch(`http://localhost:5000/record/enroll/${user.username}/${parseInt(study.studyId, 10)}`, {
      method: 'POST',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function dropUpdateStudy() {
    const currStudy = await getStudy();
    const currParticipants = currStudy.participants;
    const index = currParticipants.indexOf(user.username);

    currParticipants.splice(index, 1);

    const updatedStudy = {
      title: currStudy.title,
      description: currStudy.description,
      compensation: currStudy.compensation,
      duration: currStudy.duration,
      tags: currStudy.tags,
      participants: currParticipants,
      studyId: currStudy.studyId,
      researchers: currStudy.researchers,
    };
    await fetch(`http://localhost:5000/study/${parseInt(study.studyId, 10)}/enroll`, {
      method: 'POST',
      body: JSON.stringify(updatedStudy),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function dropUpdateUser() {
    const index = user.enrolled.indexOf(study.studyId);
    const updatedArray = user.enrolled;
    updatedArray.splice(index, 1);
    await setUser({ username: user.username, password: user.password, enrolled: updatedArray });

    const updatedUser = {
      username: user.username,
      password: user.password,
      enrolled: updatedArray,
    };
    await fetch(`http://localhost:5000/record/enroll/${user.username}/${parseInt(study.studyId, 10)}`, {
      method: 'POST',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async function enroll() {
    await setStatus({ isEnrolled: true });
    enrollUpdateStudy().then(enrollUpdateUser());
  }

  async function drop() {
    await setStatus({ isEnrolled: false });
    dropUpdateStudy().then(dropUpdateUser());
  }

  async function goToChat() {
    navigate('/chat', { state: { sender: user, receiverName: study.researchers } });
  }

  return (
    <div className="Study Page">
      <NavBar user={user} setUser={setUser} />
      <div className="study-flex">
        <div className="header-left">
          {study.title}
        </div>
        <div className="study-information">
          <div>
            Duration: &nbsp;
            {study?.duration}
          </div>
          <div>
            Compensation: &nbsp;
            {study?.compensation}
          </div>
          <div>
            Researcher names: &nbsp;
            {study?.researchers}
          </div>
        </div>
        {status.isEnrolled
          ? <button className="button" type="button" onClick={() => drop()}>DROP</button>
          : <button className="button" type="button" onClick={() => enroll()}>ENROLL</button>}
        <div className="header-small"> Description </div>
        <div className="paragraph">
          {study.description}
        </div>
        <div className="study-flex">
          <div className="header-left">Message Researcher</div>
          <div className="study">
            <button className="view-button" type="button" key={2} onClick={() => goToChat()}>Message Researcher</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study;
