/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';

function ParticipantHome({ route, navigation }) { // add props user
  let { user, setUser } = route.params;
  const [enrolledStudies, setEnrolledStudies] = useState([]);

  console.log(user);

  // gets list of studies that match user's tags

  async function getStudyIds() {
     const data = await fetch(`http://localhost:5000/record/${user.username}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     });
     const json = await data.json();
     console.log(json)

     setUser({
       username: user.username,
       password: user.password,
       phys: json.phys,
       psych: json.psych,
       med: json.med,
     });
  //   // return json.tags; (once tags are implemented in phys)
     //const userTags = user.phys.concat(user.psych.concat(user.med));
     //console.log(userTags);
     console.log(json.phys);
     return json.phys;
   }

   // gets individual study by id
   async function getStudy(studyId) {
     const data = await fetch(`http://localhost:5000/study/tag/${studyId}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     });
     return data.json();
   }

  // get all studies
   async function getAllStudyJson() {
     const studyIds = await getStudyIds();
     console.log(user.username);
     console.log(studyIds);
     // return Promise(getStudy(studyIds[0]));
     return Promise.all(studyIds.map((studyId) => getStudy(studyId)));
   }

   useEffect(() => {
     getAllStudyJson()
       .then(setEnrolledStudies);
   }, []);

  const goToStudy = (studyId) => {
     console.log(studyId);
     setStudy({ studyId });
     navigate(`/study/${studyId}`);
    console.log('in goToStudy');
    navigation.navigate('Study', {
      user: user,
    });
  }

  async function editProfile() {
    console.log('EDIT NAVIGATING');
    navigation.navigate('ParticipantEdit', {
      user: user,
      setUser,
    });
  }
  
  const hardcodedStudy = () => {
    console.log('in hardcodedStudy');
    navigation.navigate('Study', {
      user: user,
      setUser: setUser,
    });
    console.log('after navigation');
  }

  const styles = StyleSheet.create({
    button: {
      height: 100,
      width: 300,
      marginBottom: 200,
    },
  });

  return (
    <View style={styles.button}>
      <NavBar user={user} setUser={setUser} navigation={navigation} />
      <Button title="EDIT PROFILE" onPress={() => editProfile()}/>
      <Button
        title="GO TO STUDY"
        onPress={() => hardcodedStudy()}
      />
      <Button
        title="My Enrolled Studies"
        onPress={() => {
          navigation.navigate('ParticipantStudies', {
            user: user,
            setUser: setUser,
          });
        }}
      />
    <View>
    <Text>Eligible Studies</Text>
         <div>
           {
           enrolledStudies.length === 0 ? []
             : enrolledStudies.map(
               (studyJson) => (
                 studyJson.map(
                   (singleStudy) => (
                     <div key={singleStudy.studyId} className="study">
                       <div className="study-title">{singleStudy.title}</div>
                       <div className="study-tag">{singleStudy.tags}</div>
                       <button className="view-button" type="button" key={singleStudy.studyId} onClick={() => goToStudy(singleStudy.studyId)}>VIEW</button>
                     </div>
                   ),
                 )
               ),
             )
           }
         </div>

    </View>
    </View>
  );

  // return (
  //   <View>
  //     <Text>WELCOME {user.username}</Text>
  //     <Text>You've officially been hacked and I now know your username is: </Text>
  //     <Text>{user.username} </Text> 
  //     <Text>and your password is: </Text> 
  //     <Text>{user.password}</Text>
  //     {/* <NavBar user={user} /> */}
  //     <View>
  //       <Text>Eligible Studies</Text>
  //       <div>
  //         {
  //         enrolledStudies.length === 0 ? []
  //           : enrolledStudies.map(
  //             (studyJson) => (
  //               studyJson.map(
  //                 (singleStudy) => (
  //                   <div key={singleStudy.studyId} className="study">
  //                     <div className="study-title">{singleStudy.title}</div>
  //                     <div className="study-tag">{singleStudy.tags}</div>
  //                     <button className="view-button" type="button" key={singleStudy.studyId} onClick={() => goToStudy(singleStudy.studyId)}>VIEW</button>
  //                   </div>
  //                 ),
  //               )
  //             ),
  //           )
  //         }
  //       </div>
  //       <Text>FOR TESTING STUDY.JS</Text>
  //       <Button title="GO TO STUDY" onPress={() => testFunction()} style={styles.button} />
  //       <Button title="Button Testing" onPress={() => console.log('PRESSED FOR BUTTON')} />
  //     </View>
  //   </View>
  // );
}

export default ParticipantHome;
