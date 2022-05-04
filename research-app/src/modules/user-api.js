/* eslint-disable */ 
export async function userExists(user) {
  const data = await fetch(`http://localhost:5000/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => { console.log(e); });

  return await data.json() != null;
}

export async function deleteUser(user) {
  await fetch(`http://localhost:5000/record/delete/${user.username}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((e) => e.toString());
  return true;
}

// gets list of studies that match user's tags
export async function getUserTags(user) {
  const data = await fetch(`http://localhost:5000/record/${user.username}`, {
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

export async function getUserInfo(user) {
  const data = await fetch(`http://localhost:5000/record/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.json();
}

export async function updateUserInfo(user) {
  await fetch(`http://localhost:5000/record/participant-edit/${user.username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .catch((e) => {
      window.alert(e);
    });

  return true;
}

export async function updateEnrolledUser(studyId, bodyObj) {
    const username = bodyObj.username;
    await fetch(`/record/enroll/${username}/${studyId}`, {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => { window.alert(e); });
}

export async function postUserInfo(user) {
  await fetch('http://localhost:5000/record/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .catch((e) => {
      window.alert(e);
    });

  return true;
}

  // gets list of all enrolled studies for user
export async function getEnrolledStudyIds(user, setUser) {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
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

    // setUser({ username: user.username, password: user.password, enrolled: json.enrolled });
    return json?.enrolled ?? [];
  }

  // gets list of all studies for researcher
  export async function getResearcherStudies(user, setUser) {
    const data = await fetch(`http://localhost:5000/record/${user.username}`, {
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
      // setUser({ username: user.username, password: user.password, enrolled: json.enrolled });
    return json?.studies ?? [];
}

export async function getResearcherNumStudies(user) {
  const data = await fetch(`http://localhost:5000/study/researcher/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json?.length ?? 0;
}

export async function getResearcherNumParticipants(user) {
  const data = await fetch(`http://localhost:5000/study/researcher/${user.username}`, {
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

export default {
    userExists,
    deleteUser,
    getUserTags,
    getUserInfo,
    postUserInfo,
    updateEnrolledUser,
    updateUserInfo,
    getEnrolledStudyIds,
    getResearcherStudies,
    getResearcherNumStudies, 
    getResearcherNumParticipants,
  };
