import { getUserTags } from './user-api';

export async function addStudy(user, study, setStudy) {
  // finds maximum studyID in our collections
  const studyData = await fetch('http://localhost:5000/findMax', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await studyData.json();
  // sets next ID
  const Id = data[0].studyId + 1;
  // gets the userData
  const userData = await fetch(`http://localhost:5000/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const currUser = await userData.json();
  const currStudies = currUser.studies;
  currStudies.push(Id);
  const updatedUser = {
    username: currUser.username,
    password: currUser.password,
    name: currUser.name,
    organization: currUser.organization,
    studies: currUser.studies,
    type: currUser.type,
  };

  // Adds the new created study into the user's studies field
  await fetch('http://localhost:5000/record/add-to-user-array', {
    method: 'POST',
    body: JSON.stringify(updatedUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  setStudy({
    title: study.title,
    description: study.description,
    compensation: study.compensation,
    duration: study.duration,
    tags: study.tags,
    participants: study.participants,
    studyId: Id,
    researchers: user.name,
  });
  const myobj = {
    title: study.title,
    description: study.description,
    compensation: study.compensation,
    duration: study.duration,
    tags: study.tags,
    participants: study.participants,
    studyId: Id,
    researchers: user.name,
  };
  // creates a new study in the study collection
  await fetch('http://localhost:5000/add-study', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myobj),
  })
    .catch((e) => {
      console.log(e);
    });
  return true;
}

export async function editStudy(study, setStudy) {
  setStudy({
    title: study.title,
    description: study.description,
    compensation: study.compensation,
    duration: study.duration,
    tags: study.tags,
    participants: study.participants,
    studyId: study.studyId,
    researchers: study.researchers,
  });
  const myobj = {
    title: study.title,
    description: study.description,
    compensation: study.compensation,
    duration: study.duration,
    tags: study.tags,
    participants: study.participants,
    studyId: study.studyId,
    researchers: study.researchers,
  };

  // edits the study
  await fetch('http://localhost:5000/study/edit-study', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myobj),
  })
    .catch((e) => {
      console.log(e);
    });
  return true;
}

export async function deleteStudy(study) {
  await fetch(`http://localhost:5000/study/${study.studyId}`, {
    method: 'DELETE',
    body: null,
  }).catch((e) => {
    console.log(e);
  });
  return true;
}

// for deleting a study: updates a researcher's study array
export async function updateResearcherStudies(user, study) {
  const updatedStudies = user.studies.filter((e) => e !== study.studyId);

  const bodyObj = {
    username: user.username,
    password: user.password,
    name: user.name,
    organization: user.organization,
    studies: updatedStudies,
    type: user.type,
    title: user.title,
  };

  await fetch(`http://localhost:5000/record/researcher-studies/${user.username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyObj),
  })
    .catch((e) => {
      window.alert(e);
    });
  return true;
}

export async function getStudyParticipants(study) {
  const response = await fetch(`http://localhost:5000/study/${study.studyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { window.alert(e); });
  const json = await response.json();
  const participantIds = json?.participants ?? [];
  const participants = await Promise.all(
    participantIds.map(
      async (id) => {
        const participantData = await fetch(`http://localhost:5000/record/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).catch((e) => { window.alert(e); });
        const participant = await participantData.json();
        return participant;
      },
    ),
  );
  return participants ?? [];
}

export async function removeStudyForParticipants(study, participants) {
  await Promise.all(
    participants.map(
      async (participant) => {
        if (!participant) {
          return;
        }
        const updatedStudies = participant.enrolled.filter((e) => e !== study.studyId) ?? [];
        const bodyObj = participant;
        bodyObj.enrolled = updatedStudies;
        await fetch(`http://localhost:5000/record/participant-edit/${participant.username}`, {
          method: 'POST',
          body: JSON.stringify(bodyObj),
          headers: {
            'Content-Type': 'application/json',
          },
        }).catch((e) => { window.alert(e); });
      },
    ),
  );
}

export async function closeStudy(bodyObj) {
  await fetch('http://localhost:5000/add-study', {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { window.alert(e); });
}

export async function getStudyById(id) {
  const data = await fetch(`http://localhost:5000/study/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.json();
}

// gets a list of studies by tag
export async function getStudyByTag(tag) {
  const data = await fetch(`http://localhost:5000/study/tag/${tag}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.json();
}

// get all studies
export async function getAllStudyJsonByTag(user, setUser) {
  const tags = await getUserTags(user, setUser);
  return Promise.all(tags.map((tag) => getStudyByTag(tag)));
}

export async function updateEnrolledStudy(bodyObj) {
  const { studyId } = bodyObj;
  await fetch(`http://localhost:5000/study/${studyId}/enroll`, {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { window.alert(e); });
}

export default {
  addStudy,
  editStudy,
  deleteStudy,
  updateResearcherStudies,
  getStudyParticipants,
  removeStudyForParticipants,
  closeStudy,
  getStudyById,
  updateEnrolledStudy,
};
