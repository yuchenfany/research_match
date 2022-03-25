/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import './assets/App.css';
import {
  Routes, Route,
} from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/Login';
import ParticipantHome from './components/ParticipantHome';
import ResearcherHome from './components/ResearcherHome';
import Create from './components/Create';
import ParticipantProfile from './components/ParticipantProfile';
import ResearcherProfile from './components/ResearcherProfile';
import ResearcherEdit from './components/ResearcherEdit';
import ParticipantEdit from './components/ParticipantEdit';
import Type from './components/Type';
import Study from './components/Study';
import Dashboard from './components/Dashboard';
import AddStudy from './components/AddStudy';
import DisplayStudies from './components/DisplayStudies';
import DeleteAccount from './components/DeleteAccount';

function App() {
  const [user, setUser] = useState({ username: 'newmia', password: 'newmiapassword', enrolled: [] });
  const [user2, setUserTags] = useState({ username: 'newmia', password: 'newmiapassword', tags: [] });
  // const [deleteUser, setUserDelete] =
  // useState({ username: 'testuser', password: 'testuserpassword' });
  const [study, setStudy] = useState({
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  });
  const [status, setStatus] = useState({ isEnrolled: false });

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login user={user} setUser={setUser} />} />
        <Route exact path="/participant-home" element={<ParticipantHome user={user} setUser={setUser} setStudy={setStudy} setStatus={setStatus} />} />
        <Route exact path="/researcher-home" element={<ResearcherHome user={user} setUser={setUser} setStudy={setStudy} />} />
        <Route exact path="/study/:id" element={<Study study={study} setStudy={setStudy} user={user} setUser={setUser} status={status} setStatus={setStatus} />} />
        <Route exact path="/create" element={<Create user={user} setUser={setUser} />} />
        <Route exact path="/add-study" element={<AddStudy study={study} setStudy={setStudy} />} />
        <Route exact path="/type" element={<Type user={user} setUser={setUser} />} />
        <Route exact path="/participant-profile" element={<ParticipantProfile user={user} setUser={setUser} />} />
        <Route exact path="/researcher-profile" element={<ResearcherProfile user={user} setUser={setUser} />} />
        <Route exact path="/researcher-edit" element={<ResearcherEdit user={user} setUser={setUser} />} />
        <Route exact path="/participant-edit" element={<ParticipantEdit user={user} setUser={setUser} />} />
        <Route exact path="/dashboard" element={<Dashboard user={user} />} />
        <Route exact path="/delete-account" element={<DeleteAccount user={user} setUser={setUser} />} />
        <Route exact path="/display-studies" element={<DisplayStudies user={user2} setUser={setUserTags} setStudy={setStudy} />} />
      </Routes>
    </div>
  );
}

export default App;
