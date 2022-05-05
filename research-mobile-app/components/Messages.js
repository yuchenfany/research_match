/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import NavBar from './NavBar';

function Messages({ route, navigation }) {
  const { user, setUser } = route.params;
  const [chatsList, setChatsList] = useState([]);

  async function getChats() {
    const allChats = await fetch(
      `http://localhost:5000/chats?senderName=${user.username}&senderType=${user.type}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await allChats.json();
    return data;
  }

  useEffect(() => {
    getChats()
      .then(setChatsList);
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F3F8FA',
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 20,
      lineHeight: 40,
      fontWeight: 500,
      marginTop: 30,
      color: '#103143',
    },
    subheader: {
      fontSize: 16,
      lineHeight: 40,
      fontWeight: 500,
      color: '#103143',
    },
    card: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderRadius: 5,
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
      paddingLeft: 10,
      marginBottom: 10,
      width: 500,
    },
    viewButton: {
      right: 0,
      width: 100,
      height: 25,
      fontSize: 10,
      letterSpacing: 1,
      marginLeft: 'auto',
    },
  });

  return (
    <View style={styles.container}>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <Text style={styles.header}>My Messages</Text>
      <div>
        {chatsList.length === 0 ? []
          : chatsList.map(
            (chat) => {
              const receiverName = user.type === 0 ? chat.researcher : chat.user;
              return (
                <div key={receiverName} className="study">
                  <View style={styles.card}>
                    <Text style={styles.subheader}>{receiverName}</Text>
                    <View style={styles.viewButton}>
                      <Button
                        color="#103143"
                        type="button"
                        title="VIEW"
                        onPress={() => navigation.navigate('Chat', {
                          sender: user,
                          receiverName,
                        })}
                      />
                    </View>
                  </View>
                </div>
              );
            },
          )}
      </div>
    </View>
  );
}

export default Messages;
