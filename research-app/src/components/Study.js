/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect } from 'react';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { getStudyById, updateEnrolledStudy } from '../modules/study-api';
import { updateEnrolledUser } from '../modules/user-api';

function Study({
  study, setStudy, user, setUser, status, setStatus,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    getStudyById(study.studyId)
      .then(setStudy);
  }, []);

  async function enrollUpdateStudy() {
    const currStudy = await getStudyById(study.studyId);
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
    updateEnrolledStudy(updatedStudy);
  }

  async function enrollUpdateUser() {
    function updateArray(array, newElement) {
      return array.concat(newElement);
    }

    const updatedArray = updateArray(user.enrolled ?? [], [study.studyId]);
    setUser({ username: user.username, password: user.password, enrolled: updatedArray });

    const updatedUser = {
      username: user.username,
      password: user.password,
      enrolled: updatedArray,
    };

    updateEnrolledUser(study.studyId, updatedUser);
  }

  async function dropUpdateStudy() {
    const currStudy = await getStudyById(study.studyId);
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

    enrollUpdateStudy(updatedStudy);
  }

  async function dropUpdateUser() {
    const index = user.enrolled.indexOf(study.studyId);
    const updatedArray = user.enrolled;
    updatedArray.splice(index, 1);
    setUser({ username: user.username, password: user.password, enrolled: updatedArray });

    const updatedUser = {
      username: user.username,
      password: user.password,
      enrolled: updatedArray,
    };

    updateEnrolledUser(study.studyId, updatedUser);
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
          {study?.title}
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
        {status?.isEnrolled
          ? <button className="button" type="button" onClick={() => drop()}>DROP</button>
          : <button className="button" type="button" onClick={() => enroll()}>ENROLL</button>}
        <div className="header-small"> Description </div>
        <div className="paragraph">
          {study?.description}
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
