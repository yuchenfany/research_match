/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

function ResearcherStudy({ route, navigation}) { // add props user
  let {user, setUser, study, setStudy } = route.params;
  const [enrolledStudies, setEnrolledStudies] = useState([]);
  // const navigate = useNavigate();
  async function getStudy() {
    console.log(study.studyId);
    const studyData = await fetch(`http://localhost:5000/study/${study.studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await studyData.json();
    console.log(data);

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
  }

  return (
    <View className="Study Page">
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <View className="study-flex">
        <Text className="header-left">
          {study.title}
        </Text>
        <Text>
          Duration:
          {study.duration}
        </Text>
        <Text>
          Compensation:
          {study.compensation}
        </Text>
        <Text> Researcher names: [this is the researcherStudy page] </Text>
        <Button className="button" onClick={() => goToEditStudy()}>Edit Study</Button>
        <Text className="header-small"> Description </Text>
        <Text className="paragraph">
          {study.description}
        </Text>
      </View>
    </View>
  );
}


export default ResearcherStudy;
