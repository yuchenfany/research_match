/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import './assets/App.css';
import {
  Routes, Route,
} from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Create from './components/Create';
import Profile from './components/Profile';
import Study from './components/Study';
import Dashboard from './components/Dashboard';
import AddStudy from './components/AddStudy';

function App() {
  const [user, setUser] = useState({ username: '', password: '', enrolled: [] });
  const [study, setStudy] = useState({
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  });

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login user={user} setUser={setUser} />} />
        <Route exact path="/home" element={<Home user={user} setUser={setUser} setStudy={setStudy} />} />
        <Route exact path="/study/:id" element={<Study study={study} setStudy={setStudy} user={user} setUser={setUser} />} />
        <Route exact path="/create" element={<Create user={user} setUser={setUser} />} />
        <Route exact path="/study/add" element={<AddStudy study={study} setStudy={setStudy} />} />
        <Route exact path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route exact path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
