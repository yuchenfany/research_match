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

function App() {
  const [user, setUser] = useState({ username: '', password: '' });

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login user={user} setUser={setUser} />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/create" element={<Create user={user} setUser={setUser} />} />
        <Route exact path="/profile" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
