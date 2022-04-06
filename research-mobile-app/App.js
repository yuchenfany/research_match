import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect} from 'react';

export default function App() {
  const [study, setStudy] = useState([]);

  async function getStudy() {
    const studyData = await fetch(`http://localhost:5000/study/0`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    console.log('MOBILE TEST');
    console.log(data);
    return data;
  }

  async function addStudy() {
    const myobj = {
      title: 'Test Study',
      description: 'Test description',
      compensation: '4 pennies',
      duration: '4 hours',
      tags: [],
      participants: [],
      studyId: 100,
      researchers: [],
    };

    await fetch('http://localhost:5000/add-study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myobj),
      })
        .catch((e) => {
          window.alert(e);
        });
  }

  useEffect(() => {
    getStudy()
      .then(setStudy);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{study.title}</Text> 
      <Button title="Add Study" onPress={() => addStudy()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
