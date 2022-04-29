/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

function NavBar({user, setUser, navigation}) {
  const [accountToggled, setAccountToggled] = useState(false);
  const editProfile = () => {
    // store current state in case of 'Cancel'
    // localStorage.setItem(user.username, JSON.stringify(user));
    // navigate(`/${(user.type ?? 0) === 0 ? 'participant' : 'researcher'}-edit`);
  };

  const accountOptions = (
    <View
      className="acct-options"
      style={{ display: accountToggled ? 'flex' : 'none', flexDirection: 'row' }}
    >
      <Button
	    title="EDIT PROFILE"
        className="account-btn"
        onPress={editProfile}
      >
      </Button>
      <Button
	    title="DELETE ACCOUNT"
        className="account-btn"
        onPress={async () => { navigation.navigate('DeleteAccount', { user, setUser }); }}
      >
      </Button>
      <Button
	    title="LOGOUT"
        className="logout-btn"
        onPress={async () => { navigation.navigate('Research Application', { user, setUser }); }}
      >
      </Button>
    </View>
  );

  const toggleAccountOptions = () => {
    setAccountToggled(!accountToggled);
  };

  const studyListButton = (user.type ?? 0) ? <Button
      title="MY STUDIES"
      className="nav-btn"
      onPress={async () => {navigation.push('ParticipantStudies', { user, setUser });}}
    ></Button> : null;

  return (
    <View className="nav" style={{display: 'flex', flexDirection: 'row', marginBottom: '0.5rem'}}>
      <Button
	  	  title="HOME"
        className="nav-btn"
        onPress={async () => {
			navigation.push(
				`${(user.type ?? 0) === 0 ? 'Participant' : 'Researcher'}Home`,
				{ user, setUser }
			);
        }}
      >
      {studyListButton}
      </Button>
      <Button title="MESSAGES" className="nav-btn"></Button>
      <Button title="ACCOUNT" className="account-btn" onPress={toggleAccountOptions}></Button>
      {accountOptions}
    </View>
  );
}

export default NavBar;
