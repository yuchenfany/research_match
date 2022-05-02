/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

function NavBar({ user, setUser, navigation }) {
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F3F8FA',
      flex: 1,
    },
    nav: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
      width: 275,
    },
    navButton: {
      marginRight: 10,
    },
    header: {
      fontSize: 20,
      lineHeight: 40,
      fontWeight: 500,
      marginTop: 30,
      marginBottom: 20,
      color: '#103143',
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
    <View style={styles.nav}>
      <View style={styles.navButton}>
        <Button
          title='HOME'
          color='#103143'
          onPress={async () => {
            navigation.push(
              `${(user.type ?? 0) === 0 ? 'Participant' : 'Researcher'}Home`,
              { user, setUser }
            );
          }}
        >
        {studyListButton}
        </Button>
      </View>
      <View style={styles.navButton}>
        <Button title='MESSAGES' color='#103143' />
      </View>
      <View style={styles.navButton}>
        <Button title='ACCOUNT' color='#103143' onPress={toggleAccountOptions} />
      </View>
      {accountOptions}
    </View>
  );
}

export default NavBar;
