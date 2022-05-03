/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import bcrypt from 'bcryptjs';
import ParticipantHome from './ParticipantHome';
import ParticipantStudies from './ParticipantStudies';
import Study from './Study'
import ResearcherHome from './ResearcherHome';
import ParticipantEdit from './ParticipantEdit';
import ResearcherEdit from './ResearcherEdit';
import AddStudy from './AddStudy';
import ResearcherStudy from './ResearcherStudy';
import EditStudy from './EditStudy';
import DeleteAccount from './DeleteAccount';
import Messages from './Messages';
import Chat from './Chat';

import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';


function Login({ navigation }) {
  const [study, setStudy] = useState({
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  });
  const [user, setUser] = useState({
    username: 'participant',
    password: 'participantpass',
    enrolled: [],
    phys: [],
    psych: [],
    med: [],
    studies: [],
    type: 0
  });

  let jsonResult = '';

  const [error, setError] = useState({ message: '' });
  // const [samePassword, setSamePassword] = useState(0);

  async function handleSubmit(event) {
    if (user.username.length === 0 && user.password.length === 0) {
      setError({ message: 'Please enter your login credentials' });
      event.preventDefault();
      return;
    }
    if (user.username.length === 0) {
      setError({ message: 'Please enter your username' });
      event.preventDefault();
      return;
    }
    if (user.password.length === 0) {
      setError({ message: 'Please enter your password' });
      event.preventDefault();
      return;
    }

    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await data.json();

    // verification checks of username & password
    if (json === null) {
      setError({ message: 'User does not exist' });
      event.preventDefault();
    //  } else if (bcrypt.compareSync(user.password, json.password)) { : CHANGE LATER 
    } else if (bcrypt.compareSync(user.password, json.password)) {
      jsonResult = json;

      if (json.type === 0) {
        // makes sure all fields are available in home
        const updatedUser = {
          username: json.username,
          password: json.password,
          enrolled: json.enrolled,
          age: json.age,
          heightFeet: json.heightFeet,
          heightInches: json.heightInches,
          weight: json.weight,
          sex: json.sex,
          gender: json.gender,
          allergies: json.allergies,
          phys: json.phys,
          psych: json.psych,
          med: json.med,
          type: json.type,
        };
        setUser(updatedUser);

        return 0;
      } else if (json.type === 1) {
        // makes sure all fields are available in home
        const updatedUser = {
          username: json.username,
          password: json.password,
          name: json.name,
          organization: json.organization,
          studies: json.studies,
          type: json.type,
          title: json.title,
        };

        return 1;
      }
    } else {
      setError({ message: 'Incorrect password' });
      event.preventDefault();
    }
  }

  // update username as it's being entered
  const handleNameChange = async (event) => {
    setUser(
      {
        username: event.target.value,
        password: user.password,
        enrolled: user.enrolled,
      },
    );
    console.log('USERNAME CHANGE====================');
  };

  const handleNameChangePassword = async (event) => {
    setUser(
      {
        username: user.username,
        password: event.target.value,
        enrolled: user.enrolled,
      },
    );

    console.log('PASSWORD CHANGE====================');
  };

  const navigateTo = (type) => {
    console.log('NAVIGATETO');
    console.log(jsonResult.age);
    if (type === 0) {
      console.log(jsonResult);
      navigation.navigate('ParticipantHome', {
        user: jsonResult,
        setUser: setUser,
      });
    } else if (type === 1) {
      navigation.navigate('ResearcherHome', {
        user: jsonResult,
        setUser: setUser,
        setStudy: setStudy,
      });
    }
  };

  const handleAsync = async (event) => {
    event.preventDefault();
    // handleNameChangePassword(event).then(handleNameChange(event)).then(handleSubmit(event));
    console.log('BEFORE HANDLESUBMIT');
    const type = await handleSubmit(event);
    console.log('FINISHED HANDLESUBMIT');
    console.log(type);
    setTimeout(1000, navigateTo(type));
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F3F8FA',
      flex: 1,
    },
    login: {
      marginLeft: 40,
    },
    header: {
      fontSize: 20,
      lineHeight: 40,
      fontWeight: 500,
      marginTop: 30,
      marginBottom: 20,
      color: '#103143',
    },
    loginLabel: {
      fontSize: 12,
      fontWeight: 500,
      marginBottom: 5,
      color: '#103143',
    },
    inputField: {
      width: 275,
      height: 27,
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderWidth: 1,
      marginBottom: 10,
      borderRadius: 3,
      color: '#103143',
    },
    errorMessage: {
      marginTop: 10,
      color: '#F13E3E',
      fontWeight: 400,
    },
    button: {
      width: 275,
      height: 35,
      fontSize: 12,
      letterSpacing: 1,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Text style={styles.header}>Research Match</Text>
        <Text style={styles.loginLabel}>USERNAME</Text>
        <TextInput style={styles.inputField} type="text" id="username" onChange={handleNameChange} />
        <Text style={styles.loginLabel}>PASSWORD</Text>
        <TextInput style={styles.inputField} type="text" id="username" onChange={handleNameChangePassword} />
        <Text style={styles.errorMessage}>{error.message}</Text>
        <View style={styles.button}>
          <Button type="submit" color='#103143' title="SUBMIT" onPress={handleAsync} />
        </View>
      </View>
    </View>
  );
}

// the app component will configure the screens and the routes

// create a navigation stack --> refrences the thing
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Research Application">
        <Stack.Screen name="Research Application" component={Login} />
        <Stack.Screen name="ParticipantHome" component={ParticipantHome} />
        <Stack.Screen name="ParticipantStudies" component={ParticipantStudies} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="Study" component={Study} />
        <Stack.Screen name="ResearcherHome" component={ResearcherHome} />
        <Stack.Screen name="ParticipantEdit" component={ParticipantEdit} />
        <Stack.Screen name="ResearcherEdit" component={ResearcherEdit} />
        <Stack.Screen name="AddStudy" component={AddStudy} />
        <Stack.Screen name="ResearcherStudy" component={ResearcherStudy} />
        <Stack.Screen name="EditStudy" component={EditStudy} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
// export default Login;
