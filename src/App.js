import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

  useEffect(() => {
    getStudy()
      .then(setStudy);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{study.title}</Text> 
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
