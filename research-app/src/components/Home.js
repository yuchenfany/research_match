/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, {useState, useEffect} from 'react';
import '../assets/index.css';

function Home({user}) { //add props user
  const [enrolledStudies, setEnrolledStudies] = useState([]);

  // gets list of all enrolled studies for user
  async function getStudyIds() {
    const data =  await fetch(`http://localhost:5000/record/${user.name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    if (data.json().enrolled == undefined) {
      return [0, 1, 2, 3];
    }
    return data.json().enrolled;
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
  
  async function getAllStudyJson() {
    const studyIds = await getStudyIds();
    return Promise.all(studyIds.map(studyId => getStudy(studyId)));
  }

  useEffect(() => {
    getAllStudyJson()
      .then(setEnrolledStudies);
   }, []);

   console.log(enrolledStudies)

  return (
    <div className="Home">
      <div className="nav">nav</div>
      <div className="header">Enrolled Studies</div>
      <div>{enrolledStudies.map(
        studyJson => <div key={studyJson.studyId}>studyId = {studyJson.title}</div>
      )}</div>
    </div>
  );
}

export default Home;
