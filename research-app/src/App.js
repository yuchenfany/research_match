/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import './assets/App.css';
import {
  Routes, Route,
} from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/Login';
import ParticipantStudies from './components/ParticipantStudies';
import ResearcherHome from './components/ResearcherHome';
import Create from './components/Create';
import ParticipantProfile from './components/ParticipantProfile';
import ResearcherProfile from './components/ResearcherProfile';
import ResearcherEdit from './components/ResearcherEdit';
import ParticipantEdit from './components/ParticipantEdit';
import Type from './components/Type';
import Study from './components/Study';
import ResearcherStudy from './components/ResearcherStudy';
import ResearcherDashboard from './components/ResearcherDashboard';
import ParticipantDashboard from './components/ParticipantDashboard';
import AddStudy from './components/AddStudy';
import EditStudy from './components/EditStudy';
import Messages from './components/Messages';
import DisplayStudies from './components/DisplayStudies';
import DeleteAccount from './components/DeleteAccount';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState({
    username: 'participant',
    password: 'participantpass',
    messages: 0,
  });
  // const [deleteUser, setUserDelete] =
  // useState({ username: 'testuser', password: 'testuserpassword' });
  const [study, setStudy] = useState({
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  });
  const [status, setStatus] = useState({ isEnrolled: false });
  // for chat
  const [notification, setNotification] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login user={user} setUser={setUser} />} />
        <Route exact path="/participant-studies" element={<ParticipantStudies user={user} setUser={setUser} setStudy={setStudy} setStatus={setStatus} />} />
        <Route exact path="/researcher-home" element={<ResearcherHome user={user} setUser={setUser} setStudy={setStudy} notification={notification} setNotification={setNotification}/>} />
        <Route exact path="/study/:id" element={<Study study={study} setStudy={setStudy} user={user} setUser={setUser} status={status} setStatus={setStatus} />} />
        <Route exact path="/researcher-study/:id" element={<ResearcherStudy study={study} setStudy={setStudy} user={user} setUser={setUser} status={status} setStatus={setStatus} />} />
        <Route exact path="/create" element={<Create user={user} setUser={setUser} />} />
        <Route exact path="/add-study" element={<AddStudy user={user} study={study} setStudy={setStudy} />} />
        <Route exact path="/edit-study" element={<EditStudy user={user} study={study} setStudy={setStudy} />} />
        <Route exact path="/type" element={<Type user={user} setUser={setUser} />} />
        <Route exact path="/participant-profile" element={<ParticipantProfile user={user} setUser={setUser} />} />
        <Route exact path="/researcher-profile" element={<ResearcherProfile user={user} setUser={setUser} />} />
        <Route exact path="/researcher-edit" element={<ResearcherEdit user={user} setUser={setUser} />} />
        <Route exact path="/participant-edit" element={<ParticipantEdit user={user} setUser={setUser} />} />
        <Route exact path="/participant-dashboard" element={<ParticipantDashboard user={user} />} />
        <Route exact path="/researcher-dashboard" element={<ResearcherDashboard user={user} />} />
        <Route exact path="/delete-account" element={<DeleteAccount user={user} setUser={setUser} />} />
        <Route exact path="/participant-home" element={<DisplayStudies user={user} setUser={setUser} setStudy={setStudy} notification={notification} setNotification={setNotification}/>} />
        <Route exact path="/messages" element={<Messages user={user} />} />
        <Route exact path="/chat" element={<Chat sender={user} setSender={setUser} setNotification={setNotification} user={user} setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
