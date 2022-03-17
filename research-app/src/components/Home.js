/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, {useState, useEffect} from 'react';
import '../assets/index.css';

function Home({user}) { //add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);

  // gets list of all enrolled studies for user
  // NOTE: remove hardcoding once users are enrolled in studies
  async function getStudyIds() {
    // const data =  await fetch(`http://localhost:5000/record/${user.name}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // return data.json().enrolled;
    return [0, 1, 2, 3];
  }

  // gets individual study by id
  async function getStudy(studyId) {
    const data =  await fetch(`http://localhost:5000/study/${studyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data.json();
  }
  
  // get all studies
  async function getAllStudyJson() {
    const studyIds = await getStudyIds();
    // console.log(studyIds);
    return Promise.all(studyIds.map(studyId => getStudy(studyId)));
  }

  useEffect(() => {
    getAllStudyJson()
      .then(setEnrolledStudies);
   }, []);

  return (
    <div className="Home">
      <div className="nav">nav</div>
      <div className="header">Enrolled Studies</div>
      <div>{
        enrolledStudies.length == 0 ? [] : 
        enrolledStudies.map(
          studyJson => <div key={studyJson.studyId}>{studyJson.title}</div>
        )
      }</div>
    </div>
  );
}

export default Home;
