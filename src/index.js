import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import questionsList from './assets/questions.json'

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Login from './pages/Login';
// import Start from './pages/Start';
// import DeleteAccount from './pages/DeleteAccount'
// import Quiz from './pages/Quiz'
// // import Questions from './Components/Questions'
// import Correct from './pages/Correct'
// import Incorrect from './pages/Incorrect'
// import Leaderboard from './pages/Leaderboard'



ReactDOM.render(
  <div>
  <Router>
    <Switch>
      <Route exact
            path="/"
            render={() => (
              <Login />
            )}/>
      <Route exact
            path="/start"
            render={() => (
              <Start />
            )}/>
      <Route exact
            path="/deleteaccount"
            render={() => (
              <DeleteAccount />
            )}/>
      <Route exact
            path="/quiz"
            render={() => (
              <Questions questionslist={questionsList} />
            )}/>
      <Route exact
            path="/correct"
            render={() => (
              <Correct />
            )}/>
      <Route exact
            path="/incorrect"
            render={() => (
              <Incorrect />
            )}/>
      <Route exact
            path="/leaderboard"
            render={() => (
              <Leaderboard />
            )}/>
    </Switch>
  </Router>
</div>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

sessionStorage.setItem("numAnswered", 0);
sessionStorage.setItem("numCorrect", 0);
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
if(isEmpty(JSON.parse(localStorage.getItem("leaderboard")))) {
  console.log('localstorage is null')
  localStorage.setItem("leaderboard", JSON.stringify({}));
} else {
  console.log(JSON.parse(localStorage.getItem("leaderboard")))
  console.log('localstorage is not null')
}