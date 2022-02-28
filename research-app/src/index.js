/* eslint-disable react/jsx-filename-extension */
import ReactDOM from 'react-dom';
import './assets/index.css';
import React from 'react';
import App from './App';

const randomOrder = [];

ReactDOM.render(
  <App randomOrder={randomOrder} />,
  document.getElementById('root'),
);
