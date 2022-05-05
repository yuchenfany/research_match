/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect } from 'react';
import {
  View, Button, Text, StyleSheet,
} from 'react-native';
import NavBar from './NavBar';

function ResearcherStudy({ route, navigation }) { // add props user
  const {
    user, setUser, study, setStudy,
  } = route.params;
  // const [enrolledStudies, setEnrolledStudies] = useState([]);
  // const navigate = useNavigate();

  async function getStudy() {
    const studyData = await fetch(`http://localhost:5000/study/${study.studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    return data;
  }

  useEffect(() => {
    getStudy()
      .then(setStudy);
  }, []);

  const goToEditStudy = () => {
    navigation.navigate('EditStudy', {
      user,
      setUser,
      study,
      setStudy,
    });
  };

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
    studyCard: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#F9FFFE',
      borderColor: '#808A8F',
      borderRadius: 5,
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 18,
      paddingRight: 10,
      paddingLeft: 10,
      marginBottom: 10,
      width: 500,
    },
    button: {
      width: 275,
      height: 35,
      fontSize: 12,
      letterSpacing: 1,
      marginTop: 10,
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
      <Text style={styles.header}>
        {study.title}
      </Text>
      <Text color="#103143">
        Duration:
        <Text>{' '}</Text>
        {study.duration}
      </Text>
      <Text color="#103143">
        Compensation:
        <Text>{' '}</Text>
        {study.compensation}
      </Text>
      <Text>
        Researcher names:
        <Text>{' '}</Text>
        {study.researchers}
      </Text>
      <View style={styles.button}>
        <Button className="button" title="EDIT STUDY" color="#103143" onPress={() => goToEditStudy()} />
      </View>
      <Text style={styles.subheader}>Description</Text>
      <Text color="#103143">
        {study.description}
      </Text>
    </View>
  );
}

export default ResearcherStudy;
