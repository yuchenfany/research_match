// import logo from '../logo.svg';
import { Button, TextField } from '@mui/material';
import React from "react";
import { useEffect, useState } from "react";
import '../App.css';
import { Link } from 'react-router-dom';
// import { textAlign } from '@mui/system';

// const submitForm = (e) => {
//     e.preventDefault();
//     const formValues = {};
//     for (var element of e.target.elements) {
//       if (element.name) {
//         formValues[element.name] = element.value;
//       }
//     }
//       login(formValues);
// }
// const login = async (formValues) => {
//     const res = await fetch("/api/users/login", {
//       method: 'POST',
//       credentials: 'include', 
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       redirect: 'follow',
//       body: JSON.stringify(formValues) 
//     });
//     const resObj = await res.json();
//     if (resObj.err)
//       console.log(resObj.msg);
//     else
//         console.log()
//     //   props.setUser(resObj.user)
// }
// function sayHello() {
//     alert('You clicked me!');
// }
const User = require("../models/userModel");

class Login extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        username: "Should be empty",
        password: '',
        isValidUser: false
      };
      this.handleChange = this.handleChange.bind(this) 
      this.handleClick = this.handleClick.bind(this) 


      //this.leagueOnChange = this.leagueOnChange.bind(this)
      //this.goToMatch = this.goToMatch.bind(this)
    }
    handleChange(e) {
      // fetch("/").then(res => {
      //   if(res.ok) {
      //     console.log(JSON.stringify(res.json))
      //     return res.json()
      //   }
      // }).then(jsonRes => this.setState(jsonRes));
      if(e.target.value.length === 0) {
        this.setState({isValidUser: false});
      } else {
        const regex = new RegExp("^\\d*[a-zA-Z0-9]*$");
        let isValid = regex.test(e.target.value);
        this.setState({isValidUser: isValid});
        this.setState({username : e.target.value});
      }
    }
    
    
    // useEffect() {
    //   console.log("USEEFFECT IS BEING READ");
    //   fetch("/").then(res => {
    //     if(res.ok) {
    //       return res.json()
    //     }
    //   }).then(jsonRes => this.setState(jsonRes));
    // }
    
    componentDidMount() {
      fetch("/").then(res => {
        if(res.ok) {
          console.log(JSON.stringify(res.json))
          return res.json()
        }
      }).then(jsonRes => this.setState(jsonRes));
    }

    handleClick(){
      sessionStorage.setItem('UserName', this.state.username);
    }
    render() {

      const styles = {
        input: {
          "&:invalid": {
            border: "red solid 2px !important"
          }
        }
      };

      return (

      <div className="App">

      <header className="App-header">
      <h1
          className="title-header"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Login
          {this.state.username}
          {this.state.password}
        </h1>

        <div>
        <h3 style={{color: "#576074", fontFamily: "Overpass", textAlign: 'left', marginBottom: "-2px"}}>Username </h3>
        <TextField inputProps={{ className: styles.input, pattern: "^[a-zA-Z0-9]*$" }} onChange={this.handleChange} sx={styles.field} style={{width: "340px", border: "2.5px solid #C4C4C4"}} label="" name="username" />
        </div>

        <div>
        <h3 style={{color: "#576074", fontFamily: "Overpass", textAlign: 'left', marginBottom: "-2px"}}>Password </h3>
        <TextField inputProps={{ className: styles.input, pattern: "^[a-zA-Z0-9]*$" }} onChange={this.handleChange} sx={styles.field} style={{width: "340px", border: "2.5px solid #C4C4C4"}} label="" name="username" />
        </div>

        {this.state.isValidUser ?
        <Button onClick = {this.handleClick} component={Link} to="/home" type="submit" style={{background: "#4FF1A4", color: "white", border: "3px solid rgba(255, 255, 255, 0.8)", marginTop: "100px", width: "250px"}} variant="contained">
            {<Button style={{color: "white", fontSize: "30px"}} component={Link} to="/home"> LOGIN</Button>}
        </Button> : 
        
        <Button disabled type="submit" style={{background: "#4FF1A4", color: "white", border: "2px solid red", marginTop: "100px", width: "250px"}} variant="contained">
        {<Button style={{color: "white", fontSize: "30px"}} component={Link}> PLz input appropriate username</Button>}
        </Button>}

      </header>

      
      </div>
    

      )
    }
}
    
export default Login;

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1
          className="title-header"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Guess That Celebrity ❗
        </h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      
    </div>
  );
}
export default App; */