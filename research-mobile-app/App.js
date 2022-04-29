import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login'
import ParticipantHome from './components/ParticipantHome'
import ParticipantEdit from './components/ParticipantEdit'
import ResearcherEdit from './components/ResearcherEdit'
import ParticipantStudies from './components/ParticipantStudies'
import Study from './components/Study'
import DeleteAccount from './components/DeleteAccount'

/* REFERENCE CODE
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import Question from './Question';
import StartScreen from './StartScreen';
import EndScreen from './EndScreen';

// create a navigation stack
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="End" component={EndScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} */ 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />  
        <Stack.Screen name="ParticipantHome" component={ParticipantHome} />
        <Stack.Screen name="ParticipantEdit" component={ParticipantEdit} />
        <Stack.Screen name="ParticipantStudies" component={ParticipantStudies} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="ResearcherEdit" component={ResearcherEdit} />
        <Stack.Screen name="Study" component={Study} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
