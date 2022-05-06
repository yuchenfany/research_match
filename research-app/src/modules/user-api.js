import config from '../config.json';

// Returns if a user exists in the DB
async function userExists(user) {
  return fetch(`http://${config.server_host}/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (data) => {
      const json = await data.json();
      return (json !== null);
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
}

// Deletes a user from the DB
async function deleteUser(user) {
  return fetch(`http://${config.server_host}/record/delete/${user.username}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => true)
    .catch((e) => e.toString());
}

// Gets list of studies that match user's tags
async function getUserTags(user) {
  const data = await fetch(`http://${config.server_host}/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();

  // setUser({
  //   username: user.username,
  //   password: user.password,
  //   enrolled: user.enrolled,
  //   age: user.age,
  //   heightFeet: user.heightFeet,
  //   heightInches: user.heightInches,
  //   weight: user.weight,
  //   sex: user.sex,
  //   gender: user.gender,
  //   allergies: user.allergies,
  //   type: user.type,
  //   phys: json.phys,
  //   psych: json.psych,
  //   med: json.med,
  //   messages: json.messages,
  // });

  const userTags = json.phys.concat(json.psych.concat(json.med));
  return userTags;
}

// Gets the user object
async function getUserInfo(user) {
  const data = await fetch(`http://${config.server_host}/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.json();
}

// Updates user to the have the contents of the passed-in body
async function updateUserInfo(user) {
  await fetch(`http://${config.server_host}/record/participant-edit/${user.username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .catch((e) => {
      console.log(e);
    });

  return true;
}

// Updates researcher to the have the contents of the passed-in body
async function updateResearcherInfo(user) {
  await fetch(`http://${config.server_host}0/record/researcher-edit/${user.username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .catch((e) => {
      console.log(e);
    });

  return true;
}

// Adds the studyId to the user's enrolled field
async function updateEnrolledUser(studyId, bodyObj) {
  const { username } = bodyObj;
  await fetch(`http://${config.server_host}/record/enroll/${username}/${studyId}`, {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { console.log(e); });
}

// Adds a new user
async function postUserInfo(user) {
  return fetch(`http://${config.server_host}/record/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(() => true)
    .catch((e) => {
      console.log(e);
      return false;
    });
}

async function postResearcherInfo(user) {
  console.log(user);
  return fetch(`http://${config.server_host}/record/add-researcher`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(() => true)
    .catch((e) => {
      console.log(e);
      return false;
    });
}

// Gets list of all enrolled studies for user
async function getEnrolledStudyIds(user, setUser) {
  const data = await fetch(`http://${config.server_host}/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  setUser({
    username: user.username,
    password: user.password,
    enrolled: json.enrolled,
    age: user.age,
    heightFeet: user.heightFeet,
    heightInches: user.heightInches,
    weight: user.weight,
    sex: user.sex,
    gender: user.gender,
    allergies: user.allergies,
    phys: user.phys,
    psych: user.psych,
    med: user.med,
    type: user.type,
  });

  return json?.enrolled ?? [];
}

// Gets list of all studies for researcher
async function getResearcherStudies(user, setUser) {
  const data = await fetch(`http://${config.server_host}/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  setUser({
    username: user.username,
    password: user.password,
    name: user.name,
    organization: user.organization,
    studies: json.studies,
    type: user.type,
  });

  return json?.studies ?? [];
}

export {
  userExists,
  deleteUser,
  getUserTags,
  getUserInfo,
  postUserInfo,
  postResearcherInfo,
  updateEnrolledUser,
  updateUserInfo,
  updateResearcherInfo,
  getEnrolledStudyIds,
  getResearcherStudies,
};
