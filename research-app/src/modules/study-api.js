import config from '../config.json';
import { getUserTags } from './user-api';

async function addStudy(user, study, setStudy) {
  // finds maximum studyID in our collections
  const studyData = await fetch(`http://${config.server_host}/findMax`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await studyData.json();
  // sets next ID
  const Id = data[0].studyId + 1;
  // gets the userData
  const userData = await fetch(`http://${config.server_host}/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const currUser = await userData.json();
  const currStudies = currUser.studies ?? [];
  currStudies.push(Id);
  const updatedUser = {
    username: currUser.username,
    password: currUser.password,
    name: currUser.name,
    organization: currUser.organization,
    studies: currStudies,
    type: currUser.type,
  };

  // Adds the new created study into the user's studies field
  await fetch(`http://${config.server_host}/record/add-to-user-array`, {
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
  await fetch(`http://${config.server_host}/add-study`, {
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

async function editStudy(study, setStudy) {
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
  await fetch(`http://${config.server_host}/study/edit-study`, {
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

async function deleteStudy(study) {
  await fetch(`http://${config.server_host}/study/${study.studyId}`, {
    method: 'DELETE',
    body: null,
  }).catch((e) => {
    console.log(e);
  });
  return true;
}

// for deleting a study: updates a researcher's study array
async function updateResearcherStudies(user, study) {
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

  await fetch(`http://${config.server_host}/record/researcher-studies/${user.username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyObj),
  })
    .catch((e) => {
      console.log(e);
    });
  return true;
}

async function getStudyParticipants(study) {
  const response = await fetch(`http://${config.server_host}/study/${study.studyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { console.log(e); });
  const json = await response.json();
  const participantIds = json?.participants ?? [];
  const participants = await Promise.all(
    participantIds.map(
      async (id) => {
        const participantData = await fetch(`http://${config.server_host}/record/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).catch((e) => { console.log(e); });
        const participant = await participantData.json();
        return participant;
      },
    ),
  );
  return participants ?? [];
}

async function removeStudyForParticipants(study, participants) {
  await Promise.all(
    participants.map(
      async (participant) => {
        if (!participant) {
          return;
        }
        const updatedStudies = participant.enrolled.filter((e) => e !== study.studyId) ?? [];
        const bodyObj = participant;
        bodyObj.enrolled = updatedStudies;
        await fetch(`http://${config.server_host}/record/participant-edit/${participant.username}`, {
          method: 'POST',
          body: JSON.stringify(bodyObj),
          headers: {
            'Content-Type': 'application/json',
          },
        }).catch((e) => { console.log(e); });
      },
    ),
  );
}

async function closeStudy(bodyObj) {
  await fetch(`http://${config.server_host}/add-study`, {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { console.log(e); });
}

async function getStudyById(id) {
  const data = await fetch(`http://${config.server_host}/study/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.json();
}

// Gets a list of studies by tag
async function getStudyByTag(tag) {
  const data = await fetch(`http://${config.server_host}/study/tag/${tag}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.json();
}

// Get all studies
async function getAllStudyJsonByTag(user, setUser) {
  const tags = await getUserTags(user, setUser);
  return Promise.all(tags.map((tag) => getStudyByTag(tag)));
}

async function updateEnrolledStudy(bodyObj) {
  const { studyId } = bodyObj;
  await fetch(`http://${config.server_host}/study/${studyId}/enroll`, {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { console.log(e); });
}

async function getResearcherNumStudies(user) {
  const data = await fetch(`http://${config.server_host}/study/researcher/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json?.length ?? 0;
}

async function getResearcherNumParticipants(user) {
  const data = await fetch(`http://${config.server_host}/study/researcher/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (!json) {
    return 0;
  }
  return json.reduce((acc, obj) => acc + (obj?.participants?.length ?? 0), 0);
}

async function getResearcherNumTags(user) {
  const data = await fetch(`http://${config.server_host}/study/researcher/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (!json) {
    return 0;
  }
  const addAllToSet = (lst, set) => {
    (lst ?? []).forEach(set.add, set);
    return set;
  };
  const tags = json.reduce((acc, obj) => addAllToSet(obj?.tags ?? [], acc), new Set());
  return tags.size;
}

export {
  addStudy,
  editStudy,
  deleteStudy,
  updateResearcherStudies,
  getStudyParticipants,
  removeStudyForParticipants,
  closeStudy,
  getStudyById,
  getStudyByTag,
  getAllStudyJsonByTag,
  updateEnrolledStudy,
  getResearcherNumStudies,
  getResearcherNumParticipants,
  getResearcherNumTags,
};
