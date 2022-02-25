// import logo from '../logo.svg';
import { Button, TextField } from '@mui/material';
import React from "react";
// import { useState } from "react";
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
class Login extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        username: "Should be empty",
        isValidUser: false
      };
      this.handleChange = this.handleChange.bind(this) 
      this.handleClick = this.handleClick.bind(this) 
      //this.leagueOnChange = this.leagueOnChange.bind(this)
      //this.goToMatch = this.goToMatch.bind(this)
    }
  
  
    // componentDidMount() {
    //     // const [errorMessage, setErrorMessage] = useState("");
    //     // this.errorMessage = errorMessage;
    // }
    handleChange(e) {

      if(e.target.value.length === 0) {
        this.setState({isValidUser: false});
      } else {
        const regex = new RegExp("^\\d*[a-zA-Z0-9]*$");
        let isValid = regex.test(e.target.value);
        this.setState({isValidUser: isValid});
        this.setState({username : e.target.value});
      }

      console.log(this.isValidUser);
      
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
          HOME :)
        </h1>

        
        <Button onClick = {this.handleClick} component={Link} to="/start" type="submit" style={{background: "#4FF1A4", color: "white", border: "3px solid rgba(255, 255, 255, 0.8)", marginTop: "100px", width: "250px"}} variant="contained">
            {<Button style={{color: "white", fontSize: "30px"}} component={Link} to="/"> DO SOMETHING</Button>}
        </Button> : 
        
        <Button type="submit" style={{background: "#4FF1A4", color: "white", border: "2px solid red", marginTop: "100px", width: "250px"}} variant="contained">
        {<Button style={{color: "white", fontSize: "30px"}} component={Link} to="/signup"> MAYBE SIGN UP FOR STUDY? (currently sign up)</Button>}
        </Button>

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